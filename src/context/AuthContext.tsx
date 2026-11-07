import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, LessonProgress, QuizAttempt, Achievement } from '../types';
import {
  supabase,
  isSupabaseConfigured,
  getActiveSessionUser,
  setActiveSessionUser,
  getStoredUsers,
  saveStoredUsers,
  getLocalLessonProgress,
  saveLocalLessonProgress,
  getLocalQuizAttempts,
  saveLocalQuizAttempt,
  getLocalStudentAchievements,
  unlockLocalAchievement
} from '../lib/supabase';
import confetti from 'canvas-confetti';

interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  nickname: string;
  gradeLevel?: number;
  isLeaderboardEnabled?: boolean;
}

interface AuthContextType {
  user: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  dbMode: 'cloud' | 'local_persistence';
  lessonProgress: Record<string, LessonProgress>;
  quizAttempts: QuizAttempt[];
  achievements: Achievement[];
  recentNotice: string | null;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  demoLogin: () => Promise<void>;
  updateProfile: (updates: Partial<StudentProfile>) => Promise<void>;
  recordLessonCompletion: (lessonId: string, xpReward: number) => Promise<void>;
  recordQuizResult: (attempt: Omit<QuizAttempt, 'id' | 'user_id' | 'completed_at'>) => Promise<void>;
  toggleLeaderboard: (enabled: boolean) => Promise<void>;
  clearNotice: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({});
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentNotice, setRecentNotice] = useState<string | null>(null);

  const dbMode = isSupabaseConfigured ? 'cloud' : 'local_persistence';

  const clearNotice = () => setRecentNotice(null);

  // Initialize session on mount
  useEffect(() => {
    async function initSession() {
      setIsLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser(profile as StudentProfile);
              // fetch progress
              const { data: prog } = await supabase
                .from('lesson_progress')
                .select('*')
                .eq('user_id', session.user.id);
              if (prog) {
                const map: Record<string, LessonProgress> = {};
                prog.forEach(p => { map[p.lesson_id] = p; });
                setLessonProgress(map);
              }
              // fetch attempts
              const { data: attempts } = await supabase
                .from('quiz_attempts')
                .select('*')
                .eq('user_id', session.user.id)
                .order('completed_at', { ascending: false });
              if (attempts) setQuizAttempts(attempts);
            }
          }
        } else {
          // Local Persistent Storage fallback
          const active = getActiveSessionUser();
          if (active) {
            setUser(active);
            setLessonProgress(getLocalLessonProgress(active.id));
            setQuizAttempts(getLocalQuizAttempts(active.id));
            setAchievements(getLocalStudentAchievements(active.id));
          }
        }
      } catch (err) {
        console.error('Session init error', err);
      } finally {
        setIsLoading(false);
      }
    }

    initSession();
  }, []);

  // Synchronize state changes for active local user
  const syncLocalUserState = (updatedProfile: StudentProfile) => {
    setUser(updatedProfile);
    setActiveSessionUser(updatedProfile);
    const users = getStoredUsers();
    const idx = users.findIndex(u => u.id === updatedProfile.id);
    if (idx !== -1) {
      users[idx].profile = updatedProfile;
      saveStoredUsers(users);
    }
  };

  const register = async ({
    email,
    password,
    displayName,
    nickname,
    gradeLevel = 7,
    isLeaderboardEnabled = false
  }: RegisterData) => {
    setIsLoading(true);
    try {
      if (!email || !password || !displayName || !nickname) {
        return { success: false, error: 'All fields are required.' };
      }
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      if (isSupabaseConfigured && supabase) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password
        });
        if (authError || !authData.user) {
          return { success: false, error: authError?.message || 'Registration failed.' };
        }

        const newProfile: StudentProfile = {
          id: authData.user.id,
          email,
          display_name: displayName,
          nickname,
          grade_level: gradeLevel,
          total_xp: 50, // Welcome bonus
          lessons_completed: 0,
          quiz_performance: 0,
          is_leaderboard_enabled: isLeaderboardEnabled,
          avatar_seed: 'cosmic_scholar',
          created_at: new Date().toISOString()
        };

        const { error: profileError } = await supabase.from('profiles').insert(newProfile);
        if (profileError) {
          return { success: false, error: profileError.message };
        }

        setUser(newProfile);
        setRecentNotice('Account registered successfully! Welcome bonus: +50 XP.');
        return { success: true };
      } else {
        // Local Persistent Storage Mode
        const users = getStoredUsers();
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, error: 'A student account with this email already exists.' };
        }

        const newId = `user_${Date.now()}`;
        const newProfile: StudentProfile = {
          id: newId,
          email,
          display_name: displayName,
          nickname,
          grade_level: gradeLevel,
          total_xp: 50, // Welcome bonus
          lessons_completed: 0,
          quiz_performance: 0,
          is_leaderboard_enabled: isLeaderboardEnabled,
          avatar_seed: 'cosmic_scholar',
          created_at: new Date().toISOString()
        };

        users.push({
          id: newId,
          email,
          passwordHash: password,
          profile: newProfile
        });

        saveStoredUsers(users);
        setUser(newProfile);
        setActiveSessionUser(newProfile);
        setLessonProgress({});
        setQuizAttempts([]);
        setAchievements([]);

        setRecentNotice('Account registered successfully! Welcome bonus: +50 XP.');
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected registration error occurred.' };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (authError || !authData.user) {
          return { success: false, error: authError?.message || 'Invalid email or password.' };
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profile) {
          setUser(profile as StudentProfile);
          setRecentNotice(`Welcome back, ${profile.nickname}!`);
          return { success: true };
        }
        return { success: false, error: 'Profile not found.' };
      } else {
        // Local Persistent Storage
        const users = getStoredUsers();
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!found || found.passwordHash !== password) {
          return { success: false, error: 'Invalid email or password. Use demo account or create a new profile.' };
        }

        setUser(found.profile);
        setActiveSessionUser(found.profile);
        setLessonProgress(getLocalLessonProgress(found.profile.id));
        setQuizAttempts(getLocalQuizAttempts(found.profile.id));
        setAchievements(getLocalStudentAchievements(found.profile.id));

        setRecentNotice(`Welcome back, ${found.profile.nickname}!`);
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication error.' };
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async () => {
    await login('dawit@studyverse.edu', 'Studyverse#2026');
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setActiveSessionUser(null);
    setLessonProgress({});
    setQuizAttempts([]);
    setAchievements([]);
    setRecentNotice('You have logged out securely.');
  };

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates, updated_at: new Date().toISOString() };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('profiles').update(updates).eq('id', user.id);
      setUser(updated);
    } else {
      syncLocalUserState(updated);
    }
    setRecentNotice('Profile updated successfully.');
  };

  const toggleLeaderboard = async (enabled: boolean) => {
    await updateProfile({ is_leaderboard_enabled: enabled });
    if (enabled) {
      // Award leaderboard participation achievement if not unlocked
      if (user) {
        unlockLocalAchievement(user.id, 'LEADERBOARD_JOIN');
        setAchievements(getLocalStudentAchievements(user.id));
      }
      setRecentNotice(enabled ? 'Leaderboard participation enabled! Your nickname will appear on the leaderboard.' : 'Leaderboard participation disabled.');
    }
  };

  const recordLessonCompletion = async (lessonId: string, xpReward: number) => {
    if (!user) return;
    const existing = lessonProgress[lessonId];
    if (existing?.status === 'completed') {
      setRecentNotice('Lesson already completed previously.');
      return;
    }

    const newProgress: LessonProgress = {
      user_id: user.id,
      lesson_id: lessonId,
      status: 'completed',
      progress_percent: 100,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updatedMap = { ...lessonProgress, [lessonId]: newProgress };
    setLessonProgress(updatedMap);

    const newTotalXP = user.total_xp + xpReward;
    const newCompletedCount = user.lessons_completed + 1;
    const updatedProfile: StudentProfile = {
      ...user,
      total_xp: newTotalXP,
      lessons_completed: newCompletedCount
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('lesson_progress').upsert(newProgress);
      await supabase.from('profiles').update({
        total_xp: newTotalXP,
        lessons_completed: newCompletedCount
      }).eq('id', user.id);
      setUser(updatedProfile);
    } else {
      saveLocalLessonProgress(user.id, updatedMap);
      syncLocalUserState(updatedProfile);
      // Check achievements
      unlockLocalAchievement(user.id, 'FIRST_STEP');
      if (lessonId.startsWith('math')) {
        unlockLocalAchievement(user.id, 'MATH_EXPLORER');
      }
      setAchievements(getLocalStudentAchievements(user.id));
    }

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // non-critical
    }

    setRecentNotice(`Lesson completed! +${xpReward} XP earned.`);
  };

  const recordQuizResult = async (attemptData: Omit<QuizAttempt, 'id' | 'user_id' | 'completed_at'>) => {
    if (!user) return;

    const fullAttempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      user_id: user.id,
      ...attemptData,
      completed_at: new Date().toISOString()
    };

    const updatedAttempts = [fullAttempt, ...quizAttempts];
    setQuizAttempts(updatedAttempts);

    // Calculate new average quiz performance
    const totalScore = updatedAttempts.reduce((acc, curr) => acc + curr.score, 0);
    const avgScore = Number((totalScore / updatedAttempts.length).toFixed(1));
    const newTotalXP = user.total_xp + attemptData.xp_earned;

    const updatedProfile: StudentProfile = {
      ...user,
      total_xp: newTotalXP,
      quiz_performance: avgScore
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('quiz_attempts').insert(fullAttempt);
      await supabase.from('profiles').update({
        total_xp: newTotalXP,
        quiz_performance: avgScore
      }).eq('id', user.id);
      setUser(updatedProfile);
    } else {
      saveLocalQuizAttempt(user.id, fullAttempt);
      syncLocalUserState(updatedProfile);
      if (attemptData.score === 100) {
        unlockLocalAchievement(user.id, 'PERFECT_SCORE');
      }
      if (attemptData.quiz_id.includes('sci') && attemptData.score >= 80) {
        unlockLocalAchievement(user.id, 'LAB_DISCOVERER');
      }
      setAchievements(getLocalStudentAchievements(user.id));
    }

    if (attemptData.score >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // non-critical
      }
    }

    setRecentNotice(`Quiz submitted! Score: ${attemptData.score}%. +${attemptData.xp_earned} XP awarded.`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        dbMode,
        lessonProgress,
        quizAttempts,
        achievements,
        recentNotice,
        register,
        login,
        logout,
        demoLogin,
        updateProfile,
        recordLessonCompletion,
        recordQuizResult,
        toggleLeaderboard,
        clearNotice
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

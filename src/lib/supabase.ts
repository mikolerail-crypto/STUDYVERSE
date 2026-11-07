import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { StudentProfile, LessonProgress, QuizAttempt, Achievement, LeaderboardEntry } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/curriculumData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================================
// LOCAL PERSISTENCE STORAGE LAYER (FALLBACK WHEN SUPABASE CLOUD IS UNCONFIGURED)
// ============================================================================
const LOCAL_STORAGE_KEY_USERS = 'studyverse_users_v2';
const LOCAL_STORAGE_KEY_CURRENT_USER = 'studyverse_active_session_v2';
const LOCAL_STORAGE_KEY_PROGRESS = 'studyverse_lesson_progress_v2';
const LOCAL_STORAGE_KEY_ATTEMPTS = 'studyverse_quiz_attempts_v2';
const LOCAL_STORAGE_KEY_ACHIEVEMENTS = 'studyverse_achievements_v2';

interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  profile: StudentProfile;
}

// Initial default seed users for test journeys
const DEFAULT_SEED_USERS: StoredUser[] = [
  {
    id: 'user-demo-dawit',
    email: 'dawit@studyverse.edu',
    passwordHash: 'Studyverse#2026',
    profile: {
      id: 'user-demo-dawit',
      email: 'dawit@studyverse.edu',
      display_name: 'Dawit Bekele',
      nickname: 'AstroScholar',
      grade_level: 7,
      total_xp: 450,
      lessons_completed: 3,
      quiz_performance: 92.5,
      is_leaderboard_enabled: true,
      avatar_seed: 'cosmic_scholar',
      created_at: '2026-09-01T08:00:00.000Z'
    }
  },
  {
    id: 'user-demo-chaltu',
    email: 'chaltu@studyverse.edu',
    passwordHash: 'Studyverse#2026',
    profile: {
      id: 'user-demo-chaltu',
      email: 'chaltu@studyverse.edu',
      display_name: 'Chaltu Gemechu',
      nickname: 'QuantumExplorer',
      grade_level: 7,
      total_xp: 620,
      lessons_completed: 5,
      quiz_performance: 96.0,
      is_leaderboard_enabled: true,
      avatar_seed: 'nebula_navigator',
      created_at: '2026-08-25T10:30:00.000Z'
    }
  },
  {
    id: 'user-demo-yared',
    email: 'yared@studyverse.edu',
    passwordHash: 'Studyverse#2026',
    profile: {
      id: 'user-demo-yared',
      email: 'yared@studyverse.edu',
      display_name: 'Yared Tadesse',
      nickname: 'VortexLearner',
      grade_level: 7,
      total_xp: 380,
      lessons_completed: 2,
      quiz_performance: 88.0,
      is_leaderboard_enabled: true,
      avatar_seed: 'stellar_pioneer',
      created_at: '2026-09-12T14:15:00.000Z'
    }
  }
];

export function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(DEFAULT_SEED_USERS));
      return DEFAULT_SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SEED_USERS;
  }
}

export function saveStoredUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users to local storage', e);
  }
}

export function getLocalLessonProgress(userId: string): Record<string, LessonProgress> {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY_PROGRESS}_${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLocalLessonProgress(userId: string, progress: Record<string, LessonProgress>) {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PROGRESS}_${userId}`, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save lesson progress', e);
  }
}

export function getLocalQuizAttempts(userId: string): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY_ATTEMPTS}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalQuizAttempt(userId: string, attempt: QuizAttempt) {
  try {
    const existing = getLocalQuizAttempts(userId);
    const updated = [attempt, ...existing];
    localStorage.setItem(`${LOCAL_STORAGE_KEY_ATTEMPTS}_${userId}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save quiz attempt', e);
  }
}

export function getLocalStudentAchievements(userId: string): Achievement[] {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY_ACHIEVEMENTS}_${userId}`);
    if (raw) return JSON.parse(raw);
    // Default unlocked achievement for seed user
    if (userId.includes('dawit')) {
      return [
        { ...INITIAL_ACHIEVEMENTS[0], unlocked_at: '2026-09-02T10:00:00Z' },
        { ...INITIAL_ACHIEVEMENTS[1], unlocked_at: '2026-09-04T12:00:00Z' }
      ];
    }
    return [];
  } catch {
    return [];
  }
}

export function unlockLocalAchievement(userId: string, achievementCode: string): Achievement | null {
  try {
    const existing = getLocalStudentAchievements(userId);
    if (existing.some(a => a.code === achievementCode)) {
      return null; // Already unlocked
    }
    const template = INITIAL_ACHIEVEMENTS.find(a => a.code === achievementCode);
    if (!template) return null;

    const unlocked: Achievement = {
      ...template,
      unlocked_at: new Date().toISOString()
    };
    const updated = [...existing, unlocked];
    localStorage.setItem(`${LOCAL_STORAGE_KEY_ACHIEVEMENTS}_${userId}`, JSON.stringify(updated));
    return unlocked;
  } catch (e) {
    console.error('Failed to unlock achievement', e);
    return null;
  }
}

export function getActiveSessionUser(): StudentProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setActiveSessionUser(profile: StudentProfile | null) {
  try {
    if (!profile) {
      localStorage.removeItem(LOCAL_STORAGE_KEY_CURRENT_USER);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(profile));
    }
  } catch (e) {
    console.error('Failed to update active session', e);
  }
}

export function getLeaderboardEntries(currentUserId?: string): LeaderboardEntry[] {
  const users = getStoredUsers();
  // Filter only opted-in users as required by privacy specifications
  const optedIn = users
    .filter(u => u.profile.is_leaderboard_enabled)
    .map(u => ({
      nickname: u.profile.nickname,
      total_xp: u.profile.total_xp,
      lessons_completed: u.profile.lessons_completed,
      avatar_seed: u.profile.avatar_seed,
      is_current_user: u.profile.id === currentUserId
    }));

  // Sort descending by total_xp
  optedIn.sort((a, b) => b.total_xp - a.total_xp);

  return optedIn.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_SUBJECTS, INITIAL_LESSONS, INITIAL_QUIZZES } from '../data/curriculumData';

interface DashboardPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user, lessonProgress, quizAttempts, achievements } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-300">
        <p>Please log in to view your personalized dashboard.</p>
        <button
          onClick={() => onNavigate('login')}
          className="mt-4 px-4 py-2 bg-cyan-600 rounded-lg text-white font-medium text-xs"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Calculate learning metrics from actual saved database records
  const totalLessonsInCurriculum = INITIAL_LESSONS.length;
  const completedLessonsCount = Object.values(lessonProgress).filter(p => p.status === 'completed').length;
  const overallCurriculumProgress = Math.min(100, Math.round((completedLessonsCount / totalLessonsInCurriculum) * 100));

  // Determine scholar level based on XP
  const calculateLevel = (xp: number) => {
    if (xp >= 1000) return { title: 'Cosmic Scholar V', current: 5, nextXP: 1500, progress: 100 };
    if (xp >= 600) return { title: 'Master Scholar IV', current: 4, nextXP: 1000, progress: Math.round(((xp - 600) / 400) * 100) };
    if (xp >= 350) return { title: 'Advanced Explorer III', current: 3, nextXP: 600, progress: Math.round(((xp - 350) / 250) * 100) };
    if (xp >= 150) return { title: 'Adept Scholar II', current: 2, nextXP: 350, progress: Math.round(((xp - 150) / 200) * 100) };
    return { title: 'Novice Scholar I', current: 1, nextXP: 150, progress: Math.round((xp / 150) * 100) };
  };

  const scholarLevel = calculateLevel(user.total_xp);

  // Recommended next lesson: first lesson that is not completed
  const nextLesson = INITIAL_LESSONS.find(l => !lessonProgress[l.id] || lessonProgress[l.id].status !== 'completed') || INITIAL_LESSONS[0];
  const nextLessonSubject = INITIAL_SUBJECTS.find(s => s.id === nextLesson.subject_id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b1329] via-[#091024] to-[#111936] border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase flex items-center gap-2">
              <span>Grade 7 Academic Command</span>
              <span className="text-slate-600">·</span>
              <span>Term 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome, {user.display_name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Academic Nickname: <strong className="text-cyan-300 font-medium">@{user.nickname}</strong>. You have completed {completedLessonsCount} lesson{completedLessonsCount === 1 ? '' : 's'} and unlocked {achievements.length} achievement milestone{achievements.length === 1 ? '' : 's'}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('lesson-reader', { lessonId: nextLesson.id })}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-cyan-950 flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Continue Learning →</span>
            </button>
            <button
              onClick={() => onNavigate('ai-tutor')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total XP Earned</span>
            <span className="text-cyan-400 font-semibold">{scholarLevel.title}</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white tracking-tight">
            {user.total_xp} <span className="text-xs font-normal text-slate-400 font-sans">XP</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, scholarLevel.progress)}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500">
            {scholarLevel.nextXP - user.total_xp > 0 ? `${scholarLevel.nextXP - user.total_xp} XP to next scholar tier` : 'Top scholar rank unlocked!'}
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Curriculum Progress</span>
            <span className="font-mono text-slate-300">{overallCurriculumProgress}%</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white tracking-tight">
            {completedLessonsCount} / {totalLessonsInCurriculum}
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallCurriculumProgress}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500">
            Verified Ethiopian Grade 7 Syllabus
          </div>
        </div>

        {/* Quiz Performance Average */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Assessment Mastery</span>
            <span className="text-xs text-violet-400">{quizAttempts.length} Tests Taken</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white tracking-tight">
            {user.quiz_performance || (quizAttempts.length > 0 ? Math.round(quizAttempts.reduce((a, b) => a + b.score, 0) / quizAttempts.length) : 0)}%
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-violet-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${user.quiz_performance || 0}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500">
            Average across all attempts
          </div>
        </div>

        {/* Daily Learning Goal */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Daily Goal</span>
            <span className="text-emerald-400 font-semibold">Active</span>
          </div>
          <div className="text-sm font-semibold text-white mt-1">
            Complete 1 Lesson + 1 Quiz
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
            <span className={`w-2 h-2 rounded-full ${completedLessonsCount > 0 ? 'bg-emerald-400' : 'bg-slate-600'}`} />
            <span>Lesson: {completedLessonsCount > 0 ? 'Done' : 'Pending'}</span>
            <span className="text-slate-600">·</span>
            <span className={`w-2 h-2 rounded-full ${quizAttempts.length > 0 ? 'bg-emerald-400' : 'bg-slate-600'}`} />
            <span>Quiz: {quizAttempts.length > 0 ? 'Done' : 'Pending'}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Strengthen your daily study habit
          </div>
        </div>
      </div>

      {/* Main Two-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recommended Next Lesson & Subjects */}
        <div className="lg:col-span-8 space-y-8">
          {/* Recommended Next Lesson Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
              Recommended Next Lesson
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {nextLesson.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>{nextLessonSubject?.title}</span>
                  <span aria-hidden="true">·</span>
                  <span>Unit {nextLesson.unit_number}</span>
                  <span aria-hidden="true">·</span>
                  <span>~{nextLesson.estimated_minutes} mins</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-cyan-400 font-mono font-medium">+{nextLesson.xp_reward} XP</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('lesson-reader', { lessonId: nextLesson.id })}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors whitespace-nowrap shrink-0 shadow-md shadow-cyan-950"
              >
                Start Lesson →
              </button>
            </div>
          </div>

          {/* Core Subjects Quick Access */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Subject Progress</h2>
              <button
                onClick={() => onNavigate('subjects')}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                All Subjects →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INITIAL_SUBJECTS.map((sub) => {
                const subLessons = INITIAL_LESSONS.filter(l => l.subject_id === sub.id);
                const subCompleted = subLessons.filter(l => lessonProgress[l.id]?.status === 'completed').length;
                const percent = subLessons.length > 0 ? Math.round((subCompleted / subLessons.length) * 100) : 0;

                return (
                  <div
                    key={sub.id}
                    onClick={() => onNavigate('course-details', { subjectId: sub.id })}
                    className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {sub.title}
                      </h4>
                      <span className="text-xs font-mono text-slate-400">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mb-2">
                      <div
                        className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{subCompleted} of {subLessons.length} lessons finished</span>
                      <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Explore →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activities Feed & Achievements */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Activity Feed */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Recent Learning Activities</h3>
            {quizAttempts.length === 0 && completedLessonsCount === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">
                No recent activity recorded yet. Start your first lesson or take a quiz to begin earning XP!
              </p>
            ) : (
              <div className="space-y-3">
                {quizAttempts.slice(0, 3).map((att) => {
                  const q = INITIAL_QUIZZES.find(quiz => quiz.id === att.quiz_id);
                  return (
                    <div key={att.id} className="text-xs border-b border-slate-800/80 pb-2.5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200 truncate max-w-[160px]">
                          {q?.title || 'Unit Quiz'}
                        </span>
                        <span className={`font-mono font-bold ${att.score >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {att.score}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mt-1">
                        <span>Score: {att.correct_answers}/{att.total_questions} correct</span>
                        <span className="text-cyan-400 font-mono">+{att.xp_earned} XP</span>
                      </div>
                    </div>
                  );
                })}

                {Object.entries(lessonProgress)
                  .filter(([_, p]) => p.status === 'completed')
                  .slice(0, 3)
                  .map(([lesId, p]) => {
                    const lessonObj = INITIAL_LESSONS.find(l => l.id === lesId);
                    return (
                      <div key={lesId} className="text-xs border-b border-slate-800/80 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200 truncate max-w-[160px]">
                            {lessonObj?.title || 'Lesson Completed'}
                          </span>
                          <span className="text-emerald-400 font-mono text-[11px]">Completed</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400 text-[11px] mt-1">
                          <span>Unit Lesson</span>
                          <span className="text-cyan-400 font-mono">+50 XP</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Quick AI Tutor Callout */}
          <div className="bg-gradient-to-br from-violet-950/40 via-slate-900 to-slate-950 border border-violet-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <span>STUDYVERSE AI Companion</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have questions about rational numbers, cell organelles, or Afaan Oromoo grammar? Ask our AI tutor for instant step-by-step guidance.
            </p>
            <button
              onClick={() => onNavigate('ai-tutor')}
              className="w-full py-2 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors"
            >
              Open AI Tutor →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

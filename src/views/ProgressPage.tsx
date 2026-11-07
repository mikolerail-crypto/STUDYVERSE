import React from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_SUBJECTS, INITIAL_LESSONS, INITIAL_QUIZZES } from '../data/curriculumData';

interface ProgressPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ onNavigate }) => {
  const { user, lessonProgress, quizAttempts, achievements } = useAuth();

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-400">
        Please sign in to view your learning analytics.
      </div>
    );
  }

  const completedLessons = Object.entries(lessonProgress).filter(([_, p]) => p.status === 'completed');
  const totalLessons = INITIAL_LESSONS.length;
  const overallPercentage = Math.round((completedLessons.length / totalLessons) * 100);

  // Subject completion breakdown
  const subjectBreakdown = INITIAL_SUBJECTS.map((sub) => {
    const subLessons = INITIAL_LESSONS.filter(l => l.subject_id === sub.id);
    const subCompleted = subLessons.filter(l => lessonProgress[l.id]?.status === 'completed').length;
    const pct = subLessons.length > 0 ? Math.round((subCompleted / subLessons.length) * 100) : 0;
    return {
      ...sub,
      completedCount: subCompleted,
      totalCount: subLessons.length,
      percentage: pct
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          Academic Analytics & Progress
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Learning Progress Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Real-time tracking of lessons completed, assessment scores, and earned XP. All data persists across sessions.
        </p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <span className="text-xs text-slate-400">Curriculum Completion</span>
          <div className="text-2xl font-mono font-bold text-cyan-400">
            {overallPercentage}%
          </div>
          <p className="text-[11px] text-slate-500">
            {completedLessons.length} of {totalLessons} modules finished
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <span className="text-xs text-slate-400">Total XP Earned</span>
          <div className="text-2xl font-mono font-bold text-white">
            {user.total_xp} <span className="text-xs text-slate-500 font-sans">XP</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Verified server-side calculation
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <span className="text-xs text-slate-400">Average Quiz Accuracy</span>
          <div className="text-2xl font-mono font-bold text-violet-400">
            {user.quiz_performance}%
          </div>
          <p className="text-[11px] text-slate-500">
            Across {quizAttempts.length} unit assessments
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
          <span className="text-xs text-slate-400">Milestones Unlocked</span>
          <div className="text-2xl font-mono font-bold text-amber-400">
            {achievements.length} <span className="text-xs text-slate-500 font-sans">Badges</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Academic honors earned
          </p>
        </div>
      </div>

      {/* Subject-by-Subject Progress Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Subject Mastery Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectBreakdown.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <span className="text-xs font-mono text-cyan-400 font-semibold">{item.percentage}%</span>
              </div>

              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{item.completedCount} of {item.totalCount} lessons</span>
                <button
                  onClick={() => onNavigate('course-details', { subjectId: item.id })}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Quiz Attempts Log */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Assessment Attempt Log</h2>
        {quizAttempts.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
            No quiz attempts recorded yet. Visit the Quiz Center to take your first test!
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Quiz Title</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Correct</th>
                    <th className="py-3 px-4">XP Earned</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {quizAttempts.map((att) => {
                    const quiz = INITIAL_QUIZZES.find(q => q.id === att.quiz_id);
                    return (
                      <tr key={att.id} className="hover:bg-slate-850/40">
                        <td className="py-3 px-4 font-semibold text-white">
                          {quiz?.title || att.quiz_id}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold">
                          <span className={att.score >= 70 ? 'text-emerald-400' : 'text-amber-400'}>
                            {att.score}%
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {att.correct_answers} / {att.total_questions}
                        </td>
                        <td className="py-3 px-4 font-mono text-cyan-400 font-semibold">
                          +{att.xp_earned} XP
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(att.completed_at).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

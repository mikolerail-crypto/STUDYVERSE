import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_QUIZZES, INITIAL_SUBJECTS } from '../data/curriculumData';

interface QuizCenterPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const QuizCenterPage: React.FC<QuizCenterPageProps> = ({ onNavigate }) => {
  const { quizAttempts } = useAuth();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredQuizzes = filterDifficulty === 'all'
    ? INITIAL_QUIZZES
    : INITIAL_QUIZZES.filter(q => q.difficulty === filterDifficulty);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            Interactive Assessment System
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Grade 7 Examination Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Timed unit tests with secure server-side answer validation. All attempts, scores, and XP bonuses are automatically recorded.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setFilterDifficulty('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterDifficulty === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Difficulties
          </button>
          <button
            onClick={() => setFilterDifficulty('beginner')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterDifficulty === 'beginner' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setFilterDifficulty('intermediate')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterDifficulty === 'intermediate' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Intermediate
          </button>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => {
          const subject = INITIAL_SUBJECTS.find(s => s.id === quiz.subject_id);
          const pastAttempts = quizAttempts.filter(a => a.quiz_id === quiz.id);
          const bestScore = pastAttempts.length > 0 ? Math.max(...pastAttempts.map(a => a.score)) : null;

          return (
            <div
              key={quiz.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-violet-500/50 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 font-semibold">{subject?.title}</span>
                  <span className={`capitalize px-2 py-0.5 rounded text-[11px] font-semibold ${
                    quiz.difficulty === 'beginner' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    quiz.difficulty === 'intermediate' ? 'bg-violet-950 text-violet-300 border border-violet-800' :
                    'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {quiz.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {quiz.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>⏱ {Math.round(quiz.time_limit_seconds / 60)} minutes</span>
                  <span>·</span>
                  <span>Pass: {quiz.pass_score_percent}%</span>
                  <span>·</span>
                  <span className="text-cyan-400 font-mono font-semibold">+{quiz.xp_reward} XP</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  {bestScore !== null ? (
                    <span className="text-xs text-slate-300">
                      Best: <strong className={`font-mono ${bestScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{bestScore}%</strong> ({pastAttempts.length} attempt{pastAttempts.length === 1 ? '' : 's'})
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 italic">Not attempted yet</span>
                  )}
                </div>

                <button
                  onClick={() => onNavigate('exam', { quizId: quiz.id })}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors shadow-md shadow-violet-950"
                >
                  {bestScore !== null ? 'Retake Exam →' : 'Start Assessment →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz History Section */}
      {quizAttempts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white">Your Examination Records</h2>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Assessment</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">XP Earned</th>
                    <th className="py-3 px-4">Date Completed</th>
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
                          {new Date(att.completed_at).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

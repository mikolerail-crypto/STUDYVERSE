import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLeaderboardEntries } from '../lib/supabase';
import { LeaderboardEntry } from '../types';

export const LeaderboardPage: React.FC = () => {
  const { user, toggleLeaderboard } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Read opted-in public leaderboard entries
    const list = getLeaderboardEntries(user?.id);
    setEntries(list);
  }, [user]);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await toggleLeaderboard(e.target.checked);
    // Refresh list
    setEntries(getLeaderboardEntries(user?.id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            Academic Standings
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Grade 7 Live Scholar Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Rankings update automatically whenever scholars earn XP by completing verified lessons and quizzes.
          </p>
        </div>

        {/* Privacy & Opt-in Box */}
        {user && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-200">
              <input
                type="checkbox"
                checked={user.is_leaderboard_enabled}
                onChange={handleToggle}
                className="rounded border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Participate in Public Rankings</span>
            </label>
            <p className="text-[10px] text-slate-400">
              {user.is_leaderboard_enabled
                ? `Active as @${user.nickname}. Email and private data remain private.`
                : 'Disabled. Your profile and XP are currently hidden from other scholars.'}
            </p>
          </div>
        )}
      </div>

      {/* Leaderboard Table Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {entries.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No scholars currently have leaderboard visibility enabled. Enable the toggle above to take 1st place!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Scholar Nickname</th>
                  <th className="py-4 px-6 text-right">Lessons Done</th>
                  <th className="py-4 px-6 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {entries.map((entry) => {
                  const isUser = entry.is_current_user;
                  const rank = entry.rank;

                  return (
                    <tr
                      key={entry.nickname}
                      className={`transition-colors ${
                        isUser
                          ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400'
                          : 'hover:bg-slate-850/40'
                      }`}
                    >
                      <td className="py-4 px-6 font-mono font-bold">
                        {rank === 1 ? (
                          <span className="text-amber-400 font-extrabold flex items-center gap-1.5">
                            👑 #1
                          </span>
                        ) : rank === 2 ? (
                          <span className="text-slate-300 font-bold">#2</span>
                        ) : rank === 3 ? (
                          <span className="text-amber-600 font-bold">#3</span>
                        ) : (
                          <span className="text-slate-500">#{rank}</span>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs">
                            {entry.nickname.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-white">
                              @{entry.nickname}
                            </span>
                            {isUser && (
                              <span className="ml-2 text-[10px] font-semibold text-cyan-400 bg-cyan-950 border border-cyan-800 px-1.5 py-0.5 rounded">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right font-mono text-slate-300">
                        {entry.lessons_completed}
                      </td>

                      <td className="py-4 px-6 text-right font-mono font-bold text-cyan-400">
                        {entry.total_xp} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
        <span className="text-cyan-400">🔒</span>
        <span>
          <strong>Ethical Privacy Compliance:</strong> Only opted-in scholars with verified nicknames and accumulated XP appear on this board. Emails, real names, and individual question answers are never exposed.
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, achievements } = useAuth();
  const [nicknameInput, setNicknameInput] = useState(user?.nickname || '');
  const [displayNameInput, setDisplayNameInput] = useState(user?.display_name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-400">
        Please sign in to access your profile.
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicknameInput.trim() || !displayNameInput.trim()) return;

    await updateProfile({
      nickname: nicknameInput.trim(),
      display_name: displayNameInput.trim()
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          Student Identity
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Scholar Profile & Credentials
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your student credentials, public nickname, and privacy settings.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
          Profile updated successfully!
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {user.nickname.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {user.display_name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="font-mono text-cyan-400">@{user.nickname}</span>
                <span>·</span>
                <span>Grade {user.grade_level}</span>
                <span>·</span>
                <span>Member since {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Edit Form or Display Grid */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 max-w-md">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                Display Name
              </label>
              <input
                type="text"
                required
                value={displayNameInput}
                onChange={(e) => setDisplayNameInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                Leaderboard Nickname
              </label>
              <input
                type="text"
                required
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Total Accumulated XP</span>
              <div className="text-2xl font-mono font-bold text-cyan-300">
                {user.total_xp}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Completed Lessons</span>
              <div className="text-2xl font-mono font-bold text-emerald-300">
                {user.lessons_completed}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Average Quiz Performance</span>
              <div className="text-2xl font-mono font-bold text-violet-300">
                {user.quiz_performance}%
              </div>
            </div>
          </div>
        )}

        {/* Privacy Status */}
        <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between">
            <span>Public Leaderboard Participation:</span>
            <span className={`font-semibold ${user.is_leaderboard_enabled ? 'text-emerald-400' : 'text-slate-500'}`}>
              {user.is_leaderboard_enabled ? 'Enabled (Visible as @' + user.nickname + ')' : 'Disabled (Hidden)'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Student Email Privacy:</span>
            <span className="text-slate-200">Confidential (Never shared publicly)</span>
          </div>
        </div>
      </div>

      {/* Unlocked Achievements Shelf */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Unlocked Milestone Achievements</h3>
        {achievements.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/60 rounded-xl border border-slate-800">
            No achievements unlocked yet. Finish your first lesson or score 100% on a quiz to earn your first badge!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-700/60 flex items-center justify-center text-amber-300 font-bold text-base shrink-0">
                  🏆
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{ach.description}</p>
                  <span className="text-[10px] text-cyan-400 font-mono block mt-1">+{ach.xp_bonus} Bonus XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface RegisterPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register, isLoading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLeaderboardEnabled, setIsLeaderboardEnabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 6) {
      setErrorMsg('Password must contain at least 6 characters.');
      return;
    }

    const result = await register({
      displayName,
      nickname,
      email,
      password,
      gradeLevel: 7,
      isLeaderboardEnabled
    });

    if (result.success) {
      onNavigate('dashboard');
    } else {
      setErrorMsg(result.error || 'Failed to complete registration.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold mb-2 inline-block"
          >
            ← Return to Overview
          </button>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Create Student Account
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Join STUDYVERSE Grade 7. Receive <strong>+50 XP Welcome Bonus</strong>.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-rose-950/60 border border-rose-900/80 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">
              Full Display Name
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Sara Mohammed"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">
              Public Academic Nickname
            </label>
            <input
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. StellarScholar7"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none transition-colors"
            />
            <p className="text-[10px] text-slate-500 mt-0.5">
              Used if you choose to participate in the live leaderboard.
            </p>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">
              Student Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@studyverse.edu"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">
              Create Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none transition-colors"
            />
          </div>

          {/* Privacy Compliant Leaderboard Opt-in (Default False) */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={isLeaderboardEnabled}
                onChange={(e) => setIsLeaderboardEnabled(e.target.checked)}
                className="mt-0.5 rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="leading-tight text-slate-400">
                Participate in the live Grade 7 academic leaderboard. (Only your nickname and earned XP will appear publicly; your email remains confidential).
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-900/40 disabled:opacity-50 mt-3"
          >
            {isLoading ? 'Registering Account...' : 'Create Account & Claim +50 XP'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

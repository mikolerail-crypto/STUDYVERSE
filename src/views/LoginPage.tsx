import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, demoLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const result = await login(email, password);
    if (result.success) {
      onNavigate('dashboard');
    } else {
      setErrorMsg(result.error || 'Invalid credentials.');
    }
  };

  const handleDemo = async () => {
    await demoLogin();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold mb-2 inline-block"
          >
            ← Return to Overview
          </button>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Welcome Back, Scholar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your Grade 7 lessons, earned XP, and saved progress.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-rose-950/60 border border-rose-900/80 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1.5">
              Student Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dawit@studyverse.edu"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-slate-300 font-medium">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-md shadow-cyan-900/40 disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Authenticating...' : 'Sign In to STUDYVERSE'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
          <div className="text-center text-xs text-slate-400">
            Evaluating the platform? Use one-click student demo:
          </div>
          <button
            type="button"
            onClick={handleDemo}
            className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span>🚀 Demo Student: Dawit Bekele (Grade 7)</span>
          </button>

          <div className="text-center text-xs text-slate-400 pt-2">
            Don't have an account yet?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Register here
            </button>
          </div>
        </div>
      </div>

      {/* Password Recovery Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0b1329] border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Password Recovery</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your student email address to receive password reset instructions.
            </p>
            <input
              type="email"
              placeholder="student@studyverse.edu"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
            />
            {resetSent ? (
              <p className="text-xs text-emerald-400 font-medium">
                Reset instructions dispatched! (For demo, use password: Studyverse#2026)
              </p>
            ) : null}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => { setShowForgotModal(false); setResetSent(false); }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setResetSent(true)}
                className="text-xs px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-semibold"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

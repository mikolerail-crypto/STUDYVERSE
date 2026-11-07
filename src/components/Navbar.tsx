import React from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSettings }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <button
          onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-cyan-400 to-violet-500 inline-block" />
          <span>STUDYVERSE</span>
        </button>

        {/* Zone 2: 4-5 Clean Single-Line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('subjects')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-300 ${
              currentView === 'subjects' || currentView === 'course-details' || currentView === 'lesson-reader'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            Subjects
          </button>
          <button
            onClick={() => onNavigate('quizzes')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-300 ${
              currentView === 'quizzes' || currentView === 'exam' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Quizzes
          </button>
          <button
            onClick={() => onNavigate('ai-tutor')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-300 ${
              currentView === 'ai-tutor' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            AI Assistant
          </button>
          <button
            onClick={() => onNavigate('videos')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-300 ${
              currentView === 'videos' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => onNavigate('leaderboard')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-300 ${
              currentView === 'leaderboard' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Leaderboard
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs font-medium text-slate-200 transition-colors"
              >
                <span className="text-cyan-400 font-mono font-semibold">{user.total_xp} XP</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 truncate max-w-[100px]">{user.nickname}</span>
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-900/40"
              >
                Profile
              </button>

              <button
                onClick={onOpenSettings}
                title="Settings & Supabase Config"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Settings"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              <button
                onClick={logout}
                className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors whitespace-nowrap shrink-0"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onNavigate('login')}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                Log In
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-900/40"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

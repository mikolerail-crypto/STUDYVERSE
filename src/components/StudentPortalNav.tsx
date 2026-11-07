import React from 'react';
import { useAuth } from '../context/AuthContext';

interface StudentPortalNavProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
}

export const StudentPortalNav: React.FC<StudentPortalNavProps> = ({ currentView, onNavigate }) => {
  const { user, dbMode } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'quizzes', label: 'Quiz Center' },
    { id: 'progress', label: 'Progress & Stats' },
    { id: 'ai-tutor', label: 'AI Study Tutor' },
    { id: 'videos', label: 'Video Center' },
    { id: 'notes', label: 'Study Notes' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <div className="bg-[#0b1224] border-b border-slate-800/80 px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Navigation Tabs (Single line with horizontal scroll on small screens) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Database Status Marker */}
        <div className="flex items-center gap-2 text-xs shrink-0 text-slate-400">
          <span className={`w-2 h-2 rounded-full ${dbMode === 'cloud' ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
          <span>
            Database: <strong className="text-slate-200">{dbMode === 'cloud' ? 'Supabase Cloud' : 'Local Persistent Storage'}</strong>
          </span>
          {user && (
            <>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-cyan-400 font-semibold">{user.total_xp} XP</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

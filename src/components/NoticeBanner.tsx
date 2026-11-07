import React from 'react';
import { useAuth } from '../context/AuthContext';

export const NoticeBanner: React.FC = () => {
  const { recentNotice, clearNotice } = useAuth();

  if (!recentNotice) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-violet-950/80 border-b border-cyan-800/40 px-4 py-2.5 text-xs text-cyan-200 flex items-center justify-between transition-all">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{recentNotice}</span>
        </div>
        <button
          onClick={clearNotice}
          className="text-slate-400 hover:text-white px-2 py-0.5 text-xs font-semibold"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

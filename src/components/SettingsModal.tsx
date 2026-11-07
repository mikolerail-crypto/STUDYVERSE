import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { dbMode, user, logout } = useAuth();
  const [copiedSql, setCopiedSql] = useState(false);
  const [healthStatus, setHealthStatus] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/health')
        .then((res) => res.json())
        .then((data) => setHealthStatus(data))
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySql = () => {
    const sqlText = `-- Studyverse 2.0 Supabase Migration
-- See /supabase/migrations/20260301000000_studyverse_initial_schema.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT NOT NULL,
    nickname TEXT NOT NULL,
    grade_level INTEGER NOT NULL DEFAULT 7,
    total_xp INTEGER NOT NULL DEFAULT 0,
    lessons_completed INTEGER NOT NULL DEFAULT 0,
    quiz_performance NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    is_leaderboard_enabled BOOLEAN NOT NULL DEFAULT false,
    avatar_seed TEXT NOT NULL DEFAULT 'cosmic_scholar',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);`;

    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleResetStorage = () => {
    if (window.confirm('Reset all local student profiles, XP, and quiz records to initial seed data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#0b1329] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Platform Settings & Architecture</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Grade 7 educational platform configurations and database status.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Database & Cloud Integration Status */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Supabase PostgreSQL & Auth Status
          </h4>
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Connection Mode:</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                {dbMode === 'cloud' ? 'Cloud Supabase Active' : 'Local Persistent Storage Mode'}
              </span>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed">
              {dbMode === 'cloud' ? (
                <p className="text-emerald-400">
                  Connected to cloud Supabase instance. Auth sessions and progress are syncing with PostgreSQL tables.
                </p>
              ) : (
                <p>
                  <strong>No external Supabase credentials required for testing:</strong> All student accounts, lessons completed, quiz attempts, and earned XP are persistently stored in the browser/backend layer. To connect to an external Supabase project, provide <code className="text-cyan-300">VITE_SUPABASE_URL</code> and <code className="text-cyan-300">VITE_SUPABASE_ANON_KEY</code> in environment variables.
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Migration File:</span>
              <button
                onClick={handleCopySql}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
              >
                {copiedSql ? 'Copied to Clipboard!' : 'Copy Schema SQL'}
              </button>
            </div>
          </div>
        </div>

        {/* AI Tutor Integration Status */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            STUDYVERSE AI (Google Gemini 3.8 Flash)
          </h4>
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Server SDK:</span>
              <span className="font-mono text-slate-200">@google/genai (v2.x)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">AI Model:</span>
              <span className="font-mono text-cyan-300">models/gemini-3.8-flash</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Server Route:</span>
              <span className="font-mono text-slate-400">/api/ai/chat & /api/ai/practice-generator</span>
            </div>
          </div>
        </div>

        {/* Testing & Reset Utility */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <button
            onClick={handleResetStorage}
            className="w-full sm:w-auto text-xs px-3 py-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-900/60 text-rose-300 transition-colors"
          >
            Reset Test Data to Factory Defaults
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto text-xs px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};

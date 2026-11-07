import React from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_SUBJECTS } from '../data/curriculumData';

interface LandingPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { isAuthenticated, demoLogin } = useAuth();

  const handleTestDrive = async () => {
    await demoLogin();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600 via-violet-900 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase flex items-center gap-2">
                <span>Ethiopian Grade 7 Curriculum</span>
                <span className="text-slate-600">·</span>
                <span>STEM & Languages</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Explore Knowledge.{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                  Unlock Your Potential.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                STUDYVERSE 2.0 is the next-generation academic portal for Grade 7 scholars. Master Rational Numbers, Cell Biology, Classical Simple Machines, English Grammar, Ethiopian Topography, and Afaan Oromoo through interactive simulations, server-graded quizzes, and our intelligent AI tutor.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-900/40"
                  >
                    Enter Student Dashboard →
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('register')}
                      className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-900/40"
                    >
                      Join STUDYVERSE Free
                    </button>
                    <button
                      onClick={handleTestDrive}
                      className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
                    >
                      Test Drive (Instant Student Demo)
                    </button>
                  </>
                )}
                <button
                  onClick={() => onNavigate('subjects')}
                  className="px-5 py-3 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Browse Curriculum Library
                </button>
              </div>

              {/* Zero-Pill Metric Indicators */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div>
                  <span className="block font-mono text-base font-bold text-white">5 Core</span>
                  <span>Grade 7 Subjects</span>
                </div>
                <span className="text-slate-700">|</span>
                <div>
                  <span className="block font-mono text-base font-bold text-cyan-400">100% Secure</span>
                  <span>Server-Graded Assessments</span>
                </div>
                <span className="text-slate-700">|</span>
                <div>
                  <span className="block font-mono text-base font-bold text-violet-400">Gemini 3.8</span>
                  <span>Interactive AI Academic Tutor</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl group">
                <img
                  src="/src/assets/images/hero_studyverse_grade7_1794057134312.jpg"
                  alt="STUDYVERSE Grade 7 Academic Interface"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white">Interactive Stage: Science & Math</span>
                    <span className="font-mono text-cyan-400">Grade 7 Live</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Holographic cellular inspections and algebraic balance models built for Ethiopian students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Grade 7 Subjects Section */}
      <section className="py-16 bg-[#090e1c] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
                Grade 7 Learning Library
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Explore the Five Academic Pillars
              </h2>
            </div>
            <button
              onClick={() => onNavigate('subjects')}
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View Full Subject Matrix →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {INITIAL_SUBJECTS.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onNavigate('course-details', { subjectId: sub.id })}
                className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-32 w-full overflow-hidden relative bg-slate-950">
                  <img
                    src={sub.hero_image}
                    alt={sub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-slate-800">
                    {sub.code}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{sub.unit_count} Units</span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Explore →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Bento Grid */}
      <section className="py-16 bg-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Engineered for Authentic Academic Mastery
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Combining Ethiopian curriculum alignment with interactive simulations, real database persistence, and Google Gemini artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-white">Interactive Sandbox Simulations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manipulate Cartesian coordinate grids, rebalance algebraic equation scales, and explore 3D cellular organelles in real-time.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-violet-950 border border-violet-800 flex items-center justify-center text-violet-400 font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-white">Server-Validated Quizzes & XP</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Secure anti-cheat assessment engine verifies multiple-choice and true/false questions on the backend. Gain XP and level up your scholar rank.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-white">STUDYVERSE AI Study Companion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Powered by Gemini 3.8 Flash. Asks clarifying questions, explains incorrect quiz choices, and gives customized practice problems safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-[#050810] border-t border-slate-800 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">STUDYVERSE 2.0</span>
            <span>·</span>
            <span>Ethiopian Grade 7 Educational Platform</span>
          </div>
          <div>
            <span>Explore Knowledge. Unlock Your Potential.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

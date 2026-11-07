import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_SUBJECTS, INITIAL_LESSONS } from '../data/curriculumData';

interface SubjectsPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({ onNavigate }) => {
  const { lessonProgress } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSubjects = selectedCategory === 'all'
    ? INITIAL_SUBJECTS
    : selectedCategory === 'stem'
    ? INITIAL_SUBJECTS.filter(s => s.id === 'math' || s.id === 'science')
    : INITIAL_SUBJECTS.filter(s => s.id === 'english' || s.id === 'social' || s.id === 'oromo');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            Curriculum Library
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Grade 7 Subject Disciplines
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Fully aligned with Ethiopian Grade 7 curriculum standards. Select a subject to explore courses, units, and interactive lesson modules.
          </p>
        </div>

        {/* Filter Tabs (Functional buttons per frontend-design guidelines) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setSelectedCategory('stem')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === 'stem' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            STEM Fields
          </button>
          <button
            onClick={() => setSelectedCategory('humanities')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === 'humanities' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Social & Languages
          </button>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => {
          const subjectLessons = INITIAL_LESSONS.filter(l => l.subject_id === subject.id);
          const completedCount = subjectLessons.filter(l => lessonProgress[l.id]?.status === 'completed').length;
          const progressPercent = subjectLessons.length > 0 ? Math.round((completedCount / subjectLessons.length) * 100) : 0;

          return (
            <div
              key={subject.id}
              onClick={() => onNavigate('course-details', { subjectId: subject.id })}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col shadow-lg shadow-black/40"
            >
              {/* Subject Hero Artwork */}
              <div className="h-44 w-full overflow-hidden relative bg-slate-950">
                <img
                  src={subject.hero_image}
                  alt={subject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <div className="absolute top-3 left-3 text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-slate-800 backdrop-blur-sm">
                  {subject.code}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {subject.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Progress: {completedCount}/{subjectLessons.length} Lessons</span>
                    <span className="font-mono text-cyan-400 font-semibold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>{subject.unit_count} Units · Ethiopian Standard</span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Enter Subject →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

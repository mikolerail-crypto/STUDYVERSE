import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_VIDEOS, INITIAL_SUBJECTS } from '../data/curriculumData';

interface VideoCenterPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const VideoCenterPage: React.FC<VideoCenterPageProps> = ({ onNavigate }) => {
  const { user, updateProfile } = useAuth();
  const [activeVideo, setActiveVideo] = useState(INITIAL_VIDEOS[0]);
  const [completedVideos, setCompletedVideos] = useState<Record<string, boolean>>({});

  const handleMarkVideoComplete = async (vidId: string) => {
    if (completedVideos[vidId] || !user) return;
    setCompletedVideos(prev => ({ ...prev, [vidId]: true }));
    await updateProfile({ total_xp: user.total_xp + 20 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          Multimedia Academy
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Grade 7 Video Learning Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Curated audio-visual explanations covering coordinate geometry, cellular microbiology, and physics of simple machines.
        </p>
      </div>

      {/* Main Video Player & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Video Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.embed_id}?rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  {INITIAL_SUBJECTS.find(s => s.id === activeVideo.subject_id)?.title} · {activeVideo.duration}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {activeVideo.title}
                </h2>
              </div>

              <button
                onClick={() => handleMarkVideoComplete(activeVideo.id)}
                disabled={Boolean(completedVideos[activeVideo.id])}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  completedVideos[activeVideo.id]
                    ? 'bg-emerald-950 border border-emerald-700 text-emerald-400'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950'
                }`}
              >
                {completedVideos[activeVideo.id] ? '✓ Video Watched (+20 XP)' : 'Mark Watched (+20 XP)'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeVideo.description}
            </p>

            {activeVideo.related_lesson_id && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Related Curriculum Lesson available:</span>
                <button
                  onClick={() => onNavigate('lesson-reader', { lessonId: activeVideo.related_lesson_id })}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Open Related Interactive Lesson →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Video Playlist Column */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Curated Video Library
          </h3>

          <div className="space-y-3">
            {INITIAL_VIDEOS.map((vid) => {
              const isActive = vid.id === activeVideo.id;
              const isWatched = completedVideos[vid.id];

              return (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-800/90 border-cyan-500 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono">{vid.duration}</span>
                    {isWatched && <span className="text-emerald-400 font-semibold">✓ Completed</span>}
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2">
                    {vid.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {vid.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

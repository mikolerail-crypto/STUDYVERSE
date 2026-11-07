import React, { useState } from 'react';
import { INITIAL_STUDY_NOTES, INITIAL_SUBJECTS } from '../data/curriculumData';
import { StudyNote } from '../types';

export const StudyNotesPage: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<StudyNote>(INITIAL_STUDY_NOTES[0]);

  const handleDownloadFile = (note: StudyNote) => {
    const blob = new Blob([note.content_markdown], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = note.download_filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="no-print flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            Academic Resources
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Grade 7 Study Notes & Revision Worksheets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Clean, printable summary sheets and definitions designed for exam preparation and offline review.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <span>🖨 Print Summary Sheet</span>
          </button>
          <button
            onClick={() => handleDownloadFile(selectedNote)}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors shadow-md shadow-cyan-950 flex items-center gap-2"
          >
            <span>⬇ Download Text Notes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Notes Selector (Hidden in print) */}
        <div className="no-print lg:col-span-4 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Available Notes & Sheets
          </h3>

          <div className="space-y-3">
            {INITIAL_STUDY_NOTES.map((note) => {
              const subject = INITIAL_SUBJECTS.find(s => s.id === note.subject_id);
              const isSelected = note.id === selectedNote.id;

              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-cyan-400 mb-1 font-mono">
                    <span>{subject?.title}</span>
                    <span className="text-slate-400">{note.unit_title}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {note.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {note.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Clean Formatted Printable Note Viewer */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl print:bg-white print:text-black print:border-none print:p-0">
          <div className="border-b border-slate-800 pb-4 print:border-black">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block print:text-slate-700">
              {selectedNote.unit_title} · STUDYVERSE 2.0 Academic Resource
            </span>
            <h2 className="text-2xl font-bold text-white mt-1 print:text-black">
              {selectedNote.title}
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed print:text-slate-800">
              {selectedNote.summary}
            </p>
          </div>

          {/* Key Terms Highlight Cards */}
          {selectedNote.key_terms.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider print:text-black">
                Essential Terminology
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedNote.key_terms.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-100 print:border-slate-300 space-y-1"
                  >
                    <span className="text-xs font-bold text-cyan-300 print:text-cyan-800">{item.term}</span>
                    <p className="text-xs text-slate-300 print:text-slate-800">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Markdown Prose */}
          <div className="space-y-4 pt-4 border-t border-slate-800 print:border-slate-300">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider print:text-black">
              Full Document Transcript
            </h3>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed print:bg-white print:border-none print:text-black print:p-0">
              {selectedNote.content_markdown}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_LESSONS, INITIAL_SUBJECTS } from '../data/curriculumData';
import { CoordinatePlaneWidget } from '../components/simulations/CoordinatePlaneWidget';
import { EquationScaleWidget } from '../components/simulations/EquationScaleWidget';
import { CellExplorerWidget } from '../components/simulations/CellExplorerWidget';
import { MachineLeverWidget } from '../components/simulations/MachineLeverWidget';
import { SentenceBuilderWidget } from '../components/simulations/SentenceBuilderWidget';

interface LessonReaderPageProps {
  lessonId: string;
  onNavigate: (view: string, params?: any) => void;
}

export const LessonReaderPage: React.FC<LessonReaderPageProps> = ({ lessonId, onNavigate }) => {
  const { user, lessonProgress, recordLessonCompletion } = useAuth();
  const [revealedExercises, setRevealedExercises] = useState<Record<number, boolean>>({});
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, number>>({});
  const [hasCompletedThisSession, setHasCompletedThisSession] = useState(false);

  const lesson = INITIAL_LESSONS.find(l => l.id === lessonId) || INITIAL_LESSONS[0];
  const subject = INITIAL_SUBJECTS.find(s => s.id === lesson.subject_id);

  const isCompleted = hasCompletedThisSession || lessonProgress[lesson.id]?.status === 'completed';

  const toggleExercise = (index: number) => {
    setRevealedExercises(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleKnowledgeSelect = (qId: string, optIndex: number) => {
    setKnowledgeAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleComplete = async () => {
    if (!user) {
      onNavigate('login');
      return;
    }
    await recordLessonCompletion(lesson.id, lesson.xp_reward);
    setHasCompletedThisSession(true);
  };

  // Find next lesson
  const currentIndex = INITIAL_LESSONS.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIndex !== -1 && currentIndex < INITIAL_LESSONS.length - 1 ? INITIAL_LESSONS[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <button
            onClick={() => onNavigate('course-details', { subjectId: lesson.subject_id })}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold mb-1 block transition-colors"
          >
            ← {subject?.title || 'Subject'} Curriculum
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Unit {lesson.unit_number}</span>
            <span>·</span>
            <span>Chapter {lesson.chapter_number}</span>
            <span>·</span>
            <span>~{lesson.estimated_minutes} min read</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-semibold text-cyan-400 px-3 py-1 rounded bg-cyan-950/60 border border-cyan-800">
            +{lesson.xp_reward} XP Reward
          </span>
          {isCompleted && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
              ✓ Completed
            </span>
          )}
        </div>
      </div>

      {/* Lesson Title & Objectives */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>

        {/* Learning Objectives Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-2.5">
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Learning Objectives
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
            {lesson.learning_objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Core Explanation Content */}
      <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
        {lesson.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-white pt-4 pb-1 border-b border-slate-800">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={idx} className="list-disc list-inside space-y-1 text-slate-300">
                {paragraph.split('\n').map((item, itemIdx) => (
                  <li key={itemIdx}>{item.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-slate-300">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Interactive Simulation Sandbox */}
      {lesson.interactive_widget_type === 'coordinate_plane' && <CoordinatePlaneWidget />}
      {lesson.interactive_widget_type === 'equation_scale' && <EquationScaleWidget />}
      {lesson.interactive_widget_type === 'cell_explorer' && <CellExplorerWidget />}
      {lesson.interactive_widget_type === 'machine_lever' && <MachineLeverWidget />}
      {lesson.interactive_widget_type === 'sentence_builder' && (
        <SentenceBuilderWidget mode={lesson.subject_id === 'oromo' ? 'oromo' : 'english'} />
      )}
      {lesson.interactive_widget_type === 'topo_map' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
              Topographic Relief & Drainage Map
            </h4>
            <span className="text-xs text-slate-400 font-mono">Ras Dashen: 4,550m</span>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-800">
            <img
              src="/src/assets/images/subject_social_studies_1794057135138.jpg"
              alt="Ethiopian Topography and Drainage Basins"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Great Rift Valley divides Ethiopia into the Northwestern Highlands (Abbay Basin) and the Southeastern Highlands (Wabe Shebelle & Genale-Dawa Basins).
          </p>
        </div>
      )}

      {/* Important Definitions Section */}
      {lesson.important_definitions.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Key Academic Definitions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.important_definitions.map((def, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
                <span className="text-sm font-bold text-cyan-300">{def.term}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{def.definition}</p>
                {def.example && (
                  <p className="text-[11px] text-slate-400 font-mono pt-1">
                    Example: {def.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Worked Examples */}
      {lesson.examples.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white">Step-by-Step Worked Examples</h3>
          {lesson.examples.map((ex, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-violet-300">{ex.title}</h4>
              <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 font-medium">
                Problem: {ex.problem}
              </p>
              <div className="space-y-1.5 pl-2">
                <span className="text-xs font-semibold text-slate-400">Solution Steps:</span>
                <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
                  {ex.solution_steps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg text-xs text-emerald-300 font-semibold">
                Answer: {ex.final_answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Practice Exercises with Reveal */}
      {lesson.practice_exercises.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white">Practice Exercises</h3>
          {lesson.practice_exercises.map((pe, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {idx + 1}. {pe.question}
                </p>
                <button
                  onClick={() => toggleExercise(idx)}
                  className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 whitespace-nowrap shrink-0 transition-colors"
                >
                  {revealedExercises[idx] ? 'Hide Solution' : 'Reveal Solution'}
                </button>
              </div>

              {revealedExercises[idx] && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                  <div className="text-amber-400 font-medium">Hint: {pe.hint}</div>
                  <div className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                    Solution: {pe.solution}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Knowledge Check Mini-Quiz */}
      {lesson.knowledge_check.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Knowledge Check</h3>
            <span className="text-xs text-slate-400">Quick concept verification</span>
          </div>

          <div className="space-y-4">
            {lesson.knowledge_check.map((kc) => {
              const selected = knowledgeAnswers[kc.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === kc.correct_index;

              return (
                <div key={kc.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {kc.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {kc.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (isAnswered) {
                        if (optIdx === kc.correct_index) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-rose-950/80 border-rose-600 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleKnowledgeSelect(kc.id, optIdx)}
                          className={`text-xs p-3 rounded-lg border text-left transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === kc.correct_index && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-3 rounded-lg text-xs ${isCorrect ? 'bg-emerald-950/40 text-emerald-300' : 'bg-slate-950 text-slate-300'} border border-slate-800`}>
                      <strong>{isCorrect ? 'Correct!' : 'Notice:'}</strong> {kc.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lesson Completion Action Bar */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Finished Studying this Lesson?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Marking this lesson complete updates your permanent progress and awards +{lesson.xp_reward} XP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-6 py-3 rounded-xl font-semibold text-xs transition-all whitespace-nowrap shadow-lg ${
              isCompleted
                ? 'bg-emerald-950 border border-emerald-700 text-emerald-400 cursor-default'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950'
            }`}
          >
            {isCompleted ? '✓ Lesson Completed (+50 XP Earned)' : 'Mark Lesson Complete (+50 XP)'}
          </button>

          {nextLesson && (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('lesson-reader', { lessonId: nextLesson.id });
              }}
              className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              Next Lesson →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

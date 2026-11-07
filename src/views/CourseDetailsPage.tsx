import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  INITIAL_SUBJECTS,
  INITIAL_COURSES,
  INITIAL_LESSONS,
  INITIAL_QUIZZES
} from '../data/curriculumData';

interface CourseDetailsPageProps {
  subjectId: string;
  onNavigate: (view: string, params?: any) => void;
}

export const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ subjectId, onNavigate }) => {
  const { lessonProgress } = useAuth();

  const subject = INITIAL_SUBJECTS.find(s => s.id === subjectId) || INITIAL_SUBJECTS[0];
  const courses = INITIAL_COURSES.filter(c => c.subject_id === subject.id);
  const lessons = INITIAL_LESSONS.filter(l => l.subject_id === subject.id);
  const quizzes = INITIAL_QUIZZES.filter(q => q.subject_id === subject.id);

  const completedCount = lessons.filter(l => lessonProgress[l.id]?.status === 'completed').length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <button
        onClick={() => onNavigate('subjects')}
        className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 transition-colors"
      >
        ← Return to Subject Library
      </button>

      {/* Hero Subject Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b1329] via-[#0c1633] to-[#121c3d] border border-slate-800 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                {subject.code}
              </span>
              <span>·</span>
              <span>Grade 7 Ethiopian Curriculum</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {subject.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {subject.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div>
                Progress: <strong className="text-white font-mono">{completedCount} / {lessons.length}</strong> Completed
              </div>
              <span className="text-slate-700">|</span>
              <div>
                Subject Mastery: <strong className="text-cyan-400 font-mono">{progressPercent}%</strong>
              </div>
              <span className="text-slate-700">|</span>
              <div>
                Available Quizzes: <strong className="text-violet-400 font-mono">{quizzes.length}</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl max-h-48">
              <img
                src={subject.hero_image}
                alt={subject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Courses & Lessons Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Curriculum Units & Lessons</h2>
          <span className="text-xs text-slate-400">Syllabus-verified modules</span>
        </div>

        {courses.map((course) => {
          const courseLessons = lessons.filter(l => l.course_id === course.id);

          return (
            <div key={course.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">{course.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{course.description}</p>
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-slate-900 border border-slate-800 shrink-0">
                  Unit {course.unit_number}
                </span>
              </div>

              <div className="divide-y divide-slate-800/80">
                {courseLessons.map((lesson) => {
                  const isCompleted = lessonProgress[lesson.id]?.status === 'completed';

                  return (
                    <div
                      key={lesson.id}
                      className="p-5 hover:bg-slate-850/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                            onClick={() => onNavigate('lesson-reader', { lessonId: lesson.id })}
                          >
                            {lesson.title}
                          </h4>
                          {isCompleted && (
                            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                              ✓ Completed
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-1">
                          {lesson.learning_objectives[0]}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>~{lesson.estimated_minutes} min read</span>
                          <span>·</span>
                          <span className="text-cyan-400 font-mono">+{lesson.xp_reward} XP</span>
                          {lesson.interactive_widget_type && (
                            <>
                              <span>·</span>
                              <span className="text-violet-400 font-medium">Interactive Simulation</span>
                            </>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onNavigate('lesson-reader', { lessonId: lesson.id })}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                          isCompleted
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950'
                        }`}
                      >
                        {isCompleted ? 'Review Lesson' : 'Start Lesson →'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subject Quizzes Section */}
      {quizzes.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Subject Assessments</h2>
            <button
              onClick={() => onNavigate('quizzes')}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              All Quizzes →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="uppercase tracking-wider font-semibold text-violet-400">{quiz.difficulty}</span>
                    <span>{Math.round(quiz.time_limit_seconds / 60)} mins limit</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{quiz.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{quiz.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-cyan-400 font-mono font-semibold">Reward: +{quiz.xp_reward} XP</span>
                  <button
                    onClick={() => onNavigate('exam', { quizId: quiz.id })}
                    className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
                  >
                    Take Quiz →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

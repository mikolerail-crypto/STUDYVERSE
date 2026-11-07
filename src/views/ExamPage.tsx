import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_QUIZZES, AUTHORITATIVE_QUIZ_QUESTIONS } from '../data/curriculumData';

interface ExamPageProps {
  quizId: string;
  onNavigate: (view: string, params?: any) => void;
}

export const ExamPage: React.FC<ExamPageProps> = ({ quizId, onNavigate }) => {
  const { user, recordQuizResult } = useAuth();
  const quiz = INITIAL_QUIZZES.find(q => q.id === quizId) || INITIAL_QUIZZES[0];
  const questions = AUTHORITATIVE_QUIZ_QUESTIONS[quiz.id] || [];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.time_limit_seconds);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examResult, setExamResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Timer countdown
  useEffect(() => {
    if (examResult) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examResult]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (examResult) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleAutoSubmit = () => {
    submitQuizToServer();
  };

  const submitQuizToServer = async () => {
    if (!user) {
      onNavigate('login');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const timeSpent = quiz.time_limit_seconds - timeLeft;

    try {
      // Secure server-side validation endpoint
      const response = await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: selectedAnswers,
          timeSpentSeconds: timeSpent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to validate quiz answers on the server.');
      }

      const data = await response.json();
      setExamResult(data);

      // Save verified attempt in persistent AuthContext
      await recordQuizResult({
        quiz_id: quiz.id,
        score: data.score,
        total_questions: data.total_questions,
        correct_answers: data.correct_answers,
        time_spent_seconds: timeSpent,
        xp_earned: data.xp_earned,
        answers: selectedAnswers
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting assessment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQIndex];
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  // Grade helper
  const getGrade = (score: number) => {
    if (score >= 90) return { label: 'Grade A', color: 'text-emerald-400' };
    if (score >= 80) return { label: 'Grade B', color: 'text-cyan-400' };
    if (score >= 70) return { label: 'Grade C', color: 'text-violet-400' };
    return { label: 'Grade D (Needs Review)', color: 'text-rose-400' };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Exam Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <button
            onClick={() => onNavigate('quizzes')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold mb-1 block"
          >
            ← Exit to Quiz Center
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {quiz.title}
          </h1>
        </div>

        {/* Live Timer */}
        {!examResult && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono font-semibold">
            <span className="text-slate-400">Time Left:</span>
            <span className={`text-sm ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-900/80 text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      {/* ACTIVE QUIZ VIEW */}
      {!examResult ? (
        <div className="space-y-6">
          {/* Progress Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Question {currentQIndex + 1} of {questions.length}</span>
              <span>{answeredCount} of {questions.length} answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              {questions.map((_, idx) => {
                const isAnswered = selectedAnswers[questions[idx].id] !== undefined;
                const isCurrent = currentQIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-cyan-400'
                        : isAnswered
                        ? 'bg-violet-600'
                        : 'bg-slate-800'
                    }`}
                    title={`Question ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Current Question Card */}
          {currentQ && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="space-y-2">
                <div className="text-xs text-cyan-400 font-mono">
                  {currentQ.question_type === 'true_false' ? 'True or False' : 'Multiple Choice'} · {currentQ.points} Points
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question_text}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-700'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              ← Previous
            </button>

            {currentQIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors shadow-md shadow-cyan-950"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={submitQuizToServer}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-lg shadow-violet-950 disabled:opacity-50"
              >
                {isSubmitting ? 'Evaluating on Server...' : 'Submit Answers for Verification'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* EXAM SCORE BREAKDOWN & REVIEW VIEW */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Result Score Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#0c152e] border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300">
              Official Assessment Result
            </div>

            <div className="space-y-1">
              <div className="text-5xl sm:text-6xl font-mono font-extrabold text-white">
                {examResult.score}%
              </div>
              <div className={`text-base font-bold ${getGrade(examResult.score).color}`}>
                {getGrade(examResult.score).label}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              {examResult.passed
                ? 'Congratulations! You met the curriculum pass requirements for this assessment.'
                : 'Keep practicing! Review the detailed answer explanations below and retake the test.'}
            </p>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div>
                Correct Answers: <strong className="text-white font-mono">{examResult.correct_answers} / {examResult.total_questions}</strong>
              </div>
              <span className="text-slate-700">|</span>
              <div>
                XP Awarded: <strong className="text-cyan-400 font-mono">+{examResult.xp_earned} XP</strong>
              </div>
              <span className="text-slate-700">|</span>
              <div>
                Time Spent: <strong className="text-slate-300 font-mono">{formatTime(examResult.time_spent_seconds)}</strong>
              </div>
            </div>
          </div>

          {/* Question-by-Question Detailed Review */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Detailed Answer Explanations</h3>

            {examResult.review.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border space-y-3 ${
                  item.is_correct
                    ? 'bg-slate-900/60 border-emerald-900/50'
                    : 'bg-slate-900/60 border-rose-900/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">Question {idx + 1}</span>
                  <span className={`font-semibold ${item.is_correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.is_correct ? '✓ Correct (+20 pts)' : '✗ Incorrect (0 pts)'}
                  </span>
                </div>

                <p className="text-sm font-semibold text-white">
                  {item.question_text}
                </p>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Your selection: </span>
                    <span className={item.is_correct ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                      {item.user_selected !== undefined ? item.options[item.user_selected] : 'None'}
                    </span>
                  </div>

                  {!item.is_correct && (
                    <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/60">
                      <span className="text-emerald-400 font-semibold">Correct Answer: </span>
                      <span className="text-emerald-200">
                        {item.options[item.correct_index]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                  <strong className="text-cyan-400">Curriculum Explanation: </strong>
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => onNavigate('quizzes')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors"
            >
              ← Return to Quiz Center
            </button>

            <button
              onClick={() => {
                setExamResult(null);
                setSelectedAnswers({});
                setTimeLeft(quiz.time_limit_seconds);
                setCurrentQIndex(0);
              }}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors shadow-md shadow-violet-950"
            >
              Retake Assessment ↻
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

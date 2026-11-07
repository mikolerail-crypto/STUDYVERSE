import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_SUBJECTS } from '../data/curriculumData';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AITutorPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'practice'>('chat');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `Hello ${user ? user.display_name : 'Scholar'}! I am **STUDYVERSE AI**, your personalized Grade 7 academic assistant.

I can help you:
- Break down tricky concepts in **Mathematics**, **General Science**, **English**, **Social Studies**, and **Afaan Oromoo**.
- Guide you through step-by-step math problems (like linear equations and rational numbers).
- Clarify cell biology, simple machines, or the physical geography of Ethiopia.
- Generate customized practice questions to test your understanding.

What topic would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Practice Generator State
  const [practiceTopic, setPracticeTopic] = useState('Rational Numbers');
  const [isGeneratingPractice, setIsGeneratingPractice] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [selectedPracticeAnswers, setSelectedPracticeAnswers] = useState<Record<number, number>>({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiLoading]);

  const quickPrompts = [
    { title: 'Explain Photosynthesis', prompt: 'Can you explain the process of photosynthesis in plant cells in simple Grade 7 steps?' },
    { title: 'Solve 3x - 5 = 16', prompt: 'Walk me through how to solve the linear equation 3x - 5 = 16 using inverse operations.' },
    { title: 'The Great Rift Valley', prompt: 'Why is the Great East African Rift Valley in Ethiopia so important geologically?' },
    { title: 'Afaan Oromoo SOV', prompt: 'How does the Mat-himaa + Anta-himaa + Gochima sentence structure work in Afaan Oromoo?' },
    { title: 'Six Simple Machines', prompt: 'What are the six simple machines and how does a lever provide mechanical advantage?' }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isAiLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          subject: selectedSubject,
          chatHistory: messages.map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get a response from STUDYVERSE AI.');
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      setAiError(err.message || 'Error communicating with AI tutor.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGeneratePractice = async () => {
    setIsGeneratingPractice(true);
    setSelectedPracticeAnswers({});
    try {
      const response = await fetch('/api/ai/practice-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: practiceTopic,
          difficulty: 'Grade 7'
        })
      });

      const data = await response.json();
      if (response.ok && data.questions) {
        setGeneratedQuestions(data.questions);
      }
    } catch (err) {
      console.error('Practice error', err);
    } finally {
      setIsGeneratingPractice(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs text-violet-400 font-semibold tracking-wider uppercase mb-1">
            Google Gemini 3.8 Flash Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            STUDYVERSE AI Study Assistant
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ask questions, clarify difficult concepts, and generate custom practice problems.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'chat' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Academic Tutor Chat
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'practice' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Practice Generator
          </button>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <div className="space-y-4">
          {/* Subject Focus Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 whitespace-nowrap shrink-0">Subject Focus:</span>
            {INITIAL_SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.title)}
                className={`px-3 py-1 rounded-full whitespace-nowrap shrink-0 border transition-colors ${
                  selectedSubject === s.title
                    ? 'bg-violet-950/80 border-violet-500 text-violet-300 font-semibold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Chat Messages Container */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 min-h-[460px] max-h-[560px] overflow-y-auto space-y-4 shadow-xl">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-violet-950 border border-violet-700/60 flex items-center justify-center text-violet-300 font-bold text-xs shrink-0 mt-0.5">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white shadow-md rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-md rounded-tl-none'
                  }`}
                >
                  <div className="space-y-2 whitespace-pre-line">
                    {msg.text}
                  </div>
                  <div className="text-[10px] opacity-60 text-right mt-2 font-mono">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-lg bg-violet-950 border border-violet-700/60 flex items-center justify-center text-violet-300 font-bold text-xs shrink-0">
                  AI
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.4s]" />
                  <span>STUDYVERSE AI is formulating your explanation...</span>
                </div>
              </div>
            )}

            {aiError && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-900 text-rose-300 text-xs">
                {aiError}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 block font-medium">Suggested Questions:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.prompt)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-violet-500/50 text-slate-300 hover:text-white whitespace-nowrap shrink-0 transition-colors"
                >
                  {qp.title}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask STUDYVERSE AI about ${selectedSubject}...`}
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-violet-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isAiLoading || !inputPrompt.trim()}
              className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-violet-950 disabled:opacity-40 whitespace-nowrap shrink-0"
            >
              Ask AI
            </button>
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            STUDYVERSE AI is designed strictly for Grade 7 education. Never share private passwords or personal info. AI explanations may occasionally contain inaccuracies.
          </div>
        </div>
      ) : (
        /* PRACTICE PROBLEM GENERATOR TAB */
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Generate Custom Practice Problems</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gemini 3.8 Flash creates fresh multiple-choice questions tailored to your topic.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={practiceTopic}
                  onChange={(e) => setPracticeTopic(e.target.value)}
                  placeholder="e.g. Plant cell organelles"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                />
                <button
                  onClick={handleGeneratePractice}
                  disabled={isGeneratingPractice}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
                >
                  {isGeneratingPractice ? 'Generating...' : 'Generate 3 Questions'}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Questions List */}
          {generatedQuestions.length > 0 ? (
            <div className="space-y-4">
              {generatedQuestions.map((q, qIdx) => {
                const selected = selectedPracticeAnswers[qIdx];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={qIdx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-cyan-400 font-semibold">Question {qIdx + 1}</span>
                      {isAnswered && (
                        <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                          {isCorrect ? '✓ Correct Answer' : '✗ Incorrect'}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-white">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt: string, optIdx: number) => {
                        let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-950 border-emerald-600 text-emerald-200 font-semibold';
                          } else if (selected === optIdx) {
                            btnStyle = 'bg-rose-950 border-rose-600 text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => setSelectedPracticeAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`p-3 rounded-lg border text-left text-xs transition-colors ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <strong className="text-violet-400">Step-by-step Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
              Click "Generate 3 Questions" above to have Gemini produce interactive practice problems for your chosen topic.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

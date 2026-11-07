import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { AUTHORITATIVE_QUIZ_QUESTIONS, INITIAL_QUIZZES } from './src/data/curriculumData.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsing middleware
app.use(express.json({ limit: '5mb' }));

// Initialize Google Gemini AI SDK on the server
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Request rate limiter in-memory
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const checkRateLimit = (req: Request, maxRequests = 40, windowMs = 60000): boolean => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
};

// ============================================================================
// API ROUTES
// ============================================================================

// 1. Health & Config Status Check
app.get('/api/health', (req: Request, res: Response) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);
  const hasSupabaseUrl = Boolean(process.env.VITE_SUPABASE_URL);
  const hasSupabaseAnon = Boolean(process.env.VITE_SUPABASE_ANON_KEY);
  const hasSupabaseService = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    gemini: {
      configured: hasGeminiKey,
      model: 'gemini-3.8-flash'
    },
    supabase: {
      configured: hasSupabaseUrl && hasSupabaseAnon,
      hasServiceRole: hasSupabaseService,
      mode: hasSupabaseUrl && hasSupabaseAnon ? 'cloud' : 'local_persistence'
    }
  });
});

// 2. STUDYVERSE AI Tutor (Gemini 3.8 Flash)
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    if (!checkRateLimit(req, 30, 60000)) {
      res.status(429).json({ error: 'Too many requests. Please wait a moment before asking another question.' });
      return;
    }

    const { message, subject, context, chatHistory } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'A valid message prompt is required.' });
      return;
    }

    if (!aiClient) {
      // Honest status: Gemini key is not configured in environment
      res.status(503).json({
        error: 'Gemini AI API key is not configured on the server. Please attach GEMINI_API_KEY in the Secrets panel.',
        missingKey: true
      });
      return;
    }

    const systemInstruction = `You are "STUDYVERSE AI", an expert, warm, and highly encouraging educational tutor for Grade 7 students (ages 12-14).
You teach the Ethiopian Grade 7 curriculum across five subjects:
1. Mathematics (Rational numbers, fractions, linear equations, geometry, ratios).
2. General Science (Cell biology, plant vs animal cells, simple machines, work and force).
3. English Language (Sentence structure, clauses, FANBOYS conjunctions, reading comprehension).
4. Social Studies (Ethiopian topography, Great Rift Valley, drainage basins, Aksum civilization, conservation).
5. Afaan Oromoo (Caasaa himaa SOV, seerluga, bamaqaa, mammaaksa Oromoo).

Pedagogical guidelines:
- Break complex ideas into easy, step-by-step bites.
- Use clear bullet points and markdown.
- When explaining math or science, provide an illustrative example with step-by-step working.
- Keep the tone encouraging, curious, and respectful.
- Never ask for personal student passwords, addresses, or sensitive data.
- If the student asks about a quiz mistake, explain WHY the correct answer is right and how to avoid the misconception.
- Current subject focus: ${subject || 'General Grade 7'}.
- Lesson context: ${context || 'General inquiry'}.`;

    // Build contents array for multi-turn or single turn
    const contents: any[] = [];
    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
      for (const turn of chatHistory.slice(-6)) {
        if (turn.sender === 'user' || turn.role === 'user') {
          contents.push({ role: 'user', parts: [{ text: turn.text || turn.content }] });
        } else if (turn.sender === 'ai' || turn.role === 'model') {
          contents.push({ role: 'model', parts: [{ text: turn.text || turn.content }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const reply = response.text || 'I apologize, but I could not formulate an explanation at this moment. Please try asking again!';
    res.json({ reply, timestamp: new Date().toISOString() });
  } catch (error: any) {
    console.error('Gemini API Error in /api/ai/chat:', error);
    res.status(500).json({
      error: error?.message || 'Failed to communicate with STUDYVERSE AI assistant.'
    });
  }
});

// 3. Secure Server-Side Quiz Answer Validation & XP Award
app.post('/api/quizzes/submit', (req: Request, res: Response) => {
  try {
    const { quizId, answers, timeSpentSeconds } = req.body;

    if (!quizId || !answers || typeof answers !== 'object') {
      res.status(400).json({ error: 'Quiz ID and answers dictionary are required.' });
      return;
    }

    const questions = AUTHORITATIVE_QUIZ_QUESTIONS[quizId];
    const quizMeta = INITIAL_QUIZZES.find(q => q.id === quizId);

    if (!questions || !quizMeta) {
      res.status(404).json({ error: 'Quiz not found in authoritative question bank.' });
      return;
    }

    let correctCount = 0;
    const totalQuestions = questions.length;
    const questionReview = questions.map(q => {
      const selectedIndex = answers[q.id];
      const isCorrect = selectedIndex === q.correct_option_index;
      if (isCorrect) correctCount += 1;

      return {
        id: q.id,
        question_text: q.question_text,
        options: q.options,
        user_selected: selectedIndex,
        correct_index: q.correct_option_index,
        is_correct: isCorrect,
        explanation: q.explanation
      };
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= quizMeta.pass_score_percent;

    // Server-calculated XP award
    let xpEarned = 0;
    if (passed) {
      xpEarned = quizMeta.xp_reward; // Baseline reward (e.g. 100 XP)
      if (scorePercentage === 100) {
        xpEarned += 50; // Perfect score bonus
      } else if (scorePercentage >= 80) {
        xpEarned += 20; // High score bonus
      }
    } else {
      xpEarned = 25; // Participation effort XP
    }

    res.json({
      success: true,
      quiz_id: quizId,
      score: scorePercentage,
      passed,
      correct_answers: correctCount,
      total_questions: totalQuestions,
      time_spent_seconds: timeSpentSeconds || 0,
      xp_earned: xpEarned,
      review: questionReview,
      completed_at: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ error: 'Internal error validating quiz attempt.' });
  }
});

// 4. AI Concept Visualizer & Practice Generator
app.post('/api/ai/practice-generator', async (req: Request, res: Response) => {
  try {
    if (!aiClient) {
      res.status(503).json({ error: 'Gemini AI not configured on server.', missingKey: true });
      return;
    }

    const { topic, difficulty = 'Grade 7' } = req.body;
    const prompt = `Generate 3 interactive practice questions for a Grade 7 student on the topic "${topic || 'Rational Numbers'}".
For each question, provide:
1. The question.
2. 4 multiple-choice options (A, B, C, D).
3. The index (0-3) of the correct answer.
4. A friendly step-by-step explanation.

Return in clean JSON format matching:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctIndex": 0,
    "explanation": "string"
  }
]`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '[]');
    res.json({ questions: parsed });
  } catch (error: any) {
    console.error('AI Practice generator error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate practice questions.' });
  }
});

// ============================================================================
// VITE DEV SERVER / STATIC ASSETS
// ============================================================================
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[STUDYVERSE 2.0] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start STUDYVERSE server:', err);
  process.exit(1);
});

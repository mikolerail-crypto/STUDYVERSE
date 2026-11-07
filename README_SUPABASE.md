# STUDYVERSE 2.0 - Supabase Configuration & Setup Guide

STUDYVERSE 2.0 is fully built with Supabase Authentication, PostgreSQL Database, and Realtime Leaderboards.

## Current Runtime Status
- **Local Persistent Storage Mode**: Active automatically if Supabase environment variables are not detected. This allows full testing of student registration, login, lesson completion (+50 XP), quiz taking, scoring, and progress tracking across reloads and device sessions without requiring external keys immediately.
- **Cloud Supabase Mode**: Automatically activates when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided.

---

## 1. Quick Setup in Supabase Dashboard

1. Visit [supabase.com](https://supabase.com) and create a new project (e.g. `studyverse-grade7`).
2. Open the **SQL Editor** in the left sidebar.
3. Open `supabase/migrations/20260301000000_studyverse_initial_schema.sql` in this repo, copy its contents, paste them into the SQL editor, and click **Run**.
4. Open `supabase/seed.sql`, paste its contents, and click **Run**.
5. Go to **Project Settings > API** in your Supabase dashboard and copy:
   - `Project URL`
   - `anon / public API key`
   - `service_role secret` (for backend server)

---

## 2. Environment Variables Configuration

Add the following to your `.env` or AI Studio Secrets:

```bash
# Supabase Client
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"

# Supabase Server-side (Optional for elevated admin verification)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Google Gemini API
GEMINI_API_KEY="your-gemini-api-key"
```

---

## 3. Database Architecture Summary

| Table | Purpose | Security Policy |
| :--- | :--- | :--- |
| `profiles` | Student accounts, nicknames, XP, grade | Read own profile; public leaderboard only for opted-in students |
| `subjects` | 5 Grade 7 subjects (Math, Science, English, Social Studies, Afaan Oromoo) | Public read |
| `courses` | Unit breakdowns per subject | Public read |
| `lessons` | Interactive lesson text, objectives, definitions, exercises | Public read |
| `lesson_progress` | Track lessons started/completed & progress % | Authenticated student read/write |
| `quizzes` | Assessments with time limits & difficulties | Public read |
| `quiz_questions` | Multiple choice and True/False questions | Public read (answers validated on server) |
| `quiz_attempts` | Score history, answers, XP earned | Authenticated student read/write |
| `achievements` | Badges and milestones | Public read |
| `student_achievements` | Unlocked awards per student | Authenticated student read |
| `study_notes` | Revision summaries and printable sheets | Public read |
| `videos` | Educational video references | Public read |

---

## 4. Server-Side Answer Validation & XP Security
To prevent cheating, quiz answers are submitted to `/api/quizzes/submit` on the Node.js server. The server verifies the student's answers, calculates the score and XP bonus, and logs the attempt.

/**
 * STUDYVERSE 2.0 - Core Type Definitions
 */

export interface StudentProfile {
  id: string;
  email?: string;
  display_name: string;
  nickname: string;
  grade_level: number;
  total_xp: number;
  lessons_completed: number;
  quiz_performance: number; // percentage
  is_leaderboard_enabled: boolean;
  avatar_seed: string;
  created_at: string;
  updated_at?: string;
}

export interface Subject {
  id: string;
  title: string;
  code: string;
  description: string;
  icon: string;
  color_accent: 'cyan' | 'emerald' | 'blue' | 'amber' | 'violet';
  hero_image: string;
  order_index: number;
  unit_count: number;
  lesson_count: number;
}

export interface Course {
  id: string;
  subject_id: string;
  title: string;
  description: string;
  unit_number: number;
  order_index: number;
}

export interface ImportantDefinition {
  term: string;
  definition: string;
  example?: string;
}

export interface LessonExample {
  title: string;
  problem: string;
  solution_steps: string[];
  final_answer: string;
}

export interface PracticeExercise {
  question: string;
  hint: string;
  solution: string;
}

export interface KnowledgeCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  subject_id: string;
  title: string;
  unit_number: number;
  chapter_number: number;
  order_index: number;
  estimated_minutes: number;
  xp_reward: number;
  verified_syllabus: boolean;
  learning_objectives: string[];
  content: string;
  important_definitions: ImportantDefinition[];
  examples: LessonExample[];
  practice_exercises: PracticeExercise[];
  knowledge_check: KnowledgeCheckQuestion[];
  interactive_widget_type?: 'coordinate_plane' | 'equation_scale' | 'cell_explorer' | 'machine_lever' | 'topo_map' | 'sentence_builder';
}

export interface LessonProgress {
  id?: string;
  user_id: string;
  lesson_id: string;
  status: 'started' | 'completed';
  progress_percent: number;
  completed_at?: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false';
  options: string[];
  correct_option_index?: number; // Protected on client, verified on server
  explanation?: string;
  points: number;
  order_index: number;
}

export interface Quiz {
  id: string;
  subject_id: string;
  course_id?: string;
  lesson_id?: string;
  title: string;
  description: string;
  time_limit_seconds: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp_reward: number;
  pass_score_percent: number;
  questions_count?: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_spent_seconds: number;
  xp_earned: number;
  answers: Record<string, number>;
  completed_at: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  xp_bonus: number;
  condition_type: string;
  unlocked_at?: string;
}

export interface StudyNote {
  id: string;
  subject_id: string;
  title: string;
  unit_title: string;
  summary: string;
  key_terms: { term: string; explanation: string }[];
  content_markdown: string;
  download_filename: string;
}

export interface VideoLesson {
  id: string;
  subject_id: string;
  title: string;
  description: string;
  duration: string;
  youtube_url: string;
  embed_id: string;
  related_lesson_id?: string;
  order_index: number;
  completed?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  total_xp: number;
  lessons_completed: number;
  avatar_seed: string;
  is_current_user?: boolean;
}

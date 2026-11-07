-- ====================================================================
-- STUDYVERSE 2.0 - Initial Seed Data for Ethiopian Grade 7 Curriculum
-- ====================================================================

-- 1. Insert 5 Subjects
INSERT INTO public.subjects (id, title, code, description, icon, color_accent, hero_image, order_index)
VALUES
('math', 'Mathematics', 'G7-MATH', 'Rational numbers, linear equations, ratios, and plane geometry.', 'Calculator', 'cyan', '/src/assets/images/subject_math_geometry_1794057135074.jpg', 1),
('science', 'General Science', 'G7-SCI', 'Scientific inquiry, plant and animal cell biology, and simple machines.', 'Atom', 'emerald', '/src/assets/images/subject_general_science_1794057136156.jpg', 2),
('english', 'English Language', 'G7-ENG', 'Reading comprehension, communicative grammar, and descriptive writing.', 'BookOpen', 'blue', '/src/assets/images/hero_studyverse_grade7_1794057134312.jpg', 3),
('social', 'Social Studies', 'G7-SOC', 'Ethiopian topography, African civilizations, and environmental conservation.', 'Globe', 'amber', '/src/assets/images/subject_social_studies_1794057135138.jpg', 4),
('oromo', 'Afaan Oromoo', 'G7-ORO', 'Seerluga, ogbarruu, aadaa fi mammaaksota bu''uuraa Afaan Oromoo.', 'Sparkles', 'violet', '/src/assets/images/hero_studyverse_grade7_1794057134312.jpg', 5)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

-- 2. Insert Courses / Units
INSERT INTO public.courses (id, subject_id, title, description, unit_number, order_index)
VALUES
('math-u1', 'math', 'Unit 1: Rational Numbers', 'Operations with fractions, decimals, negative rational numbers, and coordinate graphing.', 1, 1),
('math-u2', 'math', 'Unit 2: Linear Equations and Inequalities', 'Formulating, graphing, and solving one-variable linear equations.', 2, 2),
('sci-u1', 'science', 'Unit 1: Cell Biology and Organization', 'Structure and organelles of plant and animal cells, microscopes, and tissue hierarchy.', 1, 1),
('sci-u2', 'science', 'Unit 2: Energy, Forces and Simple Machines', 'Mechanical advantage, levers, pulleys, and the inclined plane.', 2, 2),
('eng-u1', 'english', 'Unit 1: Sentence Mastery & Communication', 'Simple, compound, and complex sentences with precise subordinate clauses.', 1, 1),
('soc-u1', 'social', 'Unit 1: Physical Environment of Ethiopia', 'The Great Rift Valley, Ethiopian Highlands, climate zones, and river basins.', 1, 1),
('oro-u1', 'oromo', 'Unit 1: Seerluga fi Caasaa Himaa', 'Caasaa himaa, bamaqaa fi fayyadama jechootaa sirrii.', 1, 1)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Achievements
INSERT INTO public.achievements (id, code, title, description, icon, xp_bonus, condition_type)
VALUES
('ach-first-step', 'FIRST_STEP', 'Cosmic Awakening', 'Complete your very first Grade 7 interactive lesson.', 'Compass', 50, 'lesson_1'),
('ach-math-star', 'MATH_EXPLORER', 'Rational Master', 'Complete a full lesson in Grade 7 Mathematics.', 'Calculator', 100, 'math_lesson'),
('ach-science-lab', 'LAB_DISCOVERER', 'Cell Biologist', 'Score 80% or higher on the Cell Biology quiz.', 'Atom', 100, 'science_quiz'),
('ach-quiz-champ', 'PERFECT_SCORE', 'Academic Precision', 'Achieve a 100% perfect score on any unit assessment.', 'Trophy', 150, 'perfect_quiz'),
('ach-polyglot', 'OROMO_SCHOLAR', 'Oromo Language Scholar', 'Complete an Afaan Oromoo vocabulary and grammar lesson.', 'Sparkles', 100, 'oromo_lesson')
ON CONFLICT (id) DO NOTHING;

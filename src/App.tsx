import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { StudentPortalNav } from './components/StudentPortalNav';
import { NoticeBanner } from './components/NoticeBanner';
import { SettingsModal } from './components/SettingsModal';

import { LandingPage } from './views/LandingPage';
import { LoginPage } from './views/LoginPage';
import { RegisterPage } from './views/RegisterPage';
import { DashboardPage } from './views/DashboardPage';
import { SubjectsPage } from './views/SubjectsPage';
import { CourseDetailsPage } from './views/CourseDetailsPage';
import { LessonReaderPage } from './views/LessonReaderPage';
import { QuizCenterPage } from './views/QuizCenterPage';
import { ExamPage } from './views/ExamPage';
import { ProgressPage } from './views/ProgressPage';
import { AITutorPage } from './views/AITutorPage';
import { VideoCenterPage } from './views/VideoCenterPage';
import { StudyNotesPage } from './views/StudyNotesPage';
import { LeaderboardPage } from './views/LeaderboardPage';
import { ProfilePage } from './views/ProfilePage';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<string>('landing');
  const [navParams, setNavParams] = useState<any>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleNavigate = (view: string, params: any = {}) => {
    setCurrentView(view);
    setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Notice Alert */}
      <NoticeBanner />

      {/* Top Bar Navigation (3-Zone Contract) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Secondary Student Portal Toolbar (Active in app views) */}
      {currentView !== 'landing' && currentView !== 'login' && currentView !== 'register' && (
        <StudentPortalNav
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {currentView === 'login' && (
          <LoginPage onNavigate={handleNavigate} />
        )}

        {currentView === 'register' && (
          <RegisterPage onNavigate={handleNavigate} />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage onNavigate={handleNavigate} />
        )}

        {currentView === 'subjects' && (
          <SubjectsPage onNavigate={handleNavigate} />
        )}

        {currentView === 'course-details' && (
          <CourseDetailsPage
            subjectId={navParams.subjectId || 'math'}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'lesson-reader' && (
          <LessonReaderPage
            lessonId={navParams.lessonId || 'math-l1'}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'quizzes' && (
          <QuizCenterPage onNavigate={handleNavigate} />
        )}

        {currentView === 'exam' && (
          <ExamPage
            quizId={navParams.quizId || 'quiz-math-1'}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'progress' && (
          <ProgressPage onNavigate={handleNavigate} />
        )}

        {currentView === 'ai-tutor' && (
          <AITutorPage />
        )}

        {currentView === 'videos' && (
          <VideoCenterPage onNavigate={handleNavigate} />
        )}

        {currentView === 'notes' && (
          <StudyNotesPage />
        )}

        {currentView === 'leaderboard' && (
          <LeaderboardPage />
        )}

        {currentView === 'profile' && (
          <ProfilePage />
        )}
      </main>

      {/* Database & Architecture Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

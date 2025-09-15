import React, { useState } from 'react';
import { Calendar, Users, MessageSquare, Settings } from 'lucide-react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CalendarView from './components/calendar/CalendarView';
import Messages from './components/messages/Messages';
import Profile from './components/profile/Profile';
import LandingPage from './components/LandingPage';
import { UserProvider, useUser } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';

export type UserRole = 'student' | 'teacher' | 'admin';
export type ViewType = 'dashboard' | 'calendar' | 'messages' | 'profile';

function AppContent() {
  const { isLoggedIn, login } = useUser();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users, view: 'dashboard' as ViewType },
    { id: 'calendar', label: 'Calendar', icon: Calendar, view: 'calendar' as ViewType },
    { id: 'messages', label: 'Messages', icon: MessageSquare, view: 'messages' as ViewType },
    { id: 'profile', label: 'Profile', icon: Settings, view: 'profile' as ViewType },
  ];

  const handleStudentLogin = () => {
    login('student');
    setUserRole('student');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'calendar':
        return <CalendarView userRole={userRole} />;
      case 'messages':
        return <Messages userRole={userRole} />;
      case 'profile':
        return <Profile userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  // Show landing page if user is not logged in
  if (!isLoggedIn) {
    return <LandingPage onStudentLogin={handleStudentLogin} />;
  }

  // Show dashboard if user is logged in
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          userRole={userRole}
          onRoleChange={setUserRole}
        />
        
        <div className="flex">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            navigationItems={navigationItems}
            currentView={currentView}
            onViewChange={setCurrentView}
            userRole={userRole}
          />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64 transition-all duration-300 ease-in-out">
            <div className="max-w-7xl mx-auto">
              {renderCurrentView()}
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
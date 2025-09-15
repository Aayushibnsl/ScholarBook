import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { ViewType, UserRole } from '../../App';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  view: ViewType;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  userRole: UserRole;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  navigationItems, 
  currentView, 
  onViewChange,
  userRole 
}: SidebarProps) {
  const handleNavigation = (view: ViewType) => {
    onViewChange(view);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg 
        border-r border-slate-200/50 dark:border-slate-700/50 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.view)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-[1.02]' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick stats */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {userRole === 'student' ? 'Quick Stats' : 'Today\'s Schedule'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {userRole === 'student' ? 'Total Bookings' : 'Appointments'}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {userRole === 'student' ? '24' : '8'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {userRole === 'student' ? 'This Week' : 'Available Slots'}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {userRole === 'student' ? '3' : '12'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6">
            <button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
              {userRole === 'student' ? 'Book Appointment' : 'Add Availability'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
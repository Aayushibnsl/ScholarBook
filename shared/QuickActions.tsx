import React from 'react';
import { Calendar, Clock, MessageSquare, Settings, Users, BookOpen } from 'lucide-react';

interface QuickActionsProps {
  userType: 'student' | 'teacher';
}

const studentActions = [
  { icon: Calendar, label: 'Book Appointment', color: 'blue' },
  { icon: MessageSquare, label: 'Send Message', color: 'green' },
  { icon: BookOpen, label: 'Browse Teachers', color: 'purple' },
];

const teacherActions = [
  { icon: Clock, label: 'Set Availability', color: 'blue' },
  { icon: Users, label: 'Manage Students', color: 'green' },
  { icon: Settings, label: 'Preferences', color: 'purple' },
];

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
};

export default function QuickActions({ userType }: QuickActionsProps) {
  const actions = userType === 'student' ? studentActions : teacherActions;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 p-3 bg-gradient-to-r ${colorClasses[action.color as keyof typeof colorClasses]} text-white rounded-xl font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200`}
            >
              <Icon className="w-5 h-5" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
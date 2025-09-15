import React from 'react';
import { Clock, MapPin, Video, MessageSquare, Calendar, MoreHorizontal } from 'lucide-react';

interface AppointmentCardProps {
  appointment: {
    id: string;
    teacherName?: string;
    studentName?: string;
    teacherAvatar?: string;
    studentAvatar?: string;
    subject: string;
    date: string;
    time: string;
    duration: string;
    type: string;
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
    topic?: string;
  };
  userType: 'student' | 'teacher';
}

const statusStyles = {
  confirmed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  completed: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-600',
};

export default function AppointmentCard({ appointment, userType }: AppointmentCardProps) {
  const person = userType === 'student' 
    ? { name: appointment.teacherName!, avatar: appointment.teacherAvatar! }
    : { name: appointment.studentName!, avatar: appointment.studentAvatar! };

  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              {person.name}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {appointment.subject}
            </p>
            {appointment.topic && (
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {appointment.topic}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${statusStyles[appointment.status]}`}>
            {appointment.status}
          </span>
          <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{appointment.time}</span>
          </div>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-lg">
            {appointment.duration}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {appointment.type}
        </span>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200">
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
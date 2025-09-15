import React, { useState } from 'react';
import { UserRole } from '../../App';

interface CalendarGridProps {
  userRole: UserRole;
  selectedDate: Date;
}

interface TimeSlot {
  id: string;
  time: string;
  teacher?: string;
  student?: string;
  subject: string;
  type: string;
  status: 'available' | 'booked' | 'blocked';
  duration: number;
}

const generateTimeSlots = (userRole: UserRole, date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const baseSlots = [
    { time: '09:00 AM', teacher: 'Dr. Smith', subject: 'Computer Science', type: 'Office Hours', status: 'available', duration: 60 },
    { time: '10:00 AM', teacher: 'Prof. Davis', subject: 'Mathematics', type: 'Consultation', status: 'booked', duration: 45 },
    { time: '11:30 AM', teacher: 'Dr. Johnson', subject: 'Physics', type: 'Tutoring', status: 'available', duration: 90 },
    { time: '02:00 PM', teacher: 'Prof. Wilson', subject: 'Chemistry', type: 'Office Hours', status: 'available', duration: 60 },
    { time: '03:30 PM', teacher: 'Dr. Brown', subject: 'Computer Science', type: 'Project Review', status: 'booked', duration: 120 },
    { time: '04:00 PM', teacher: 'Prof. Taylor', subject: 'Mathematics', type: 'Consultation', status: 'available', duration: 45 },
  ];

  if (userRole === 'teacher') {
    return baseSlots.map((slot, index) => ({
      id: `slot-${index}`,
      ...slot,
      student: slot.status === 'booked' ? 'Emma Wilson' : undefined,
    })) as TimeSlot[];
  }

  return baseSlots.map((slot, index) => ({
    id: `slot-${index}`,
    ...slot,
  })) as TimeSlot[];
};

export default function CalendarGrid({ userRole, selectedDate }: CalendarGridProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  const today = new Date();
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendar = [];

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    calendar.push(date);
  }

  const timeSlots = generateTimeSlots(userRole, selectedDate);
  const availableSlots = timeSlots.filter(slot => slot.status === 'available').length;
  const bookedSlots = timeSlots.filter(slot => slot.status === 'booked').length;

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedDate.getMonth();
  };

  const hasAppointments = (date: Date) => {
    return Math.random() > 0.7; // Simulate some days having appointments
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-0 border-b border-slate-200 dark:border-slate-700">
        {days.map((day) => (
          <div key={day} className="p-4 text-center">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {calendar.map((date, index) => (
          <div
            key={index}
            className={`relative min-h-[120px] border-r border-b border-slate-100 dark:border-slate-700 p-2 transition-all duration-200 ${
              isCurrentMonth(date)
                ? 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                : 'bg-slate-50 dark:bg-slate-900/50'
            } ${
              hoveredDate === date.getDate() && isCurrentMonth(date) 
                ? 'bg-blue-50 dark:bg-blue-900/20' 
                : ''
            }`}
            onMouseEnter={() => setHoveredDate(date.getDate())}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                isToday(date)
                  ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center'
                  : isCurrentMonth(date)
                  ? 'text-slate-900 dark:text-slate-100'
                  : 'text-slate-400 dark:text-slate-600'
              }`}>
                {date.getDate()}
              </span>
              
              {hasAppointments(date) && isCurrentMonth(date) && (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              )}
            </div>

            {/* Sample appointment indicators */}
            {isCurrentMonth(date) && hasAppointments(date) && (
              <div className="space-y-1">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium truncate">
                  {userRole === 'student' ? '9:00 Dr. Smith' : '9:00 Emma W.'}
                </div>
                {Math.random() > 0.5 && (
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium truncate">
                    {userRole === 'student' ? '2:00 Prof. Davis' : '2:00 James C.'}
                  </div>
                )}
              </div>
            )}

            {/* Add appointment button for empty days */}
            {isCurrentMonth(date) && !hasAppointments(date) && hoveredDate === date.getDate() && (
              <button className="absolute inset-0 flex items-center justify-center bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg m-1 opacity-0 hover:opacity-100 transition-opacity duration-200">
                {userRole === 'student' ? 'Find slots' : 'Add availability'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="p-6 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {userRole === 'student' ? 'Available' : 'Available Slots'}: {availableSlots}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {userRole === 'student' ? 'Booked' : 'Booked Slots'}: {bookedSlots}
              </span>
            </div>
          </div>
          
          <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
            {userRole === 'student' ? 'View All Available Slots' : 'Manage Availability'}
          </button>
        </div>
      </div>
    </div>
  );
}
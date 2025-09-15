import React, { useState } from 'react';
import { Clock, User, Calendar, MapPin, Video, MessageSquare, MoreHorizontal } from 'lucide-react';
import { UserRole } from '../../App';

interface AvailabilitySlot {
  id: string;
  teacher: string;
  teacherAvatar: string;
  student?: string;
  studentAvatar?: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  location: 'online' | 'office';
  status: 'available' | 'booked' | 'pending';
  rating?: number;
  price?: number;
}

const mockSlots: AvailabilitySlot[] = [
  {
    id: '1',
    teacher: 'Dr. Sarah Smith',
    teacherAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Computer Science',
    date: 'Tomorrow',
    time: '9:00 AM',
    duration: '60 min',
    type: 'Office Hours',
    location: 'online',
    status: 'available',
    rating: 4.9,
    price: 0
  },
  {
    id: '2',
    teacher: 'Prof. Michael Davis',
    teacherAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Mathematics',
    date: 'Today',
    time: '2:00 PM',
    duration: '45 min',
    type: 'Consultation',
    location: 'office',
    status: 'booked',
    student: 'Emma Wilson',
    studentAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    price: 25
  },
  {
    id: '3',
    teacher: 'Dr. Jennifer Johnson',
    teacherAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Physics',
    date: 'Friday',
    time: '11:30 AM',
    duration: '90 min',
    type: 'Tutoring',
    location: 'online',
    status: 'available',
    rating: 4.9,
    price: 40
  },
  {
    id: '4',
    teacher: 'Prof. David Wilson',
    teacherAvatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Chemistry',
    date: 'Monday',
    time: '3:00 PM',
    duration: '60 min',
    type: 'Lab Session',
    location: 'office',
    status: 'pending',
    student: 'James Chen',
    studentAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    price: 30
  }
];

interface AvailabilityListProps {
  userRole: UserRole;
}

export default function AvailabilityList({ userRole }: AvailabilityListProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const styles = {
      available: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
      booked: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {userRole === 'student' ? 'Available Appointments' : 'Your Schedule'}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <span>Showing {mockSlots.length} results</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {mockSlots.map((slot) => (
          <div
            key={slot.id}
            className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={userRole === 'student' ? slot.teacherAvatar : slot.studentAvatar || slot.teacherAvatar}
                  alt={userRole === 'student' ? slot.teacher : slot.student || slot.teacher}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {userRole === 'student' ? slot.teacher : slot.student || 'Available Slot'}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">
                    {slot.subject} • {slot.type}
                  </p>
                  {slot.rating && (
                    <div className="flex items-center space-x-1">
                      <span className="text-amber-500">★</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {slot.rating}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">(124 reviews)</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {getStatusBadge(slot.status)}
                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{slot.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{slot.time} ({slot.duration})</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                {slot.location === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                <span className="text-sm capitalize">{slot.location}</span>
              </div>
              {slot.price !== undefined && (
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <span className="text-sm font-medium">
                    {slot.price === 0 ? 'Free' : `$${slot.price}`}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Message</span>
                </button>
                {slot.location === 'online' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                    <Video className="w-4 h-4" />
                    <span className="text-sm">Join Call</span>
                  </button>
                )}
              </div>

              {slot.status === 'available' && userRole === 'student' && (
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200">
                  Book Appointment
                </button>
              )}
              
              {userRole === 'teacher' && slot.status === 'pending' && (
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200">
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-b-2xl">
        <div className="flex items-center justify-center">
          <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  );
}
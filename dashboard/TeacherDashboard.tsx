import React from 'react';
import { Calendar, Clock, Users, Star, TrendingUp, BookOpen } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import AppointmentCard from '../shared/AppointmentCard';
import QuickActions from '../shared/QuickActions';

const todaysAppointments = [
  {
    id: '1',
    studentName: 'Emma Wilson',
    studentAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Computer Science',
    date: 'Today',
    time: '2:00 PM',
    duration: '60 min',
    type: 'Office Hours',
    status: 'confirmed',
    topic: 'Data Structures Help'
  },
  {
    id: '2',
    studentName: 'James Chen',
    studentAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Computer Science',
    date: 'Today',
    time: '4:30 PM',
    duration: '45 min',
    type: 'Consultation',
    status: 'confirmed',
    topic: 'Project Review'
  }
];

const recentActivity = [
  { id: '1', action: 'New booking from Emma Wilson', time: '30 minutes ago', type: 'booking' },
  { id: '2', action: 'Completed session with David Kim', time: '2 hours ago', type: 'completed' },
  { id: '3', action: 'Received 5-star rating from Sarah Johnson', time: '4 hours ago', type: 'rating' },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good afternoon, Dr. Smith!</h1>
            <p className="text-emerald-100 text-lg">
              You have 6 appointments scheduled for today
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Appointments"
          value="6"
          change="+2"
          changeType="positive"
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="This Week"
          value="28"
          change="+15%"
          changeType="positive"
          icon={Clock}
          color="green"
        />
        <StatsCard
          title="Total Students"
          value="142"
          change="+8"
          changeType="positive"
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Average Rating"
          value="4.9"
          change="+0.1"
          changeType="positive"
          icon={Star}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Today's Schedule
              </h2>
              <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                Manage Availability
              </button>
            </div>
            <div className="space-y-4">
              {todaysAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} userType="teacher" />
              ))}
            </div>
            {todaysAppointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">No appointments scheduled for today</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Set Your Availability
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          <QuickActions userType="teacher" />
          
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'booking' ? 'bg-green-500' :
                    activity.type === 'completed' ? 'bg-blue-500' :
                    activity.type === 'rating' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-slate-100">{activity.action}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              This Week's Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Sessions Completed</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">24/28</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '86%' }} />
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Calendar, Clock, User, MessageSquare, TrendingUp, BookOpen } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import AppointmentCard from '../shared/AppointmentCard';
import QuickActions from '../shared/QuickActions';

const upcomingAppointments = [
  {
    id: '1',
    teacherName: 'Dr. Sarah Smith',
    teacherAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Computer Science',
    date: 'Tomorrow',
    time: '2:00 PM',
    duration: '60 min',
    type: 'Office Hours',
    status: 'confirmed'
  },
  {
    id: '2',
    teacherName: 'Prof. Michael Davis',
    teacherAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    subject: 'Mathematics',
    date: 'Friday',
    time: '10:30 AM',
    duration: '45 min',
    type: 'Consultation',
    status: 'pending'
  }
];

const recentActivity = [
  { id: '1', action: 'Booked appointment with Dr. Smith', time: '2 hours ago', type: 'booking' },
  { id: '2', action: 'Received message from Prof. Davis', time: '4 hours ago', type: 'message' },
  { id: '3', action: 'Completed appointment with Dr. Johnson', time: '1 day ago', type: 'completed' },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
            <p className="text-blue-100 text-lg">
              You have 2 upcoming appointments this week
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
          title="Total Appointments"
          value="24"
          change="+12%"
          changeType="positive"
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="This Week"
          value="3"
          change="+1"
          changeType="positive"
          icon={Clock}
          color="green"
        />
        <StatsCard
          title="Favorite Teachers"
          value="8"
          change="+2"
          changeType="positive"
          icon={User}
          color="purple"
        />
        <StatsCard
          title="Avg. Rating Given"
          value="4.8"
          change="+0.2"
          changeType="positive"
          icon={TrendingUp}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Upcoming Appointments
              </h2>
              <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} userType="student" />
              ))}
            </div>
            {upcomingAppointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">No upcoming appointments</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          <QuickActions userType="student" />
          
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
                    activity.type === 'message' ? 'bg-blue-500' : 'bg-slate-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-slate-100">{activity.action}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Users, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import StatsCard from '../shared/StatsCard';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100 text-lg">
              System overview and management controls
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="1,245"
          change="+12%"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Teachers"
          value="89"
          change="+3"
          changeType="positive"
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Total Appointments"
          value="5,670"
          change="+18%"
          changeType="positive"
          icon={Calendar}
          color="purple"
        />
        <StatsCard
          title="System Issues"
          value="2"
          change="-1"
          changeType="positive"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            System Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">API Services</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">All systems operational</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Database</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Performance optimal</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Email Service</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Minor delays detected</p>
              </div>
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Recent Admin Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-100">
                  New teacher account approved: Dr. Johnson
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-100">
                  System maintenance completed successfully
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-100">
                  Bulk email campaign sent to all users
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
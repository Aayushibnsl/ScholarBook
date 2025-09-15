import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'red';
}

const colorClasses = {
  blue: {
    bg: 'from-blue-500 to-blue-600',
    icon: 'text-blue-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  green: {
    bg: 'from-green-500 to-green-600',
    icon: 'text-green-600',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
  },
  purple: {
    bg: 'from-purple-500 to-purple-600',
    icon: 'text-purple-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  amber: {
    bg: 'from-amber-500 to-amber-600',
    icon: 'text-amber-600',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  red: {
    bg: 'from-red-500 to-red-600',
    icon: 'text-red-600',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
  },
};

export default function StatsCard({ title, value, change, changeType, icon: Icon, color }: StatsCardProps) {
  const colorClass = colorClasses[color];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colorClass.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${colorClass.icon}`} />
        </div>
        <div className="flex items-center space-x-1">
          {changeType === 'positive' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : changeType === 'negative' ? (
            <TrendingDown className="w-4 h-4 text-red-500" />
          ) : null}
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-500' :
            changeType === 'negative' ? 'text-red-500' : 'text-slate-500'
          }`}>
            {change}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
          {value}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {title}
        </p>
      </div>
    </div>
  );
}
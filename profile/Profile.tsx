import React, { useState } from 'react';
import { UserRole } from '../../App';
import { useUser } from '../../contexts/UserContext';
import { 
  User, Mail, Phone, MapPin, Calendar, Star, BookOpen, 
  Edit, Camera, Save, X, Award, Clock, Users 
} from 'lucide-react';

interface ProfileProps {
  userRole: UserRole;
}

export default function Profile({ userRole }: ProfileProps) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: user?.bio || '',
    subjects: user?.subjects || ['Computer Science', 'Mathematics'],
    hourlyRate: '50',
    availability: 'Mon-Fri, 9 AM - 5 PM'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const stats = userRole === 'student' 
    ? [
        { label: 'Total Sessions', value: '24', icon: BookOpen },
        { label: 'Favorite Teachers', value: '8', icon: Star },
        { label: 'This Month', value: '6', icon: Calendar },
        { label: 'Hours Learned', value: '48', icon: Clock },
      ]
    : [
        { label: 'Total Students', value: '142', icon: Users },
        { label: 'Sessions Taught', value: '356', icon: BookOpen },
        { label: 'Average Rating', value: '4.9', icon: Star },
        { label: 'Response Time', value: '<2h', icon: Clock },
      ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20"
                />
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-slate-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                <p className="text-blue-100 text-lg mb-2 capitalize">{user?.role}</p>
                <p className="text-blue-200">{user?.department}</p>
                
                {userRole === 'teacher' && (
                  <div className="flex items-center space-x-4 mt-4 text-blue-100">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-300 fill-current" />
                      <span>4.9 Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>142 Students</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Personal Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Full Name</p>
                    <p className="text-slate-600 dark:text-slate-400">{formData.name}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Email</p>
                    <p className="text-slate-600 dark:text-slate-400">{formData.email}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Phone</p>
                    <p className="text-slate-600 dark:text-slate-400">{formData.phone}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Location</p>
                    <p className="text-slate-600 dark:text-slate-400">{formData.location}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Additional Info */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            {userRole === 'teacher' ? 'Teaching Profile' : 'About Me'}
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {formData.bio || 'No bio available yet.'}
                </p>
              )}
            </div>

            {userRole === 'teacher' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subjects
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Hourly Rate
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400">
                      ${formData.hourlyRate}/hour
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Availability
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400">
                      {formData.availability}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Achievement/Reviews Section */}
      {userRole === 'teacher' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Recent Reviews
          </h3>
          
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-slate-200 dark:border-slate-700 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start space-x-3">
                  <img
                    src={`https://images.pexels.com/photos/123${review * 4567}/pexels-photo-123${review * 4567}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt="Student"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">
                        Student {review}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-amber-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Excellent teacher! Very patient and explains concepts clearly. 
                      Would definitely recommend to other students.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      2 days ago
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
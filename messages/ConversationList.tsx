import React from 'react';
import { Clock, CheckCheck } from 'lucide-react';
import { UserRole } from '../../App';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  type: 'teacher' | 'student';
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Thanks for the great session today! See you next week.',
    timestamp: '2 min ago',
    unread: 0,
    online: true,
    type: 'teacher'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Could we reschedule tomorrow\'s appointment?',
    timestamp: '15 min ago',
    unread: 2,
    online: true,
    type: 'student'
  },
  {
    id: '3',
    name: 'Prof. Michael Davis',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'I\'ve uploaded the assignment materials.',
    timestamp: '1 hour ago',
    unread: 0,
    online: false,
    type: 'teacher'
  },
  {
    id: '4',
    name: 'James Chen',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Looking forward to our project review session!',
    timestamp: '2 hours ago',
    unread: 1,
    online: true,
    type: 'student'
  }
];

interface ConversationListProps {
  userRole: UserRole;
  selectedConversation: string;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
}

export default function ConversationList({
  userRole,
  selectedConversation,
  onSelectConversation,
  searchQuery
}: ConversationListProps) {
  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="space-y-1 p-2">
      {filteredConversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className={`w-full p-4 rounded-xl text-left transition-all duration-200 group ${
            selectedConversation === conversation.id
              ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
              : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="relative flex-shrink-0">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              {conversation.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {conversation.name}
                </h4>
                <div className="flex items-center space-x-2">
                  {conversation.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                      {conversation.unread > 9 ? '9+' : conversation.unread}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatTimestamp(conversation.timestamp)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate flex-1">
                  {conversation.lastMessage}
                </p>
                {conversation.unread === 0 && selectedConversation === conversation.id && (
                  <CheckCheck className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>
          </div>
        </button>
      ))}

      {filteredConversations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400 mb-2">No conversations found</p>
          {searchQuery && (
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Try different keywords
            </p>
          )}
        </div>
      )}
    </div>
  );
}
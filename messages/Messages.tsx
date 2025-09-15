import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Send, Paperclip, Smile } from 'lucide-react';
import { UserRole } from '../../App';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

interface MessagesProps {
  userRole: UserRole;
}

export default function Messages({ userRole }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      <div className="h-[calc(100vh-12rem)] flex">
        {/* Conversation List */}
        <div className="w-1/3 border-r border-slate-200 dark:border-slate-700 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Messages
              </h2>
              <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              userRole={userRole}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <ChatWindow
            userRole={userRole}
            conversationId={selectedConversation}
          />
        </div>
      </div>
    </div>
  );
}
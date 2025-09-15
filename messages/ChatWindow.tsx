import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreHorizontal, Phone, Video, Info } from 'lucide-react';
import { UserRole } from '../../App';

interface Message {
  id: string;
  sender: 'me' | 'other';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'other',
    content: 'Hi! I hope you\'re doing well. I wanted to discuss the upcoming assignment.',
    timestamp: new Date(Date.now() - 3600000),
    type: 'text',
    status: 'read'
  },
  {
    id: '2',
    sender: 'me',
    content: 'Hello! Yes, I\'d love to discuss it. What specific aspects would you like to cover?',
    timestamp: new Date(Date.now() - 3300000),
    type: 'text',
    status: 'read'
  },
  {
    id: '3',
    sender: 'other',
    content: 'I\'m particularly interested in the data structures part. Could we schedule a session to go through some examples?',
    timestamp: new Date(Date.now() - 3000000),
    type: 'text',
    status: 'read'
  },
  {
    id: '4',
    sender: 'me',
    content: 'Absolutely! I have availability tomorrow at 2 PM or Friday at 10 AM. Which works better for you?',
    timestamp: new Date(Date.now() - 2700000),
    type: 'text',
    status: 'read'
  },
  {
    id: '5',
    sender: 'other',
    content: 'Tomorrow at 2 PM would be perfect! Thank you so much.',
    timestamp: new Date(Date.now() - 300000),
    type: 'text',
    status: 'delivered'
  }
];

interface ChatWindowProps {
  userRole: UserRole;
  conversationId: string;
}

export default function ChatWindow({ userRole, conversationId }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'me',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const otherPerson = {
    name: 'Dr. Sarah Smith',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'online',
    role: 'teacher'
  };

  return (
    <>
      {/* Chat Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={otherPerson.avatar}
                alt={otherPerson.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {otherPerson.name}
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                {otherPerson.status}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
              <Info className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
          
          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-lg text-sm">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.sender === 'me' ? 'order-2' : 'order-1'
                }`}>
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                  } ${
                    message.sender === 'me' ? 'rounded-br-md' : 'rounded-bl-md'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  <div className={`flex items-center mt-1 space-x-2 ${
                    message.sender === 'me' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === 'me' && message.status && (
                      <span className={`text-xs ${
                        message.status === 'read' ? 'text-blue-500' :
                        message.status === 'delivered' ? 'text-slate-500' :
                        'text-slate-400'
                      }`}>
                        {message.status === 'read' ? '✓✓' :
                         message.status === 'delivered' ? '✓✓' :
                         message.status === 'sent' ? '✓' : '⏱'}
                      </span>
                    )}
                  </div>
                </div>
                
                {message.sender !== 'me' && (
                  <div className="order-1 mr-3">
                    <img
                      src={otherPerson.avatar}
                      alt={otherPerson.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-end space-x-4">
          <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <button className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
            <Smile className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-xl font-medium transition-all duration-200 ${
              newMessage.trim()
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm hover:shadow-md transform hover:scale-[1.02]'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
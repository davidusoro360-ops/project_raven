import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { getAllRoommates, getMessages, sendMessage, type ChatMessage } from '@/services/roommateService';

const RoommateChat: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const roommate = getAllRoommates().find((r) => r.id === id);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simple simulated responses
  const getSimulatedResponse = (userContent: string): string => {
    const lower = userContent.toLowerCase();
    if (lower.includes('hi') || lower.includes('hello')) return 'Hello! Nice to meet you. What are you looking for in a roommate?';
    if (lower.includes('room') || lower.includes('budget')) return 'I\'m flexible with budget, around $500-700. How about you?';
    if (lower.includes('location') || lower.includes('campus')) return 'I prefer near campus. Where are you thinking?';
    if (lower.includes('clean')) return 'I like to keep things clean but not obsessive.';
    return 'Sounds good! Tell me more about yourself.';
  };

  const cryptoRandomId = () => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      // @ts-ignore
      return crypto.randomUUID();
    }
    return 'm_' + Math.random().toString(36).slice(2);
  };

  const msgKey = (id: string) => `roommateMessages:${id}`;

  useEffect(() => {
    if (!roommate) return;
    setMessages(getMessages(roommate.id));
  }, [roommate?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!roommate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Chat</h1>
                <p className="text-sm text-gray-500">Roommate not found</p>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-600">This chat cannot be opened. Return to results and try again.</p>
            <button
              onClick={() => navigate('/roommates/results')}
              className="mt-4 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gray-900 hover:bg-black"
            >
              Back to Matches
            </button>
          </div>
        </main>
      </div>
    );
  }

  const onSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    const content = text.trim();
    if (!content) return;
    const msg = sendMessage(roommate.id, content);
    setMessages((prev) => [...prev, msg]);
    setText('');

    // Simulate roommate response after 2 seconds
    setTimeout(() => {
      if (roommate) {
        const responseContent = getSimulatedResponse(content);
        const responseMsg: ChatMessage = {
          id: cryptoRandomId(),
          role: 'them',
          content: responseContent,
          timestamp: new Date().toISOString(),
        };
        const all = getMessages(roommate.id);
        all.push(responseMsg);
        try {
          localStorage.setItem(msgKey(roommate.id), JSON.stringify(all));
        } catch {}
        setMessages((prev) => [...prev, responseMsg]);
      }
    }, 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; // max 120px height
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <Avatar
                src={roommate.avatar}
                alt={roommate.name}
                size="md"
                fallback={roommate.name.split(' ').map((n) => n[0]).join('')}
              />
              <div>
                <h1 className="text-base font-bold text-gray-900 leading-tight">{roommate.name}</h1>
                <p className="text-xs text-gray-500">Tap to view profile</p>
              </div>
            </div>
          </div>
          <Link
            to={`/roommates/details/${roommate.id}`}
            className="px-3 py-2 text-xs font-semibold text-white rounded-lg bg-gray-900 hover:bg-black"
          >
            View Profile
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-4">
        <div className="bg-white border border-gray-200 rounded-2xl h-[70vh] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-500">
                No messages yet. Say hello to start the conversation.
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === 'me'
                        ? 'bg-gray-900 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">{m.content}</div>
                    <div className={`mt-1 text-[10px] ${m.role === 'me' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <form onSubmit={onSend} className="border-t border-gray-200 p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="Type your message..."
                className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800/20 focus:border-gray-800"
                style={{ height: 'auto', minHeight: '40px', maxHeight: '120px' }}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={!text.trim()}
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RoommateChat;
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { chatWithGemini } from '../services/gemini';
import { cn } from '../lib/utils';
import { Message } from '../types';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Hello! I am your JEE Ace Tutor. Upload a problem or just type your doubt here. I can help with equations, concepts, and strategy!', 
      timestamp: new Date().toISOString() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.concat(userMsg).map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.content }]
      }));

      const response = await chatWithGemini(history);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'I apologize, but I am having trouble thinking right now.',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Failed to connect to the brain center. Please check your internet or try again later.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">AI Assistant Active</span>
          </div>
          <span className="text-[10px] font-mono bg-white px-2 py-1 rounded border border-slate-200">Lat: 42ms</span>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-4 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 text-xs font-bold",
              msg.role === 'user' ? "bg-slate-100 text-slate-600" : "bg-indigo-600 text-white"
            )}>
              {msg.role === 'user' ? "AS" : "AI"}
            </div>
            <div className={cn(
              "p-4 rounded-2xl transition-all",
              msg.role === 'user' 
                ? "bg-slate-100 text-slate-800 rounded-tr-none" 
                : "bg-indigo-50 text-indigo-900 rounded-tl-none border border-indigo-100 shadow-sm"
            )}>
              <div className={cn(
                "prose prose-sm max-w-none text-sm leading-relaxed",
                msg.role === 'user' ? "" : "prose-indigo"
              )}>
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
              <p className={cn(
                "text-[9px] mt-2 opacity-50 font-bold uppercase tracking-tighter",
                msg.role === 'user' ? "text-right" : "text-left"
              )}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-4 mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <div className="bg-indigo-50 p-4 rounded-2xl rounded-tl-none border border-indigo-100 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Assistant Thinking</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a doubt or paste a math problem..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pb-3 pr-24 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
          <div className="absolute right-2 flex gap-1">
             <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
               <Bot className="w-4 h-4 opacity-50" />
             </button>
             <button 
              disabled={!input.trim() || isLoading}
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm uppercase tracking-wide"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

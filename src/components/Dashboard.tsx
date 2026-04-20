import React from 'react';
import { PlayCircle, BookOpen, Clock, Target, ArrowRight, MessageSquareText } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export function Dashboard({ setActiveTab }: DashboardProps) {
  const stats = [
    { label: 'Cumulative Hours', value: '124', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Problems Solved', value: '842', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Mastery Level', value: '64%', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const recentTopics = [
    { name: 'Rotational Dynamics', subject: 'Physics', progress: 65, color: 'bg-blue-500' },
    { name: 'Organic Reaction Mechanisms', subject: 'Chemistry', progress: 40, color: 'bg-emerald-500' },
    { name: 'Complex Numbers', subject: 'Maths', progress: 85, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8 font-sans">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Adaptive Overview</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Consistency is the key to cracking JEE. Keep pushing!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md"
          >
            <div className={cn(stat.bg, "p-3 rounded-xl w-fit mb-4")}>
              <stat.icon className={cn(stat.color, "w-6 h-6")} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Current Modules</h3>
            <button 
              onClick={() => setActiveTab('syllabus')}
              className="text-indigo-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
            >
              View Full Syllabus <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 space-y-4 flex-1">
            {recentTopics.map((topic) => (
              <div key={topic.name} className="flex flex-col gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-0.5", topic.subject === 'Physics' ? "text-blue-600" : topic.subject === 'Chemistry' ? "text-emerald-600" : "text-amber-600")}>{topic.subject}</p>
                    <h4 className="font-bold text-slate-800">{topic.name}</h4>
                  </div>
                  <button className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <PlayCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.progress}%` }}
                    className={cn(topic.color, "h-full rounded-full")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Daily Performance</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-center">
                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">12/20</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Daily Goal</p>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-emerald-600 tracking-tight">92%</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Accuracy</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 text-center">
                <button 
                  onClick={() => setActiveTab('progress')}
                  className="text-indigo-600 text-[11px] font-bold uppercase tracking-widest hover:underline"
                >
                  View Full Analytics
                </button>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse"></div>
                <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Adaptive Insight</h4>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                Your performance in <span className="text-indigo-300 font-bold text-xs uppercase tracking-tight">'Inorganic Chemistry'</span> is dipping. We recommend a refresher.
              </p>
              <button 
                onClick={() => setActiveTab('chat')}
                className="w-full bg-white text-indigo-900 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-indigo-50 transition-all uppercase tracking-wide"
              >
                Launch Doubt Desk
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

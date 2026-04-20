import React from 'react';
import { TrendingUp, Target, Award, PieChart, BarChart3, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Progress() {
  const subjectProgress = [
    { subject: 'Physics', progress: 45, color: 'bg-blue-500', totalTopics: 28, completedTopics: 12 },
    { subject: 'Chemistry', progress: 60, color: 'bg-emerald-500', totalTopics: 32, completedTopics: 19 },
    { subject: 'Mathematics', progress: 38, color: 'bg-purple-500', totalTopics: 25, completedTopics: 9 },
  ];

  const recentAchievements = [
    { title: 'Goal Crusher', description: 'Study for 5 hours straight', icon: Award, color: 'text-amber-500' },
    { title: 'Physics Pro', description: '80%+ Accuracy in Mechanics', icon: Target, color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-8 font-sans">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Desk</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Deep analytics across Physics, Chemistry, and Mathematics.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 tracking-tight">
              Syllabus Mastery
            </h3>
            <div className="space-y-8">
              {subjectProgress.map((item) => (
                <div key={item.subject} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 tracking-tight">{item.subject}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.completedTopics} of {item.totalTopics} modules</p>
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tighter">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={cn("h-full rounded-full transition-all", item.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Weekly Intensity</h3>
              <button className="text-indigo-600 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                Full Report <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="h-48 w-full bg-slate-50 rounded-xl flex items-end justify-around p-4 border border-slate-100">
              {[40, 65, 50, 80, 55, 90, 75].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="w-8 bg-indigo-500/20 border-t-2 border-indigo-500 rounded-t-lg relative group transition-all hover:bg-indigo-500 hover:scale-110"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-[9px] py-1 px-2 rounded font-bold">
                    {h}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-around mt-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-6 tracking-tight">Recent Milestones</h3>
            <div className="space-y-4">
              {recentAchievements.map((badge) => (
                <div key={badge.title} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className={cn("p-2 rounded-lg bg-indigo-50", badge.color)}>
                    <badge.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm tracking-tight">{badge.title}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 p-8 rounded-2xl text-white space-y-4 shadow-lg overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 transition-transform hover:rotate-12">
                <TrendingUp className="w-5 h-5 text-indigo-300" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-widest text-[10px] mb-2 text-indigo-300">Strategic Tip</h3>
              <p className="text-sm font-medium leading-relaxed">
                Your calculus speed is low. We recommend taking a 30-minute mini-test focusing on Limits and Continuity.
              </p>
              <button 
                className="w-full mt-6 py-2.5 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm uppercase tracking-wider"
              >
                Boost My Score
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

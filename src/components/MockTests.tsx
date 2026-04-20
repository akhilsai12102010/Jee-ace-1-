import React from 'react';
import { ClipboardList, Play, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function MockTests() {
  const tests = [
    { title: 'Full Length JEE Main - 1', subject: 'Total', duration: '3 Hours', questions: 75, completed: true, score: '185/300' },
    { title: 'Physics Mini Test - Unit & Measurement', subject: 'Physics', duration: '45 Mins', questions: 25, completed: false },
    { title: 'Chemistry Sectional - Organic', subject: 'Chemistry', duration: '60 Mins', questions: 30, completed: false },
    { title: 'Maths Sectional - Integration', subject: 'Maths', duration: '60 Mins', questions: 30, completed: false },
  ];

  return (
    <div className="space-y-8 font-sans">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Adaptive Testing</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Simulate real exam conditions with timed practice tests and dynamic difficulty.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tests.map((test, i) => (
          <motion.div
            key={test.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 transition-colors group-hover:bg-indigo-50">
                <ClipboardList className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 tracking-tight">{test.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3" /> {test.duration}
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{test.questions} Questions</span>
                </div>
              </div>
            </div>

            {test.completed ? (
              <div className="text-right">
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-1 justify-end">
                  <CheckCircle2 className="w-3 h-3" /> Scored
                </div>
                <div className="text-xl font-bold text-slate-900 tracking-tighter">{test.score}</div>
              </div>
            ) : (
              <button className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-current" /> Start
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-indigo-600 mt-1" />
        <div>
          <h4 className="font-bold text-indigo-900 tracking-tight">Strategy Council</h4>
          <p className="text-indigo-800 text-xs mt-1 leading-relaxed font-medium">
            JEE Main Session is approaching. We recommend focusing on your 'Weak' areas identified in performance analytics before attempting full-length tests.
          </p>
        </div>
      </div>
    </div>
  );
}

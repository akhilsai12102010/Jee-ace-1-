/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Chat } from './components/Chat';
import { Learn } from './components/Learn';
import { MockTests } from './components/MockTests';
import { Progress } from './components/Progress';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex gap-6 h-full items-center">
            {[
              { label: 'Doubt Desk', tab: 'chat' },
              { label: 'Adaptive Testing', tab: 'tests' },
              { label: 'PYQ Bank', tab: 'syllabus' },
              { label: 'Performance', tab: 'progress' }
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={() => setActiveTab(item.tab)}
                className={cn(
                  "h-full px-1 flex items-center transition-all uppercase tracking-widest text-[10px] font-bold border-b-2",
                  activeTab === item.tab ? "text-indigo-600 border-indigo-600" : "text-slate-500 border-transparent hover:text-slate-800"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('tests')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-sm hover:bg-indigo-700 transition-all uppercase tracking-wider"
          >
            Start Mock Test
          </button>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'chat' && <Chat />}
          {activeTab === 'syllabus' && <Learn />}
          {activeTab === 'tests' && <MockTests />}
          {activeTab === 'progress' && <Progress />}
        </div>
      </main>
    </div>
  );
}


import { LayoutDashboard, MessageSquareText, BookOpen, ClipboardList, TrendingUp, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dash Desk' },
    { id: 'chat', icon: MessageSquareText, label: 'Doubt Desk' },
    { id: 'syllabus', icon: BookOpen, label: 'Syllabus' },
    { id: 'tests', icon: ClipboardList, label: 'Adaptive Testing' },
    { id: 'progress', icon: TrendingUp, label: 'Performance' },
  ];

  return (
    <div className="w-72 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-10 font-sans">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">JEE Scholar AI</h1>
        </div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">IIT PREP COMPANION</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium",
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-6 py-4 space-y-6">
          <section>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Syllabus Mastery</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold"><span>Physics</span><span>68%</span></div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '68%' }}></div></div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold"><span>Chemistry</span><span>84%</span></div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }}></div></div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold"><span>Mathematics</span><span>42%</span></div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '42%' }}></div></div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Modules</h3>
            <ul className="space-y-1">
              <li className="p-2 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">Rotational Dynamics</li>
              <li className="p-2 rounded-md hover:bg-slate-50 text-slate-600 text-xs cursor-pointer">Ionic Equilibrium</li>
              <li className="p-2 rounded-md hover:bg-slate-50 text-slate-600 text-xs cursor-pointer">Complex Numbers</li>
            </ul>
          </section>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Aryan Sharma</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Rank Target: &lt; 500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

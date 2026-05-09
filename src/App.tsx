import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MonitoringDashboard } from './screens/MonitoringDashboard';
import { LogisticsService } from './screens/LogisticsService';
import { SeedlingManagement } from './screens/SeedlingManagement';
import { TaskManagement } from './screens/TaskManagement';

export type ScreenId = 'dashboard' | 'tasks' | 'logistics' | 'seedlings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <MonitoringDashboard />;
      case 'tasks': return <TaskManagement />;
      case 'logistics': return <LogisticsService />;
      case 'seedlings': return <SeedlingManagement />;
      default: return <MonitoringDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-[#0A0A0B] text-[#E0E0E0] overflow-x-hidden shadow-2xl">
      {/* Top Bar - Styled with Sophisticated Dark theme */}
      <header className="bg-[#121214]/80 backdrop-blur-md sticky top-0 z-40 w-full h-16 flex justify-between items-center px-4 border-b border-[#2A2A2C]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2D5A27] rounded-lg flex items-center justify-center border border-[#3A3A3C] shadow-sm overflow-hidden">
             <span className="text-white font-bold text-xs">AG</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline text-[16px] leading-tight font-bold tracking-tight text-[#E0E0E0]">Yu Xiao Zhi</h1>
            <p className="text-[9px] text-[#666] font-bold uppercase tracking-widest">
              {currentScreen === 'dashboard' && 'Status Board'}
              {currentScreen === 'tasks' && 'Operations'}
              {currentScreen === 'logistics' && 'Logistics'}
              {currentScreen === 'seedlings' && 'Base Mgmt'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse"></div>
            <span className="text-[10px] text-[#888] font-bold uppercase">Online</span>
          </div>
          <button className="material-symbols-outlined p-2 rounded-full text-[#666] hover:text-[#E0E0E0] transition-colors">
            notifications
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - Styled with Sophisticated Dark theme */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-around items-center py-2 px-4 bg-[#121214] border-t border-[#2A2A2C] z-50 rounded-t-xl shadow-2xl">
        <NavItem 
          id="nav-dashboard"
          active={currentScreen === 'dashboard'} 
          icon="dashboard" 
          label="看板" 
          onClick={() => setCurrentScreen('dashboard')} 
        />
        <NavItem 
          id="nav-tasks"
          active={currentScreen === 'tasks'} 
          icon="assignment" 
          label="作业" 
          onClick={() => setCurrentScreen('tasks')} 
        />
        <NavItem 
          id="nav-logistics"
          active={currentScreen === 'logistics'} 
          icon="local_shipping" 
          label="物流" 
          onClick={() => setCurrentScreen('logistics')} 
        />
        <NavItem 
          id="nav-seedlings"
          active={currentScreen === 'seedlings'} 
          icon="potted_plant" 
          label="基地" 
          onClick={() => setCurrentScreen('seedlings')} 
        />
      </nav>
    </div>
  );
}

function NavItem({ active, icon, label, onClick, id }: { active: boolean, icon: string, label: string, onClick: () => void, id: string }) {
  return (
    <button 
      id={id}
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-lg px-4 py-2 transition-all duration-200 ${
        active 
          ? 'text-[#4CAF50]' 
          : 'text-[#666] hover:text-[#E0E0E0]'
      }`}
    >
      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: `'FILL' ${active ? 1 : 0}` }}>{icon}</span>
      <span className="text-[10px] uppercase tracking-wider font-bold mt-1">{label}</span>
    </button>
  );
}

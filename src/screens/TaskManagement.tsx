import { taskApi, Task } from '../services/api';
import { usePolling } from '../hooks/usePolling';
import { useState, useEffect } from 'react';

function CountdownTimer({ nextRun }: { nextRun: string }) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(nextRun).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown('即将执行');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextRun]);

  return <span className="text-[#444] font-mono font-bold">NEXT {countdown}</span>;
}

export function TaskManagement() {
  const { data, refetch } = usePolling(() => taskApi.getAll(), 3000);

  const handleTrigger = async (taskId: string) => {
    await taskApi.trigger(taskId);
    refetch();
  };

  const handlePause = async (taskId: string) => {
    await taskApi.pause(taskId);
    refetch();
  };

  const handleResume = async (taskId: string) => {
    await taskApi.resume(taskId);
    refetch();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)]';
      case 'paused': return 'bg-[#FF5252]';
      default: return 'bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)]';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'running': return '运行中 RUNNING';
      case 'paused': return '用户暂停 PAUSED';
      default: return '运行正常 NORMAL';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case '水泵': return 'water_drop';
      case 'UV灯': return 'light_mode';
      case '风机': return 'air';
      default: return 'settings';
    }
  };

  return (
    <div className="px-4 py-4 space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="font-headline text-3xl font-light text-[#E0E0E0] tracking-tight">作业任务管理</h2>
        <p className="text-xs text-[#666] uppercase tracking-[0.2em] font-bold mt-1">AUTOMATION & CONTROL</p>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 gap-4">
        <div id="active-automation" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-4 tonal-elevation flex flex-col justify-between h-28 border-l-2 border-l-[#4CAF50]">
          <h2 className="font-mono text-[9px] text-[#666] uppercase font-bold tracking-widest">活跃自动化 ACTIVE</h2>
          <div className="flex items-end justify-between">
            <span className="font-mono text-4xl text-[#E0E0E0] font-light leading-none">{data?.active || 0}</span>
            <div className="flex items-center text-[#4CAF50] bg-[#2D5A27]/20 border border-[#2D5A27]/30 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest leading-none">
              <span className="material-symbols-outlined text-[12px] mr-1 animate-spin-slow">sync</span>
              运行中
            </div>
          </div>
        </div>

        <div id="pending-tasks" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-4 tonal-elevation flex flex-col justify-between h-28 border-l-2 border-l-[#ba1a1a]">
          <h2 className="font-mono text-[9px] text-[#666] uppercase font-bold tracking-widest">待处理任务 QUEUE</h2>
          <div className="flex items-end justify-between">
            <span className="font-mono text-4xl text-[#E0E0E0] font-light leading-none">{String(data?.pending || 0).padStart(2, '0')}</span>
            <div className="flex items-center text-[#FF5252] bg-[#ba1a1a]/20 border border-[#ba1a1a]/30 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest leading-none">
              <span className="material-symbols-outlined text-[12px] mr-1">schedule</span>
              队列中
            </div>
          </div>
        </div>
      </section>

      {/* Control Board Section */}
      <section className="space-y-4 pb-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs text-[#666] font-bold uppercase tracking-widest">设备控制板 CONTROL BOARD</h3>
          <button id="add-task-btn" className="flex items-center gap-2 px-4 py-2 bg-[#4CAF50] text-[#0A0A0B] rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#4CAF50]/20 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-sm">add</span>
            新建任务 NEW
          </button>
        </div>

        {data?.tasks.map((task) => (
          <div
            key={task.taskId}
            id={`task-${task.taskId}`}
            className={`bg-[#161618] border ${task.status === 'paused' ? 'border-l-2 border-l-[#FF5252]' : 'border-[#2A2A2C]'} rounded-xl overflow-hidden tonal-elevation group`}
          >
            <div className="p-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${task.status === 'paused' ? 'bg-[#ba1a1a]/10 border border-[#ba1a1a]/20 text-[#FF5252]' : 'bg-[#2D5A27]/20 border border-[#2D5A27]/30 text-[#4CAF50]'} flex items-center justify-center group-hover:bg-[#2D5A27]/40 transition-colors`}>
                  <span className="material-symbols-outlined text-2xl">{getDeviceIcon(task.device)}</span>
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-[#E0E0E0] truncate">{task.name}</h4>
                  <p className="text-[10px] text-[#666] uppercase font-bold tracking-wider mt-0.5">{task.location}</p>
                </div>
                {task.status === 'running' && (
                  <div className="ml-auto flex items-center gap-1 text-[#4CAF50] bg-[#2D5A27]/20 px-2 py-1 rounded text-[9px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse"></span>
                    运行中
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center border-y border-[#2A2A2C] py-5">
                <div>
                  <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">上次作业 LAST</p>
                  <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">{task.lastRun}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">间隔 GAP</p>
                  <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">{task.interval}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">时长 DUR</p>
                  <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">{task.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleTrigger(task.taskId)}
                  disabled={task.status === 'paused'}
                  className={`flex-1 py-3 bg-[#0A0A0B] border border-[#2A2A2C] text-[#E0E0E0] rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1C] transition-colors active:scale-[0.98] ${task.status === 'paused' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  立即触发 TRIGGER
                </button>
                {task.status === 'paused' ? (
                  <button
                    onClick={() => handleResume(task.taskId)}
                    className="w-12 h-12 flex items-center justify-center rounded bg-[#FF5252] text-[#0A0A0B] shadow-lg shadow-[#FF5252]/20 active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handlePause(task.taskId)}
                    className="w-12 h-12 flex items-center justify-center rounded border border-[#2A2A2C] text-[#666] hover:text-[#E0E0E0] hover:bg-[#1A1A1C] transition-colors"
                  >
                    <span className="material-symbols-outlined">pause</span>
                  </button>
                )}
              </div>
            </div>
            <div className={`bg-[${task.status === 'paused' ? '#ba1a1a' : '#0A0A0B'}]/50 px-5 py-3 flex items-center justify-between text-[10px] border-t ${task.status === 'paused' ? 'border-[#ba1a1a]/10' : 'border-[#2A2A2C]'}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></span>
                <span className={`font-mono font-bold uppercase tracking-wider ${task.status === 'paused' ? 'text-[#FF5252]' : 'text-[#4CAF50]'}`}>
                  {getStatusLabel(task.status)}
                </span>
              </div>
              {task.status !== 'paused' && <CountdownTimer nextRun={task.nextRun} />}
              {task.status === 'paused' && <span className="text-[#FF5252]/60 font-bold uppercase italic tracking-tighter">MANUAL OVERRIDE</span>}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

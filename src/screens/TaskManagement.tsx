export function TaskManagement() {
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
            <span className="font-mono text-4xl text-[#E0E0E0] font-light leading-none">12</span>
            <div className="flex items-center text-[#4CAF50] bg-[#2D5A27]/20 border border-[#2D5A27]/30 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest leading-none">
              <span className="material-symbols-outlined text-[12px] mr-1 animate-spin-slow">sync</span>
              运行中
            </div>
          </div>
        </div>
        
        <div id="pending-tasks" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-4 tonal-elevation flex flex-col justify-between h-28 border-l-2 border-l-[#ba1a1a]">
          <h2 className="font-mono text-[9px] text-[#666] uppercase font-bold tracking-widest">待处理任务 QUEUE</h2>
          <div className="flex items-end justify-between">
            <span className="font-mono text-4xl text-[#E0E0E0] font-light leading-none">04</span>
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

        {/* Task Card 1 */}
        <div id="task-irrigation" className="bg-[#161618] border border-[#2A2A2C] rounded-xl overflow-hidden tonal-elevation group">
          <div className="p-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/20 border border-[#2D5A27]/30 flex items-center justify-center text-[#4CAF50] group-hover:bg-[#2D5A27]/40 transition-colors">
                <span className="material-symbols-outlined text-2xl">water_drop</span>
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-[#E0E0E0] truncate">灌溉系统 B-01</h4>
                <p className="text-[10px] text-[#666] uppercase font-bold tracking-wider mt-0.5">北温室育苗区 NORTH WING</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center border-y border-[#2A2A2C] py-5">
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">上次作业 LAST</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">14:20</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">间隔 GAP</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">06h</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">时长 DUR</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">45s</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex-1 py-3 bg-[#0A0A0B] border border-[#2A2A2C] text-[#E0E0E0] rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1C] transition-colors active:scale-[0.98]">
                立即触发 TRIGGER
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded border border-[#2A2A2C] text-[#666] hover:text-[#E0E0E0] hover:bg-[#1A1A1C] transition-colors">
                <span className="material-symbols-outlined">pause</span>
              </button>
            </div>
          </div>
          <div className="bg-[#0A0A0B]/50 px-5 py-3 flex items-center justify-between text-[10px] border-t border-[#2A2A2C]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)]"></span>
              <span className="font-mono font-bold uppercase tracking-wider text-[#4CAF50]">运行正常 NORMAL</span>
            </div>
            <span className="text-[#444] font-mono font-bold">NEXT 02:45:12</span>
          </div>
        </div>

        {/* Task Card 2 */}
        <div id="task-lights" className="bg-[#161618] border border-[#2A2A2C] rounded-xl overflow-hidden tonal-elevation group border-l-2 border-l-[#ba1a1a]">
          <div className="p-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ba1a1a]/10 border border-[#ba1a1a]/20 flex items-center justify-center text-[#FF5252]">
                <span className="material-symbols-outlined text-2xl">light_mode</span>
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-[#E0E0E0] truncate">紫外线照射面板 04</h4>
                <p className="text-[10px] text-[#666] uppercase font-bold tracking-wider mt-0.5">水培支架 ALPHA TOWER</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center border-y border-[#2A2A2C] py-5">
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">上次作业 LAST</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">06:00</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">间隔 GAP</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">12h</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">时长 DUR</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">08h</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex-1 py-3 bg-[#0A0A0B] border border-[#2A2A2C] text-[#E0E0E0] rounded text-[10px] font-bold uppercase tracking-[0.2em] transition-colors opacity-50 cursor-not-allowed">
                立即触发 TRIGGER
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded bg-[#FF5252] text-[#0A0A0B] shadow-lg shadow-[#FF5252]/20 active:scale-95 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>
          </div>
          <div className="bg-[#ba1a1a]/5 px-5 py-3 flex items-center justify-between text-[10px] border-t border-[#ba1a1a]/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5252]"></span>
              <span className="font-mono font-bold uppercase tracking-wider text-[#FF5252]">用户暂停 PAUSED</span>
            </div>
            <span className="text-[#FF5252]/60 font-bold uppercase italic tracking-tighter">MANUAL OVERRIDE</span>
          </div>
        </div>

        {/* Task Card 3 */}
        <div id="task-fan" className="bg-[#161618] border border-[#2A2A2C] rounded-xl overflow-hidden tonal-elevation group">
          <div className="p-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A1A1C] border border-[#2A2A2C] flex items-center justify-center text-[#666]">
                <span className="material-symbols-outlined text-2xl">air</span>
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-[#E0E0E0] truncate">通风风机 F-12</h4>
                <p className="text-[10px] text-[#666] uppercase font-bold tracking-wider mt-0.5">主育苗温室 MAIN HOUSE</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center border-y border-[#2A2A2C] py-5">
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">上次作业 LAST</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">15:05</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">间隔 GAP</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">15m</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#444] uppercase tracking-tighter">时长 DUR</p>
                <p className="font-mono text-base font-medium text-[#888] mt-1 tracking-tight">05m</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex-1 py-3 bg-[#0A0A0B] border border-[#2A2A2C] text-[#E0E0E0] rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1C] transition-colors active:scale-[0.98]">
                立即触发 TRIGGER
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded border border-[#2A2A2C] text-[#666] hover:text-[#E0E0E0] hover:bg-[#1A1A1C] transition-colors">
                <span className="material-symbols-outlined">pause</span>
              </button>
            </div>
          </div>
          <div className="bg-[#0A0A0B]/50 px-5 py-3 flex items-center justify-between text-[10px] border-t border-[#2A2A2C]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)]"></span>
              <span className="font-mono font-bold uppercase tracking-wider text-[#4CAF50]">运行正常 NORMAL</span>
            </div>
            <span className="text-[#444] font-mono font-bold">NEXT 00:08:44</span>
          </div>
        </div>
      </section>
    </div>
  );
}

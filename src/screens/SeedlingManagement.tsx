export function SeedlingManagement() {
  return (
    <div className="px-4 py-4 space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="font-headline text-3xl font-light text-[#E0E0E0] tracking-tight">种苗基地管理</h2>
        <p className="text-xs text-[#666] uppercase tracking-[0.2em] font-bold mt-1">BASE FACILITY MONITORING</p>
      </div>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-[#161618] border border-[#2A2A2C] p-4 flex flex-col justify-between border-l-2 border-l-[#4CAF50] shadow-sm rounded-lg">
          <p className="font-mono text-[9px] text-[#666] uppercase tracking-widest font-bold mb-2">活跃批次 ACTIVE</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-light text-[#E0E0E0]">12</span>
            <span className="text-[10px] text-[#4CAF50] font-bold">+2 EXP</span>
          </div>
        </div>
        <div className="bg-[#161618] border border-[#2A2A2C] p-4 flex flex-col justify-between shadow-sm rounded-lg">
          <p className="font-mono text-[9px] text-[#666] uppercase tracking-widest font-bold mb-2">同步率 SYNC</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4CAF50] text-sm animate-spin-slow">sync</span>
            <span className="font-mono text-3xl font-light text-[#E0E0E0]">99.8%</span>
          </div>
        </div>
      </section>

      {/* Production Plans */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs text-[#666] font-bold uppercase tracking-widest">生产计划 Production</h3>
          <button className="text-[#4CAF50] text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
            全览 ALL <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
        
        {/* Scrollable Batch Cards */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-4">
          {/* Card 1 */}
          <div id="batch-a294" className="bg-[#161618] border border-[#2A2A2C] min-w-[280px] snap-start overflow-hidden flex flex-col shadow-xl rounded-xl">
            <div className="h-36 relative overflow-hidden group">
              <img 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLWY9_tn5Umj_4zl1wC7FtFsLyC9gXL8_iYvBYmEq15NBvwVGkaMJgz2DWYnrPyMN-yA284H9056qbVb1Vlva0gYH9Zfb4wvWiM0IFxwmDiHpG0bDxbZDyDhsnrKAszhYeScDqfiFy0qaDYmpe-iQgXc6s9wRhYRTdwXadsxM71J19YxkCmRsq9WiH_Rxi0Xf4IKyrpfO7PJVDBtzOfzRNz8uUgH2H7Cy6mnTsZyqJwksYyoTwuJLEKfIJ2v-sNRkEAyLuP1o-qFs" 
                alt="Basil"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#161618] to-transparent"></div>
              <span className="absolute top-3 right-3 bg-[#4CAF50] text-[#0A0A0B] text-[9px] px-2 py-1 rounded font-mono font-bold uppercase tracking-wider">萌发中 GERM</span>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-[#E0E0E0] tracking-tight">批次 #A294 - 罗勒</h4>
                <span className="font-mono text-xs text-[#4CAF50] font-bold tracking-tighter">82%</span>
              </div>
              <div className="w-full h-1 bg-[#0A0A0B] rounded-full overflow-hidden">
                <div className="bg-[#4CAF50] h-full rounded-full shadow-[0_0_10px_rgba(76,175,80,0.4)]" style={{ width: '82%' }}></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#666] font-bold uppercase tracking-widest pt-2">
                <span className="flex items-center gap-1.5 leading-none">
                  <span className="material-symbols-outlined text-[14px]">groups</span> 124 USERS
                </span>
                <span className="flex items-center gap-1.5 leading-none">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 4 DAYS LEFT
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div id="batch-c108" className="bg-[#161618] border border-[#2A2A2C] min-w-[280px] snap-start overflow-hidden flex flex-col shadow-xl rounded-xl">
            <div className="h-36 relative overflow-hidden group">
              <img 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdGFWSEfJspYH5f7SX5tt7Z0hkZwFWyUklNTieg9hDyAbQvcElUhzgDpQp0TQfwBrt1p8rAlJUjcWBEmsGcZse7IsKd41nd4rw5rGqyb069a09ml0elzY0TM8OfeIHhQgXkEo6x5A_uvuwODPx4etPOq_8asA_fN5tlezYeyj6hG0OqDp_jsIvPPdDMtAOuIJKJWfXmDCUSuwuDCO3r5iBecczD4a4WKUB1g8cG7XLM4VQ91u8XtnDKvXd_tuHYus7sszplE_N5ec" 
                alt="Tomato"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#161618] to-transparent"></div>
              <span className="absolute top-3 right-3 bg-[#03A9F4] text-[#0A0A0B] text-[9px] px-2 py-1 rounded font-mono font-bold uppercase tracking-wider">成熟期 MATURE</span>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-[#E0E0E0] tracking-tight">批次 #C108 - 番茄</h4>
                <span className="font-mono text-xs text-[#03A9F4] font-bold tracking-tighter">95%</span>
              </div>
              <div className="w-full h-1 bg-[#0A0A0B] rounded-full overflow-hidden">
                <div className="bg-[#03A9F4] h-full rounded-full shadow-[0_0_10px_rgba(3,169,244,0.4)]" style={{ width: '95%' }}></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#666] font-bold uppercase tracking-widest pt-2">
                <span className="flex items-center gap-1.5 leading-none">
                  <span className="material-symbols-outlined text-[14px]">groups</span> 89 USERS
                </span>
                <span className="flex items-center gap-1.5 leading-none text-[#4CAF50]">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sync Logs */}
      <section id="sync-logs" className="bg-[#161618] border border-[#2A2A2C] p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
          <span className="material-symbols-outlined text-8xl">terminal</span>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-[#4CAF50] text-xl">sync_alt</span>
          <h3 className="text-xs text-[#666] font-bold uppercase tracking-widest">同步解析日志 SYNC LOGS</h3>
        </div>
        <div className="space-y-5">
          <div className="flex items-center justify-between group">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-[#E0E0E0]">USR_502</span>
              <span className="text-[10px] text-[#666] font-medium uppercase tracking-tight">触发: 湿度越限告警 Critical</span>
            </div>
            <span className="bg-[#2D5A27]/20 text-[#4CAF50] px-2 py-0.5 rounded text-[9px] font-bold uppercase border border-[#2D5A27]/20">RESOLVED</span>
          </div>
          <div className="flex items-center justify-between group">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-[#E0E0E0]">USR_119</span>
              <span className="text-[10px] text-[#666] font-medium uppercase tracking-tight">任务: 生产数据包上报 Syncing</span>
            </div>
            <span className="bg-[#ba1a1a]/20 text-[#FF5252] px-2 py-0.5 rounded text-[9px] font-bold uppercase border border-[#ba1a1a]/20 animate-pulse">RETRYING</span>
          </div>
        </div>
      </section>

      {/* Environment Trends */}
      <section className="space-y-4 pb-4">
        <div id="env-monitoring" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-6 shadow-lg">
          <h3 className="text-xs text-[#666] font-bold uppercase tracking-widest mb-6">实时趋势 Trends</h3>
          <div className="flex justify-around items-center">
            <div className="text-center group">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-[#0A0A0B]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="text-[#4CAF50] transition-all duration-1000" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" strokeWidth="4"></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-mono text-lg font-light text-[#E0E0E0]">75%</span>
                </div>
              </div>
              <p className="text-[9px] text-[#666] font-bold uppercase tracking-widest mt-3 group-hover:text-[#4CAF50] transition-colors">气孔湿度 HUM</p>
            </div>
            <div className="text-center group">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-[#0A0A0B]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="text-[#03A9F4] transition-all duration-1000" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="100.5" strokeLinecap="round" strokeWidth="4"></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-mono text-lg font-light text-[#E0E0E0]">420</span>
                </div>
              </div>
              <p className="text-[9px] text-[#666] font-bold uppercase tracking-widest mt-3 group-hover:text-[#03A9F4] transition-colors">光能转化 PAR</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

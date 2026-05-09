export function MonitoringDashboard() {
  return (
    <div className="px-4 py-4 space-y-6">
      {/* Hero Section */}
      <section className="space-y-4">
        <div id="greeting-card" className="bg-[#161618] rounded-xl p-6 tonal-elevation border border-[#2A2A2C]">
          <h2 className="font-headline text-xl text-[#4CAF50] mb-2 font-light">早上好，陈先生！</h2>
          <p className="text-[#888] font-light">您的种苗今日充满活力，活力值达 <span className="text-[#E0E0E0] font-medium">98.4%</span>。水培系统运行平稳。</p>
        </div>
        <div id="weather-card" className="bg-[linear-gradient(135deg,#161618,#0F0F11)] text-[#E0E0E0] rounded-xl p-6 tonal-elevation flex items-center justify-between border border-[#2A2A2C]">
          <div>
            <span className="font-mono text-[10px] text-[#666] uppercase tracking-widest">温室环境</span>
            <div className="font-headline text-3xl font-light mt-1">24.8<span className="text-sm text-[#444] ml-1">°C</span></div>
            <div className="text-[10px] text-[#888] font-bold">62% HUMIDITY</div>
          </div>
          <div className="text-right">
            <span className="material-symbols-outlined text-4xl text-[#4CAF50]">partly_cloudy_day</span>
            <div className="text-[10px] text-[#666] font-bold mt-1 uppercase tracking-wider">晴朗 Clear</div>
          </div>
        </div>
      </section>

      {/* Hydroponics Section */}
      <section className="space-y-4">
        <h3 className="text-xs text-[#666] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4CAF50] text-lg">water_drop</span>
          水培系统控制 Hydroponics
        </h3>
        <div className="space-y-4">
          <div id="ec-card" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-6 tonal-elevation">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">EC值 (电导率)</span>
              <span className="bg-[#2D5A27]/20 text-[#4CAF50] px-2 py-0.5 rounded border border-[#2D5A27]/30 text-[9px] font-bold uppercase tracking-wider">最佳 OPTIMAL</span>
            </div>
            <div className="font-mono text-2xl text-[#E0E0E0] font-light mb-2">1.28 <span className="text-xs text-[#444] font-sans uppercase">mS/cm</span></div>
            <div className="w-full bg-[#0A0A0B] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#4CAF50] h-full rounded-full shadow-[0_0_8px_rgba(76,175,80,0.4)]" style={{ width: '64%' }}></div>
            </div>
            <div className="flex justify-between mt-2 font-mono text-[9px] text-[#444]">
              <span>0.8</span>
              <span className="text-[#666]">目标范围: 1.2 - 1.5</span>
              <span>2.0</span>
            </div>
          </div>

          <div id="ph-card" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-6 tonal-elevation">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">PH值</span>
              <span className="bg-[#2D5A27]/20 text-[#4CAF50] px-2 py-0.5 rounded border border-[#2D5A27]/30 text-[9px] font-bold uppercase tracking-wider">稳定 STABLE</span>
            </div>
            <div className="font-mono text-2xl text-[#E0E0E0] font-light mb-2">5.82 <span className="text-xs text-[#444] font-sans uppercase">pH</span></div>
            <div className="flex gap-1 h-1.5 items-center">
              <div className="flex-1 h-full rounded-full bg-[#ba1a1a]/20"></div>
              <div className="flex-1 h-full rounded-full bg-[#4CAF50]/30"></div>
              <div className="flex-2 h-full rounded-full bg-[#4CAF50] relative w-4 shadow-[0_0_8px_rgba(76,175,80,0.4)]">
                <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#E0E0E0] rounded-full border border-[#0A0A0B]"></div>
              </div>
              <div className="flex-1 h-full rounded-full bg-[#4CAF50]/30"></div>
              <div className="flex-1 h-full rounded-full bg-[#ba1a1a]/20"></div>
            </div>
            <div className="flex justify-between mt-2 font-mono text-[9px] text-[#444]">
              <span>4.0</span>
              <span className="text-[#666]">目标范围: 5.5 - 6.5</span>
              <span>8.0</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div id="water-temp-card" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-4 tonal-elevation">
              <span className="font-mono text-[10px] text-[#666] uppercase block mb-3 tracking-wider">水温 TEMP</span>
              <div className="font-mono text-xl text-[#E0E0E0] font-light mb-2">21.4<span className="text-xs text-[#444]">°C</span></div>
              <div className="flex items-end gap-1 h-8">
                <div className="flex-1 bg-[#4CAF50]/10 h-1/2 rounded-sm"></div>
                <div className="flex-1 bg-[#4CAF50]/30 h-2/3 rounded-sm"></div>
                <div className="flex-1 bg-[#4CAF50] h-full rounded-sm shadow-[0_0_8px_rgba(76,175,80,0.3)]"></div>
              </div>
            </div>
            <div id="water-level-card" className="bg-[#161618] border border-l-2 border-[#ba1a1a] border-y-[#2A2A2C] border-r-[#2A2A2C] rounded-xl p-4 tonal-elevation">
              <span className="font-mono text-[10px] text-[#ba1a1a] uppercase block mb-3 font-bold tracking-wider">水位警告 ALARM</span>
              <div className="flex items-center gap-3">
                <div className="w-5 h-9 bg-[#0A0A0B] border border-[#2A2A2C] rounded-sm relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full bg-[#ba1a1a] h-1/4 animate-pulse"></div>
                </div>
                <div className="font-mono text-xl text-[#FF5252] font-light leading-none">22%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soil Section */}
      <section className="space-y-4">
        <h3 className="text-xs text-[#666] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[#03A9F4] text-lg">eco</span>
          土培系统 Soil Monitoring
        </h3>
        <div id="soil-card" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-6 tonal-elevation">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">盐度 Salinity</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl text-[#03A9F4] font-light">0.75</span>
              <span className="text-[9px] text-[#444] font-mono uppercase tracking-tighter font-bold">dS/m</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#0A0A0B] rounded-lg border border-[#2A2A2C] flex flex-col gap-1">
              <div className="flex items-center gap-2 opacity-50">
                <span className="material-symbols-outlined text-sm text-[#03A9F4]">opacity</span>
                <span className="text-[9px] uppercase font-bold tracking-widest">湿度 Humidity</span>
              </div>
              <span className="font-mono text-xl text-[#03A9F4] font-light">42.1%</span>
            </div>
            <div className="p-4 bg-[#0A0A0B] rounded-lg border border-[#2A2A2C] flex flex-col gap-1">
              <div className="flex items-center gap-2 opacity-50">
                <span className="material-symbols-outlined text-sm text-[#4CAF50]">wb_sunny</span>
                <span className="text-[9px] uppercase font-bold tracking-widest">光照 Light</span>
              </div>
              <span className="font-mono text-xl text-[#4CAF50] font-light">850<span className="text-xs text-[#444]">LUX</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Devices */}
      <section className="space-y-4 pb-4">
        <h3 className="text-xs text-[#666] uppercase tracking-widest font-bold">连接设备 Devices</h3>
        <div className="grid grid-cols-2 gap-4">
          <div id="device-pump" className="p-4 bg-[#161618] rounded-xl border border-[#2A2A2C] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2D5A27]/20 text-[#4CAF50] flex items-center justify-center shrink-0 border border-[#2D5A27]/30">
              <span className="material-symbols-outlined text-lg">water_pump</span>
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] font-bold text-[#E0E0E0] truncate uppercase tracking-wider">水泵 Pump</div>
              <div className="text-[9px] text-[#4CAF50] flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse"></span>ACTIVE
              </div>
            </div>
          </div>
          <div id="device-ventilation" className="p-4 bg-[#161618] rounded-xl border border-[#2A2A2C] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ba1a1a]/20 text-[#FF5252] flex items-center justify-center shrink-0 border border-[#ba1a1a]/30">
              <span className="material-symbols-outlined text-lg">air_purifier_gen</span>
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] font-bold text-[#E0E0E0] truncate uppercase tracking-wider">通风 Vent</div>
              <div className="text-[9px] text-[#FF5252] flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5252]"></span>CHECK
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { sensorApi, symbiosisApi, SensorData, SymbiosisStatus } from '../services/api';
import { usePolling } from '../hooks/usePolling';

export function MonitoringDashboard() {
  const { data: sensors } = usePolling(() => sensorApi.getAll(), 2000);
  const { data: symbiosis } = usePolling(() => symbiosisApi.getStatus(), 2000);

  const getSensor = (type: string): SensorData | undefined => {
    return sensors?.find(s => s.type === type);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alarm': return 'text-[#FF5252]';
      case 'warning': return 'text-[#FFC107]';
      default: return 'text-[#4CAF50]';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'alarm': return 'bg-[#ba1a1a]/20 text-[#FF5252] border-[#ba1a1a]/30';
      case 'warning': return 'bg-[#FFC107]/20 text-[#FFC107] border-[#FFC107]/30';
      default: return 'bg-[#2D5A27]/20 text-[#4CAF50] border-[#2D5A27]/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'alarm': return '告警 ALARM';
      case 'warning': return '警告 WARNING';
      default: return '正常 NORMAL';
    }
  };

  const ec = getSensor('ec');
  const ph = getSensor('ph');
  const waterTemp = getSensor('water_temp');
  const waterLevel = getSensor('water_level');
  const salinity = getSensor('salinity');
  const humidity = getSensor('humidity');
  const light = getSensor('light');

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Hero Section */}
      <section className="space-y-4">
        <div id="greeting-card" className="bg-[#161618] rounded-xl p-6 tonal-elevation border border-[#2A2A2C]">
          <h2 className="font-headline text-xl text-[#4CAF50] mb-2 font-light">早上好，陈先生！</h2>
          <p className="text-[#888] font-light">
            您的种苗今日充满活力，活力值达 <span className="text-[#E0E0E0] font-medium">98.4%</span>。
            水培系统运行平稳。
          </p>
        </div>
        <div id="weather-card" className="bg-[linear-gradient(135deg,#161618,#0F0F11)] text-[#E0E0E0] rounded-xl p-6 tonal-elevation flex items-center justify-between border border-[#2A2A2C]">
          <div>
            <span className="font-mono text-[10px] text-[#666] uppercase tracking-widest">温室环境</span>
            <div className="font-headline text-3xl font-light mt-1">
              {waterTemp?.value.toFixed(1) || '24.8'}<span className="text-sm text-[#444] ml-1">°C</span>
            </div>
            <div className="text-[10px] text-[#888] font-bold">
              {humidity?.value.toFixed(0) || '62'}% HUMIDITY
            </div>
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
          {/* EC Card */}
          <div id="ec-card" className={`bg-[#161618] border ${ec?.status === 'alarm' ? 'border-l-2 border-l-[#FF5252]' : 'border-[#2A2A2C]'} rounded-xl p-6 tonal-elevation`}>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">EC值 (电导率)</span>
              <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${getStatusBg(ec?.status || 'normal')}`}>
                {getStatusLabel(ec?.status || 'normal')}
              </span>
            </div>
            <div className={`font-mono text-2xl font-light mb-2 ${ec?.status === 'alarm' ? 'text-[#FF5252]' : 'text-[#E0E0E0]'}`}>
              {ec?.value.toFixed(2) || '1.28'} <span className="text-xs text-[#444] font-sans uppercase">mS/cm</span>
            </div>
            <div className="w-full bg-[#0A0A0B] h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${ec?.status === 'alarm' ? 'bg-[#FF5252]' : 'bg-[#4CAF50]'} shadow-[0_0_8px_rgba(76,175,80,0.4)]`}
                style={{ width: `${((ec?.value || 1.28) - 0.8) / 1.2 * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 font-mono text-[9px] text-[#444]">
              <span>0.8</span>
              <span className="text-[#666]">目标范围: 1.2 - 1.5</span>
              <span>2.0</span>
            </div>
          </div>

          {/* PH Card */}
          <div id="ph-card" className={`bg-[#161618] border ${ph?.status === 'alarm' ? 'border-l-2 border-l-[#FF5252]' : 'border-[#2A2A2C]'} rounded-xl p-6 tonal-elevation`}>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">PH值</span>
              <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${getStatusBg(ph?.status || 'normal')}`}>
                {getStatusLabel(ph?.status || 'normal')}
              </span>
            </div>
            <div className={`font-mono text-2xl font-light mb-2 ${ph?.status === 'alarm' ? 'text-[#FF5252]' : 'text-[#E0E0E0]'}`}>
              {ph?.value.toFixed(2) || '5.82'} <span className="text-xs text-[#444] font-sans uppercase">pH</span>
            </div>
            <div className="flex gap-1 h-1.5 items-center">
              <div className="flex-1 h-full rounded-full bg-[#ba1a1a]/20"></div>
              <div className="flex-1 h-full rounded-full bg-[#4CAF50]/30"></div>
              <div className="flex-2 h-full rounded-full bg-[#4CAF50] relative w-4 shadow-[0_0_8px_rgba(76,175,80,0.4)]">
                <div
                  className="absolute top-[-3px] w-3 h-3 bg-[#E0E0E0] rounded-full border border-[#0A0A0B]"
                  style={{ left: `${((ph?.value || 5.82) - 4) / 4 * 100}%`, transform: 'translateX(-50%)' }}
                ></div>
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
            {/* Water Temp Card */}
            <div id="water-temp-card" className={`bg-[#161618] border ${waterTemp?.status === 'alarm' ? 'border-l-2 border-l-[#FF5252]' : 'border-[#2A2A2C]'} rounded-xl p-4 tonal-elevation`}>
              <span className="font-mono text-[10px] text-[#666] uppercase block mb-3 tracking-wider">水温 TEMP</span>
              <div className={`font-mono text-xl font-light mb-2 ${waterTemp?.status === 'alarm' ? 'text-[#FF5252]' : 'text-[#E0E0E0]'}`}>
                {waterTemp?.value.toFixed(1) || '21.4'}<span className="text-xs text-[#444]">°C</span>
              </div>
              <div className="flex items-end gap-1 h-8">
                <div className={`flex-1 ${waterTemp?.status === 'alarm' ? 'bg-[#FF5252]/10' : 'bg-[#4CAF50]/10'} h-1/2 rounded-sm`}></div>
                <div className={`flex-1 ${waterTemp?.status === 'alarm' ? 'bg-[#FF5252]/30' : 'bg-[#4CAF50]/30'} h-2/3 rounded-sm`}></div>
                <div className={`flex-1 ${waterTemp?.status === 'alarm' ? 'bg-[#FF5252]' : 'bg-[#4CAF50]'} h-full rounded-sm shadow-[0_0_8px_rgba(76,175,80,0.3)]`}></div>
              </div>
            </div>

            {/* Water Level Card */}
            <div id="water-level-card" className={`bg-[#161618] border ${waterLevel?.status === 'alarm' ? 'border-l-2 border-l-[#FF5252]' : 'border-[#2A2A2C]'} rounded-xl p-4 tonal-elevation`}>
              <span className={`font-mono text-[10px] uppercase block mb-3 font-bold tracking-wider ${waterLevel?.status === 'alarm' ? 'text-[#FF5252]' : 'text-[#666]'}`}>
                {waterLevel?.status === 'alarm' ? '水位警告 ALARM' : '水位 LEVEL'}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-5 h-9 bg-[#0A0A0B] border border-[#2A2A2C] rounded-sm relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 w-full ${waterLevel?.status === 'alarm' ? 'bg-[#FF5252]' : 'bg-[#4CAF50]'} ${waterLevel?.status === 'alarm' ? 'animate-pulse' : ''}`}
                    style={{ height: `${waterLevel?.value || 22}%` }}
                  ></div>
                </div>
                <div className={`font-mono text-xl font-light leading-none ${waterLevel?.status === 'alarm' ? 'text-[#FF5252]' : 'text-[#4CAF50]'}`}>
                  {waterLevel?.value.toFixed(0) || '22'}%
                </div>
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
              <span className={`font-mono text-2xl font-light ${salinity?.status === 'alarm' ? 'text-[#FF5252]' : '[#03A9F4]'}`}>
                {salinity?.value.toFixed(2) || '0.75'}
              </span>
              <span className="text-[9px] text-[#444] font-mono uppercase tracking-tighter font-bold">dS/m</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#0A0A0B] rounded-lg border border-[#2A2A2C] flex flex-col gap-1">
              <div className="flex items-center gap-2 opacity-50">
                <span className="material-symbols-outlined text-sm text-[#03A9F4]">opacity</span>
                <span className="text-[9px] uppercase font-bold tracking-widest">湿度 Humidity</span>
              </div>
              <span className={`font-mono text-xl font-light ${humidity?.status === 'alarm' ? 'text-[#FF5252]' : 'text-[#03A9F4]'}`}>
                {humidity?.value.toFixed(1) || '42.1'}%
              </span>
            </div>
            <div className="p-4 bg-[#0A0A0B] rounded-lg border border-[#2A2A2C] flex flex-col gap-1">
              <div className="flex items-center gap-2 opacity-50">
                <span className="material-symbols-outlined text-sm text-[#4CAF50]">wb_sunny</span>
                <span className="text-[9px] uppercase font-bold tracking-widest">光照 Light</span>
              </div>
              <span className={`font-mono text-xl font-light ${light?.status === 'alarm' ? 'text-[#FF5252]' : 'text-[#4CAF50]'}`}>
                {light?.value.toFixed(0) || '850'}<span className="text-xs text-[#444]">LUX</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Fish-Plant Symbiosis System */}
      <section className="space-y-4">
        <h3 className="text-xs text-[#666] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00BCD4] text-lg">sync_alt</span>
          鱼植共生系统 Symbiosis
        </h3>
        <div id="symbiosis-system" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-5 tonal-elevation space-y-5">
          {/* Pool Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Collection Pool */}
            <div className={`bg-[#0A0A0B] border ${symbiosis?.collectionPool.lowLevelAlarm || symbiosis?.collectionPool.highLevelAlarm ? 'border-[#FF5252]' : 'border-[#2A2A2C]'} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] text-[#666] uppercase tracking-widest font-bold">集水池</span>
                <span className="text-[9px] text-[#444]">COLLECTION</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-12 bg-[#161618] border border-[#2A2A2C] rounded relative overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-[#00BCD4] transition-all duration-500"
                    style={{ height: `${symbiosis?.collectionPool.waterLevel || 60}%` }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-[15%] bg-[#FF5252]/30 border-b border-[#FF5252]"></div>
                  <div className="absolute bottom-0 left-0 w-full h-[15%] bg-[#FF5252]/30 border-t border-[#FF5252]"></div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#666]">液位</span>
                    <span className={`font-mono text-sm ${symbiosis?.collectionPool.lowLevelAlarm ? 'text-[#FF5252]' : 'text-[#00BCD4]'}`}>
                      {symbiosis?.collectionPool.waterLevel.toFixed(0) || '60'}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${symbiosis?.collectionPool.lowLevelAlarm ? 'bg-[#FF5252] animate-pulse' : 'bg-[#4CAF50]'}`}></span>
                    <span className={`text-[8px] uppercase font-bold ${symbiosis?.collectionPool.lowLevelAlarm ? 'text-[#FF5252]' : 'text-[#4CAF50]'}`}>
                      {symbiosis?.collectionPool.lowLevelAlarm ? '低水位' : symbiosis?.collectionPool.highLevelAlarm ? '高水位' : '正常'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fish Pool */}
            <div className={`bg-[#0A0A0B] border ${symbiosis?.fishPool.lowLevelAlarm || symbiosis?.fishPool.highLevelAlarm ? 'border-[#FF5252]' : 'border-[#2A2A2C]'} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] text-[#666] uppercase tracking-widest font-bold">鱼泵池</span>
                <span className="text-[9px] text-[#444]">FISH</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-12 bg-[#161618] border border-[#2A2A2C] rounded relative overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-[#2196F3] transition-all duration-500"
                    style={{ height: `${symbiosis?.fishPool.waterLevel || 75}%` }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-[15%] bg-[#FF5252]/30 border-b border-[#FF5252]"></div>
                  <div className="absolute bottom-0 left-0 w-full h-[15%] bg-[#FF5252]/30 border-t border-[#FF5252]"></div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#666]">液位</span>
                    <span className={`font-mono text-sm ${symbiosis?.fishPool.lowLevelAlarm ? 'text-[#FF5252]' : 'text-[#2196F3]'}`}>
                      {symbiosis?.fishPool.waterLevel.toFixed(0) || '75'}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${symbiosis?.fishPool.lowLevelAlarm ? 'bg-[#FF5252] animate-pulse' : 'bg-[#4CAF50]'}`}></span>
                    <span className={`text-[8px] uppercase font-bold ${symbiosis?.fishPool.lowLevelAlarm ? 'text-[#FF5252]' : 'text-[#4CAF50]'}`}>
                      {symbiosis?.fishPool.lowLevelAlarm ? '低水位' : symbiosis?.fishPool.highLevelAlarm ? '高水位' : '正常'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pump Status */}
          <div className="border-t border-[#2A2A2C] pt-4">
            <div className="text-[9px] text-[#666] uppercase tracking-widest font-bold mb-3">泵状态 PUMPS</div>
            <div className="grid grid-cols-3 gap-2">
              <div className={`bg-[#0A0A0B] border ${symbiosis?.pumps.internalRefill.running ? 'border-[#2D5A27]/30' : 'border-[#2A2A2C]'} rounded-lg p-3 text-center`}>
                <div className={`w-8 h-8 mx-auto rounded-lg ${symbiosis?.pumps.internalRefill.running ? 'bg-[#2D5A27]/20' : 'bg-[#1A1A1C]'} flex items-center justify-center mb-2`}>
                  <span className={`material-symbols-outlined ${symbiosis?.pumps.internalRefill.running ? 'text-[#4CAF50]' : 'text-[#666]'} text-lg`}>water_drop</span>
                </div>
                <div className="text-[8px] text-[#666] uppercase mb-1">内补水泵</div>
                <div className="flex items-center justify-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${symbiosis?.pumps.internalRefill.running ? 'bg-[#4CAF50] animate-pulse' : 'bg-[#666]'}`}></span>
                  <span className={`text-[8px] font-bold ${symbiosis?.pumps.internalRefill.running ? 'text-[#4CAF50]' : 'text-[#666]'}`}>
                    {symbiosis?.pumps.internalRefill.running ? '运行' : '待机'}
                  </span>
                </div>
              </div>
              <div className={`bg-[#0A0A0B] border ${symbiosis?.pumps.externalRefill.running ? 'border-[#2D5A27]/30' : 'border-[#2A2A2C]'} rounded-lg p-3 text-center`}>
                <div className={`w-8 h-8 mx-auto rounded-lg ${symbiosis?.pumps.externalRefill.running ? 'bg-[#2D5A27]/20' : 'bg-[#1A1A1C]'} flex items-center justify-center mb-2`}>
                  <span className={`material-symbols-outlined ${symbiosis?.pumps.externalRefill.running ? 'text-[#4CAF50]' : 'text-[#666]'} text-lg`}>water_pump</span>
                </div>
                <div className="text-[8px] text-[#666] uppercase mb-1">外补水泵</div>
                <div className="flex items-center justify-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${symbiosis?.pumps.externalRefill.running ? 'bg-[#4CAF50] animate-pulse' : 'bg-[#666]'}`}></span>
                  <span className={`text-[8px] font-bold ${symbiosis?.pumps.externalRefill.running ? 'text-[#4CAF50]' : 'text-[#666]'}`}>
                    {symbiosis?.pumps.externalRefill.running ? '运行' : '待机'}
                  </span>
                </div>
              </div>
              <div className={`bg-[#0A0A0B] border ${symbiosis?.pumps.fertilizer.running ? 'border-[#2D5A27]/30' : 'border-[#2A2A2C]'} rounded-lg p-3 text-center`}>
                <div className={`w-8 h-8 mx-auto rounded-lg ${symbiosis?.pumps.fertilizer.running ? 'bg-[#2D5A27]/20' : 'bg-[#1A1A1C]'} flex items-center justify-center mb-2`}>
                  <span className={`material-symbols-outlined ${symbiosis?.pumps.fertilizer.running ? 'text-[#4CAF50]' : 'text-[#666]'} text-lg`}>science</span>
                </div>
                <div className="text-[8px] text-[#666] uppercase mb-1">肥泵</div>
                <div className="flex items-center justify-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${symbiosis?.pumps.fertilizer.running ? 'bg-[#4CAF50] animate-pulse' : 'bg-[#666]'}`}></span>
                  <span className={`text-[8px] font-bold ${symbiosis?.pumps.fertilizer.running ? 'text-[#4CAF50]' : 'text-[#666]'}`}>
                    {symbiosis?.pumps.fertilizer.running ? '运行' : '待机'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Logic Status */}
          <div className={`bg-[#0A0A0B] border ${symbiosis?.logicStatus === 'alarm' ? 'border-[#FF5252]' : 'border-[#2A2A2C]'} rounded-lg p-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined ${symbiosis?.logicStatus === 'alarm' ? 'text-[#FF5252]' : 'text-[#4CAF50]'} text-sm`}>
                  {symbiosis?.logicStatus === 'alarm' ? 'warning' : 'check_circle'}
                </span>
                <span className="text-[10px] text-[#E0E0E0] font-medium">联动逻辑状态</span>
              </div>
              <span className={`text-[9px] uppercase font-bold tracking-wider ${symbiosis?.logicStatus === 'alarm' ? 'text-[#FF5252]' : 'text-[#4CAF50]'}`}>
                {symbiosis?.logicStatus === 'alarm' ? '告警' : symbiosis?.logicStatus === 'warning' ? '警告' : '正常运行'}
              </span>
            </div>
            {symbiosis?.alarms && symbiosis.alarms.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[#2A2A2C]">
                {symbiosis.alarms.slice(0, 2).map((alarm, idx) => (
                  <div key={idx} className="text-[9px] text-[#FF5252] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">error</span>
                    {alarm.message}
                  </div>
                ))}
              </div>
            )}
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

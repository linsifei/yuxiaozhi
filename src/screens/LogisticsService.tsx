import { serviceApi, ServiceOrder } from '../services/api';
import { usePolling } from '../hooks/usePolling';

export function LogisticsService() {
  const { data: logisticsOrders } = usePolling(() => serviceApi.getLogisticsOrders(), 10000);
  const { data: installationServices } = usePolling(() => serviceApi.getInstallationServices(), 10000);
  const { data: housekeepingServices } = usePolling(() => serviceApi.getHousekeepingServices(), 10000);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit':
      case 'confirmed':
        return 'bg-[#1A1A1C] border border-[#2D5A27]/30 text-[#4CAF50]';
      case 'out_for_delivery':
        return 'bg-[#2D5A27]/20 text-[#4CAF50]';
      case 'delivered':
      case 'completed':
        return 'bg-[#2D5A27]/20 text-[#4CAF50]';
      case 'pending':
      case 'matching':
        return 'bg-[#1A1A1C] border border-[#2A2A2C] text-[#666]';
      default:
        return 'bg-[#1A1A1C] border border-[#2A2A2C] text-[#666]';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_transit': return '在途 In Transit';
      case 'out_for_delivery': return '派送中 Delivering';
      case 'delivered': return '已签收 Delivered';
      case 'pending': return '待确认 Pending';
      case 'confirmed': return '已确认 Confirmed';
      case 'matching': return '匹配中 Matching';
      case 'completed': return '已完成 Completed';
      default: return status;
    }
  };

  const logisticsOrder = logisticsOrders?.[0];
  const installation = installationServices?.[0];
  const housekeeping = housekeepingServices?.[0];

  return (
    <div className="px-4 py-4 space-y-8">
      {/* Hero Section: Logistics Tracking */}
      <section className="space-y-4">
        <div>
          <span className="font-mono text-[10px] text-[#4CAF50] uppercase tracking-[0.2em] mb-1 block">物流中心 LOGISTICS</span>
          <h2 className="font-headline text-3xl text-[#E0E0E0] font-light">配送追踪</h2>
        </div>

        <div className="space-y-6">
          {/* Tracking Card */}
          <div id="logistics-card" className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-6 tonal-elevation">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2D5A27] flex items-center justify-center text-white border border-[#3A3A3C]">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#666] tracking-wider uppercase">订单号 #{logisticsOrder?.orderId || 'YX-88291'}</p>
                  <p className="font-headline text-xl text-[#E0E0E0] font-medium transition-colors hover:text-[#4CAF50]">
                    {logisticsOrder?.details?.productName || '优质龟背竹'}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${getStatusColor(logisticsOrder?.status || 'in_transit')}`}>
                {getStatusLabel(logisticsOrder?.status || 'in_transit')}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-2">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-[#4CAF50] to-[#2A2A2C]"></div>

              <div className="flex gap-4 mb-8 relative">
                <div className="z-10 w-10 h-10 rounded-full bg-[#2D5A27] border-4 border-[#161618] flex items-center justify-center shadow-[0_0_10px_rgba(76,175,80,0.2)]">
                  <span className="material-symbols-outlined text-sm text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs text-[#4CAF50] mb-1">09:42 - 今天</p>
                  <p className="font-medium text-[#E0E0E0]">到达静安分拨中心</p>
                  <p className="text-xs text-[#666] mt-1 font-light">枢纽已入库。待分配派件员。</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="z-10 w-10 h-10 rounded-full bg-[#1A1A1C] border-4 border-[#161618] flex items-center justify-center border-outline-variant">
                  <span className="material-symbols-outlined text-sm text-[#444]">package_2</span>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs text-[#444] mb-1">16:15 - 昨天</p>
                  <p className="text-[#888] font-light">已离开杭州分拣中心</p>
                  <p className="text-xs text-[#444] mt-1">园区装载完毕，发往上海。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map View */}
          <div id="logistics-map" className="bg-[#0A0A0B] border border-[#2A2A2C] rounded-xl overflow-hidden shadow-inner aspect-[16/10] relative">
            <img
              className="w-full h-full object-cover opacity-40 grayscale contrast-125"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-qTLJKA4SFUlN1lljCYdlu3mfN0VmZ27rLZxq3cVAxktT1n-za-3Mc7j1LToHBxdbmWSvpZlg7KRhIYYEM1xGeSpLmeJJj82EdCkxR6v7ut9ulf3qnUkTdhwmfegGveX9cEjaBCG_YX-25QnoqTYl1YU4Fh7obMOSjsmDtDb83WUrxZ4ZKgr6oAiO5vz2_lNaQ9nv-Ne4SHz_BOPHZ4JcEg7iYojYV8sD2jxn0k0TFD4Yw___tegrCwpXljEzx0k4Wkx2Axelwz8"
              alt="Dark Mode Map"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-[#161618]/80 backdrop-blur-md p-3 rounded border border-[#2A2A2C] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4CAF50] text-sm">location_on</span>
              <span className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                当前位置: <span className="text-[#E0E0E0]">昆山枢纽园区</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Service & Appointments Section */}
      <section className="space-y-4 pb-4">
        <div>
          <span className="font-mono text-[10px] text-[#4CAF50] uppercase tracking-[0.2em] mb-1 block">智慧服务 SERVICES</span>
          <h2 className="font-headline text-3xl text-[#E0E0E0] font-light">养护预约</h2>
        </div>

        <div className="space-y-4">
          {/* Installation Service Card */}
          <div className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-6 shadow-sm group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 ${installation?.status === 'confirmed' ? 'bg-[#2D5A27]/20 border border-[#2D5A27]/30 text-[#4CAF50]' : 'bg-[#1A1A1C] border border-[#2A2A2C] text-[#666]'} rounded-full flex items-center justify-center group-hover:bg-[#2D5A27]/40 transition-colors`}>
                <span className="material-symbols-outlined">construction</span>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] text-[#666] uppercase tracking-tighter">PARTNER</p>
                <p className="font-bold text-xs uppercase tracking-wider text-[#888]">{installation?.partner || '啄木鸟与森林'}</p>
              </div>
            </div>
            <h3 className="font-headline text-xl mb-1 font-light">IoT 传感器布设</h3>
            <p className="text-xs text-[#666] mb-6 font-light leading-relaxed">自动化灌溉节点安装与水分探针标定服务。</p>
            <div className="mt-auto pt-4 border-t border-[#2A2A2C] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4CAF50] text-xs">event</span>
                  <span className="font-mono text-xs text-[#E0E0E0]">
                    {installation?.scheduledDate ? new Date(installation.scheduledDate).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }) : '10.25'}
                    <span className="text-[#444] ml-1">
                      {installation?.scheduledDate ? new Date(installation.scheduledDate).toLocaleDateString('zh-CN', { weekday: 'short' }).toUpperCase() : 'FRI'}
                    </span>
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${getStatusColor(installation?.status || 'confirmed')}`}>
                  {getStatusLabel(installation?.status || 'confirmed')}
                </span>
              </div>
              <button className="w-full py-2.5 bg-[#0A0A0B] border border-[#2A2A2C] text-[#E0E0E0] text-xs font-bold uppercase tracking-widest rounded hover:bg-[#1A1A1C] transition-colors">
                管理预约计划
              </button>
            </div>
          </div>

          {/* Housekeeping Service Card */}
          <div className="bg-[#161618] border border-[#2A2A2C] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 ${housekeeping?.status === 'confirmed' ? 'bg-[#2D5A27]/20 border border-[#2D5A27]/30 text-[#4CAF50]' : 'bg-[#1A1A1C] border border-[#2A2A2C] text-[#666]'} rounded-full flex items-center justify-center`}>
                <span className="material-symbols-outlined">cleaning_services</span>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] text-[#666] uppercase tracking-tighter">PARTNER</p>
                <p className="font-bold text-xs uppercase tracking-wider text-[#888]">{housekeeping?.partner || '美团智家服务'}</p>
              </div>
            </div>
            <h3 className="font-headline text-xl mb-1 font-light">系统深度消杀</h3>
            <p className="text-xs text-[#666] mb-6 font-light leading-relaxed">针对水培循环装置进行季度生物膜清理与杀菌。</p>
            <div className="mt-auto pt-4 border-t border-[#2A2A2C] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#666] text-xs">
                    {housekeeping?.status === 'confirmed' ? 'check_circle' : 'schedule'}
                  </span>
                  <span className="font-mono text-xs text-[#666]">
                    {housekeeping?.status === 'confirmed' ? '已确认' : '正在匹配专员...'}
                  </span>
                </div>
              </div>
              <button
                className={`w-full py-2.5 bg-[#0A0A0B] border border-[#2A2A2C] text-[#E0E0E0] text-xs font-bold uppercase tracking-widest rounded transition-colors ${housekeeping?.status === 'matching' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1A1A1C]'}`}
                disabled={housekeeping?.status === 'matching'}
              >
                {housekeeping?.status === 'matching' ? '等待派单' : '查看详情'}
              </button>
            </div>
          </div>

          {/* Expert CTA */}
          <div className="bg-[#2D5A27] text-white rounded-xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[120px]">support_agent</span>
            </div>
            <h3 className="font-headline text-xl mb-2 relative z-10 font-bold tracking-tight">资深农学专家建议</h3>
            <p className="text-xs mb-6 relative z-10 opacity-70 leading-relaxed font-light">预约 1对1 视频诊断，获取定制化的种苗生产工艺流程优化方案。</p>
            <div className="mt-auto relative z-10 flex flex-col gap-5">
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full border-2 border-[#2D5A27] shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLs3TwpPu1mb7bbaW8dO2Y53rHOBFcw5LEPFP7g9_oD3-8bKPuhPqsV1P2HCEKLPuuC-L3_yyDXp4SHE1KBS9E1mxAATdgTwKwZNeQrEBwx7fmjWI8iB56uXK9i_tPlJNiVHNUiZXlzt-TmzF4YNrv4gqY29pHlxy5gHGsNdab4dAx7wILpnVBuEWLbJjoHkmOL8XTJ0Rrs9GQ9TekedlBSTtdM0ZbSq-C17pZB1P-YdHNhMYnoO93Lizh3xZbGqwqHhZwnpnntyE" alt="Expert 1" />
                <img className="w-9 h-9 rounded-full border-2 border-[#2D5A27] shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUeCazDnZ5uqKOsYYkElIFUjVXkfh6POQuKp9kjsDp12bScmpbHSjcTISjgS4oCwNPcMM4pRfI78IQxI1G0g181x3RZNAX_HDHvD34mOVwR5AmCRmRJfX22pUN4mBazbQDSyP_R6P8lM-ooZNnEy_FzHY8c4J0vML7520ToAzLON4rlM7LqkFPEsOPtEsMQpVInXNo5znREPo7VVPVKcLRBs8WnefH3gFj61LsuIIglxFHPoifkH6SF5-K2Bkv6Xzo4e5SiNaEBC8" alt="Expert 2" />
              </div>
              <button className="w-full py-3 bg-white text-[#2D5A27] font-bold text-xs uppercase tracking-[0.2em] rounded active:scale-95 transition-transform shadow-lg">
                立即连线专家
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

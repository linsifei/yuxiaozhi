// 第三方平台API接口定义
// 待API开放后对接

// ==================== 物流平台接口 ====================
export interface LogisticsOrder {
  orderId: string;
  trackingNo: string;
  productName: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered';
  carrier: string;
  estimatedDelivery: string;
  timeline: LogisticsTimeline[];
}

export interface LogisticsTimeline {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

// 物流API端点（待对接）
export const LOGISTICS_API = {
  GET_TRACKING: '/api/logistics/tracking/:orderId',
  GET_ORDERS: '/api/logistics/orders',
};

// ==================== 安装平台接口 ====================
// 啄木鸟等第三方安装服务

export interface InstallationService {
  serviceId: string;
  type: 'iot_sensor' | 'irrigation_system' | 'monitoring_device';
  partner: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  technician?: {
    name: string;
    phone: string;
    rating: number;
  };
  address: string;
  notes?: string;
}

export interface InstallationRequest {
  serviceType: string;
  preferredDates: string[];
  address: string;
  contactPhone: string;
  notes?: string;
}

// 安装服务API端点（待对接）
export const INSTALLATION_API = {
  GET_SERVICES: '/api/installation/services',
  CREATE_REQUEST: '/api/installation/request',
  GET_STATUS: '/api/installation/status/:serviceId',
  CANCEL: '/api/installation/cancel/:serviceId',
};

// ==================== 家政平台接口 ====================
// 美团、58同城等家政服务

export interface HousekeepingService {
  serviceId: string;
  type: 'cleaning' | 'seedling_replacement' | 'system_sanitization';
  partner: 'meituan' | '58' | 'other';
  frequency: 'once' | 'weekly' | 'monthly' | 'quarterly';
  nextScheduledDate: string;
  status: 'pending' | 'matching' | 'confirmed' | 'in_progress' | 'completed';
  provider?: {
    name: string;
    phone: string;
    rating: number;
  };
}

export interface HousekeepingRequest {
  serviceType: string;
  frequency: 'once' | 'weekly' | 'monthly' | 'quarterly';
  preferredTime: string;
  address: string;
  contactPhone: string;
  specialRequirements?: string;
}

// 家政服务API端点（待对接）
export const HOUSEKEEPING_API = {
  GET_SERVICES: '/api/housekeeping/services',
  CREATE_REQUEST: '/api/housekeeping/request',
  GET_SCHEDULE: '/api/housekeeping/schedule',
  CANCEL: '/api/housekeeping/cancel/:serviceId',
};

// ==================== 种苗基地同步接口 ====================
export interface SeedlingBatch {
  batchId: string;
  name: string;
  type: string;
  plantedDate: string;
  expectedHarvestDate: string;
  status: 'germinating' | 'growing' | 'mature' | 'harvested';
  progress: number;
  usersCount: number;
  synced: boolean;
  lastSyncTime: string;
}

export interface SyncLog {
  id: string;
  timestamp: string;
  userId: string;
  type: 'alert' | 'task' | 'data_sync';
  message: string;
  status: 'success' | 'pending' | 'retrying' | 'failed';
}

// 种苗基地API端点
export const SEEDLING_API = {
  GET_BATCHES: '/api/seedling/batches',
  GET_BATCH: '/api/seedling/batches/:batchId',
  SYNC_DATA: '/api/seedling/sync',
  GET_SYNC_LOGS: '/api/seedling/sync/logs',
};

// ==================== 鱼植共生系统接口 ====================
export interface PoolStatus {
  poolId: string;
  type: 'collection' | 'fish';
  waterLevel: number;
  highLevelAlarm: boolean;
  lowLevelAlarm: boolean;
  lastUpdated: string;
}

export interface PumpStatus {
  pumpId: string;
  type: 'internal_refill' | 'external_refill' | 'fertilizer';
  running: boolean;
  lastStarted?: string;
  lastStopped?: string;
}

export interface SymbiosisSystem {
  collectionPool: PoolStatus;
  fishPool: PoolStatus;
  pumps: {
    internalRefill: PumpStatus;
    externalRefill: PumpStatus;
    fertilizer: PumpStatus;
  };
  logicStatus: 'normal' | 'warning' | 'alarm';
  alarms: Alarm[];
}

export interface Alarm {
  id: string;
  type: 'low_level' | 'high_level' | 'duration_exceeded';
  pool: 'collection' | 'fish';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

// 鱼植共生系统API端点
export const SYMBIOSIS_API = {
  GET_STATUS: '/api/symbiosis/status',
  CONTROL_PUMP: '/api/symbiosis/pump/:pumpId',
  ACK_ALARM: '/api/symbiosis/alarm/:alarmId/acknowledge',
  GET_ALARMS: '/api/symbiosis/alarms',
};

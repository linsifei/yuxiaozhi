// In-memory data store (replace with real database in production)

export interface SensorData {
  id: string;
  type: 'ec' | 'ph' | 'water_temp' | 'water_level' | 'salinity' | 'humidity' | 'light';
  value: number;
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'alarm';
}

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

export interface Alarm {
  id: string;
  type: 'low_level' | 'high_level' | 'duration_exceeded';
  pool: 'collection' | 'fish';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

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

export interface Task {
  taskId: string;
  name: string;
  device: string;
  location: string;
  lastRun: string;
  interval: string;
  duration: string;
  status: 'running' | 'paused' | 'normal';
  nextRun: string;
}

export interface SyncLog {
  id: string;
  timestamp: string;
  userId: string;
  type: 'alert' | 'task' | 'data_sync';
  message: string;
  status: 'success' | 'pending' | 'retrying' | 'failed';
}

export interface ServiceOrder {
  orderId: string;
  type: 'logistics' | 'installation' | 'housekeeping';
  partner: string;
  status: string;
  scheduledDate?: string;
  details: any;
}

// Initial data
export const store = {
  sensors: [
    { id: 'ec-01', type: 'ec', value: 1.28, unit: 'mS/cm', timestamp: new Date().toISOString(), status: 'normal' },
    { id: 'ph-01', type: 'ph', value: 5.82, unit: 'pH', timestamp: new Date().toISOString(), status: 'normal' },
    { id: 'temp-01', type: 'water_temp', value: 21.4, unit: '°C', timestamp: new Date().toISOString(), status: 'normal' },
    { id: 'level-01', type: 'water_level', value: 22, unit: '%', timestamp: new Date().toISOString(), status: 'alarm' },
    { id: 'sal-01', type: 'salinity', value: 0.75, unit: 'dS/m', timestamp: new Date().toISOString(), status: 'normal' },
    { id: 'hum-01', type: 'humidity', value: 42.1, unit: '%', timestamp: new Date().toISOString(), status: 'normal' },
    { id: 'light-01', type: 'light', value: 850, unit: 'LUX', timestamp: new Date().toISOString(), status: 'normal' },
  ] as SensorData[],

  pools: {
    collection: {
      poolId: 'collection-01',
      type: 'collection',
      waterLevel: 60,
      highLevelAlarm: false,
      lowLevelAlarm: false,
      lastUpdated: new Date().toISOString()
    } as PoolStatus,
    fish: {
      poolId: 'fish-01',
      type: 'fish',
      waterLevel: 75,
      highLevelAlarm: false,
      lowLevelAlarm: false,
      lastUpdated: new Date().toISOString()
    } as PoolStatus
  },

  pumps: {
    internalRefill: {
      pumpId: 'pump-internal',
      type: 'internal_refill',
      running: true,
      lastStarted: new Date().toISOString()
    } as PumpStatus,
    externalRefill: {
      pumpId: 'pump-external',
      type: 'external_refill',
      running: false,
      lastStopped: new Date().toISOString()
    } as PumpStatus,
    fertilizer: {
      pumpId: 'pump-fertilizer',
      type: 'fertilizer',
      running: false,
      lastStopped: new Date().toISOString()
    } as PumpStatus
  },

  alarms: [] as Alarm[],

  batches: [
    {
      batchId: 'A294',
      name: '罗勒',
      type: 'herb',
      plantedDate: '2024-01-15',
      expectedHarvestDate: '2024-02-15',
      status: 'germinating',
      progress: 82,
      usersCount: 124,
      synced: true,
      lastSyncTime: new Date().toISOString()
    },
    {
      batchId: 'C108',
      name: '番茄',
      type: 'vegetable',
      plantedDate: '2024-01-01',
      expectedHarvestDate: '2024-02-10',
      status: 'mature',
      progress: 95,
      usersCount: 89,
      synced: true,
      lastSyncTime: new Date().toISOString()
    }
  ] as SeedlingBatch[],

  tasks: [
    {
      taskId: 'task-01',
      name: '灌溉系统 B-01',
      device: '水泵',
      location: '北温室育苗区',
      lastRun: '14:20',
      interval: '6h',
      duration: '45s',
      status: 'normal',
      nextRun: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    },
    {
      taskId: 'task-02',
      name: '紫外线照射面板 04',
      device: 'UV灯',
      location: '水培支架',
      lastRun: '06:00',
      interval: '12h',
      duration: '8h',
      status: 'paused',
      nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
    },
    {
      taskId: 'task-03',
      name: '通风风机 F-12',
      device: '风机',
      location: '主育苗温室',
      lastRun: '15:05',
      interval: '15m',
      duration: '5m',
      status: 'running',
      nextRun: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    }
  ] as Task[],

  syncLogs: [
    { id: 'log-01', timestamp: new Date().toISOString(), userId: 'USR_502', type: 'alert', message: '触发: 湿度越限告警 Critical', status: 'success' },
    { id: 'log-02', timestamp: new Date().toISOString(), userId: 'USR_119', type: 'task', message: '任务: 生产数据包上报', status: 'retrying' },
    { id: 'log-03', timestamp: new Date().toISOString(), userId: 'USR_088', type: 'data_sync', message: '同步: 种苗批次数据更新', status: 'success' }
  ] as SyncLog[],

  serviceOrders: [
    { orderId: 'YX-88291', type: 'logistics', partner: '顺丰', status: 'in_transit', details: { productName: '优质龟背竹', trackingNo: 'SF1234567890' } },
    { orderId: 'SV-001', type: 'installation', partner: '啄木鸟与森林', status: 'confirmed', scheduledDate: '2024-10-25', details: { type: 'iot_sensor' } },
    { orderId: 'SV-002', type: 'housekeeping', partner: '美团智家服务', status: 'matching', details: { type: 'system_sanitization' } }
  ] as ServiceOrder[]
};

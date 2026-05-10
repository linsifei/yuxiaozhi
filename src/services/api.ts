const API_BASE = 'http://localhost:3001/api';

export interface SensorData {
  id: string;
  type: string;
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
  type: string;
  pool: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface SymbiosisStatus {
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

export interface SeedlingBatch {
  batchId: string;
  name: string;
  type: string;
  plantedDate: string;
  expectedHarvestDate: string;
  status: string;
  progress: number;
  usersCount: number;
  synced: boolean;
  lastSyncTime: string;
}

export interface SyncLog {
  id: string;
  timestamp: string;
  userId: string;
  type: string;
  message: string;
  status: string;
}

export interface ServiceOrder {
  orderId: string;
  type: string;
  partner: string;
  status: string;
  scheduledDate?: string;
  details: any;
}

// Fetch helpers
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error('API error');
    return await response.json();
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error);
    throw error;
  }
}

// Sensor API
export const sensorApi = {
  getAll: () => fetchApi<SensorData[]>('/sensor'),
  getByType: (type: string) => fetchApi<SensorData>(`/sensor/${type}`),
  getByCategory: (category: string) => fetchApi<SensorData[]>(`/sensor/category/${category}`),
};

// Symbiosis API
export const symbiosisApi = {
  getStatus: () => fetchApi<SymbiosisStatus>('/symbiosis/status'),
  getPool: (type: string) => fetchApi<PoolStatus>(`/symbiosis/pool/${type}`),
  getPump: (pumpId: string) => fetchApi<PumpStatus>(`/symbiosis/pump/${pumpId}`),
  controlPump: async (pumpId: string, action: 'start' | 'stop') => {
    const response = await fetch(`${API_BASE}/symbiosis/pump/${pumpId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    return response.json();
  },
  getAlarms: (acknowledged?: boolean) => {
    const query = acknowledged !== undefined ? `?acknowledged=${acknowledged}` : '';
    return fetchApi<Alarm[]>(`/symbiosis/alarms${query}`);
  },
  acknowledgeAlarm: async (alarmId: string) => {
    const response = await fetch(`${API_BASE}/symbiosis/alarm/${alarmId}/acknowledge`, {
      method: 'POST',
    });
    return response.json();
  },
};

// Task API
export const taskApi = {
  getAll: (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return fetchApi<{ active: number; pending: number; tasks: Task[] }>(`/task${query}`);
  },
  getById: (taskId: string) => fetchApi<Task>(`/task/${taskId}`),
  create: async (task: Partial<Task>) => {
    const response = await fetch(`${API_BASE}/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return response.json();
  },
  trigger: async (taskId: string) => {
    const response = await fetch(`${API_BASE}/task/${taskId}/trigger`, {
      method: 'POST',
    });
    return response.json();
  },
  pause: async (taskId: string) => {
    const response = await fetch(`${API_BASE}/task/${taskId}/pause`, {
      method: 'POST',
    });
    return response.json();
  },
  resume: async (taskId: string) => {
    const response = await fetch(`${API_BASE}/task/${taskId}/resume`, {
      method: 'POST',
    });
    return response.json();
  },
};

// Seedling API
export const seedlingApi = {
  getBatches: (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return fetchApi<{ total: number; synced: number; batches: SeedlingBatch[] }>(`/seedling/batches${query}`);
  },
  getBatch: (batchId: string) => fetchApi<SeedlingBatch>(`/seedling/batches/${batchId}`),
  createBatch: async (batch: Partial<SeedlingBatch>) => {
    const response = await fetch(`${API_BASE}/seedling/batches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    return response.json();
  },
  syncBatch: async (batchId: string) => {
    const response = await fetch(`${API_BASE}/seedling/batches/${batchId}/sync`, {
      method: 'POST',
    });
    return response.json();
  },
  syncAll: async () => {
    const response = await fetch(`${API_BASE}/seedling/sync`, {
      method: 'POST',
    });
    return response.json();
  },
  getSyncLogs: (limit?: number, status?: string) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (status) params.append('status', status);
    const query = params.toString() ? `?${params.toString()}` : '';
    return fetchApi<{ total: number; synced: number; pending: number; failed: number; logs: SyncLog[] }>(
      `/seedling/sync/logs${query}`
    );
  },
  getSyncStats: () => fetchApi<any>('/seedling/sync/stats'),
};

// Service API
export const serviceApi = {
  getLogisticsOrders: () => fetchApi<ServiceOrder[]>('/service/logistics/orders'),
  getLogisticsTracking: (orderId: string) => fetchApi<any>(`/service/logistics/tracking/${orderId}`),
  getInstallationServices: () => fetchApi<ServiceOrder[]>('/service/installation/services'),
  createInstallationRequest: async (data: any) => {
    const response = await fetch(`${API_BASE}/service/installation/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  getHousekeepingServices: () => fetchApi<ServiceOrder[]>('/service/housekeeping/services'),
  getHousekeepingSchedule: () => fetchApi<any[]>('/service/housekeeping/schedule'),
  createHousekeepingRequest: async (data: any) => {
    const response = await fetch(`${API_BASE}/service/housekeeping/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

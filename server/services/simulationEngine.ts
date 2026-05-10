import { store } from '../data/store';

export class SimulationEngine {
  private static instance: SimulationEngine;
  private simulationInterval: NodeJS.Timeout | null = null;
  private tickCount: number = 0;

  private constructor() {}

  static getInstance(): SimulationEngine {
    if (!SimulationEngine.instance) {
      SimulationEngine.instance = new SimulationEngine();
    }
    return SimulationEngine.instance;
  }

  start(): void {
    if (this.simulationInterval) return;

    // Run simulation every 2 seconds
    this.simulationInterval = setInterval(() => {
      this.tick();
    }, 2000);

    console.log('Simulation engine started');
  }

  stop(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  private tick(): void {
    this.tickCount++;

    // Update sensors
    this.simulateSensors();

    // Update pool water levels (natural evaporation/consumption)
    this.simulatePoolLevels();

    // Update task countdowns
    this.simulateTasks();

    // Update logistics progress
    this.simulateLogistics();

    // Random events
    if (this.tickCount % 10 === 0) {
      this.triggerRandomEvent();
    }
  }

  // Simulate sensor fluctuations
  private simulateSensors(): void {
    store.sensors.forEach((sensor, index) => {
      let change = 0;

      switch (sensor.type) {
        case 'ec':
          // EC fluctuates slightly
          change = (Math.random() - 0.5) * 0.05;
          store.sensors[index].value = Math.max(0.8, Math.min(2.0, sensor.value + change));
          break;

        case 'ph':
          // pH fluctuates
          change = (Math.random() - 0.5) * 0.1;
          store.sensors[index].value = Math.max(4.0, Math.min(8.0, sensor.value + change));
          break;

        case 'water_temp':
          // Temperature varies slowly
          change = (Math.random() - 0.5) * 0.3;
          store.sensors[index].value = Math.max(18, Math.min(28, sensor.value + change));
          break;

        case 'water_level':
          // Water level reflects collection pool
          store.sensors[index].value = store.pools.collection.waterLevel;
          break;

        case 'salinity':
          // Salinity changes slowly
          change = (Math.random() - 0.5) * 0.02;
          store.sensors[index].value = Math.max(0.3, Math.min(1.5, sensor.value + change));
          break;

        case 'humidity':
          // Humidity fluctuates
          change = (Math.random() - 0.5) * 2;
          store.sensors[index].value = Math.max(30, Math.min(80, sensor.value + change));
          break;

        case 'light':
          // Light varies (simulate day/night if long running)
          change = (Math.random() - 0.5) * 50;
          store.sensors[index].value = Math.max(200, Math.min(2000, sensor.value + change));
          break;
      }

      // Update status
      store.sensors[index].status = this.getSensorStatus(sensor.type, store.sensors[index].value);
      store.sensors[index].timestamp = new Date().toISOString();
    });
  }

  // Simulate pool water level changes
  private simulatePoolLevels(): void {
    const { collection, fish } = store.pools;
    const { internalRefill, externalRefill, fertilizer } = store.pumps;

    // Collection pool: natural evaporation/consumption (-0.5% to -1.5% per tick)
    let collectionChange = -(0.5 + Math.random());

    // Internal refill pump adds water
    if (internalRefill.running) {
      collectionChange += 3;
    }

    // Fertilizer pump removes some water
    if (fertilizer.running) {
      collectionChange -= 0.5;
    }

    collection.waterLevel = Math.max(0, Math.min(100, collection.waterLevel + collectionChange));
    collection.lastUpdated = new Date().toISOString();

    // Fish pool: natural evaporation (-0.3% to -1% per tick)
    let fishChange = -(0.3 + Math.random() * 0.7);

    // External refill pump adds water
    if (externalRefill.running) {
      fishChange += 4;
    }

    fish.waterLevel = Math.max(0, Math.min(100, fish.waterLevel + fishChange));
    fish.lastUpdated = new Date().toISOString();
  }

  // Simulate task countdowns
  private simulateTasks(): void {
    store.tasks.forEach((task, index) => {
      if (task.status === 'paused') return;

      // Calculate next run time
      const nextRun = new Date(task.nextRun);
      const now = new Date();

      if (now >= nextRun) {
        // Task should run
        store.tasks[index].status = 'running';
        store.tasks[index].lastRun = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

        // Set next run based on interval
        const intervalMs = this.parseInterval(task.interval);
        store.tasks[index].nextRun = new Date(now.getTime() + intervalMs).toISOString();

        // After duration, set back to normal
        const durationMs = this.parseDuration(task.duration);
        setTimeout(() => {
          const idx = store.tasks.findIndex(t => t.taskId === task.taskId);
          if (idx !== -1 && store.tasks[idx].status === 'running') {
            store.tasks[idx].status = 'normal';
          }
        }, Math.min(durationMs, 10000)); // Cap at 10 seconds for demo
      }
    });
  }

  // Simulate logistics progress
  private simulateLogistics(): void {
    store.serviceOrders.forEach((order, index) => {
      if (order.type === 'logistics' && order.status === 'in_transit') {
        // Random chance to progress
        if (Math.random() < 0.1) {
          const statuses = ['in_transit', 'out_for_delivery', 'delivered'];
          const currentIdx = statuses.indexOf(order.status);
          if (currentIdx < statuses.length - 1) {
            store.serviceOrders[index].status = statuses[currentIdx + 1];
          }
        }
      }

      if (order.type === 'installation' && order.status === 'pending') {
        if (Math.random() < 0.05) {
          store.serviceOrders[index].status = 'confirmed';
        }
      }

      if (order.type === 'housekeeping' && order.status === 'matching') {
        if (Math.random() < 0.05) {
          store.serviceOrders[index].status = 'confirmed';
          store.serviceOrders[index].details.provider = {
            name: '张师傅',
            phone: '138****8888',
            rating: 4.8
          };
        }
      }
    });
  }

  // Trigger random events for demo
  private triggerRandomEvent(): void {
    const event = Math.floor(Math.random() * 4);

    switch (event) {
      case 0:
        // Simulate a sensor warning
        const sensorIdx = Math.floor(Math.random() * store.sensors.length);
        if (store.sensors[sensorIdx].status === 'normal') {
          store.sensors[sensorIdx].status = 'warning';
        }
        break;

      case 1:
        // Simulate sync log
        store.syncLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          userId: `USR_${Math.floor(Math.random() * 1000)}`,
          type: 'data_sync',
          message: '定时数据同步完成',
          status: Math.random() > 0.2 ? 'success' : 'retrying'
        });

        // Keep only last 20 logs
        if (store.syncLogs.length > 20) {
          store.syncLogs = store.syncLogs.slice(0, 20);
        }
        break;

      case 2:
        // Update batch progress
        store.batches.forEach((batch, idx) => {
          if (batch.status !== 'harvested' && batch.progress < 100) {
            store.batches[idx].progress = Math.min(100, batch.progress + Math.random() * 2);
            if (store.batches[idx].progress >= 100) {
              store.batches[idx].status = 'mature';
            }
          }
        });
        break;

      case 3:
        // Simulate users count change
        store.batches.forEach((batch, idx) => {
          if (Math.random() > 0.7) {
            store.batches[idx].usersCount += Math.floor(Math.random() * 3);
          }
        });
        break;
    }
  }

  private getSensorStatus(type: string, value: number): 'normal' | 'warning' | 'alarm' {
    switch (type) {
      case 'ec':
        if (value < 1.0 || value > 1.8) return 'alarm';
        if (value < 1.2 || value > 1.5) return 'warning';
        return 'normal';
      case 'ph':
        if (value < 5.0 || value > 7.0) return 'alarm';
        if (value < 5.5 || value > 6.5) return 'warning';
        return 'normal';
      case 'water_temp':
        if (value < 18 || value > 28) return 'alarm';
        if (value < 20 || value > 25) return 'warning';
        return 'normal';
      case 'water_level':
        if (value < 20) return 'alarm';
        if (value < 40) return 'warning';
        return 'normal';
      case 'salinity':
        if (value > 1.5) return 'alarm';
        if (value > 1.0) return 'warning';
        return 'normal';
      case 'humidity':
        if (value < 30 || value > 80) return 'alarm';
        if (value < 40 || value > 70) return 'warning';
        return 'normal';
      case 'light':
        if (value < 200 || value > 2000) return 'alarm';
        if (value < 500 || value > 1500) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  }

  private parseInterval(interval: string): number {
    const match = interval.match(/^(\d+)([hmd])$/);
    if (!match) return 60 * 1000; // default 1 minute for demo

    const value = parseInt(match[1]);
    const unit = match[2];

    // Speed up for demo (1 hour = 30 seconds, 6h = 3min, etc)
    switch (unit) {
      case 'm': return value * 5 * 1000;  // 5 seconds per minute
      case 'h': return value * 30 * 1000;  // 30 seconds per hour
      case 'd': return value * 5 * 60 * 1000;  // 5 minutes per day
      default: return 60 * 1000;
    }
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/^(\d+)([hms])$/);
    if (!match) return 3000;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 's': return value * 1000;
      case 'm': return value * 3 * 1000;  // 3 seconds per minute for demo
      case 'h': return value * 5 * 1000;  // 5 seconds per hour for demo
      default: return 3000;
    }
  }
}

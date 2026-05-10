import { store, Alarm } from '../data/store';

export class SymbiosisService {
  private static instance: SymbiosisService;
  private lowLevelStartTime: number | null = null;
  private monitoringInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): SymbiosisService {
    if (!SymbiosisService.instance) {
      SymbiosisService.instance = new SymbiosisService();
    }
    return SymbiosisService.instance;
  }

  // Start monitoring loop
  startMonitoring(): void {
    if (this.monitoringInterval) return;

    this.monitoringInterval = setInterval(() => {
      this.executeLogic();
    }, 1000); // Check every second

    console.log('Symbiosis monitoring started');
  }

  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  // Main control logic based on requirements
  private executeLogic(): void {
    const { collection, fish } = store.pools;
    const { internalRefill, externalRefill, fertilizer } = store.pumps;

    // Rule 1: Collection pool low level alarm
    if (collection.waterLevel < 15 && !collection.lowLevelAlarm) {
      collection.lowLevelAlarm = true;
      this.addAlarm('low_level', 'collection', '集水池低水位报警');
    } else if (collection.waterLevel >= 15) {
      collection.lowLevelAlarm = false;
    }

    // Rule 2: Collection pool high level alarm
    if (collection.waterLevel > 85 && !collection.highLevelAlarm) {
      collection.highLevelAlarm = true;
      this.addAlarm('high_level', 'collection', '集水池高水位报警');
    } else if (collection.waterLevel <= 85) {
      collection.highLevelAlarm = false;
    }

    // Rule 3: Fish pool low level alarm
    if (fish.waterLevel < 15 && !fish.lowLevelAlarm) {
      fish.lowLevelAlarm = true;
      this.lowLevelStartTime = Date.now();
      this.addAlarm('low_level', 'fish', '鱼泵池低水位报警');
    } else if (fish.waterLevel >= 15) {
      fish.lowLevelAlarm = false;
      this.lowLevelStartTime = null;
    }

    // Rule 4: Fish pool high level alarm
    if (fish.waterLevel > 85 && !fish.highLevelAlarm) {
      fish.highLevelAlarm = true;
      this.addAlarm('high_level', 'fish', '鱼泵池高水位报警');
    } else if (fish.waterLevel <= 85) {
      fish.highLevelAlarm = false;
    }

    // Rule 2: Low level alarm -> internal refill pump starts
    if (collection.lowLevelAlarm && !internalRefill.running) {
      this.startPump('internalRefill');
    }

    // Rule 3: Collection high level -> internal refill pump stops
    if (collection.highLevelAlarm && internalRefill.running) {
      this.stopPump('internalRefill');
    }

    // Rule 4: Collection high level AND fish not low level -> fertilizer pump starts
    if (collection.highLevelAlarm && !fish.lowLevelAlarm && !fertilizer.running) {
      this.startPump('fertilizer');
    } else if (!collection.highLevelAlarm && fertilizer.running) {
      this.stopPump('fertilizer');
    }

    // Rule 5: Collection NOT high level AND fish low level -> external refill pump starts
    if (!collection.highLevelAlarm && fish.lowLevelAlarm && !fish.highLevelAlarm && !externalRefill.running) {
      this.startPump('externalRefill');
    }

    // Rule 5b: Fish high level -> external refill pump stops
    if (fish.highLevelAlarm && externalRefill.running) {
      this.stopPump('externalRefill');
    }

    // Rule 6: Fish low level for > 10s -> stop internal pump and alarm
    if (fish.lowLevelAlarm && this.lowLevelStartTime) {
      const duration = Date.now() - this.lowLevelStartTime;
      if (duration > 10000 && internalRefill.running) {
        this.stopPump('internalRefill');
        this.addAlarm('duration_exceeded', 'fish', '鱼泵池低水位持续超过10秒，内补水泵已停止');
      }
    }

    // Simulate water level changes when pumps are running
    if (internalRefill.running) {
      collection.waterLevel = Math.min(100, collection.waterLevel + 0.5);
    }
    if (externalRefill.running) {
      fish.waterLevel = Math.min(100, fish.waterLevel + 0.5);
    }

    // Update timestamps
    collection.lastUpdated = new Date().toISOString();
    fish.lastUpdated = new Date().toISOString();
  }

  private startPump(pumpKey: 'internalRefill' | 'externalRefill' | 'fertilizer'): void {
    store.pumps[pumpKey].running = true;
    store.pumps[pumpKey].lastStarted = new Date().toISOString();
    console.log(`Pump ${pumpKey} started`);
  }

  private stopPump(pumpKey: 'internalRefill' | 'externalRefill' | 'fertilizer'): void {
    store.pumps[pumpKey].running = false;
    store.pumps[pumpKey].lastStopped = new Date().toISOString();
    console.log(`Pump ${pumpKey} stopped`);
  }

  private addAlarm(type: Alarm['type'], pool: Alarm['pool'], message: string): void {
    const alarm: Alarm = {
      id: `alarm-${Date.now()}`,
      type,
      pool,
      message,
      timestamp: new Date().toISOString(),
      acknowledged: false
    };
    store.alarms.unshift(alarm);

    // Also add to sync logs
    store.syncLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'SYSTEM',
      type: 'alert',
      message,
      status: 'pending'
    });
  }

  // Manual pump control
  controlPump(pumpId: string, action: 'start' | 'stop'): boolean {
    const pumpKey = Object.keys(store.pumps).find(
      key => store.pumps[key as keyof typeof store.pumps].pumpId === pumpId
    ) as keyof typeof store.pumps | undefined;

    if (!pumpKey) return false;

    if (action === 'start') {
      this.startPump(pumpKey);
    } else {
      this.stopPump(pumpKey);
    }
    return true;
  }

  // Acknowledge alarm
  acknowledgeAlarm(alarmId: string): boolean {
    const alarm = store.alarms.find(a => a.id === alarmId);
    if (alarm) {
      alarm.acknowledged = true;
      return true;
    }
    return false;
  }

  // Get current status
  getStatus() {
    return {
      collectionPool: store.pools.collection,
      fishPool: store.pools.fish,
      pumps: store.pumps,
      logicStatus: this.getLogicStatus(),
      alarms: store.alarms.filter(a => !a.acknowledged)
    };
  }

  private getLogicStatus(): 'normal' | 'warning' | 'alarm' {
    const hasAlarms = store.alarms.some(a => !a.acknowledged);
    if (hasAlarms) return 'alarm';

    const { collection, fish } = store.pools;
    if (collection.waterLevel < 25 || fish.waterLevel < 25) return 'warning';
    if (collection.waterLevel > 75 || fish.waterLevel > 75) return 'warning';

    return 'normal';
  }
}

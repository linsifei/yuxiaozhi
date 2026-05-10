import { Router, Request, Response } from 'express';
import { store } from '../data/store';
import { SymbiosisService } from '../services/symbiosisService';

export const symbiosisRouter = Router();
const symbiosisService = SymbiosisService.getInstance();

// Get system status
symbiosisRouter.get('/status', (req: Request, res: Response) => {
  const status = symbiosisService.getStatus();
  res.json(status);
});

// Get pool status
symbiosisRouter.get('/pool/:type', (req: Request, res: Response) => {
  const { type } = req.params;

  if (type !== 'collection' && type !== 'fish') {
    return res.status(400).json({ error: 'Invalid pool type' });
  }

  res.json(store.pools[type]);
});

// Update pool water level (for device reporting)
symbiosisRouter.put('/pool/:type', (req: Request, res: Response) => {
  const { type } = req.params;
  const { waterLevel } = req.body;

  if (type !== 'collection' && type !== 'fish') {
    return res.status(400).json({ error: 'Invalid pool type' });
  }

  if (typeof waterLevel !== 'number' || waterLevel < 0 || waterLevel > 100) {
    return res.status(400).json({ error: 'Invalid water level' });
  }

  store.pools[type].waterLevel = waterLevel;
  store.pools[type].lastUpdated = new Date().toISOString();

  res.json(store.pools[type]);
});

// Control pump manually
symbiosisRouter.post('/pump/:pumpId', (req: Request, res: Response) => {
  const { pumpId } = req.params;
  const { action } = req.body;

  if (action !== 'start' && action !== 'stop') {
    return res.status(400).json({ error: 'Invalid action' });
  }

  const success = symbiosisService.controlPump(pumpId, action);

  if (!success) {
    return res.status(404).json({ error: 'Pump not found' });
  }

  res.json({ success: true, pumps: store.pumps });
});

// Get pump status
symbiosisRouter.get('/pump/:pumpId', (req: Request, res: Response) => {
  const { pumpId } = req.params;

  const pump = Object.values(store.pumps).find(p => p.pumpId === pumpId);
  if (!pump) {
    return res.status(404).json({ error: 'Pump not found' });
  }

  res.json(pump);
});

// Get all alarms
symbiosisRouter.get('/alarms', (req: Request, res: Response) => {
  const { acknowledged } = req.query;

  let alarms = store.alarms;
  if (acknowledged === 'false') {
    alarms = alarms.filter(a => !a.acknowledged);
  } else if (acknowledged === 'true') {
    alarms = alarms.filter(a => a.acknowledged);
  }

  res.json(alarms);
});

// Acknowledge alarm
symbiosisRouter.post('/alarm/:alarmId/acknowledge', (req: Request, res: Response) => {
  const { alarmId } = req.params;

  const success = symbiosisService.acknowledgeAlarm(alarmId);

  if (!success) {
    return res.status(404).json({ error: 'Alarm not found' });
  }

  res.json({ success: true, alarms: store.alarms });
});

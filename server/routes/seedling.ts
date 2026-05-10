import { Router, Request, Response } from 'express';
import { store } from '../data/store';

export const seedlingRouter = Router();

// Get all batches
seedlingRouter.get('/batches', (req: Request, res: Response) => {
  const { status } = req.query;

  let batches = store.batches;
  if (status) {
    batches = batches.filter(b => b.status === status);
  }

  res.json({
    total: batches.length,
    synced: batches.filter(b => b.synced).length,
    batches
  });
});

// Get batch by ID
seedlingRouter.get('/batches/:batchId', (req: Request, res: Response) => {
  const { batchId } = req.params;
  const batch = store.batches.find(b => b.batchId === batchId);

  if (!batch) {
    return res.status(404).json({ error: 'Batch not found' });
  }

  res.json(batch);
});

// Create new batch
seedlingRouter.post('/batches', (req: Request, res: Response) => {
  const { name, type, plantedDate, expectedHarvestDate } = req.body;

  const batch = {
    batchId: `B${Date.now()}`,
    name,
    type,
    plantedDate,
    expectedHarvestDate,
    status: 'germinating',
    progress: 0,
    usersCount: 0,
    synced: false,
    lastSyncTime: new Date().toISOString()
  };

  store.batches.push(batch);

  // Add sync log
  store.syncLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userId: 'SYSTEM',
    type: 'data_sync',
    message: `新批次创建: ${name}`,
    status: 'pending'
  });

  res.status(201).json(batch);
});

// Update batch
seedlingRouter.put('/batches/:batchId', (req: Request, res: Response) => {
  const { batchId } = req.params;
  const updates = req.body;

  const batchIndex = store.batches.findIndex(b => b.batchId === batchId);
  if (batchIndex === -1) {
    return res.status(404).json({ error: 'Batch not found' });
  }

  store.batches[batchIndex] = {
    ...store.batches[batchIndex],
    ...updates,
    synced: false
  };

  res.json(store.batches[batchIndex]);
});

// Sync batch to mini-program
seedlingRouter.post('/batches/:batchId/sync', (req: Request, res: Response) => {
  const { batchId } = req.params;

  const batchIndex = store.batches.findIndex(b => b.batchId === batchId);
  if (batchIndex === -1) {
    return res.status(404).json({ error: 'Batch not found' });
  }

  // Simulate sync
  store.batches[batchIndex].synced = true;
  store.batches[batchIndex].lastSyncTime = new Date().toISOString();

  // Add sync log
  store.syncLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userId: `USR_${Math.floor(Math.random() * 1000)}`,
    type: 'data_sync',
    message: `批次 ${store.batches[batchIndex].name} 同步成功`,
    status: 'success'
  });

  res.json({ success: true, batch: store.batches[batchIndex] });
});

// Sync all data
seedlingRouter.post('/sync', (req: Request, res: Response) => {
  const results = {
    total: store.batches.length,
    synced: 0,
    failed: 0
  };

  store.batches.forEach((batch, index) => {
    try {
      store.batches[index].synced = true;
      store.batches[index].lastSyncTime = new Date().toISOString();
      results.synced++;
    } catch {
      results.failed++;
    }
  });

  // Add sync log
  store.syncLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userId: 'SYSTEM',
    type: 'data_sync',
    message: `批量同步完成: ${results.synced}/${results.total}`,
    status: results.failed > 0 ? 'retrying' : 'success'
  });

  res.json(results);
});

// Get sync logs
seedlingRouter.get('/sync/logs', (req: Request, res: Response) => {
  const { limit = '10', status } = req.query;

  let logs = store.syncLogs;
  if (status) {
    logs = logs.filter(l => l.status === status);
  }

  logs = logs.slice(0, parseInt(limit as string));

  res.json({
    total: store.syncLogs.length,
    synced: store.syncLogs.filter(l => l.status === 'success').length,
    pending: store.syncLogs.filter(l => l.status === 'pending').length,
    failed: store.syncLogs.filter(l => l.status === 'failed').length,
    logs
  });
});

// Get sync statistics
seedlingRouter.get('/sync/stats', (req: Request, res: Response) => {
  res.json({
    batches: {
      total: store.batches.length,
      synced: store.batches.filter(b => b.synced).length,
      pending: store.batches.filter(b => !b.synced).length
    },
    logs: {
      total: store.syncLogs.length,
      success: store.syncLogs.filter(l => l.status === 'success').length,
      pending: store.syncLogs.filter(l => l.status === 'pending').length,
      retrying: store.syncLogs.filter(l => l.status === 'retrying').length,
      failed: store.syncLogs.filter(l => l.status === 'failed').length
    },
    lastSyncTime: store.batches.length > 0
      ? Math.max(...store.batches.map(b => new Date(b.lastSyncTime).getTime()))
      : null
  });
});

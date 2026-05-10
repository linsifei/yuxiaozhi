import { Router, Request, Response } from 'express';
import { store } from '../data/store';

export const taskRouter = Router();

// Get all tasks
taskRouter.get('/', (req: Request, res: Response) => {
  const { status } = req.query;

  let tasks = store.tasks;
  if (status) {
    tasks = tasks.filter(t => t.status === status);
  }

  res.json({
    active: store.tasks.filter(t => t.status === 'running' || t.status === 'normal').length,
    pending: store.tasks.filter(t => t.status === 'paused').length,
    tasks
  });
});

// Get task by ID
taskRouter.get('/:taskId', (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = store.tasks.find(t => t.taskId === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// Create new task
taskRouter.post('/', (req: Request, res: Response) => {
  const { name, device, location, interval, duration } = req.body;

  const task = {
    taskId: `task-${Date.now()}`,
    name,
    device,
    location,
    lastRun: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    interval,
    duration,
    status: 'normal' as const,
    nextRun: new Date(Date.now() + parseInterval(interval)).toISOString()
  };

  store.tasks.push(task);

  // Add sync log
  store.syncLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userId: 'SYSTEM',
    type: 'task',
    message: `新任务创建: ${name}`,
    status: 'success'
  });

  res.status(201).json(task);
});

// Update task
taskRouter.put('/:taskId', (req: Request, res: Response) => {
  const { taskId } = req.params;
  const updates = req.body;

  const taskIndex = store.tasks.findIndex(t => t.taskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  store.tasks[taskIndex] = {
    ...store.tasks[taskIndex],
    ...updates
  };

  res.json(store.tasks[taskIndex]);
});

// Trigger task immediately
taskRouter.post('/:taskId/trigger', (req: Request, res: Response) => {
  const { taskId } = req.params;

  const taskIndex = store.tasks.findIndex(t => t.taskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const task = store.tasks[taskIndex];

  if (task.status === 'paused') {
    return res.status(400).json({ error: 'Task is paused' });
  }

  // Update last run time
  store.tasks[taskIndex].lastRun = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  store.tasks[taskIndex].status = 'running';

  // Add sync log
  store.syncLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userId: 'SYSTEM',
    type: 'task',
    message: `任务触发: ${task.name}`,
    status: 'success'
  });

  // Simulate task completion after duration
  setTimeout(() => {
    const idx = store.tasks.findIndex(t => t.taskId === taskId);
    if (idx !== -1) {
      store.tasks[idx].status = 'normal';
      store.tasks[idx].nextRun = new Date(Date.now() + parseInterval(store.tasks[idx].interval)).toISOString();
    }
  }, parseDuration(task.duration));

  res.json({ success: true, task: store.tasks[taskIndex] });
});

// Pause task
taskRouter.post('/:taskId/pause', (req: Request, res: Response) => {
  const { taskId } = req.params;

  const taskIndex = store.tasks.findIndex(t => t.taskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  store.tasks[taskIndex].status = 'paused';

  res.json({ success: true, task: store.tasks[taskIndex] });
});

// Resume task
taskRouter.post('/:taskId/resume', (req: Request, res: Response) => {
  const { taskId } = req.params;

  const taskIndex = store.tasks.findIndex(t => t.taskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  store.tasks[taskIndex].status = 'normal';
  store.tasks[taskIndex].nextRun = new Date(Date.now() + parseInterval(store.tasks[taskIndex].interval)).toISOString();

  res.json({ success: true, task: store.tasks[taskIndex] });
});

// Delete task
taskRouter.delete('/:taskId', (req: Request, res: Response) => {
  const { taskId } = req.params;

  const taskIndex = store.tasks.findIndex(t => t.taskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  store.tasks.splice(taskIndex, 1);

  res.json({ success: true });
});

function parseInterval(interval: string): number {
  const match = interval.match(/^(\d+)([hmd])$/);
  if (!match) return 60 * 60 * 1000; // default 1 hour

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'd': return value * 24 * 60 * 60 * 1000;
    default: return 60 * 60 * 1000;
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)([hms])$/);
  if (!match) return 5000; // default 5 seconds

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's': return value * 1000;
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    default: return 5000;
  }
}

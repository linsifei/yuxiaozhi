import { Router, Request, Response } from 'express';
import { store } from '../data/store';

export const sensorRouter = Router();

// Get all sensor data
sensorRouter.get('/', (req: Request, res: Response) => {
  res.json(store.sensors);
});

// Get sensor by type
sensorRouter.get('/:type', (req: Request, res: Response) => {
  const { type } = req.params;
  const sensor = store.sensors.find(s => s.type === type);

  if (!sensor) {
    return res.status(404).json({ error: 'Sensor not found' });
  }

  res.json(sensor);
});

// Update sensor value (for device reporting)
sensorRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { value } = req.body;

  const sensorIndex = store.sensors.findIndex(s => s.id === id);
  if (sensorIndex === -1) {
    return res.status(404).json({ error: 'Sensor not found' });
  }

  store.sensors[sensorIndex].value = value;
  store.sensors[sensorIndex].timestamp = new Date().toISOString();

  // Update status based on value
  const sensor = store.sensors[sensorIndex];
  sensor.status = getSensorStatus(sensor.type, value);

  res.json(store.sensors[sensorIndex]);
});

// Get sensors by category (hydroponics/soil)
sensorRouter.get('/category/:category', (req: Request, res: Response) => {
  const { category } = req.params;

  const hydroponicsTypes = ['ec', 'ph', 'water_temp', 'water_level'];
  const soilTypes = ['salinity', 'humidity', 'light'];

  let types: string[];
  if (category === 'hydroponics') {
    types = hydroponicsTypes;
  } else if (category === 'soil') {
    types = soilTypes;
  } else {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const sensors = store.sensors.filter(s => types.includes(s.type));
  res.json(sensors);
});

function getSensorStatus(type: string, value: number): 'normal' | 'warning' | 'alarm' {
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

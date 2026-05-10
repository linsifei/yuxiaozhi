import { Router, Request, Response } from 'express';
import { store } from '../data/store';

export const serviceRouter = Router();

// ==================== 物流服务 ====================

// Get logistics orders
serviceRouter.get('/logistics/orders', (req: Request, res: Response) => {
  const orders = store.serviceOrders.filter(o => o.type === 'logistics');
  res.json(orders);
});

// Get logistics tracking
serviceRouter.get('/logistics/tracking/:orderId', (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = store.serviceOrders.find(o => o.orderId === orderId && o.type === 'logistics');

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Mock tracking timeline
  const timeline = [
    {
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      location: '静安分拨中心',
      status: 'arrived',
      description: '到达静安分拨中心，枢纽已入库，待分配派件员'
    },
    {
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      location: '杭州分拣中心',
      status: 'departed',
      description: '已离开杭州分拣中心，园区装载完毕，发往上海'
    },
    {
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      location: '发货仓',
      status: 'picked_up',
      description: '已取件，等待发出'
    }
  ];

  res.json({
    ...order,
    timeline,
    currentPosition: '昆山枢纽园区',
    estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  });
});

// ==================== 安装服务 ====================

// Get installation services
serviceRouter.get('/installation/services', (req: Request, res: Response) => {
  const services = store.serviceOrders.filter(o => o.type === 'installation');
  res.json(services);
});

// Create installation request
serviceRouter.post('/installation/request', (req: Request, res: Response) => {
  const { serviceType, preferredDates, address, contactPhone, notes } = req.body;

  const order = {
    orderId: `INST-${Date.now()}`,
    type: 'installation',
    partner: '啄木鸟与森林',
    status: 'pending',
    scheduledDate: preferredDates?.[0],
    details: {
      serviceType,
      address,
      contactPhone,
      notes,
      technician: null
    }
  };

  store.serviceOrders.push(order);

  // Add sync log
  store.syncLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userId: 'SYSTEM',
    type: 'task',
    message: `安装服务预约: ${serviceType}`,
    status: 'success'
  });

  res.status(201).json(order);
});

// Get installation status
serviceRouter.get('/installation/status/:serviceId', (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const service = store.serviceOrders.find(o => o.orderId === serviceId && o.type === 'installation');

  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  res.json(service);
});

// Update installation status (for partner API callback)
serviceRouter.put('/installation/:serviceId', (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const { status, technician } = req.body;

  const serviceIndex = store.serviceOrders.findIndex(o => o.orderId === serviceId && o.type === 'installation');
  if (serviceIndex === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  store.serviceOrders[serviceIndex].status = status;
  if (technician) {
    store.serviceOrders[serviceIndex].details.technician = technician;
  }

  res.json(store.serviceOrders[serviceIndex]);
});

// Cancel installation
serviceRouter.post('/installation/cancel/:serviceId', (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const serviceIndex = store.serviceOrders.findIndex(o => o.orderId === serviceId && o.type === 'installation');
  if (serviceIndex === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  store.serviceOrders[serviceIndex].status = 'cancelled';

  res.json({ success: true, service: store.serviceOrders[serviceIndex] });
});

// ==================== 家政服务 ====================

// Get housekeeping services
serviceRouter.get('/housekeeping/services', (req: Request, res: Response) => {
  const services = store.serviceOrders.filter(o => o.type === 'housekeeping');
  res.json(services);
});

// Get housekeeping schedule
serviceRouter.get('/housekeeping/schedule', (req: Request, res: Response) => {
  const services = store.serviceOrders.filter(o => o.type === 'housekeeping' && o.status !== 'cancelled');

  const schedule = services.map(s => ({
    serviceId: s.orderId,
    type: s.details.type,
    partner: s.partner,
    nextDate: s.scheduledDate,
    status: s.status
  }));

  res.json(schedule);
});

// Create housekeeping request
serviceRouter.post('/housekeeping/request', (req: Request, res: Response) => {
  const { serviceType, frequency, preferredTime, address, contactPhone, specialRequirements } = req.body;

  const order = {
    orderId: `HK-${Date.now()}`,
    type: 'housekeeping',
    partner: serviceType === 'system_sanitization' ? '美团智家服务' : '58到家',
    status: 'matching',
    scheduledDate: calculateNextDate(frequency, preferredTime),
    details: {
      type: serviceType,
      frequency,
      address,
      contactPhone,
      specialRequirements,
      provider: null
    }
  };

  store.serviceOrders.push(order);

  // Add sync log
  store.syncLogs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userId: 'SYSTEM',
    type: 'task',
    message: `家政服务预约: ${serviceType}`,
    status: 'success'
  });

  res.status(201).json(order);
});

// Update housekeeping status (for partner API callback)
serviceRouter.put('/housekeeping/:serviceId', (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const { status, provider } = req.body;

  const serviceIndex = store.serviceOrders.findIndex(o => o.orderId === serviceId && o.type === 'housekeeping');
  if (serviceIndex === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  store.serviceOrders[serviceIndex].status = status;
  if (provider) {
    store.serviceOrders[serviceIndex].details.provider = provider;
  }

  res.json(store.serviceOrders[serviceIndex]);
});

// Cancel housekeeping
serviceRouter.post('/housekeeping/cancel/:serviceId', (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const serviceIndex = store.serviceOrders.findIndex(o => o.orderId === serviceId && o.type === 'housekeeping');
  if (serviceIndex === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  store.serviceOrders[serviceIndex].status = 'cancelled';

  res.json({ success: true, service: store.serviceOrders[serviceIndex] });
});

// Helper function
function calculateNextDate(frequency: string, preferredTime: string): string {
  const now = new Date();
  switch (frequency) {
    case 'weekly':
      now.setDate(now.getDate() + 7);
      break;
    case 'monthly':
      now.setMonth(now.getMonth() + 1);
      break;
    case 'quarterly':
      now.setMonth(now.getMonth() + 3);
      break;
    default:
      now.setDate(now.getDate() + 3);
  }
  return now.toISOString();
}

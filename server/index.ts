import express from 'express';
import cors from 'cors';
import { sensorRouter } from './routes/sensor';
import { symbiosisRouter } from './routes/symbiosis';
import { seedlingRouter } from './routes/seedling';
import { taskRouter } from './routes/task';
import { serviceRouter } from './routes/service';
import { SymbiosisService } from './services/symbiosisService';
import { SimulationEngine } from './services/simulationEngine';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sensor', sensorRouter);
app.use('/api/symbiosis', symbiosisRouter);
app.use('/api/seedling', seedlingRouter);
app.use('/api/task', taskRouter);
app.use('/api/service', serviceRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize symbiosis monitoring
const symbiosisService = SymbiosisService.getInstance();
symbiosisService.startMonitoring();

// Initialize simulation engine for dynamic data
const simulationEngine = SimulationEngine.getInstance();
simulationEngine.start();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  console.log('Health check hit');
  res.json({ status: 'Server is running perfectly' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Freight API is running on Vercel!' });
});

export default app;
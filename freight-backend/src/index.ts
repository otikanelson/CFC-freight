import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Export the Express app for Vercel serverless functions
export default app;

// Keep the listen for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Freight server running on port ${PORT}`);
  });
}
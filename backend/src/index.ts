import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db';
import salaryRoutes from './routes/salaries';
import authRoutes from './routes/auth';
import companyRoutes from './routes/companies';

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://comp-intel-three.vercel.app', process.env.FRONTEND_URL || ''],
  credentials: true,
}));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());

app.use('/api/salaries', salaryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
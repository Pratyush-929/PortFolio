import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import apiRoutes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Database Schema & Seed Data
initDb();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend Server is healthy & operational' });
});

// Serve static frontend in production if built
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.use((req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(200).send('Portfolio API Backend Server Running. (Frontend in Dev mode on port 5173)');
      }
    });
  } else {
    res.status(404).json({ success: false, error: 'API route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🛡️ CYBERSECURITY PORTFOLIO BACKEND SERVER ONLINE`);
  console.log(`📡 API Listening at: http://localhost:${PORT}/api`);
  console.log(`==================================================\n`);
});

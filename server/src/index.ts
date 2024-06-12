import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import eventBoothRoutes from './routes/eventBoothRoutes';
import requestRoutes from './routes/requestRoutes';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000']; // Add any other origins you need

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(express.json());

// Enable CORS with options
app.use(cors());
app.use(
  '/uploads/images',
  express.static(path.join(__dirname, '../public/uploads/images'))
);

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-booths', eventBoothRoutes);
app.use('/api/requests', requestRoutes);

app.get('/', (req, res) => {
  res.send('BoothBooker API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

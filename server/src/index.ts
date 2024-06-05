import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import express from 'express';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import eventBoothRoutes from './routes/eventBoothRoutes';
import requestRoutes from './routes/requestRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/event-booths', eventBoothRoutes);
app.use('/requests', requestRoutes);

app.get('/', (req, res) => {
  res.send('BoothBooker API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

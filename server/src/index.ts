import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('BoothBooker API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

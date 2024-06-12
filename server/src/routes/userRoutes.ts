import express from 'express';
import {
  loginController,
  createUserController,
  getAllUsersController,
  getUserByIdController,
  getUserByEmailController,
} from '../controllers/userController';

const router = express.Router();

// Login a user
router.post('/login', loginController);

// Create a new user
router.post('/', createUserController);

// Get all users
router.get('/', getAllUsersController);

// Get a user by ID
router.get('/:id', getUserByIdController);

// Get a user by Email
router.get('/:email', getUserByEmailController);

export default router;

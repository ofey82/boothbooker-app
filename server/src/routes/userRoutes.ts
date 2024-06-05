import express from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  getUserByEmailController,
} from '../controllers/userController';

const router = express.Router();

// Create a new user
router.post('/', createUserController);

// Get all users
router.get('/', getAllUsersController);

// Get a user by ID
router.get('/:id', getUserByIdController);

// Get a user by Email
router.get('/:email', getUserByEmailController);

export default router;

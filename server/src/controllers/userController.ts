// src/controllers/userController.ts

import { Request, Response } from 'express';
import {
  login,
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
} from '../services/userService';
import { PublicUser } from '../models/user';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user: PublicUser = await createUser(username, email, password);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const users: PublicUser[] = await getAllUsers();
  res.json(users);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: PublicUser | null = await getUserById(Number(id));
  res.json(user);
};

export const getUserByEmailController = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user: PublicUser | null = await getUserByEmail(email);
  res.json(user);
};

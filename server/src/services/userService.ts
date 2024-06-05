import { PrismaClient } from '@prisma/client';
import { PublicUser } from '../models/user';

const prisma = new PrismaClient();

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<PublicUser> => {
  return await prisma.user.create({
    data: { username, email, password },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const getAllUsers = async (): Promise<PublicUser[]> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const getUserById = async (id: number): Promise<PublicUser | null> => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const getUserByEmail = async (
  email: string
): Promise<PublicUser | null> => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

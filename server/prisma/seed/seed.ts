import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password1',
      },
      {
        username: 'Nuno Ildefonso',
        email: 'nildefonso@example.com',
        password: 'password2',
      },
      {
        username: 'Martin Raven',
        email: 'mraven@example.com',
        password: 'password3',
      },
    ],
  });
  console.log('Seed data created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

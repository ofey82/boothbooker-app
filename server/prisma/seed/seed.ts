import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Ensure users exist
  await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password1',
    },
  });

  await prisma.user.upsert({
    where: { email: 'nildefonso@example.com' },
    update: {},
    create: {
      username: 'Nuno Ildefonso',
      email: 'nildefonso@example.com',
      password: 'password2',
    },
  });

  await prisma.user.upsert({
    where: { email: 'mraven@example.com' },
    update: {},
    create: {
      username: 'Martin Raven',
      email: 'mraven@example.com',
      password: 'password3',
    },
  });

  // Create events only if they don't exist
  const events = [
    {
      name: 'DevGathering',
      date: new Date('2024-07-01T10:00:00.000Z'),
      local: 'Berlin',
      description:
        'Join us at DevGathering in Berlin for a comprehensive developer conference. Network with industry experts, attend workshops, and stay updated with the latest trends in software development.',
      creatorId: 1,
      status: 'O',
    },
    {
      name: 'Sales Connect',
      date: new Date('2024-08-01T10:00:00.000Z'),
      local: 'New York',
      description:
        'Sales Connect in New York is the premier event for sales professionals. Enhance your skills, learn new strategies, and connect with top sales leaders from around the globe.',
      creatorId: 2,
      status: 'O',
    },
    {
      name: 'Foodie Trucks',
      date: new Date('2024-09-01T10:00:00.000Z'),
      local: 'San Francisco',
      description:
        'Foodie Trucks is a delightful event in San Francisco celebrating the best food trucks in the region. Enjoy a variety of gourmet food, live music, and family-friendly activities.',
      creatorId: 3,
      status: 'O',
    },
  ];

  for (const event of events) {
    const existingEvent = await prisma.event.findFirst({
      where: { name: event.name },
    });

    if (!existingEvent) {
      await prisma.event.create({ data: event });
    }
  }

  // Create event booths only if they don't exist
  const eventBooths = [
    { eventId: 1, name: 'Booth 1', size: '10x10', price: 100, status: 'A' },
    { eventId: 1, name: 'Booth 2', size: '10x10', price: 100, status: 'A' },
    { eventId: 2, name: 'Booth 3', size: '10x10', price: 200, status: 'A' },
    { eventId: 2, name: 'Booth 4', size: '10x10', price: 200, status: 'A' },
    { eventId: 3, name: 'Booth 5', size: '10x10', price: 300, status: 'A' },
    { eventId: 3, name: 'Booth 6', size: '10x10', price: 300, status: 'A' },
  ];

  for (const booth of eventBooths) {
    const existingBooth = await prisma.eventBooth.findFirst({
      where: { name: booth.name },
    });

    if (!existingBooth) {
      await prisma.eventBooth.create({ data: booth });
    }
  }

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

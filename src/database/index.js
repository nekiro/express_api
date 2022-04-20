import { PrismaClient } from '@prisma/client';

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

global.prisma = prisma;

export default prisma;

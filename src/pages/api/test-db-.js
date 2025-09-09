// pages/api/test-db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    await prisma.$connect();
    res.status(200).json({ message: '✅ Database connected successfully!' });
  } catch (error) {
    res.status(500).json({ message: '❌ DB connection failed', error: error.message });
  }
}

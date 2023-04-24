import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const localities = await prisma.home.findMany({
        select: {
          locality: true
        }
      });
      res.status(200).json(localities);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
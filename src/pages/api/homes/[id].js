import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  // Retrieve the authenticated user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { listedHomes: true },
  });

  // Check if authenticated user is the owner of this home
  const { id } = req.query;
  if (!user?.listedHomes?.find(home => home.id === id)) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  // Update home
  if (req.method === "PATCH") {
    // TODO
    try {
      const home = await prisma.home.update({
        where: { id },
        data: req.body,
      });
      res.status(200).json(home);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  // Delete home
  else if (req.method === "DELETE") {
    // TODO
    try {
      const home = await prisma.home.delete({
        where: { id },
      });
      if (home.image) {
        const path = home.image.split(
          `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/`
        )?.[1];
        await supabase.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
          .remove([path]);
      }
      res.status(200).json(home);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}

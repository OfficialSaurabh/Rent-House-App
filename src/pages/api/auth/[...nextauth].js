// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";

// Instantiate Prisma Client
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
  port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

const emailsDir = path.resolve(process.cwd(), "emails");
// Verify custom email

const sendVerificationRequest = ({ identifier, url }) => {
  const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
    encoding: "utf8",
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"✨ RentHouse" ${process.env.NEXT_PUBLIC_EMAIL_FROM}`,
    to: identifier,
    subject: "Your sign-in link for RentHouse",
    html: emailTemplate({
      base_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

// Welcome email
const sendWelcomeEmail = async ({ user }) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, "welcome.html"), {
      encoding: "utf8",
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"✨ RentHouse" ${process.env.NEXT_PUBLIC_EMAIL_FROM}`,
      to: email,
      subject: "Welcome to RentHouse! 🎉",
      html: emailTemplate({
        base_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
        support_email: "renthousek@gmail.com",
        // idenntifer first name
        first_name: user.name.split(" ")[0],
      }),
    });
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};

// pages/api/auth/[...nextauth].js
export const authOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    EmailProvider({
      maxAge: 10 * 60, // Magic links are valid for 10 min only
      sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  events: { createUser: sendWelcomeEmail },
};

export default NextAuth(authOptions);

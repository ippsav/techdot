import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Session } from "express-session";

interface SessionData {
  userId: string;
}

export interface MyContext {
  prisma: PrismaClient;
  req: Request & { session: Session & SessionData };
  res: Response;
}

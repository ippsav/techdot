import "dotenv-safe/config";
import * as express from "express";
import { PrismaClient } from "prisma";

const prisma = new PrismaClient();
const { PORT } = process.env;

const main = async () => {
  const app = express();

  app.listen(PORT, () => {
    console.log("server running at port ", PORT);
  });
};

main().catch((err) => {
  console.log(err.message);
});

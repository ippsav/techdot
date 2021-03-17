import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { UserResolver } from "./resolvers/user";
import { EventResolver } from "./resolvers/event";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";

const prisma = new PrismaClient();
const { PORT, REDIS_SECRET } = process.env;

const main = async () => {
  const app = express();
  const redisClient = redis.createClient();
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
      saveUninitialized: false,
      secret: REDIS_SECRET as string,
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, EventResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      prisma,
      req,
      res,
    }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log("server running at port ", PORT);
  });
};

main().catch((err) => {
  console.log(err.message);
});

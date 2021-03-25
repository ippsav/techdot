import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../utils/Context";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const { userId } = context.req.session;
  if (!userId) {
    throw new Error("not authenticated");
  }
  return next();
};

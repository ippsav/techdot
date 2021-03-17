import argon2 from "argon2";
import { MyContext } from "src/utils/Context";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { isEmail } from "../utils/isEmail";
@InputType()
class UserInputLogin {
  @Field()
  usernameOrEmail: string;
  @Field()
  password: string;
}

@InputType()
class UserInputRegister {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
// @InputType()
// class UserInputRegister extends UserInputPassword {
//   @Field()
//   email: string;
// }

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { prisma, req }: MyContext): Promise<User | null> {
    console.log(req.session.userId);
    if (typeof req.session.userId === "undefined") {
      throw new Error("not authenticated");
    }
    const { userId } = req.session;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("qid not valid");
    }
    return user;
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInputRegister,
    @Ctx() { req, prisma }: MyContext
  ): Promise<UserResponse> {
    const { username, password, email } = options;
    if (username.length < 3) {
      return {
        errors: [
          {
            field: "username",
            message: "username must be longer than 2 characters",
          },
        ],
      };
    }
    if (!isEmail(email)) {
      return {
        errors: [
          {
            field: "email",
            message: "not a valid format",
          },
        ],
      };
    }
    if (password.length < 4) {
      return {
        errors: [
          {
            field: "password",
            message: "password must be longer than 3 characters",
          },
        ],
      };
    }
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });
    if (user?.username === username) {
      return {
        errors: [
          {
            field: "username",
            message: "username already taken",
          },
        ],
      };
    } else if (user?.email === email) {
      return {
        errors: [
          {
            field: "email",
            message: "email already taken",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    req.session.userId = user.id;
    return {
      user,
    };
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserInputLogin,
    @Ctx() { prisma, req }: MyContext
  ): Promise<UserResponse> {
    const { usernameOrEmail, password } = options;
    if (usernameOrEmail.includes("@") && !isEmail(usernameOrEmail)) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "wrong email format",
          },
        ],
      };
    }
    const user = await prisma.user.findUnique({
      where: isEmail(usernameOrEmail)
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "user not found",
          },
        ],
      };
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return {
        errors: [
          {
            field: "password",
            message: "wrong password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return {
      user,
    };
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err.message);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}

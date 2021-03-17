import argon2 from "argon2";
import { MyContext } from "src/utils/Context";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { isEmail } from "../utils/isEmail";
import { User } from "../entities/User";

@InputType()
class UserInputPassword {
  @Field()
  username: string;
  @Field()
  password: string;
}
@InputType()
class UserInputRegister extends UserInputPassword {
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
    @Arg("options") options: UserInputPassword,
    @Ctx() { prisma, req }: MyContext
  ): Promise<UserResponse> {
    const { username, password } = options;
    let user = null;
    if (username.includes("@")) {
      user = await prisma.user.findUnique({
        where: {
          email: username,
        },
      });
      if (!user) {
        return {
          errors: [
            {
              field: "email",
              message: "email not found",
            },
          ],
        };
      }
    } else {
      user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        return {
          errors: [
            {
              field: "username",
              message: "username not found",
            },
          ],
        };
      }
    }

    const isMatch = argon2.verify(user!.password, password);
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

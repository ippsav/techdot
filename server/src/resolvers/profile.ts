import { Profile } from "../entities/Profile";
import { MyContext } from "src/utils/Context";
import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  Field,
  InputType,
  UseMiddleware,
} from "type-graphql";
import { Upload } from "src/utils/types";
import { GraphQLUpload } from "graphql-upload";
import { v4 } from "uuid";
import { createWriteStream } from "fs";
import { isAuth } from "../middlewares/Auth";

@InputType()
class ProfileArgs {
  @Field(() => GraphQLUpload, { nullable: true })
  avatar: Upload;
  @Field(() => String, { nullable: true })
  bio: string | null;
}

@Resolver(Profile)
export class ProfileResolver {
  @UseMiddleware(isAuth)
  @Query(() => Profile, { nullable: true })
  async profile(@Ctx() { req, prisma }: MyContext): Promise<Profile | null> {
    const { userId } = req.session;
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
    return profile;
  }
  @UseMiddleware(isAuth)
  @Mutation(() => Profile)
  async updateProfile(
    @Ctx() { prisma, req }: MyContext,
    @Arg("options") options: ProfileArgs
  ): Promise<Profile> {
    const { userId } = req.session;
    const { avatar, bio } = options;
    const validOptions: Record<string, string> = {};
    if (avatar) {
      const { createReadStream, mimetype } = await avatar;
      const extension = mimetype.split("/")[1];
      const idFilename = v4();
      validOptions.avatar = `http://localhost:7001/images/${userId}/${idFilename}.${extension}`;
      await createReadStream().pipe(
        createWriteStream(
          __dirname + `/../images/${userId}/${idFilename}.${extension}`
        )
      );
    }
    if (bio) {
      validOptions.bio = bio;
    }
    try {
      const profile = await prisma.profile.update({
        where: {
          userId,
        },
        data: {
          ...validOptions,
        },
        include: {
          user: true,
        },
      });
      return profile;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

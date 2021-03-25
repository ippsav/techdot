import { Event } from "../entities/Event";
import { MyContext } from "src/utils/Context";
import dayjs from "dayjs";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "src/utils/types";
import { createWriteStream } from "fs";

import { isAuth } from "../middlewares/Auth";
import { v4 } from "uuid";

@InputType()
class EventFields {
  @Field()
  name: string;
  @Field()
  eventDate: string;
  @Field()
  location: string;
  @Field(() => GraphQLUpload)
  picture: Upload;
  @Field()
  capacity: number;
  @Field()
  endingHour: number;
  @Field()
  startingHour: number;
}

@Resolver(Event)
export class EventResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Event)
  async createEvent(
    @Arg("options") options: EventFields,
    @Ctx() { prisma, req }: MyContext
  ): Promise<Event> {
    const { eventDate, picture } = options;
    const { userId } = req.session;
    const { createReadStream, mimetype } = await picture;
    const extension = mimetype.split("/")[1];
    const date = dayjs(eventDate).toDate();
    const idFilename = v4();
    await createReadStream().pipe(
      createWriteStream(
        __dirname + `/../images/${userId}/events/${idFilename}.${extension}`
      )
    );
    const pictureUrl = `http://localhost:7001/images/${userId}/events/${idFilename}.${extension}`;
    // const event = await prisma.event.create({
    //   data: {
    //     name,
    //     eventDate: date,
    //     capacity,
    //     location,
    //     startingHour,
    //     endingHour,
    //     picture: pictureUrl,
    //   },
    // });
    const event = await prisma.event.create({
      data: {
        ...options,
        eventDate: date,
        picture: pictureUrl,
        userId,
      },
    });
    return event;
  }
  @UseMiddleware(isAuth)
  @Query(() => [Event])
  async events(@Ctx() { prisma }: MyContext): Promise<Event[] | null> {
    const events = await prisma.event.findMany({});
    return events;
  }
  @UseMiddleware(isAuth)
  @Query(() => Event)
  async event(
    @Arg("id") id: string,
    @Ctx() { prisma }: MyContext
  ): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });
    return event;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteEvent(
    @Arg("id") id: string,
    @Ctx() { prisma }: MyContext
  ): Promise<Boolean> {
    try {
      await prisma.event.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

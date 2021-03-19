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
} from "type-graphql";

@InputType()
class EventFields {
  @Field()
  name: string;
  @Field()
  eventDate: string;
  @Field()
  location: string;
}

@Resolver(Event)
export class EventResolver {
  @Mutation(() => Event)
  async createEvent(
    @Arg("options") options: EventFields,
    @Ctx() { prisma }: MyContext
  ): Promise<Event> {
    const { eventDate, name, location } = options;
    const date = dayjs(eventDate).toDate();
    const event = await prisma.event.create({
      data: {
        name,
        eventDate: date,
        location,
      },
    });
    return event;
  }
  @Query(() => [Event])
  async events(
    @Arg("name") name: string,
    @Ctx() { prisma }: MyContext
  ): Promise<Event[] | null> {
    const events = await prisma.event.findMany({
      where: {
        name,
      },
    });
    return events;
  }
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

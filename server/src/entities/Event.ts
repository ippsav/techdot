import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Event {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  location: string;
  @Field()
  picture: string;
  @Field(() => String)
  eventDate: Date;
  @Field()
  capacity: number;
  @Field()
  startingHour: number;
  @Field()
  userId: string;
  @Field()
  endingHour: number;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}

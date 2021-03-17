import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Event {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field(() => String)
  eventDate: Date;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}

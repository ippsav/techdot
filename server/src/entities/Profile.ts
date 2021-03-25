import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Profile {
  @Field()
  id: string;
  @Field(() => String, { nullable: true })
  avatar: string | null;
  @Field(() => String, { nullable: true })
  bio: string | null;
  @Field()
  userId: string;
  @Field()
  user: User;
}

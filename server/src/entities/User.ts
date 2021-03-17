import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  email: string;
  password: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}

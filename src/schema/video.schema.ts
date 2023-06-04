import { Field, InputType, ObjectType } from "type-graphql";
import { BaseModel } from "./model.schema";
import { getModelForClass, prop as Prop, Ref } from "@typegoose/typegoose";
import PaginatedResponse from "./pagination.schema";
import { MaxLength, MinLength } from "class-validator";
import { User } from "./user.schema";
import { Types } from "mongoose";

@ObjectType()
export class Video extends BaseModel {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field(() => User)
  @Prop({ ref: User, required: true })
  user: Ref<User, Types.ObjectId>;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class VideoInput {
  @Field()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @Field()
  @MinLength(3)
  @MaxLength(500)
  description: string;
}

@ObjectType()
export class PaginatedVideoResponse extends PaginatedResponse(Video) {}

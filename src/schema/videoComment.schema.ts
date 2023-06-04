import { Field, InputType, ObjectType } from "type-graphql";
import { BaseModel } from "./model.schema";
import { getModelForClass, prop as Prop, Ref } from "@typegoose/typegoose";
import PaginatedResponse from "./pagination.schema";
import { MaxLength, MinLength } from "class-validator";
import { User } from "./user.schema";
import { Types } from "mongoose";
import { Video } from "./video.schema";

@ObjectType()
export class VideoComment extends BaseModel {
  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => User)
  @Prop({ ref: User, required: true })
  user: Ref<User, Types.ObjectId>;

  @Field(() => Video)
  @Prop({ ref: Video, required: true })
  video: Ref<Video, Types.ObjectId>;
}

export const VideoCommentModel = getModelForClass(VideoComment, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class VideoCommentInput {
  @Field()
  @MinLength(3)
  @MaxLength(500)
  content: string;
}

@ObjectType()
export class PaginatedVideoCommentResponse extends PaginatedResponse(
  VideoComment
) {}

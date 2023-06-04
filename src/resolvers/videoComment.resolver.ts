import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  Ctx,
} from "type-graphql";
import { PaginationInput } from "../schema/pagination.schema";
import { Context } from "../types/context";
import {
  PaginatedVideoCommentResponse,
  VideoComment,
  VideoCommentInput,
  VideoCommentModel,
} from "../schema/videoComment.schema";
import { VideoCommentService } from "../services/videoComment.service";

@Resolver()
export class VideoCommentResolver {
  constructor(private videoCommentService: VideoCommentService) {
    this.videoCommentService = new VideoCommentService();
  }

  @Query(() => PaginatedVideoCommentResponse)
  async videoComments(
    @Args() paginatedInput: PaginationInput,
    @Arg("_videoId") _videoId: string
  ): Promise<PaginatedVideoCommentResponse> {
    return this.videoCommentService.getVideoComments(paginatedInput, _videoId);
  }

  @Query(() => VideoComment)
  async videoComment(@Arg("_id") _id: string): Promise<VideoComment> {
    return this.videoCommentService.getVideoComment(_id);
  }

  @Mutation(() => VideoComment)
  async createVideoComment(
    @Ctx() { user }: Context,
    @Arg("_videoId") _videoId: string,
    @Arg("videoComment") videoComment: VideoCommentInput
  ): Promise<VideoComment> {
    return this.videoCommentService.createVideoComment(
      videoComment,
      user._id,
      _videoId
    );
  }

  @Mutation(() => VideoComment)
  async deleteVideoComment(
    @Ctx() { user }: Context,
    @Arg("_id") _id: string
  ): Promise<VideoComment> {
    const videoCommentToDelete = await this.videoCommentService.getVideoComment(
      _id
    );
    console.log(videoCommentToDelete);
    if (!videoCommentToDelete.user._id.equals(user._id)) {
      console.log("Nope.");
      return;
    }
    return this.videoCommentService.deleteVideoComment(_id);
  }

  @Mutation(() => VideoComment)
  async updateVideoComment(
    @Arg("_id") _id: string,
    @Arg("videoComment") videoComment: VideoCommentInput
  ): Promise<VideoComment> {
    return this.videoCommentService.updateVideoComment(_id, videoComment);
  }
}

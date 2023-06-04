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
import { UserRole } from "../enums/user-role";
import { VideoService } from "../services/video.service";
import {
  Video,
  VideoInput,
  PaginatedVideoResponse,
  VideoModel,
} from "../schema/video.schema";
import { Context } from "../types/context";

@Resolver()
export class VideoResolver {
  constructor(private videoService: VideoService) {
    this.videoService = new VideoService();
  }

  @Query(() => PaginatedVideoResponse)
  async videos(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedVideoResponse> {
    return this.videoService.getVideos(paginatedInput);
  }

  @Query(() => Video)
  async video(@Arg("_id") _id: string): Promise<Video> {
    return this.videoService.getVideo(_id);
  }

  @Mutation(() => Video)
  async createVideo(
    @Ctx() { user }: Context,
    @Arg("video") video: VideoInput
  ): Promise<Video> {
    return this.videoService.createVideo(video, user._id);
  }

  @Mutation(() => Video)
  async deleteVideo(
    @Ctx() { user }: Context,
    @Arg("_id") _id: string
  ): Promise<Video> {
    const videoToDelete = VideoModel.findById(_id);
    if (videoToDelete.user._id !== user._id) {
      console.log("Nope.");
      return;
    }
    return this.videoService.deleteVideo(_id);
  }

  @Mutation(() => Video)
  async updateVideo(
    @Arg("_id") _id: string,
    @Arg("video") video: VideoInput
  ): Promise<Video> {
    return this.videoService.updateVideo(_id, video);
  }
}

import { PaginationInput } from "../schema/pagination.schema";
import { PaginationService } from "./pagination.service";
import { VideoInput, VideoModel } from "../schema/video.schema";
import { Types } from "mongoose";

export class VideoService {
  async getVideos(paginatedInput: PaginationInput) {
    const paginationServices = new PaginationService({
      model: VideoModel,
      populate: "user",
    });
    return paginationServices.getPaginatedItems(paginatedInput);
  }
  async getVideo(_id: string) {
    return VideoModel.findById(_id).populate("user").lean();
  }
  async createVideo(video: VideoInput, user: Types.ObjectId) {
    const videoWithUser = { ...video, user };
    const createdVideo = await VideoModel.create(videoWithUser);
    return createdVideo.populate("user");
  }
  async deleteVideo(_id: string) {
    return VideoModel.findByIdAndRemove(_id).populate("user");
  }
  async updateVideo(_id: string, video: VideoInput) {
    return VideoModel.findByIdAndUpdate(_id, video, { new: true }).populate(
      "user"
    );
  }
}

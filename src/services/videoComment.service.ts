import { PaginationInput } from "../schema/pagination.schema";
import { PaginationService } from "./pagination.service";
import { Types } from "mongoose";
import {
  VideoCommentInput,
  VideoCommentModel,
} from "../schema/videoComment.schema";

export class VideoCommentService {
  async getVideoComments(paginatedInput: PaginationInput, videoId: string) {
    const paginationServices = new PaginationService({
      model: VideoCommentModel,
      populate: "user video",
      filter: { video: videoId },
    });
    return paginationServices.getPaginatedItems(paginatedInput);
  }
  async getVideoComment(_id: string) {
    return VideoCommentModel.findById(_id).populate("user video").lean();
  }
  async createVideoComment(
    videoComment: VideoCommentInput,
    user: Types.ObjectId,
    video: string
  ) {
    const videoCommentWithUserAndVideo = { ...videoComment, user, video };
    const createdVideoComment = await VideoCommentModel.create(
      videoCommentWithUserAndVideo
    );
    return createdVideoComment.populate("user video");
  }
  async deleteVideoComment(_id: string) {
    return VideoCommentModel.findByIdAndRemove(_id).populate("user video");
  }
  async updateVideoComment(_id: string, videoComment: VideoCommentInput) {
    return VideoCommentModel.findByIdAndUpdate(_id, videoComment, {
      new: true,
    }).populate("user video");
  }
}

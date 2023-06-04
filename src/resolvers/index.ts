import { UserResolver } from "./user.resolver";
import { VideoResolver } from "./video.resolver";
import { VideoCommentResolver } from "./videoComment.resolver";
export const resolvers = [
  UserResolver,
  VideoResolver,
  VideoCommentResolver,
] as const;

import { UserResolver } from "./user.resolver";
import { VideoResolver } from "./video.resolver";
export const resolvers = [UserResolver, VideoResolver] as const;

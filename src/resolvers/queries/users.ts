import { User } from "../../entity/User";
import { QueryResolvers } from "../../generated/graphql";

export const users: QueryResolvers["users"] = async () => User.find();

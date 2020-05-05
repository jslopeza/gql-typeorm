import { MutationResolvers } from "../../generated/graphql";

export const signout: MutationResolvers["signout"] = (_, __, { res }) => {
  res.clearCookie("token");

  return { message: "Good bye" };
};

import { QueryResolvers } from "../../generated/graphql";

export const me: QueryResolvers["me"] = (_, __, { req }) => {
  if (!req.user) {
    return null;
  }

  return req.user;
};

import { getRepository } from "typeorm";

import { User } from "../../entity/User";
import { MutationResolvers, Permission } from "../../generated/graphql";
import hasPermission from "../../helpers/hasPermission";

export const updatePermissions: MutationResolvers["updatePermissions"] = async (
  _,
  { permissions, userId },
  { req }
) => {
  if (!req.user) {
    throw new Error("You must be logged in!");
  }

  hasPermission(req.user, [Permission.Admin, Permission.Premissionupdate]);

  const {
    raw: [user],
  } = await getRepository(User)
    .createQueryBuilder("user")
    .update()
    .set({ permissions })
    .where("id = :id", { id: userId })
    .returning("*")
    .execute();

  return user;
};

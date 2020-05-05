import { getRepository } from "typeorm";

import { Item } from "../../entity/Item";
import { MutationResolvers } from "../../generated/graphql";

export const updateItem: MutationResolvers["updateItem"] = async (
  _,
  { id, ...args }
) => {
  const {
    raw: [result],
  } = await getRepository(Item)
    .createQueryBuilder("item")
    .update()
    .set(args)
    .where("id = :id", { id })
    .returning("*")
    .execute();

  return result;
};

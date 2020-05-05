import { getRepository } from "typeorm";

import { Item } from "../../entity/Item";
import { MutationResolvers } from "../../generated/graphql";

export const createItem: MutationResolvers["createItem"] = async (
  _,
  args,
  { req }
) => {
  if (!req.userId) {
    throw new Error("You must be logged in to do that!");
  }

  // const user = await User.findOne({ where: { id: req.userId } });

  // const item = Item.create(args);
  // item.user = user;

  // return item.save();

  const {
    raw: [insertedItem],
  } = await getRepository(Item)
    .createQueryBuilder("item")
    .insert()
    .values({
      ...args,
      user: {
        id: req.userId,
      },
    })
    .returning("*")
    .execute();

  return insertedItem;
};

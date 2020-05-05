import { Item } from "../../entity/Item";
import { QueryResolvers } from "../../generated/graphql";

export const item: QueryResolvers["item"] = async (_, { id }) => {
  const item = await Item.find({ where: { id }, relations: ["user"] });

  return item[0];
};

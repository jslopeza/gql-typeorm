import { Item } from "../../entity/Item";
import { QueryResolvers } from "../../generated/graphql";

export const itemsConnection: QueryResolvers["itemsConnection"] = async () => {
  const count = await Item.count();

  return { aggregate: { count } };
};

import { Item } from "../../entity/Item";
import { QueryResolvers } from "../../generated/graphql";

export const items: QueryResolvers["items"] = (
  _,
  { orderBy = "createdAt_asc", skip, first }
) => {
  const [field, dir] = orderBy.split("_");

  return Item.find({
    skip,
    take: first,
    order: {
      [field]: dir,
    },
    relations: ["user"],
  });
};

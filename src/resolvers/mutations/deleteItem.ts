import { Item } from "../../entity/Item";
import { MutationResolvers, Permission } from "../../generated/graphql";

export const deleteItem: MutationResolvers["deleteItem"] = async (
  _,
  { id },
  { req }
) => {
  const [item] = await Item.find({ where: { id }, relations: ["user"] });

  const ownsItem = item.user.id === req.userId;
  const hasPermission = req.user.permissions.some((permission) =>
    [Permission.Admin, Permission.Itemdelete].includes(permission)
  );

  if (!ownsItem && !hasPermission) {
    throw new Error("You don't have permission to do that!");
  }

  await Item.delete({ id });

  return { id };
};

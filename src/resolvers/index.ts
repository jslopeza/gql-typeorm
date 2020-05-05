import { Resolvers } from "../generated/graphql";
import {
  createItem,
  deleteItem,
  requestReset,
  resetPassword,
  signin,
  signout,
  signup,
  updateItem,
  updatePermissions,
} from "./mutations";
import { item, items, itemsConnection, me, users } from "./queries";

const resolvers: Resolvers = {
  Query: {
    items,
    item,
    itemsConnection,
    me,
    users,
  },
  Mutation: {
    createItem,
    updateItem,
    deleteItem,
    signup,
    signin,
    signout,
    requestReset,
    resetPassword,
    updatePermissions,
  },
};

export default resolvers;

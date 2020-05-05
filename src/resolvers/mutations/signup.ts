import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../entity/User";
import { MutationResolvers, Permission } from "../../generated/graphql";

export const signup: MutationResolvers["signup"] = async (
  _,
  { password, ...args },
  { res }
) => {
  const hashed = await bcrypt.hash(password, 12);

  const user = User.create({
    ...args,
    password: hashed,
  });

  user.permissions = [Permission.User];

  const savedUser = await user.save();

  const token = jwt.sign({ userId: savedUser.id }, process.env.APP_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return savedUser;
};

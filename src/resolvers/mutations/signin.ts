import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../entity/User";
import { MutationResolvers } from "../../generated/graphql";

export const signin: MutationResolvers["signin"] = async (
  _,
  { email, password },
  { res }
) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error(`Invalid password`);
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return user;
};

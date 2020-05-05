import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository, MoreThanOrEqual } from "typeorm";

import { User } from "../../entity/User";
import { MutationResolvers } from "../../generated/graphql";

export const resetPassword: MutationResolvers["resetPassword"] = async (
  _,
  { token, password, confirmPassword },
  { res }
) => {
  if (password !== confirmPassword) {
    throw new Error("Yo Password don't match!");
  }

  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiry: MoreThanOrEqual((Date.now() - 3600000).toString()),
    },
  });

  if (!user) {
    throw new Error("This token is either invalid or expired");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const {
    raw: [updatedUser],
  } = await getRepository(User)
    .createQueryBuilder("user")
    .update(User)
    .where("id = :id", { id: user.id })
    .set({ password: hashedPassword, resetToken: null, resetTokenExpiry: null })
    .returning("*")
    .execute();

  const jwtToken = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

  res.cookie("token", jwtToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return updatedUser;
};

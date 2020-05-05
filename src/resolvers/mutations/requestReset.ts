import { randomBytes } from "crypto";
import { promisify } from "util";

import { User } from "../../entity/User";
import { MutationResolvers } from "../../generated/graphql";
import { makeANiceEmail, transport } from "../../helpers/mail";

const randomBytesPromise = promisify(randomBytes);

export const requestReset: MutationResolvers["requestReset"] = async (
  _,
  { email }
) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error(`No user with ${email} found`);
  }

  const resetToken = (await randomBytesPromise(20)).toString("hex");
  const resetTokenExpiry = (Date.now() + 3600000).toString();

  await User.update({ id: user.id }, { resetToken, resetTokenExpiry });

  await transport.sendMail({
    from: "me@binoy.io",
    to: user.email,
    subject: "Your Password Reset",
    html: makeANiceEmail(`Your Password Reset Token is here!
      \n\n

      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to Reset</a>
    `),
  });

  return { message: "Thanks!" };
};

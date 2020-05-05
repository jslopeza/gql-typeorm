import { User } from "../generated/graphql";

function hasPermission(user: User, permissionNeeded: string[]) {
  const matchedPermissions = user.permissions.filter((permissionsTheyHave) =>
    permissionNeeded.includes(permissionsTheyHave)
  );

  if (!matchedPermissions.length) {
    throw new Error(
      `You do not have sufficient permissions : ${permissionNeeded} You have: ${user.permissions}`
    );
  }
}

export default hasPermission;

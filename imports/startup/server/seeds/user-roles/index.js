/* -------------------------------------------------------------------------- */
/*                            User roles seed function                        */
/* -------------------------------------------------------------------------- */

// Lib dependencikes
import { Roles } from 'meteor/alanning:roles';

// Seeds archive
import * as archive from './user-roles.json';

const seedUserRoles = () => {
  const userRoles = archive['user-roles'];

  userRoles.forEach(function ({ identifier: userRole, permissions }) {
    // Create user Role
    Roles.createRole(userRole, {
      unlessExists: true,
    });

    // For each role grant its permissions
    permissions?.forEach(function (permission) {
      Roles.addRolesToParent(permission, userRole);
    });
  });

  console.log('[seed/user-roles]'.verbose, `Seeded ${userRoles.length} roles`);
};

export default seedUserRoles;

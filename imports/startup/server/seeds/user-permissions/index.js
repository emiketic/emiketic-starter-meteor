/* -------------------------------------------------------------------------- */
/*                            User roles seed function                        */
/* -------------------------------------------------------------------------- */

// Lib dependencikes
import { Roles } from 'meteor/alanning:roles';

// Seeds archive
import * as archive from './user-permissions.json';

const seedAccessPermissions = () => {
  const accessPermissions = archive['user-permissions'];

  Roles.createRole('unrestricted', {
    unlessExists: true,
  });

  accessPermissions.forEach(function ({ topic, permissions }) {
    // Permissions group pool
    Roles.createRole(topic, {
      unlessExists: true,
    });

    const permissionsGroup = permissions.map(function (permission) {
      // Bind permission to its topics
      const permissionBoundToTopic = `${topic}.${permission}`;
      Roles.createRole(permissionBoundToTopic, {
        unlessExists: true,
      });
      return permissionBoundToTopic;
    });

    // Link roles to permission's tree
    Roles.addRolesToParent(permissionsGroup, topic);

    // Grant all permission's group to role "unrestricted"
    Roles.addRolesToParent(topic, 'unrestricted');
  });

  console.log(
    '[seed/user-permissions]'.verbose,
    `Seeded ${accessPermissions.length} permissions`,
  );
};

export default seedAccessPermissions;

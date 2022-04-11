/* -------------------------------------------------------------------------- */
/*                             User seed function                             */
/* -------------------------------------------------------------------------- */

// Lib dependencikes
import { Accounts } from 'meteor/accounts-base';

// Seeds archive
import * as archive from './users.json';

const seedUsers = () => {
  let counter = 0;
  archive.users.forEach((u) => {
    if (!Accounts.findUserByEmail(u.email)) {
      try {
        Accounts.createUser({
          email: u.email,
          password: u.password,
          profile: {
            firstName: u.firstName,
            lastName: u.lastName,
          },
        });
      } catch (error) {
        console.log('[seed/users]'.error, `Could not seed user ${u.email}`);
      }
      counter += 1;
    }
  });
  console.log('[seed/users]'.verbose, `Seeded ${counter} user(s)`);
};

export default seedUsers;

/* -------------------------------------------------------------------------- */
/*                              App seed function                             */
/* -------------------------------------------------------------------------- */

// Lib dependencies
import { Meteor } from 'meteor/meteor';

// Seed functions by feature
import seedUsers from './users/';

Meteor.startup(() => {
  console.log('[seed/init]'.verbose, 'Initializing seed...');
  seedUsers();
});

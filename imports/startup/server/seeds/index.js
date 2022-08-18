/* -------------------------------------------------------------------------- */
/*                              App seed function                             */
/* -------------------------------------------------------------------------- */

// Lib dependencies
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Seed functions by feature
import seedUserPermissions from './user-permissions';
import seedUserRoles from './user-roles';
import seedUsers from './users/';

Meteor.startup(() => {
  console.log('[seed/init]'.verbose, 'Initializing seed...');
  Meteor.settings.seeds.overwriteCollectionsOnRestart.forEach(
    (collectionName) => {
      console.log(
        '[seed/reset]'.verbose,
        `Resetting collection ${collectionName}`,
      );
      const collection = Mongo.Collection.getAll().find(
        (c) => c.name === collectionName,
      );
      if (collection) {
        collection.instance.remove({});
      }
    },
  );
  seedUserPermissions();
  seedUserRoles();
  seedUsers();
});

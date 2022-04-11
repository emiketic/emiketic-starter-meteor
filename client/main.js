/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */
// Lib dependencies
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import i18n from 'meteor/universe:i18n';

// Local entry point depenencies
import App from '../imports/ui/App';

// Style dependencies
import 'antd/dist/antd.less';

i18n.setLocale('en-US');

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});

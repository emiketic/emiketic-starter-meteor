/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Lib dependencies
import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

// UI lib dependencies
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Local hooks & helpers
import { useAccount } from '../../../shared/helpers/auth';

// Style
import './index.less';

// Scoped components
const { Item, Divider } = Menu;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
function UserMenu() {
  /* ***************************** LOCAL VARIABLES **************************** */

  const account = useAccount();
  const { user } = account;

  const T = i18n.createComponent(i18n.createTranslator('MainLayout'));

  /* ******************************** CALLBACKS ******************************* */

  /**
   * Handles click for menu item clicks
   */
  function onClickMenuItem({ key }) {
    switch (key) {
      case 'logout':
        Meteor.logout();
        break;
      case 'settings':
        break;
      default:
        break;
    }
  }

  /* ***************************** RENDER HELPERS ***************************** */

  /**
   * Renders the items that will go within the menu list
   * @returns {Element} Instance of antd's `Menu`
   */
  function getMenuItems() {
    return (
      <Menu
        onClick={function cb(e) {
          onClickMenuItem(e);
        }}
      >
        <Item key="settings">
          <T>UserMenu.settings</T>
        </Item>
        <Divider />
        <Item key="logout">
          <T>UserMenu.logout</T>
        </Item>
      </Menu>
    );
  }

  function getAvatar() {
    const pictureUrl = user.profile?.pictureUrl;
    if (pictureUrl) {
      return <Avatar src={pictureUrl} />;
    }
    const initials = `${(user?.profile?.firstName?.[0] ?? 'E').toUpperCase()}${(
      user?.profile?.lastName?.[0] ?? 'M'
    ).toUpperCase()}`;
    return (
      <Avatar
        className="avatar"
        alt={`${user.profile?.firstName} ${user.profile?.firstName}`}
      >
        {initials}
      </Avatar>
    );
  }

  /* ******************************** RENDERING ******************************* */
  if (!user) {
    return <Avatar icon={<UserOutlined />} />;
  }
  return (
    <Dropdown
      className="user-menu"
      placement="bottomLeft"
      overlay={getMenuItems()}
    >
      {getAvatar()}
    </Dropdown>
  );
}

export default UserMenu;

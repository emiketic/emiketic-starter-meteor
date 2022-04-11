/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React from 'react';
import { Outlet } from 'react-router-dom';

// UI lib components
import { Layout, Row, Col, Menu, Breadcrumb, Divider, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// UI local components
import UserMenu from '../../features/Account/UserMenu';

// Assets
import './index.less';

// Scoped components
const { Header, Content, Sider, Footer } = Layout;
const { SubMenu, Item } = Menu;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

function MainLayout() {
  /* ******************************** RENDERING ******************************* */
  return (
    <Content className="main-layout">
      <Layout>
        <Sider className="sider" collapsible>
          <Row justify="center">
            <Col>
              <Avatar
                src="images/emiketic-logo-legacy.png"
                shape="square"
                size="large"
                alt="EMIKETIC logo"
              />
            </Col>
          </Row>
          <Divider />
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Item key="1">User 1</Item>
              <Item key="2">User 2</Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">
            <Row justify="end">
              <Col>
                <UserMenu />
              </Col>
            </Row>
          </Header>
          <Content className="content">
            <Breadcrumb className="breadcrumbs">
              <Breadcrumb.Item>User 1</Breadcrumb.Item>
              <Breadcrumb.Item>User 2</Breadcrumb.Item>
            </Breadcrumb>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Content>
  );
}

export default MainLayout;

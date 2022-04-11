/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Lib dependencies
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// UI lib components
import { Layout } from 'antd';

// Local hooks and helpers
import { useAccount } from '../../shared/helpers/auth';

// Scoped components
const { Content } = Layout;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

function GateLayout() {
  /* ********************************** HOOKS ********************************* */

  const account = useAccount();
  const { isLoggedIn } = account;
  const navigate = useNavigate();

  /* ******************************** RENDERING ******************************* */
  if (isLoggedIn) {
    navigate('/home');
  }
  return (
    <Content className="gate-layout">
      <Outlet />
    </Content>
  );
}

export default GateLayout;

// Packages
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Local UI components
import { PermissionRoute } from '../shared/helpers/auth';

// Layouts
import GateLayout from '../layouts/GateLayout';
import MainLayout from '../layouts/MainLayout';

// Pages
import LoginPage from '../features/Session/LoginPage';

function MainRouter() {
  /* ******************************** RENDERING ******************************* */

  return (
    <Routes>
      <Route path="login" element={<GateLayout />}>
        <Route path="" element={<LoginPage />} />
      </Route>
      <Route
        path="home"
        element={
          <PermissionRoute redirectPath="/login">
            <MainLayout />
          </PermissionRoute>
        }
      />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default MainRouter;

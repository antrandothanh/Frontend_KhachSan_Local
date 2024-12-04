import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from './CustomerHeader';
import Footer from '../Footer';;



function Layout() {
  return (
    <div>
      <CustomerHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;

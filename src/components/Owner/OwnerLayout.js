import React from 'react';
import { Outlet } from 'react-router-dom';
import OwnerHeader from './OwnerHeader';
import Footer from '../Footer';;



function OwnerLayout() {
  return (
    <div>
      <OwnerHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export default OwnerLayout;

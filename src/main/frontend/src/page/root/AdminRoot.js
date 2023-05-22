import {Outlet} from "react-router-dom";

import AdminHeader from "../../component/AdminHeader";
import AdminSidebar from "../../component/AdminSidebar";
import classes from '../css/AdminRoot.module.css';

const RootLayout = () => {

  return (
    <>
      <AdminHeader />
      <main className={`${classes['admin-main']}`}>
        <AdminSidebar />
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
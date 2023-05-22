import {Outlet} from "react-router-dom";

import AdminHeader from "../../component/AdminHeader";
import AdminSidebar from "../../component/AdminSidebar";

const RootLayout = () => {

  return (
    <>
      <AdminHeader />
      <main>
        <AdminSidebar />
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
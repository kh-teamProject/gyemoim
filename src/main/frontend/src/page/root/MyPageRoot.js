import {Outlet} from "react-router-dom";

const MyPageRootLayout = () => {

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MyPageRootLayout;
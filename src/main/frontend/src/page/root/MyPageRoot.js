import {Outlet} from "react-router-dom";

import classes from '../css/MyPageRoot.module.css';

const MyPageRootLayout = () => {

  return (
    <>
      <main className={classes.container}>
        <Outlet />
      </main>
    </>
  );
};

export default MyPageRootLayout;
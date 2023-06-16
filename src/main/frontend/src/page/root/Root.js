import {useEffect, useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {FaHome} from "react-icons/fa";

import Header from "../../component/Header";
import Footer from "../../component/Footer";
import classes from '../css/Root.module.css';
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const RootLayout = () => {
  const [adminCheck, setAdminCheck] = useState(false);
  const [myInfo, setMyInfo] = useState({uNo: 0});

  return (
    <>
      {
        adminCheck &&
        <div className={`${classes['admin-bar']}`}>
          <p>{myInfo.name} 관리자님 환영합니다.</p>
          <div className={`${classes['link-wrap']}`}>
            <NavLink to={'/admin'}>
              관리자 홈
              <FaHome/>
            </NavLink>
          </div>
        </div>
      }
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default RootLayout;
import {useEffect, useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {FaHome} from "react-icons/fa";

import Header from "../../component/Header";
import Footer from "../../component/Footer";
import classes from '../css/Root.module.css';

const RootLayout = () => {
  const [adminCheck, setAdminCheck] = useState(false);
  let uNo, name;

  if (Cookies.get('Set-Cookie')) {
    const token = Cookies.get('Set-Cookie');
    uNo = jwtDecode(token).uNo;
    name = jwtDecode(token).name;
  }

  useEffect(() => {
    if (uNo !== undefined) {
      axios.get('/mypage', {
        params: {
          uNo
        }
      })
        .then((res) => {
          setAdminCheck(res.data.userRole === '관리자');
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, []);

  return (
    <>
      {
        adminCheck &&
        <div className={`${classes['admin-bar']}`}>
          <p>{name} 관리자님 환영합니다.</p>
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
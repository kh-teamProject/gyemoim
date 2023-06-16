import {FaSignOutAlt} from 'react-icons/fa';
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import classes from './css/AdminHeader.module.css';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.remove("Set-Cookie");
    dispatch({type: "logout"});
    navigate("/");
  }

  return (
    <>
      <header className={`${classes['adminHeader-wrap']}`}>
        <div>
          <p>민재홍(관리자)</p>
          <span onClick={logoutHandler} style={{cursor: 'pointer'}}><FaSignOutAlt /></span>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
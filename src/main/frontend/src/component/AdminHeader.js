import {FaSignOutAlt} from 'react-icons/fa';
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import classes from './css/AdminHeader.module.css';
import jwtDecode from "jwt-decode";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.remove("Set-Cookie");
    dispatch({type: "logout"});
    navigate("/");
  }

  const token = Cookies.get('Set-Cookie');
  const name = jwtDecode(token).name;

  return (
    <>
      <header className={`${classes['adminHeader-wrap']}`}>
        <div>
          <p>{name}(관리자)</p>
          <span><FaSignOutAlt /></span>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
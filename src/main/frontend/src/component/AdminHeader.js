import {FaSignOutAlt} from 'react-icons/fa';

import classes from './css/AdminHeader.module.css';
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const AdminHeader = () => {

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
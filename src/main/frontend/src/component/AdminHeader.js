import {FaSignOutAlt} from 'react-icons/fa';

import classes from './css/AdminHeader.module.css';

const AdminHeader = () => {

  return (
    <>
      <header className={`${classes['adminHeader-wrap']}`}>
        <div>
          <p>민재홍(관리자)</p>
          <span><FaSignOutAlt /></span>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
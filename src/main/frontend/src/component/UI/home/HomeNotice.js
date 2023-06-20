import {Link, useLocation} from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

import moment from 'moment';

import classes from '../../../page/css/Home.module.css';

const HomeNotice = (props) => {
  const noticeItems = props.noticeList.map((notice, index) => (
    <div key={index} className={classes.noticeBox}>
      <Link to={`/board/notice/detail/${notice.bid}`} key={index}>
      <>
        <div className={classes.noticeTitle}>
          <span><FaVolumeUp /></span>
          {notice.title}
        </div>
        <div className={classes.noticeDate}>{moment(notice.writeDate).format("YYYY-MM-DD")}</div>
        <div className={classes.noticeContent}>
            {notice.content.length > 60 ? `${notice.content.slice(0, 60)}...` : notice.content}
        </div>
        </>
      </Link>
    </div>
  ));

  return <div className={classes.noticeBoxArea}>{noticeItems}</div>;
};

export default HomeNotice;
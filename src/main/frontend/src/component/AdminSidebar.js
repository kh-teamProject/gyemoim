import classes from './css/AdminSidebar.module.css';
import logo from './assert/images/logo0306.png'
import {NavLink} from "react-router-dom";
import {useState} from "react";

const AdminSidebar = () => {

    const [toggle, setToggle] = useState(false); // 토글 초기값 false 설정

    const toggleButton = () => {
        setToggle(toggle => !toggle);// on, off 개념 boolean
    }

    return (
        <>
            <div className={`${classes['adminSidebar-wrap']}`}>
                <img src={logo} alt="logo" width={200}/>
                <ul>
                    <li><NavLink to={'/admin'}>홈</NavLink></li>
                    <li><NavLink to={'/admin/account'}>회원 관리</NavLink></li>
                    <li><NavLink to={'/admin/stage'}>스테이지 관리</NavLink></li>
                    <li>
                        <button className={`${classes['adminBoardToggle-button']}`} onClick={toggleButton}>게시판 관리</button>
                    </li>
                    <div className={`${classes['adminBoardToggleContents']}`}>
                        {toggle && (
                            <li><NavLink to={'/admin/board'}> > 게시물 관리</NavLink></li>
                        )}
                        {toggle && (
                            <li><NavLink to={'/admin/reply'}> > 댓글 관리</NavLink></li>
                        )}
                    </div>
                </ul>
            </div>
        </>
    );
};

export default AdminSidebar;
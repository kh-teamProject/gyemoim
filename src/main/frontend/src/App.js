import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import NoticeList from "./page/board/NoticeList";
import QuestionWritePost from './page/board/QuestionWritePost';
import QuestionDetail from "./page/board/QuestionDetail";
import BoardRootLayout from "./page/board/BoardRoot";
import QuestionList from "./page/board/QuestionList";
import NoticeWritePost from "./page/board/NoticeWritePost";
import NoticeDetail from "./page/board/NoticeDetail";
import NoticeModify from "./page/board/NoticeModify";
import QuestionModify from "./page/board/QuestionModify";

import RootLayout from "./page/root/Root";
import MyPageRootLayout from "./page/root/MyPageRoot";
import AdminRoot from "./page/root/AdminRoot";
import Home from "./page/Home";
import Login from "./page/account/Login";
import MyPage from "./page/account/MyPage";
import MyPageModify from "./page/account/MyPageModify";
import StageCreate from './page/stage/StageCreate';
import StagePartIn from './page/stage/StagePartIn';
import StageList from './page/stage/StageList';
import Account from "./page/account/Account";
import Logout from "./page/account/Logout";
import Stage from './page/stage/Stage';
import ChanHeeTest from './page/ChanHeeTest';
import CheckedPwd from "./page/account/CheckedPwd";
import Deposit from "./page/account/Deposit";
import Interest from "./page/account/Interest";
import MemberDelete from "./page/account/MemberDelete";
import Withdraw from "./page/account/Withdraw";
import DetailsInquiry from "./page/account/DetailsInquiry";
import AccountManagement from "./page/admin/AccountManagement";
import AdminHome from "./page/AdminHome";
import StageManagement from "./page/admin/StageManagement";
import BoardManagement from "./page/admin/BoardManagement";
import Test from "./page/Test";

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'logout',
          element: <Logout/>
        },
        {
          path: 'account',
          element: <Account/>
        },
        {
          path: 'mypage',
          element: <MyPageRootLayout/>,
          children: [
            {
              path: 'info',
              element: <MyPage/>
            },
            {
              path: 'info/modify/:uNo',
              element: <MyPageModify/>
            },
            {
              path: 'info/checkedPwd',
              element: <CheckedPwd/>
            },
            {
              path: 'info/interest',
              element: <Interest/>
            },
            {
              path: 'info/delete/:uNo',
              element: <MemberDelete />
            },
            {
              path: 'bankAccount/deposit',
              element: <Deposit/>
            },
            {
              path: 'bankAccount/withdraw',
              element: <Withdraw/>
            },
            {
              path: 'bankAccount/detailsInquiry',
              element: <DetailsInquiry/>
            }
          ]
        },
        {
          path: 'stage',
          element: <Stage/>
        },
        {
          path: 'stagelist',
          element: <StageList/>
        },
        {
          path: 'test/:pfID',
          element: <Test/>
        },
        {
          path: '/stageCreate',
          element: <StageCreate/>
        },
        {
          path: 'ChanHeeTest',
          element: <ChanHeeTest/>
        },
        {
          path: '/stageAgree/:pfID',
          element: <StagePartIn/>
        },
        {
          path: 'board',
          element: <BoardRootLayout/>,
          children: [
            {
              path: 'notice',
              element: <NoticeList/>
            },
            {
              path: 'notice/write',
              element: <NoticeWritePost/>
            },
            {
              path: 'notice/detail/:bid',
              element: <NoticeDetail/>
            },
            {
              path: 'notice/modify/:bid',
              element: <NoticeModify/>
            },
            {
              path: 'question',
              element: <QuestionList/>
            },
            {
              path: 'question/write',
              element: <QuestionWritePost/>
            },
            {
              path: 'question/detail/:bid',
              element: <QuestionDetail/>
            },
            {
              path: 'question/modify/:bid',
              element: <QuestionModify/>
            },
          ]
        }
      ]
    },
    {
      path: '/admin',
      element: <AdminRoot/>,
      children: [
        {
          index: true,
          element: <AdminHome/>
        },
        {
          path: 'account',
          element: <AccountManagement/>
        },
        {
          path: 'stage',
          element: <StageManagement/>
        },
        {
          path: 'board',
          element: <BoardManagement/>
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;

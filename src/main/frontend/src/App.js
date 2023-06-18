import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
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
import MemberEmailSearch from './page/account/MemberEmailSearch'
import MyPage from "./page/account/MyPage";
import MyPageModify from "./page/account/MyPageModify";
import StageCreate from './page/stage/StageCreate';
import StagePartIn from './page/stage/StagePartIn';
import StageList from './page/stage/StageList';
import Account from "./page/account/Account";
import Stage from './page/stage/Stage';
import StageSelect from './page/stage/StageSelect';
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
import StageReport from "./component/UI/stage/StageReport";
import AdminStageList from "./page/admin/AdminStageList";
import AdminStageDetail from "./page/admin/AdminStageDetail";
import Test from "./page/Test";
import TestAdminAccountDetail from "./page/admin/TestAdminAccountDetail";
import AccountModify from "./page/admin/AccountModify";
import './App.css';
import MemberPwdSearch from "./page/account/MemberPwdSearch";
import PwdUpdate from "./page/account/PwdUpdate";
import MyStage from "./page/account/MyStage";
import RecommendedStage from "./page/account/RecommendedStage";
import StageWait from "./page/account/StageWait";
import StageParticipatin from "./page/account/StageParticipatin";
import StageComplete from "./page/account/StageComplete";

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
            path: 'MemberEmailSearch',
            element: <MemberEmailSearch/>
          },
          {
            path: 'MemberPwdSearch',
            element: <MemberPwdSearch/>
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
              }, {
                path: 'info/pwdUpdate/:uNo',
                element: <PwdUpdate/>
              },
              {
                path: 'info/delete/:uNo',
                element: <MemberDelete/>
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
              },
              {
                path: 'stage',
                element: <MyStage />
              },
              {
                path: 'stage/wait',
                element: <StageWait />
              },
              {
                path: 'stage/participagin',
                element: <StageParticipatin />
              },
              {
                path: 'stage/complete',
                element: <StageComplete />
              },
              {
                path: 'stage/recommendedStage',
                element: <RecommendedStage />
              }
            ]
          },
          {
            path: 'stage/:pfID',
            element: <Stage/>
          },
          {
            path: '/stageSelect',
            element: <StageSelect/>
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
            path: 'account/detail/:uno',
            element: <TestAdminAccountDetail/>
          },
          {
            path: 'account/modify/:uNo',
            element: <AccountModify/>
          },
          {
            path: 'stage',
            element: <StageManagement/>,
          },
          {
            path: 'stage/list',
            element: <AdminStageList/>
          },
          {
            path: 'stage/detail/:pfID',
            element: <AdminStageDetail/>
          },
          {
            path: 'stage/detail1/:pfID',
            element: <AdminStageDetail/>
          },
          {
            path: 'board',
            element: <BoardManagement/>
          }
        ]
      },
      {
        path: 'StageReport/:pfID',
        element: <StageReport/>
      }
    ]);


    return (
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    );
  }
;

export default App;

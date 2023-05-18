import React, {useState, useEffect} from "react";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import axios from 'axios';
import './App.css';
//import Login from "./page/Login";
//import MyPage from "./page/MyPage";
//import Home from "./page/Home";
import NoticeList from "./page/board/NoticeList";
//import Stage from './page/Stage';
import QuestionWritePost from './page/board/QuestionWritePost';
import QuestionDetail from "./page/board/QuestionDetail";
// import RootLayout from "./page/Root";
import BoardRootLayout from "./page/board/BoardRoot";
import Board from "./page/board/Board";
import QuestionList from "./page/board/QuestionList";
import NoticeWritePost from "./page/board/NoticeWritePost";
import NoticeDetail from "./page/board/NoticeDetail";
import NoticeModify from "./page/board/NoticeModify";
import QuestionModify from "./page/board/QuestionModify";

import RootLayout from "./page/root/Root";
import MyPageRootLayout from "./page/root/MyPageRoot";
import Home from "./page/Home";
import Login from "./page/account/Login";
import MyPage from "./page/account/MyPage";
import MyPageModify from "./page/account/MyPageModify";
// import Board from "./page/Board";
import StageCreate from './page/stage/StageCreate';
import StagePartIn from './page/stage/StagePartIn';
import StageList from './page/stage/StageList';
import Account from "./page/account/Account";
import Logout from "./page/account/Logout";
import Stage from './page/stage/Stage';
import ChanHeeTest from './page/ChanHeeTest';
import './App.css';
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
                            index: true,
                            element: <MyPage/>
                        },
                        {
                            path: ':uNo',
                            element: <MyPageModify/>
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
        }
    ]);

    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );

}

export default App;

<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import {createBrowserRouter, Link, Route, RouterProvider} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Login from "./page/Login";
import MyPage from "./page/MyPage";
=======
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./page/root/Root";
import MyPageRootLayout from "./page/root/MyPageRoot";
>>>>>>> 30a23975ccf0dd6c71a73cbc72643b9006717774
import Home from "./page/Home";
import Login from "./page/account/Login";
import MyPage from "./page/account/MyPage";
import MyPageModify from "./page/account/MyPageModify";
import Board from "./page/Board";
<<<<<<< HEAD
import StageList from './page/stage/StageList';
import Test from "./page/Test";
=======
import Stage from './page/Stage';
import './App.css';
import Account from "./page/account/Account";
import Logout from "./page/account/Logout";
>>>>>>> 30a23975ccf0dd6c71a73cbc72643b9006717774


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
                    path: 'board',
                    element: <Board/>
                },
                {
                    path: 'stage',
                    element: <Stage/>
                }
            ]
        },
    ]);

<<<<<<< HEAD
  const router = createBrowserRouter([
    {
      path: '/hello',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/mypage',
      element: <MyPage />
    },
    {
      path: '/board',
      element: <Board/>
    },
    {
      path: '/test/:pfID',
      element: <Test />
    },
    {
      path: '/stagelist',
      element: <StageList/>,
    }

  ]);

  return (
    <div className="App">
      <RouterProvider  router={router}/>
    </div>
  );
=======
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
>>>>>>> 30a23975ccf0dd6c71a73cbc72643b9006717774
};

export default App;


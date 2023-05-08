import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./page/root/Root";
import MyPageRootLayout from "./page/root/MyPageRoot";
import Home from "./page/Home";
import Login from "./page/account/Login";
import MyPage from "./page/account/MyPage";
import MyPageModify from "./page/account/MyPageModify";
import Board from "./page/Board";
import Stage from './page/Stage';
import './App.css';


const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'mypage',
          element: <MyPageRootLayout />,
          children: [
            {
              index: true,
              element: <MyPage />
            },
            {
              path: ':uNo',
              element: <MyPageModify />
            }
          ]
        },
        {
          path: 'board',
          element: <Board />
        },
        {
          path: 'stage',
          element: <Stage />
        }
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider  router={router}/>
    </div>
  );
};

export default App;


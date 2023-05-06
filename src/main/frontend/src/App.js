import React, {useState, useEffect} from "react";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Login from "./page/Login";
import MyPage from "./page/MyPage";
import Home from "./page/Home";
import BoardList from "./page/BoardList";
import Stage from './page/Stage';
import BoardWrite from './page/BoardWrite';
import BoardDetail from "./page/BoardDetail";
import BoardUpdate from "./page/BoardUpdate";
import BoardAnswer from "./page/BoardAnswer";
import RootLayout from "./page/Root";
import BoardRootLayout from "./page/BoardRoot";


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
          element: <MyPage />
        },
        {
          path: 'stage',
          element: <Stage />
        },
        {
          path: 'board',
          element: <BoardRootLayout />,
          children: [
            {
              index: true,
              element: <BoardList />
            },
            {
              path: 'write',
              element: <BoardWrite />
            },
            {
              path: 'detail/:bid',
              element: <BoardDetail />
            },
            {
              path: 'update',
              element: <BoardUpdate />
            },
            {
              path: 'answer/:parentBid',
              element: <BoardAnswer />
            }
          ]
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


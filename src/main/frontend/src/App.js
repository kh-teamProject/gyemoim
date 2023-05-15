import React, {useState, useEffect} from "react";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Login from "./page/Login";
import MyPage from "./page/MyPage";
import Home from "./page/Home";
import NoticeList from "./page/NoticeList";
import Stage from './page/Stage';
import QuestionWritePost from './page/QuestionWritePost';
import QuestionDetail from "./page/QuestionDetail";
import RootLayout from "./page/Root";
import BoardRootLayout from "./page/BoardRoot";
import Board from "./page/Board";
import QuestionList from "./page/QuestionList";
import NoticeWritePost from "./page/NoticeWritePost";
import NoticeDetail from "./page/NoticeDetail";
import NoticeModify from "./page/NoticeModify";
import QuestionModify from "./page/QuestionModify";


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
              element: <Board />
            },
            {
              path: 'notice',
              element: <NoticeList />
            },
            {
              path: 'notice/write',
              element: <NoticeWritePost />
            },
            {
              path: 'notice/detail',
              element: <NoticeDetail />
            },
            {
              path: 'notice/modify',
              element: <NoticeModify />
            },
            {
              path: 'question',
              element: <QuestionList />
            },
            {
              path: 'question/write',
              element: <QuestionWritePost />
            },
            {
              path: 'question/detail/:bid',
              element: <QuestionDetail />
            },
            {
              path: 'question/modify',
              element: <QuestionModify />
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


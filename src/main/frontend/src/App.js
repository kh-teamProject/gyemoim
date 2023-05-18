import React, {useState, useEffect} from "react";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Login from "./page/Login";
import MyPage from "./page/MyPage";
import Home from "./page/Home";
import NoticeList from "./page/board/NoticeList";
import Stage from './page/Stage';
import QuestionWritePost from './page/board/QuestionWritePost';
import QuestionDetail from "./page/board/QuestionDetail";
import RootLayout from "./page/Root";
import BoardRootLayout from "./page/board/BoardRoot";
import Board from "./page/board/Board";
import QuestionList from "./page/board/QuestionList";
import NoticeWritePost from "./page/board/NoticeWritePost";
import NoticeDetail from "./page/board/NoticeDetail";
import NoticeModify from "./page/board/NoticeModify";
import QuestionModify from "./page/board/QuestionModify";


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
              path: 'notice/detail/:bid',
              element: <NoticeDetail />
            },
            {
              path: 'notice/modify/:bid',
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


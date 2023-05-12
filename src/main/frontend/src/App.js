import React, {useState, useEffect} from "react";
import {createBrowserRouter, Link, Route, RouterProvider} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Login from "./page/Login";
import MyPage from "./page/MyPage";
import Home from "./page/Home";
import Board from "./page/Board";
import Stage from './page/Stage';
import Test from "./page/Test";


const App = () => {


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
      path: '/stage',
      element: <Stage/>,
    }

  ]);

  return (
    <div className="App">
      <RouterProvider  router={router}/>
    </div>
  );
};

export default App;


import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import Login from "./page/Login";
import MyPage from "./page/MyPage";
import Home from "./page/Home";
import Board from "./page/Board";
import Stage from './page/Stage';
import RootLayout from "./page/Root";


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


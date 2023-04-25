import React, {useState, useEffect} from "react";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Login from "./page/Login";
import MyPage from "./page/MyPage";
import Home from "./page/Home";
import Board from "./page/Board";


const App = () => {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    axios.get('/hello')
      .then((res) => {
        setMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
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
      element: <Board />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider  router={router}/>
    </div>
  );
};

export default App;


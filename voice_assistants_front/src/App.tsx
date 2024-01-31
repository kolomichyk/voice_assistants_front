import React, { useState, useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/Auth/AuthPage";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
      // <AuthPage/>
      isLoggedIn ? <MainPage /> : <AuthPage/>
  )
}

export default App;

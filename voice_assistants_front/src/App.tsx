import React, { useState, useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/Auth/AuthPage";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function App() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate();
  return (
      isLoggedIn ? navigate('/details') : <AuthPage/>
  )
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DetailedPage from './pages/DetailedPage/DetailedPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DraftPage from './pages/ApplicationDetailedPage/ApplicationDetailedPage'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import MainPage from './pages/MainPage/MainPage'
import RegisterPage from './pages/RegisterPage/Register'
import HistoryPage from './pages/ApplicationHistory/ApplicationHistory'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import ApplicationDetailedPage from './pages/ApplicationDetailedPage/ApplicationDetailedPage'
import EditPage from './pages/EditPage/EditPage'

const defaultState = {
 draft_id: -1,
 searchString: "",
 login: "Гость",
 isLoggedIn: false,
 isModerator: false,
 userSearchTerm: "",
 startSearchDate: new Date('2024-01-01').toISOString(),
 endSeatchDate: new Date('2024-03-01').toISOString(),
};

const reducer = (state = defaultState, action) => {
 switch (action.type) {
    case "UPDATE_DRAFT_ID":
      return {...state, draft_id: action.payload}
    case "UPDATE_SEARCH_STRING":
      return {...state, searchString: action.payload}
    case "UPDATE_LOGIN":
      return {...state, login: action.payload}
    case "LOGGEDCHANGE":
      return {...state, isLoggedIn: action.payload}
    case "LOGGEDSTATUSCHANGE":
      return {...state, isModerator: action.payload}
    case "USER_SEARCH_TERM_CHANGED":
      return {...state, userSearchTerm: action.payload}
    case "START_SEARCH_DATE_CHANGED":
      return {...state, startSearchDate: action.payload.toISOString()}
    case "END_SEARCH_DATE_CHANGED":
      return {...state, endSeatchDate: action.payload.toISOString()}
    default:
      return state
 }
};

const store = configureStore({
 reducer: reducer
});

const router = createBrowserRouter([
  {
    path: '/',
    element:  <App></App> 
  },
  {
    path: '/details',
    element:  <MainPage></MainPage> 
  },
  {
    path: '/details/:action_id',
    element: <DetailedPage></DetailedPage>
  },
  {
    path: '/Draft/:application_id',
    element: <DraftPage></DraftPage>
  },
  {
    path: '/Guest',
    element: <MainPage/>
  },
  {
    path: '/Register',
    element: <RegisterPage/>
  },
  {
    path: '/History',
    element: <HistoryPage/>
  },
  {
    path: '/History/:application_id',
    element: <DraftPage/>
  },
  {
    path: '/AdminPanel',
    element: <AdminPanel/>
  },
  {
    path: '/AdminPanel/EditPage/:action_id',
    element: <EditPage/>
  },
  {
    path: '/AdminPanel/EditPage/',
    element: <EditPage/>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
   <div>
     <RouterProvider router={router} />
   </div>
 </Provider>
)
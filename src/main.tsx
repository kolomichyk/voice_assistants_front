
import ReactDOM from 'react-dom/client'
import { BrowserRouter as HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import App from './App'
import DetailedPage from './pages/DetailedPage/DetailedPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AboutPage from './pages/AboutPage/AboutPage'
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navigate to="/Actions-navigator/" replace />
//   },
//   {
//     path: '/Actions-navigator',
//     element:  <App></App> 
//   },
//   {
//     path: '/Actions-navigator/:action_id',
//     element: <DetailedPage></DetailedPage>
//   },
//   {
//     path: '/about',
//     element: <AboutPage></AboutPage>
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
     <Routes>
       <Route path="/" element={<Navigate to="voice_assistants_front/" replace />} />
       <Route path="/voice_assistants_front" element={<App />} />
       <Route path="/voice_assistants_front/:action_id" element={<DetailedPage />} />
       <Route path="/voice_assistants_front/about" element={<AboutPage />} />
     </Routes>
  </HashRouter>,
 );
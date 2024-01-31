import { FC } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface HeaderProps {
  flag?: boolean; 
  draft_id? : number;
 }

const Header: FC<HeaderProps> = ({ flag = false, draft_id =-1 }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const isModerator = useSelector((state) => state.isModerator);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (login === "Гость") {
      dispatch({ type: "UPDATE_LOGIN", payload: "Гость" });
      dispatch({ type: "LOGGEDCHANGE", payload: false });
      navigate('/');
      return
    }
    try {
      axios({
        url: 'http://localhost:8000/logout/',
        method: 'POST',
        data: {
        },
        withCredentials: true
      });
      
      // Redirect to home page after successful logout
      navigate('/');
      dispatch({ type: "UPDATE_LOGIN", payload: "Гость" });
      dispatch({ type: "LOGGEDCHANGE", payload: false });
      dispatch({ type: "LOGGEDSTATUSCHANGE", payload: false });
      dispatch({ type: "UPDATE_DRAFT_ID", payload: -1 });
      dispatch({ type: "UPDATE_SEARCH_STRING", payload: '' });
      
      Cookies.set("sessionid", '', {
          path: "/",
          expires: new Date(Date.now() - 10000000),
        });

    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  
  return (
    <div className='header'>
      <div className="contentHeader">
        <Link to={`/details`} style={{marginRight: '300px'}}>
          <p className='buttonHeader' style={{whiteSpace: 'nowrap'}}> Голосовые помощники!</p>
        </Link>
        {login != "Гость" && (
          <Link to={`/History`}>
            <p className='buttonHeader' style={{paddingRight: 20, whiteSpace: 'nowrap'}}> История заявок</p>
          </Link>
        )}
        {isModerator && (
          <Link to={`/AdminPanel`}>
            <p className='buttonHeader'> Управление</p>
          </Link>
        )}
        {flag === true && !isModerator && draft_id !== -1 && (
            <Link to={`/Draft/${draft_id}`}>
                <img src="../../../public/img/sales.png" alt="Sales" style={{height: '65px', paddingBottom: 15, paddingRight: 50}}/>
            </Link>
          )}
          {flag === true && !isModerator && draft_id === -1 && login !== "Гость" &&(
            <div>
            <img src="../../../public/img/sales.png" alt="Sales" style={{height: '65px', paddingBottom: 15, paddingRight: 50, opacity: 0.5, pointerEvents: 'none'}}/>
            </div>
          )}
        <p className='buttonHeader'>{login}</p>
        <button style={{backgroundColor: "skyblue", padding: "0 30px", marginLeft: "5px", borderColor: "#000", height: 40}} onClick={handleLogout}> 
          {login === "Гость" ? "Войти" : "Выйти"}
        </button>
      </div>
    </div>
  )
}
export default Header;
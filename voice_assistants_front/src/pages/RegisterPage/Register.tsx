import 'bootstrap/dist/css/bootstrap.min.css';
import { FC } from 'react'
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterPage: FC = () => {
 const { register, handleSubmit } = useForm();
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const onSubmit = data => {
    console.log(data);
    try {
     axios({
         url: 'http://localhost:8000/user/',
         method: 'POST',
         data: {
           login: data.username,
           password: data.password,
           is_moderator: false,
           fio: data.fullName
         },
         withCredentials: true
       }).catch((error) => {
     console.error(error);
   });
   dispatch({ type: "UPDATE_LOGIN", payload: "Гость" });
   dispatch({ type: "LOGGEDCHANGE", payload: false });
   navigate('/');
  } catch (error) {
   console.error(error);
  }
};
  

 return (
   <div className="card card-container" style={{ width: "300px", textAlign: 'center', marginLeft: 1000}}>
     <h2>Регистрация</h2>
     <form onSubmit={handleSubmit(onSubmit)}>
       <div className="form-group">
         <label htmlFor="username">Имя пользователя</label>
         <input {...register("username")} type="text" className="form-control" id="username" required />
       </div>

       <div className="form-group">
         <label htmlFor="password">Пароль</label>
         <input {...register("password")} type="password" className="form-control" id="password" required />
       </div>

       <div className="form-group">
         <label htmlFor="fullName">ФИО</label>
         <input {...register("fullName")} type="text" className="form-control" id="fullName" required />
       </div>

       <div className="form-group">
         <button type="submit" className="btn btn-primary btn-block">Зарегистрироваться</button>
       </div>
     </form>
     <Link to="/">Уже есть аккаунт? Войти</Link>
   </div>
 );
};

export default RegisterPage;

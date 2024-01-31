import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

interface IUser {
 username: string;
 password: string;
}

const AuthPage: React.FC = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [successful, setSuccessful] = useState<boolean>(false);
 const [message, setMessage] = useState<string>("");
 const draft_id = useSelector((state) => state.draft_id);

 const initialValues: IUser = {
  username: "",
  password: "",
 };

 const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required"),
 });

 const handleGuestLogin = () => {
  document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure';
  dispatch({ type: "UPDATE_LOGIN", payload: "Гость" });
  dispatch({ type: "LOGGEDCHANGE", payload: true });
  dispatch({ type: "UPDATE_DRAFT_ID", payload: -1});
  dispatch({ type: "LOGGEDSTATUSCHANGE", payload: false });
  console.log(draft_id)
  navigate('/Guest');
 }

 const handleLogin = (values: IUser) => {
   try {
       axios({
           url: 'http://localhost:8000/login/',
           method: 'POST',
           data: {
             login: values.username,
             password: values.password
           },
           withCredentials: true
         }).then((response) => {
       if (response.status === 200) {
          const result = response.data
          dispatch({ type: "UPDATE_LOGIN", payload: values.username });
          dispatch({ type: "LOGGEDCHANGE", payload: true });
          dispatch({ type: "LOGGEDSTATUSCHANGE", payload: result === "True" })
         setSuccessful(true);
       } else {
         setSuccessful(false);
       }
     }).catch((error) => {
       console.error(error);
     });
   } catch (error) {
     console.error(error);
   }
   navigate('/details');
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <div 
        className="card card-container"
        style={{ width: "300px" }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Имя пользователя</label>
                  <Field name="username" type="text" className="form-control" as="input" id="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    as="input"
                    id="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Войти</button>

                  <button type="button" onClick={() => navigate('/Register')} className="btn btn-secondary btn-block">Зарегистрироваться</button>

                </div>

                <div className="form-group">
                  <button type="button" onClick={handleGuestLogin} className="btn btn-secondary btn-block">Войти как гость</button>
                </div>
                
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "Авторизация прошла успешно" : "Не удалось авторизовать пользователя"
                  }
                  role="alert"
                >
                {message}
                </div>
              </div>
            )}
          </Form>

        </Formik>
      </div>
    </div>
   );
};

export default AuthPage;


 


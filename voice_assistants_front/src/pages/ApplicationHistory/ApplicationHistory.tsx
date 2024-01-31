import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/BreadScrumbs/BreadScrumbs';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';

const HistoryPage: React.FC = () => {
   const [applications, setApplications] = useState([]);
   const dispatch = useDispatch();
   const navigate  = useNavigate();

   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/applications/`, {
               withCredentials: true
            });
            const result = response.data;
            setApplications(result[0])
            console.log(result)
        } catch (error) {
            
        }
    };
    fetchData();
    dispatch({ type: "UPDATE_DRAFT_ID", payload: -1 })
}, []);

    const handleDetails = (id) => {
        console.log(id);
        navigate(`/History/${id}`)
    };

   return (
       <div>
           <Header></Header>
           <table style={{margin: 'auto'}}>
               <thead>
                  <tr>
                      <th>Статус</th>
                      <th>Создана</th>
                      <th>Сформирована</th>
                      <th>Завершена</th>
                      <th>Подробная информация</th>
                  </tr>
               </thead>
               <tbody>
                  {applications.map((application) => (
                      <tr key={application.application_id} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                          <td>{application.status}</td>
                          <td>{application.created_at}</td>
                          <td>{application.formed_at}</td>
                          <td>{application.completed_at === application.created_at ? 'Пока пусто' : application.completed_at}</td>
                          <td><button onClick={() => handleDetails(application.application_id)}>Подробнее</button></td>
                      </tr>
                  ))}
               </tbody>
           </table>
       </div>
   );
};

export default HistoryPage;


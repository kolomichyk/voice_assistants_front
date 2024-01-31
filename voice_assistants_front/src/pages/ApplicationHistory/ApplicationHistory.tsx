import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../../components/BreadScrumbs/Breadcrumbs';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HistoryPage: React.FC = () => {
    const [applications, setApplications] = useState([]);
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const [trigger, setTrigger] = useState(false);
    const isModerator = useSelector((state) => state.isModerator);
    const searchTerm = useSelector((state) => state.userSearchTerm);
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-03-01'));

    const handleSearchChange = (event) => {
        dispatch({ type: "UPDATE_LOGIN", payload: values.username });
    };

    const handleAccept = (applicationId: number) => {
        const currentDateTime = moment().toISOString();
        
        const data = {
            application_id: applicationId,
            status: "принято",
            completed_at: currentDateTime
        };
        
        axios({
            method: 'put',
            url: 'http://localhost:8000/applications/put/moderator/',
            data: data,
            withCredentials: true
        }).then((response) => {
            console.log(response.data);
            setTrigger(!trigger);
        }).catch((error) => {
            console.error('Error making PUT request:', error);
        });

        axios.post(`http://localhost:8000/actions/play/${applicationId}/`, {}, {});
    };  

    const handleDecline = (applicationId: number) => {
        console.log(`Application ${applicationId} accepted.`);
        const currentDateTime = moment().toISOString();
        
        const data = {
            application_id: applicationId,
            status: "отказано",
            completed_at: currentDateTime
        };
        
        axios({
            method: 'put',
            url: 'http://localhost:8000/applications/put/moderator/',
            data: data,
            withCredentials: true
        }).then((response) => {
            console.log(response.data);
            setTrigger(!trigger);
        }).catch((error) => {
            console.error('Error making PUT request:', error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
                withCredentials: true
                });
                const result = response.data;
                setApplications(result[0])
            } catch (error) {
                console.log("Error fetching data")
            }
        };
        fetchData();
        console.log(applications)   
        const intervalId = setInterval(fetchData, 2000);
        return () => clearInterval(intervalId);
    }, [trigger, startDate, endDate]);

    const handleDetails = (id) => {
        console.log(id);
        navigate(`/History/${id}`)
    };

   return (
       <div>
            <Header></Header>
            <Breadcrumps/>
            {isModerator && (
            <div style={{marginLeft: 400, marginTop: 10, display: 'flex', gap: '10px'}}>
                <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        placeholder="Введите имя пользователя..." 
                    />
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            )}
            <table style={{margin: 'auto', marginTop: '20px'}}>
               <thead>
                  <tr>
                      <th>ID заявки</th>
                      <th>Пользователь</th>
                      <th>Статус</th>
                      <th>Создана</th>
                      <th>Сформирована</th>
                      <th>Завершена</th>
                      <th>Подробная информация</th>
                      <th>Количество сгенерированных ответов</th>
                      {isModerator &&(<th>Действия</th>)}
                  </tr>
               </thead>
               <tbody>
                {applications.filter(application => application.customer_id.includes(searchTerm)).map((application) => (
                    <tr key={application.application_id} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        <td>{application.application_id}</td>
                        <td>{application.customer_id}</td>
                        <td>{application.status}</td>
                        <td>{moment(application.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{moment(application.formed_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{application.completed_at === application.created_at ? 'Пока пусто' : moment(application.completed_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{application.actions_count}</td>
                        <td><button onClick={() => handleDetails(application.application_id)}>Подробнее</button></td>
                        {isModerator &&(<td>
                            { application.status === "зарегистрирован" && (
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button style={{backgroundColor: 'green'}} onClick={() => handleAccept(application.application_id)}>Принять</button>
                                <button style={{backgroundColor: 'red'}} onClick={() => handleDecline(application.application_id)}>Отклонить</button>
                            </div>
                            )}
                        </td>
                        )}
                    </tr>
                ))}
               </tbody>
           </table>
       </div>
   );
};

export default HistoryPage;


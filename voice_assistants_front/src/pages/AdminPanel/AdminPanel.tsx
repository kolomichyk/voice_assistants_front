import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import Breadcrumps from '../../components/BreadScrumbs/Breadcrumbs';
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

export type ActionsProps = {
    action_id: number,
    title: string,
    description:string,
    img: string,
    status: number,
}

const AdminPanel: FC = ({}) => {
    const [selectedStatus, setSelectedStatus] = useState('0');

    const [actions, setActions] = useState([])

    const navigate = useNavigate();

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const handleDelete = (actionId: number) => {
        console.log(`Action ${actionId} deleted.`);
        
        axios({
            method: 'delete',
            url: `http://localhost:8000/actions/delete/${actionId}/`,
            withCredentials: true
        }).then((response) => {
            setActions(response.data);
        }).catch((error) => {
            console.error('Error making PUT request:', error);
        });
    };   

    const handleEdit = (actionId: number) => {  
        navigate(`/AdminPanel/EditPage/${actionId}`)
    }; 
    const handleButtonClick = () => {
        navigate(`/AdminPanel/EditPage/`)
    };  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/actions/`, {
                   withCredentials: true
                });
                const result = response.data;
                setActions(result[1])
            } catch (error) {
                console.log("Error fetch")
            }
        };

        fetchData();
    }, [selectedStatus]);

    return (
        <div>
            <Header>
            </Header>
            <Breadcrumps/>
            <div className='Table'>
                <div>
                    <select onChange={(e) => handleStatusChange(e.target.value)} style={{paddingBottom: 10, height: 32, textAlign: "center"}}>
                        <option value="0">Обслуживается</option>
                        <option value="1">Не обслуживается</option>
                    </select>
                    <Button 
                        style={{
                            backgroundColor: "#3D348B", 
                            padding: "0 30px", 
                            marginLeft: 400, 
                            borderColor: "#000", 
                            height: 40,
                            transition: 'transform 0.1s',
                        }} 
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                        onMouseUp={(e) => e.currentTarget.style.transform = ''} 
                        onClick={() => handleButtonClick()}
                        >
                        Добавить
                    </Button>
                </div>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>Картинка</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Адрес картинки</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    {actions && actions.length > 0 ? actions.map((action:ActionsProps) => {
                        return parseInt(selectedStatus) === action.status ? (
                            <tr key={action.action_id} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                                <td style={{display: 'flex', alignItems: 'center'}}>
                                    <img style={{height: '130px', marginRight: '10px'}} src={action.img} alt={action.description} />
                                </td>
                                <td> {action.title} </td>
                                <td> {action.description} </td>
                                <td> {action.img} </td>
                                <td> {action.status === 0 ? 'Обслуживается' : action.status === 1 ? 'Не обслуживается' : ''} </td>
                                <td>
                                    <div style={{display: 'flex', gap: '10px'}}>
                                        <button style={{backgroundColor: 'green'}} onClick={() => handleEdit(action.action_id)}>Редактировать</button>
                                        {action.status === 0 && (<button style={{backgroundColor: 'red'}} onClick={() => handleDelete(action.action_id)}>Удалить</button>)}
                                    </div> 
                                </td>
                            </tr>
                        ) : null;
                    }) : <tr></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminPanel

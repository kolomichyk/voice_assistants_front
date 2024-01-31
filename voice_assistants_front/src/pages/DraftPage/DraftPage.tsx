import { FC, useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../../components/Header/Header';
import './DraftPage.css'
import { useNavigate  } from 'react-router-dom';
import moment from 'moment';
import { useParams } from 'react-router-dom';

export type ActionsApplicationsProps = {
    id: number,
    type_action: string,
    description:string,
    action_id: number,
    application_id: number,
}

const DraftPage: FC = () => {

    const navigate  = useNavigate();

    const { draft_id } = useParams<{ draft_id: string }>();
    const [id, setID] = useState(Number(draft_id));
    const [actions, setActions] = useState([])
    const [listActions, setListActions] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/${draft_id}/`, {
                   withCredentials: true
                });
                const result = response.data;
                setActions(result[1])
            } catch (error) {
                setActions([]);
                navigate('/');
            }
        };

        const fetchListActions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/actions/${draft_id}/`, {
                   withCredentials: true
                });
                const result = response.data;
                // console.log(result[1])
                setListActions(result[1])
            } catch (error) {
                setListActions([]);
                navigate('/');
            }
            
        };
        fetchData();
        fetchListActions();
    }, []);

    const handleDelete = (id_actions: number) => {
        var flag = false
        if (actions.length == 1) {
            flag = true;
        }
        const deleteRequest = () => {
            axios.delete(`http://localhost:8000/applications/delete/${id_actions}/`, {
                withCredentials: true
            })
            .then(response => {
                const result = response.data;
                setActions(result[1]);
            })
            .catch(error => {
                setActions([]);
                navigate('/');
            });
         };
        deleteRequest();
        if (flag) {
            setActions([]);
            navigate('/');
        }
     };

    const handleFormRequest = () => {
        const currentDateTime = moment().toISOString();
        
        const data = {
            status: "зарегистрирован",
            formed_at: currentDateTime
        };
        
        axios({
            method: 'put',
            url: 'http://localhost:8000/applications/put/user/',
            data: data,
            withCredentials: true
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error('Error making PUT request:', error);
        });
        navigate('/');
    };

    const handleClearDraft = () => {
        const optionsRequest = () => {
            axios.post(`http://localhost:8000/application/delete/${draft_id}/`, {}, {
                withCredentials: true
            })
            .then(response => {
                navigate('/');
                setActions([]);
            })
            .catch(error => {
                setActions([]);
                navigate('/');
            });
         };
        optionsRequest();
    };
    
    return (
        <div>
            <Header>
            </Header>
            <div className='Table'>
                <table>
                    <thead>
                        <tr>
                        <th>Действия голосового помощника</th>
                        </tr>
                    </thead>
                    <tbody>
                    {actions && actions.length > 0 ? actions.map((action:ActionsApplicationsProps) => {
                        const correspondingAction = listActions.find(la => la.action_id === action.action);
                        return (
                            <tr key={action.id} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                            <td style={{display: 'flex', alignItems: 'center'}}>
                                {correspondingAction && <img style={{width: '50px', marginRight: '10px'}} src={correspondingAction.img} alt={action.description} />}
                                {action.description} 
                                <button style={{
                                    marginLeft: "auto", 
                                    borderColor: "#000", 
                                    height: 40,
                                    transition: 'transform 0.1s',
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                                onMouseUp={(e) => e.currentTarget.style.transform = ''} 
                                className="deleteButton" onClick={() => handleDelete(action.action)}>Удалить</button>
                            </td>
                        </tr>
                        );
                    }) : <tr><td colSpan={1}>Корзина пуста</td></tr>}
                    </tbody>
                </table>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button 
                    onClick={handleClearDraft}
                    style={{
                        margin: '10px',
                        backgroundColor: '#FFD700', 
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Очистить корзину
                </button>
                <button 
                    onClick={handleFormRequest} 
                    style={{
                        margin: '10px',
                        backgroundColor: '#ADD8E6', 
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Сформировать заявку
                </button>
            </div>
        </div>
    )
 }
 export default DraftPage;
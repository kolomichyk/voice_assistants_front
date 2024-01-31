import { FC, useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../../components/Header/Header';
import './ApplicationDetailedPage.css'
import { useNavigate  } from 'react-router-dom';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../../components/BreadScrumbs/Breadcrumbs';

export type ActionsApplicationsProps = {
    id: number,
    type_action: string,
    description:string,
    action_id: number,
    application_id: number,
}

export type ApplicationProps = {
    application_id: number,
    status: string,
    created_at: Date,
    formed_at: Date,
    completed_at: Date,
    customer_id: number,
    moderator_id: number,
}

const ApplicationDetailedPage: FC = () => {

    const navigate  = useNavigate();

    const { application_id } = useParams<{ application_id: string }>();
    const [id, setID] = useState(Number(application_id));
    const [actions, setActions] = useState([])
    const [listActions, setListActions] = useState([])
    const [application, setApplication] = useState<ApplicationProps | null>(null);
    

    const setActionDescription = (newDescription) => {
        const index = actions.indexOf(editingItem);

        const newActions = [...actions];
        newActions[index].description = newDescription;

        setActions(newActions);
    };
    const [editingItem, setEditingItem] = useState(null);

    const startEditing = (item) => {
        setEditingItem(item);
    };

    const finishEditing = (newDescription) => {
        console.log(editingItem)
        const ChangeDescription = async () => {
            try {
                const response = await axios.put(`http://localhost:8000/actions/applications/put/`, {
                   item: editingItem
                }, {
                    withCredentials: true
                });
            } catch (error) {
                // navigate('/');
            }
            
        };
        ChangeDescription();
        setEditingItem(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/${application_id}/`, {
                   withCredentials: true
                }).then(response => {
                    const result = response.data;
                    console.log()
                    setActions(result[1])
                    setApplication(result[0])
                })
            } catch (error) {
                setActions([]);
                navigate('/');
            }
        };

        const fetchListActions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/actions/${application_id}/`, {
                   withCredentials: true
                });
                const result = response.data;
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
            axios.post(`http://localhost:8000/application/delete/${application_id}/`, {}, {
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
            <Breadcrumps/>
            <div className='Table'>
                <table>
                    <thead>
                        <tr>
                        <th>Картинка</th>
                        <th>Действие</th>
                        <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                    {actions && actions.length > 0 ? actions.map((action:ActionsApplicationsProps) => {
                        const correspondingAction = listActions.find(la => la.action_id === action.action);
                        return (
                            <tr key={action.id} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                            <td>{correspondingAction && <img style={{height: '50px', marginRight: '10px'}} src={correspondingAction.img} alt={action.description} />}</td>
                            <td>{correspondingAction && <p>{correspondingAction.title}</p>}</td>
                            <td style={{display: 'flex', alignItems: 'center', height: '100px', width: '700px'}}>
                                {editingItem === action && application && application.status == "черновик" ? (
                                    <input 
                                        value={action.description} 
                                        onChange={(e) => setActionDescription(e.target.value)} 
                                        onBlur={finishEditing} 
                                        style = {{width: '400px'}}
                                    />
                                ) : (
                                    <>
                                        <span onClick={() => startEditing(action)}>{action.description}</span> 
                                        {application && application.status == "черновик" && (
                                        <button 
                                            style={{
                                                marginLeft: "auto", 
                                                borderColor: "#000", 
                                                height: 40,
                                                transition: 'transform 0.1s',
                                            }}
                                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                                            onMouseUp={(e) => e.currentTarget.style.transform = ''} 
                                            className="deleteButton" onClick={() => handleDelete(action.action)}>Удалить</button>
                                        )}
                                    </>
                                )}
                            </td>


                        </tr>
                        );
                    }) : <tr><td colSpan={1}>Корзина пуста</td></tr>}
                    </tbody>
                </table>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {application && application.status == "черновик" && (
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
                )}
                {application && application.status == "черновик" && (
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
                )}
            </div>
        </div>
    )
 }
 export default ApplicationDetailedPage;
import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../../components/BreadScrumbs/Breadcrumbs';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export type ActionsProps = {
    action_id: number,
    title: string,
    description:string,
    img: string,
    status: number,
}

const EditPage: FC = ({}) => {
    const [action, setAction] = useState<ActionsProps | null>(null);
    let { action_id } = useParams<{ action_id: string }>();
    const [selectedFile, setSelectedFile] = useState();
    const [file, setFile] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('0');
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();

    const handleTitleChange = (event) => {
       setTitle(event.target.value);
    };
   
    const handleDescriptionChange = (event) => {
       setDescription(event.target.value);
    };
   
    const handleStatusChange = (event) => {
       setStatus(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleButtonAddClick = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        const ActionData = new FormData();
        if (action_id) {
            ActionData.append('action_id', action_id);
        }
        ActionData.append('title', title);
        ActionData.append('description', description);
        ActionData.append('img', 'tmp');
        ActionData.append('status', status);

        try {
            const response = await axios.post(`http://localhost:8000/actions/post/`, ActionData, {
                withCredentials: true,
            }).then(response => {
                action_id = response.data['action_id']
            })
        } catch (error) {
            console.error(error);
        }
        try {
            await axios.post(`http://localhost:8000/actions/post/images/${action_id}/`, formData, {
                withCredentials: true,
            }).then((response) => {
                setTrigger(!trigger)
            })
        } catch (error) {
            console.error(error);
        }
        navigate('/AdminPanel');        
    };   

    const handleSubmit = async (action_id: string) => {
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        const ActionData = new FormData();
        if (action_id) {
            ActionData.append('action_id', action_id);
        }
        ActionData.append('title', title);
        ActionData.append('description', description);
        ActionData.append('img', action?.img);
        ActionData.append('status', status);

        try {
            const response = await axios.put(`http://localhost:8000/actions/put/${action_id}/`, ActionData, {
                withCredentials: true,
            });
        } catch (error) {
            console.error(error);
        }
        try {
            await axios.post(`http://localhost:8000/actions/post/images/${action_id}/`, formData, {
                withCredentials: true,
            }).then((response) => {
                setTrigger(!trigger)
            })
        } catch (error) {
            console.error(error);
        }
        navigate('/AdminPanel');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://localhost:8000/actions/${action_id}/`, {
                withCredentials: true
                }).then((response) => {
                    const result = response.data;
                    setAction(result)
                    setStatus(result['status'])
                    setDescription(result['description'])
                    setTitle(result['title'])
                })
            } catch (error) {
                console.log("Error fetch")
            }
        };

        if (action_id) {
            console.log(action_id)
            fetchData();

        }
    },[trigger]);

    return (
        <div>
            <Header>
            </Header>
            <Breadcrumps/>  
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <form style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    border: '1px solid black', 
                    padding: '20px', 
                    width: '800px' 
                }}>
                    {action && (<img src={action.img} alt="&&&" style={{ height: '200px', marginRight: "auto"}}/>)}
                    <br />
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        Картинка:
                        <input type="file" accept="image/*" style={{ marginLeft: 'auto', width: '600px' }} onChange={handleFileChange} />
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                        Название:
                        <input type="text" style={{ marginLeft: 'auto', width: '600px' }}  value={title} onChange={handleTitleChange}/> 
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                        Описание:
                        <textarea style={{ marginLeft: 'auto', width: '600px' }} value={description} onChange={handleDescriptionChange} /> 
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                        Статус:
                        <select style={{ marginLeft: 'auto', width: '600px' }} value={status} onChange={handleStatusChange}>
                            <option value="0">Обслуживается</option>
                            <option value="1">Не обслуживается</option>
                        </select>
                    </label>
                    <br />
                    { action_id ? (
                    <Button 
                        style={{
                            backgroundColor: "#3D348B", 
                            padding: "0 30px", 
                            marginLeft: "5px", 
                            borderColor: "#000", 
                            height: 40,
                            transition: 'transform 0.1s',
                        }} 
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                        onMouseUp={(e) => e.currentTarget.style.transform = ''} 
                        onClick={() => handleSubmit(action_id)}
                        >
                        Применить
                    </Button>
                    ):
                        <Button 
                            style={{
                                backgroundColor: "#3D348B", 
                                padding: "0 30px", 
                                marginLeft: "5px", 
                                borderColor: "#000", 
                                height: 40,
                                transition: 'transform 0.1s',
                            }} 
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                            onMouseUp={(e) => e.currentTarget.style.transform = ''} 
                            onClick={() => handleButtonAddClick(action_id)}
                            >
                            Добавить
                        </Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default EditPage

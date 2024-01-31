import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/BreadScrumbs/BreadScrumbs';
import { useDispatch } from 'react-redux';

export type ActionsApplicationsProps = {
    id: number,
    type_action: string,
    description:string,
    action_id: number,
    application_id: number,
}

const ApplicationDetailedPage: React.FC = () => {
   const application_id = useParams().application_id

   const [actions, setActions] = useState([])
   const [listActions, setListActions] = useState([])

    useEffect(() => {
        console.log("-------")
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/applications/${application_id}/`, {
                   withCredentials: true
                });
                const result = response.data;
                setActions(result[1])
            } catch (error) {
                console.log("Error fetch")
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
                console.log("Error fetch")
            }
            
        };
        fetchData();
        fetchListActions();
    }, []);

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
                            </td>
                        </tr>
                        );
                    }) : <tr><td colSpan={1}>Заявка пуста</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ApplicationDetailedPage;


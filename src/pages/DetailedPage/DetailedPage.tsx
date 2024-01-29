import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/BreadScrumbs/Breadcrumbs';
import { itemProps } from '../../components/Content/Content';

const data = [
    { action_id: 1, title: 'Узнать погоду', description: 'Просто скажите :" Узнать погоду в..."', img: '../../../public/img/first.jpg', status: 0},
    { action_id: 2, title: 'Поставить будильник', description: 'Просто скажите :" Поставь будильник на..."', img: '../../../public/img/second.jpg', status: 0},
    { action_id: 3, title: 'Включить музыку', description: 'Просто скажите :" Включи музыку или включи каку-то песню"', img: '../../../public/img/third.jpg', status: 0},
    { action_id: 4, title: 'Записать заметку', description: 'Просто скажите :" Запиши в заметки..."', img: '../../../public/img/fourth.jpg', status: 0}
]

const DetailedPage: FC = ({}) => {
    const [action, setAction] = useState<itemProps>(
    {
        action_id: 1,
        title: 'string',
        description:'string',
        img: 'string',
    })
    const action_id = useParams().action_id
    
    const fetchData = async () => {
        try {
            const response = await 
            fetch(`http://127.0.0.1:8000/actions/${action_id}/`, {
                method: "GET"
            });
            const result = await response.json();

            
            console.log(result.title)
            setAction(result)
            console.log(result);
        } catch (error) {
            if (action_id !== undefined) {
                setAction(data[Number(action_id)-1]);
            } else {
                console.error('action_id is undefined');
            }
            // console.error('Error fetching data:', error);
        }
    };
        
    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className='mainPage'>
            <div className='mainPageWrapper'>
                <Header/>
                <Breadcrumbs/>
                <div style={{marginLeft: '50px', marginTop: '50px'}}>
                    <img src={action.img} alt="&&&" style={{ height: '200px' }}/>
                    <p className="cardTitle" style={{ color:"white" }}>{action.title}</p>
                    <p className="cardDescription" style={{ color:"white"}}>{action.description}</p>
                </div>
            </div>
            
        </div>
    )
}

export default DetailedPage

{/* <div className='mainPage'>
            <div className='mainPageWrapper'>
                <Header/>
                <Breadcrumbs/>
                <div style={{marginLeft: '50px', marginTop: '50px'}}>
                    <img src={data[action_id-1]['img']} alt="&&&" style={{ height: '200px' }}/>
                    <p className="cardTitle" style={{ color:"white" }}>{data[action_id-1]['title']}</p>
                    <p className="cardDescription" style={{ color:"white" }}>{data[action_id-1]['description']}</p>
                </div>
            </div>
            
        </div> */}
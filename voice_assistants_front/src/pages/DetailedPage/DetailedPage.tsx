import { FC, useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/BreadScrumbs/BreadScrumbs';
import { itemProps } from '../../components/Content/Content';

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
            fetch(`http://localhost:8000/actions/${action_id}/`, {
                method: "GET"
            });
            const result = await response.json();

            setAction(result)
        } catch (error) {
            console.error('Error fetching data:', error);
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
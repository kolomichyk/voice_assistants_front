import './MainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/BreadScrumbs/BreadScrumbs';
import InputField from '../../components/InputField/InputField';
import Card from '../../components/Card/Card';
import { FC, useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export type itemProps = {
    action_id: number,
    title: string,
    description:string,
    img: string,
}

const MainPage: FC = () => {

    const dispatch = useDispatch();

    const draft_id = useSelector((state) => state.draft_id);
    
    const searchTerm = useSelector((state) => state.searchString);


    const handleInputChange = (newSearchTerm) => {
        // setInputValue(newSearchTerm);
        dispatch({ type: "UPDATE_SEARCH_STRING", payload: newSearchTerm });
     };

    const [data, setData] = useState([
        { action_id: 1, title: 'Узнать погоду', description: 'Просто скажите :" Узнать погоду в..."', img: '../../../public/img/first.jpg', status: 0},
        { action_id: 2, title: 'Поставить будильник', description: 'Просто скажите :" Поставь будильник на..."', img: '../../../public/img/second.jpg', status: 0},
        { action_id: 3, title: 'Включить музыку', description: 'Просто скажите :" Включи музыку или включи каку-то песню"', img: '../../../public/img/third.jpg', status: 0},
        { action_id: 4, title: 'Записать заметку', description: 'Просто скажите :" Запиши в заметки..."', img: '../../../public/img/fourth.jpg', status: 0}
    ])

    const handleOnClickButtonAdd = async (id: number) => {
        const UpdateDraft = async () => {
            try {
                const response = await axios.get('http://localhost:8000/actions/', {
                    withCredentials: true
                });
                const result = response.data;
                dispatch({ type: "UPDATE_DRAFT_ID", payload: result[0]['draft_id'] })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        try {
            const response = await axios.post(`http://localhost:8000/actions/post/application/${id}/`, {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error(error);
        }

        UpdateDraft();
    };

    
    const handleSearchButtonClick = () => {
        dispatch({ type: "UPDATE_SEARCH_STRING", payload: inputValue });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/actions/', {
                   withCredentials: true
                });
                const result = response.data;
                setData(result[1])
                console.log(result)
                dispatch({ type: "UPDATE_DRAFT_ID", payload: result[0]['draft_id'] })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='mainPage'>
            <Header flag={true} draft_id={draft_id}/>
            <Breadcrumbs/>
            <div className="content" style={{ backgroundColor: 'skyblue' }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <InputField inputValue={""} handleInputChange={handleInputChange} handleSearchClick={handleSearchButtonClick}/>
            </div>
                <div className='cards' style={{ display: 'inline-flex', paddingLeft: "50px", width: "1250px", flexWrap: 'wrap', margin:"0, auto", marginTop:"50px", backgroundColor: 'skyblue' }}>
                {data && data
                    .filter(item => searchTerm.trim() === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(item =>
                    item.status === 0 && <Card id={item.action_id} title={item.title} description={item.description} img={item.img} handleButtonClick={() => handleOnClickButtonAdd(item.action_id)} key={item.action_id}/>
                    )}
                </div>
            </div>
        </div>
    )
    // return (
    //     <div className='mainPage'>
    //         <div className='mainPageWrapper'>
    //             
    //             <Content/>
    //         </div>
    //     </div>
    // )
}

export default MainPage
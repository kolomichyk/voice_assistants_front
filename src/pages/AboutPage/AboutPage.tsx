import { FC } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/BreadScrumbs/Breadcrumbs';

const AboutPage: FC = () => {

    return (
        <div className='mainPage'>
            <div className='mainPageWrapper'>
                <Header/>
                <Breadcrumbs/>
                <h1 style={{marginTop: '35px', marginLeft: '30px'}}> Эта лабораторная посвящена знакомству с фронтом на React </h1>
            </div>
            
        </div>
    )
}

export default AboutPage
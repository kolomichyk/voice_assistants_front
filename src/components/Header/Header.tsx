import { FC } from 'react'
import { Link } from 'react-router-dom';
import './Header.css'

const Header: FC = () => {

    return (
        <div className='header'>
            <div className="contentHeader">
                <Link to={`/`} style={{marginRight: '300px'}}>
                    <p className='buttonHeader'> Voice assistants!</p>
                </Link>
                <Link to={`/voice_assistants_front/about`}>
                    <p className='buttonHeader'> О нас</p>
                </Link>
                <p className='buttonHeader'>Контакты</p>
                <p className='buttonHeader'>Консультация</p>
                <p className='buttonHeader'>Личный кабинет</p>
            </div>
        </div>
    )
}

export default Header
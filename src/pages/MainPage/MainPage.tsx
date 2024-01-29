import { FC} from 'react'
import './MainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import Breadcrumbs from '../../components/BreadScrumbs/Breadcrumbs';

const MainPage: FC = () => {

//     fetch('http://127.0.0.1:8000/get/image/Узнать погоду.jpg')
//     .then(response => response.blob())
//     .then(blob => {
//     // Преобразование бинарных данных в URL
//     let url = URL.createObjectURL(blob);
//     // Использование URL для отображения изображения на веб-странице или выполнения других действий с полученными данными
//     // Например:
//     let img = document.createElement('img');
//     img.src = url;
//     document.body.appendChild(img); // Добавление изображения на веб-страницу
//   })
//   .catch(error => console.error('Ошибка:', error));


// fetch('http://127.0.0.1:8000/actions/')
//                 .then(response => response.json())
//                 .then(data => {
//                   data.result.forEach(item => {
//                     fetch(`http://127.0.0.1:8000/get/image/${item.title}.jpg`)
//                       .then(imageResponse => {
//                         item.img = imageResponse
//                       })
//                       .catch(error => {
//                         console.log("img Error")
//                       });
//                   });
//                   console.log(response);
//                   setData(data);
//                 })
//                 .catch(error => {
//                   // Обработка ошибки запроса к API
//                 });
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

    return (
        <div className='mainPage'>
            <div className='mainPageWrapper'>
                <Header/>
                <Breadcrumbs/>
                <Content/>
            </div>
        </div>
    )
}

export default MainPage
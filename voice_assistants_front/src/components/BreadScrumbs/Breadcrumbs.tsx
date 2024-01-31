import { Link, useLocation } from 'react-router-dom';
import "./Breadcrumbs.css"; 
const Breadcrumps = () => {
  const location = useLocation();
 
  let currentLink = "";
 
  const crumps = location.pathname
     .split("/")
     .filter((crump) => crump !== "")
     .map((crump) => {
       currentLink += `/${crump}`;
       if (crump == "/") crump = ""
       if (crump == "History") crump = "История заявок"
       if (crump == "AdminPanel") crump = "Управление"
       if (crump == "details") crump = "Услуги"
       if (crump == "Draft") crump = "Корзина"
       if (crump == "EditPage") crump = "Страница редактирования"
       // if (crump == "auth") crump = "Авторизация"
       // if (crump == "registration") crump = "Регистрация"
       // if (crump == "application") crump = "Заказ"
       // if (crump == "options-list") crump = "Список опций"
 
       return (
         <div className="crump" key={crump}>
           <Link to={currentLink} style={{ color: "#000000" }}>{crump}</Link>
         </div>
       );
     });
 
     return (
      <div className="breadcrumps">
        <div className="crump">
          <Link to={"/details"} style={{ color: "#000000" }}>Главная</Link>
        </div>
        {crumps}
      </div>
  );
 };
 
 export default Breadcrumps;
 

// const Breadcrumbs = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   const linkStyle = {
//     color: 'white',
//     textDecoration: 'none',
//   };

//   return (
//     <div>
//       {pathnames.map((value, index) => {
//         const routeTo = `/${pathnames.slice(0, index + 1).join('/')}/`; // Исправлено
//         console.log(pathnames)
//         console.log(routeTo)
//         return (
//           <span key={index}>
//             {index === 0 && <Link to="/" style={linkStyle}>Home</Link>}
//             {index !== 0 && <Link to={routeTo} style={linkStyle}>{routeTo}</Link>}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// export default Breadcrumbs;

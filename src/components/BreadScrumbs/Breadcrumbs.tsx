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
       if (crump == "voice_assistants_front") crump = "Услуги"
       if (crump == "about") crump = "О нас"
       // if (crump == "details") crump = "Услуга"
       // if (crump == "history") crump = "История"
       // if (crump == "Bmstu-navigator") crump = "Услуги"
       // if (crump == "routes") crump = "Маршруты"
       // if (crump == "auth") crump = "Авторизация"
       // if (crump == "registration") crump = "Регистрация"
       // if (crump == "application") crump = "Заказ"
       // if (crump == "options-list") crump = "Список опций"
 
       return (
         <div className="crump" key={crump}>
           <Link to={currentLink} style={{ color: "#ffffff" }}>{crump}</Link>
         </div>
       );
     });
 
  return (
     <div className="breadcrumps">
       <div className="crump">
         <Link to={"/"} style={{ color: "#ffffff" }}>Страница услуг</Link>
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

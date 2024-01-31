import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <div>
      {/* {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}/`; // Исправлено
        console.log(pathnames)
        console.log(routeTo)
        return (
          <span key={index}>
            {index === 0 && <Link to="/" style={linkStyle}>Home</Link>}
            {index !== 0 && <Link to={routeTo} style={linkStyle}>{routeTo}</Link>}
          </span>
        );
      })} */}
    </div>
  );
};

export default Breadcrumbs;

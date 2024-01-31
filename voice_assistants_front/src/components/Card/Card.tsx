import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

export type CardProps = {
  id?: number,
  img?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  handleButtonClick: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({id, img, title, description, handleButtonClick}) => {
    const login = useSelector((state) => state.login);
    return (
      <div style = {{ marginLeft: "60px", maxWidth: "350px", height:"400px", textAlign:"center"}}>
        <Link to={`/details/${id}`}>
          <img src={img} alt="&&&" style={{ height: '200px' }}/>
          <p className="cardTitle" style={{ color:"white" }}>{title}</p>
        </Link>
        { login !== "Гость" &&
          <div>
            <Button 
              style={{
                backgroundColor: "#3D348B", 
                padding: "0 30px", 
                marginLeft: "5px", 
                borderColor: "#000", 
                height: 40,
                transition: 'transform 0.1s',
              }} 
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
              onMouseUp={(e) => e.currentTarget.style.transform = ''} 
              onClick={handleButtonClick}
            >
              Добавить
            </Button>
          </div>
        }      
        </div>
    );
  };
  
  export default Card;

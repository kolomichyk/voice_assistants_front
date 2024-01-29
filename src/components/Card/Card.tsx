import { Link } from 'react-router-dom';

export type CardProps = {
  id?: number,
  img?: string;
  title: React.ReactNode;
  description: React.ReactNode;
};

const Card: React.FC<CardProps> = ({id, img, title}) => {
    console.log(img);
    return (
      <div style = {{ marginLeft: "60px", maxWidth: "350px", height:"400px", textAlign:"center"}}>
        <Link to={`/voice_assistants_front/${id}`}>
          <img src={img} alt="&&&" style={{ height: '200px' }}/>
          <p className="cardTitle" style={{ color:"white" }}>{title}</p>
        </Link>
        {/* <Button style={{backgroundColor: "#F5001D", padding: "0 30px", marginLeft: "5px", borderColor: "#000", height: 40}} onClick={handleDeleteButtonClick}>Удалить</Button> */}
      </div>
    );
  };
  
  export default Card;
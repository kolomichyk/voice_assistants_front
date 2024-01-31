import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './InputField.css'
import { useSelector } from 'react-redux';


const InputField = (props) => {
    const searchString = useSelector((state) => state.searchString);
    
    function handleSearchButtonClick () {
        console.log(props.inputValue)
    }
 
    return(
        <div>
        <input 
            type="text" 
            value={searchString} 
            placeholder='Введите название действия'
            onChange={event => props.handleInputChange(event.target.value)}
            style={{ marginLeft:"110px", marginTop:"30px", width:"300px"}} 
         />
        <Button style={{backgroundColor: "#3D348B", padding: "0 30px", marginLeft: "5px", borderColor: "#000", height: 40}} onClick={props.handleSearchClick}>Найти</Button>
        </div>
    )
 }

export default InputField
import React from 'react';
import{X} from 'react-feather';
import './Chips.css';

const Chips = (props) =>{
    return <div className='Chip' style={{backgroundColor: props.color}}>
        {props.text}
        {props.close &&  <X
            onClick={()=>(props.onClose? props.onClose():"")}
        />}
    </div>
    
}
export default Chips;
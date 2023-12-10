import React, { useEffect, useRef } from 'react';


const Dropdown = (props) => {

    const dropdownref = useRef();

    const handleClick =(e)=>{
        
        if(dropdownref && !(dropdownref.current.contains(e.target)))
        {
            if(props.onClose) props.onClose();
           
        }
    }

   useEffect(()=>{
        document.addEventListener('click', handleClick);
        return ()=>{
            document.removeEventListener('click', handleClick);
        }
   },);
    return (
        <div ref ={dropdownref} className='dropdown'
        style={{position:"absolute",
        top:'100%',
        right: '0',
        backgroundColor:"00ffff"}}
        >
            {props.children}
        </div>)

}
export default Dropdown;
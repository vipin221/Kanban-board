import React from 'react';
import './Popup.css';

const Popup = (props) => {
    return <div className='popup ' onClick={()=> (props.onClose? props.onClose():"")}>
        <div className='popup_content c_scroll' onClick={(e)=> {e.stopPropagation()}}>
            {props.children}
        </div>


    </div>

}

export default Popup;
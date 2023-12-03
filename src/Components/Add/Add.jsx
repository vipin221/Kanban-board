import React, { useState } from 'react';
import { X } from 'react-feather';
import './Add.css';

const Add = (props) => {
    const [showedit, setshowedits] = useState(false);
    const [inputValue, setInputValue] = useState(props.default || "");
    return <div className='add ' >
        {
            showedit ? (
                <form className= {`editable_edits ${props.editsClass} || ""`} onSubmit={(e) => {
                    e.preventDefault();
                    if (props.onSubmit) props.onSubmit(inputValue);
                    setshowedits(false);
                    setInputValue("");
                }}>
                    <input 
                    autoFocus 
                    defaultValue={props.default}
                    onChange={(e)=> setInputValue(e.target.value)}
                    type={props.type ||'text'}
                    value={inputValue}
                     placeholder={props.ph || "Title"} />
                    <div className='add_footer'>
                        <button type='submit'> {props.buttonText || "Add"}</button>
                        <X onClick={() => setshowedits(false)} />
                    </div>
                </form>)
                : (<p className={`Add_button ${props.Add_button_class} || ""` } onClick={() => setshowedits(true)}>{props.text || "Add Card"}</p>)
        }

    </div>

}

export default Add;
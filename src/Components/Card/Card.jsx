import React, { useState } from 'react';
import './Card.css';
import { MoreHorizontal, Clock, CheckSquare } from 'react-feather';
import Chips from '../Chips/Chips';
import Dropdown from '../DropDown/Dropdown';
import Cardinfo from './CardInfo/Cardinfo';

const Card = (props) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    return <>
        {showPopup && <Cardinfo
            updateCard={props.updateCard}
            boardId={props.boardId}
            card={props.card} onClose={() => {
                setShowPopup(false);
            }} />}


        <div className='card'
            draggable
            onDragEnd={() => { props.handleDargEnd(props.card?.id, props.boardId) }}
            onDragEnter={() => { props.handleDargEnter(props.card?.id, props.boardId) }}
            onClick={() => setShowPopup(true)}
        >

            <div className='card_top'>
                <div className='labels'>
                    {props.card?.labels?.map((lbl, index) => <Chips
                        key={index} text={lbl.text} color={lbl.color}
                    />)}
                </div>
                <div className='card_top_more' onClick={() => setShowDropDown(true)}>
                    <MoreHorizontal />
                    {
                        showDropDown &&
                        (<Dropdown onClose={() => setShowDropDown(false)}>
                            <div className='card_more_dropdown'>
                                <p onClick={() => props.removeCard(props.card?.id, props.boardId)}> Delete Board</p>
                            </div>
                        </Dropdown>)
                    }

                </div>
            </div>
            <div className='card_title'>
                <p>{props.card?.title}</p>
            </div>
            <div className='card_footer'>
                {
                    props.card?.date &&
                    <div className='date'>
                        <Clock /> {props.card?.date}
                    </div>
                }
                {
                    props.card?.tasks?.length > 0 &&
                    <div className='tasks'>
                        <CheckSquare />
                        {props.card?.tasks?.filter(item => item.completed).length}/{props.card?.tasks?.length}
                    </div>
                }


            </div>

        </div>
    </>

};

export default Card;
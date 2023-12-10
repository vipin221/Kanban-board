import React, { useState } from 'react';
import './boards.css';
import { MoreHorizontal } from 'react-feather';
import Card from '../Card/Card';
import Add from '../Add/Add';
import Dropdown from '../DropDown/Dropdown';


const Board = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return <>
    <div className='board'>
      <div className='board_top'>
        <p className='board_top_title'>{props.board?.title} <span>{(props.board?.cards?.length) ? props.board?.cards?.length : ""}</span></p>
        
        <div className='board_top_more' onClick={(e) =>{setShowDropDown(true);
        e.stopPropagation()}}>
          <MoreHorizontal   />
          {
            showDropDown &&
            (<Dropdown onClose={() => setShowDropDown(false)}>
              <div className='board_more_dropdown'  onClick={() => props.removeBoard(props.board?.id)}>
                <p > Delete Board</p>
              </div>
            </Dropdown>)
          }

        </div>

      </div>
      <div className='boards_cards c_scroll'>
        {
          props.board?.cards?.map((item) =>
            <Card
              key={item.id} card={item}
              removeCard={props.removecard}
              boardId={props.board?.id}
              handleDargEnd={props.handleDargEnd}
              handleDargEnter={props.handleDargEnter}
              updateCard={props.updateCard}

            />)
        }

        <Add onSubmit={(value) => props.addcard(value, props.board?.id)} />
      </div>
    </div>

  </>
};

export default Board;
import React, {useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Boards/Board';
import Add from './Components/Add/Add';

function App() {

  const addcard = (title, bid) => {
    if (!title) return;
    const card = {
      id: Date.now + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: ""
    }

    const ind = boards.findIndex((it) => it.id === bid);
    if (ind < 0) return;
    const tempbd = [...boards];
    tempbd[ind].cards.push(card);
    setboards(tempbd);

  }
  const removecard = (cid, bid) => {
    const b_ind = boards.findIndex((item) => item.id === bid);
    if (b_ind < 0) return;
    const c_ind = boards[b_ind].cards.findIndex((item) => item.id === cid);
    if (c_ind < 0) return;


    const tempbd = [...boards];
    tempbd[b_ind].cards.splice(c_ind, 1);
    setboards(tempbd);
  }
  const addboard = (title) => {
    if (!title) return;
    setboards([...boards, {
      id: Date.now() + Math.random(),
      title,
      cards: [],
    }])
  }

  const removeBoard = (bid) => {
    const tempbd = boards.filter(item => item.id !== bid);
    setboards(tempbd);
  }


  const [boards, setboards] = useState(JSON.parse(localStorage.getItem("kanbanBoards")) || [])

  const [targetB, setTargetB] = useState({
    bid: "",
    cid: ""
  })

  const handleDargEnd = (cid, bid) => {
    debugger;
    let source_card_index, source_board_index, target_board_index, target_card_index;
    source_board_index = boards.findIndex(item => item.id === bid);
    if (source_board_index < 0) return;

    source_card_index = boards[source_board_index].cards.findIndex(item => item.id === cid);
    if (source_card_index < 0) return;

    target_board_index = boards.findIndex(item => item.id === targetB.bid);
    if (target_board_index < 0) return;

    target_card_index = boards[target_board_index].cards.findIndex((item) => {
      return item.id === targetB.cid
    }
    );
    if (target_card_index < 0) target_card_index = 0 ;

    let tempBoards = [...boards];
    const tempCard = tempBoards[source_board_index].cards[source_card_index];

    tempBoards[source_board_index].cards.splice(source_card_index, 1);

    tempBoards[target_board_index].cards.splice(target_card_index, 0, tempCard);
    setboards(tempBoards);


  }
  const handleDargEnter = (cid, bid) => {
    // debugger;
    setTargetB({
      cid,
      bid
    })

  }

  const updateCard = (cid, bid, card) => {
    const BIndex = boards.findIndex(item => item.id === bid);
    if (BIndex < 0) return;
  
   const CIndex = boards[BIndex].cards?.findIndex(item => item.id === cid);
    if (CIndex < 0) return;

    const tempbd = [...boards];
    tempbd[BIndex].cards[CIndex] = card;
    setboards(tempbd);
    
  }

  useEffect(()=>{
      localStorage.setItem("kanbanBoards", JSON.stringify(boards));
  },[boards])




  return (
    <div className="App">
      <div className='app_navbar'>
        <h2> KanBan <span>Boards</span></h2>

      </div>
      <div className='app_container'>
        <div className='app_boards'>
          {
            boards.map((item) =>
              <Board
                key={item.id} board={item}
                removeBoard={removeBoard}
                addcard={addcard}
                removecard={removecard}
                handleDargEnd={handleDargEnd}
                handleDargEnter={handleDargEnter}
                updateCard={updateCard}
              />)
          }

          <Add
            Add_button_class='add_board '
            text="Add Board"
            ph="Enter Board Title"
            onSubmit={(value) => addboard(value)}
          />

        </div>
      </div>

    </div>
  );
}

export default App;

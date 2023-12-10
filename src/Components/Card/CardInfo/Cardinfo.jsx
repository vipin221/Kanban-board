import React, { useEffect, useState } from 'react';
import Popup from '../../Popup/Popup';
import { Type, AlignCenter, Calendar, Tag, CheckSquare, Trash } from 'react-feather';
import Add from '../../Add/Add';
import './Cardinfo.css'
import Chips from '../../Chips/Chips';

const Cardinfo = (props) => {
    const colors = [
        "#c1121f",
        '#fb8500',
        '#023e8a',
        '#ff006e',
        '#38b000',
        '#9b5de5',
        '#15616d'
    ]
    const [activeColor, setactiveColore] = useState("");
    const [values, setValues] = useState({ ...props.card });


    const calculatetaskwidth = () => {
        if (values.tasks?.length === 0) return "0";
        const completed = values.tasks?.filter((item) => item.completed)?.length;
        return (completed / values.tasks?.length) * 100 + "";
    }

    const addlabels = (value, color) => {
        value = value.trimStart()
        if(value === "" ) return;
        const index = values.labels?.findIndex((item) => item.text === value);
        if (index > -1) return;
        const label = {
            text: value,
            color,
        }
        setValues({ ...values, labels: [...values.labels, label] });
        setactiveColore("");
    }
    const removelabels = (text) => {
        const templabels = values.labels?.filter((item => item.text !== text))
        setValues({ ...values, labels: templabels })
    }

    const AddTask =(value)=>{
        const task = {
            id:Date.now() + Math.random(),
            text: value,
            completed:false
        }
        setValues({...values, tasks:[...values.tasks,task]})
    }

    const Removetask = (taskID)=>{
        const temptask = values.tasks?.filter(item=> item.id !== taskID)
        setValues({...values,tasks:temptask});      
    }

    const updatetask = (id,completed)=>{
        const index = values.tasks?.findIndex(item=>item.id === id);
        if(index < 0 ) return;
        
        const temptask = [...values.tasks];
        temptask[index].completed = completed;
        setValues({...values,tasks:temptask});

    }
   
    
    useEffect(() => {
        props.updateCard(props.card?.id, props.boardId, values);
    }, [props, values]);



    return <div>
        <Popup onClose={() => { props.onClose() }}>
            <div className='cardInfo'>
                <div className='cardInfo_box'>
                    <div className='cardinfo_box_title'>
                        <Type /> Title 
                    </div>
                    <div className='cardInfo_add_container'>
                        <Add text={values.title}
                            default={values.title} ph='Enter Title'
                            buttonText={'Add title'}
                            onSubmit={(value) => setValues({ ...values, title: value })}
                            Add_button_class = {"buttonClass"}

                        />
                    </div>
                </div>

                <div className='cardInfo_box'>
                    <div className='cardinfo_box_title'>
                        <AlignCenter /> Description
                    </div>
                    <div className='cardInfo_add_container'>
                        <Add default={values.desc} text={values.desc} ph='Write Your Description'
                            buttonText={'Set Desc'}
                            onSubmit={(value) => setValues({ ...values, desc: value })}
                            Add_button_class = {"buttonClass"}
                        />
                    </div>
                </div>


                <div className='cardInfo_box'>
                    <div className='cardinfo_box_title'>
                        <Calendar /> Date
                    </div>
                    <div className='cardInfo_add_container'>
                        <input type='date'
                            defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                            onChange={(event) => setValues({ ...values, date: event.target.value })} />
                    </div>
                </div>


                <div className='cardInfo_box'>
                    <div className='cardinfo_box_title'>
                        <Tag /> Label
                    </div>
                    <div className='cardInfo_box_labels'>
                        {
                            values.labels?.map((item, index) => <Chips
                                close
                                key={item.text + index}
                                onClose={() => removelabels(item.value)}
                                color={item.color}
                                text={item.text}
                            />)
                        }
                    </div>
                    <div className='label_colors'>
                        {
                            colors.map((item, index) => <li key={index} style={{ backgroundColor: item }}
                                className={item === activeColor ? "active" : ""}
                                onClick={() => setactiveColore(item)}
                            />)
                        }
                    </div>
                    <div className='cardInfo_add_container'>
                        <Add text={"Add labels"} ph='Enter Title'
                            buttonText={'Add'}
                            onSubmit={(value) => addlabels(value, activeColor)} />

                    </div>
                </div>
                <div className='cardInfo_box'>
                    <div className='cardinfo_box_title'>
                        <CheckSquare /> Tasks
                    </div>
                    <div className='cardInfo_box_progress_bar'>
                        <div className='cardInfo_box_progress' style={{ width: calculatetaskwidth() + "%" ,
                        backgroundColor: calculatetaskwidth() ==="100"?"limegreen":""}}></div>
                    </div>
                    <div className='cardInfo_box_list'>
                        {
                            values.tasks?.map((item) =>
                                <div key={item.id} className='box_list'>
                                    <input type='checkbox'
                                        defaultValue={item.completed}
                                        onChange={(event)=>updatetask(item.id, event.target.checked)}
                                    />
                                    <p>{item.text}</p>
                                    <Trash onClick={()=>Removetask(item.id)} />
                                </div>

                            )
                        }
                    </div>

                    <div className='cardInfo_add_container'>
                        <Add text={"Add new task"} ph='Write your Task'
                            buttonText={'Add Task'}
                            onSubmit={(value)=>AddTask(value)}
                             />

                    </div>
                </div>
            </div>
        </Popup>
    </div>


}


export default Cardinfo;
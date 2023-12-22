import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import runningGif from '../assets/runningicon.gif'
import completedGif from '../assets/completegif.gif'
import switchOnGif from '../assets/switch-on.png'
import switchOffGif from '../assets/switch-off.png'



export default function ListsView(props) {

    const [todoItems, setTodoItems] = useState([]);
    const [count, setCount] = useState(0);

    const handleUpdate = () => {
        // Update the count state
        setCount(count + 1);
      };


    useEffect(() => {
        getTodo();
    }, [setTodoItems,count]);

    let getTodo = async () => {

        let response = await fetch('/api/todos/')
        let data = await response.json()

        // let completed=data.filter(d=>d.completed===true)
        // let running=data.filter(d=>d.completed===false)

        data.sort((a, b) => a.completed - b.completed)

        setTodoItems(data)
    };



    let updataTodo = async (id) => {
        const updatedTodo = todoItems.find(todo => todo.id === id);
        if (!updatedTodo) {
            return;
        }
    
        fetch(`/api/todos/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        });
        getTodo()
    }
    
    let handleClick = (id) => {
        let newData=todoItems
        let indexToUpdate = newData.findIndex(task => task.id === id);


        
        if (indexToUpdate !== -1) {
            
            newData[indexToUpdate].completed = !newData[indexToUpdate].completed;
            setTodoItems(newData)

            console.log(todoItems)

            updataTodo(id)
            
            
        }
    }


    return (
        <>
            <div className="list-group m-2">
                {todoItems.map((todo) => (


                    <div
                        key={todo.id}
                        className="list-group-item list-group-item-action"
                        aria-current="true"

                    >
                        <div className="d-flex w-100 justify-content-between">

                            <h5 className="mb-1 ">{todo.title}</h5>



                            <div>
                                <button
                                    type="button"
                                    className='btn'
                                    onClick={() => { handleClick(todo.id); handleUpdate(); }}
                                >
                                    {todo.completed === true ? (<img src={switchOffGif} alt="Your GIF" />) : (<img src={switchOnGif} alt="Your GIF" />)}
                                </button>
                                <Link to={`/${todo.id}`}>
                                    <button
                                        type="button"
                                        className='btn btn-secondary'

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    className='btn'>

                                    {todo.completed === true ? (<img src={completedGif} alt="Your GIF" />) : (<img src={runningGif} alt="Your GIF" />)}
                                </button>



                            </div>

                        </div>
                        <p className="mb-1">{todo.description}</p>
                        <small>3 days ago</small>
                    </div>

                ))}
            </div>
        </>
    );
}

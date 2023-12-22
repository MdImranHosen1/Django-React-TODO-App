import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

export default function RunningList(props) {

    const [todoItems, setTodoItems] = useState([]);
    


    
    useEffect(() => {
        getTodo();
    }, []);

    let getTodo = async () => {

        let response = await fetch('/api/todos/')
        let data = await response.json()

       
        data=data.filter(d=>d.completed===false)

       

        setTodoItems(data)       
    };

    const handleToggleComplete = (id) => {
        setTodoItems((prevTodoItems) => prevTodoItems.map((todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        )
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

                            <h5 className="mb-1 link-underline link-underline-opacity-0">{todo.title}</h5>

                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`flexSwitchCheck${todo.id}`}
                                    style={{ display: 'none' }}
                                    onChange={() => handleToggleComplete(todo.id)}
                                    checked={todo.completed}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`flexSwitchCheck${todo.id}`}

                                >

                                </label>
                            </div>

                            <button
                                type="button"
                                className={`btn ${todo.completed ? 'btn-success' : 'btn-primary'}`}
                                onClick={() => handleToggleComplete(todo.id)}
                            >
                                {todo.completed ? 'Completed' : 'Running'}
                            </button>
                            <Link to={`/${todo.id}`} >
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
                        </div>
                        <p className="mb-1">{todo.description}</p>
                        <small>3 days ago</small>
                    </div>

                ))}
            </div>
        </>
    );
}

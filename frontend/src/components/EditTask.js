import React, { useState,useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';

export default function EditTask() {
    const { id } = useParams();
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });

    useEffect(() => {

        const getTodo = async () => {
            try {
                let response = await fetch(`/api/todos/${id}`);
                let data = await response.json();
                setTodo(data);
            } catch (error) {
                console.error("Error fetching Todo:", error);
            }
        };
        console.log(todo);

        getTodo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    let updataTodo= async()=>{

        fetch(`/api/todos/${id}/`, {
            method: "PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(todo)
        })
    }


    return (
        <form>
            <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="title"
                    value={todo?.title}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                    Message:
                </label>
                <textarea
                    className="form-control"
                    id="message-text"
                    name="description"
                    value={todo?.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    name="completed"
                    checked={todo.completed}
                    onChange={handleChange}
                />
                <label className="form-check-label mb-3" htmlFor="flexCheckDefault">
                    Complete status
                </label>
            </div>
                <Link to ='/'>
                <button type="submit" className="btn btn-primary" onClick={updataTodo}>
                    Submit
                </button>
                </Link>

        </form>
    );
}

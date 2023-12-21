import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const createTodo = async (e) => {
        e.preventDefault();
        if (!todo.title) return;

        fetch(`/api/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        }).then(() => {
            // Redirect to the home page after successful submission
            navigate('/');
        });
    };

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
                    value={todo.title}
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
                    value={todo.description}
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

                <button type="submit" className="btn btn-primary" onClick={createTodo}>
                    Submit
                </button>

        </form>
    );
}

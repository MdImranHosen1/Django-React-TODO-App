import React from 'react'
import { Link } from 'react-router-dom'


export default function NavbarList() {
    return (
        <ul className="nav justify-content-center">
            
            <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">All task</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/add-task">
                    Add task
                    </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/running">Running </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/completed">Completed</Link>
            </li>
        </ul>
    )
}

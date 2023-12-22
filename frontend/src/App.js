import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListsView from "./components/ListsView";
import NavbarList from "./components/NavbarList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import CompletedList from "./components/CompletedList";
import RunningList from "./components/RunningList";


function App() {

    return (

        <BrowserRouter>

            <Navbar />
            <NavbarList/>
            
            <div className="container">
                
                <Routes>
                    <Route path="/"  element={<ListsView></ListsView>}/>
                    <Route path="/completed"  element={<CompletedList filter='completed'></CompletedList>}/>
                    <Route path="/running"  element={<RunningList filter='running'></RunningList>}/>
                    <Route path="/add-task" element={<AddTask></AddTask>}/>
                    <Route path="/:id" element={<EditTask></EditTask>}/>
                    
                </Routes>
            </div>
        </BrowserRouter>


    )
}

export default App

import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListsView from "./components/ListsView";
import NavbarList from "./components/NavbarList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";


function App() {



    return (

        <BrowserRouter>

            <Navbar />
            <NavbarList/>
            
            <div className="container">
                
                <Routes>
                    <Route path="/"  element={<ListsView></ListsView>}/>
                    <Route path="/add-task" element={<AddTask></AddTask>}/>
                    <Route path="/:id" element={<EditTask></EditTask>}/>
                    
                </Routes>
            </div>
        </BrowserRouter>


    )
}

export default App

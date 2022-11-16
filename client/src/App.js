import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Main from "./components/Main";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import { useState } from 'react';

import {ToastContainer} from 'react-toastify';
import EditableUserProfile from "./components/UserPage/EditableUserProfile";

import DeleteProfile from "./components/UserPage/DeleteProfile";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import UserPage from "./components/UserPage/UserPage";
function randomName() {
    return "Anonymous " 
}
function App() {
	const user = sessionStorage.getItem("user");
	const [editMode, setEditMode] = useState(false);

    const [firstName, setName] = useState(randomName());
	const [email, setEmail] = useState(randomName());
	const stored = {firstName, email};

	function handleEditComplete(result) {
        console.log("handleEditComplete", result);
        if (result != null) {
            setName(result.name);
            
        }        
        setEditMode(false);
    }

	return (

			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
			    <Route path="/" element ={<Navigate replace to="/login" />} />

				<Route path="/profile" exact element={<UserPage />} />
				<Route path="/profile/update" exact element={<EditableUserProfile />} />
				<Route path="/profile/delete" exact element={<DeleteProfile />} />
			</Routes>
			
	);
}

export default App;
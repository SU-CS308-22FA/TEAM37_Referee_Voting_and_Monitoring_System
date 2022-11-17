import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import HomePage from "./components/Screens/HomePage";
import Signup from "./components/Screens/SignUp";
import Login from "./components/Screens/Signin";

import UserProfile from "./components/Screens/UserPage/UserProfile";

import DeleteProfile from "./components/Screens/UserPage/DeleteProfile";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import UserPage from "./components/Screens/UserPage/UserPage";



function App() {
	const user = sessionStorage.getItem("token");
    console.log(user);
	return (

			<Routes>
				{user && <Route path="/" exact element={<HomePage />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
			    <Route path="/" element ={<Navigate replace to="/login" />} />

				<Route path="/profile" exact element={<UserPage />} />
				<Route path="/profile/update" exact element={<UserProfile />} />
				<Route path="/profile/delete" exact element={<DeleteProfile />} />
			</Routes>
			
	);
}

export default App;
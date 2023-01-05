import { Route, Routes, Navigate } from "react-router-dom";
import {React, useEffect, useState} from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector, Provider} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


import HomePage from "./components/Screens/HomePage";
import Signup from "./components/Screens/SignUp";
import Login from "./components/Screens/Signin";
import Navbar from "./components/Navbar";

import UpdateProfile from "./components/Screens/UserPage/UpdateProfile";
import DeleteProfile from "./components/Screens/UserPage/DeleteProfile";
import UserProfile from "./components/Screens/UserPage/UserProfile";
import UserPage from "./components/Screens/UserView/UserPage";

import Ref from "./components/Screens/Referee";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import EmailVerify from "./components/Screens/EmailVerify";
import ForgotPassword from "./components/Screens/ForgotPassword";
import PasswordReset from "./components/Screens/PasswordReset";

import RefereeProfile from "./components/Screens/referee-profile/RefereeProfile";
import AddReferee from "./components/Screens/RefereeAdmin/AddReferee";
import RefereeAdminPanel from "./components/Screens/RefereeAdmin/AdminPanel";
import UpdateReferee from "./components/Screens/RefereeAdmin/UpdateReferee";
import DeleteReferee from "./components/Screens/RefereeAdmin/DeleteReferee";

import Standings from "./components/Screens/Standings";
import Matches from "./components/Screens/Matches";
import Match from "./components/Screens/Matches/MatchDetails";
import Teams from "./components/Screens/Teams";
import TeamElement from "./components/Screens/Teams/TeamElement";

function App() {
  const user = localStorage.getItem("token");
  const [mode, setMode] = useState(['light']);
  useEffect(()=>{
    async function init() {
      const data = await localStorage.getItem('mode'); 
      setMode(data);
      
    }
    init();
  },[])

  
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (

    <GoogleOAuthProvider clientId="330490937140-hmot7hf3u41oijddu2efks7j3ffvoig0.apps.googleusercontent.com">
     <Navbar />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
     
          {user && <Route path="/" exact element={<HomePage />} />}
        
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />

          <Route path="/profile" exact element={<UserProfile />} />
          <Route path="/profile/update" exact element={<UpdateProfile />} />
          <Route path="/profile/delete" exact element={<DeleteProfile />} />
          <Route path="/user/:id" exact element={<UserPage />} />

          <Route path="/referees" exact element={<Ref />} />
          <Route path="/refereePanel" exact element={<RefereeAdminPanel />} />
          <Route path="/refereePanel/updateReferee/:id" exact element={<UpdateReferee />}/>
          <Route path="/refereePanel/deleteReferee/:id" exact element={<DeleteReferee />} />
          <Route path="/refereePanel/addReferee" exact element={<AddReferee />}/>

          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

          <Route path="/referee/:id" exact element={<RefereeProfile />} />
          <Route path="/standing" exact element={<Standings />} />
          <Route path="/matches" exact element={<Matches />} />
          <Route path="/matches/matchdetails/:id" element={<Match />} />
          <Route path="/teams" exact element={<Teams />} />
          <Route path="/teams/:id" element={<TeamElement />} />
        </Routes>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import HomePage from "./components/Screens/HomePage";
import Signup from "./components/Screens/SignUp";
import Login from "./components/Screens/Signin";
import Navbar from "./components/Navbar";

import UserProfile from "./components/Screens/UserPage/UpdateProfile";

import DeleteProfile from "./components/Screens/UserPage/DeleteProfile";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UserPage from "./components/Screens/UserPage/UserPage";
import Ref from "./components/Screens/Referee";

import EmailVerify from "./components/Screens/EmailVerify";
import ForgotPassword from "./components/Screens/ForgotPassword";
import PasswordReset from "./components/Screens/PasswordReset";

import RefereeProfile from "./components/Screens/referee-profile/RefereeProfile";
import AddReferee from "./components/Screens/HomePage/add-referee/AddReferee";
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
  return (
    <GoogleOAuthProvider clientId="330490937140-hmot7hf3u41oijddu2efks7j3ffvoig0.apps.googleusercontent.com">
      <Navbar />
      <Routes>
        {user && <Route path="/" exact element={<HomePage />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path="/profile" exact element={<UserPage />} />
        <Route path="/profile/update" exact element={<UserProfile />} />
        <Route path="/profile/delete" exact element={<DeleteProfile />} />

        <Route path="/referees" exact element={<Ref />} />
        <Route path="/refereePanel" exact element={<RefereeAdminPanel />} />
        <Route
          path="/refereePanel/updateReferee/:id"
          exact
          element={<UpdateReferee />}
        />
        <Route
          path="/refereePanel/deleteReferee/:id"
          exact
          element={<DeleteReferee />}
        />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

        <Route path="/referee/:id" exact element={<RefereeProfile />} />
        <Route path="/addreferee" exact element={<AddReferee />} />
        <Route path="/standing" exact element={<Standings />} />
        <Route path="/matches" exact element={<Matches />} />
        <Route path="/matches/matchdetails/:id" element={<Match />} />
        <Route path="/teams" exact element={<Teams />} />
        <Route path="/teams/:id" element={<TeamElement />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;

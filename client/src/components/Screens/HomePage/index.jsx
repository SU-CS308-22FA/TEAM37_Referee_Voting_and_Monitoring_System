import styles from "./styles.module.css";
import { googleLogout } from "@react-oauth/google";
import { sendVerifyEmail } from "../../axios";
import React from "react";
import { useState } from "react";

const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    googleLogout();
    window.location.reload();
  };

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const [data] = useState({
    email: user.email,
  });
  return (
    <div>
      <button className={styles.logout_button} onClick={handleLogout}>
        Logout
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendVerifyEmail(data)
            .then(() => {
              setMsg("An email sent to your account please verify !");
            })
            .catch((err) => {
              setError(err.response.data.message);
              setMsg("");
            });
        }}
      >
        <button className={styles.logout_button}>Verify My Account</button>
      </form>
      <h1>{msg}</h1>
    </div>
  );
};

export default HomePage;

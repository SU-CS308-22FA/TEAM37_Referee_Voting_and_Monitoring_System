import React, { Component, Fragment } from "react";
import { purple, red } from "@mui/material/colors";
import { withTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DeleteProfile({}) {
  const navigate = useNavigate();
  console.log("Delete Profile");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [email, setEmail] = useState(user.email);
  const handleDeleteClicked = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://weeklysoccer.vercel.app/api/users/" +
        user._id +
        "?_id=" +
        user._id;
      const {
        data: { user: updatedUser, message: message },
      } = await axios.delete(url, { email });
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
      }
    }
  };

  function handleCancelClicked() {
    console.log("Cancelled");
    navigate("/profile");
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form
            className={styles.form_container}
            onSubmit={handleDeleteClicked}
          >
            <h1>Do you want to delete your account?</h1>

            <button
              stype="button"
              className={styles.green_btn}
              onClick={handleDeleteClicked}
            >
              Delete
            </button>
            <button
              stype="button"
              className={styles.gray_btn}
              onClick={handleCancelClicked}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

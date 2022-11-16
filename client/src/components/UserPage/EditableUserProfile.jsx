import { useState, useEffect } from "react";
import Group from "./Group";
import axios from "axios";
import { purple, red } from "@mui/material/colors";
import { withTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export default function EditableUserProfile({}) {
  const navigate = useNavigate();
  console.log("Edit User Profile");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [firstName, setName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleSaveClicked = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://weeklysoccer.vercel.app/api/users/" +
        user._id +
        "?_id=" +
        user._id;
      const {
        data: { user: updatedUser, message: message },
      } = await axios.put(url, { firstName, lastName, email: user.email });
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/profile");
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

  const buttonStyle = {
    backgroundColor: withTheme,
    color: purple,
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSaveClicked}>
            <h1>Edit your information:</h1>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.input}
            />

            <button
              stype="button"
              className={styles.purple_btn}
              onClick={handleSaveClicked}
            >
              Save
            </button>
            <button
              stype="button"
              className={styles.purple_btn}
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

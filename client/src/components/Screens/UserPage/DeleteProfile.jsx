import React from "react";

import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { handleDelete} from "../../axios";
import { useState} from "react";


export default function DeleteProfile({}) {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({fullname: user.fullname , nickname: user.nickname, email: user.email });
  const [error, setError] = useState("");


  function handleCancelClicked() {
    console.log("Cancelled");
    navigate("/profile");
  }

  return (
    <div className={styles.login_container} >
      <div className={styles.login_form_container}>
        <div className={styles.left2}>
          <form
            className={styles.form_container}
            onSubmit={(e) => {
              e.preventDefault();
              handleDelete(data, user._id)
              .then((res) => { navigate("/login");
              })
              .catch((err) => setError(err.response.data.message))           
            }}
            >
            <h2>This is your final warning are you sure?</h2>

            <button type="submit" className={styles.red_btn}>           
              Delete
            </button>
            <button stype="button" className={styles.green_btn} onClick={handleCancelClicked}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

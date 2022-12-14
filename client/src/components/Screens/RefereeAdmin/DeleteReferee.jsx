import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { handleDeleteReferee} from "../../axios";
import { useState} from "react";


export default function DeleteReferee({}) {

  const navigate = useNavigate();

  let { id } = useParams();
  const [error, setError] = useState("");


  function handleCancelClicked() {
    console.log("Cancelled");
    navigate("/refereePanel");
  }

  return (
    <div className={styles.login_container} >
      <div className={styles.login_form_container}>
        <div className={styles.left2}>
          <form
            className={styles.form_container}
            onSubmit={(e) => {
              e.preventDefault();
              handleDeleteReferee(id)
              .then((res) => { navigate("/refereePanel");
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

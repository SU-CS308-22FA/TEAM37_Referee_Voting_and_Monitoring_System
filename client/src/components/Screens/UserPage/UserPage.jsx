import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";
const UserPage = () => {
  const [data, setData] = useState({
    firstName: "",
  });

  console.log("USERPAGE");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/profile/update");
  };

  const handleDelete = () => {
    navigate("/profile/delete");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img src="https://i.imgur.com/tdi3NGa_d.webp?maxwidth=760&fidelity=grand" alt="user" width="100"></img>
        <h4>{user.fullname}</h4>
        <p>{user.nickname}</p>
      </div>

      <div className={styles.right}>
        <div className={styles.info}>
          <h3>Information</h3>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>

            <div className={styles.data}>
              <h4>Nick Name</h4>
              <p>{user.nickname}</p>
            </div>
          </div>
        </div>

        <div className={styles.projects}>
          <h3>Activities</h3>
          <div className={styles.projects_data}>
            <div className={styles.data}>
              <h4>Recent Votes</h4>
              <p>PLACEHOLDER</p>
            </div>
            <div className={styles.data}>
              <h4>Most Viewed</h4>
              <p>PLACEHOLDER</p>
            </div>
          </div>
        </div>

        <div className={styles.button_div}>
          <form onSubmit={handleUpdate}>
            <button
              stype="button"
              className={styles.purple_btn}
              onClick={handleUpdate}
            >
              Update
            </button>

            <button
              stype="button"
              className={styles.purple_btn}
              onClick={handleDelete}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default UserPage;

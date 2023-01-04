import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { sendVerifyEmail } from "../../axios";

import styles from "./styles.module.css";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const data = {
    email: user.email,
  };

  const handleUpdate = () => {
    navigate("/profile/update");
  };

  const handleDelete = () => {
    navigate("/profile/delete");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img
          src="https://i.imgur.com/tdi3NGa_d.webp?maxwidth=760&fidelity=grand"
          alt="user"
          width="100"
        ></img>
        <h4>{user.fullname}</h4>
        <p>{user.nickname}</p>

        <div className={styles.button_div}>
          <form onSubmit={handleUpdate}>
            <button stype="button" onClick={handleUpdate}>
              Update
            </button>

            <button stype="button" onClick={handleDelete}>
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.info}>
          <h3>Information</h3>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>Email</h4>
              <p>{user.email}</p>
              <p>
                Email is{" "}
                <b>
                  {user.verified ? "verified. " : "not verified. "}
                  {user.verified ? <FcCheckmark /> : <FcCancel />}
                </b>
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendVerifyEmail(data)
                    .then(() => {
                      setMsg(
                        "An email sent to your email address please verify!"
                      );
                    })
                    .catch((err) => {
                      setError(err.response.data.message);
                      setMsg("");
                    });
                }}
              >
                <button
                  disabled={user.verified}
                  className={styles.verify_email_button}
                >
                  {user.verified ? "Account is verified" : "Verify My Account"}
                </button>
              </form>
              <p className={styles.sent_message}>{msg}</p>
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
              <h4>PLACEHOLDER</h4>
              <p>PLACEHOLDER</p>
            </div>
            <div className={styles.data}>
              <h4>Most Viewed</h4>
              <p>PLACEHOLDER</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

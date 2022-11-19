import { useState } from "react";

import { handleEdit} from "../../axios";

import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


export default function UserProfile({}) {

  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({fullname: user.fullname , nickname: user.nickname, email: user.email });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  function handleCancelClicked() {
    console.log("Cancelled");
    navigate("/profile");
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left2}>
          <form className={styles.form_container} onSubmit={(e) => {
              e.preventDefault();
              handleEdit(data, user._id)
              .then((res) => { navigate("/profile");
              })
              .catch((err) => setError(err.response.data.message))           
            }}
            >
            <h1>Edit your information:</h1>
            <input
              type="fullname"
              placeholder="Fullname"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
              className={styles.input}
            />
            <input
               type="nickname"
               placeholder="Nickname"
               name="nickname"
               value={data.nickname}
               onChange={handleChange}
               className={styles.input}
            />
            <input
               type="email"
               placeholder="Email"
               name="email"
               value={data.email}
               onChange={handleChange}
               className={styles.input}
            />
            
            <button type="submit" className={styles.green_btn}>           
              Save
            </button>
            <button stype="button" className={styles.red_btn} onClick={handleCancelClicked}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

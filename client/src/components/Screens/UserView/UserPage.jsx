import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { getUserDetails } from "../../axios";

import styles from "./styles.module.css";

const UserPage = () => {

  let { id } = useParams();


  const [user1, setUser] = useState({});

  const handleDelete = () => {
    console.log("inside page")
    console.log(user1)

  };

  useEffect(()=>{
    getUserDetails(id).then(res=>{
      setUser(res.user) 
      console.log('inside effect') 
      console.log(res.user)
    })
  },[])


  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img
          src={user1.imageurl}
          alt="user"
          width="100"
        ></img>
        <h4>{user1.fullname}</h4>
        <p>{user1.nickname}</p>

        <div className={styles.button_div}>
     

            <button stype="button" onClick={handleDelete}>
              Delete
            </button>
          
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.info}>
          <h3>Information</h3>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>Email</h4>
              <p>{user1.email}</p>
              
              <p className={styles.sent_message}>{}</p>
            </div>

            <div className={styles.data}>
              <h4>Nick Name</h4>
              <p>{user1.nickname}</p>
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


export default UserPage;

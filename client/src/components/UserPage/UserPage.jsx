import { useState } from 'react';
import Group from './Group';
import { Link, useNavigate } from "react-router-dom";

import { withTheme } from '@emotion/react';
import { purple, red } from '@mui/material/colors';
import styles from "./styles.module.css";
const UserPage = () =>{

  const [data, setData] = useState({
		firstName: "",
		

	});
  console.log("USERPAGE")
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const handleChange = event => {
    setData(event.target.value);
    console.log('value is:', event.target.value);
  };
  const handleUpdate = () => {
		navigate("/profile/update");
	};
  const handleDelete = () => {
		navigate("/profile/delete");
	};

    const buttonStyle = {
        backgroundColor: withTheme,
        color: purple
    };

    
    return (
      <div className={styles.login_container}>
			 <div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleUpdate}>
						<h1>My Profile</h1>
        
            <h2 >Name:</h2> 
            {user.firstName}
						
      
            <h3>Last Name:</h3> {user.lastName}
        
            <h4>Email:</h4> {user.email}

            
            <button stype="button" className={styles.purple_btn} onClick={handleUpdate}>Update</button>
            <button stype="button" className={styles.purple_btn} onClick={handleDelete}>Delete</button>
            </form>
       </div>
        
		  </div>
      </div>
    );
};

export default UserPage;

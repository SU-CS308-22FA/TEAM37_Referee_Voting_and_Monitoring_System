import { useState } from 'react';

import { useNavigate } from "react-router-dom";


import styles from "./styles.module.css";
const UserPage = () =>{

  const [data, setData] = useState({
		firstName: "",
		

	});
  console.log("USERPAGE")
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  
  const handleUpdate = () => {
		navigate("/profile/update");
	};
  const handleDelete = () => {
		navigate("/profile/delete");
	};

    

    
    return (
      <div className={styles.login_container}>
			 <div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleUpdate}>
						<h1>My Profile</h1>
        
            <h2 >Full Name: {user.fullname}</h2> 
          						
      
            <h3>Nick Name: {user.nickname}</h3> 
        
            <h4>Email: {user.email} </h4> 

            
            <button stype="button" className={styles.purple_btn} onClick={handleUpdate}>Update</button>
            <button stype="button" className={styles.purple_btn} onClick={handleDelete}>Delete</button>
            </form>
       </div>
        
		  </div>
      </div>
    );
};

export default UserPage;

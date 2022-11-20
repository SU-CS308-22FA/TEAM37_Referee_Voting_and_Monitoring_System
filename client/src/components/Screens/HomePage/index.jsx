import styles from "./styles.module.css";
import { googleLogout } from '@react-oauth/google';
import React from "react";


const HomePage = () => {

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		googleLogout();
		window.location.reload();
	};

	
	return (
		<div >
			<button className={styles.logout_button} onClick={handleLogout}>
				Logout
			</button>		
		</div>
	);
};

export default HomePage;
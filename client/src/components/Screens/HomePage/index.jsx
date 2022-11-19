import styles from "./styles.module.css";

import React from "react";


const HomePage = () => {

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
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
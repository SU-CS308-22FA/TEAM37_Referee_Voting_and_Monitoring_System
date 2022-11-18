import styles from "./styles.modules.css";
import React from "react";


const HomePage = () => {

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		window.location.reload();
	};

	
	return (
		<div className={styles.main_container}>
			<button className={styles.green_btn} onClick={handleLogout}>
				Logout
			</button>		
		</div>
	);
};

export default HomePage;
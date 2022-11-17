import styles from "./styles.modules.css";
import React from "react";

import { useNavigate } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";



const HomePage = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		navigate("/login");
		
	};
	
	const [value, setValue] = useState();
	
	return (
		<div className={styles.main_container}>
			<AppBar sx={{ backgroundColor: "#3b3db1" }} position="sticky">
				<Toolbar>
					<Tabs
					sx={{ ml: "auto" }}
					textColor="inherit"
					indicatorColor="primary"
					value= "undefined"
					
					>
						
						<Tab LinkComponent={NavLink} to="/" label="Players" />
						<Tab LinkComponent={NavLink} to="/" label="Matches" />
						<Tab LinkComponent={NavLink} to="/" label="Referees" />
						<Tab LinkComponent={NavLink} to="/profile" label="My Profile" />
					</Tabs>

				</Toolbar>
			</AppBar>
			<button className={styles.green_btn} onClick={handleLogout}>
				Logout
			</button>
				
		</div>
	);
};
		
export default HomePage;
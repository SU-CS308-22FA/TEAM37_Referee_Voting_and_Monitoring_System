import { useState } from "react";
import React from "react";
import { Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import { handleSignin, handleGoogle} from "../../axios";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  // localStorage.removeItem("token");
	// localStorage.removeItem("user");
  return (
    
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={(e) => {
              e.preventDefault();
              handleSignin(data)
              .then((res) => { window.location = "/";
              })
              .catch((err) => setError(err.response.data.message))           
            }}
            >
            <h1>Sign in to your account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
              
          </form>
          <div className={styles.bottom}>
              <GoogleLogin size = "large" theme = "filled_blue" width="400"
                onSuccess={(credentialResponse) => {
                handleGoogle(credentialResponse)
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              />
          </div>
          <div className={styles.bottom}>
          <h1> New account? Join now</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
         </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;

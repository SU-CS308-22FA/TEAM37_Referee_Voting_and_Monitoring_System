import { useState } from "react";
import React from "react";
import { handleSignup} from "../../axios";
import {useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    fullname: "",
    nickname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value }) 
  };


  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={(e) => {
              e.preventDefault();
              handleSignup(data)
              .then((res) => { navigate("/login");
              })
              .catch((err) => setError(err.response.data.message))           
            }}
            >
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={handleChange}
              value={data.fullname}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Nick Name"
              name="nickname"
              onChange={handleChange}
              value={data.nickname}
              required
              className={styles.input}
            />
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

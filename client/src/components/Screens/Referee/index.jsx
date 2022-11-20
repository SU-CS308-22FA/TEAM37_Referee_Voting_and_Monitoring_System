import { useState } from "react";
import React from "react";
import { handleSignup} from "../../axios";
import {useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Ref = () => {
  

  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  return (
    <h1>
      REFEREE PAGE
    </h1>
  )
};

export default Ref

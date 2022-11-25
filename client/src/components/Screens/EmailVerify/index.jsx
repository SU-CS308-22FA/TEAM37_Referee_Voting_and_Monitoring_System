import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { FcCheckmark } from "react-icons/fc";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/users/${param.id}/verify/${param.token}`;
        const { data: res } = await axios.get(url);
        localStorage.setItem("user", JSON.stringify(res.user));
        console.log(res);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {validUrl ? (
        <div className={styles.container}>
          <h1>
            Email verified successfully <FcCheckmark />
          </h1>
          <Link to="/">
            <button className={styles.green_btn}>Homepage</button>
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>404 Not Found</h1>
          <h3>The link is expired</h3>
        </div>
      )}
    </>
  );
};

export default EmailVerify;

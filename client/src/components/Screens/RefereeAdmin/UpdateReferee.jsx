import { useState, useEffect } from "react";

import { handleUpdateReferee} from "../../axios";

import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { getRefereeDetails } from '../../axios';

export default function UptadeReferee({}) {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  let { id } = useParams();
  const [referee, setReferee] = useState({name: '' , imageurl:'', age: '',matches:'', redcard: '', yellowcard:'', description:'' });

  useEffect(()=>{
    getRefereeDetails(id).then(res=>{
      setReferee(res)
    })
  },[id])

  const handleChange = ({ currentTarget: input }) => {
    setReferee({ ...referee, [input.name]: input.value });
  };

  function handleCancelClicked() {
    console.log("Cancelled");
    navigate("/refereePanel");
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if (referee.name==='' || referee.imageurl==='' || referee.age==='' || referee.matches==='' || referee.redcard==='' || referee.yellowcard==='' || referee.description==='') {
      alert('Please fill all the fields!')
      return
    }
    handleUpdateReferee(referee,id)
                  .then((res) => {
                    e.target.reset()
                     navigate("/refereePanel");
                  })
                  .catch((err) => console.log(err.response.data.message)) 
    
      }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left2}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Update Referee information:</h1>
            <input
              type="text"
              placeholder="Fullname"
              name="name"
              value={referee.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={referee.age}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
               type="text"
               placeholder="Image url"
               name="imageurl"
               value={referee.imageurl}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <input
               type="text"
               placeholder="Matches"
               name="matches"
               value={referee.matches}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <input
               type="text"
               placeholder="Red Cards"
               name="redcard"
               value={referee.redcard}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <input
               type="text"
               placeholder="Yellow Cards"
               name="yellowcard"
               value={referee.yellowcard}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <textarea
               type="text"
               placeholder="Description"
               name="description"
               value={referee.description}
               onChange={handleChange}
               className={styles.input}
               required
            />           
            <button type="submit" className={styles.green_btn}>           
              Save
            </button>
            <button stype="button" className={styles.red_btn} onClick={handleCancelClicked}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { handleAddReferee } from "../../../axios";
import styles from "./styles.module.css";


export default function AddReferee({props}) {

  const navigate = useNavigate();


  const [data, setData] = useState({name: '' , imageurl:'', age: '',matches:'', redcard: '', yellowcard:'', description:'' });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit=(e)=>{
e.preventDefault()
if (data.name==='' || data.imageurl==='' || data.age==='' || data.matches==='' || data.redcard==='' || data.yellowcard==='' || data.description==='') {
  alert('Please fill all the fields!')
  return
}
handleAddReferee(data)
              .then((res) => {
                e.target.reset()
                 navigate("/referees");
              })
              .catch((err) => console.log(err.response.data.message)) 

  }

  function handleCancelClicked() {

    navigate("/referees");
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left2}>
          <form className={styles.form_container} onSubmit={handleSubmit} 
            >
            <h1>Add new referee:</h1>
            <input
              type="text"
              placeholder="Fullname"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={data.age}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
               type="text"
               placeholder="Image url"
               name="imageurl"
               value={data.imageurl}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <input
               type="text"
               placeholder="Matches"
               name="matches"
               value={data.matches}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <input
               type="text"
               placeholder="Red Cards"
               name="redcard"
               value={data.redcard}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <input
               type="text"
               placeholder="Yellow Cards"
               name="yellowcard"
               value={data.yellowcard}
               onChange={handleChange}
               className={styles.input}
               required
            />
            <textarea
               type="text"
               placeholder="Description"
               name="description"
               value={data.description}
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

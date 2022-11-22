import { useState, useEffect } from "react";
import React from "react";

import {useNavigate } from "react-router-dom";
import './league.css';
import axios from "axios";
import {Table} from 'react-bootstrap'
import styles from "./styles.module.css";


const Matches = () => {
  

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [team, setteam] = useState("test");
  const [year, setyear] = useState("2021");
  const [season, setSeason] = useState("tur.1");
   
  

    var config = {
      method: 'get',
      url: 'https://v3.football.api-sports.io/standings',
      params:{
        league: '203',season: '2022'
      },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": '9d3f470a106c6ce69d1b6e6c4adff0f0',
    }};
    
    axios(config)
    .then(function (response) {
      setteam(response.data);
      localStorage.setItem("teams", response);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  
  return (
    <>

        <div className='tournament'>{year} - Season {season}</div>
        <button stype="button" className={styles.green_btn} onClick={test}>
              Cancel
         </button>

  <div style={{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  }}><table className='points-table' size={window.innerWidth > 556?'lg':'sm'}>
  <thead>
    <tr>
  
      <th>#</th>
      <th>Logo</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Loss</th>
      <th>Draws</th>
      <th>Games</th>
      <th>GF</th>
      <th>GA</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</table></div>

</>
  )
}


export default Matches

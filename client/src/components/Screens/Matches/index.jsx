import { useState, useEffect } from "react";
import React from "react";

import {renderMatches, useNavigate } from "react-router-dom";
import './league.css';
import axios from "axios";
import {Table} from 'react-bootstrap'
import styles from "./styles.module.css";
import './table.css';

const Matches = () => {
  

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [team, setteam] = useState("test");
  
   
  // useEffect(() => {
  //   // 👇️ this only runs once
  //   console.log('useEffect ran');

  //   // 👇️ fetch data from remote API

  //   async function getApi() {
  //     try {
  //       const response = await axios(config);
  //          const standings = response.data.response.league.standings[0]
  //       setteam(standings);
  // //     localStorage.setItem("teams", JSON.stringify(standings);
  // //     console.log(response.data);

       

  //       console.log(team);

  //     } catch (err) {
  //       console.log(error);
  //     }
  //   }

  //   getApi();
  // }, []);
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
          
  useEffect(() => {
		if (window.localStorage !== undefined) {
			const data = window.localStorage.getItem('teams');
      try{
        if(data !== null){
          setteam(JSON.parse(data))
        } 
      }
     catch (err) {
			console.log(err);
		}
		}
	}, []);

  const callAPI = async () => {
		try {
			const response = await axios(config);
      const standings = response.data.response[0].league.standings[0];
			console.log(response);
			localStorage.setItem("teams", JSON.stringify(standings));
			setteam(standings);
      console.log(team);
      const data1 = window.localStorage.getItem('teams');
      console.log(data1);
		} catch (err) {
			console.log(err);
		}
	};
  const print = async () => {
		const data = window.localStorage.getItem('teams');
    console.log(team);
	};

 
  return (
    <>

        
        <button onClick={callAPI}>Call API</button>
        <button onClick={print}>Print</button>
       
        <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mt-2">
                       
                        </div>
                    </div>
                
                    <div className="table-responsive mt-5">
                        <table className="table">
                        <thead><tr><td colSpan="9"><h3>{"TFF"}</h3></td></tr><tr><th className="position">#</th><th className="team" colSpan="2">Team</th><th className="played">Played</th><th className="won">Won</th><th className="draw">Draw</th><th className="lost">Lost</th><th className="ga">GF</th><th className="ga">GA</th><th className="points">Points</th></tr></thead>;
                          <tbody>
                            {team.map(standing => (
                              
                            <tr >
                              <td>{standing.rank}</td>
                              
                              <td className="badge-td"><div className="badge"><img src={standing.team.logo} alt={standing.team.name} /></div></td>
                              <td className="text-left">{standing.team.name}</td>
                              <td>{standing.all.played}</td>
                              <td>{standing.all.win}</td>
                              <td>{standing.all.draw}</td>
                              <td>{standing.all.lose}</td>
                              <td>{standing.all.goals.for}</td>
                              <td>{standing.all.goals.against}</td>
                              
                              <td>{standing.points}</td>

                           </tr>
                            ))}
                         </tbody>
                        </table>
                    </div>

                </div>
            </div>
 
</>
  )
}


export default Matches

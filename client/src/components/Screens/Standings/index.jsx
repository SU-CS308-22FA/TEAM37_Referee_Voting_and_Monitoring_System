import { useState, useEffect } from "react";
import React from "react";

import {renderMatches, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import './table.css';

const Standings = () => {
  
  
  const [team, setteam] = useState();
 

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
      console.log("use effect called");

      console.log(team);
      try{
        if(data !== null){
          setteam(JSON.parse(data))
          console.log("INSIDE IF");
          console.log(team);

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
			localStorage.setItem("teams", JSON.stringify(standings));
			setteam(standings);
		} catch (err) {
			console.log(err);
		}
	};
  const print = async () => {
		const data = window.localStorage.getItem('teams');
    console.log("print called");
    console.log(team);
  
	};

 
  return (
    <>
     
        <button onClick={callAPI} className={styles.green_btn} align = "center">
         Call API
        </button>
       
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center mt-2">
                    
                    </div>
                </div>           
                  <table className="table" size={window.outerWidth } align = "center" >
                    <thead>
                      <tr>
                         <td colSpan="9"><h3>{"TFF"}</h3></td>
                      </tr>
                      <tr>
                         <th className="position">#</th><th className="team" colSpan="2">Team</th><th className="played">Played</th><th className="won">Won</th><th className="draw">Draw</th><th className="lost">Lost</th><th className="ga">GF</th><th className="ga">GA</th><th className="points">Points</th>
                      </tr>
                    </thead>;
                      <tbody>
                      {team && team.map((standing, key) =>{
                        
                        return <tr key={key}>
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
                      })}
                      </tbody>
                    </table>
                </div>
            </div>       
</>
  )
}


export default Standings

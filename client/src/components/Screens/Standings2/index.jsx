import { useState, useEffect } from "react";
import React from "react";
import Select from "react-select";

import { renderMatches, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import "./table.css";
import { requestStandings } from "../../axios";

const Standings = () => {
  const leagueOptions = [
    {
      value: 203,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/4/4f/Süper_Lig_logo.svg"
            }
            height="30px"
            width="25px"
          />
          {" Super League"}
        </span>
      ),
    },
    {
      value: 39,
      label: (
        <span>
          <img
            src={
              "https://media-2.api-sports.io/football/leagues/39.png"
            }
            height="30px"
            width="25px"
          />
          {"Premier League"}
        </span>
      ),
    },
    {
      value: 140,
      label: (
        <span>
          <img
            src={
              "https://media-2.api-sports.io/football/leagues/140.png"
            }
            height="30px"
            width="25px"
          />
          {" La Liga"}
        </span>
      ),
    },
    {
      value: 78,
      label: (
        <span>
          <img
            src={
              "https://media-2.api-sports.io/football/leagues/78.png"
            }
            height="30px"
            width="25px"
          />
          {"Bundesliga"}
        </span>
      ),
    },
    {
      value: 553,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/archive/4/47/20200909222954%21TFF3_kopya.png"
            }
            height="30px"
            width="25px"
          />
          {" TFF 3. League 2"}
        </span>
      ),
    },
    {
      value: 554,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/archive/4/47/20200909222954%21TFF3_kopya.png"
            }
            height="30px"
            width="25px"
          />
          {" TFF 3. League 3"}
        </span>
      ),
    },
    {
      value: 206,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/6/61/Ziraat_Türkiye_Kupası_logosu.png"
            }
            height="30px"
            width="25px"
          />
          {" Turkish Cup"}
        </span>
      ),
    },
    {
      value: 551,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/6/61/Türkiye_Süper_Kupası_logo.png"
            }
            height="30px"
            width="25px"
          />
          {" Super Cup"}
        </span>
      ),
    },
  ];
  const seasonOptions = [];
  for (var i = 1; i <= 6; i++) {
    seasonOptions.push({
      value: 2023 - i,
      label: "Season " + String(2023 - i),
    });
  }

  const [selectedLeagueOption, setSelectedLeagueOption] = useState(
    leagueOptions[0]
  );
  const [selectedSeasonOption, setSelectedSeasonOption] = useState(
    seasonOptions[0]
  );

  const [team, setTeam] = useState([]);

  useEffect(() => {
    const data1 = window.sessionStorage.getItem('teams');
    if(data1 === null || team.length === 0){
      console.log("inside use effect if");
      requestStandings(selectedLeagueOption["value"],selectedSeasonOption["value"])
    .then((data) => setTeam(data));
      sessionStorage.setItem("teams", JSON.stringify(team));
      console.log(team); 
    }
    console.log("frontende team");
    console.log(team); 
    console.log("dataYENI");
    console.log(data1);

  }, []);

  const callAPI = async () => {
    requestStandings(selectedLeagueOption["value"],selectedSeasonOption["value"])
    .then((data) => setTeam(data));
    console.log("front end butonuna geldi");
    console.log(team);
    // try {
    //   const standings = requestStandings(selectedLeagueOption["value"],selectedSeasonOption["value"]);
    //   console.log("front end butonuna geldi");
    //   console.log(standings);
      
    // } catch (err) {
    //   console.log(err);
    // }
    // const data1 = window.localStorage.getItem('teams');
    // console.log("data buton");
    // console.log(data1);
    // setTeam(JSON.parse(data1));
    // console.log(team);

  };

  const print = async () => {
    const data = window.localStorage.getItem("teams");
    console.log("print called");
    console.log(team);
  };

  return (
    <>
      <button onClick={callAPI} className={styles.green_btn} align="center">
        Call API
      </button>
      <div className="select-option">
        <Select
          defaultValue={selectedLeagueOption}
          onChange={setSelectedLeagueOption}
          options={leagueOptions}
        />
        <Select
          defaultValue={selectedSeasonOption}
          onChange={setSelectedSeasonOption}
          options={seasonOptions}
          isSearchable={true}
        />
        
      </div>
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mt-2"></div>
          </div>
          <table className="table" size={window.outerWidth} align="center">
            <thead>
              <tr>
                <td colSpan="9">
                  <h3>{"TFF"}</h3>
                </td>
              </tr>
              <tr>
                <th className="position">#</th>
                <th className="team" colSpan="2">
                  Team
                </th>
                <th className="played">Played</th>
                <th className="won">Won</th>
                <th className="draw">Draw</th>
                <th className="lost">Lost</th>
                <th className="ga">GF</th>
                <th className="ga">GA</th>
                <th className="points">Points</th>
              </tr>
            </thead>
            ;
            <tbody>
              {team &&
                team.map((standing, key) => {
                  return (
                    <tr key={key}>
                      <td>{standing.rank}</td>
                      <td className="badge-td">
                        <div className="badge">
                          <img
                            src={standing.team.logo}
                            alt={standing.team.name}
                          />
                        </div>
                      </td>
                      <td className="text-left">{standing.team.name}</td>
                      <td>{standing.all.played}</td>
                      <td>{standing.all.win}</td>
                      <td>{standing.all.draw}</td>
                      <td>{standing.all.lose}</td>
                      <td>{standing.all.goals.for}</td>
                      <td>{standing.all.goals.against}</td>
                      <td>{standing.points}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Standings;

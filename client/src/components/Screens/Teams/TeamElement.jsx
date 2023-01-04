import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./TeamElement.css";
import { useParams } from "react-router-dom";
import { requestSquads } from "../../axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { MdArrowBackIosNew } from "react-icons/md";

const TeamElement = () => {
  const { id } = useParams();
  const [squadData, setSquadData] = useState([]);

  useEffect(() => {
    requestSquads(id).then((data) => {
      setSquadData(data);
    });
  }, []);

  console.log(squadData);

  if (squadData == null) {
    return null;
  }

  return (
    <Container className="p-5">
      <div className="team-page-general-info-container">
        <div className="grid-container">
          <Link to="/teams" className="back-to-mathces-button">
            <MdArrowBackIosNew />
            <span>Teams</span>
          </Link>
          <div className="middle-grid-item">
            <Link className="header-league-css" to="/standing">
              <div className="league-icon league-icon-container">
                <img alt="League Logo" width="25" height="25" src={""} />
              </div>
            </Link>
          </div>
        </div>

        <header className="general-scoreboard">
        
          <a>
            <div className="home-team">
              <span className="teamName"></span>
            </div>
          </a>
          <div className="match-info">
          <img alt="League Logo" width="325" height="325" src={squadData ? "" : squadData.team.logo} />
            <span className="match-info-top"></span>
            <span className="match-info-bottom"></span>
          </div>
          <a>
            <div className="away-team">
              <span className="teamName"></span>
            </div>
          </a>
        </header>
      </div>

      <Table
        striped
        variant="light"
        hover
        style={{ color: "black", textAlign: "center", borderRadius: "20px" }}
      >
        <thead>
          <tr style={{ height: "40px" }}>
            <th></th>
            <th>Name</th>
            <th>Age</th>
            <th>Number</th>
            <th>Position</th>
          </tr>
        </thead>

        <tbody style={{ padding: "10px", height: "40px" }}>
          {squadData.players &&
            squadData.players.map((playerElement, playerIdx) => (
              <tr key={playerIdx}>
                <td>
                  <img
                    src={playerElement.photo}
                    width="40px"
                    className="rounded-circle"
                  ></img>
                </td>
                <td>{playerElement.name}</td>
                <td>{playerElement.age}</td>
                <td>{playerElement.number}</td>
                <td>{playerElement.position}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeamElement;

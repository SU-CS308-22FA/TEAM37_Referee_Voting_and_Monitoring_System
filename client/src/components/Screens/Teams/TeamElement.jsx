import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";
import { requestSquads } from "../../axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { MdArrowBackIosNew } from "react-icons/md";

const TeamElement = () => {
  const { id } = useParams();
  const [squadData, setSquadData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    requestSquads(id).then((data) => {
      setSquadData(data);
    });
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
            <div className="header-league-css">
              <span>
                <em>
                  {location.state.team.country}, {location.state.venue.city}
                </em>
              </span>
            </div>
          </div>
        </div>

        <header>
          <div className="team-info">
            <img
              alt="League Logo"
              width="170"
              height="170"
              src={location.state.team.logo}
            />
            <span className="match-info-top">{location.state.team.name}</span>
            <span className="match-info-bottom">
              Founded in {location.state.team.founded}
            </span>
          </div>
          <a>
            <div className="away-team">
              <span className="teamName"></span>
            </div>
          </a>
        </header>
        <div className="match-details-info-container">
          <ul className="match-detail-box">
            <li className="team-detail-item">
              <p>Stadium</p>
              <span>{location.state.venue.name}</span>
            </li>

            <li className="team-detail-item">
              <p>Address</p>
              <span>{location.state.venue.address}</span>
            </li>

            <li className="team-detail-item">
              <p>Capacity</p>
              <span>{location.state.venue.capacity}</span>
            </li>

            <li className="team-detail-item">
              <p>Surface</p>
              <span>{capitalizeFirstLetter(location.state.venue.surface)}</span>
            </li>
          </ul>
        </div>
      </div>

      <Table
        striped
        variant="light"
        hover
        style={{ color: "black", textAlign: "center", borderRadius: "20px" }}
      >
        <thead>
          <tr style={{ height: "40px", fontWeight: "700" }}>
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
                <td>
                  <p>{playerElement.name}</p>
                </td>
                <td>
                  <p>{playerElement.age}</p>
                </td>
                <td>
                  <p>{playerElement.number}</p>
                </td>
                <td
                  style={{
                    color:
                      playerElement.position === "Goalkeeper"
                        ? "orange"
                        : playerElement.position === "Defender"
                        ? "blue"
                        : playerElement.position === "Midfielder"
                        ? "green"
                        : "red",
                  }}
                >
                  <p>{playerElement.position}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeamElement;

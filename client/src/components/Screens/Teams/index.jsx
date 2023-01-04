import React, { useState, useEffect } from "react";
import "./TeamsPage.css";
import { requestTeams } from "../../axios";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Select from "react-select";

const Teams = () => {
  const leagueOptions = [
    {
      value: 203,
      name: "Super League",
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/4/4f/Süper_Lig_logo.svg"
            }
            height="30px"
            width="25px"
            alt="super league logo"
          />
          {" Super League"}
        </span>
      ),
    },
    {
      value: 204,
      name: "TFF 1. League",
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/e/ec/TFF_1.Lig_logo.png"
            }
            height="30px"
            width="25px"
            alt="tff league 1 logo"
          />
          {" TFF 1. League"}
        </span>
      ),
    },
    {
      value: 205,
      name: "TFF 2. League",
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/de/d/d9/TFF_2._Lig.png"
            }
            height="30px"
            width="25px"
            alt="tff league 2 logo"
          />
          {" TFF 2. League"}
        </span>
      ),
    },
    {
      value: 552,
      name: "TFF 3. League 1",
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/archive/4/47/20200909222954%21TFF3_kopya.png"
            }
            height="30px"
            width="25px"
            alt="tff league 3.1 logo"
          />
          {" TFF 3. League 1"}
        </span>
      ),
    },
    {
      value: 553,
      name: "TFF 3. League 2",
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/archive/4/47/20200909222954%21TFF3_kopya.png"
            }
            height="30px"
            width="25px"
            alt="tff league 3.2 logo"
          />
          {" TFF 3. League 2"}
        </span>
      ),
    },
    {
      value: 554,
      name: "TFF 3. League 3",
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/archive/4/47/20200909222954%21TFF3_kopya.png"
            }
            height="30px"
            width="25px"
            alt="tff league 3.3 logo"
          />
          {" TFF 3. League 3"}
        </span>
      ),
    },
  ];
  const seasonOptions = [];
  for (let i = 0; i < 11; i++) {
    seasonOptions.push({
      value: 2022 - i,
      label: "Season " + String(2022 - i),
    });
  }

  const [selectedLeagueOption, setSelectedLeagueOption] = useState(
    leagueOptions[0]
  );
  const [selectedSeasonOption, setSelectedSeasonOption] = useState(
    seasonOptions[0]
  );

  const [teamData, setTeamData] = useState(null);
  useEffect(() => {
    requestTeams(
      selectedLeagueOption["value"],
      selectedSeasonOption["value"]
    ).then((data) => {
      setTeamData(data);
    });
  }, [selectedSeasonOption]);

  if (teamData == null) {
    return null;
  }

  return (
    <Container className="p-5">
      <div className="select-option-team ">
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

      <Row className="g-4">
        {teamData.length > 0 ? (
          teamData.map((teamElement, teamIdx) => (
            <Col key={teamIdx}>
              <Link to={`/teams/${teamElement.team.id}`} state={teamElement}>
                <Card
                  border="success"
                  style={{ width: "180px", height: "270px", padding: "5px" }}
                  key={teamElement.team.id}
                >
                  <Card.Img variant="top" src={teamElement.team.logo} />

                  <Card.Body>
                    <Card.Title>{teamElement.team.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {teamElement.team.country}, {teamElement.venue.city}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <div className="team-page-not-found-container">
            <p className="no-matches-container">
              No teams found for the selected criteria
            </p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Teams;

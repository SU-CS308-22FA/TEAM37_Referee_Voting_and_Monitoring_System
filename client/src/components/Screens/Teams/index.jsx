import React, { useState, useEffect } from "react";
import "./TeamsPage.css";
import { requestTeams } from "../../axios";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

import Select from "react-select";

const Teams = () => {
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
      value: 204,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/e/ec/TFF_1.Lig_logo.png"
            }
            height="30px"
            width="25px"
          />
          {" TFF 1. League"}
        </span>
      ),
    },
    {
      value: 205,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/de/d/d9/TFF_2._Lig.png"
            }
            height="30px"
            width="25px"
          />
          {" TFF 2. League"}
        </span>
      ),
    },
    {
      value: 552,
      label: (
        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/tr/archive/4/47/20200909222954%21TFF3_kopya.png"
            }
            height="30px"
            width="25px"
          />
          {" TFF 3. League 1"}
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
    requestTeams(203).then((data) => {
      setTeamData(data);
    });
  }, []);

  if (teamData == null) {
    return null;
  }

  console.log(teamData);

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
            <Col>
              <Link to={`/teams/${teamElement.team.id}`}>
                <Card border="success" style={{ width: "18rem" }} key={teamIdx}>
                  <Card.Img variant="top" src={teamElement.team.logo} />
                  <Card.Body>
                    <Card.Title>{teamElement.team.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {teamElement.team.country}, {teamElement.venue.city}
                    </Card.Subtitle>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <b>
                          <em>Founded: </em>
                        </b>
                        {teamElement.team.founded}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>
                          <em>Venue: </em>
                        </b>
                        {teamElement.venue.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>
                          <em>Capacity: </em>
                        </b>
                        {teamElement.venue.capacity}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p className="">No matches found for the selected criteria</p>
        )}
      </Row>
    </Container>
  );
};

export default Teams;

import { useState, useEffect } from "react";
import Select from "react-select";
import MatchElement from "./MatchElement";
import "./MatchesPage.css";
import { requestMatches } from "../../axios";

const Matches = () => {
  const leagueOptions = [
    {
      value: "203",
      label: (
        <span>
          <img
            src={"https://media.api-sports.io/football/leagues/203.png"}
            height="30px"
            width="30px"
          />
          {"Süper Lig"}
        </span>
      ),
    },
    {
      value: "204",
      label: (
        <span>
          <img
            src={"https://media.api-sports.io/football/leagues/204.png"}
            height="30px"
            width="22px"
          />
          {" 1. Lig"}
        </span>
      ),
    },
    {
      value: "205",
      label: (
        <span>
          <img
            src={"https://media.api-sports.io/football/leagues/205.png"}
            height="30px"
            width="22px"
          />
          {" 2. Lig"}
        </span>
      ),
    },
  ];
  const seasonOptions = [];
  const weekOptions = [];

  for (var i = 1; i <= 38; i++) {
    weekOptions.push({
      value: i,
      label: "Week " + String(i),
    });
    if (i <= 11)
      seasonOptions.push({
        value: 2023 - i,
        label: "Season " + String(2023 - i),
      });
  }

  const [matches, setMatches] = useState([]);
  const [selectedLeagueOption, setSelectedLeagueOption] = useState(
    leagueOptions[0]
  );
  const [selectedSeasonOption, setSelectedSeasonOption] = useState(
    seasonOptions[0]
  );
  const [selectedWeekOption, setSelectedWeekOption] = useState(weekOptions[14]);

  useEffect(() => {
    requestMatches(
      selectedWeekOption["value"],
      selectedSeasonOption["value"],
      selectedLeagueOption["value"]
    ).then((data) => setMatches(data));
  }, [selectedWeekOption]);

  return (
    <>
      <div className="matches-page-container">
        <div className="select-option">
          <Select
            defaultValue={selectedLeagueOption}
            onChange={setSelectedLeagueOption}
            options={leagueOptions}
            isSearchable={true}
          />
          <Select
            defaultValue={selectedSeasonOption}
            onChange={setSelectedSeasonOption}
            options={seasonOptions}
            isSearchable={true}
          />
          <Select
            defaultValue={selectedWeekOption}
            onChange={setSelectedWeekOption}
            options={weekOptions}
            isSearchable={true}
          />
        </div>
        <div
          className="matches-container"
          style={
            matches.length > 0 ? { height: matches.length * 70 + "px" } : {}
          }
        >
          {matches.length > 0 ? (
            matches.map((match, matchId) => (
              <MatchElement
                key={matchId}
                MatchLink={"/matches/" + match.fixture.id}
                Team1={match.teams.home.name}
                Team2={match.teams.away.name}
                Team1Img={match.teams.home.logo}
                Team2Img={match.teams.away.logo}
                MatchTime={match.fixture.date}
                MatchResult={match.goals.home + "-" + match.goals.away}
                MatchStatus={match.fixture.status.short}
                Referee={match.fixture.referee}
                Stadium={match.fixture.venue.name}
              />
            ))
          ) : (
            <p className="no-matches-container">
              No matches found for the selected criteria
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Matches;

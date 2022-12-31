import { useState, useEffect } from "react";
import Select from "react-select";
import MatchElement from "./MatchElement";
import "./MatchesPage.css";
import { requestMatches } from "../../axios";

const Matches = () => {
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
  const weekOptions = [];
  const roundOptions = [
    { value: "Final", label: "Final" },
    { value: "Semi-finals", label: "Semi-finals" },
    { value: "Quarter-finals", label: "Quarter-finals" },
    { value: "8th Finals", label: "8th Finals" },
    { value: "5th Round", label: "5th Round" },
  ];

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
  const [selectedRoundOption, setSelectedRoundOption] = useState(
    roundOptions[0]
  );

  useEffect(() => {
    requestMatches(
      selectedWeekOption["value"],
      selectedSeasonOption["value"],
      selectedLeagueOption["value"],
      selectedRoundOption["value"]
    ).then((data) => setMatches(data));
  }, [selectedWeekOption, selectedRoundOption]);

  return (
    <>
      <div className="matches-page-container">
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
          <Select
            value={
              selectedLeagueOption["value"] === 206 ||
              selectedLeagueOption["value"] === 551
                ? selectedRoundOption
                : selectedWeekOption
            }
            onChange={
              selectedLeagueOption["value"] === 206 ||
              selectedLeagueOption["value"] === 551
                ? setSelectedRoundOption
                : setSelectedWeekOption
            }
            options={
              selectedLeagueOption["value"] === 206 ||
              selectedLeagueOption["value"] === 551
                ? roundOptions
                : weekOptions
            }
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
                MatchLink={"matchdetails/" + match.fixture.id}
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

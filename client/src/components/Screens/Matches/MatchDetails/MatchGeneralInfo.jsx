import "./MatchDetails.css";
import { Link } from "react-router-dom";
import { BiFootball } from "react-icons/bi";
import { GiWhistle } from "react-icons/gi";
import { TbClock } from "react-icons/tb";
import { MdArrowBackIosNew, MdOutlinePlace } from "react-icons/md";

const MatchGeneralInfo = ({ data }) => {
  console.log(data);

  return (
    <div className="container">
      <div className="grid-container">
        <Link to="/matches" className="back-to-mathces-button">
          <MdArrowBackIosNew />
          <span>Matches</span>
        </Link>
        <div className="middle-grid-item">
          <a className="header-league-css">
            <div className="league-icon league-icon-container">
              <img
                alt="League Logo"
                width="30"
                height="30"
                src={data.league.logo}
                className="Image"
              />
            </div>
            <Link to="/standing">
              <span>
                {data.league.name} - {data.league.round}
              </span>
            </Link>
          </a>
        </div>
      </div>

      <header className="general-scoreboard">
        <a>
          <div className="home-team">
            <span className="teamName">
              <span>{data.teams.home.name}</span>
            </span>
            <img
              alt="Home team logo"
              className="Image team-icon"
              width="50"
              height="50"
              src={data.teams.home.logo}
            />
          </div>
        </a>
        <div className="match-info">
          <span className="match-info-top">
            {data.goals.home} : {data.goals.away}
          </span>
          <span className="match-info-bottom">{data.fixture.status.long}</span>
        </div>
        <a>
          <div className="away-team">
            <img
              alt="Away team logo"
              className="Image team-icon"
              width="50"
              height="50"
              src={data.teams.away.logo}
            />
            <span className="teamName">
              <span>{data.teams.away.name}</span>
            </span>
          </div>
        </a>
      </header>

      <div className="match-goals">
        <ul>
          {data.events
            .filter(
              (aMatchEvent) =>
                aMatchEvent.type === "Goal" &&
                aMatchEvent.team.id === data.teams.home.id
            )
            .map((aMatchEvent, index) => {
              return (
                <li key={index}>
                  <span>
                    {index === 0 || index === aMatchEvent.length - 1
                      ? null
                      : ", "}
                    {aMatchEvent.player.name + " "}
                  </span>
                  <span className="event-time">
                    {aMatchEvent.time.elapsed}
                    {aMatchEvent.detail === "Penalty" ? " (P)" : ""}
                  </span>
                </li>
              );
            })}
        </ul>
        <ul>
          Goals&nbsp;
          <BiFootball style={{ height: 20, width: 20 }} />
        </ul>
        <ul>
          {data.events
            .filter(
              (aMatchEvent) =>
                aMatchEvent.team.id === data.teams.away.id &&
                aMatchEvent.type === "Goal"
            )
            .map((aMatchEvent, index) => {
              return (
                <li key={index}>
                  <span>
                    {index === 0 || index === aMatchEvent.length - 1
                      ? null
                      : ", "}
                    {aMatchEvent.player.name + " "}
                  </span>
                  <span className="event-time">
                    {aMatchEvent.time.elapsed}
                    {aMatchEvent.detail === "Penalty" ? " (P)" : ""}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="match-details-info-container">
        <ul className="match-detail-box">
          <li className="match-detail-item">
            <TbClock />
            <time dateTime={data.fixture.date}>
              <span>TIME</span>,
            </time>
          </li>

          <li className="match-detail-item">
            <MdOutlinePlace />
            <span>
              {data.fixture.venue.name}, {data.fixture.venue.city}
            </span>
          </li>

          <li className="match-detail-item">
            <GiWhistle />
            <span>
              {data.fixture.referee.slice(0, data.fixture.referee.indexOf(","))}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MatchGeneralInfo;

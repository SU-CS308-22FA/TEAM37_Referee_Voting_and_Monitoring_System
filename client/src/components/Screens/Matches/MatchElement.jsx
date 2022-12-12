import { Link } from "react-router-dom";
import "./MatchElement.css";
import { FcCalendar, FcClock, FcBusinessman } from "react-icons/fc";
import { GiSoccerField } from "react-icons/gi";

const MatchElement = ({
  MatchLink,
  Team1,
  Team2,
  Team1Img,
  Team2Img,
  MatchTime,
  MatchResult,
  MatchStatus,
  Referee,
  Stadium,
}) => {
  return (
    <Link to={MatchLink} className="match-element">
      <span className="match-date">
        <div>
          <FcCalendar />
          {" " + MatchTime.slice(0, 10)}
        </div>
        <div>
          <FcClock />
          {" " + new Date(MatchTime).toTimeString().slice(0, 5)}
        </div>
      </span>
      <span className="match-element-team-name">{Team1}</span>
      <img
        className="match-element-team-logo"
        width={25}
        height={25}
        src={Team1Img}
      />
      <div className="match-element-details-box">
        {["TBD"].includes(MatchStatus) ? (
          <span className="match-element-result">TBD</span>
        ) : ["NS", "PST", "CANC", "ABD", "AWD", "WO"].includes(MatchStatus) ? (
          <>
            <span
              className="match-element-time"
              style={
                MatchStatus != "NS" ? { textDecoration: "line-through" } : {}
              }
            >
              {new Date(MatchTime).toTimeString().slice(0, 5)}
            </span>
            {MatchStatus === "NS" ? null : (
              <span className="match-element-result">{MatchStatus}</span>
            )}
          </>
        ) : (
          <>
            <span className="match-element-result">{MatchResult}</span>
            <span className={"match-element-status"}>{MatchStatus}</span>
          </>
        )}
      </div>
      <img
        className="match-element-team-logo"
        width={25}
        height={25}
        src={Team2Img}
      />
      <span className="match-element-team-name2">{Team2}</span>
      <span className="match-refree-stadium">
        <div>
          <FcBusinessman />
          {Referee === null ? "No referee found" : " " + Referee}
        </div>
        <div>
          <GiSoccerField />
          {" " + Stadium}
        </div>
      </span>
    </Link>
  );
};

export default MatchElement;

import GoalBall from "./images/goal.svg";
import OwnGoalBall from "./images/own-goal.svg";
import TimeIcon from "./images/time.svg";
import YellowCard from "./images/yellow-card.svg";
import RedCard from "./images/red-card.svg";
import DoubleYellowCard from "./images/second-yellow-card.svg";
import PlayerSubstitution from "./images/substitution.svg";
import RetractedGoal from "./images/retracted-goal-light.svg";
import PenaltyIcon from "./images/penalty.svg";
import { GiWhistle } from "react-icons/gi";

import "./MatchDetails.css";

const convertHighlightTime = (ex) => {
  let totalTime = ex.time.elapsed;
  if (ex.time.extra != 0 && ex.time.extra != null) {
    totalTime = totalTime + ex.time.extra;
  }
  return totalTime + "'";
};

const MatchHighlights = ({ data, sortedData }) => {
  let homePlayerYellowCards = [];
  let awayPlayerYellowCards = [];

  return (
    <div className="highlight-container">
      <ul>
        {sortedData.map((event, index) => {
          if (event.type === "ht") {
            return (
              <li className="highlight-item-container">
                <div className="game-time-container">
                  <span>Half Time</span>
                  <img src={TimeIcon} />
                </div>
              </li>
            );
          }
          if (event.type === "ft") {
            return (
              <li className="highlight-item-container">
                <div className="game-time-container">
                  <span>Full Time</span>
                  <GiWhistle size={25} />
                </div>
              </li>
            );
          }

          if (event.team.name === data.teams.home.name) {
            if (event.type === "Goal") {
              // Home normal goal
              if (event.detail === "Normal Goal") {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-left">
                      <div className="goal-container-playername">
                        <div className="playername-goal">
                          <a>{event.player.name}</a>
                        </div>
                        <div>
                          {event?.assist?.name ? (
                            <div className="goal-description">
                              <div className="playername-assist">
                                <a>{event.assist.name}</a>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <img src={GoalBall} />
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
                // Home penalty goal
              } else if (event.detail === "Penalty") {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-left">
                      <div className="goal-container-playername">
                        <div className="playername-goal">
                          <a>{event.player.name}</a>
                        </div>
                        <div className="goal-description">
                          <span className="penalty-goal">Penalty</span>
                        </div>
                      </div>
                      <img src={PenaltyIcon} width={25}/>
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
                // Away own goal
              } else if (event.detail === "Own Goal") {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-left">
                      <div className="goal-container-playername">
                        <div className="playername-goal">
                          <a>{event.player.name}</a>
                        </div>
                        <div className="goal-description">
                          <span className="penalty-goal">Own goal</span>
                        </div>
                      </div>
                      <img src={OwnGoalBall} />
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
              }
            } else if (event.type === "Card") {
              // Home yellow card
              if (event.detail === "Yellow Card") {
                homePlayerYellowCards.push(event.player.name);
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-left">
                      <a>{event.player.name}</a>
                      <img src={YellowCard} />
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
                // Home red card
              } else {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-left">
                      <a>{event.player.name}</a>
                      <img
                        src={
                          homePlayerYellowCards.includes(event.player.name)
                            ? DoubleYellowCard
                            : RedCard
                        }
                      />
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
              }
              // Home substitution
            } else if (event.type === "subst") {
              return (
                <li key={index} className="highlight-item-container">
                  <div className="match-highlight-left">
                    <div className="substitution-left">
                      <a>{event.assist.name}</a>
                      <div>
                        <a>{event.player.name}</a>
                      </div>
                    </div>
                    <img src={PlayerSubstitution} />
                  </div>
                  <span className="highlight-time">
                    {convertHighlightTime(event)}
                  </span>
                </li>
              );
              // Home VAR
            } else if (event.type === "Var") {
              return (
                <li className={"highlight-item-container"}>
                  <div className="match-highlight-left">
                    <div className="goal-container-playername">
                      <div className="playername-goal">
                        <span>{event.detail}</span>
                      </div>
                      <div className="goal-description">
                        <a className="penalty-goal">{event.player.name}</a>
                      </div>
                    </div>
                    <img src={RetractedGoal} width={30} />
                  </div>
                  <span className="highlight-time">
                    {convertHighlightTime(event)}
                  </span>
                </li>
              );
            }
          } else {
            if (event.type === "Goal") {
              // Away normal goal
              if (event.detail === "Normal Goal") {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-right">
                      <img src={GoalBall} />
                      <div className="goal-container-playername">
                        <div className="playername-goal">
                          <a>{event.player.name}</a>
                        </div>
                        <div>
                          {event?.assist?.name ? (
                            <div className="goal-description">
                              <div className="playername-assist">
                                <a>{event.assist.name}</a>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
                // Away penalty goal
              } else if (event.detail === "Penalty") {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-right">
                      <img src={PenaltyIcon} width={25}/>
                      <div className="goal-container-playername">
                        <div className="playername-goal">
                          <a>{event.player.name}</a>
                        </div>
                        <div className="goal-description">
                          <span className="penalty-goal">Penalty</span>
                        </div>
                      </div>
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
                // Home own goal
              } else if (event.detail === "Own Goal") {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-right">
                      <img src={OwnGoalBall} />
                      <div className="goal-container-playername">
                        <div className="playername-goal">
                          <a>{event.player.name}</a>
                        </div>
                        <div className="goal-description">
                          <span className="penalty-goal">Own goal</span>
                        </div>
                      </div>
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
              }
            } else if (event.type === "Card") {
              // Away yellow card
              if (event.detail === "Yellow Card") {
                awayPlayerYellowCards.push(event.player.name);
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-right">
                      <img src={YellowCard} />
                      <a>{event.player.name}</a>
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
                // Away red card
              } else {
                return (
                  <li className={"highlight-item-container"}>
                    <div className="match-highlight-right">
                      <img
                        src={
                          awayPlayerYellowCards.includes(event.player.name)
                            ? DoubleYellowCard
                            : RedCard
                        }
                      />
                      <a>{event.player.name}</a>
                    </div>
                    <span className="highlight-time">
                      {convertHighlightTime(event)}
                    </span>
                  </li>
                );
              }
              // Away substitution
            } else if (event.type === "subst") {
              return (
                <li key={index} className="highlight-item-container">
                  <div className="match-highlight-right">
                    <img src={PlayerSubstitution} />
                    <div className="substitution-right">
                      <a>{event.assist.name}</a>
                      <div>
                        <a>{event.player.name}</a>
                      </div>
                    </div>
                  </div>
                  <span className="highlight-time">
                    {convertHighlightTime(event)}
                  </span>
                </li>
              );
              // Away VAR
            } else if (event.type === "Var") {
              return (
                <li className={"highlight-item-container"}>
                  <div className="match-highlight-right">
                    <img src={RetractedGoal} width={30} />
                    <div className="goal-container-playername">
                      <div className="playername-goal">
                        <span>{event.detail}</span>
                      </div>
                      <div className="goal-description">
                        <a className="penalty-goal">{event.player.name}</a>
                      </div>
                    </div>
                  </div>
                  <span className="highlight-time">
                    {convertHighlightTime(event)}
                  </span>
                </li>
              );
            }
          }
        })}
      </ul>
    </div>
  );
};

export default MatchHighlights;

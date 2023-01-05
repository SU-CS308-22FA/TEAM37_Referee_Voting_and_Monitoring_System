import React, { useState, useEffect } from 'react';

const Scoreboard = () => {
  const [elapsedTime, setElapsedTime] = useState('');
  const [homeTeamImage, setHomeTeamImage] = useState('');
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamImage, setAwayTeamImage] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [lastMatchGoal, setLastMatchGoal] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://v3.football.api-sports.io/fixtures?live=all',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': process.env.REACT_APP_FOOTBALL_API_HOST,
              'x-rapidapi-key': process.env.REACT_APP_FOOTBALL_API_KEY,
            },
          }
        );
        const data = await response.json();
        const matchesList = data.response;
        const fixture = matchesList[0].fixture;
        const goals = matchesList[0].goals;
        const teams = matchesList[0].teams;
        console.log(matchesList.length);
        setElapsedTime(`${fixture.status.elapsed}'`);
        setHomeTeamImage(teams.home.logo);
        setHomeTeamName(teams.home.name);
        setAwayTeamImage(teams.away.logo);
        setAwayTeamName(teams.away.name);
        setLastMatchGoal(`${goals.home} - ${goals.away}`);
        setMatches(
          matchesList.slice(1).map(match => (
            <div className="match-tile">
              <div className="team">
                <img src={match.teams.home.logo} alt={match.teams.home.name} />
                <p>{match.teams.home.name}</p>
              </div>
              <p>{`${match.goals.home} - ${match.goals.away}`}</p>
              <div className="team">
                <img src={match.teams.away.logo} alt={match.teams.away.name} />
                <p>{match.teams.away.name}</p>
              </div>
            </div>
          ))
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    
    <div className="container">
      <h1>ScoreBoard</h1>
      <div className="title-box">
        <p>Local Team</p>
        <p id="elapsed">{elapsedTime}</p>
        <p>Visitor Team</p>
      </div>
      <div className="title-box">
        <div className="team">
          <img id="homeLogo" src={homeTeamImage} alt={homeTeamName} />
          <p id="homeName">{homeTeamName}</p>
        </div>
        <p id="goals">{lastMatchGoal}</p>
        <div className="team">
          <img id="awayLogo" src={awayTeamImage} alt={awayTeamName} />
          <p id="awayName">{awayTeamName}</p>
        </div>
      </div>
      <hr />
      <div id="matchTable" className="matches-table">
        {matches}
      </div>
    </div>
  );
};

export default Scoreboard;
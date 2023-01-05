import React, { useEffect } from 'react';
import main from './main.js';

const Scoreboard = () => {
  useEffect(() => {
    main.startTimer();
  }, []);

  return (
    <body>
  <div id="root"></div>

    <div className="container">
      <h1>ScoreBoard</h1>
      <div className="title-box">
        <p>Local Team</p>
        <p id="elapsed">45'</p>
        <p>Visitor Team</p>
      </div>
      
      <div className="title-box">
        <div className="team">
          <img id="homeLogo" />
          <p id="homeName">Team name</p>
        </div>
        <p id="goals">3  -  1</p>
        <div className="team">
          <img id="awayLogo" />
          <p id="awayName">Team name</p>
        </div>
      </div>
      <hr />
      <div id="matchTable" className="matches-table" />
    </div></body>
  );
};

export default Scoreboard;
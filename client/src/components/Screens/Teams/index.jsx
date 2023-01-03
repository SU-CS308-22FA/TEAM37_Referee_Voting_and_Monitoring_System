import React, { useState, useEffect } from "react";

import { requestTeams } from "../../axios";

const Match = () => {
  const [teamData, setTeamData] = useState(null);
  const leagueId = 203;

  useEffect(() => {
    requestTeams(leagueId).then((data) => {
      setTeamData(data);
    });
  }, []);

  if (teamData == null) {
    return null;
  }

  console.log(teamData);

  return <div></div>;
};

export default Match;

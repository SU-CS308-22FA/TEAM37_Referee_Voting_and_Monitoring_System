import React, { useState, useEffect } from "react";

import MatchScoreBoard from "./MatchScoreBoard";

import "./MatchDetails.css";
import { requestOneMatch } from "../../../axios";
import { useParams } from "react-router-dom";

const Match = () => {
  const { id } = useParams();

  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    requestOneMatch(id).then((data) => {
      setMatchData(data);
    });
  }, []);

  if (matchData == null) {
    return null;
  }

  return (
    <div>
      <MatchScoreBoard data={matchData} />
    </div>
  );
};

export default Match;

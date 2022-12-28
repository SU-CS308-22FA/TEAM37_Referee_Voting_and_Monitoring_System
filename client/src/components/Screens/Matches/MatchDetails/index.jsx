import React, { useState, useEffect } from "react";

import MatchGeneralInfo from "./MatchGeneralInfo";

import "./MatchDetails.css";
import { requestOneMatch } from "../../../axios";
import { useParams } from "react-router-dom";

const Match = () => {
  console.log("sadasda");
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
    <div className="match-page">
      <MatchGeneralInfo  data={matchData} />
    </div>
  );
};

export default Match;

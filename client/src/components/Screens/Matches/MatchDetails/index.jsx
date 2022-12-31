import React, { useState, useEffect } from "react";

import MatchScoreBoard from "./MatchScoreBoard";
import MatchHighlights from "./MatchHighlights";

import "./MatchDetails.css";
import { requestOneMatch } from "../../../axios";
import { useParams } from "react-router-dom";

const Match = () => {
  const { id } = useParams();
  const [matchData, setMatchData] = useState(null);
  const sortedData = [];

  if (null != matchData) {
    const currentHighlights = [...matchData.events]
      .filter((ex) => ex.time.elapsed >= 0)
      .map((ex) => {
        if (ex.time.extra === null) {
          ex.time.extra = 0;
        }
        return ex;
      });
    currentHighlights.sort(function (i, j) {
      return i.time.elapsed - j.time.elapsed || i.time.extra - j.time.extra;
    });

    let idx = 0;
    while (idx < currentHighlights.length) {
      const theHighlight = currentHighlights[idx];
      if (
        (idx === 0 || currentHighlights[idx - 1].time.elapsed <= 45) &&
        theHighlight.time.elapsed > 45
      ) {
        sortedData.push({ type: "ht" });
      }
      sortedData.push(theHighlight);
      idx++;
    }
    sortedData.push({ type: "ft" });
  }

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
      <MatchHighlights data={matchData} sortedData={sortedData} />
    </div>
  );
};

export default Match;

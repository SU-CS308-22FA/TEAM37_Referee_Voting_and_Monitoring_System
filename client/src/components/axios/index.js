import axios from "axios";
import jwt_decode from "jwt-decode";

const HTTP = axios.create({
  baseURL: "http://localhost:5000",
});


/**
 * Gets user information from google by decyrpting the credentials coming from users gmail
 * @param {Array} credentialResponse - Array that contains the encrypted credentials of the user
 * @returns {Array} If gmail credentials succesfully collected and decyrpted
 * @throws {ServerError} if google authentication was unsuccesful
 * @example   
    <GoogleLogin 
              size="large"
              theme="filled_blue"
              width="400"
              onSuccess={(credentialResponse) => {
                handleGoogle(credentialResponse);
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
 */
export const handleGoogle = async (data) => {
  try {
    var userObject = jwt_decode(data.credential);
    const { data: res } = await HTTP.post("/users/Gsignin", userObject);
    console.log(res);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    window.location = "/";
  } catch (error) {
    console.log(error.message);
  }
};

export const handleSignin = async (data) => {
  const { data: res } = await HTTP.post("/users/signin", data);
  console.log(res);
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", JSON.stringify(res.user));
};

export const handleSignup = async (data) => {
  const { data: res } = await HTTP.post("/users/signup", data);
  console.log(res.message);
};

export const handleEdit = async (data, id) => {
  const { data: res } = await HTTP.put(`/users/${id}`, data);
  console.log(res);
  localStorage.setItem("user", JSON.stringify(res.user));
  console.log(res.user);
};

export const handleDelete = async (data, id) => {
  const { data: res } = await HTTP.delete(`/users/${id}`, data);

  console.log(res);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Creates a special token in the database for the mail sent to it and sends it to the user's e-mail address
 * @param {Array} emailArray - 1-element array containing elements in a dictionary format
 * @returns {true} if email is successfully sent
 * @throws {ServerError} if email cannot sent
 * @example   
    const [data] = useState({
      email: user.email,
    });

    sendVerifyEmail(data)
      .then(() => {
        setMsg("An email sent to your account please verify !");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
 */

export const sendVerifyEmail = async (data) => {
  const { data: res } = await HTTP.post("/users/sendMeMail", data);
  console.log(res.message);
};

/**
 * Get all the matches in the desired parameters in a specific format.
 * @param {int} weekNumber - the number of the week in which the match was/will be played
 * @param {int} seasonNumber - the season year in which the match was/will be played
 * @param {int} leagueNumber - the league id which corresponds the a league to find match was/will be played
 * @param {string} roundName -  the round string to find the rounds of tournaments
 * @returns {Array} Array containing the information of the matches played in the desired parameters
 * @example   
    const [matches, setMatches] = useState([]);  

    requestMatches(
      selectedWeekOption["value"],
      selectedSeasonOption["value"],
      selectedLeagueOption["value"],
      selectedRoundOption["value"]
    ).then((data) => setMatches(data));
 */
export const requestMatches = async (
  weekNumber,
  seasonNumber,
  leagueNumber,
  roundName
) => {
  try {
    console.log(process.env);
    const { data } = await axios.get(
      "https://v3.football.api-sports.io/fixtures",
      {
        params: {
          round:
            leagueNumber === 206 || leagueNumber === 551
              ? roundName
              : leagueNumber === 552 &&
                seasonNumber >= 2016 &&
                seasonNumber !== 2018
              ? "Group 1 - " + String(weekNumber)
              : leagueNumber === 553 &&
                seasonNumber >= 2016 &&
                seasonNumber !== 2018
              ? "Group 2 - " + String(weekNumber)
              : leagueNumber === 554 &&
                seasonNumber >= 2016 &&
                seasonNumber !== 2018
              ? "Group 3 - " + String(weekNumber)
              : "Regular Season - " + String(weekNumber),
          league: leagueNumber,
          season: seasonNumber,
        },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_FOOTBALL_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_FOOTBALL_API_KEY,
        },
      }
    );
    const matches = data.response;

    console.log(matches);
    return matches;
  } catch (error) {
    console.log("ERROR");
    return [];
  }
};

/**
 * Get all the standings in the desired parameters in a specific format.
 * @param {int} seasonNumber - the season year in which the standings takes/took place
 * @param {int} leagueNumber - the league id which corresponds the a league that is/was going on such as Bundesliga and La Liga
 * @returns {Array} Array containing the information of standings according to the given parameters
 * @example  
 *  
    const [team, setTeam] = useState([]); 

    requestStandings(
      selectedLeagueOption["value"],
      selectedSeasonOption["value"])
        .then((data) => setTeam(data));
    
 */
export const requestStandings = async (leagueNumber, seasonNumber) => {
  try {
    const { data } = await axios.get(
      "https://v3.football.api-sports.io/standings",
      {
        params: {
          league: leagueNumber,
          season: seasonNumber,
        },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_FOOTBALL_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_FOOTBALL_API_KEY,
        },
      }
    );

    const standings = data.response[0].league.standings[0];
    console.log("axiosa data geldi");
    console.log(standings);

    return standings;
  } catch (error) {
    console.log("ERROR");
    return [];
  }
};

export const handleAddReferee = async (data) => {
  const { data: res } = await HTTP.post(`/referee/add`, data);
};

export const handleDeleteReferee = async (id) => {
  const { data: res } = await HTTP.delete(`/referee/${id}`);
  console.log("Test");
};
export const handleUpdateReferee = async (data, id) => {
  const { data: res } = await HTTP.put(`/referee/${id}`, data);
  console.log(data);
};

export const fetchReferee = async (data) => {
  const { data: res } = await HTTP.get(`/referee`);
  return res.referee;
};
export const getRefereeDetails = async (id) => {
  const { data: res } = await HTTP.get(`/referee/${id}`);
  return res.referee;
};

export const fetchReview = async (refid, week) => {
  const { data: res } = await HTTP.get(`/review/${refid}/${week}`);
  // console.log(res.review);
  return res.review;
};

export const handleAddReview = async (data) => {
  const { data: res } = await HTTP.post(`/review/add`, data);

  return res;
};
export const addLike = async (id, user) => {
  const { data: res } = await HTTP.put(`/review/addlike`, { id, user });

  return res;
};
export const addDislike = async (id, user) => {
  const { data: res } = await HTTP.put(`/review/adddislike`, { id, user });

  return res;
};
export const removeLike = async (id, user) => {
  const { data: res } = await HTTP.put(`/review/removelike`, { id, user });

  return res;
};
export const removeDislike = async (id, user) => {
  const { data: res } = await HTTP.put(`/review/removedislike`, { id, user });

  return res;
};

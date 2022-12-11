import axios from "axios";
import jwt_decode from "jwt-decode";

const HTTP = axios.create({
  baseURL: "http://localhost:5000",
});

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

export const sendVerifyEmail = async (data) => {
  const { data: res } = await HTTP.post("/users/sendMeMail", data);
  console.log(res.message);
};
export const requestMatches = async (
  weekNumber,
  seasonNumber,
  leagueNumber,
  roundName
) => {
  try {
    console.log(process.env)
    const { data } = await axios.get(
      "https://v3.football.api-sports.io/fixtures",
      {
        params: {
          round:
            leagueNumber === 206 || leagueNumber === 551 ? roundName :
            leagueNumber === 552 && seasonNumber >= 2016 && seasonNumber !== 2018 ? "Group 1 - " + String(weekNumber) :
            leagueNumber === 553 && seasonNumber >= 2016 && seasonNumber !== 2018 ? "Group 2 - " + String(weekNumber) :
            leagueNumber === 554 && seasonNumber >= 2016 && seasonNumber !== 2018 ? "Group 3 - " + String(weekNumber) :
               "Regular Season - " + String(weekNumber),
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

export const handleAddReferee = async (data) => {
  const { data: res } = await HTTP.post(`/referee/add`, data);
};

export const fetchReferee = async (data) => {
  const { data: res } = await HTTP.get(`/referee`);
  return res.referee;
};
export const getRefereeDetails = async (id) => {
  const { data: res } = await HTTP.get(`/referee/${id}`);
  return res.referee;
};

export const fetchReview = async (refid,week) => {
  const { data: res } = await HTTP.get(`/review/${refid}/${week}`);
  // console.log(res.review);
  return res.review;
};

export const handleAddReview = async (data) => {
  const { data: res } = await HTTP.post(`/review/add`, data);

  return res;
};
export const addLike = async (id,user) => {
  const { data: res } = await HTTP.put(`/review/addlike`, {id,user});

  return res;
};
export const addDislike = async (id,user) => {
  const { data: res } = await HTTP.put(`/review/adddislike`, {id,user});

  return res;
};
export const removeLike = async (id,user) => {
  const { data: res } = await HTTP.put(`/review/removelike`, {id,user});

  return res;
};
export const removeDislike = async (id,user) => {
  const { data: res } = await HTTP.put(`/review/removedislike`, {id,user});

  return res;
};

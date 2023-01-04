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

export const requestOneMatch = async (matchId) => {
  try {
    const { data } = await axios.get(
      "https://v3.football.api-sports.io/fixtures",
      {
        params: { id: matchId },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_FOOTBALL_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_FOOTBALL_API_KEY,
        },
      }
    );

    console.log(JSON.stringify(data.response[0]));
    return data.response[0];
  } catch (error) {
    console.log("ERROR");
    return [];
  }
};

export const requestTeams = async (leagueId) => {
  try {
    const { data } = await axios.get(
      "https://v3.football.api-sports.io/teams",
      {
        params: { league: leagueId, season: 2022 },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_FOOTBALL_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_FOOTBALL_API_KEY,
        },
      }
    );

    console.log(JSON.stringify(data.response));
    //return data.response;
    return [{"team":{"id":549,"name":"Besiktas","code":"BES","country":"Turkey","founded":1903,"national":false,"logo":"https://media-1.api-sports.io/football/teams/549.png"},"venue":{"id":1578,"name":"Vodafone Park","address":"Dolmabahçe Gazhane Caddesi, Beşiktaş","city":"İstanbul","capacity":43500,"surface":"grass","image":"https://media.api-sports.io/football/venues/1578.png"}},{"team":{"id":564,"name":"Istanbul Basaksehir","code":"IST","country":"Turkey","founded":1990,"national":false,"logo":"https://media.api-sports.io/football/teams/564.png"},"venue":{"id":1584,"name":"Başakşehir Fatih Terim Stadyumu","address":"Yunus Emre Caddesi, Başakşehir","city":"İstanbul","capacity":17319,"surface":"grass","image":"https://media.api-sports.io/football/venues/1584.png"}},{"team":{"id":607,"name":"Konyaspor","code":"KON","country":"Turkey","founded":1981,"national":false,"logo":"https://media.api-sports.io/football/teams/607.png"},"venue":{"id":1587,"name":"Konya Büyükşehir Belediye Stadyumu","address":"Sille Parsana Mh., Kaletaş Caddesi, Selçuklu","city":"Konya","capacity":42276,"surface":"grass","image":"https://media.api-sports.io/football/venues/1587.png"}},{"team":{"id":611,"name":"Fenerbahce","code":"FEN","country":"Turkey","founded":1907,"national":false,"logo":"https://media.api-sports.io/football/teams/611.png"},"venue":{"id":1581,"name":"Ülker Stadyumu Fenerbahçe Şükrü Saracoğlu Spor Kompleksi","address":"Recep Peker Caddesi, Kadıköy","city":"İstanbul","capacity":53586,"surface":"grass","image":"https://media.api-sports.io/football/venues/1581.png"}},{"team":{"id":645,"name":"Galatasaray","code":"GAL","country":"Turkey","founded":1905,"national":false,"logo":"https://media.api-sports.io/football/teams/645.png"},"venue":{"id":12598,"name":"NEF Stadyumu","address":"İstanbul Çevre Yolu, Aslantepe","city":"İstanbul","capacity":52695,"surface":"grass","image":"https://media.api-sports.io/football/venues/12598.png"}},{"team":{"id":996,"name":"Alanyaspor","code":"ALA","country":"Turkey","founded":1948,"national":false,"logo":"https://media-1.api-sports.io/football/teams/996.png"},"venue":{"id":19219,"name":"Kırbıyık Holding Stadyumu","address":"Sarıkadıoğlu Caddesi, Oba, Obaköy","city":"Alanya","capacity":15000,"surface":"grass","image":"https://media-1.api-sports.io/football/venues/19219.png"}},{"team":{"id":998,"name":"Trabzonspor","code":"TRA","country":"Turkey","founded":1967,"national":false,"logo":"https://media.api-sports.io/football/teams/998.png"},"venue":{"id":19221,"name":"Şenol Güneş Spor Kompleksi","address":"Trabzon Giresun Yolu, Akyaz","city":"Trabzon","capacity":41513,"surface":"grass","image":"https://media.api-sports.io/football/venues/19221.png"}},{"team":{"id":1001,"name":"Kayserispor","code":"KAY","country":"Turkey","founded":1966,"national":false,"logo":"https://media.api-sports.io/football/teams/1001.png"},"venue":{"id":1586,"name":"Kadir Has Şehir Stadı","address":"İle Fırat Caddesi","city":"Kayseri","capacity":40458,"surface":"grass","image":"https://media-1.api-sports.io/football/venues/1586.png"}},{"team":{"id":1002,"name":"Sivasspor","code":"SIV","country":"Turkey","founded":1967,"national":false,"logo":"https://media-1.api-sports.io/football/teams/1002.png"},"venue":{"id":1589,"name":"Yeni Sivas 4 Eylül Stadyumu","address":"Muhsin Yazıcıoğlu Bulvarı","city":"Sivas","capacity":27532,"surface":"grass","image":"https://media-1.api-sports.io/football/venues/1589.png"}},{"team":{"id":1004,"name":"Kasimpasa","code":"KAS","country":"Turkey","founded":1921,"national":false,"logo":"https://media-1.api-sports.io/football/teams/1004.png"},"venue":{"id":1585,"name":"Recep Tayyip Erdoğan Stadyumu","address":"Tepebaşı Caddesi, Kasımpaşa, Beyoğlu","city":"İstanbul","capacity":14234,"surface":"grass","image":"https://media-1.api-sports.io/football/venues/1585.png"}},{"team":{"id":1005,"name":"Antalyaspor","code":"ANT","country":"Turkey","founded":1966,"national":false,"logo":"https://media-1.api-sports.io/football/teams/1005.png"},"venue":{"id":19220,"name":"Corendon Airlines Park","address":"100. Yıl Bulvarı","city":"Antalya","capacity":33032,"surface":"grass","image":"https://media.api-sports.io/football/venues/19220.png"}},{"team":{"id":1010,"name":"Ankaragucu","code":"ANK","country":"Turkey","founded":1910,"national":false,"logo":"https://media.api-sports.io/football/teams/1010.png"},"venue":{"id":2378,"name":"Eryaman Stadyumu","address":"Devlet Mah., 232. Sk. No:7, Tunahan Mahallesi, Etimesgut","city":"Ankara","capacity":20560,"surface":"grass","image":"https://media.api-sports.io/football/venues/2378.png"}},{"team":{"id":3563,"name":"Adana Demirspor","code":"ADA","country":"Turkey","founded":1941,"national":false,"logo":"https://media-1.api-sports.io/football/teams/3563.png"},"venue":{"id":11924,"name":"Yeni Adana Stadyumu","address":"Çarkıpare, Sarıçam","city":"Adana","capacity":33543,"surface":"grass","image":"https://media.api-sports.io/football/venues/11924.png"}},{"team":{"id":3573,"name":"Gazişehir Gaziantep","code":"GAZ","country":"Turkey","founded":1988,"national":false,"logo":"https://media-1.api-sports.io/football/teams/3573.png"},"venue":{"id":2375,"name":"Gaziantep Stadyumu","address":"Yukarıbeylerbeyi Mah. 15 Nolu Sok., Şehitkamil","city":"Gaziantep","capacity":35558,"surface":"grass","image":"https://media.api-sports.io/football/venues/2375.png"}},{"team":{"id":3574,"name":"Giresunspor","code":"GIR","country":"Turkey","founded":1967,"national":false,"logo":"https://media.api-sports.io/football/teams/3574.png"},"venue":{"id":12089,"name":"Çotanak Stadyumu","address":"Aksu","city":"Giresun","capacity":22028,"surface":"grass","image":"https://media.api-sports.io/football/venues/12089.png"}},{"team":{"id":3575,"name":"Hatayspor","code":"HAT","country":"Turkey","founded":1967,"national":false,"logo":"https://media.api-sports.io/football/teams/3575.png"},"venue":{"id":12280,"name":"Yeni Hatay Stadyumu","address":"Haraparası, Süreyya Halefoğlu Cd. No:64","city":"Hatay","capacity":25000,"surface":"grass","image":"https://media.api-sports.io/football/venues/12280.png"}},{"team":{"id":3577,"name":"Ümraniyespor","code":"UMR","country":"Turkey","founded":1938,"national":false,"logo":"https://media.api-sports.io/football/teams/3577.png"},"venue":{"id":2379,"name":"Ümraniye Hekimbaşı Şehir Stadyumu","address":"Küçüksu Caddesi, Ümraniye","city":"İstanbul","capacity":2500,"surface":"grass","image":"https://media-1.api-sports.io/football/venues/2379.png"}},{"team":{"id":3578,"name":"İstanbulspor","code":"IST","country":"Turkey","founded":1926,"national":false,"logo":"https://media.api-sports.io/football/teams/3578.png"},"venue":{"id":12281,"name":"Necmi Kadıoğlu Stadyumu","address":"İncirtepe Mah., Esenyurt","city":"İstanbul","capacity":7500,"surface":"grass","image":"https://media-1.api-sports.io/football/venues/12281.png"}},{"team":{"id":3589,"name":"Fatih Karagümrük","code":"KAR","country":"Turkey","founded":null,"national":false,"logo":"https://media-1.api-sports.io/football/teams/3589.png"},"venue":{"id":1968,"name":"Atatürk Olimpiyat Stadı","address":"Atatürk Olimpiyat Stadı Otoparkı, İkitelli","city":"İstanbul","capacity":76092,"surface":"grass","image":"https://media.api-sports.io/football/venues/1968.png"}}]
  } catch (error) {
    console.log("ERROR");
    return [];
  }
};

export const requestSquads = async (teamId) => {
  try {
    const { data } = await axios.get(
      "https://v3.football.api-sports.io/players/squads",
      {
        params: { team: 607 },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_FOOTBALL_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_FOOTBALL_API_KEY,
        },
      }
    );

    console.log(JSON.stringify(data.response[0]));
    //return data.response[0]
    return [{"team":{"id":607,"name":"Konyaspor","logo":"https://media.api-sports.io/football/teams/607.png"},"players":[{"id":61924,"name":"E. Erentürk","age":27,"number":1,"position":"Goalkeeper","photo":"https://media.api-sports.io/football/players/61924.png"},{"id":50192,"name":"I. Šehić","age":34,"number":13,"position":"Goalkeeper","photo":"https://media-1.api-sports.io/football/players/50192.png"},{"id":351785,"name":"M. Erdoğan","age":18,"number":64,"position":"Goalkeeper","photo":"https://media.api-sports.io/football/players/351785.png"},{"id":402493,"name":"D. Ertaş","age":17,"number":null,"position":"Goalkeeper","photo":"https://media-1.api-sports.io/football/players/402493.png"},{"id":62023,"name":"Y. Subaşı","age":26,"number":3,"position":"Defender","photo":"https://media-1.api-sports.io/football/players/62023.png"},{"id":61986,"name":"A. Demirbağ","age":25,"number":4,"position":"Defender","photo":"https://media-1.api-sports.io/football/players/61986.png"},{"id":40472,"name":"Guilherme","age":32,"number":12,"position":"Defender","photo":"https://media-1.api-sports.io/football/players/40472.png"},{"id":2830,"name":"F. Calvo","age":30,"number":15,"position":"Defender","photo":"https://media.api-sports.io/football/players/2830.png"},{"id":63225,"name":"K. Demirtaş","age":28,"number":20,"position":"Defender","photo":"https://media.api-sports.io/football/players/63225.png"},{"id":61810,"name":"A. Oğuz","age":29,"number":22,"position":"Defender","photo":"https://media-1.api-sports.io/football/players/61810.png"},{"id":50229,"name":"B. Yardımcı","age":30,"number":26,"position":"Defender","photo":"https://media.api-sports.io/football/players/50229.png"},{"id":50141,"name":"C. Karayel","age":28,"number":90,"position":"Defender","photo":"https://media-1.api-sports.io/football/players/50141.png"},{"id":50063,"name":"U. Yazğılı","age":23,"number":5,"position":"Midfielder","photo":"https://media.api-sports.io/football/players/50063.png"},{"id":39137,"name":"Z. Bytyqi","age":26,"number":7,"position":"Midfielder","photo":"https://media-1.api-sports.io/football/players/39137.png"},{"id":14288,"name":"D. Pavičić","age":28,"number":10,"position":"Midfielder","photo":"https://media-1.api-sports.io/football/players/14288.png"},{"id":14296,"name":"R. Murić","age":26,"number":11,"position":"Midfielder","photo":"https://media.api-sports.io/football/players/14296.png"},{"id":62915,"name":"S. Dikmen","age":29,"number":14,"position":"Midfielder","photo":"https://media-1.api-sports.io/football/players/62915.png"},{"id":50006,"name":"A. Hadžiahmetović","age":25,"number":18,"position":"Midfielder","photo":"https://media.api-sports.io/football/players/50006.png"},{"id":79896,"name":"E. Çekiçi","age":26,"number":23,"position":"Midfielder","photo":"https://media.api-sports.io/football/players/79896.png"},{"id":61939,"name":"O. Ülgün","age":24,"number":35,"position":"Midfielder","photo":"https://media.api-sports.io/football/players/61939.png"},{"id":301582,"name":"M. Büyüksayar","age":18,"number":42,"position":"Midfielder","photo":"https://media-1.api-sports.io/football/players/301582.png"},{"id":40452,"name":"K. Michalak","age":25,"number":77,"position":"Midfielder","photo":"https://media.api-sports.io/football/players/40452.png"},{"id":1486,"name":"Bruno Paz","age":24,"number":80,"position":"Midfielder","photo":"https://media-1.api-sports.io/football/players/1486.png"},{"id":291986,"name":"A. Karademir","age":18,"number":88,"position":"Midfielder","photo":"https://media.api-sports.io/football/players/291986.png"},{"id":50100,"name":"M. Demir","age":30,"number":9,"position":"Attacker","photo":"https://media-1.api-sports.io/football/players/50100.png"},{"id":44877,"name":"U. Ikpeazu","age":27,"number":29,"position":"Attacker","photo":"https://media-1.api-sports.io/football/players/44877.png"},{"id":49987,"name":"Amilton","age":33,"number":93,"position":"Attacker","photo":"https://media.api-sports.io/football/players/49987.png"},{"id":19511,"name":"M. Diouf","age":35,"number":99,"position":"Attacker","photo":"https://media-1.api-sports.io/football/players/19511.png"}]}][0]
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
export const addReport = async (id, user) => {
  const { data: res } = await HTTP.put(`/review/report`, { id, user });

  return res;
};

export const deleteReview = async (id) => {
  const { data: res } = await HTTP.delete(`/review/delete/${id}`);

  return res;
};

export const updateReview = async (data) => {
  const { data: res } = await HTTP.put(`/review/update/${data.id}`, {
    rating: data.rating,
    comment: data.comment,
  });
  return res;
};

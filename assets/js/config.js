const baseUrl = "http://api.football-data.org/v2/";

const todayMatchesUrl =
  "http://api.football-data.org/v2/matches?competitions=2001,2015,2002,2019,2021";
const teamUrl = "http://api.football-data.org/v2/competitions/2001/teams/";
const competitionsUrl =
  "http://api.football-data.org/v2/competitions?areas=2077";

const token1 = {
  headers: {
    "X-Auth-Token": "3a7896831a90451a81d1bed8ac1a406f",
  },
};

const token2 = {
  headers: {
    "X-Auth-Token": "3de541566ff64172942b67ce635bffbb",
  },
};

const matchOfCompetition = (competitionId, matchDay) => {
  return `http://api.football-data.org/v2/competitions/${competitionId}/matches${
    matchDay ? "?matchDay=" + matchDay : ""
  }`;
};

const standingOfCompetition = (competitionId) =>
  `http://api.football-data.org/v2/competitions/${competitionId}/standings`;

const highlightUrl = "https://www.scorebat.com/video-api/v3/";

export {
  todayMatchesUrl,
  token1,
  token2,
  teamUrl,
  competitionsUrl,
  matchOfCompetition,
  standingOfCompetition,
  highlightUrl,
};

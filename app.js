const teamsUrl = "http://api.football-data.org/v2/competitions/2021/matches";
const competitionsUrl = "http://api.football-data.org/v2/competitions";
const standingUrl = "http://api.football-data.org/v2/matches/200282";

async function getData() {
  const response = await fetch(standingUrl, {
    headers: {
      "X-Auth-Token": "3a7896831a90451a81d1bed8ac1a406f",
    },
  });

  const result = await response.json();

  console.log(result);
}

getData();

export class Matches {
  matches;
  #teams;
  async getData(url, headers, teams) {
    try {
      const response = await fetch(url, headers);
      const { matches } = await response.json();
      this.matches = matches;
      this.#teams = teams;

      // update team
      matches.forEach((match) => {
        match.homeTeam = teams.find((team) => team.id === match.homeTeam.id);
        match.awayTeam = teams.find((team) => team.id === match.awayTeam.id);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

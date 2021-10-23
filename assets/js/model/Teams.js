class Teams {
  teams = [];
  async getData(header) {
    const value = await Promise.all([
      this.fetchData(2001, header).then((value) => value.json()),
      this.fetchData(2015, header).then((value) => value.json()),
      this.fetchData(2002, header).then((value) => value.json()),
      this.fetchData(2019, header).then((value) => value.json()),
      this.fetchData(2021, header).then((value) => value.json()),
    ]);
    value.forEach((item) => {
      this.teams.push(...item.teams);
    });
  }

  fetchData(id, header) {
    return fetch(
      `http://api.football-data.org/v2/competitions/${id}/teams/`,
      header
    );
  }
}

export const teams = new Teams();

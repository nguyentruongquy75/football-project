export class Competition {
  competitions;
  async getData(url, header) {
    const response = await fetch(url, header);
    const { competitions } = await response.json();
    this.competitions = competitions;
  }
}

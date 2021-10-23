class Standing {
  standing;
  async getData(url, headers) {
    const response = await fetch(url, headers);

    const data = await response.json();

    this.standing = data.standings[0].table;
  }
}

export const standing = new Standing();

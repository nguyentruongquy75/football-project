class Highlight {
  highlight;
  async getData(url) {
    const data = await fetch(url);
    const { response } = await data.json();

    this.highlight = response;
  }
}

export const highlight = new Highlight();

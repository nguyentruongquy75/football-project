export class ResultDetailView {
  #resultDetailElement;
  constructor(selector) {
    this.#resultDetailElement = document.querySelector(selector);
  }

  displayResultDetail() {
    this.#resultDetailElement.classList.add("display");
  }

  hideResultDetail() {
    this.#resultDetailElement.classList.remove("display");
  }

  renderResult(round, matches) {
    // Render heading
    const resultHeading = this.#resultDetailElement.querySelector(
      ".competition__result-heading"
    );
    resultHeading.textContent = `Week ${round}`;

    // Render list
    const resultList = this.#resultDetailElement.querySelector(".result__list");
    resultList.innerHTML = "";
    matches.forEach((item) => {
      resultList.insertAdjacentHTML(
        "beforeend",
        `
      <div class="result__item">
      <div class="result__item-team">
        <div class="result__item-team-logo">
          <img src="${item.homeTeam.crestUrl}" alt="${item.homeTeam.name}" />
        </div>

        <h6 class="result__item-team-name">${item.homeTeam.name}</h6>
      </div>

      <div class="result__item-score">
        <div class="score">
          <span class="home-score">${item.score.fullTime.homeTeam}</span>
          <span class="div">-</span>
          <span class="away-score">${item.score.fullTime.awayTeam}</span>
        </div>
        <div class="status">FT</div>
      </div>

      <div class="result__item-team">
        <h6 class="result__item-team-name">${item.awayTeam.name}</h6>
        <div class="result__item-team-logo">
          <img src="${item.awayTeam.crestUrl}" alt="${item.awayTeam.name}" />
        </div>
      </div>
    </div>`
      );
    });
  }

  #renderRound(matchDay) {
    const roundList = this.#resultDetailElement.querySelector(".round-list");

    for (let round = 1; round <= matchDay; round++) {
      roundList.insertAdjacentHTML(
        "beforeend",
        `
      <li class="round-item">
        <a href="#round${round}" class="round-item-link">W${round}</a>
      </li>`
      );
    }
  }

  render(matchDay, matches) {
    // render round
    this.#renderRound(matchDay);

    // render list
    this.renderResult(matchDay, matches);
  }
}

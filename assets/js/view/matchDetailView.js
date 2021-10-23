export class MatchDetailView {
  #matchDetailElement;

  constructor(selector) {
    this.#matchDetailElement = document.querySelector(selector);
    this.#addEvent();
  }

  renderMatchDetail(matchData) {
    const head = this.#matchDetailElement.querySelector(".matches__item-head");
    const body = this.#matchDetailElement.querySelector(".matches__item-body");
    const info = this.#matchDetailElement.querySelector(".match-info");
    head.innerHTML = `<h6 class="matches__item-competition">${
      matchData?.competition?.name || ""
    }</h6>
    <div class="tag tag--${matchData.status} matches__item-status">${
      matchData.status
    }</div>`;

    body.innerHTML = `
    <div class="home-team matches__item-team">
      <div class="matches__item-team__logo">
        <img src="${matchData.homeTeam.crestUrl}" alt="Logo" />
      </div>

      <span class="matches__item-team__name">${matchData.homeTeam.name}</span>
    </div>

    <div class="match-detail-score">
      <div class="score">
        <span class="home-score">${
          matchData.score.fullTime.homeTeam || "N/A"
        }</span>
        <span class="div">-</span>
        <span class="away-score">${
          matchData.score.fullTime.awayTeam || "N/A"
        }</span>
      </div>
      <div class="status">${matchData.status == "FINISHED" ? "FT" : ""}</div>
    </div>

    <div class="away-team matches__item-team">
      <div class="matches__item-team__logo">
        <img src="${matchData.awayTeam.crestUrl}" alt="Logo" />
      </div>

      <span class="matches__item-team__name">${matchData.awayTeam.name}</span>
    </div>
  </div>
    `;

    info.innerHTML = `<div class="match-info">
    <h5 class="match-info__heading">Match info</h5>
    <div class="match-info__item match-info__item-date">
      <div class="match-info__item-icon">
        <img
          src="https://www.livescore.com/ls-web-assets/svgs/common/calendar-2d54b39c3ed681b02d683b0bebe9038f.svg"
          alt="Icon"
        />
      </div>
      <div class="match-info__item-desc">
        <span class="match-info__item-detail">${new Date(
          matchData.utcDate
        ).toLocaleDateString()}</span>
        <span class="match-info__item-title">Date</span>
      </div>
    </div>

    <div class="match-info__item match-info__item-referee">
      <div class="match-info__item-icon">
        <img
          src="https://www.livescore.com/ls-web-assets/svgs/common/referee-d0e056d51a19081940f87521c60a495b.svg"
          alt="Icon"
        />
      </div>
      <div class="match-info__item-desc">
        <span class="match-info__item-detail">${
          matchData.referees[0]?.name || "N/A"
        }</span>
        <span class="match-info__item-title">Referee</span>
      </div>
    </div>

    <div class="match-info__item match-info__item-venue">
      <div class="match-info__item-icon">
        <img
          src="https://www.livescore.com/ls-web-assets/svgs/common/venue-bb6d741e46d7436e13f2cf6ce72436b8.svg"
          alt="Icon"
        />
      </div>
      <div class="match-info__item-desc">
        <span class="match-info__item-detail">${matchData.homeTeam.venue}</span>
        <span class="match-info__item-title">Venue</span>
      </div>
    </div>`;
  }

  displayMatchDetail() {
    this.#matchDetailElement.classList.add("display");
  }

  hideMatchDetail() {
    this.#matchDetailElement.classList.remove("display");
  }

  #addEvent() {
    const close = this.#matchDetailElement.querySelector(".detail-close");

    close.addEventListener("click", () => this.hideMatchDetail());
  }
}

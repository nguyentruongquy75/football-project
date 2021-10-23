import { View } from "./View";

class CompetitionDetailView extends View {
  renderHeading(data) {
    document.querySelector(".competition-title").innerHTML = `
    <h5 class="competition-heading">${data.name}</h5>

    <div class="competition-logo">
      <img src="${data.emblemUrl || data.area.ensignUrl}" alt="${data.name}" />
    </div>`;
  }

  renderResult(selector, data) {
    this.render(selector, data, (item) => {
      return `<div class="result__item">
          <div class="result__item-team">
            <div class="result__item-team-logo">
              <img src="${item.homeTeam.crestUrl}" alt="${
        item.homeTeam.name
      }" />
            </div>

            <h6 class="result__item-team-name">${item.homeTeam.name}</h6>
          </div>

          <div class="result__item-score">
            <div class="score">
              <span class="home-score">${item.score.fullTime.homeTeam}</span>
              <span class="div">-</span>
              <span class="away-score">${item.score.fullTime.awayTeam}</span>
            </div>
            <div class="status">${item.status === "FINISHED" ? "FT" : ""}</div>
          </div>

          <div class="result__item-team">
            <h6 class="result__item-team-name">${item.awayTeam.name}</h6>
            <div class="result__item-team-logo">
              <img src="${item.awayTeam.crestUrl}" alt="${
        item.awayTeam.name
      }" />
            </div>
          </div>
        </div>`;
    });
  }

  renderStanding(selector, data) {}
}

export const competitionDetailView = new CompetitionDetailView();

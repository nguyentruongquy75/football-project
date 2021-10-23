import { View } from "./View";

class MatchView extends View {
  renderMatches(targetSelector, data) {
    if (!data.length) {
      document.querySelector(
        targetSelector
      ).innerHTML = `<span class="message">No matches</span>`;
    }
    super.render(targetSelector, data, (item, index) => {
      const date = new Date(item.utcDate);

      return `<div class="matches__item">
                <a href="#${item.id}" class="matches__item-link">
                    <div class="matches__item-head">
                        <h6 class="matches__item-competition">${
                          item.competition?.name || ""
                        }</h6>
                        <div class="tag tag--${
                          item.status
                        } matches__item-status">${item.status}</div>
                    </div>
                    <div class="matches__item-body">
                    <div class="home-team matches__item-team">
                        <div class="matches__item-team__logo">
                        <img
                            src="${item.homeTeam?.crestUrl}"
                            alt="${item.homeTeam?.shortName}"
                        />
                        </div>

                        <span class="matches__item-team__name">${
                          item.homeTeam?.name || "N/A"
                        }</span>
                    </div>

                    <div class="middle ${
                      item.status === "FINISHED" ? "middle--score" : ""
                    }">
                      <div class="time">
                        <span class="matches__item-date">${date.toLocaleDateString()}</span>
                        <span class="matches__item-time">${date.toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}</span>
                      </div>


                      <div class="score">
                        <span class="home-team-score">${
                          item.score.fullTime.homeTeam
                        }</span>
                        <span class="divide">-</span>
                        <span class="away-team-score">${
                          item.score.fullTime.awayTeam
                        }</span>
                      </div>
                    </div>

                    
                    <div class="away-team matches__item-team">
                        <div class="matches__item-team__logo">
                        <img
                            src="${item.awayTeam?.crestUrl}"
                            alt="${item.homeTeam?.shortName}"
                        />
                        </div>

                        <span class="matches__item-team__name">${
                          item.awayTeam?.name || "N/A"
                        }</span>
                    </div>
                    </div>
                    </a>
                </div>`;
    });
  }
}

export const matchView = new MatchView();

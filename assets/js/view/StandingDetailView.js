import { StandingView } from "./StandingView";
import { View } from "./View";

export class StandingDetailView extends View {
  #element;
  constructor(selector) {
    super();
    this.#element = document.querySelector(selector);
  }
  renderStandingDetail(selector, data) {
    document.querySelector(selector).innerHTML = "";
    this.render(selector, data, (item, index) => {
      return `
        <tr>
            <td class="position">${item.position}</td>
            <td class="team">${item.team.name}</td>
            <td class="p">${item.playedGames}</td>
            <td class="w">${item.won}</td>
            <td class="d">${item.draw}</td>
            <td class="l">${item.lost}</td>
            <td class="f">${item.goalsFor}</td>
            <td class="a">${item.goalsAgainst}</td>
            <td class="gd">${item.goalDifference}</td>
            <td class="pts">${item.points}</td>
        </tr>`;
    });
  }

  dislayStandingDetail() {
    this.#element.classList.add("display");
  }

  hideStandingDetail() {
    this.#element.classList.remove("display");
  }
}

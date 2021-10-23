import { View } from "./View";
class StandingView extends View {
  renderStanding(selector, data) {
    if (!data.length) {
      document.querySelector(
        selector
      ).innerHTML = `<span class="message">No data</span>`;
    } else {
      document.querySelector(selector).innerHTML = "";
      this.render(selector, data, (item) => {
        return `
              <tr>
                  <td class="position">${item.position}</td>
                  <td class="team">${item.team.name}</td>
                  <td class="p">${item.playedGames}</td>
                  <td class="gd">${item.goalDifference}</td>
                  <td class="pts">${item.points}</td>
              </tr>`;
      });
    }
  }
}

export const standingView = new StandingView();

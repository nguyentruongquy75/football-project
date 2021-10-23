import { View } from "./View";

class CompetitionView extends View {
  renderCompetitions(selector, data) {
    super.render(selector, data, (item) => {
      return `<div class="competitions__item">
                        <a href="competition-detail.html?competitionId=${
                          item.id
                        }" class="competitions__item-link">
                            <h6 class="competitions__item-name">${
                              item.name
                            }</h6>
                            <div class="competitions__item-logo">
                                <img
                                src="${item.emblemUrl || item.area.ensignUrl}"
                                alt="${item.name}"
                                />
                            </div>
                        </a>
                    </div>`;
    });
  }
}

export const competitionView = new CompetitionView();

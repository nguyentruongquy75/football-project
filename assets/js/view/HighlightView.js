import { View } from "./View";

class HighlightView extends View {
  renderHighlight(selector, data) {
    this.render(selector, data, (item, index) => {
      const competition = item.competition
        .slice(item.competition.indexOf(":") + 1)
        .trim();
      const date = new Date(item.date).toLocaleDateString();
      return `
            <div class="highlight__item">
            <a href="#${index}" class="highlight__item-link">
            <div class="highlight__item-img">
              <img src="${item.thumbnail}" alt="${item.title}" />
              <div class="highlight__item-img-icon">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <h6 class="highlight__item-title">${item.title}</h6>
            <div class="highlight__item-desc">
              <div class="highlight__item-competition">${competition}</div>
              <span class="highlight__item-date">${date}</span>
            </div>
            </a>
          </div>
            `;
    });
  }
}

export const highlightView = new HighlightView();

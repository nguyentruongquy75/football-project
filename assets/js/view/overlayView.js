class OverlayView {
  #overlayElement;
  constructor(selector) {
    this.#overlayElement = document.querySelector(selector);
  }

  displayOverlay() {
    this.#overlayElement.classList.add("display");
  }

  hideOverlay() {
    this.#overlayElement.classList.remove("display");
  }
}

export const overlay = new OverlayView(".overlay");

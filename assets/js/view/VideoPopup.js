export class VideoPopup {
  #element;
  #iframe;
  constructor(selector) {
    this.#element = document.querySelector(selector);
    this.#iframe = this.#element.querySelector("iframe");
    this.#addEvent();
  }

  displayVideoPopup() {
    this.#element.classList.add("flex");
  }

  hideVideoPopup() {
    this.#element.classList.remove("flex");
    this.#iframe.src = "";
    document.body.classList.remove("disabled-scroll");
  }

  renderIframe(url) {
    this.#iframe.src = url;
  }

  #addEvent() {
    const close = this.#element.querySelector(".close");

    close.addEventListener("click", () => {
      this.hideVideoPopup();
    });

    this.#element.addEventListener("click", () => {
      this.hideVideoPopup();
    });
  }
}

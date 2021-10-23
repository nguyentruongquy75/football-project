export class Slider {
  #element = {};
  #currentSlide = 0;
  #totalSlide = null;
  #space = null;
  constructor(options = {}) {
    const { container, prev, next } = options;
    this.#element.container = document.querySelector(container);
    this.#element.prev = document.querySelector(prev);
    this.#element.next = document.querySelector(next);
  }

  init() {
    // Create Slider html
    const container = this.#element.container;
    const cloneNode = container.cloneNode(true);
    container.className = "slider";
    Object.assign(container.style, {
      padding: "0.4rem 0.4rem 1.2rem",
      overflow: "hidden",
    });

    Object.assign(cloneNode.style, {
      transition: "transform 0.3s ease",
    });

    container.innerHTML = "";

    container.append(cloneNode);

    // Calculate total Slide

    const itemOfSlide = Math.floor(
      cloneNode.clientWidth / cloneNode.children[0]?.clientWidth
    );

    this.#space =
      (cloneNode.clientWidth % cloneNode.children[0]?.clientWidth) /
      (itemOfSlide - 1);

    this.#totalSlide = Math.ceil(cloneNode.childElementCount / itemOfSlide);

    // Add event listener
    this.#checkControl();
    this.#addEvent();
  }

  #addEvent() {
    // Prev
    this.#element.prev.addEventListener("click", () => {
      if (
        !this.#element.prev.classList.contains("slider-control__item--disabled")
      ) {
        this.#currentSlide--;
        this.#gotoSlide(this.#currentSlide);

        this.#checkControl();
      }
    });

    // Next
    this.#element.next.addEventListener("click", () => {
      if (
        !this.#element.next.classList.contains("slider-control__item--disabled")
      ) {
        this.#currentSlide++;
        this.#gotoSlide(this.#currentSlide);
      }

      this.#checkControl();
    });
  }

  #checkControl() {
    this.#removeDisablePrev();
    this.#removeDisableNext();
    if (this.#currentSlide === 0) {
      this.#disablePrev();
    }

    if (this.#currentSlide >= this.#totalSlide - 1) {
      this.#disableNext();
    }
  }

  #removeDisablePrev() {
    this.#element.prev.classList.remove("slider-control__item--disabled");
  }

  #removeDisableNext() {
    this.#element.next.classList.remove("slider-control__item--disabled");
  }

  #disablePrev() {
    this.#element.prev.classList.add("slider-control__item--disabled");
  }

  #disableNext() {
    this.#element.next.classList.add("slider-control__item--disabled");
  }

  #gotoSlide(num) {
    const container = this.#element.container.children[0];
    container.style.transform = `translateX(calc(${-num * 100}% - ${
      this.#space
    }px))`;
  }
}

export class View {
  render(targetSelector, data = [], callback) {
    const targetElement = document.querySelector(targetSelector);

    const htmls = data.map((item, index) => callback(item, index));

    htmls.forEach((item) =>
      targetElement.insertAdjacentHTML("beforeend", item)
    );
  }
}

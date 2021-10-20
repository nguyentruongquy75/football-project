import { Slider } from "./view/Slider";
import { todayMatchesUrl } from "./config";

const path = location.pathname;

if (path.includes("index")) {
  async function getData() {
    const response = await fetch(todayMatchesUrl, {
      headers: {
        "X-Auth-Token": "3a7896831a90451a81d1bed8ac1a406f",
      },
    });
    const data = await response.json();
  }

  getData();
} else if (path.includes("competition.html")) {
} else if (path.includes("competition-detail.html")) {
  // Init slider
  new Slider({
    container: ".matches--current-week .matches__list",
    prev: ".matches--current-week .slider-control__prev",
    next: ".matches--current-week .slider-control__next",
  }).init();

  new Slider({
    container: ".matches--next-week .matches__list",
    prev: ".matches--next-week .slider-control__prev",
    next: ".matches--next-week .slider-control__next",
  }).init();

  new Slider({
    container: ".round-list",
    prev: ".round-list-container .slider-control__prev",
    next: ".round-list-container .slider-control__next",
  }).init();
}

import { Slider } from "./view/Slider";
import {
  todayMatchesUrl,
  competitionsUrl,
  token1,
  token2,
  teamUrl,
  matchOfCompetition,
  standingOfCompetition,
  highlightUrl,
} from "./config";
import { Matches } from "./model/Match";
import { teams } from "./model/Teams";
import { standing } from "./model/Standing";
import { highlight } from "./model/Highlight";
import { matchView } from "./view/matchView";
import { MatchDetailView } from "./view/matchDetailView";
import { overlay } from "./view/overlayView";
import { Competition } from "./model/Competitions";
import { competitionView } from "./view/CompetitionsView";
import { competitionDetailView } from "./view/CompetitionDetailView";
import { standingView } from "./view/StandingView";
import { ResultDetailView } from "./view/ResultDetailView";
import { StandingDetailView } from "./view/StandingDetailView";
import { highlightView } from "./view/HighlightView";
import { VideoPopup } from "./view/VideoPopup";

const path = location.pathname;
if (teams.teams.length === 0) {
  teams.getData(token2);
}

if (path.includes("index") || path === "/") {
  const matchDetail = new MatchDetailView(".match-detail");
  const match = new Matches();
  match.getData(todayMatchesUrl, token1, teams.teams).then(() => {
    document.body.classList.remove("preloader");
    matchView.renderMatches(".matches__list", match.matches);

    const matchItems = document.querySelectorAll(".matches__item");

    // match detail
    matchItems.forEach((item) => {
      item.addEventListener("click", () => {
        matchDetail.displayMatchDetail();
        overlay.displayOverlay();
        // disable scroll
        document.body.classList.add("disabled-scroll");
      });
    });
  });

  //close match detail
  document
    .querySelector(".match-detail .detail-close")
    .addEventListener("click", () => {
      matchDetail.hideMatchDetail();
      overlay.hideOverlay();
      document.body.classList.remove("disabled-scroll");
    });

  //click overlay
  document.querySelector(".overlay").addEventListener("click", () => {
    matchDetail.hideMatchDetail();
    overlay.hideOverlay();
    document.body.classList.remove("disabled-scroll");
  });

  // Change hash event ---> Update match datail
  window.addEventListener("hashchange", () => {
    const hash = location.hash.slice(1);

    matchDetail.renderMatchDetail(
      match.matches.find((item) => item.id == hash)
    );
  });
} else if (path.includes("competitions.html")) {
  const competition = new Competition();
  competition.getData(competitionsUrl, token1).then(() => {
    document.body.classList.remove("preloader");
    const filterCompetitions = competition.competitions.filter(
      (item) =>
        item.id === 2001 ||
        item.id === 2015 ||
        item.id === 2002 ||
        item.id === 2019 ||
        item.id === 2021
    );
    competitionView.renderCompetitions(
      ".competitions__list",
      filterCompetitions
    );
  });
} else if (path.includes("competition-detail.html")) {
  const competitionId = +location.search.slice(
    location.search.indexOf("=") + 1
  );

  const matchesOfCompetition = new Matches();
  const competition = new Competition();
  let currentCompetition = null;

  // Get competition and match
  Promise.all([
    competition.getData(competitionsUrl, token1),
    matchesOfCompetition.getData(
      matchOfCompetition(competitionId),
      token1,
      teams.teams
    ),
    standing.getData(standingOfCompetition(competitionId), token1),
  ]).then((value) => {
    document.body.classList.remove("preloader");
    currentCompetition = competition.competitions.find(
      (item) => item.id === competitionId
    );

    // render Heading
    competitionDetailView.renderHeading(currentCompetition);

    // current week
    const currentWeek = currentCompetition.currentSeason.currentMatchday;
    const currentWeekMatches = matchesOfCompetition.matches.filter(
      (item) => item.matchday === currentWeek
    );

    // Next week
    const nextWeekMatches = matchesOfCompetition.matches.filter(
      (item) => item.matchday === currentWeek + 1
    );

    // Render current week
    matchView.renderMatches(
      ".matches--current-week .matches__list",
      currentWeekMatches
    );
    // Render next week
    matchView.renderMatches(
      ".matches--next-week .matches__list",
      nextWeekMatches
    );

    // Render result
    const resultDetail = new ResultDetailView(".competition__result-detail");
    const matchDay = currentCompetition.currentSeason.currentMatchday - 1;

    competitionDetailView.renderResult(
      ".result__list",
      matchesOfCompetition.matches
        .filter((item) => item.matchday === currentWeek - 1)
        .slice(0, 5)
    );

    // render standing
    standingView.renderStanding(
      ".standing-table tbody",
      standing.standing.slice(0, 7)
    );

    // render standing detail

    const standingDetail = new StandingDetailView(
      ".competition__standing-detail"
    );

    standingDetail.renderStandingDetail(
      ".competition__standing-detail tbody",
      standing.standing
    );

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

    // Add event
    const matchItems = document.querySelectorAll(".matches__item");
    const matchDetail = new MatchDetailView(".match-detail");

    matchItems.forEach((item) => {
      item.addEventListener("click", () => {
        matchDetail.displayMatchDetail();
        overlay.displayOverlay();
      });
    });

    window.addEventListener("hashchange", () => {
      const hash = location.hash.slice(1);
      if (hash.startsWith("round")) {
        const matchDay = +hash.slice(-1);
        resultDetail.renderResult(
          matchDay,
          matchesOfCompetition.matches.filter(
            (item) => item.matchday === matchDay
          )
        );
      } else {
        matchDetail.renderMatchDetail(
          matchesOfCompetition.matches.find((item) => item.id == hash)
        );
      }
    });

    document.querySelector(".overlay").addEventListener("click", () => {
      matchDetail.hideMatchDetail();
      resultDetail.hideResultDetail();
      overlay.hideOverlay();
      standingDetail.hideStandingDetail();

      document.body.classList.remove("disabled-scroll");
    });

    // expand result
    document
      .querySelector(".competition__result .expand")
      .addEventListener("click", () => {
        resultDetail.displayResultDetail();
        overlay.displayOverlay();
        document.body.classList.add("disabled-scroll");

        resultDetail.render(
          matchDay,
          matchesOfCompetition.matches.filter(
            (item) => item.matchday === matchDay
          )
        );
        new Slider({
          container: ".round-list-container .round-list",
          prev: ".round-list-container .slider-control__prev",
          next: ".round-list-container .slider-control__next",
        }).init();
      });

    // expand standing
    document
      .querySelector(".competition__standing .expand")
      .addEventListener("click", () => {
        standingDetail.dislayStandingDetail();
        overlay.displayOverlay();
        document.body.classList.add("disabled-scroll");
      });

    // close match detail

    document
      .querySelector(".match-detail .detail-close")
      .addEventListener("click", () => {
        matchDetail.hideMatchDetail();
        overlay.hideOverlay();
        document.body.classList.remove("disabled-scroll");
      });

    // close result detail
    document
      .querySelector(".competition__result-detail .detail-close")
      .addEventListener("click", () => {
        resultDetail.hideResultDetail();
        overlay.hideOverlay();
        document.body.classList.remove("disabled-scroll");
      });

    // close standing detail
    document
      .querySelector(".competition__standing-detail .detail-close")
      .addEventListener("click", () => {
        standingDetail.hideStandingDetail();
        overlay.hideOverlay();
        document.body.classList.remove("disabled-scroll");
      });
  });
} else if (path.includes("highlight.html")) {
  highlight.getData(highlightUrl).then(() => {
    document.body.classList.remove("preloader");
    highlightView.renderHighlight(".highlight__list", highlight.highlight);
    const videoPopup = new VideoPopup(".video-popup");
    const highlightItem = document.querySelectorAll(".highlight__item");

    // Click

    highlightItem.forEach((item) =>
      item.addEventListener("click", () => {
        const hash = location.hash.slice(1);
        const embed = highlight.highlight[hash].videos[0].embed;

        const url = embed.slice(
          embed.indexOf("http"),
          embed.indexOf("'", embed.indexOf("http"))
        );

        document.body.classList.add("disabled-scroll");
        videoPopup.renderIframe(url);
        videoPopup.displayVideoPopup();
      })
    );

    window.addEventListener("hashchange", () => {
      const hash = location.hash.slice(1);
      const embed = highlight.highlight[hash].videos[0].embed;
      const url = embed.slice(
        embed.indexOf("http"),
        embed.indexOf("'", embed.indexOf("http"))
      );
      videoPopup.renderIframe(url);
    });
  });
}

const genre = document.getElementById("genre");
const genreNav = document.querySelector(".genre-nav");

genre.addEventListener("click", function () {
  // Vérifiez l'opacité actuelle de genreNav
  var currentOpacity = window.getComputedStyle(genreNav).opacity;

  if (currentOpacity === "0" || currentOpacity === "0.0") {
    // Si l'opacité est 0, la faire apparaître en changeant l'opacité à 1
    genreNav.style.opacity = "1";
    genreNav.style.transform = "translate(0px, 29px)";
  } else {
    // Sinon, la faire disparaître en changeant l'opacité à 0
    genreNav.style.opacity = "0";
  }
});

const coverBanner = document.getElementById("cover-banner");
const descriptionCover = document.querySelector(".description-cover");
const bannerWall = document.getElementById("banner-wall");
const coverText = document.querySelector(".cover-text");

coverBanner.addEventListener("click", function () {
  if (coverBanner.classList.contains("active-banner")) {
    coverBanner.style.width = "23em";
    descriptionCover.style.top = "8em";
    descriptionCover.style.left = "3em";
    bannerWall.style.filter = "blur(32px)";
    coverText.style.display = "block";
  } else {
  }
});

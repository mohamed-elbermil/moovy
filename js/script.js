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

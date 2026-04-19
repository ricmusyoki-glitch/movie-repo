function getGenres() {
  return {
    action: 28,
    animation: 16,
    horror: 27
  };
}

function getCurrentPage(page) {
  return page + 1;
}

function formatRating(rating) {
  return rating.toFixed(1);
}

function getMovieTitle(movie) {
  return movie.title;
}

module.exports = {
  getGenres,
  getCurrentPage,
  formatRating,
  getMovieTitle
};
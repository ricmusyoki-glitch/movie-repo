const {
  getGenres,
  getCurrentPage,
  formatRating,
  getMovieTitle
} 
= require("./movieFunctions");

test("returns horror genre id", () => {
  expect(getGenres().horror).toBe(27);
});

test("increments page number", () => {
  expect(getCurrentPage(1)).toBe(2);
});

test("formats rating to one decimal place", () => {
  expect(formatRating(8.456)).toBe("8.5");
});

test("gets movie title", () => {
  expect(getMovieTitle({ title: "Batman" })).toBe("Batman");
});
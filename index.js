const API_KEY = "5a6e3de1cadd2f14d90edffa614e4263";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

/* I am indicating the following constants below to let js know that these will be the places where the movie will be posted*/
const heromovie = document.getElementById ("heromovie");

const trending1 = document.getElementById ("trending1");
const trending2 = document.getElementById ("trending2");
const trending3 = document.getElementById ("trending3");

const toprated1 = document.getElementById ("toprated1");
const toprated2 = document.getElementById ("toprated2");
const toprated3 = document.getElementById ("toprated3");

async function getHeroMovie() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );

  const data = await response.json();

  const movie = data.results[0];

  heromovie.innerHTML = `
    <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>⭐ ${movie.vote_average}</p>
  `;
}

getHeroMovie();
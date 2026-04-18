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

/* this is the function to fetch movie from api to hero section*/
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
    <button>Watch Now</button>
  `;
}

getHeroMovie();


async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );

  const data = await response.json();

  const movies = data.results.slice(0, 3);

  trending1.innerHTML = `
    <img src="${IMAGE_URL + movies[0].poster_path}" alt="${movies[0].title}">
    <h3>${movies[0].title}</h3>
    <p>⭐ ${movies[0].vote_average}</p>
    <button>Watch Now</button>
  `;

  trending2.innerHTML = `
    <img src="${IMAGE_URL + movies[1].poster_path}" alt="${movies[1].title}">
    <h3>${movies[1].title}</h3>
    <p>⭐ ${movies[1].vote_average}</p>
    <button>Watch Now</button>
  `;

  trending3.innerHTML = `
    <img src="${IMAGE_URL + movies[2].poster_path}" alt="${movies[2].title}">
    <h3>${movies[2].title}</h3>
    <p>⭐ ${movies[2].vote_average}</p>
    <button>Watch Now</button>

  `;
}
getTrendingMovies();


async function getTopRatedMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );

  const data = await response.json();

  const movies = data.results.slice(0, 3);

  toprated1.innerHTML = `
    <img src="${IMAGE_URL + movies[0].poster_path}" alt="${movies[0].title}">
    <h3>${movies[0].title}</h3>
    <p>⭐ ${movies[0].vote_average}</p>
    <button>Watch Now</button>
  `;

  toprated2.innerHTML = `
    <img src="${IMAGE_URL + movies[1].poster_path}" alt="${movies[1].title}">
    <h3>${movies[1].title}</h3>
    <p>⭐ ${movies[1].vote_average}</p>
    <button>Watch Now</button>
  `;

  toprated3.innerHTML = `
    <img src="${IMAGE_URL + movies[2].poster_path}" alt="${movies[2].title}">
    <h3>${movies[2].title}</h3>
    <p>⭐ ${movies[2].vote_average}</p>
    <button>Watch Now</button>
  `;
}
getTopRatedMovies()

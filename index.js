const API_KEY = "5a6e3de1cadd2f14d90edffa614e4263";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// TRENDING CARDS (3 ARTICLES)
const trending1 = document.getElementById("trending1");
const trending2 = document.getElementById("trending2");
const trending3 = document.getElementById("trending3");

// TOP RATED CARDS (3 ARTICLES)
const toprated1 = document.getElementById("toprated1");
const toprated2 = document.getElementById("toprated2");
const toprated3 = document.getElementById("toprated3");

// HERO SECTION
const heromovie = document.getElementById("heromovie");


// HERO MOVIE
async function getHeroMovie() {
    const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await response.json();

    const movie = data.results[0];

    heromovie.innerHTML = `
        <img src="${IMG_URL + movie.backdrop_path}" alt="${movie.title}">
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <button>Watch Now</button>
    `;
}


// TRENDING MOVIES
async function getTrendingMovies() {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();

    const movies = data.results.slice(0, 3);

    trending1.innerHTML = `
        <img src="${IMG_URL + movies[0].poster_path}" alt="${movies[0].title}">
        <h3>${movies[0].title}</h3>
    `;

    trending2.innerHTML = `
        <img src="${IMG_URL + movies[1].poster_path}" alt="${movies[1].title}">
        <h3>${movies[1].title}</h3>
    `;

    trending3.innerHTML = `
        <img src="${IMG_URL + movies[2].poster_path}" alt="${movies[2].title}">
        <h3>${movies[2].title}</h3>
    `;
}


// TOP RATED MOVIES
async function getTopRatedMovies() {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();

    const movies = data.results.slice(0, 3);

    toprated1.innerHTML = `
        <img src="${IMG_URL + movies[0].poster_path}" alt="${movies[0].title}">
        <h3>${movies[0].title}</h3>
    `;

    toprated2.innerHTML = `
        <img src="${IMG_URL + movies[1].poster_path}" alt="${movies[1].title}">
        <h3>${movies[1].title}</h3>
    `;

    toprated3.innerHTML = `
        <img src="${IMG_URL + movies[2].poster_path}" alt="${movies[2].title}">
        <h3>${movies[2].title}</h3>
    `;
}


// RUN
getHeroMovie();
getTrendingMovies();
getTopRatedMovies();


// SAFE VERSION OF YOUR CODE

const themoviefilter = document.getElementById("themoviefilter");
const moviearticle = document.getElementById("moviearticle");

// Genre IDs
const genres = {
    action: 28,
    animation: 16,
    horror: 27
};

// Only run if elements exist on this page
if (themoviefilter && moviearticle) {

    // Display Movies
    function displayMovies(movies) {
        moviearticle.innerHTML = "";

        movies.forEach(movie => {
            moviearticle.innerHTML += `
                <article class="movie-card">
                    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.vote_average.toFixed(1)}</p>
                    <button>Watch Now</button>
                </article>
            `;
        });
    }

    // All Movies
    async function getAllMovies() {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );

        const data = await response.json();
        displayMovies(data.results.slice(0, 12));
    }

    // Genre Movies
    async function getGenreMovies(genreId) {
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
        );

        const data = await response.json();
        displayMovies(data.results.slice(0, 12));
    }

    // Select Change
    themoviefilter.addEventListener("change", function () {
        const selected = themoviefilter.value;

        if (selected === "all") {
            getAllMovies();
        } else {
            getGenreMovies(genres[selected]);
        }
    });

    // First Load
    getAllMovies();
}
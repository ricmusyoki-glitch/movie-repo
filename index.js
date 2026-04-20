const API_KEY = "5a6e3de1cadd2f14d90edffa614e4263";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const trending1 = document.getElementById("trending1");
const trending2 = document.getElementById("trending2");
const trending3 = document.getElementById("trending3");

const toprated1 = document.getElementById("toprated1");
const toprated2 = document.getElementById("toprated2");
const toprated3 = document.getElementById("toprated3");

const heromovie = document.getElementById("heromovie");

async function getHeroMovie() {

    const response = await fetch(
        `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );

    const data = await response.json();

    const movie = data.results[0];

    heromovie.innerHTML = `
        <img src="${IMG_URL + movie.backdrop_path}" alt="${movie.title}">
        <h1>${movie.title}</h1>
        <h2>${movie.overview}</h2>
        <button onclick="watchTrailer(${movie.id})">Watch Trailer</button>
    `;
}
async function getTrendingMovies() {

    const response = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );

    const data = await response.json();

    const movies = data.results.slice(0, 3);

    trending1.innerHTML = `
        <img src="${IMG_URL + movies[0].poster_path}">
        <h1>${movies[0].title}</h1>
        <button onclick="watchTrailer(${movies[0].id})">Watch Trailer</button>
    `;

    trending2.innerHTML = `
        <img src="${IMG_URL + movies[1].poster_path}">
        <h1>${movies[1].title}</h1>
        <button onclick="watchTrailer(${movies[1].id})">Watch Trailer</button>
    `;

    trending3.innerHTML = `
        <img src="${IMG_URL + movies[2].poster_path}">
        <h1>${movies[2].title}</h1>
        <button onclick="watchTrailer(${movies[2].id})">Watch Trailer</button>
    `;
}

async function getTopRatedMovies() {

    const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );

    const data = await response.json();

    const movies = data.results.slice(0, 3);

    toprated1.innerHTML = `
        <img src="${IMG_URL + movies[0].poster_path}">
        <h1>${movies[0].title}</h1>
        <button onclick="watchTrailer(${movies[0].id})">Watch Trailer</button>
    `;

    toprated2.innerHTML = `
        <img src="${IMG_URL + movies[1].poster_path}">
        <h1>${movies[1].title}</h1>
        <button onclick="watchTrailer(${movies[1].id})">Watch Trailer</button>
    `;

    toprated3.innerHTML = `
        <img src="${IMG_URL + movies[2].poster_path}">
        <h1>${movies[2].title}</h1>
        <button onclick="watchTrailer(${movies[2].id})">Watch Trailer</button>
    `;
}

getHeroMovie();
getTrendingMovies();
getTopRatedMovies();

/* This is the function for the movie.html*/
const themoviefilter = document.getElementById("themoviefilter");
const moviegrid = document.getElementById("moviegrid");

const movieSearch = document.querySelector(".movie-search");
const searchInput = document.getElementById("searchinput");

const genres = {
    action: 28,
    animation: 16,
    horror: 27
};

let currentPage = 1;
let currentGenre = "all";

async function watchTrailer(movieId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await response.json();

    const trailer = data.results.find(video =>
        video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
        window.open(
            `https://www.youtube.com/watch?v=${trailer.key}`,
            "_blank"
        );
    } else {
        alert("Trailer not found");
    }
}

window.watchTrailer = watchTrailer;

function showMovies(movies, clear = false) {
    if (clear) {
        moviegrid.innerHTML = "";
    }

    movies.forEach(movie => {
        const card = document.createElement("article");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p> ${movie.vote_average.toFixed(1)}</p>
            <button onclick="watchTrailer(${movie.id})">
                Watch Trailer
            </button>
        `;

        moviegrid.appendChild(card);
    });
}

async function getAllMovies(page = 1, clear = false) {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );

    const data = await response.json();

    showMovies(data.results, clear);
}

async function getGenreMovies(id, page = 1, clear = false) {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`
    );

    const data = await response.json();

    showMovies(data.results, clear);
}

async function searchMovies(query) {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await response.json();

    showMovies(data.results, true);
}

function loadMovies(page = 1, clear = false) {
    if (currentGenre === "all") {
        getAllMovies(page, clear);
    } else {
        getGenreMovies(genres[currentGenre], page, clear);
    }
}

themoviefilter.addEventListener("change", function () {
    currentGenre = themoviefilter.value;
    currentPage = 1;
    loadMovies(1, true);
});

window.addEventListener("scroll", function () {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
    ) {
        currentPage++;
        loadMovies(currentPage, false);
    }
});
movieSearch.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchValue = searchInput.value.trim();

    if (searchValue !== "") {
        searchMovies(searchValue);
    }
});

loadMovies(1, true);


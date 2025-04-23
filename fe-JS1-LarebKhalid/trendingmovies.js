const url1 = "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=de2010f82cfd0ea2d11da20b9cb0c687";
const img_url = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');

// Fetch trending movies
getMovies(url1);

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results); // Logging data for testing purposes
            showMovies(data.results);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            main.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        });
}

// Display the movies
function showMovies(data) {
    main.innerHTML = ''; // Clear the main content

    // Loop through the movie data and create movie elements
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieOverview = overview ? overview : "No overview available.";

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${img_url + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${movieOverview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Set color based on vote average
function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return 'red';
    }
}

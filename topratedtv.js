const url = "https://api.themoviedb.org/3/tv/top_rated?api_key=de2010f82cfd0ea2d11da20b9cb0c687&language=en-US&page=1";
const img_url = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');

getTVShows(url);

function getTVShows(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results); // Log the TV shows data to the console
            showTVShows(data.results); // Pass the TV shows data to the display function
        });
}

function showTVShows(data) {
    main.innerHTML = ''; // Clear previous search results

    data.forEach(tvShow => {
        const { name, poster_path, vote_average, overview } = tvShow;
        const tvShowEl = document.createElement('div');
        tvShowEl.classList.add('movie');
        tvShowEl.innerHTML = `
            <img src="${img_url + poster_path}" alt="${name}">
            <div class="movie-info">
                <h3>${name}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(tvShowEl); // Add the TV show card to the page
    });
}

function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return 'red';
    }
}

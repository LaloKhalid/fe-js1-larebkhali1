const url1 = "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=de2010f82cfd0ea2d11da20b9cb0c687";
const img_url = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');

getMovies(url1);

function getMovies(url) {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                showMessage("No trending movies found.");
            } else {
                showMovies(data.results);
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            showMessage("Oops! Something went wrong. Please try again later.");
        });
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
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
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getColor(vote) {
    if (vote >= 8) return "green";
    else if (vote >= 5) return "orange";
    else return 'red';
}

function showMessage(message) {
    main.innerHTML = `
        <div style="color: white; font-size: 1.2rem; padding: 2rem; text-align: center;">
            ${message}
        </div>
    `;
}

// Person search form logic
const form = document.getElementById('form');
const searchInput = document.getElementById('search-input');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        searchPerson(searchTerm);
        searchInput.value = '';
    }
});

async function searchPerson(name) {
    const apiKey = 'de2010f82cfd0ea2d11da20b9cb0c687';
    const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(name)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch data.");
        }

        const data = await res.json();
        main.innerHTML = '';

        if (data.results.length === 0) {
            showMessage("No people found. Try a different name.");
        } else {
            data.results.slice(0, 10).forEach(person => {
                const personEl = document.createElement('div');
                personEl.classList.add('movie');

                const image = person.profile_path
                    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image';

                const knownForList = person.known_for.map(work => {
                    const type = work.media_type === 'movie' ? 'Movie' : 'TV';
                    return `<li>${type}: ${work.title || work.name}</li>`;
                }).join('');

                personEl.innerHTML = `
                    <img src="${image}" alt="${person.name}">
                    <div class="movie-info">
                        <h3>${person.name}</h3>
                        <span>${person.known_for_department}</span>
                    </div>
                    <div class="overview">
                        <h3>Known For</h3>
                        <ul>${knownForList}</ul>
                    </div>
                `;

                main.appendChild(personEl);
            });
        }
    } catch (err) {
        console.error(err);
        showMessage("Oops! Something went wrong. Please try again later.");
    }
}

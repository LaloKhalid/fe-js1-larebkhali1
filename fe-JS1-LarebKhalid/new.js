const API_KEY = 'de2010f82cfd0ea2d11da20b9cb0c687';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');

const btnPopular = document.getElementById('btnPopular');
const btnTopRated = document.getElementById('btnTopRated');

const form = document.getElementById('form');
const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('searchType');

const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`;

getMovies(trendingMoviesURL);

btnPopular.addEventListener('click', () => {
  getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`, 10);
});

btnTopRated.addEventListener('click', () => {
  getMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, 10);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    alert('Please enter a search term.');
    return;
  }

  const type = searchType.value; // 'movie' or 'person'
  const searchUrl = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchTerm)}&page=1&include_adult=false`;

  fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
      if (data.results.length === 0) {
        main.innerHTML = `<p style="color:red; text-align:center;">No results found for "${searchTerm}".</p>`;
      } else {
        if (type === 'person') {
          showPeople(data.results);
        } else {
          showMovies(data.results);
        }
      }
    })
    .catch(() => {
      main.innerHTML = '<p style="color:red; text-align:center;">Failed to fetch search results.</p>';
    });
});

function getMovies(url, limit = 20) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const movies = data.results.slice(0, limit);
      showMovies(movies);
    })
    .catch(() => {
      main.innerHTML = '<p style="color:red; text-align:center;">Failed to fetch movies.</p>';
    });
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview, release_date } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_URL + poster_path : 'images/no-image-available.png'}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview || 'No overview available.'}
        <p><strong>Release Date:</strong> ${release_date || 'N/A'}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

function showPeople(people) {
  main.innerHTML = '';
  people.forEach(person => {
    const { name, profile_path, known_for } = person;

    const personEl = document.createElement('div');
    personEl.classList.add('movie'); // Reuse the same styling for simplicity

    const knownForTitles = known_for
      .map(item => item.title || item.name || '')
      .filter(Boolean)
      .join(', ');

    personEl.innerHTML = `
      <img src="${profile_path ? IMG_URL + profile_path : 'images/no-image-available.png'}" alt="${name}" />
      <div class="movie-info">
        <h3>${name}</h3>
      </div>
      <div class="overview">
        <h3>Known For</h3>
        <p>${knownForTitles || 'N/A'}</p>
      </div>
    `;

    main.appendChild(personEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

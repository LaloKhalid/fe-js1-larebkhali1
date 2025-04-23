const apiKey = 'de2010f82cfd0ea2d11da20b9cb0c687';  
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=de2010f82cfd0ea2d11da20b9cb0c687&language=en-US&page=1
`;

document.addEventListener('DOMContentLoaded', () => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tvShows = data.results;
      displayTVShows(tvShows);
    })
    .catch(error => console.error('Error fetching data: ', error));
});

function displayTVShows(tvShows) {
  const tvShowsList = document.getElementById('tv-shows-list');
  tvShowsList.innerHTML = ''; // 
  tvShows.forEach(show => {
    const tvShowDiv = document.createElement('div');
    tvShowDiv.classList.add('tv-show');

    const tvShowImage = document.createElement('img');
    const imageUrl = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image+Available';
    tvShowImage.src = imageUrl;
    tvShowImage.alt = show.name;

    const tvShowInfo = document.createElement('div');
    tvShowInfo.classList.add('tv-show-info');

    const tvShowTitle = document.createElement('h2');
    tvShowTitle.textContent = show.name;

    const tvShowRating = document.createElement('p');
    tvShowRating.textContent = `Rating: ${show.vote_average} / 10`;

    tvShowInfo.appendChild(tvShowTitle);
    tvShowInfo.appendChild(tvShowRating);
    
    tvShowDiv.appendChild(tvShowImage);
    tvShowDiv.appendChild(tvShowInfo);
    
    tvShowsList.appendChild(tvShowDiv);
  });
}

const BASE_URL = 'https://vivacious-short-battery.glitch.me/movies';
const MOVIES_URL = `${BASE_URL}/movies`;
const WATCH_LATER_URL = `${BASE_URL}/watchlater`;

// Display movies
const grid = document.querySelector('#movies-grid');

const fetchMovies = async () => {
  const res = await fetch(MOVIES_URL);
  const movies = await res.json();
  grid.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <h3>${movie.title}</h3>
        <p>Likes: ${movie.likes}</p>
        <button class="like-btn" data-id="${movie.id}">Like</button>
        <button class="watch-later-btn" data-id="${movie.id}">Watch Later</button>
      </div>`
    )
    .join('');
};

grid.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains('like-btn')) {
    const movie = await (await fetch(`${MOVIES_URL}/${id}`)).json();
    await fetch(`${MOVIES_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: movie.likes + 1 }),
    });
    fetchMovies();
  }

  if (e.target.classList.contains('watch-later-btn')) {
    const movie = await (await fetch(`${MOVIES_URL}/${id}`)).json();
    await fetch(WATCH_LATER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    alert(`${movie.title} added to Watch Later`);
  }
});

fetchMovies();

const BASE_URL = 'https://vivacious-short-battery.glitch.me/movies';
const WATCH_LATER_URL = `${https://vivacious-short-battery.glitch.me}/watchlater`;

// Display Watch Later movies
const grid = document.querySelector('#watchlater-grid');

const fetchWatchLater = async () => {
  const res = await fetch(WATCH_LATER_URL);
  const movies = await res.json();
  grid.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <h3>${movie.title}</h3>
        <button class="remove-btn" data-id="${movie.id}">Remove</button>
      </div>`
    )
    .join('');
};

grid.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains('remove-btn')) {
    await fetch(`${WATCH_LATER_URL}/${id}`, { method: 'DELETE' });
    fetchWatchLater();
  }
});

fetchWatchLater();

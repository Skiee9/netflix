// Base URL for the JSON server
const BASE_URL = 'https://vivacious-short-battery.glitch.me/movies'; // Replace with your deployed JSON server URL
const MOVIES_URL = `${BASE_URL}/movies`; // Endpoint for movies

// Select the grid where movies will be displayed
const grid = document.querySelector('#movies-grid');

// Function to fetch and display movies
const fetchMovies = async () => {
  try {
    console.log('Fetching movies from:', MOVIES_URL); // Debug: Check the URL

    const res = await fetch(MOVIES_URL);

    // Log the response object
    console.log('Response object:', res);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    // Log the parsed JSON data
    console.log('Fetched data:', data);

    // Check if data is an array or an object
    const movies = Array.isArray(data) ? data : data.movies;

    // Ensure movies is an array
    if (!Array.isArray(movies)) {
      throw new Error('Fetched data is not an array or does not contain a "movies" property');
    }

    // Generate and display movie cards
    grid.innerHTML = movies
      .map(
        (movie) => `
        <div class="movie-card">
          <h3>${movie.title}</h3>
          <p>${movie.genre} (${movie.releaseYear})</p>
          <p>Likes: ${movie.likes}</p>
          <button class="like-btn" data-id="${movie.id}">Like</button>
          <button class="watch-later-btn" data-id="${movie.id}">Watch Later</button>
        </div>`
      )
      .join('');

    // Add event listeners for Like and Watch Later buttons
    setupMovieButtons();
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    grid.innerHTML = `<p>Failed to load movies. Please try again later.</p>`;
  }
};

// Function to handle Like and Watch Later button actions
const setupMovieButtons = () => {
  // Handle Like button clicks
  document.querySelectorAll('.like-btn').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const movieId = e.target.dataset.id;
      try {
        // Fetch the movie data
        const res = await fetch(`${MOVIES_URL}/${movieId}`);
        const movie = await res.json();

        // Update the likes count
        const updatedLikes = movie.likes + 1;

        // Send a PATCH request to update the movie
        await fetch(`${MOVIES_URL}/${movieId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ likes: updatedLikes }),
        });

        console.log(`Movie with ID ${movieId} liked! New likes count: ${updatedLikes}`);
        alert('Movie liked!');
        fetchMovies(); // Refresh the movie list
      } catch (error) {
        console.error('Failed to like movie:', error);
      }
    });
  });

  // Handle Watch Later button clicks
  document.querySelectorAll('.watch-later-btn').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const movieId = e.target.dataset.id;
      try {
        // Fetch the movie data
        const res = await fetch(`${MOVIES_URL}/${movieId}`);
        const movie = await res.json();

        // Add movie to Watch Later list (or handle it in a similar way)
        console.log(`Movie with ID ${movieId} added to Watch Later!`);
        alert('Movie added to Watch Later!');
      } catch (error) {
        console.error('Failed to add movie to Watch Later:', error);
      }
    });
  });
};

// Call fetchMovies on page load
fetchMovies();

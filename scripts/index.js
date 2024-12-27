const BASE_URL = 'https://vivacious-short-battery.glitch.me/movies';

// Login validation
document.querySelector('#login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if (email === 'user@gmail.com' && password === 'password') {
    alert('Login Successful!');
    window.location.href = 'movies.html';
  } else {
    alert('Invalid Credentials!');
  }
});

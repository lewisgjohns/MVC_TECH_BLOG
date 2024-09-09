// main.js

// Event listener for logout button if needed
document.querySelector('#logout').addEventListener('click', async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  });
  
//   const form = document.getElementById('myForm');
// const input = document.createElement('input');
// input.setAttribute('type', 'text');
// input.setAttribute('id', 'dynamic-input');
// input.setAttribute('name', 'dynamicInput'); // Don't forget the name attribute
// form.appendChild(input);

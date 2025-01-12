const countElement = document.getElementById('count');

fetch('https://api.countapi.xyz/hit/nipunh.github.io/nipunh')
  .then(response => response.json())
  .then(data => {
    countElement.innerText = data.value;
  })
  .catch(error => {
    console.error('Error fetching the count:', error);
});
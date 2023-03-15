const form = document.querySelector('form');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const resultsDiv = document.querySelector('#results');

document.addEventListener('keydown', (event) => {
  event.key === 'Enter' ? search() : '';
});

const search = () => {
  const searchQuery = searchInput.value.trim();
  if (searchQuery.length < 3) {
    resultsDiv.innerHTML = '<p>Необходимо ввести больше 3 символов</p>';
    return;
  }
  const apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    searchQuery,
  )}&sort=stars&order=desc`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length === 0) {
        resultsDiv.innerHTML = '<p>Ничего не найдено 🤔</p>';
      } else {
        const repositories = data.items.slice(0, 10);
        resultsDiv.innerHTML = '';
        const ul = document.createElement('ul');
        repositories.forEach((repo) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = repo.html_url;
          a.target = '_blank';
          a.textContent = repo.full_name;
          const description = document.createElement('p');
          description.textContent = repo.description;
          li.appendChild(a);
          li.appendChild(description);
          ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
      }
    })
    .catch((error) => {
      console.error(error);
      resultsDiv.innerHTML = '<p>Произошла ошибка при запросе к API Github</p>';
    });
};

form.addEventListener('submit', (event) => {});

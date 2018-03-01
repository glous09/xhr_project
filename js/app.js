
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(e){
   e.preventDefault();
   responseContainer.innerHTML = '';
   searchedForText = searchField.value;
   getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  console.log(searchedForText);
  articleRequest.open(`GET`, `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=aafb4dc059f34f31a461b8dc8ad92a6a`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError(){
  console.log('Se ha presentado un error');
}

function addNews(){
  const data = JSON.parse(this.responseText);
  const article = data.response.docs[0];
  const articleArray = data.response.docs;
  const title = article.headline.main;
  const snippet = article.snippet;
  articleArray.forEach(element => {
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = snippet;
    responseContainer.appendChild(li);
  })
}

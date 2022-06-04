
import './sass/main.scss';
import Notiflix from 'notiflix';
const axios = require('axios');



const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form')

const MY_API_KEY = '27831514-d30de37ffbcb7c53880408e02';  


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = e.currentTarget.elements.searchQuery.value;
    console.log(value);
  getUser(value);
})



async function getUser(q) {
  try {
 
    const response = await axios.get(`https://pixabay.com/api/?key=${MY_API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`);
    if (response.data.hits.length === 0) {
         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    let arr = response.data.hits;
    console.log(response.data.hits);
    makeListCountries(arr);
  } catch (error) {
    console.error(error);
  }
}

function renderCard(params) {
  
}
function makeListCountries(data) {
   const markup = makeHtmlListCard(data);
   gallery.insertAdjacentHTML('beforeend', markup); 
}
function makeHtmlListCard(data){
 return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>
        `
      ).join(""); 
}
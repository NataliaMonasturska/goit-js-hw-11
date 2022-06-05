import './css/styles.css';
import Notiflix from 'notiflix';
const axios = require('axios');
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form')
const loadMore = document.querySelector('.load-more')


const MY_API_KEY = '27831514-d30de37ffbcb7c53880408e02';  
let pageforBtn = 1;
let valueInput = '';
let totalHitsValue = '';


form.addEventListener('submit', (e) => {
  e.preventDefault();
  gallery.innerHTML = '';
  valueInput = e.currentTarget.elements.searchQuery.value;
  pageforBtn = 1;
    
  if (!loadMore.classList.contains('visually-hidden')) {
    loadMore.classList.add('visually-hidden')
  }
  getUser(valueInput).then(() => {
    Notiflix.Notify.success(`Hooray! We found ${totalHitsValue} images.`)
  })
  } 

)

async function getUser(q) {
  try {
 
    const response = await axios.get(`https://pixabay.com/api/?key=${MY_API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageforBtn}`);
    if (response.data.hits.length === 0) {
         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    let arr = response.data.hits;
    let lastPage = Math.ceil(response.data.totalHits / 40) 
    totalHitsValue = response.data.totalHits;
    console.log(lastPage);
    console.log(pageforBtn);
    // console.log(response.data.total);
    // console.log(response.data.hits);
    console.log(response.data.totalHits);
    makeListCountries(arr);
  
   
    if (response.data.total > 40) {
      loadMore.classList.remove('visually-hidden');
    
    }
    if (pageforBtn === lastPage) {
       if (!loadMore.classList.contains('visually-hidden')) {
       loadMore.classList.add('visually-hidden')
       }
     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    
     pageforBtn += 1;
  } catch (error) {
    console.error(error);
  }
}
function makeListCountries(data) {
   const markup = makeHtmlListCard(data);
   gallery.insertAdjacentHTML('beforeend', markup); 
}
function makeHtmlListCard(data){
 return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `
<div class="photo-card">
<div class="img-container"> 
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
</div>
  <div class="info">
    <p class="info-item">
       <b class="text property" >Likes</b>
      <b class="text value">${likes}</b>
    </p>
    <p class="info-item">
         <b class="text property">Views</b>
      <b class="text value">${views}</b>
    </p>
    <p class="info-item">
        <b class="text property">Comments</b>
      <b class="text value">${comments}</b>
    </p>
    <p class="info-item">
      <b class="text property">Downloads</b>
      <b class="text value">${downloads}</b>
    </p>
  </div>
</div>
        `
      ).join(""); 
}

loadMore.addEventListener('click', () => {
    getUser(valueInput );
 })
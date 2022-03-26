const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');


// NASA API
const count = 6;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  console.log('Current Array: ', page, currentArray);
  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture Of TheDay';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // SAVE
    const addToFav = document.createElement('p');
    addToFav.classList.add('clickable');
    if (page === 'favorites') {
      addToFav.textContent = 'Remove From Favorites';
      addToFav.setAttribute('onclick', `removeFavorite('${result.url}')`);
    } else {
      addToFav.textContent = 'Add to Favorites';
      addToFav.setAttribute('onclick', `saveFavorite('${result.url}')`);
    }
    // <p class="card-text">
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = result.explanation;
    // <small class="text-muted">
    const smallText = document.createElement('small');
    smallText.classList.add('text-muted');
    // <strong>3-25-2022</strong>
    const strong = document.createElement('strong');
    strong.textContent = result.date;
    // <span>Copyright Info</span>
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copySpan = document.createElement('span');
    copySpan.textContent = ` ${copyrightResult}`;
    // APPEND
    smallText.append(strong, copySpan);
    cardBody.append(cardTitle, addToFav, cardText, smallText)
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
    // console.log(card);
  });
}

function updateDOM(page) {
  // get Favs from local storage
  if (localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    // console.log('LocalStorage Favorites: \n', favorites);
  }
  imagesContainer.textContent = '';
  createDOMNodes(page);
}

// Get 6 Images From NASA API
async function getNasaPictures() {
  try {
    const res = await axios.get(apiUrl);
    const data = await res.data;
    resultsArray = data;
    updateDOM('results');
  } catch (error) {
    console.log('Whoops', error);
  }
}

// Add result to favorite
function saveFavorite(itemUrl) {
  // Loop through results array to select favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show save confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in LocalStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
    }
  });
  // console.log(favorites);
}

// Remove item from Favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in LocalStorage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
  }
  console.log('FavArray After Deleting Item\n', favorites);
}


getNasaPictures();

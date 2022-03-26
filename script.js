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

function updateDOM() {
  resultsArray.forEach((result) => {
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
    addToFav.textContent = 'Add to Favorites';
    addToFav.onclick = `saveFavorite('${result.url}')`;
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
    console.log(card);
  });
}

// Get 6 Images From NASA API
async function getNasaPictures() {
  try {
    const res = await axios.get(apiUrl);
    const data = await res.data;
    resultsArray = data;
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    console.log('Whoops', error);
  }
}

// Add result to favorite
function saveFavorite() {
  
}

getNasaPictures();

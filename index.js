const url = 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/all'
const Kanjis = []
const main = document.getElementById('main')

if (main){
  createCard(main)
  createConts(main)
}


function getData(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '333edf6b51msh4fc2df57083d96dp1be044jsna95ce001ba0e',
      'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));
}
function handleData(data) {
  var num = Math.floor(Math.random() * 1200) 
  const randomKanji = data[num]
  Kanjis.push(randomKanji)
  console.log(Kanjis)
  executeData(randomKanji)
}
function executeData(data){
  const kanjiObj = data.kanji
  const imgArr = data.kanji.strokes.images
  const kanjiImage = data.kanji.video.poster
  const examples = data.examples
  const meaning = kanjiObj.meaning.english
  const romaji = kanjiObj.onyomi.romaji
  const katakana = kanjiObj.onyomi.katakana
  addImage(kanjiImage)
  addExamples(examples)
  addMeaning(meaning, romaji, katakana)
  addButtons(Kanjis)
}

getData(url).then(handleData);

function flipCard(card){
  
  card.classList.toggle('flipped')
}
function addButtons() {

  var buttonsPlace = document.querySelector('.buttonsPlace');
  buttonsPlace.replaceChildren()
  
  const nextButton = document.createElement('div');
  nextButton.classList.add('button', 'next');
  nextButton.textContent = 'NEXT';
  nextButton.onclick = nextCard; // assign the nextCard function as the onclick handler

  buttonsPlace.appendChild(nextButton);
}

function addImage(image){
  const place = document.getElementById('kanjiImage')
  place.src = image
}
function addExamples(examples){
  const examplesPlace = document.querySelector('.examplesPlace')
  examplesPlace.replaceChildren()

  const h2 = document.createElement('h2')
  h2.innerText = "Examples"

  examplesPlace.appendChild(h2)
  for(let i in examples){
    const example = document.createElement('div')
    const par = document.createElement('p')
    const japanese = examples[i].japanese
    const meaning = examples[i].meaning.english

    example.classList.add(`example`)
    par.innerText = japanese

    example.appendChild(par)
    examplesPlace.appendChild(example)

    
     
    const showMeaning = document.createElement('button');
    showMeaning.classList.add('btn')
    showMeaning.innerText = 'Meaning';

    
    showMeaning.addEventListener('click', function() {
    
      const meaningElement = document.createElement('span');
      meaningElement.classList.add('meanEle')
      meaningElement.innerText = `"${meaning}"`;
      example.appendChild(meaningElement);

      example.removeChild(showMeaning);
    });

    example.appendChild(showMeaning);

    if (i >= 5) return;
  } 
}
function addMeaning(meaning, romaji, katakana){
  const meaningPlace = document.querySelector('#meaningPlace')
  meaningPlace.innerText = `"${meaning}"`
  const romajiPlace = document.querySelector('#romajiPlace')
  romajiPlace.innerText = `Romaji: "${romaji}"`
  const katakanaPlace = document.querySelector('#katakanaPlace')
  katakanaPlace.innerText = `Katakana: "${katakana}"`
}
function nextCard(){
  getData(url).then(handleData);
}
function createCard(root) {
  // Create card elements
  const cardPlace = document.createElement('div');
  cardPlace.classList.add('cardPlace');

  const card = document.createElement('div');
  card.classList.add('card');
  card.addEventListener('click', flipCard.bind(this, card));

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-face', 'card-front');

  const kanjiFront = document.createElement('div');
  kanjiFront.classList.add('kanji', 'front');

  const kanjiImage = document.createElement('img');
  kanjiImage.id = 'kanjiImage';

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-face', 'card-back');

  const meaningHeader = document.createElement('h2');
  meaningHeader.textContent = 'Meaning';

  const kanjiBack = document.createElement('div');
  kanjiBack.classList.add('kanji', 'back');

  const meaningPlace = document.createElement('div');
  meaningPlace.classList.add('backinfo');
  meaningPlace.id = 'meaningPlace';

  const romajiPlace = document.createElement('div');
  romajiPlace.classList.add('backinfo');
  romajiPlace.id = 'romajiPlace';

  const katakanaPlace = document.createElement('div');
  katakanaPlace.classList.add('backinfo');
  katakanaPlace.id = 'katakanaPlace';

  // Append elements to card
  cardFront.appendChild(kanjiFront);
  kanjiFront.appendChild(kanjiImage);
  cardBack.appendChild(meaningHeader);
  cardBack.appendChild(kanjiBack);
  kanjiBack.appendChild(meaningPlace);
  kanjiBack.appendChild(romajiPlace);
  kanjiBack.appendChild(katakanaPlace);

  card.appendChild(cardFront);
  card.appendChild(cardBack);

  cardPlace.appendChild(card);
  root.appendChild(cardPlace)
}

function createConts(place){
  const examples = document.createElement('div')
  examples.classList.add('examplesPlace')

  const buttons = document.createElement('div')
  buttons.classList.add('buttonsPlace')

  place.appendChild(examples)
  place.appendChild(buttons)
}

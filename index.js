const url = 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/all'
const Kanjis = []



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
function addButtons(arr) {

  const buttonsPlace = document.querySelector('.buttonsPlace');
  buttonsPlace = null
  
  const backButton = document.createElement('div');
  backButton.classList.add('button', 'back');
  backButton.textContent = 'BACK';
  backButton.onclick = backCard; // assign the backCard function as the onclick handler
  
  const nextButton = document.createElement('div');
  nextButton.classList.add('button', 'next');
  nextButton.textContent = 'NEXT';
  nextButton.onclick = nextCard; // assign the nextCard function as the onclick handler

  buttonsPlace.appendChild(backButton);
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
function backCard(){
  if (Kanjis.length < 2){
    alert('ERROR')
  }else{
    console.log(Kanjis)
  }
}
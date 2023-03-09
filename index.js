const url = 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/all'



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
  const kanjiObj = randomKanji.kanji
  const imgArr = randomKanji.kanji.strokes.images
  const kanjiImage = randomKanji.kanji.video.poster
  const examples = randomKanji.examples
  const meaning = kanjiObj.meaning.english
  const romaji = kanjiObj.onyomi.romaji
  const katakana = kanjiObj.onyomi.katakana
  console.log(randomKanji)
  addImage(kanjiImage)
  addExamples(examples)
  addMeaning(meaning, romaji, katakana)
}

getData(url).then(handleData);

function flipCard(card){
  
  card.classList.toggle('flipped')
}
function addImage(image){
  const place = document.getElementById('kanjiImage')
  place.src = image
}
function addExamples(examples){
  const examplesPlace = document.querySelector('.examplesPlace')

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
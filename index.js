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
  const kanjiImage = randomKanji.radical.image
  const examples = randomKanji.examples
  const meaning = kanjiObj.meaning
  const romaji = kanjiObj.onyomi.romaji
  const katakana = kanjiObj.onyomi.katakana
  console.log(katakana)
}

getData(url).then(handleData);

function flipCard(card){
  
  card.classList.toggle('flipped')
}
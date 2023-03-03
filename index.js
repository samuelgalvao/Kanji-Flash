const url = 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/all'


fetch(url, {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '333edf6b51msh4fc2df57083d96dp1be044jsna95ce001ba0e',
    'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

function flipCard(card){
  card.classList.toggle('flipped')
}
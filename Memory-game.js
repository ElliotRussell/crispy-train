const cardFaces = [
  "green",'green',
  'red', 'red',
  "purple",'purple',
  'yellow', 'yellow',
  "orange",'orange',
  'blue', 'blue'
]

let faceUpCards = 0
const timer = document.getElementById('timer')

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cycleId(number){
  let id;
  for(let i = 0; i < 3; i++){
    let letter = String.fromCharCode(97 + i)
    for(let j = 0; j < 4; j ++){
    id = letter + (j + 1);
    if(number == 1){
      CardFaceDown(id)}
    }
  }
}

function CardFaceDown(id){
  let currentCard = document.getElementById(id);
    if (currentCard.classList.contains('card-front')){;
    currentCard.innerHTML = '';
    currentCard.classList.remove('card-front');
    currentCard.classList.add('card-back');
    const questDes = document.createElement('div');
    questDes.classList.add('question-mark');
    questDes. textContent = '?';
    currentCard.appendChild(questDes)};
}

let card1= false
let card1Id;
let card2;
let card2Id;

async function flipCard(id){
  let currentCard = document.getElementById(id)
    if (currentCard.classList.contains('card-front')){
    currentCard.innerHTML = ''
    currentCard.classList.remove('card-front')
    currentCard.classList.add('card-back')
    const questDes = document.createElement('div')
    questDes.classList.add('question-mark')
    questDes. textContent = '?'
    currentCard.appendChild(questDes)
    if (faceUpCards != 0){
      faceUpCards --
    }

  } else if (faceUpCards >= 2) {
      return
    } else {
      faceUpCards ++
      currentCard.innerHTML = ''
      currentCard.classList.remove('card-back')
      currentCard.classList.add('card-front')
      const face = currentCard.getAttribute('data-face');
      const faceDisplay = document.createElement('div');
      faceDisplay.classList.add('face');
      faceDisplay.style.backgroundColor = face;
      //faceDisplay.textContent = face;
      currentCard.appendChild(faceDisplay);
      const img = document.createElement('div')
      img.classList.add('img')
      img. textContent = 'cat'
      faceDisplay.appendChild(img)
      console.log(card1)
      if (typeof(card1) !== 'string' || !card1){
        card1 = face
        card1Id = id
        console.log(1)
      } else {
        card2 = face
        card2Id = id
        console.log(2)
        if(card1 === card2){
          faceUpCards = faceUpCards - 2
          console.log('got here')
          card1= false
          card2 = false
        } else if (card1 !== card2) {
          card1= false
          card2 = false
         
          await pause(200)
          flipCard(card1Id)
          flipCard(card2Id)
          card1Id = false
          card2Id = false
        }
      }
      
    }
      
}

function faceCardUp(id){
  let currentCard = document.getElementById(id)
  currentCard.innerHTML = ''
      currentCard.classList.remove('card-back')
      currentCard.classList.add('card-front')
      const face = currentCard.getAttribute('data-face');
      const faceDisplay = document.createElement('div');
      faceDisplay.classList.add('face');
      faceDisplay.style.backgroundColor = face;
      //faceDisplay.textContent = face;
      currentCard.appendChild(faceDisplay);
      const img = document.createElement('div')
      img.classList.add('img')
      img. textContent = 'cat'
      faceDisplay.appendChild(img)
}

function setCardFace(id, arrayNumber) {
  let currentCard = document.getElementById(id)
  const color = cardFaces[arrayNumber]
  currentCard.setAttribute('data-face', color)
  const index = cardFaces.indexOf(color)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function shuffleCards(){
  let letter
  let id;
  let arrayNumber = 0
  shuffle(cardFaces)
  for(let i=1; i<4 ;i++){
    id = ''
    letter = String.fromCharCode(96 + i)
    for(let j=1; j<5; j++){
      id = letter + j
      setCardFace(id, arrayNumber)
      arrayNumber ++
      faceCardUp(id)
      await pause(150)
    }
  }
  let q = 3
  timer.textContent = q + 's'
  q --
  await pause(1000)
  timer.textContent = q + 's'
  q --
  await pause(1000)
  timer.textContent = q + 's'
  q--
  await pause(1000)
  timer.textContent = '0s'
  await pause(1000)
  console.log('flip')
  cycleId(1)
    timer.textContent = 'Go!'
  await pause(4000)
   timer.textContent = ''
}

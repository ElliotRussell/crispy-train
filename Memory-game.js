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
const missesCounter = document.getElementById('score')

  function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function animateCard(id){
    let currentCard = document.getElementById(id);
    await pause(1000)
    console.log('test' + id)
    currentCard.classList.toggle('card-flip')
  }

  async function cycleId(number, code){
    let id;
    for(let i = 0; i < 3; i++){
      let letter = String.fromCharCode(97 + i)
      for(let j = 0; j < 4; j ++){
      id = letter + (j + 1);
      let currentCard = document.getElementById(id);
      if(number == 1){
        if(code == 1){
          currentCard.classList.toggle('card-flip')
          animateCard(id)
          CardFaceDown(id)
        }
      if(number == 2){
        currentCard.classList.add('card-flip')
        CardFaceUp(id)
      }
      } else if (number == 2){
        CardFaceDown(id)
      }
      }
    }
  }


  function CardFaceDown(id){
    let currentCard = document.getElementById(id);
    if (currentCard.classList.contains('card-flip')){;
      currentCard.classList.remove("card-flip")
    };
      return 
  }

    function faceCardUp(id){
    let currentCard = document.getElementById(id)
    currentCard.classList.add("card-flip")
    const face = currentCard.getAttribute('data-face');
    const faceId = id + 'a'
    const displayFace = document.getElementById(faceId)
    displayFace.style.backgroundColor = face;
    const imgId = id + 'b'
    const img = document.getElementById(imgId)
    img.classList.add('img')
    img. textContent = 'Cat'
    
    return face
}

let card1= false
let card1Id;
let card2;
let card2Id;
let score = 0
let pairsFound = 0

  async function flipCard(id){
    let face;
    let currentCard = document.getElementById(id)
      if (currentCard.classList.contains('card-flip')){
        currentCard.classList.remove('card-flip')
      if (faceUpCards != 0){
        faceUpCards --
        return
      }
      if (faceUpCards >= 2) return;
      } else {
        faceUpCards ++
        face = faceCardUp(id)
    
        if (typeof(card1) !== 'string' || !card1){
          card1 = face
          card1Id = id
        } else {
            card2 = face
            card2Id = id
            if(card1 === card2){
              faceUpCards -= 2
              card1= false
              card2 = false
              pairsFound ++
            } else if (card1 !== card2) {
                card1= false
                card2 = false
                score ++
                missesCounter.textContent = 'Misses: ' + score
                await pause(1000)
                CardFaceDown(card1Id)
                CardFaceDown(card2Id)
            }
        }
        
      }
      if(pairsFound == 6){
        const winMessage = document.createElement('div')
        winMessage.classList.add('Win')
        document.body.appendChild(winMessage)
        winMessage.textContent = '!'
        cycleId(1, 1)
      }  
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
    await cycleId(1, 2)
    shuffle(cardFaces)
    let letter
    let id;
    let arrayNumber = 0
    score = 0

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
    for (let q = 3; q > 0; q --){
      timer.textContent = 'Timer: ' + q + 's'
      await pause(1000)
    }
    cycleId(2, 0)
      timer.textContent = 'Go!'
    await pause(4000)
    timer.textContent = 'Timer'
  }

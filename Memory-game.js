const cardFaces = [
  "green",'green',
  'red', 'red',
  "purple",'purple',
  'yellow', 'yellow',
  "orange",'orange',
  'blue', 'blue'
]
//localStorage.setItem('lowestScore', JSON.stringify(null))
let faceUpCards = 0
const timer = document.getElementById('timer')
const missesCounter = document.getElementById('score')
const lowScore = document.getElementById('low-score')
let lowestScore = JSON.parse(localStorage.getItem('lowestScore')) || null
lowScore.textContent = lowestScore ? `Best: ${lowestScore}` : 'Best: N/A'

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
    let cards = document.querySelectorAll('.card');
    
    for (let card of cards) {
        let id = card.id;
      if(number == 1){
        if(code == 1){
          currentCard.classList.toggle('card-flip')
          animateCard(id)
          CardFaceDown(id)
        }
      if(code == 2){
        currentCard.classList.add('card-flip')
        animateCard(id)
        faceCardUp(id)
      }
      } else if (number == 2){
        if (code == 1){
          CardFaceDown(id)
        }else if (code == 2){
          faceCardUp(id)
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

async function unlockCards(){
  await pause(600)
  lock = false
  return
}

let card1= false
let card1Id;
let card2;
let card2Id;
let score = 0
let pairsFound = 0
let lock = false

  async function flipCard(id){
    if (lock){
      return
    }
    lock = true
    let face;
    let currentCard = document.getElementById(id)
      if (currentCard.classList.contains('card-flip')){
        CardFaceDown(id);
      if (faceUpCards > 0){
        faceUpCards --
        lock = false
        return
      }
      if (faceUpCards >= 2) {
        lock = false
        return;}
      } else {
        faceUpCards ++
        face = faceCardUp(id)
    
        if (!card1){
          card1 = face
          card1Id = id
          lock = false
        } else {
            card2 = face
            card2Id = id
            if(card1 === card2){
              faceUpCards -= 2
              card1= false
              card2 = false
              pairsFound ++
              lock = false
            } else if (card1 !== card2) {
                
                await pause(800)
                CardFaceDown(card1Id)
                CardFaceDown(card2Id)
                lock = false
                card1= false
                card2 = false
                score ++
                missesCounter.textContent = 'Misses: ' + score
                
            }
        }
        
      }
      if(pairsFound == 6){
        //if (!gameRunning){return}
        const winMessage = document.createElement('div')
        winMessage.classList.add('Win')
        document.body.appendChild(winMessage)
        winMessage.textContent = clock
        
        await resetGame()
        winMessage.remove()

        setNewLowScore()
      } 
    } 

  async function resetGame (){
    gameRunning = false
    pairsFound = 0
    score = 0
    await pause(800)
    cycleId (2,1)
  }

  function setNewLowScore(){
    if ((clock < lowestScore && lowestScore) || !lowestScore){
      console.log('new score')
      localStorage.setItem('lowestScore', JSON.stringify(clock))
      setTimeout(0)
      //lowScore.textContent = `Best: ${lowestScore}`
      //while (lowScore.textContent != `Best: ${lowestScore}` && clock){
      //  console.log('again')
       // lowScore.textContent = `Best: ${lowestScore}`
     // }
    } else console.log('no new score')
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

let gameRunning = false
let clock = null
  async function shuffleCards(){
    clock = 0
    gameRunning = true
    pairsFound = 0
    await cycleId(2, 1)
    shuffle(cardFaces)
    let letter
    let id;
    let arrayNumber = 0
    score = 0
    pairsFound = 0
    missesCounter.textContent = 'Misses: ' + score

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
    cycleId(2, 1)
    timer.textContent = 'Go!'

    clock = 1
    while(pairsFound !== 6 && gameRunning){
      await pause(1000)
      timer.textContent = 'Timer ' + clock
      if(gameRunning){
        clock++
      }
      else break
    }
  }


// create word list
const wordList = [
    'about', 'above', 'apple', 'beach', 'bread', 'brush', 'build', 'chair', 'charm', 'chess',
    'clean', 'clock', 'cloud', 'color', 'craft', 'dance', 'dream', 'eagle', 'earth', 'empty',
    'entry', 'event', 'field', 'flame', 'floor', 'focus', 'found', 'fresh', 'front', 'frost',
    'fruit', 'giant', 'glass', 'grace', 'grape', 'green', 'guard', 'heart', 'house', 'human',
    'image', 'index', 'input', 'issue', 'joker', 'juice', 'karma', 'knife', 'laser', 'light',
    'limit', 'magic', 'mango', 'match', 'metal', 'model', 'mouse', 'music', 'ocean', 'offer',
    'order', 'paint', 'peach', 'peace', 'piano', 'plane', 'plant', 'point', 'power', 'press',
    'print', 'prize', 'queen', 'quiet', 'radio', 'raise', 'reach', 'ready', 'river', 'robot',
    'rocky', 'ruler', 'scene', 'scope', 'score', 'shape', 'sharp', 'shift', 'shore', 'skill',
    'slide', 'smart', 'smile', 'sound', 'space', 'spice', 'spike', 'stone', 'style', 'sugar',
    'acrid', 'fjord', 'glyph', 'haiku', 'nymph', 'quark', 'scion', 'vapid', 'weary', 'yacht',
    'jazzy', 'kayak', 'odder', 'rarer', 'quirk', 'squib', 'twang', 'vixen', 'waltz', 'zephyr'
    ]
      wordLetters = []
      const tileSatus = []
      let wordle;
     
    //function to choose word
    function getWord() {
     const wordleNum = Math.floor(Math.random() * 121);
      wordle = wordList[wordleNum]
      console.log(wordle)
      for (let i = 0; i < 5; i++){
        wordLetters.push(wordle[i].toUpperCase())
      }
    }
    let row = ''
    let number = ''
    
    
    
    
    //function to find id number
    function findId (){
    row = 'a'
    number = 0
    return [row, number];
    }
    
    
   
    //function add letter to box
    function addLetter(letter) {
      if(letter){
        if(number != 5){
         number ++
         const id = row + number
         const tile = document.getElementById(id)
        tile.textContent = letter
        tile.classList.remove('tile')
        tile.classList.add('tile-filled')
        tileSatus.push(letter)}
        console.log(tileSatus)
    } else {
       if (number != 0) {const id = row + number
        const tile = document.getElementById(id)
        tile.textContent = letter
        tile.classList.remove('tile-filled')
        tile.classList.add('tile')
        tileSatus.pop()
        number --}
        console.log('pop')
    }
    if (tileSatus.length != number)
      for(let i=0; i<5; i++){
        tileSatus.pop()
        const id = row + i+1
        const tile = document.getElementById(id)
        tile.textContent = ''
        console.log('recalibration')
    }
     } 
    
    
    let greenCount = 0
    let greenLetters = []
    let yellowLetters = []
    let grayLetters = []
    let letterColor = []


    function pause(ms) {

        return new Promise((resolve) => setTimeout(resolve, ms));
      }

    async function addTileFlip(tiles, tileAdd){
      tiles.classList.add('tileFlip')
      await pause(250);
      tiles.classList.add(tileAdd)
      tiles.classList.remove('tile')
    }
    //function to check if letter is in the right spot
    async function checkWord (currentRow){
      
      greenCount = 0
    for(let i = 0; i <5; i++){
      const testV = tileSatus[i]
      console.log('TS ' + testV)
      if (tileSatus[i] === wordLetters[i]) {
        //change that tile to green
        id = currentRow + (i + 1)
      const tiles = document.querySelector(`#${id}`)
        addTileFlip(tiles, 'tile-green')
        if(!letterColor.includes(tileSatus[i])){
          if(yellowLetters.includes(tileSatus[i])) {
           const index = yellowLetters.indexOf(tileSatus[i])
            if(index > -1) {yellowLetters.splice(index, 1);}}
         greenLetters.push(tileSatus[i])
         if(!letterColor.includes(tileSatus[i])){
          letterColor.push(tileSatus[i])}
        } //else {
         // letterColor.push(tileSatus[i])
        //}
        greenCount ++
       
    } else if (wordLetters.indexOf(tileSatus[i]) != -1){
      id = currentRow + (i + 1)
      const tiles = document.querySelector(`#${id}`)
      addTileFlip(tiles, 'tile-yellow')
      if(yellowLetters.indexOf(tileSatus[i]) == -1){
        if(greenLetters.indexOf(tileSatus[i]) == -1)
        yellowLetters.push(tileSatus[i])}
    }  //else check if yellow or gray  
    else {
      id = currentRow + (i + 1)
      const tiles = document.querySelector(`#${id}`)
      addTileFlip(tiles, 'tile-gray')
      if(grayLetters.indexOf(tileSatus[i]) == -1)
      {grayLetters.push(tileSatus[i])}
    }
    
    await pause(350

    );
    console.log(i)
    }
  
    return greenCount
    }
    //function to check if letter is in wrong spot but present
    //remeber to add a lighter color background to incorect letters in css
    //Function to check if all boxes are filled (use object? true/false for filled)
    function ifWord () {
      if (tileSatus.length === 5){
         //Function to sumbit guess & and get clues & change colum to next colum
      }
    }
    
    
    //function to check letter color
    function checkLetterColor () {
    greenLetters.forEach((letter) => {
      console.log(letter)
     const key1 = document.querySelector(`#${letter}`)
     key1.classList.add('key-green')
     key1.classList.remove('key')
     key1.classList.remove('key-yellow')
     
     const indexY = yellowLetters.indexOf(letter)
     if (indexY != -1) {
      yellowLetters.splice(indexY, 1);
      console.log(yellowLetters)
    }
    
    
     const indexGa = grayLetters.indexOf(letter)
     if (indexGa > -1) {
      grayLettersLetters.splice(indexGa, 1);
    }
    })
    
    
    yellowLetters.forEach((letter) => {
      console.log(letter)
     const key1 = document.querySelector(`#${letter}`)
     key1.classList.add('key-yellow')
     key1.classList.remove('key')
    
    
     key1.classList.remove('key-gray')
    
    
    })
    
    
    grayLetters.forEach((letter) => {
      console.log('no' + letter)
     const key1 = document.querySelector(`#${letter}`)
     key1.classList.add('key-gray')
     key1.classList.remove('key')
    
    
    })
    }
    
    
    //function to change keboard letter color
    
    
    
    
    
    
    //function for win
    function win() {
      alert('congragulations! the word was: ' + wordle)
    }
    //function for loss
    function loss(){
      alert('You loose the word was: ' + wordle)
    }
    
    
    //last row reveals answer if wrong
    function revealAnswer(){
      if (row === 'g') {
        setTimeout(() => {
          if (greenCount === 5) {
            win();
          } else {
            loss();
          }
        }, 200);
      } else if (greenCount === 5) {
        setTimeout(() => {
          win();
        }, 200);
      }
    }
    
    
    //event listener to detect letter keypresses and call functions
    let cooldownActive = false;
    const cooldownDuration = 50;
    
    
    document.addEventListener('keydown', function(event) {
      if(cooldownActive){
        return
      }
      if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
        cooldownActive = true;
        setTimeout(() => {
          cooldownActive = false;
        }, cooldownDuration);
       addLetter(event.key.toUpperCase())
    
    
      } else if (event.key === 'Backspace') {
        cooldownActive = true;
        setTimeout(() => {
          cooldownActive = false;
        }, cooldownDuration + 20);
          addLetter()
    } else if (event.key === 'Enter') {
      cooldownActive = true;
        setTimeout(() => {
          cooldownActive = false;
        }, cooldownDuration +200);
        console.log(tileSatus)
      if (tileSatus.length === 5) {
        checkWord(row).then(() => {
            greenCount = greenCount;
            checkLetterColor ()
            row = String.fromCharCode(row.charCodeAt(0) + 1);
            number = 0;
            for (let i = 0; i < 5; i++) {
              console.log(tileSatus)
              tileSatus.pop();
             
            }
          revealAnswer()
          });
        
      }
    }
    })
    
function enter(){
  cooldownActive = true;
  setTimeout(() => {
    cooldownActive = false;
  }, cooldownDuration +200);
  console.log(tileSatus)
if (tileSatus.length === 5) {
  checkWord(row).then(() => {
      greenCount = greenCount;
      checkLetterColor ()
      row = String.fromCharCode(row.charCodeAt(0) + 1);
      number = 0;
      for (let i = 0; i < 5; i++) {
        console.log(tileSatus)
        tileSatus.pop();
       
      }
    revealAnswer()
    });
  
}
}
    
    
    
    
    
    
    
    
    getWord()
    findId()
    
    
    
    
    
    
    
    
    
    
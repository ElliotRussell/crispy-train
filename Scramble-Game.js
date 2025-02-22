const wordLists = {
  a5: [
    "apple",
    "beach",
    "candy",
    "dream",
    "eagle",
    "flame",
    "glory",
    "heart",
    "ivory",
    "jolly"
  ],
  a6: [
    "absurd",
    "bright",
    "candid",
    "divine",
    "evolve",
    "fluent",
    "galaxy",
    "honest",
    "impact",
    "jungle"
  ],
  a7: [
    "ability",
    "balance",
    "capture",
    "dynamic",
    "elegant",
    "freedom",
    "gravity",
    "harmony",
    "insight",
    "justice"
  ],
  a8: [
    "absolute",
    "building",
    "complete",
    "designed",
    "elephant",
    "generate",
    "hospital",
    "inspired",
    "jubilant",
    "keyboard"
  ],
  a9: [
    "adventure",
    "beautiful",
    "challenge",
    "discovery",
    "efficient",
    "fantastic",
    "happiness",
    "important",
    "junctions",
    "knowledge"
  ],
  a10: [
    "background",
    "dictionary",
    "generation",
    "impression",
    "journalism",
    "narratives",
    "playground",
    "questioned",
    "remarkable",
    "streamline"
  ]
};
const word = document.getElementById('Word');
const input = document.getElementById('guess')
const lastWord = document.getElementById('lastWord')
const hintDisplay = document.getElementById('hint-display')
const score = document.querySelector('.score')
const wordLength = document.querySelector("#string-length-title")
const wordSlider = document.getElementById("string-length-slider")
const settingsMenu = document.getElementById('settings-menu')
const page = document.querySelector('.page')
let settingsToggle = false
let hintEnabled = true
const enableHintButton = document.querySelector('#enable-hint-button')
const guess = document.getElementById("guess")
let wordWord;
const keyboard = document.querySelector('.keyboard')

document.addEventListener('DOMContentLoaded', function() {
  return
})

wordSlider.oninput = function() {
  wordLength.textContent =  `Word Length: ${this.value}`;
  getNewWord()
}

function addLetter(letter){
  if (letter == ''){
    guess.value = guess.value.slice(0, -1)
  } else
  guess.value += letter
}

document.addEventListener("keydown", function(event){
if(event.key == "Enter"){
  submitWord()
}

if(event.key.length === 1 && event.key.match(/[a-zA-Z]/)){
  guess.value = guess.value + event.key
}

if(event.key == "Backspace"){
  guess.value = guess.value.slice(0, -1)
}

if(event.key == "Shift"){
  hint()
}
})


function shuffle(array, array2) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    if(array == array2){
      i = array.length - 1
    }
  }
}

function getNewWord(){
const wordSliderValue = 'a' + wordSlider.value
const wordList = wordLists[wordSliderValue]

hintDisplay.value = ''
wordWord = wordList[Math.floor(Math.random() *10)];
const wordLetters = wordWord.split("");
const wordShuffle = shuffle(wordLetters, wordWord);
word.innerText = wordLetters.join("");
}

function compareinput(input){
  if(input === wordWord){
    score.value = Number(score.value) + 1;
    document.querySelector('#submit').classList.add('yay');
    setTimeout(function(){
      document.querySelector('#submit').classList.remove('yay');
    },1000)

  } else {
    score.value = 0
    document.querySelector('#submit').classList.add('aww');
    setTimeout(function(){
      document.querySelector('#submit').classList.remove('aww');
    },1000)
  
  }
}

let hintLetters = 0
function hint(){
  if(!hintEnabled){return}
  const hintLetter = wordWord[hintLetters]
  hintLetters ++
  hintDisplay.value = hintDisplay.value + hintLetter.toUpperCase()
}

function submitWord() {
 compareinput(input.value)
 input.value = ""
 hintDisplay.value = null
 lastWord.value = wordWord
 hintLetters = 0
 getNewWord();
}

getNewWord();
toggleSettings()

function addSettingsMenu(){

  const deviceWidth = window.innerWidth;
  if(deviceWidth > 769)
  {page.prepend(settingsMenu)}
  else {
    page.insertBefore(settingsMenu, keyboard);
  }


}

function toggleSettings(){

if(settingsToggle){
  settingsToggle = false
} else {settingsToggle = true}

  if(settingsToggle){
page.removeChild(settingsMenu)
  } else {
addSettingsMenu()
  }
}

function toggleHint(){
  if(hintEnabled){
    hintEnabled = false
    enableHintButton.textContent = 'Hints Disabled'
  } else {
    hintEnabled = true
    enableHintButton.textContent = 'Hints Enabled'
  }
}

function mobile(){
  const deviceWidth = window.innerWidth;
  if(deviceWidth > 769){
    guess.setAttribute('readonly', true);
    keyboard.remove()
  } else {
    guess.setAttribute('readonly', true);
  }
}
mobile()
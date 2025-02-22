const wordLists = {
  a5: [
    "apple", "beach", "candy", "dream", "eagle", "flame", "glory", "heart", "ivory", "jolly",
    "kneel", "lunar", "mirth", "noble", "ocean", "prism", "quilt", "rider", "swift", "trust",
    "valve", "whale", "xenon", "yield", "zebra", "blaze", "charm", "daisy", "ember", "frost",
    "grace", "haste", "inbox", "jumpy", "karma", "latch", "moody", "nifty", "orbit", "piano",
    "quirk", "raven", "shiny", "tulip", "urban", "vivid", "witty", "xerox", "youth", "zesty"
  ],
  a6: [
    "absurd", "bright", "candid", "divine", "evolve", "fluent", "galaxy", "honest", "impact", "jungle",
    "kettle", "luster", "magnet", "nectar", "oracle", "placid", "quirky", "ripple", "serene", "tundra",
    "upbeat", "velvet", "wisdom", "xenial", "yellow", "zephyr", "abacus", "bishop", "carpet", "decent",
    "effort", "famous", "gentle", "humble", "injury", "jigsaw", "kitten", "legend", "marble", "notion",
    "option", "pastel", "quaint", "rescue", "sizzle", "timber", "useful", "violet", "wander", "zenith"
  ],
  a7: [
    "ability", "balance", "capture", "dynamic", "elegant", "freedom", "gravity", "harmony", "insight", "justice",
    "kinetic", "lantern", "midnight", "natural", "outlook", "passion", "quality", "respect", "splendid", "trouble",
    "upright", "venture", "whistle", "xylitol", "yawning", "zealous", "breathe", "channel", "delight", "exhibit",
    "fortune", "glisten", "hopeful", "impress", "journal", "kingdom", "lullaby", "miracle", "network", "observe",
    "pursuit", "quarter", "reflect", "shelter", "triumph", "uncover", "victory", "worship", "yogurt", "zipping"
  ],
  a8: [
    "absolute", "building", "complete", "designed", "elephant", "generate", "hospital", "inspired", "jubilant", "keyboard",
    "luminous", "mountain", "navigate", "observed", "peaceful", "question", "resonate", "sapphire", "together", "umbrella",
    "vacation", "whimsical", "xylophone", "yearning", "zeppelin", "abundant", "breathed", "charming", "delicate", "educated",
    "festival", "gracious", "humorous", "illusion", "joyfully", "kinetics", "landmark", "momentum", "notebook", "opposite",
    "paradise", "quizzing", "radiance", "sunshine", "tropical", "uplifted", "victoria", "waterway", "yesterday", "zookeeper"
  ],
  a9: [
    "adventure", "beautiful", "challenge", "discovery", "efficient", "fantastic", "happiness", "important", "junctions", "knowledge",
    "landscape", "marvelous", "notorious", "overcomes", "preserved", "quadrants", "radiation", "symphonic", "treasured", "uplifting",
    "vibrating", "wonderful", "xenophile", "youngster", "zeppelins", "astronaut", "blueprint", "celebrate", "delighted", "enlighten",
    "fisherman", "gentleman", "hilarious", "invisible", "judgement", "kangaroos", "librarian", "moonlight", "narrative", "optimists",
    "paralyzed", "questioned", "rejoicing", "sensitive", "telegraph", "universal", "volunteer", "whirlwind", "xylophone", "zodiacal"
  ],
  a10: [
    "background", "dictionary", "generation", "impression", "journalism", "narratives", "playground", "questioned", "remarkable", "streamline",
    "television", "understand", "victorious", "wonderland", "xenophobic", "yellowtail", "zigzagging", "appreciate", "benevolent", "chivalrous",
    "dynamiting", "everlasting", "fascinated", "glimmering", "hospitable", "invincible", "jubilation", "knowledgeable", "lumberjack", "marvelous",
    "negotiable", "observance", "paranormal", "quintuplet", "revolution", "spectacular", "trustworthy", "unraveling", "volatility", "watermelon",
    "xenophobic", "yachtsman", "zealously", "achievement", "basketball", "celebrated", "declaration", "earthquake", "friendship", "generation"
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
wordWord = wordList[Math.floor(Math.random() *50)];
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
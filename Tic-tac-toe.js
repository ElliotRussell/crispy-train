let marker = "O"
const toMove = document.querySelector('#to-move')
const streak = document.querySelector('#streak')
let score = 0
toMove.textContent = marker + "'s move"
streak.textContent = "Streak: " + score
let boardO = []
let boardX = []
let optionsLeft = [1,2,3,4,5,6,7,8,9]
let difficulty = 'Easy'
let currentBoard;
//const difficultysArray = ['Easy', 'Medium' , 'Hard', 'PvP' ]

function getDifficulty(){
    switch (difficulty){
        case 'Easy':
            difficulty = 'Medium'
        break
        case 'Medium':
            difficulty = 'Hard'
        break
        case 'Hard':
            difficulty = 'PvP'
        break
        case 'PvP':
            difficulty = 'Easy'
        break
        default:
            alert('difficulty not found. Cannot switch.')
    }
    const difficultyButton = document.querySelector('#difficulty')
    difficultyButton.textContent = difficulty
    getNewGame()
}

function switchsides(){
    marker == "O" ? marker = 'X' : marker = "O"
    if(marker == 'X' && difficulty !== 'PvP'){
        switch(difficulty){
            case 'Easy':
                 easyAiMove(optionsLeft)
            break;
            case 'Medium':
                mediumAi(optionsLeft)
            break;
            case 'Hard':
                hardAi()
                break;
            default:
                alert('difficulty not found. Ai cannot move')

        }
}
}
function getNewGame(){
    console.clear()
    marker = 'O'
    toMove.textContent = marker + "'s move"
    streak.textContent = "Streak: " + score
    boardO = []
    boardX = []
    optionsLeft = [1,2,3,4,5,6,7,8,9]
    //difficulty = 'PvE'
    for (let i = 1; i < 10; i++){
        const currenTile = document.getElementById(i)
        currenTile.children[0].textContent = ''
        currenTile.classList.remove('tile-win')
        currenTile.classList.add('tile')
    }
}

function markTile(id){
    if (!optionsLeft.includes(id)) {return}
    let index = id - 1

    const currenTile = document.getElementById(id)
    currenTile.children[0].textContent = marker
    let array;
    if (marker == 'O'){
        optionsLeft.splice(index, 1, false)
        array = insertInOrder(boardO, id)
        currentBoard = 'O'
    } else {
        optionsLeft.splice(index, 1, false)
        array = insertInOrder(boardX, id)
        currentBoard = 'X' 
    }
    const passedNumbers = checkWin(array)
    if (passedNumbers){
        score = marker == "O" ? score + 1: 0
        streak.textContent = "Streak: " + score
        console.log('score ' + score)
        console.log('marker ' + marker)
        console.log(passedNumbers)
        const tile0 = document.getElementById(passedNumbers[0])
        tile0.classList.add('tile-win')
        tile0.classList.remove('tile')
        const tile1 = document.getElementById(passedNumbers[1])
        tile1.classList.add('tile-win')
        tile1.classList.remove('tile')
        const tile2 = document.getElementById(passedNumbers[2])
        tile2.classList.add('tile-win')
        tile2.classList.remove('tile')
        return
    }
    console.log(optionsLeft)
    if (!optionsLeft.some(element => typeof element === 'number')) {
        toMove.textContent = 'Tie Game!'
        console.log('pre cat');
        return
    }
    marker == "O" ? marker = 'X' : marker = "O"
    toMove.textContent = marker + "'s move"
    if(marker == 'X' && difficulty !== 'PvP'){
        switch(difficulty){
            case 'Easy':
                 easyAiMove(optionsLeft)
            break;
            case 'Medium':
                mediumAi(optionsLeft)
            break;
            case 'Hard':
                hardAi()
                break;
            default:
                alert('difficulty not found. Ai cannot move')

        }
}
}

function hardAi(){
    let nextMove;
    for (let i = 0; i < 9; i++){
        let value = i
        if(optionsLeft[value]){
          nextMove = AiWin(optionsLeft, optionsLeft[value], 'O')
        }
        if (nextMove) {markTile(nextMove); break}
    }
    if (nextMove) return
    mediumAi(optionsLeft)
}

function mediumAi(optionsLeft){
    const randomNumber = Math.random()
    if (randomNumber > 0.75) {
        console.log('cheeky bugger')
        hardAi()
        return
        }
    let nextMove;
    for (let i = 0; i < 9; i++){
        let value = i
        if(optionsLeft[value]){
          nextMove = AiWin(optionsLeft, optionsLeft[value], 'X')
        }
        if (nextMove) {markTile(nextMove); break}
    }
    if (nextMove) return
    easyAiMove(optionsLeft)
}

function AiWin(optionsLeft, addedMove, lookAtBoard){
    let newarray;
    newarray = (lookAtBoard == "X") ? [...boardX]: [...boardO]
    insertInOrder(newarray, addedMove)
    const win = checkWin(newarray)
    if(win){
        return addedMove
    } else {
        return
       }
    /*
    let winningBoards = [
        [1,2,3],[4,5,6],[7,8,9],
        [1,4,7],[2,5,8],[3,6,9],
        [1,5,9],[3,5,7]
]
let newArray
*/
}

function easyAiMove(optionsLeft){
    let value
    value = Math.floor(Math.random()*(optionsLeft.length))
    while (!optionsLeft[value]){
        value = Math.floor(Math.random()*(optionsLeft.length))
        if (!optionsLeft.some(element => typeof element === 'number')) {
            console.log('cat')
            break
        }
    }
    let id = optionsLeft[value]
    markTile(id)
}

function insertInOrder(array, number) {
    let index = 0;
    while (index < array.length && array[index] < number) {
      index++;
    }
    array.splice(index, 0, number);
    return array;
  }


//check if contains 1,2,3,4,7
    //check if 1 slope match win con
        //check next slope
    //return to next winCon
        //if slope is less than win condition, add them till >= win con
    //check other win conditions
//if 3 dont mach, check next number

function checkWin(array){
    if(array.length < 3){
        return}
    let foundWinCon = false
    let winCons = [1,2,3,4,7]
    let passedNumbers
    let windex = 0

    while(!foundWinCon && windex < winCons.length){
        let checkFor = winCons[windex]
        if(array.includes(checkFor)){
            console.log('step 1 passes')
            passedNumbers = matchSlopes(checkFor, array)
        }; 
        if (passedNumbers){
            foundWinCon =true
            break
        } else {

        }
        windex ++
    }
    return passedNumbers
}

function matchSlopes(condition, array){
    let foundSlope = false
    let targetSlopes = [1, 3, 4]
    let passedNumbers
    let slopeIndex = 0
    while(!foundSlope && slopeIndex < targetSlopes.length){
       slopeIndex = (condition === 2 || condition === 3) && (slopeIndex === 0) ? 1: slopeIndex
       console.log(slopeIndex)
        passedNumbers = cycleSlopes(targetSlopes[slopeIndex], condition, array)
        if (passedNumbers) {
            foundSlope = true
            break
        }
        if (condition === 1 || condition === 2 || condition === 3){
            slopeIndex++
        }
        else {
            break
        }
    }
    if(condition === 3 && !passedNumbers){
        passedNumbers = cycleSlopes(2, condition, array)
    }
    return passedNumbers
}

function cycleSlopes(targetSlope, condition, array){
    let passedNumbers = []
    if (array.includes(condition + targetSlope)){
        if (array.includes(condition + (2 * targetSlope))){
            passedNumbers.push(condition, condition + targetSlope, condition + (2 * targetSlope))
            console.log('found nummbres')
            return passedNumbers
        }
    }
    passedNumbers = []
    return null
}
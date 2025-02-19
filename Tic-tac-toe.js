let marker = "O"
const toMove = document.querySelector('#to-move')
toMove.textContent = marker + "'s move"
const boardO = []
const boardX = []
const optionsLeft = [1,2,3,4,5,6,7,8,9]

function markTile(id){
    console.log(id)
    let index = id - 1

    const currenTile = document.getElementById(id)
    currenTile.children[0].textContent = marker
    let array;
    if (marker == 'O'){
        array = insertInOrder(boardO, id)
        optionsLeft.splice(index, 1, false)
        console.log('O')
    } else {
        array = insertInOrder(boardX, id) 
        optionsLeft.splice(index, 1, false)
        console.log('X')
        console.log(optionsLeft)
    }
    const passedNumbers = checkWin(array)
    if (passedNumbers){
        console.log(passedNumbers)
        const tile0 = document.getElementById(passedNumbers[0])
        console.log(tile0)
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
    marker == "O" ? marker = 'X' : marker = "O"
    toMove.textContent = marker + "'s move"
    if(marker == 'X'){
    aiMove(optionsLeft)
}
}

function aiMove(optionsLeft){
    let value
    value = Math.floor(Math.random()*(optionsLeft.length))
    while (!optionsLeft[value]){
        value = Math.floor(Math.random()*(optionsLeft.length))
    }
    console.log('option left: ' + optionsLeft.length)
    let id = optionsLeft[value]
    markTile(id)
}

function insertInOrder(array, number) {
    let index = 0;
    while (index < array.length && array[index] < number) {
      index++;
    }
    array.splice(index, 0, number);
    console.log('option left: ' + array)
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
        console.log('loop1 ' + windex)
        console.log('checkFor' + checkFor)
        if(array.includes(checkFor)){
            console.log('step 1 passes')
            passedNumbers = matchSlopes(checkFor, array)
        }; 
        if (passedNumbers){
            foundWinCon =true
            break
        } else {
            console.log('step 1 fails')
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
    console.log('mission failed')
    return null
}


/* 
    let slope1 = array[1] - array[0]
    let slope2 = array[2] - array[1]
    let slope3 = array[3] - array[2]
    let slope4 = array[4] - array[3]
    let slope5 = array[5] - array[4]
    for(let i=1; i < 6; i++){
        let currentSlope = 'slope' + i
        let nextSlope = 'slope' + (i + 1)
        let OtherNextSlope = 'slope' + (i + 2)
        if(currentSlope == targetSlope){
            //repeat with next
        } else if ((nextSlope + currentSlope) = targetSlope){

        } else if
    }




 if(array.lenght() >= 3){
        let slope1 = array[1] - array[0]
        let slope2 = array[2] - array[1]
        let slope3 = array[3] - array[2]
        let slope4 = array[4] - array[3]
        let slope5 = array[5] - array[4]
       switch(1 || 3 || 4){
        case slope1
       }


    }
*/

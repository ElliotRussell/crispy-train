let marker = "O"
const toMove = document.querySelector('#to-move')
toMove.textContent = marker + "'s move"

function markTile(id){
    const currenTile = document.getElementById(id)
    currenTile.children[0].textContent = marker
    marker == "O" ? marker = 'X' : marker = "O"
    toMove.textContent = marker + "'s move"
}
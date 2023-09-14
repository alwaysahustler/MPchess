//There are few bugs in my programme and the game logic is incomplete. When I will get time I will finish it.
const gameboard=document.querySelector("#gameboard")
const playerdisplay=document.querySelector("#player")
const infodisplay=document.querySelector("#info-display")
const width=8
let playergo='black'
playerdisplay.textContent='black'

const startpieces=[
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    ' ',' ',' ',' ',' ',' ',' ',' ',
    ' ',' ',' ',' ',' ',' ',' ',' ',
    ' ',' ',' ',' ',' ',' ',' ',' ',
    ' ',' ',' ',' ',' ',' ',' ',' ',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,queen,king,bishop,knight,rook,
]

function createBoard() {
    startpieces.forEach((startpiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startpiece;
        if (startpiece !== ' ') {
            square.firstChild && square.firstChild.setAttribute('draggable', true);
        }
        const row = Math.floor(i / 8); // Calculate row using integer division
        if (row % 2 ===0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown');
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige');
        }
        if(i<=15){
            square.firstChild.firstChild.classList.add('black')
        }
        if(i>=48){
            square.firstChild.firstChild.classList.add('white')
        }
        square.setAttribute('square-id', i); //  attribute name
        gameboard.appendChild(square);
    });
}
createBoard();

// Get all the squares on the chessboard
const allSquares = document.querySelectorAll('.square');

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragstart);
    square.addEventListener('dragover', dragover);
    square.addEventListener('drop',drop);
});

let startpositionid;
let draggedelement;

function dragstart(e) {
    startpositionid = e.target.parentNode.getAttribute('square-id');
    draggedelement = e.target;
}

function dragover(e) {
    e.preventDefault();
}

function dragdrop(e) {
    e.stopPropagation();
    console.log('playergo', playergo);
    console.log('e.target', e.target);
    const correctgo = draggedelement.firstChild?.classList.contains(playergo);
    const taken = e.target?.classList.contains('piece');
    const valid = checkifvalid(e.target);
    const opponentgo = playergo === 'white' ? 'black' : 'white';
    console.log('opponent go', opponentgo);
    const takenbyopponent = e.target?.firstChild?.classList.contains(opponentgo);

    if (correctgo) {
        if (takenbyopponent && valid) {
            e.target.parentNode.replaceChild(draggedelement, e.target);
            changeplayer();
            return;
        }

        if (taken && !takenbyopponent) {
            infodisplay.textContent = "Bhai Tu apna colour dekh le!";
            setTimeout(() => infodisplay.textContent = "", 2000);
            return;
        }

        if (valid) {
            e.target.appendChild(draggedelement);
            changeplayer();
            return;
        }
    }
}


function drop(e) {
    e.preventDefault();
    dragdrop(e);
}



function reverseid(){
    const allSquares=document.querySelectorAll(".square")
    allSquares.forEach((square,i) =>
    square.setAttribute('square-id',(width*width-1)-i))

}
function revertid(){
    const allSquares=document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>square.setAttribute('square-id',i))

}

function checkifvalid(target){
    console.log(target)
    const targetid=target.getAttribute('square-id') || target.parentNode.getAttribute('square-id')
}


/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let gameStatus = true;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {


    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");

    // condition to ensure that the box being clicked on is empty
    if(grid[colIdx][rowIdx] == 0){
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        checkGameStatus();
        if(gameStatus){
            computersTurn(2);
        }
        renderMainGrid();
        
        addClickHandlers();
    }
  
   
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

// onBoxClick callback
// loop through the grid and check for vacant boxes
// add value 2 to a random vacant box

function computersTurn(value){
    var bestBox = getBestVacantBox()
    if(bestBox != null){
        grid[bestBox.colIdx][bestBox.rowIdx] = value;
    }else{
        showDrawMsg()   
    }
    if(gameStatus){
        checkGameStatus();
    } 

}

// get best  possible box
function getBestVacantBox(){
    
    var bestBox = {}

    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx = 0; rowIdx < GRID_LENGTH;rowIdx++) {
           if(grid[colIdx][rowIdx] == 0){
                bestBox.colIdx = colIdx;
                bestBox.rowIdx = rowIdx;
                return bestBox;
           }
        }
        
    }

    return null;
    
}

// after every turn, check for game status by calling checkwinningPattern,
// if a winning pattern is found, identify the winner from the value in the pattern (1 for user, 2 for computer) and mark the game as complete
// call computersTurn if game is not complete, 
// when there are no vacant boxes remaining and there is no winner, mark game as complete and draw as result 

function checkGameStatus(){

    var winner = checkwinningPattern();

    if(winner){
        gameStatus = false;
        showWinner(winner)
    }

}


// check if a winning pattern exists within the grid
function checkwinningPattern(){

   //match winning pattern in rows
   if(
        (grid[0].indexOf(2) == -1 && grid[0][0]+grid[0][1]+grid[0][2] == 3) || 
        (grid[1].indexOf(2) == -1 && grid[1][0]+grid[1][1]+grid[1][2] == 3) || 
        (grid[2].indexOf(2) == -1 && grid[2][0]+grid[2][1]+grid[2][2] == 3)
    ){
        return 'You'
   }else if(
        (grid[0].indexOf(1) == -1 && grid[0][0]+grid[0][1]+grid[0][2] == 6) || 
        (grid[1].indexOf(1) == -1 && grid[1][0]+grid[1][1]+grid[1][2] == 6) || 
        (grid[2].indexOf(1) == -1 && grid[2][0]+grid[2][1]+grid[2][2] == 6)

    ){
        return 'Computer'
   }


   //match winning pattern in columns
   if(

        (grid[0][0] != 2 && grid[1][0] != 2 && grid[2][0] != 2) && (grid[0][0]+grid[1][0]+grid[2][0] == 3) ||
        (grid[0][1] != 2 && grid[1][1] != 2 && grid[2][1] != 2) && (grid[0][1]+grid[1][1]+grid[2][1] == 3) ||
        (grid[0][2] != 2 && grid[1][2] != 2 && grid[2][2] != 2) && (grid[0][2]+grid[1][2]+grid[2][2] == 3)

    ){
        return 'You'
   }else if(

        (grid[0][0] != 1 && grid[1][0] != 1 && grid[2][0] != 1) && (grid[0][0]+grid[1][0]+grid[2][0] == 6) ||
        (grid[0][1] != 1 && grid[1][1] != 1 && grid[2][1] != 1) && (grid[0][1]+grid[1][1]+grid[2][1] == 6) ||
        (grid[0][2] != 1 && grid[1][2] != 1 && grid[2][2] != 1) && (grid[0][2]+grid[1][2]+grid[2][2] == 6)

    ){
         return 'Computer'
   }


   // match winning pattern in diagonals
   if(
        (grid[0][0] != 2 && grid[1][1] != 2 && grid[2][2] != 2) && (grid[0][0]+grid[1][1]+grid[2][2] == 3) ||
        (grid[0][2] != 2 && grid[1][1] != 2 && grid[2][0] != 2) && (grid[0][2]+grid[1][1]+grid[2][0] == 3)

    ){
         return 'You'
   }else if(
        (grid[0][0] != 1 && grid[1][1] != 1 && grid[2][2] != 1) && (grid[0][0]+grid[1][1]+grid[2][2] == 6) ||
        (grid[0][2] != 1 && grid[1][1] != 1 && grid[2][0] != 1) && (grid[0][2]+grid[1][1]+grid[2][0] == 6)
    ){
         return 'Computer'
   }

   return null;
   
}

// when the game completes, show a flash message about the winner ('You' or 'Computer')

function showWinner(winner){

    var text = ''
    winner == 'You' ? text = 'Congratulations!' : text = 'Sorry!'

    var congrats = document.getElementsByClassName("congrats");
    congrats[0].classList.remove('hidden')
    congrats[0].innerHTML = text

    var winnr = document.getElementsByClassName("winnr");
    winnr[0].classList.remove('hidden')
    winnr[0].innerHTML = winner + ' Won!'

}


// show a msg if the game ends in draw
function showDrawMsg(){

    var congrats = document.getElementsByClassName("congrats");
    congrats[0].classList.remove('hidden')
    congrats[0].innerHTML = "Sad.."

    var winnr = document.getElementsByClassName("winnr");
    winnr[0].classList.remove('hidden')
    winnr[0].innerHTML = "It's a draw!"
}


initializeGrid();
renderMainGrid();
addClickHandlers();


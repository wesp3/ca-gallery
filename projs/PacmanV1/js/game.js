'use strict'
const WALL = '&#129521;';
const FOOD = '.'
const SUPERFOOD = '&#127812';
const EMPTY = ' ';
const CHERRY = '&#127826;';

var FOOD_COUNTER;
var SUPERFOOD_COUNTER;
var MAX_SCORE;
var cherryScore = 0;
var DISPLAY_SCORE;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {

    DISPLAY_SCORE = 0;
    FOOD_COUNTER = 0;
    SUPERFOOD_COUNTER = 0;
    pcl = [];
    MAX_SCORE = 0;
    document.querySelector('h2 span').innerText = 0;

    // console.log('Hello')
    gBoard = buildBoard()
    createPacman(gBoard);

    // determine max score
    getMaxScore()
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container');

    var cherryTimer = setInterval(cherrySpawn, 15000);
    gGame.isOn = true
}

function getMaxScore(){
    for(var i = 0; i < gBoard.length; i++){
        var field = gBoard[i];
        for(var j = 0; j < field.length; j++){
            if (field[j] === FOOD){
                FOOD_COUNTER += 1;
            }
            if (field[j] === SUPERFOOD){
                SUPERFOOD_COUNTER += 1;
            }
        }
    }
    MAX_SCORE = FOOD_COUNTER + SUPERFOOD_COUNTER;
    console.log('Max score is: ' + MAX_SCORE);

}

    function buildBoard() {
        var SIZE = 10;
        var board = [];
        for (var i = 0; i < SIZE; i++) {
            board.push([]);
            for (var j = 0; j < SIZE; j++) {
            // fill everything with food
            board[i][j] = FOOD;
            // wall
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            // super food
            if (i === 1 && j === 1 ||
                i === 1 && j === SIZE -2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE -2){
                board[i][j] = SUPERFOOD;
            } 
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    DISPLAY_SCORE = gGame.score + cherryScore;
    document.querySelector('h2 span').innerText = DISPLAY_SCORE;

    console.log(gGame.score);
    
    if(gGame.score === MAX_SCORE){
        gameOver('win');
    }

}

function cherrySpawn(){
    pclFinder();
    if(pcl.length > 1){
        var rng = getRandomIntInclusive(0, pcl.length-1);
        var cherry = pcl[rng];
        gBoard[cherry.i][cherry.j] = CHERRY;
        renderCell(cherry, CHERRY);
    }
}

var pcl; //possible cherry location

function pclFinder(){
    var t = false;
    pcl = [];
    for(var i=1; i<gBoard.length -1; i++){
        for (var j=1; j<gBoard[0].length -1; j++){
            pcl.push({i: i, j:j})
        }
    }



    // gBoard.forEach(function(el, x){
    //     el.forEach(function(iel, y){
    //         if (iel === ' '){
    //             // console.log(x, y);
    //             pcl.push({
    //                 i: x,
    //                 j: y
    //             });
    //             // createCherry(x, y);
    //             t = true;
    //         }
    //     })
    // });
                                    //an approach of finding the cell to place the cherry 
    // gBoard[0][0] = 'C';
    // renderCell(, 'C');
    // console.log(gBoard[0]);
    // if(t){
    // console.log(pcl);

        // console.log(cherries[0]);
        // cherries.forEach(function(el, i){
            // renderCell(cherries[0], 'c');
    // }
    // if(t) createCherry();
}

// function createCherry(x, y){
//     console.log(cherries[0][1]);
//     var cherry = {
//         location: {
//             i: cherries[0][0],
//             j: cherries[0][1]
//         }
//     }
//     gCherries.push(cherry);
//     console.log(gCherries);
// }

function gameOver(x) {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    // update the model
    if (x == 'win'){
        console.log('Game Won');
        printGameOver('win', '.gameover-cont');
    } else {
        console.log('You Lost');
        printGameOver('lose', '.gameover-cont');
    }
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
}

function playAgain(){
    gGame.isOn = false;
    gGame.score = 0;
    updateScore(0);
    var boardContainer = document.querySelector('.board-container');
    boardContainer.innerHTML = '';
    var gameoverContainer = document.querySelector('.gameover-cont');
    gameoverContainer.innerHTML = '';

    init();
}

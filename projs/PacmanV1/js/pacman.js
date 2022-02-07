'use strict'
const PACMAN = '😷';
const SAVEFOOD = 'S';

var gPacman;
var saveFood;
var preserveFood = false;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    // how to check for ghost on top of food?
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver('lose');
        return
    } else if (nextCell === GHOST && gPacman.isSuper){
        // eat the ghost
        eatGhost('pacmove', nextLocation);
    }
    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === SUPERFOOD) {
        if(gPacman.isSuper){
            return
            // prevents pacman from eating another superfood
            // console.log('already super');
            saveFood = nextLocation;
            preserveFood = true;
            // console.log(saveFood);
        } else {
            updateScore(1)
            superPower();
        }
    }
    if (nextCell === CHERRY){
        // console.log('eating a cherry');
        cherryScore += 10;
        updateScore(0);
    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    //bug appears sometimes, why is food lost?
    if (preserveFood){
        console.log('hi');
        gBoard[saveFood.i][saveFood.j] = SAVEFOOD;
        renderCell(saveFood, SAVEFOOD);
        preserveFood = false;
    } 
    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)

    // console.log(gGame.score);
}

function eatGhost(move, location, ghostid){
    //remove hit ghost from array
    if (move == 'ghostmove'){
        // console.log('ghost being eaten ' + location.i + ' | ' + location.j);
    } else if (move == 'pacmove'){
        // console.log('pacman eating ghost at ' + location.i + ' | ' + location.j);
        // console.log('and the ghost is also at ' + gGhosts[0].location.i + ' | ' + gGhosts[0].location.j);
        if (location.i == gGhosts[0].location.i && location.j == gGhosts[0].location.j){
            console.log('0');
            gGhosts.splice(0, 1);
        } else if (location.i == gGhosts[1].location.i && location.j == gGhosts[1].location.j){
            console.log('1');
            gGhosts.splice(1, 1);
        } else {
            console.log('2');
            gGhosts.splice(2, 1);
        }
    }
    updateScore(1); 
    return
}

var ghostcolor = [];

function superPower(){
        gPacman.isSuper = true;
        console.log('isSuper');

        gGhosts.forEach(function(element, index){
            ghostcolor[index] = element.color;
            element.color = '#837bff';
            renderCell(element.location, getGhostHTML(element));
        });
        
        setTimeout(function(){
            console.log('no longer super');
            gPacman.isSuper = false;
            gGhosts.forEach(function(element, index){
                element.color = ghostcolor[index];
                renderCell(element.location, getGhostHTML(element));
            });
            
        }, 5000);
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}
'use strict'
// const GHOST = '&#9781;';
const GHOST = '&#5603;';
var gGhosts;
var gIntervalGhosts;
// console.log('ghost')

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: "#"+(getRandomIntInclusive(0, 255)).toString(16)+((getRandomIntInclusive(0, 255))).toString(16)+((getRandomIntInclusive(0, 255))).toString(16)
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
   

}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('I am ghost number ' + gGhosts.indexOf(ghost));
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    // console.log(nextLocation);
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // doesn't prevent ghosts from walking on top of each other after spawning
    if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver();
        return
    } else if (nextCell === PACMAN && gPacman.isSuper){
        eatGhost('ghostmove', nextLocation);
        var ghostIndex = gGhosts.indexOf(ghost);
        gGhosts.splice(ghostIndex, 1);
        // console.log('I am ghost number ' + gGhosts.indexOf(ghost));
    }

    // moving from current position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getGhostHTML(ghost) {
    return `<span style="color: ${ghost.color}">${GHOST}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


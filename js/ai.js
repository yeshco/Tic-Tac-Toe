/////////////SELECTORS
//This Selectors just Create Select and Append new Elements needed for the
//Computer to play against you
const div = document.createElement('div');
const nameInput = document.createElement('input');
const message = document.createElement('p');
const startHeader = document.querySelector('.screen-start header');
const theStartButton = document.querySelector('.startGame')
const screenWinP = document.querySelector('.screen-win p')

const divInput = startHeader.insertBefore(div, theStartButton);
divInput.appendChild(message);
divInput.appendChild(nameInput);

divInput.classList.add('divInput');
nameInput.placeholder = "Your name:";
message.textContent = "To play against the computer write your name here:";

nameInput.focus();


/////////////GENERAL FUNCTIONS

///This Function Changes the WIN screen depending on who won
function changeWinner() {
  if (nameInput.value !== "") {
    if (player2.classList.contains('active')) {
      screenWinP.textContent = `${nameInput.value} Won!`;
    } else {
      screenWinP.textContent = `Computer Won :(`;
    }
  }
}

///This Function prevents the regular program from changing players automatically
///to let the computer play
function blockXMoves() {
  if (nameInput.value === "") {
    return true;
  } else {
    return false;
  }
}

///This Function changes the name of the players depending on what name was written
function changeName() {
  player1.innerHTML =
  `<span>
    ${nameInput.value}
    </span>
  `
  player2.innerHTML =
  `<span>
    Computer
    </span>
  `
};

///This Function calls two other functions needed for the computer to player
///to play against you
///1)Change the name of the players
///2)Adds the Event listeners for the computer to play again
function startAI() {
  if (nameInput.value !== "") {
    changeName();
    addRemoveEL(1);
  }
}


///////////// EVENT LISTENERS

///This EL is for when you just click enter instead of clicking start the game
nameInput.addEventListener('keyup', () => {
  if (event.keyCode === 13) {
    startTheGame();
    startAI();
  }
});

///This EL is for when you start the game, you don't need to call the second function
///because it's already being called in app.js
startButton.addEventListener('click', startAI)


/////////////////
//SPECIFIC FUNCTIONS FOR THE COMPUTER AI

///This Function is called when the player plays it deactivates the event listener
//that called it and calls the function to make the computer play
let theCount3 = 0;
function onClickComputer() {
  if (player2.classList.contains('active')) {
    addRemoveEL(0)
    setTimeout(() => blockComputer(player2Moves), 1500);
    theCount3 = 0;
  }
}

///This function Adds or removes the event listener depending on if the computer
///is in the middle of playing or it has finished
function addRemoveEL(addRemove) {
  if (addRemove) {
    theGrid.addEventListener('click', onClickComputer);
  } else {
    theGrid.removeEventListener('click', onClickComputer);
  }
}


///First AI
//This First Algorithm just makes the computer pick up random Numbers from the
//Tick-Tack-Toe = the computer is very dumb

let arrayOfCellNumbers = [1,2,3,4,5,6,7,8,9]
function randomComputer() {
if (!(screenWin.style.display === 'block')) {
    let randomCellNumber = (Math.ceil(Math.random() * 9));
    let indexNumber = arrayOfCellNumbers.indexOf(randomCellNumber);
    for (i=0; i<9; i++) {
      let randomCell = document.querySelector(`#cell${arrayOfCellNumbers[indexNumber]}`);
      if (!(randomCell.classList.contains('clicked'))) {
        randomCell.classList.add('box-filled-2');
        randomCell.classList.add('clicked');
        player2Moves.push(randomCell.id);
        checkForActive(player2, player1);
        checkForWin(player2Moves);
        i = 9;
        addRemoveEL(1);
      } else if (!(indexNumber === 8)) {
        indexNumber++
      } else {
        indexNumber = 0;
      }
    }
  }
}


///Second AI
//This Second Algorithm blocks you everytime you're going to win and also tries to win
//when it has 2 rightly placed = the computer is more smart

///The Counts: are used to prevent repetitive tasks
let theCount1 = 0;
let theCount2 = 0;
function blockComputer(theMoves) {
  theCount1 = 0;
  theCount2 = 0;
  if ((toBlock = checkforMoves(theMoves, "cell1", "cell4", "cell7")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((toBlock = checkforMoves(theMoves, "cell2", "cell5", "cell8")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((toBlock = checkforMoves(theMoves, "cell3", "cell6", "cell9")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((toBlock = checkforMoves(theMoves, "cell1", "cell2", "cell3")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((toBlock = checkforMoves(theMoves, "cell4", "cell5", "cell6")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((toBlock = checkforMoves(theMoves, "cell7", "cell8", "cell9")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((toBlock = checkforMoves(theMoves, "cell1", "cell5", "cell9")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((toBlock = checkforMoves(theMoves, "cell3", "cell5", "cell7")) && (theCount2 < 1)) {
    blockTheWin(toBlock);
  }  if ((theCount1 === 0) && (theCount3 === 0)) {
    theCount3++
    blockComputer(player1Moves);
  } else if (theCount1 === 0) {
    randomComputer();
  }
}

///This Function checks if there are two cells that are from the same series of
///three that make you win
function checkforMoves(theMoves, one, two, three) {
      if (theMoves.includes(one) && theMoves.includes(two)) {
        return three;
      } else if (theMoves.includes(two) && theMoves.includes(three)) {
        return one;
      } else if (theMoves.includes(three) && theMoves.includes(one)) {
        return two;
      } else {
        return false;
      }
    }

///This Function either blocks your win or makes the computer win when there are two
///cells of the same series already selected
function blockTheWin(toBlock) {
  if (!(screenWin.style.display === 'block')) {
    let randomCell = document.querySelector(`#${toBlock}`);
    if (!(randomCell.classList.contains('clicked'))) {
      randomCell.classList.add('box-filled-2');
      randomCell.classList.add('clicked');
      player2Moves.push(randomCell.id);
      checkForActive(player2, player1);
      checkForWin(player2Moves);
      addRemoveEL(1);
      theCount1++
      theCount2++
    }
  }
}


///Third AI
//This Third Algorithm is so smart it anticipates every move you're going to
//make and acts acordingly = the computer is unbeatable
//Future...

//Selecting elements and creating them to start the game:
/////////Select and create:
const body = document.querySelector('body');
const board = document.querySelector('#board');
let screenStart = document.createElement('div');
let screenWin = document.createElement('div');
////////Append:
body.appendChild(screenStart);
body.appendChild(screenWin);
////////Fill the HTML of the new elements to create the start and win page.
screenStart.outerHTML =
  `
  <div class="screen screen-start" id="start">
    <header>
      <h1>Tic Tac Toe</h1>
      <a href="#" class="button startGame">Start game</a>
    </header>
  </div>
  `;
screenWin.outerHTML =
  `
  <div class="screen screen-win" id="finish">
    <header>
      <h1>Tic Tac Toe</h1>
      <p class="message">Winner</p>
      <a href="#" class="button newGame">New game</a>
    </header>
  </div>
  `;

//Selecting all the elements that we need to do something to them in the app.
////////Selecting elements in the "board" page.
const theGrid = document.querySelector('.boxes');
const allLI = theGrid.getElementsByTagName('li');
const player2 = document.querySelector('#player2');
const player1 = document.querySelector('#player1');
////////Selecting elements in the "start" page.
screenStart = document.querySelector('.screen-start');
const startButton = document.querySelector('.startGame');
////////Selecting elements in the "win" page.
screenWin = document.querySelector('.screen-win');
const newGame = document.querySelector('.newGame');

//Creating Arrays to use.
let player1Moves = [];
let player2Moves = [];
let player2Selections = [];

//Creating all functions that will be called later.

function checkClicked() {
  // var hello = 0;
  // player2Selections.forEach( (item) => {
  //   if (!(item.classList.contains('clicked'))) {
  //       hello ++;
  //   }
  // });
  // if (hello > 0) {
  //   return false;
  // } else {
  //   return true;
  // }
  return true;
}
////////This function checks to see which player is playing.
function checkForActive(thePlayer, theSecondPlayer) {
  if (thePlayer.classList.contains('active')) {
    thePlayer.classList.remove('active');
    theSecondPlayer.classList.add('active');
  }
}
////////This function checks to see what to display when somebody wins.
function win(tie) {
  if (checkClicked()) {
    let message = document.querySelector('.message')
    screenWin.style.display = 'block';
    board.style.display = 'none';
    screenStart.style.display = 'none';
    if (tie) {
      message.textContent = "I'ts a Draw";
      screenWin.classList.add('screen-win-tie');
    } else if (player2.classList.contains('active')) {
      screenWin.classList.add('screen-win-one');
      message.textContent = "Winner";
    } else {
      screenWin.classList.add('screen-win-two');
      message.textContent = "Winner";
    }
  }
}
////////This function with the next one checks the plays for the winning combination.
function checkForWinningPlays(theMoves, one, two, three) {
  if (theMoves.includes(one) && theMoves.includes(two) && theMoves.includes(three)) {
    return true;
  } else {
    return false;
  }
}
function checkForWin(theMoves)  {
    if (checkForWinningPlays(theMoves, "A1", "A2", "A3")) {
      win();
    } else if (checkForWinningPlays(theMoves, "B1", "B2", "B3")) {
      win();
    } else if (checkForWinningPlays(theMoves, "C1", "C2", "C3")) {
      win();
    } else if (checkForWinningPlays(theMoves, "A1", "B1", "C1")) {
      win();
    } else if (checkForWinningPlays(theMoves, "A2", "B2", "C2")) {
      win();
    } else if (checkForWinningPlays(theMoves, "A3", "B3", "C3")) {
      win();
    } else if (checkForWinningPlays(theMoves, "A1", "B2", "C3")) {
      win();
    } else if (checkForWinningPlays(theMoves, "C1", "B2", "A3")) {
      win();
    } else if (theMoves.length === 5){
      win(1);
    }
  }
////////This function is called to reset the board when clicking "New Game".
function blankSlate() {
  player1Moves = [];
  player2Moves = [];
  for (i=0; i<allLI.length; i ++) {
    allLI[i].classList.remove('box-filled-2', 'box-filled-1', 'clicked');
  }
  player2.classList.remove('active');
  player1.classList.add('active');
  screenWin.classList.remove('screen-win-one', 'screen-win-two', 'screen-win-tie')
};

//Now here are the eventListeners
////////1)On load this shows the "start" page.
window.addEventListener('load', () => {
  board.style.display = 'none';
  screenWin.style.display = 'none';
});
////////2)On click this shows the "board" page.
function startTheGame() {
  event.preventDefault();
  board.style.display = 'block';
  screenStart.style.display = 'none';
  player1.classList.add('active');
}
startButton.addEventListener('click', startTheGame);
////////3)On click this shows the "board" page and resets it.
newGame.addEventListener('click', () => {
  board.style.display = 'block';
  screenWin.style.display = 'none';
  blankSlate();
});
////////4-5)When mouse is on a box it shows the players symbol of the one that
////////is going to play next when mouse is removed the symbol is also removed.
theGrid.addEventListener('mouseover', () => {
  if (!(event.target.classList.contains('clicked'))) {
  if (player1.classList.contains('active')) {
    event.target.style.backgroundImage = "url(img/o.svg)";
  } else {
    event.target.style.backgroundImage = "url(img/x.svg)";
  }
  }
})
theGrid.addEventListener('mouseout', () => {
  event.target.style.backgroundImage = "";
});
////////6)On clicking a box this fills it with the right symbol and
////////calls functions above to check for win.
theGrid.addEventListener('click', () => {
  if (!(event.target.classList.contains('clicked')) || !(event.target.classList.contains('computersTurn'))) {
    if (player1.classList.contains('active')) {
        event.target.classList.add('box-filled-1');
        event.target.classList.add('clicked');
        player1Moves.push(event.target.id);
        checkForActive(player1, player2)
        checkForWin(player1Moves);
    } else {
        event.target.classList.add('box-filled-2');
        event.target.classList.add('clicked');
        player2Moves.push(event.target.id);
        player2Selections.push(event.target);
        checkClicked();
        checkForActive(player2, player1)
        checkForWin(player2Moves);
    }
  }
});

///////////////////////////////////

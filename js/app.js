/////////////
//// 1) General
let player1Moves = [];
let player2Moves = [];
let player2Selections = [];

/// A) Selection and Creation of elements in the page

const body = document.querySelector('body');
const board = document.querySelector('#board');
let screenStart = document.createElement('div');
let screenWin = document.createElement('div');
body.appendChild(screenStart);
body.appendChild(screenWin);

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

/// B) Loading of startScreen
//a) Function

function startScreen() {
  screenWin.style.display = 'none';
  board.style.display = 'none';
}

//b) Event Listener

window.addEventListener('load', startScreen);


/////////////
//// 2) Start Screen

/// A) Selection

screenStart = document.querySelector('.screen-start');
const startButton = document.querySelector('.startGame');

/// B) Loading of Board on button 'click'
//a) Function
function startTheGame() {
  event.preventDefault();
  screenStart.style.display = 'none';
  board.style.display = 'block';
  player1.classList.add('active');
}

//b) Event Listener

startButton.addEventListener('click', startTheGame);


/////////////
//// 3) Game Screen


/// A) Selection

const theGrid = document.querySelector('.boxes');
const allLI = theGrid.getElementsByTagName('li');
const player2 = document.querySelector('#player2');
const player1 = document.querySelector('#player1');

/// B) Functions

//a) Changes the 'Active' player based on who was 'Active' before
function checkForActive(thePlayer, theSecondPlayer) { //This function is called
  if (thePlayer.classList.contains('active')) {       //on row 128 & 135
    thePlayer.classList.remove('active');
    theSecondPlayer.classList.add('active');
  }
}

//b) When you 'Mouseover' a box you see what will appear when you 'click'
function mouseOver() {                                  //This function is called
    if (!(event.target.classList.contains('clicked'))) {//on row 192
      if (player1.classList.contains('active')) {
        event.target.style.backgroundImage = "url(img/o.svg)";
      } else if (blockXMoves()) {
        event.target.style.backgroundImage = "url(img/x.svg)";
      }
    }
  }

//c)The image displayed on 'Mouseover' dissapears on 'Mouseout'
function mouseOut() {                               //This function is called
    event.target.style.backgroundImage = "";        //on row 193
  }

//d)Resets the whole game when you press 'New game' at the end
function blankSlate() {                             //This function is called
  player1Moves = [];                                //on row 211
  player2Moves = [];
  for (i=0; i<allLI.length; i ++) {
    allLI[i].classList.remove('box-filled-2', 'box-filled-1', 'clicked');
  }
  player2.classList.remove('active');
  addRemoveEL(1);
  theCount2 = 0;
  theCount1 = 0;
};

//e) Everything that happens when you click
function onClick() {              //This function is called on row 194
  if (!(event.target.classList.contains('clicked'))) {
    if (player1.classList.contains('active')) {
        event.target.classList.add('box-filled-1');
        event.target.classList.add('clicked');
        player1Moves.push(event.target.id);
        checkForActive(player1, player2);
        checkForWin(player1Moves);
    } else if (blockXMoves()) {
        event.target.classList.add('box-filled-2');
        event.target.classList.add('clicked');
        player2Moves.push(event.target.id);
        player2Selections.push(event.target);
        checkForActive(player2, player1);
        checkForWin(player2Moves);
    }
  }
}

/*The next functions are part of the same series they have a number according to which is called first*/
/*3*/function win(tie) {
      if (true) {
        let message = document.querySelector('.message')
        screenWin.style.display = 'block';
        screenStart.style.display = 'none';
        if (tie) {
          message.textContent = "I'ts a Draw";
          screenWin.classList.add('screen-win-tie');
        } else if (player2.classList.contains('active')) {
          screenWin.classList.add('screen-win-one');
          changeWinner();
        } else {
          screenWin.classList.add('screen-win-two');
          changeWinner();
        }
      }
    }

/*2*/function checkForWinningPlays(theMoves, one, two, three) {
      if (theMoves.includes(one) && theMoves.includes(two) && theMoves.includes(three)) {
        return true;
      } else {
        return false;
      }
    }

/*1*/function checkForWin(theMoves)  {
      if (checkForWinningPlays(theMoves, "cell1", "cell4", "cell7")) {
        setTimeout(() =>  win() , 800);
      } else if (checkForWinningPlays(theMoves, "cell2", "cell5", "cell8")) {
        setTimeout(() =>  win() , 800);
      } else if (checkForWinningPlays(theMoves, "cell3", "cell6", "cell9")) {
        setTimeout(() =>  win() , 800);
      } else if (checkForWinningPlays(theMoves, "cell1", "cell2", "cell3")) {
        setTimeout(() =>  win() , 800);
      } else if (checkForWinningPlays(theMoves, "cell4", "cell5", "cell6")) {
        setTimeout(() =>  win() , 800);
      } else if (checkForWinningPlays(theMoves, "cell7", "cell8", "cell9")) {
        setTimeout(() =>  win() , 800);
      } else if (checkForWinningPlays(theMoves, "cell1", "cell5", "cell9")) {
        setTimeout(() =>  win() , 800);
      } else if (checkForWinningPlays(theMoves, "cell3", "cell5", "cell7")) {
        setTimeout(() =>  win() , 800);
      } else if (theMoves.length === 5){
        setTimeout(() =>  win(1) , 800);
      }
    }

/// C) Event Listener

theGrid.addEventListener('mouseover', mouseOver);
theGrid.addEventListener('mouseout', mouseOut);
theGrid.addEventListener('click', onClick);


/////////////
//// 4) Win Screen

/// A) Selection

screenWin = document.querySelector('.screen-win');
const newGame = document.querySelector('.newGame');

/// B) Displays the board again when you press 'New Game'
//a) Function
function reStartTheGame() {
  screenWin.classList.remove('screen-win-one', 'screen-win-two', 'screen-win-tie')
  player1.classList.add('active');
  screenWin.style.display = 'none';
  blankSlate();
}

//b) Event Listener
newGame.addEventListener('click', reStartTheGame);

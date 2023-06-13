'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
let playerNameDiv1 = document.getElementById('playerName1');
let playerNameDiv2 = document.getElementById('playerName2');

const winMessage0 = document.querySelector('.win-message0');
const winMessage1 = document.querySelector('.win-message1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = false;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add('hidden');
  winMessage0.classList.add('hidden');
  winMessage1.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  // unhide input field and button
  document.querySelector('.divSetPlayerName1').classList.remove('hidden');
  // unhide input field and button
  document.querySelector('.divSetPlayerName2').classList.remove('hidden');
  //Remove the old names while starting a new game
  playerNameDiv1.innerHTML = '';
  playerNameDiv2.innerHTML = '';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  playing = true;
};
//setting name for the players
function setPlayerName1() {
  playerNameDiv1.innerHTML = document.getElementById('playerNameInput1').value;
  // hide input field and button
  document.querySelector('.divSetPlayerName1').classList.add('hidden');
  playing = true;
}
function setPlayerName2() {
  playerNameDiv2.innerHTML = document.getElementById('playerNameInput2').value;
  // hide input field and button
  document.querySelector('.divSetPlayerName2').classList.add('hidden');
  playing = true;
}

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check if the dice is 1, then switch to the next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('Hold button');
    //1. add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if the score is already 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      console.log(`winMessage${activePlayer}`);
      if (activePlayer == 0) {
        playerNameDiv1.innerHTML =
          document.getElementById('playerNameInput1').value;
        winMessage0.classList.add('hidden');
        winMessage0.classList.remove('hidden');
      } else {
        playerNameDiv2.innerHTML =
          document.getElementById('playerNameInput2').value;
        winMessage1.classList.add('hidden');
        winMessage1.classList.remove('hidden');
      }
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3.switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);

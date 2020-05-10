/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;

var lastDice;

//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'</em>';

//Read data from DOM
//var score = document.querySelector('#score-0').textContent;

init();



document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. Display the result
        var diceDOM = document.getElementById('dice-1').style.display = 'block';
        var diceDOM = document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        //3. Update the round 
        // if(dice === 6 && lastDice === 6){
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-'+activePlayer).textContent = '0';
        //     nextPlayer();
        // }
        // else if (dice !== 1) {
        //     //Add score
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     nextPlayer();
        // }
        // lastDice  = dice;
    }
});
//BUTTON HOLD
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // ADD current score to global score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        var input = document.querySelector('.final-score').value;
        var winningScore;
        //Undefined, 0 , null or "" are coerced to false
        //Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }

});
//fucntion that changes the background color
document.querySelector('#btnChangeBack').addEventListener('click', function () {


    var random = Math.floor(Math.random() * 8) + 1;

    document.body.style.backgroundImage = "linear-gradient(rgba(62, 20, 20, 0.4), rgba(62, 20, 20, 0.4)), url(back" + random + ".jpg)";

});

// function that creates the new  game
document.querySelector('.btn-new').addEventListener('click', function () {

    init();
})

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

}

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


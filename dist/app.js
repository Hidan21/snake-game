"use strict";
const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');
let gameOver = false;
let foodx;
let foody;
let snakeX = 5;
let snakey = 10;
let velocityX = 0;
let velocityY = 0;
let score = 0;
let snakeBody = [];
let setIntervalId;
let highScore = localStorage.getItem('high-score') || 0;
highscoreElement.innerHTML = `high score: ${highScore}`;
const changeFoodPosition = () => {
    foodx = Math.floor(Math.random() * 30) + 1;
    foody = Math.floor(Math.random() * 30) + 1;
};
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert('game over');
    location.reload();
};
const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};
controls.forEach((button) => button.addEventListener('click', () => changeDirection({ key: button.dataset.key })));
const initGame = () => {
    if (gameOver) {
        return handleGameOver();
    }
    let htmlMarKup = `<div class="food" style="grid-area: ${foody} / ${foodx}"></div>`;
    if (snakeX === foodx && snakey === foody) {
        changeFoodPosition();
        snakeBody.push([foodx, foody]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);
        scoreElement.innerHTML = `score: ${score}`;
        highscoreElement.innerHTML = `high score: ${highScore}`;
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakey];
    snakeX += velocityX;
    snakey += velocityY;
    if (snakeX <= 0 || snakeX > 30 || snakey <= 0 || snakey > 30) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarKup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 &&
            snakeBody[0][1] === snakeBody[i][1] &&
            snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarKup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 225);
document.addEventListener('keydown', changeDirection);

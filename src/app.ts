//variables
const playBoard = document.querySelector('.play-board') as HTMLDivElement;
const scoreElement = document.querySelector('.score') as HTMLDivElement;
const highscoreElement = document.querySelector(
  '.high-score'
) as HTMLDivElement;
const controls = document.querySelectorAll('.controls i');

let gameOver: boolean = false;
let foodx: number;
let foody: number;
let snakeX: number = 5;
let snakey: number = 10;
let velocityX: number = 0;
let velocityY: number = 0;
let score: number = 0;
let snakeBody: any = [];
let setIntervalId: any;

let highScore: any = localStorage.getItem('high-score') || 0;
highscoreElement.innerHTML = `high score: ${highScore}`;

//cambiar la posicion de la comida
const changeFoodPosition = (): void => {
  foodx = Math.floor(Math.random() * 30) + 1;
  foody = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert('game over');
  location.reload();
};

//agregar movimiento
const changeDirection = (e: any) => {
  // console.log(e);
  if (e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  // initGame();
};

// cambiar direccion con click
controls.forEach((button: any) =>
  button.addEventListener('click', () =>
    changeDirection({ key: button.dataset.key })
  )
);

const initGame = (): void => {
  if (gameOver) {
    return handleGameOver();
  }
  let htmlMarKup: string = `<div class="food" style="grid-area: ${foody} / ${foodx}"></div>`; //comida

  if (snakeX === foodx && snakey === foody) {
    changeFoodPosition();
    snakeBody.push([foodx, foody]);
    // console.log(snakeBody);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score', highScore);
    scoreElement.innerHTML = `score: ${score}`;
    highscoreElement.innerHTML = `high score: ${highScore}`;
  }

  //agregando el cuadro a la snake
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakey];
  snakeX += velocityX;
  snakey += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakey <= 0 || snakey > 30) {
    gameOver = true;
  }

  //agregando mas div para hacer cvrecer la serpiente
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarKup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; // vivora

    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarKup;
};

changeFoodPosition();

setIntervalId = setInterval(initGame, 225);

//evento para cambiar posicion a la snake
document.addEventListener('keydown', changeDirection);

const cell = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restart = document.getElementById("restart");
const RED_CIRCLE = "circle";
const YELLOW_CIRCLE = "circle";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let yellowTurn = true;
startGame();

restart.addEventListener("click", startGame);

startGame = function () {
  circleTurn = false;
  cell.forEach((cell) => {
    cell.classList.remove(RED_CIRCLE);
    cell.classList.remove(YELLOW_CIRCLE);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
};

handleClick = function (e) {
  const cell = e.target;
  const current = yellowTurn ? YELLOW_CIRCLE : RED_CIRCLE;
  placeMark(cell, current);
  if (checkWin(current)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHover();
  }
};

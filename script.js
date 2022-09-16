const BoardCell = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restart = document.getElementById("restart");
const message = document.getElementById("message");

const RED_CIRCLE = "R";
const YELLOW_CIRCLE = "Y";

const WINNING_WAYS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let yellowTurn;

startGame();

restart.addEventListener("click", () => {
  startGame();
  message.innerHTML = "";
});

function startGame() {
  yellowTurn = false;
  BoardCell.forEach((cell) => {
    cell.classList.remove(RED_CIRCLE);
    cell.classList.remove(YELLOW_CIRCLE);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  hover();
}

function handleClick(e) {
  const cell = e.target;
  const current = yellowTurn ? YELLOW_CIRCLE : RED_CIRCLE;
  placeMark(cell, current);
  if (checkWin(current)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swap();
    hover();
  }
}

function endGame(draw) {
  if (draw) {
    message.innerHTML = "Draw";
  } else {
    message.innerHTML = `${yellowTurn ? "Yellow" : "Red"} Wins`;
  }
  BoardCell.classList.display = "none";
}

function isDraw() {
  return [...BoardCell].every((cell) => {
    return (
      cell.classList.contains(RED_CIRCLE) ||
      cell.classList.contains(YELLOW_CIRCLE)
    );
  });
}

function placeMark(cell, current) {
  cell.classList.add(current);
}

function swap() {
  yellowTurn = !yellowTurn;
}

function hover() {
  board.classList.remove(RED_CIRCLE);
  board.classList.remove(YELLOW_CIRCLE);
  if (yellowTurn) {
    board.classList.add(YELLOW_CIRCLE);
  } else {
    board.classList.add(RED_CIRCLE);
  }
}

function checkWin(current) {
  return WINNING_WAYS.some((combination) => {
    return combination.every((index) => {
      return BoardCell[index].classList.contains(current);
    });
  });
}

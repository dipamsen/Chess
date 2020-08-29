let cells = [];
let rows = 8;
let span;
let c = {
  BLACK: "black",
  WHITE: "white"
}

let p = {
  KING: "king",
  QUEEN: "queen",
  ROOK: "rook",
  PAWN: "pawn",
  KNIGHT: "knight",
  BISHOP: "bishop"
}
let sprites = {}

let board = new Board;

let currentPlayer = c.WHITE

function setup() {
  createCanvas(480, 480)
  span = width / rows
  let flag = 0;
  for (let i = 0; i < rows; i++) {
    cells[i] = [];
    for (let j = 0; j < rows; j++) {
      cells[i][j] = new Cell(j, i, flag)
      flag = flag == c.WHITE ? c.BLACK : c.WHITE
    }
    flag = flag == c.WHITE ? c.BLACK : c.WHITE
  }
  board.setup();
}

function draw() {
  background(51);

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < rows; j++)
      cells[i][j].display()

  for (let piece of board.blackPieces) {
    if (!piece.moving) piece.display();
    // piece.moving = false
  }
  for (let piece of board.whitePieces) {
    if (!piece.moving) piece.display();
    // piece.moving = false
  }
  let movingPiece = board.getMovingPiece();
  if (movingPiece) {
    movingPiece.x = mouseX / span - 0.5 //- span / 2;
    movingPiece.y = mouseY / span - 0.5 //- span / 2;
    movingPiece.display();
  }
}


function preload() {
  for (let col of Object.values(c)) {
    sprites[col] = {}
    for (let piece of Object.values(p)) {
      let imgAdd = `./assets/${piece}_${col}.png`
      sprites[col][piece] = loadImage(imgAdd);
    }
  }
}

function mousePressed() {
  if (!board.getMovingPiece()) {
    let x = floor(mouseX / span)
    let y = floor(mouseY / span)
    let selectedPiece = board.getPiece(x, y)
    // console.log(x, y);
    if (selectedPiece && selectedPiece.col == currentPlayer) {
      selectedPiece.moving = true;
      selectedPiece.prev = createVector(x, y);
    }
  }
}

function mouseReleased() {
  let movingP = board.getMovingPiece();
  if (movingP) {
    movingP.moving = false;
    let x = floor(mouseX / span);
    let y = floor(mouseY / span);
    if (!(x == movingP.prev.x && y == movingP.prev.y)) {
      let canPlay = movingP.playMove(x, y);
      if (canPlay) {
        movingP.x = x;
        movingP.y = y;
        currentPlayer = currentPlayer == c.WHITE ? c.BLACK : c.WHITE
      }
      else {
        movingP.x = movingP.prev.x;
        movingP.y = movingP.prev.y;
      }
    }
  }
}
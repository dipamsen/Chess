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

let whitePieces = [];
let blackPieces = [];

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
  setupBoard();
}

function draw() {
  background(51);

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < rows; j++)
      cells[i][j].display()

  for (let piece of whitePieces) piece.display();
  for (let piece of blackPieces) piece.display();
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

function setupBoard() {
  new Rook(0, 0, c.BLACK)
  new Rook(7, 0, c.BLACK)
  new Knight(1, 0, c.BLACK)
  new Knight(6, 0, c.BLACK)
  new Bishop(2, 0, c.BLACK)
  new Bishop(5, 0, c.BLACK)
  new King(4, 0, c.BLACK);
  new Queen(3, 0, c.BLACK)

  for (let i = 0; i < rows; i++) {
    new Pawn(i, 1, c.BLACK)
  }

  new Rook(0, 7, c.WHITE)
  new Rook(7, 7, c.WHITE)
  new Knight(1, 7, c.WHITE)
  new Knight(6, 7, c.WHITE)
  new Bishop(2, 7, c.WHITE)
  new Bishop(5, 7, c.WHITE)
  new King(4, 7, c.WHITE);
  new Queen(3, 7, c.WHITE)

  for (let i = 0; i < rows; i++) {
    new Pawn(i, 6, c.WHITE)
  }
}

let moving = false;

function mousePressed() {

}

function getPiece(x, y) {

}
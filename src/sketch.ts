import * as p5 from 'p5';
import Board from './board'
import { Piece } from './piece'
import { Players as c, Pieces as p, Dimensions as d } from './constants'
import spritesheet from './spritesheet'

function sketch(p5: p5) {
  let sprites = {}
  const { Span: span, Rows: rows } = d;
  let board = new Board;
  let currentPlayer = c.WHITE

  let selectedPiece: Piece = null

  p5.preload = () => {
    for (let col of Object.values(c)) {
      sprites[col] = {}
      for (let piece of Object.values(p)) {
        let imgAdd = spritesheet[col][piece]
        sprites[col][piece] = p5.loadImage(imgAdd)
      }
    }
  }

  p5.setup = () => {
    p5.createCanvas(rows * span, rows * span).attribute("oncontextmenu", "return false")
    board.setup(p5, sprites);
  }

  p5.draw = () => {
    p5.background(255);

    board.display();

    for (let piece of board.blackPieces) {
      if (!piece.moving) piece.display();
    }
    for (let piece of board.whitePieces) {
      if (!piece.moving) piece.display();
    }

    let movingPiece = board.getMovingPiece();
    if (movingPiece) {
      movingPiece.x = p5.mouseX / span - 0.5 //- span / 2;
      movingPiece.y = p5.mouseY / span - 0.5 //- span / 2;
      movingPiece.display();
    }
  }

  p5.mousePressed = () => {
    if (!board.getMovingPiece()) {
      let x = p5.floor(p5.mouseX / span)
      let y = p5.floor(p5.mouseY / span)
      let thisPiece = board.getAlivePiece(x, y)
      if (thisPiece && thisPiece.col == currentPlayer) {
        thisPiece.moving = true;
        selectedPiece = thisPiece;
        thisPiece.selected = true;
        thisPiece.prev = p5.createVector(x, y);
      }
    }
  }

  p5.mouseReleased = () => {
    let movingP = board.getMovingPiece();
    if (movingP) {
      movingP.moving = false;
      let x = p5.floor(p5.mouseX / span);
      let y = p5.floor(p5.mouseY / span);
      let canPlay = movingP.playMove(x, y);
      if (!(x == movingP.prev.x && y == movingP.prev.y) && canPlay) {
        movingP.x = x;
        movingP.y = y;
        currentPlayer = currentPlayer == c.WHITE ? c.BLACK : c.WHITE
      } else {
        movingP.x = movingP.prev.x;
        movingP.y = movingP.prev.y;
      }
    }
  }
}

export default sketch
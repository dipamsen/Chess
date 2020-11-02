import * as p5 from 'p5';
import Board from './board'
import { Piece } from './piece'
import { Players as c, Pieces as p, Dimensions as d, CellType, HighlightType, Files, Ranks } from './constants'
import spritesheet from './spritesheet'
import Cell from './cell';

function sketch(p5: p5) {
  const sprites = {}
  const { Span: span, Rows: rows } = d;
  let board = new Board;
  let currentPlayer = c.WHITE

  let selectedPiece: Piece = null
  let lastPlayed: Piece = null

  let moves: string[] = []
  let MovesDiv: p5.Element

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
    const cells: Cell[] = [];
    MovesDiv = p5.createDiv("Hi")
    let flag = CellType.LIGHT;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        cells.push(new Cell(i, j, flag, p5))
        flag = flag == CellType.LIGHT ? CellType.DARK : CellType.LIGHT
      }
      flag = flag == CellType.LIGHT ? CellType.DARK : CellType.LIGHT
    }
    board.setup(p5, sprites, cells);
  }

  p5.draw = () => {
    p5.background(255);

    board.display()
    if (lastPlayed) {
      board.getCell(lastPlayed.prev).highlight(HighlightType.LastPlayed)
      board.getCell(lastPlayed).highlight(HighlightType.LastPlayed)
    }

    if (selectedPiece) {
      board.getCell(selectedPiece.prev).highlight(HighlightType.Selected)
    }


    for (let piece of board.blackPieces) {
      if (!piece.moving) piece.display();
    }
    for (let piece of board.whitePieces) {
      if (!piece.moving) piece.display();
    }

    let movingPiece = board.getMovingPiece();
    if (movingPiece) {
      movingPiece.x = p5.mouseX / span - 0.5
      movingPiece.y = p5.mouseY / span - 0.5
      movingPiece.display();
    }
  }

  p5.mousePressed = () => {
    if (!selectedPiece) {
      if (!board.getMovingPiece()) {
        let x = p5.floor(p5.mouseX / span)
        let y = p5.floor(p5.mouseY / span)
        let thisPiece = board.getAlivePiece(x, y)
        if (thisPiece && thisPiece.col == currentPlayer) {
          selectedPiece = thisPiece
          thisPiece.moving = true
          thisPiece.prev = p5.createVector(x, y)
        }
      }
    } else {
      let x = p5.floor(p5.mouseX / span)
      let y = p5.floor(p5.mouseY / span)
      let canPlay = selectedPiece.playMove(x, y)
      if (!(x == selectedPiece.prev.x && y == selectedPiece.prev.y) && canPlay) {
        selectedPiece.x = x
        selectedPiece.y = y
        lastPlayed = selectedPiece
        selectedPiece = null
        moves.push(lastMove(lastPlayed))
        MovesDiv.html(moves.toString())
        currentPlayer = currentPlayer == c.WHITE ? c.BLACK : c.WHITE
      } else {
        selectedPiece = null
      }
    }
  }

  p5.mouseReleased = () => {
    let movingP = board.getMovingPiece()
    if (movingP) {
      movingP.moving = false;
      let x = p5.floor(p5.mouseX / span)
      let y = p5.floor(p5.mouseY / span)
      let canPlay = movingP.playMove(x, y)
      if (!(x == movingP.prev.x && y == movingP.prev.y) && canPlay) {
        movingP.x = x
        movingP.y = y
        lastPlayed = movingP
        selectedPiece = null
        moves.push(lastMove(lastPlayed))
        MovesDiv.html(moves.toString())
        currentPlayer = currentPlayer == c.WHITE ? c.BLACK : c.WHITE
      } else {
        movingP.x = movingP.prev.x
        movingP.y = movingP.prev.y
      }
    }
  }
}

function lastMove(p: Piece): string {
  return p.piece + Files[p.x] + Ranks[p.y]
}

export default sketch

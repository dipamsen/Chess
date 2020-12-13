import * as p5 from "p5";
import Board from "./board";
import { Piece } from "./piece";
import {
  CellType,
  Dimensions as d,
  Files,
  HighlightType,
  Pieces as p,
  Players as c,
  Ranks,
} from "./constants";
import { Chess } from "chess.js";
import spritesheet from "./spritesheet";
import Cell from "./cell";

function sketch(p5: p5) {
  const sprites = {};
  const { Span: span, Rows: rows } = d;
  let board = new Board();
  let currentPlayer = c.WHITE;

  let selectedPiece: Piece = null;
  let lastPlayed: Piece = null;

  let MovesDiv: p5.Element;

  p5.preload = () => {
    for (let col of Object.values(c)) {
      sprites[col] = {};
      for (let piece of Object.values(p)) {
        let imgAdd = spritesheet[col][piece];
        sprites[col][piece] = p5.loadImage(imgAdd);
      }
    }
  };

  p5.setup = () => {
    p5.createCanvas(rows * span, rows * span).attribute(
      "oncontextmenu",
      "return false",
    );
    const cells: Cell[] = [];
    MovesDiv = p5.createDiv("Hi");
    let flag = CellType.LIGHT;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        cells.push(new Cell(Files[i] + Ranks[j], flag, p5, board));
        flag = flag == CellType.LIGHT ? CellType.DARK : CellType.LIGHT;
      }
      flag = flag == CellType.LIGHT ? CellType.DARK : CellType.LIGHT;
    }
    board.setup(p5, sprites, cells);
  };

  p5.draw = () => {
    p5.background(255);

    board.display();
    if (lastPlayed) {
      board.getCell(lastPlayed.prev).highlight(HighlightType.LastPlayed);
      board.getCell(lastPlayed).highlight(HighlightType.LastPlayed);
    }

    if (selectedPiece) {
      board.getCell(selectedPiece.prev).highlight(HighlightType.Selected);
    }

    for (let piece of board.blackPieces) {
      if (!piece.moving) piece.display();
    }
    for (let piece of board.whitePieces) {
      if (!piece.moving) piece.display();
    }

    if (selectedPiece) {
      board.game.moves({ verbose: true }).filter(m => m.from == selectedPiece.cell.cellName)
        .forEach(move => board.getCell(move.to).canBePlayed())
    }

    let movingPiece = board.getMovingPiece();
    if (movingPiece) {
      movingPiece.x = p5.mouseX / span - 0.5;
      movingPiece.y = p5.mouseY / span - 0.5;
      movingPiece.display();
    }
  };

  p5.mousePressed = () => {
    if (p5.mouseX > p5.width || p5.mouseY > p5.height) return
    console.dir(board.game)
    if (!selectedPiece) {
      if (!board.getMovingPiece()) {
        let x = p5.floor(p5.mouseX / span);
        let y = p5.floor(p5.mouseY / span);
        let thisPiece = board.getAlivePiece(x, y);
        if (thisPiece && thisPiece.col == currentPlayer) {
          selectedPiece = thisPiece;
          thisPiece.moving = true;
          thisPiece.prev = p5.createVector(x, y);
        }
      }
    } else {
      let x = p5.floor(p5.mouseX / span);
      let y = p5.floor(p5.mouseY / span);
      let played = playMove(selectedPiece, x, y);
      if (!played) {
        selectedPiece = board.getAlivePiece(x, y);
        if (selectedPiece && selectedPiece.col == currentPlayer)
          selectedPiece.moving = true;
        else selectedPiece = null
      }
    }
  };


  p5.mouseReleased = () => {
    let movingP = board.getMovingPiece();
    if (movingP) {
      movingP.moving = false;
      let x = p5.floor(p5.mouseX / span);
      let y = p5.floor(p5.mouseY / span);
      playMove(movingP, x, y);
    }
  };
  function playMove(pieceToMove: Piece, x: number, y: number): boolean {
    if (pieceToMove.col !== currentPlayer) return
    let canPlay = pieceToMove.playMove(x, y);
    if (!(x == pieceToMove.prev.x && y == pieceToMove.prev.y) && canPlay) {
      let enemyPiece = board.getAlivePiece(x, y);
      if (enemyPiece) enemyPiece.died();
      pieceToMove.x = x;
      pieceToMove.y = y;
      lastPlayed = pieceToMove;
      selectedPiece = null;
      board.playMove(lastPlayed, Boolean(enemyPiece));
      MovesDiv.html(board.toPGN());
      currentPlayer = currentPlayer == c.WHITE ? c.BLACK : c.WHITE;
      return true;
    } else {
      pieceToMove.x = pieceToMove.prev.x;
      pieceToMove.y = pieceToMove.prev.y;
      return false;
    }
  }
}

export default sketch;

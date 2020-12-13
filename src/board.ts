import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from "./piece";
import {
  BoardColors,
  Dimensions as d,
  Files,
  Pieces as p,
  Players as c,
  Ranks,
} from "./constants";
import * as p5 from "p5";
import Cell from "./cell";
import { Chess, ChessInstance } from "chess.js";
const { Rows: rows, Span: span } = d;

interface Vector {
  x: number;
  y: number;
}

class Board {
  whitePieces: Piece[] = [];
  blackPieces: Piece[] = [];
  pieces = {
    [c.WHITE]: this.whitePieces,
    [c.BLACK]: this.blackPieces,
  };
  cells: Cell[] = [];
  p5: p5;
  sprites: Object;
  game: ChessInstance;
  constructor() {
    this.game = new Chess();
  }
  addPiece(piece: Piece) {
    this.pieces[piece.col].push(piece);
  }
  setup(p5: p5, sprites: Object, cells: Cell[]) {
    this.p5 = p5;
    this.sprites = sprites;
    this.cells = cells;

    this.addPiece(new Rook(0, 7, c.WHITE, p5, sprites, this));
    this.addPiece(new Rook(7, 7, c.WHITE, p5, sprites, this));
    this.addPiece(new Knight(1, 7, c.WHITE, p5, sprites, this));
    this.addPiece(new Knight(6, 7, c.WHITE, p5, sprites, this));
    this.addPiece(new Bishop(2, 7, c.WHITE, p5, sprites, this));
    this.addPiece(new Bishop(5, 7, c.WHITE, p5, sprites, this));
    this.addPiece(new King(4, 7, c.WHITE, p5, sprites, this));
    this.addPiece(new Queen(3, 7, c.WHITE, p5, sprites, this));

    for (let i = 0; i < rows; i++) {
      this.addPiece(new Pawn(i, 6, c.WHITE, p5, sprites, this));
    }

    this.addPiece(new Rook(0, 0, c.BLACK, p5, sprites, this));
    this.addPiece(new Rook(7, 0, c.BLACK, p5, sprites, this));
    this.addPiece(new Knight(1, 0, c.BLACK, p5, sprites, this));
    this.addPiece(new Knight(6, 0, c.BLACK, p5, sprites, this));
    this.addPiece(new Bishop(2, 0, c.BLACK, p5, sprites, this));
    this.addPiece(new Bishop(5, 0, c.BLACK, p5, sprites, this));
    this.addPiece(new King(4, 0, c.BLACK, p5, sprites, this));
    this.addPiece(new Queen(3, 0, c.BLACK, p5, sprites, this));

    for (let i = 0; i < rows; i++) {
      this.addPiece(new Pawn(i, 1, c.BLACK, p5, sprites, this));
    }
  }
  display(): void {
    this.cells.forEach((cell) => cell.display());
  }
  getCell(vector: Vector): Cell;
  getCell(cellName: string): Cell;
  getCell(argument: Vector | string): Cell {
    let x: number, y: number
    if (typeof argument == 'string') {
      x = Files.indexOf(argument[0]);
      y = Ranks.indexOf(+argument[1]);
    }
    if (typeof argument == 'object') {
      x = argument.x
      y = argument.y
    }
    return this.cells[8 * x + y];
  }
  getAlivePiece(x: number, y: number): Piece {
    for (let piece of this.whitePieces) {
      if (piece.x == x && piece.y == y && piece.alive) return piece;
    }

    for (let piece of this.blackPieces) {
      if (piece.x == x && piece.y == y && piece.alive) return piece;
    }
  }
  getMovingPiece(): Piece {
    for (let piece of this.whitePieces) {
      if (piece.moving) return piece;
    }

    for (let piece of this.blackPieces) {
      if (piece.moving) return piece;
    }
  }
  playMove(piece: Piece, captured: boolean) {
    const from: any = Files[piece.prev.x] + Ranks[piece.prev.y].toString();
    const to: any = Files[piece.x] + Ranks[piece.y].toString();
    this.game.move(
      { from, to },
    );
  }
  toFEN() {
    return this.game.fen();
  }
  toPGN() {
    return this.game.pgn();
  }
}

export default Board;

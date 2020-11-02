import { Players as c, Pieces as p, Dimensions as d } from './constants'
import * as p5 from 'p5'
import Board from './board'

const { Rows: rows, Span: span } = d;
/** Main piece class */
export abstract class Piece {
  alive: Boolean = true
  moving: Boolean = false
  piece: string
  prev: p5.Vector
  constructor(
    public x: number,
    public y: number,
    public col: c,
    protected p5: p5,
    protected sprites: Object,
    protected board: Board
  ) { }
  display(): void {
    const { p5, sprites } = this
    if (this.alive) {
      p5.push();
      p5.imageMode(p5.CENTER);
      let w = span;
      if (this.moving) w = span * 1.2
      p5.tint(255);
      // if (this.selected) p5.tint(255, 0, 0)
      p5.image(sprites[this.col][this.piece], this.x * span + span / 2, this.y * span + span / 2, w, w)
      p5.pop();
    }
  }
  playMove(x: number, y: number): boolean {
    const board = this.board
    let pieceThere = board.getAlivePiece(x, y)
    if (pieceThere)
      if (pieceThere.col == this.col) return false
      else
        if (this.canKillTo(x, y)) {
          pieceThere.alive = false;
          return true
        }
        else return false;
    else
      if (this.canMoveTo(x, y)) return true;
      else return false
  }
  abstract canMoveTo(x: number, y: number): boolean
  abstract canKillTo(x: number, y: number): boolean
}


/** King Piece @extends Piece */
export class King extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.KING
  }
  canMoveTo(x: number, y: number) {
    return this.p5.abs(this.prev.x - x) <= 1 && this.p5.abs(this.prev.y - y) <= 1
  }
  canKillTo(x: number, y: number) {
    return this.p5.abs(this.prev.x - x) <= 1 && this.p5.abs(this.prev.y - y) <= 1
  }
}

/** Queen Piece @extends Piece */
export class Queen extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.QUEEN
  }
  canMoveTo(x: number, y: number) {
    return (this.p5.abs(this.prev.x - x) == this.p5.abs(this.prev.y - y)) || (this.prev.x == x || this.prev.y == y);
  }
  canKillTo(x: number, y: number) {
    return (this.p5.abs(this.prev.x - x) == this.p5.abs(this.prev.y - y)) || (this.prev.x == x || this.prev.y == y);
  }
}

/** Bishop Piece @extends Piece */
export class Bishop extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.BISHOP
  }
  canMoveTo(x: number, y: number) {
    return this.p5.abs(this.prev.x - x) == this.p5.abs(this.prev.y - y);
  }
  canKillTo(x: number, y: number) {
    return this.p5.abs(this.prev.x - x) == this.p5.abs(this.prev.y - y);
  }
}

/** Rook Piece @extends Piece */
export class Rook extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.ROOK
  }
  canMoveTo(x: number, y: number) {
    return this.prev.x == x || this.prev.y == y;
  }
  canKillTo(x: number, y: number) {
    return this.prev.x == x || this.prev.y == y;
  }
}

/** Pawn Piece @extends Piece */
export class Pawn extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.PAWN
  }
  get staryY() {
    return this.col == c.WHITE ? 6 : 1
  }
  get frontY() {
    return this.col == c.WHITE ? this.prev.y - 1 : this.prev.y + 1
  }
  get frontY2() {
    return this.col == c.WHITE ? this.prev.y - 2 : this.prev.y + 2
  }
  canMoveTo(x: number, y: number) {
    if (this.prev.x !== x) return false;
    else {
      if (y == this.frontY) return true
      else if (this.prev.y == this.staryY)
        if (y == this.frontY2) return true
        else return false
      else return false;
    }
  }
  canKillTo(x: number, y: number) {
    return (this.kills[0].x == x && this.kills[0].y == y) || (this.kills[1].x == x && this.kills[1].y == y);
  }
  get kills() {
    if (this.col == c.WHITE)
      return [{ x: this.prev.x + 1, y: this.prev.y - 1 }, { x: this.prev.x - 1, y: this.prev.y - 1 }]
    else
      return [{ x: this.prev.x + 1, y: this.prev.y + 1 }, { x: this.prev.x - 1, y: this.prev.y + 1 }]
  }
}

/** Knight Piece @extends Piece */
export class Knight extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.KNIGHT
  }
  get possibleMoves() {
    let { x, y } = this.prev;
    return [
      { x: x + 1, y: y + 2 },
      { x: x + 1, y: y - 2 },
      { x: x - 1, y: y + 2 },
      { x: x - 1, y: y - 2 },
      { x: x + 2, y: y + 1 },
      { x: x + 2, y: y - 1 },
      { x: x - 2, y: y + 1 },
      { x: x - 2, y: y - 1 },
    ];
  }
  canMoveTo(x: number, y: number) {
    for (let mov of this.possibleMoves)
      if (mov.x == x && mov.y == y) return true;
    return false
  }
  canKillTo(x: number, y: number) {
    for (let mov of this.possibleMoves)
      if (mov.x == x && mov.y == y) return true;
    return false
  }
}

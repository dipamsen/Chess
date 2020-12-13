import { Players as c, Pieces as p, Dimensions as d, Files, Ranks } from './constants'
import * as p5 from 'p5'
import Board from './board'

const { Rows: rows, Span: span } = d;
/** Main piece class */
export abstract class Piece {
  alive: boolean = true
  moving: boolean = false
  piece: string
  prev: p5.Vector
  constructor(
    public x: number,
    public y: number,
    public col: c,
    protected p5: p5,
    protected sprites: Object,
    protected board: Board
  ) {
    this.prev = p5.createVector(x, y)
  }
  display(): void {
    const { p5, sprites } = this
    if (this.alive) {
      p5.push();
      p5.imageMode(p5.CENTER);
      let w = span;
      if (this.moving) w = span * 1.2
      p5.image(sprites[this.col][this.piece], this.x * span + span / 2, this.y * span + span / 2, w, w)
      p5.pop();
    }
  }
  playMove(x: number, y: number): boolean {
    const board = this.board
    let pieceThere = board.getAlivePiece(x, y)
    if (pieceThere)
      if (pieceThere.col == this.col) return false
      else return this.canKillTo(x, y)
    else return this.canMoveTo(x, y)
  }
  get cell() {
    return this.board.getCell({ x: this.prev.x, y: this.prev.y })
  }
  canMoveTo(x: number, y: number): boolean {
    return this.board.game.moves({ verbose: true })
      .filter(m => m.from == this.cell.cellName && m.to == Files[x] + Ranks[y])
      .length > 0
  }
  canKillTo(x: number, y: number): boolean {
    return this.board.game.moves({ verbose: true })
      .filter(m => m.from == this.cell.cellName && m.to == Files[x] + Ranks[y] && m.captured)
      .length > 0
  }
  died() {
    this.alive = false
  }
}


/** King Piece @extends Piece */
export class King extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.KING
  }
}

/** Queen Piece @extends Piece */
export class Queen extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.QUEEN
  }
}

/** Bishop Piece @extends Piece */
export class Bishop extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.BISHOP
  }
}

/** Rook Piece @extends Piece */
export class Rook extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.ROOK
  }
}

/** Pawn Piece @extends Piece */
export class Pawn extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.PAWN
  }
}

/** Knight Piece @extends Piece */
export class Knight extends Piece {
  constructor(x: number, y: number, col: c, p5: p5, sprites: Object, board: Board) {
    super(x, y, col, p5, sprites, board);
    this.piece = p.KNIGHT
  }

}

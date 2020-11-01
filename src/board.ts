import { Piece, Rook, Knight, Bishop, King, Queen, Pawn } from './piece'
import { Players as c, Pieces as p, Dimensions as d, BoardColors } from './constants'
import * as p5 from 'p5'
const { Rows: rows, Span: span } = d;

class Board {
  whitePieces: Piece[] = []
  blackPieces: Piece[] = []
  pieces = {
    [c.WHITE]: this.whitePieces,
    [c.BLACK]: this.blackPieces
  }
  p5: p5
  sprites: Object
  addPiece(piece: Piece) {
    this.pieces[piece.col].push(piece)
  }
  setup(p5: p5, sprites: Object) {
    this.p5 = p5
    this.sprites = sprites

    this.addPiece(new Rook(0, 7, c.WHITE, p5, sprites, this))
    this.addPiece(new Rook(7, 7, c.WHITE, p5, sprites, this))
    this.addPiece(new Knight(1, 7, c.WHITE, p5, sprites, this))
    this.addPiece(new Knight(6, 7, c.WHITE, p5, sprites, this))
    this.addPiece(new Bishop(2, 7, c.WHITE, p5, sprites, this))
    this.addPiece(new Bishop(5, 7, c.WHITE, p5, sprites, this))
    this.addPiece(new King(4, 7, c.WHITE, p5, sprites, this))
    this.addPiece(new Queen(3, 7, c.WHITE, p5, sprites, this))

    for (let i = 0; i < rows; i++) {
      this.addPiece(new Pawn(i, 6, c.WHITE, p5, sprites, this))
    }

    this.addPiece(new Rook(0, 0, c.BLACK, p5, sprites, this))
    this.addPiece(new Rook(7, 0, c.BLACK, p5, sprites, this))
    this.addPiece(new Knight(1, 0, c.BLACK, p5, sprites, this))
    this.addPiece(new Knight(6, 0, c.BLACK, p5, sprites, this))
    this.addPiece(new Bishop(2, 0, c.BLACK, p5, sprites, this))
    this.addPiece(new Bishop(5, 0, c.BLACK, p5, sprites, this))
    this.addPiece(new King(4, 0, c.BLACK, p5, sprites, this))
    this.addPiece(new Queen(3, 0, c.BLACK, p5, sprites, this))

    for (let i = 0; i < rows; i++) {
      this.addPiece(new Pawn(i, 1, c.BLACK, p5, sprites, this))
    }
  }
  display(): void {
    let flag = "white";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        if (flag == c.BLACK) this.p5.fill(BoardColors.dark);
        else this.p5.fill(BoardColors.light);
        this.p5.noStroke();
        this.p5.rect(j * span, i * span, span, span);
        flag = flag == c.WHITE ? c.BLACK : c.WHITE
      }
      flag = flag == c.WHITE ? c.BLACK : c.WHITE
    }
  }
  getAlivePiece(x: number, y: number): Piece {
    for (let piece of this.whitePieces)
      if (piece.x == x && piece.y == y && piece.alive) return piece

    for (let piece of this.blackPieces)
      if (piece.x == x && piece.y == y && piece.alive) return piece
  }
  getMovingPiece(): Piece {
    for (let piece of this.whitePieces)
      if (piece.moving) return piece

    for (let piece of this.blackPieces)
      if (piece.moving) return piece
  }

}

export default Board
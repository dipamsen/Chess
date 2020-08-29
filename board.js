class Board {
  constructor() {
    /** @type {Piece[]} */
    this.whitePieces = [];
    /** @type {Piece[]} */
    this.blackPieces = [];
  }
  setup() {
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
  getPiece(x, y) {
    for (let piece of this.whitePieces)
      if (piece.x == x && piece.y == y) return piece

    for (let piece of this.blackPieces)
      if (piece.x == x && piece.y == y) return piece

    return null;
  }
  getMovingPiece() {
    for (let piece of this.whitePieces)
      if (piece.moving) return piece

    for (let piece of this.blackPieces)
      if (piece.moving) return piece

    return null;
  }
}
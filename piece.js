// Chess!

/** Main piece class */
class Piece {
  constructor(x, y, col) {
    col == c.WHITE ? whitePieces.push(this) : blackPieces.push(this)
    this.x = x;
    this.y = y;
    this.col = col;
    this.alive = true;
  }
  display() {
    push();
    imageMode(CENTER);
    image(sprites[this.col][this.piece], this.x * span + span / 2, this.y * span + span / 2, span, span)
    pop();
  }
}

/** King Piece @extends Piece */
class King extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.KING
  }
}

/** Queen Piece @extends Piece */
class Queen extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.QUEEN
  }
}

/** Bishop Piece @extends Piece */
class Bishop extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.BISHOP
  }
}

/** Rook Piece @extends Piece */
class Rook extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.ROOK
  }
}

/** Pawn Piece @extends Piece */
class Pawn extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.PAWN
  }
}

/** Knight Piece @extends Piece */
class Knight extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.KNIGHT
  }
}

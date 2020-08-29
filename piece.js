// Chess!

/** Main piece class */
class Piece {
  constructor(x, y, col) {
    (col == c.WHITE ? board.whitePieces : board.blackPieces).push(this)
    this.x = x;
    this.y = y;
    this.col = col;
    this.alive = true;
  }
  display() {
    if (this.alive) {
      push();
      imageMode(CENTER);
      let w = span;
      if (this.moving) w = span * 1.2
      image(sprites[this.col][this.piece], this.x * span + span / 2, this.y * span + span / 2, w, w)
      pop();
    }
  }
  playMove(x, y) {
    let pieceThere = board.getPiece(x, y)
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
}


/** King Piece @extends Piece */
class King extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.KING
  }
  canMoveTo(x, y) {
    return abs(this.prev.x - x) <= 1 && abs(this.prev.y - y) <= 1
  }
  canKillTo(x, y) {
    return abs(this.prev.x - x) <= 1 && abs(this.prev.y - y) <= 1
  }
}

/** Queen Piece @extends Piece */
class Queen extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.QUEEN
  }
  canMoveTo(x, y) {
    return (abs(this.prev.x - x) == abs(this.prev.y - y)) || (this.prev.x == x || this.prev.y == y);
  }
  canKillTo(x, y) {
    return (abs(this.prev.x - x) == abs(this.prev.y - y)) || (this.prev.x == x || this.prev.y == y);
  }
}

/** Bishop Piece @extends Piece */
class Bishop extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.BISHOP
  }
  canMoveTo(x, y) {
    return abs(this.prev.x - x) == abs(this.prev.y - y);
  }
  canKillTo(x, y) {
    return abs(this.prev.x - x) == abs(this.prev.y - y);
  }
}

/** Rook Piece @extends Piece */
class Rook extends Piece {
  constructor(...args) {
    super(...args);
    this.piece = p.ROOK
  }
  canMoveTo(x, y) {
    return this.prev.x == x || this.prev.y == y;
  }
  canKillTo() {
    return this.prev.x == x || this.prev.y == y;
  }
}

/** Pawn Piece @extends Piece */
class Pawn extends Piece {
  constructor(...args) {
    super(...args);
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
  canMoveTo(x, y) {
    if (this.prev.x !== x) return false;
    else {
      if (y == this.frontY) return true
      else if (this.prev.y == this.staryY)
        if (y == this.frontY2) return true
        else return false
      else return false;
    }
  }
  canKillTo(x, y) {
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
class Knight extends Piece {
  constructor(...args) {
    super(...args);
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
  canMoveTo(x, y) {
    for (let mov of this.possibleMoves)
      if (mov.x == x && mov.y == y) return true;
    return false
  }
  canKillTo(x, y) {
    for (let mov of this.possibleMoves)
      if (mov.x == x && mov.y == y) return true;
    return false
  }
}

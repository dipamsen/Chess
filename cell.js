// Because I don't have any work.
/** Cell Class */
class Cell {
  constructor(x, y, col) {
    this.color = col;
    this.x = x;
    this.y = y;
  }
  display() {
    if (this.color == c.BLACK) {
      fill('#B58863');
    } else if (this.color == c.WHITE) {
      fill('#F0D9B5');
    }
    noStroke();
    rect(this.x * span, this.y * span, span, span);
  }
}
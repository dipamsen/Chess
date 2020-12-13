import * as p5 from "p5";
import Board from "./board";
import {
  BoardColors,
  CellType,
  Dimensions,
  Files,
  HighlightType,
  Ranks,
} from "./constants";

const { Span: span } = Dimensions;
export default class Cell {
  constructor(
    public cellName: string,
    public cellType: CellType,
    private p5: p5,
    public board: Board
  ) { }
  get x() {
    return Files.indexOf(this.cellName[0]);
  }
  get y() {
    return Ranks.indexOf(+this.cellName[1]);
  }
  display(): void {
    const p5 = this.p5;
    p5.push();
    if (this.cellType == CellType.DARK) p5.fill(BoardColors.DARK);
    else p5.fill(BoardColors.LIGHT);
    p5.noStroke();
    p5.rect(this.x * span, this.y * span, span, span);
    p5.pop();
  }
  highlight(type: HighlightType): void {
    const p5 = this.p5;
    p5.push();
    switch (type) {
      case HighlightType.LastPlayed:
        if (this.cellType == CellType.LIGHT) {
          p5.fill(BoardColors.DARK_HIGHLIGHT);
        } else p5.fill(BoardColors.LIGHT_HIGHLIGHT);
        p5.noStroke();
        p5.rect(this.x * span, this.y * span, span, span);
        break;
      case HighlightType.Selected:
        p5.fill(BoardColors.CHOOSE);
        p5.noStroke();
        p5.rect(this.x * span, this.y * span, span, span);
        break;
    }
    p5.pop();
  }
  canBePlayed() {
    const { p5 } = this
    p5.push();
    p5.noStroke();
    p5.fill(0, 100);
    if (this.board.getAlivePiece(this.x, this.y)) {
      p5.translate(this.x * span, this.y * span)
      const s = 10
      p5.triangle(0, 0, s, 0, 0, s)
      p5.triangle(span, 0, span - s, 0, span, s)
      p5.triangle(span, span, span, span - s, span - s, span)
      p5.triangle(0, span, 0, span - s, s, span)
    } else {
      p5.ellipse(this.x * span + span / 2, this.y * span + span / 2, 20);
    }
    p5.pop();
  }
  mark(): void {
    const p5 = this.p5;
    p5.push();
    p5.noStroke();
    p5.fill(BoardColors.CHOOSE);
    p5.ellipse(this.x * span, this.y * span, 10);
    p5.pop();
  }
}

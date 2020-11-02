import * as p5 from 'p5'
import { CellType, BoardColors, Dimensions, HighlightType } from './constants'

const { Span: span } = Dimensions
export default class Cell {
  constructor(
    public x: number,
    public y: number,
    public cellType: CellType,
    private p5: p5
  ) { }
  display(): void {
    const p5 = this.p5;
    p5.push()
    if (this.cellType == CellType.DARK) p5.fill(BoardColors.DARK);
    else p5.fill(BoardColors.LIGHT);
    p5.noStroke();
    p5.rect(this.x * span, this.y * span, span, span);
    p5.pop()
  }
  highlight(type: HighlightType): void {
    const p5 = this.p5;
    p5.push()
    switch (type) {
      case HighlightType.LastPlayed:
        if (this.cellType == CellType.LIGHT) p5.fill(BoardColors.DARK_HIGHLIGHT);
        else p5.fill(BoardColors.LIGHT_HIGHLIGHT);
        break;
      case HighlightType.Selected:
        p5.fill(BoardColors.CHOOSE)
        break;
    }
    p5.noStroke()
    p5.rect(this.x * span, this.y * span, span, span)
    p5.pop()
  }
  mark(): void {
    const p5 = this.p5;
    p5.push()
    p5.noStroke()
    p5.fill(BoardColors.CHOOSE)
    p5.ellipse(this.x * span, this.y * span, 10)
    p5.pop()
  }
}
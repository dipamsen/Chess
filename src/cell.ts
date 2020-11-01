import * as p5 from 'p5'
import { CellType } from './constants'

export default class Cell {
  constructor(
    public x: number,
    public y: number,
    public cellType: CellType,
    private p5: p5
  ) { }

  display() {
    const p5 = this.p5;
    p5.push()

    p5.pop()
  }
}
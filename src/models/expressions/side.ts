import Expression from '.';
import { Point } from './point';

export class Side extends Expression {
  private readonly from: Point;
  private readonly to: Point;

  constructor(from: Point, to: Point) {
    super();
    this.from = from;
    this.to = to;
  }

  public get value(): string {
    return this.from.value + this.to.value;
  }
}

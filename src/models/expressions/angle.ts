import Expression from '.';
import { Point } from './point';

export class Angle extends Expression {
  private readonly left: Point;
  private readonly center: Point;
  private readonly right: Point;

  constructor(left: Point, center: Point, right: Point) {
    super();
    this.left = left;
    this.center = center;
    this.right = right;
  }

  public get value(): string {
    return this.right.value + this.center.value + this.right.value;
  }

  public toLabel(): string {
    return '∠' + this.value;
  }
}

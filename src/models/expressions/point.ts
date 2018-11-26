import Expression from '.';

export class Point extends Expression {
  private readonly point: string;

  constructor(point: string) {
    super();
    this.point = point;
  }

  public get value(): string {
    return this.point;
  }

  public toLabel(): string {
    return '点' + this.value;
  }
}

import Expression from '.';

export class Integer extends Expression {
  public readonly integer: number;

  constructor(integer: number) {
    super();
    this.integer = integer == null ? NaN : Number(integer);
  }

  public get value(): string | null {
    return Number.isNaN(this.integer) ? null : this.integer.toString();
  }
}

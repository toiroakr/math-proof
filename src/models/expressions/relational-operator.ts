import Expression from '.';

export class RelationalOperator extends Expression {
  private readonly operator: string;

  constructor(operator: string) {
    super();
    this.operator = operator;
  }

  public get value(): string {
    return this.operator;
  }
}

export const OPERATORS = {
  equation: new RelationalOperator('='),
  congruence: new RelationalOperator('≡'),
};

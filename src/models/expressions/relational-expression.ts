import Expression from '.';
import { RelationalOperator } from './relational-operator';

export class RelationalExpression extends Expression {
  private readonly operator: RelationalOperator;
  private readonly left: Expression;
  private readonly right: Expression;

  constructor(operator: RelationalOperator, left: Expression, right: Expression) {
    super();
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  public get value(): string {
    return this.left.value + this.operator.value + this.right.value;
  }
}

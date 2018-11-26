import Expression from '../expressions';
import { Integer } from '../expressions/integer';
import MathFunction, { InputField } from '.';

class Add extends MathFunction {
  public constructor() {
    super('足し算', ['1', '2'], ['3']);
  }

  public inputFields(): InputField[] {
    return [{
      type: 'number',
      initialValue: 0,
      expressionClass: Integer,
    }, {
      type: 'number',
      initialValue: 0,
      expressionClass: Integer,
    }];
  }

  public calculateOutput(input: Integer[]): Expression[] {
    if (!input || input.length < 2) {
      return [];
    }
    let sum = 0;
    for (const val of input) {
      if (Number.isNaN(val.integer)) {
        return [new Integer(NaN)];
      }
      sum += val.integer;
    }
    return [new Integer(sum)];
  }
}

export const ADD = new Add();

import Expression from '@/models/expressions';

export interface InputField {
  type: string;
  initialValue: any;
  expressionClass: any;
}

export default class MathFunction {
  public readonly functionName: string;
  public readonly inputPlaceholders: string[];
  public readonly outputPlaceholder: string[];

  protected constructor(functionName: string, inputPlaceholders: string[], outputPlaceholder: string[]) {
    this.functionName = functionName;
    this.inputPlaceholders = inputPlaceholders;
    this.outputPlaceholder = outputPlaceholder;
  }

  public inputFields(): InputField[] {
    return [];
  }

  public calculateOutput(input: Expression[]): Expression[] {
    return [];
  }
}

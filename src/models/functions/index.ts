import Expression from '@/models/expressions';

export default class MathFunction {
  public readonly functionName: string;
  public readonly inputPlaceholders: string[];
  public readonly outputPlaceholder: string[];

  protected constructor(functionName: string, inputPlaceholders: string[], outputPlaceholder: string[]) {
    this.functionName = functionName;
    this.inputPlaceholders = inputPlaceholders;
    this.outputPlaceholder = outputPlaceholder;
  }

  public calculateOutput(input: Expression[]): Expression[] {
    return [];
  }
}

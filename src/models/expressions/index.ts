export default class Expression {
  public get value(): string | null {
    return null;
  }

  public toLabel(): string | null {
    return this.value;
  }
}

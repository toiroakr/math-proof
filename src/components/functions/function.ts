import { Prop, Watch, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import mermaid from 'mermaid';

export default abstract class Function extends Vue {
  private static defineNodes(values: any[][]) {
    return _.join(values.map((value) => `${value[0]}( ${value[1]} )`), '\n');
  }

  private static defineInvalidNodeStyle(values: any[][]) {
    return _.join(values.filter((value) => !value[2]).map((value) => `style ${value[0]} fill:#eee`), '\n');
  }

  private static defineInputEdges(values: any[][], code: number) {
    return _.join(values.map((value) => `${value[0]} --> ${String.fromCharCode(code + 1)}`), '\n');
  }

  private static defineOutputEdges(values: any[][], code: number) {
    return _.join(values.map((value) => `${String.fromCharCode(code + 1)} --> ${value[0]}`), '\n');
  }

  @Prop()
  public input!: string[];
  public inputPlaceholder: string[] = [];
  public outputPlaceholder: string[] = [];

  protected functionName: string = 'function';

  abstract get calculateOutput(): string[];

  public updateGraph() {
    let code = 'A'.charCodeAt(0);
    let validInput = true;
    const input = this.inputPlaceholder.map((placeholder, index) => {
      const useInput = this.input.length > index && this.input[index].length > 0;
      validInput = validInput && useInput;
      return [String.fromCharCode(code++), useInput ? this.input[index] : placeholder, useInput];
    });
    const computedOutput = validInput ? this.calculateOutput : [];
    const output = this.outputPlaceholder.map((placeholder, index) => {
      const useInput = computedOutput.length > index && validInput;
      return [String.fromCharCode(code++), useInput ? computedOutput[index] : placeholder, useInput];
    });
    try {
      this.$el.textContent = `graph TD
${Function.defineNodes([...input, ...output])}
${String.fromCharCode(code + 1)}[ ${this.functionName} ]
${Function.defineInvalidNodeStyle([...input, ...output])}
${Function.defineInputEdges(input, code)}
${Function.defineOutputEdges(output, code)}`;
      mermaid.init(`#${this.id}`);
    } catch (e) {
      return;
    }
  }

  protected get id(): string {
    return `graph${(this as any)._uid}`;
  }

  @Watch('input', { immediate: true })
  private update() {
    if (this.$el) {
      this.$el.removeAttribute('data-processed');
    }
    this.updateGraph();
  }
}

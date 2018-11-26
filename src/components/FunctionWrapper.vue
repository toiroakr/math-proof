<template>
  <div :id="id"></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import mermaid from 'mermaid';
  import Expression from '@/models/expressions';
  import MathFunction from '@/models/functions';

  @Component
  export default class FunctionComponent extends Vue {
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
    public input!: Expression[];
    @Prop()
    public mathFunction!: MathFunction;

    public output: Expression[] = [];
    public inputPlaceholder: string[] = [];
    public outputPlaceholder: string[] = [];

    protected functionName: string = 'function';


    public updateGraph() {
      let code = 'A'.charCodeAt(0);
      let validInput = true;
      const input = this.inputPlaceholder.map((placeholder, index) => {
        const useInput = this.input.length > index && !!this.input[index].value;
        validInput = validInput && useInput;
        return [String.fromCharCode(code++), useInput ? this.input[index].value : placeholder, useInput];
      });
      const output = this.outputPlaceholder.map((placeholder, index) => {
        const useInput = this.output.length > index && validInput;
        return [String.fromCharCode(code++), useInput ? this.output[index].value : placeholder, useInput];
      });
      try {
        this.$el.textContent = `graph TD
${FunctionComponent.defineNodes([...input, ...output])}
${String.fromCharCode(code + 1)}[ ${this.functionName} ]
${FunctionComponent.defineInvalidNodeStyle([...input, ...output])}
${FunctionComponent.defineInputEdges(input, code)}
${FunctionComponent.defineOutputEdges(output, code)}`;
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
      this.updateOutput();
    }

    @Watch('mathFunction', { immediate: true })
    private initializeMathFunction() {
      this.functionName = this.mathFunction.functionName;
      this.inputPlaceholder = this.mathFunction.inputPlaceholders;
      this.outputPlaceholder = this.mathFunction.outputPlaceholder;
      this.updateOutput();
    }

    private updateOutput() {
      if (!this.input || !this.mathFunction) {
        return;
      }
      this.output = this.mathFunction.calculateOutput(this.input);
      this.updateGraph();
    }
  }

</script>

<style scoped lang="scss">
</style>

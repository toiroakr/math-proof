<template>
  <div>
    <div class="inputs">
      <input v-for="(input, index) in inputs" :type="input.type" v-model="inputModels[index]">
    </div>
    <div :id="id" ref="graph"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import mermaid from 'mermaid';
  import Expression from '@/models/expressions';
  import MathFunction, { InputField } from '@/models/functions';

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

    public inputs: InputField[] = [];
    public inputModels: any[] = [];

    @Prop()
    public mathFunction!: MathFunction;

    public output: Expression[] = [];
    public inputPlaceholder: string[] = [];
    public outputPlaceholder: string[] = [];

    protected functionName: string = 'function';

    public data() {
      const inputFields = (this.mathFunction as MathFunction).inputFields();
      return {
        inputs: inputFields,
        inputModels: inputFields.map((field) => field.initialValue),
      };
    }

    public mounted() {
      this.updateOutput();
    }

    public updateGraph() {
      let code = 'A'.charCodeAt(0);
      let validInput = true;
      const input = this.inputPlaceholder.map((placeholder, index) => {
        const value = new this.inputs[index].expressionClass(this.inputModels[index]).value;
        const useInput = this.inputs.length > index && !!value;
        validInput = validInput && useInput;
        return [String.fromCharCode(code++), useInput ? value : placeholder, useInput];
      });
      const output = this.outputPlaceholder.map((placeholder, index) => {
        const useInput = this.output.length > index && validInput;
        return [String.fromCharCode(code++), useInput ? this.output[index].value : placeholder, useInput];
      });
      try {
        (this.$refs.graph as HTMLElement).textContent = `graph TD
${FunctionComponent.defineNodes([...input, ...output])}
${String.fromCharCode(code + 1)}[ ${this.functionName} ]
${FunctionComponent.defineInvalidNodeStyle([...input, ...output])}
${FunctionComponent.defineInputEdges(input, code)}
${FunctionComponent.defineOutputEdges(output, code)}`;
        mermaid.init(`#${this.id}`);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    protected get id(): string {
      return `graph${(this as any)._uid}`;
    }

    @Watch('inputModels')
    private update() {
      if (this.$refs.graph) {
        (this.$refs.graph as HTMLElement).removeAttribute('data-processed');
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

    private mapInput() {
      return this.inputs.map((input, index) => new input.expressionClass(this.inputModels[index]));
    }

    private updateOutput() {
      if (!this.inputs || !this.mathFunction || !this.$refs.graph) {
        return;
      }
      this.output = this.mathFunction.calculateOutput(this.mapInput());
      this.updateGraph();
    }
  }

</script>

<style scoped lang="scss">
  .inputs {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      margin: 8px 8px;
    }
  }
</style>

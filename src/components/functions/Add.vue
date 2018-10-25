<template>
  <div :id="id"></div>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import Function from './function';

  @Component
  export default class Add extends Function {
    private created() {
      this.functionName = '足し算';
      this.inputPlaceholder = ['1', '2'];
      this.outputPlaceholder = ['3'];
    }

    get calculateOutput(): string[] {
      if (!this.input || this.input.length < 2) {
        return [];
      }
      let sum = 0;
      for (const val of this.input) {
        const num = parseInt(val, 10);
        if (Number.isNaN(num)) {
          return ['NaN'];
        }
        sum += num;
      }
      return [sum.toString()];
    }
  }
</script>

<style scoped lang="scss">
</style>

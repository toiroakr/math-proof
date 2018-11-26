<template>
  <div id="app">
    <input type="number" v-model="add[0]">
    <input type="number" v-model="add[1]">
    <FunctionComponent :mathFunction="mathFunction" :input="toExpressions(add)"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import FunctionComponent from './components/FunctionWrapper.vue';
  import { ADD } from './models/functions/add';
  import { Integer } from './models/expressions/integer';

  @Component({
    components: {
      FunctionComponent,
    },
  })
  export default class App extends Vue {
    private data() {
      return {
        mathFunction: ADD,
        add: [0, 0],
      };
    }

    private toExpressions(array: number[]): Integer[] {
      return array.map((val) => new Integer(Number.isNaN(val) ? NaN : val));
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  svg {
    user-select: none;
  }
</style>

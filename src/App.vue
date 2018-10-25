<template>
  <div id="app">
    <input type="number" v-model="add[0]">
    <input type="number" v-model="add[1]">
    <Add :input="toString(add)"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Add from './components/functions/Add.vue';

  @Component({
    components: {
      Add,
    },
  })
  export default class App extends Vue {
    private data() {
      return { add: [0, 0] };
    }

    private toString(array: number[]): string[] {
      return array.map((val) => val.toString());
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

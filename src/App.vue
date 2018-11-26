<template>
  <div id="app">
    <FunctionComponent :mathFunction="mathFunction"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import FunctionComponent from './components/FunctionWrapper.vue';
  import { ADD } from './models/functions/add';

  @Component({
    components: {
      FunctionComponent,
    },
  })
  export default class App extends Vue {
    private data() {
      return {
        mathFunction: ADD,
      };
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

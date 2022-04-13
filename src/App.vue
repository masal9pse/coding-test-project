<template>
  <div id="app">
    <chart-container />
  </div>
</template>

<script>
import ChartContainer from "./components/ChartContainer.vue";

export default {
  name: "App",
  components: {
    ChartContainer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

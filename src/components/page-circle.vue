<template>
  <div id="app">
    <h1>gallery</h1>
    <svg id="place" width="500" height="300"></svg>
  </div>
</template>

<script>
  export default {
    mounted: function() {
      console.log(this.$d3);
      this.$d3.select(this.$el).select('svg')
        .append('circle')
        .attr('cx', '250')
        .attr('cy', '150')
        .attr('r', '100')
    }
  }
</script>

<style>
  html,
  body {
  }
  .main-panel {
    width: 100%;
    /*position: absolute;*/
    z-index: 2;
  }
</style>

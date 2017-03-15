<template>
  <div id="app">
    <div class="container">
      <h1>gallery</h1>
      <b-button-group>
        <b-button @click="minusNode">
          <span class="fa fa-minus"></span>
        </b-button>
        <input type="text" class="form-control input-number" :value="nodes" min="1" max="100">
        <b-button @click="plusNode">
          <span class="fa fa-plus"></span>
        </b-button>
      </b-button-group>
    </div>
    <canvas id="place" width="600" height="400"></canvas>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        nodes: 80,
      }
    },
    mounted: function() {
      this.draw();
    },
    methods: {

      draw: function() { // {{{
        const d3 = this.$d3;
        //console.log(d3.voronoi());
        var img = new Image;
        img.src = "./harold.jpg";

        var canvas = d3.select("canvas").on("touchmove mousemove", moved).node(),
          context = canvas.getContext("2d"),
          width = canvas.width,
          height = canvas.height;

        var sites = d3.range(this.nodes)
          .map(function(d) { return [Math.random() * width, Math.random() * height]; });

        var voronoi = d3.voronoi()
          .extent([[-1, -1], [width + 1, height + 1]]);

        redraw();

        function moved() {
          sites[0] = d3.mouse(this);
          redraw();
        }

        function redraw() {
          var diagram = voronoi(sites),
            links = diagram.links(),
            polygons = diagram.polygons();


          context.clearRect(0, 0, width, height);
          context.beginPath();
          drawCell(polygons[0]);
          context.fillStyle = "#f00";
          context.fill();

          context.beginPath();
          for (var i = 0, n = polygons.length; i < n; ++i){
            drawCell(polygons[i]);
          }
          context.strokeStyle = "#00f";
          context.stroke();
        }

        function drawCell(cell) {
          context.save();
          if (!cell) return false;
          context.moveTo(cell[0][0], cell[0][1]);
          for (var j = 1, m = cell.length; j < m; ++j) {
            context.lineTo(cell[j][0], cell[j][1]);
          }
          context.closePath();
          context.clip();
          context.drawImage(img, cell[0][0] - 90, cell[0][1] - 115);
          context.stroke();
          context.restore();
          return true;
        }
      }, // }}}

      plusNode: function(){
        this.nodes+=20;
        this.draw();
      },

      minusNode: function(){
        this.nodes-=20;
        this.draw();
      }
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

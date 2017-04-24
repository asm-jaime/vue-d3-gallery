<template>
  <div id="app">
    <svg id="map">
    </svg>
  </div>
</template>

<script>
  export default
  {
    data()
    {
      return {
        nodes: 380,
        cities: [
        {
          city: "ZANZIBAR",
          code: "ZNZ",
          country: "TANZANIA",
          lat: "-6.13",
          lon: "39.31"
        },
        {
          city: "ZANZ",
          code: "ZNZ",
          country: "TANZANIA",
          lat: "-7.13",
          lon: "39.31"
        },
        {
          city: "ZANZIR",
          code: "ZNZ",
          country: "TANZANIA",
          lat: "-8.13",
          lon: "19.31"
        },
        {
          city: "ZANZR",
          code: "ZNZ",
          country: "TANZANIA",
          lat: "6.13",
          lon: "16.31"
        },
        {
          city: "ZANZAR",
          code: "ZNZ",
          country: "TANZANIA",
          lat: "8.13",
          lon: "19.31"
        }, ],
      }
    },
    ready: function() {},
    mounted: function()
    {
      window.addEventListener('resize', this.handleResize);
      this.draw();
    },
    methods:
    {
      handleResize: function()
      {
        this.draw();
      },

      draw: function()
      { // {{{
        const d3 = this.$d3;
        var width = 600,
          height = 400,
          rotate = 60,
          maxlat = 83; // clip northern and southern poles (infinite in mercator)
        var projection = d3.geoMercator()
          .rotate([rotate, 0])
          .scale(1) // we'll scale up to match viewport shortly.
          .translate([width / 2, height / 2]);
        // find the top left and bottom right of current projection
        function mercatorBounds(projection, maxlat)
        {
          var yaw = projection.rotate()[0],
            xymax = projection([-yaw + 180 - 1e-6, -maxlat]),
            xymin = projection([-yaw - 180 + 1e-6, maxlat]);
          return [xymin, xymax];
        }
        // set up the scale extent and initial scale for the projection
        var b = mercatorBounds(projection, maxlat),
          s = width / (b[1][0] - b[0][0]),
          scaleExtent = [s, 100 * s];

        projection.scale(scaleExtent[0]);
          //.translate([0, 0]) // not linked directly to projection
          //.scale(projection.scale())
        var zoom = d3.zoom()
          .scaleExtent(scaleExtent)
          .on("zoom", redraw);
        var path = d3.geoPath().projection(projection);

        var svg = d3.select('#map')
          .attr('width', width)
          .attr('height', height);

        d3.json("world-110m2.json", (error, world) =>
        {
          svg.selectAll("circle")
            .data(this.cities)
            .enter()
            .append("a")
            .attr("xlink:href", function(d)
            {
              return "https://www.google.com/search?q=" + d.city;
            })
            .append("circle")
            .attr("cx", function(d)
            {
              return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d)
            {
              return projection([d.lon, d.lat])[1];
            })
            .attr("r", 5)
            .style("fill", "red");

          svg.selectAll('path')
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append('path');
        });

        // track last translation and scale event we processed
        var tlast = [0, 0],
          slast = null;

        function redraw()
        {
          console.log("zoom zoom");
          //if (d3.event)
          //{
            console.log("d3.event");
            console.log(d3.event.transform);
            var scale = d3.event.transform.k,
              t = d3.event.transform;
            if (scale != slast)
            {
              console.log("scale != slast");
              projection.scale(scale);
            }
            else
            {
              var dx = t.x - tlast.x,
                dy = t.y - tlast.y,
                yaw = projection.rotate()[0],
                tp = projection.translate();
              // use x translation to rotate based on current scale
              projection.rotate([yaw + 360. * dx / width * scaleExtent[0] /
                scale, 0, 0
              ]);
              // use y translation to translate projection, clamped by min/max
              var b = mercatorBounds(projection, maxlat);
              if (b[0][1] + dy > 0) dy = -b[0][1];
              else if (b[1][1] + dy < height) dy = height - b[1][1];
              projection.translate([tp[0], tp[1] + dy]);
            }
            // save last values.
            slast = scale;
            tlast = t;
          //}
          svg.selectAll('path').attr('d', path);
          svg.selectAll("circle").attr("d", path.projection(projection));
        }
        svg.call(zoom);
      }, // }}}
    }
  }
</script>

<style>
  path {
    stroke: white;
    stroke-width: 0.25px;
    fill: grey;
  }
</style>

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
          { city: "ZANZIBAR", code: "ZNZ", country: "TANZANIA", lat: "-6.13", lon: "39.31" },
          { city: "ZANZ", code: "ZNZ", country: "TANZANIA", lat: "-7.13", lon: "39.31" },
          { city: "ZANZIR", code: "ZNZ", country: "TANZANIA", lat: "-8.13", lon: "19.31" },
          { city: "ZANZR", code: "ZNZ", country: "TANZANIA", lat: "6.13", lon: "16.31" },
          { city: "ZANZAR", code: "ZNZ", country: "TANZANIA", lat: "8.13", lon: "19.31" },
        ],
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
        const width = 960,
          height = 500;

        const projection = d3.geoMercator()
          .center([0, 5])
          .rotate([60, 0])
          .scale(200)
          .rotate([-180, 0])
          .translate([width / 2, height / 2]);

        const svg = d3.select("#map")
          .attr("width", width)
          .attr("height", height);

        const path = d3.geoPath()
          .projection(projection);

        const g = svg.append("g");

        d3.json("world-110m2.json", (error, topology) =>
        {
          g.selectAll("circle")
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

          g.selectAll("path")
            .data(topojson.feature(topology, topology.objects.countries)
              .features)
            .enter()
            .append("path")
            .attr("d", path)
        });

        // zoom and pan
        const zoom = d3.zoom()
          .on("zoom", function()
          {
            g.attr("transform", "translate(" +
              d3.event.transform.x + ',' + d3.event.transform.y +
              ")scale(" + d3.event.transform.k + ")");
            g.selectAll("circle").attr("d", path.projection(projection));
            g.selectAll("path").attr("d", path.projection(projection));
          });
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

<template>
  <div id="app">
    <div class="container">
      <section class="menu-gallery">
      <div class="container">page for show voronoi+image component</div>
      <label class="col-form-label col-sm-6">ctrl+v url</label>

        <div class="container">

        <b-button-group>

          <b-form-input
            v-model="srcImgInput"
            v-bind:style="styleURL"
            placeholder="url"
            type="text"
            :lazy-formatter="false"
            @input=""
            ></b-form-input>

          <b-button @click="loadImage">load picture</b-button>

        </b-button-group>


        <b-button-group>
          <b-button @click="minusNode">
            <span class="fa fa-minus"></span>
          </b-button>
          <input class="form-control input-normal text-center col"
                 style="max-width: 80px;"
            type="number"
            :value="nodes"
            :formatter="format"
          ></input>
          <b-button @click="plusNode">
            <span class="fa fa-plus"></span>
          </b-button>
        </b-button-group>

        <dropzone style="max-width: 218px;"
          id="myVueDropzone" url="https://httpbin.org/post"
          ref="myUniqueID"
          v-bind:thumbnailWidth="thumbnailWidth"
          v-bind:thumbnailHeight="thumbnailHeight"
          v-bind:useFontAwesome="useFontAwesome"
          v-bind:maxNumberOfFiles="maxNumberOfFiles"
        v-on:vdropzone-success="showSuccess"></dropzone>

      </div>
      </section>
    </div>
    <div class="container">
    <canvas id="place" width="600" height="480"></canvas>
    </div>
  </div>
</template>

<script>

  import Dropzone from 'vue2-dropzone'

  export default {
    components: {
      Dropzone
    },
    data() {
      const paramDropzone = {
        maxNumberOfFiles: 1,
        maxFileSizeInMB: 0.3,
        useFontAwesome: true,
        thumbnailWidth: 128,
        thumbnailHeight: 128,
      };
      return {
        ...paramDropzone,
        styleURL: { },
        nodes: 80,
        srcImgInput: "",
        srcImg: "https://raw.githubusercontent.com/asm-jaime/vue-d3-gallery/master/docs/harold.jpg",
        img: new Image,
        text: '',
      }
    },
    mounted: function() {
      const loaded = () => this.draw();
      this.img.src = this.srcImg;
      this.img.onload = loaded;
    },
    methods: {

      ImageExist: function(url) { // {{{
         const img = new Image();
         img.src = url;
         return img.height != 0;
      }, // }}}

      showSuccess: function (file) { // {{{
        const img = document.getElementsByTagName("img")[0];
        this.srcImgInput = img.alt;
        this.img.src = img.src;
        this.draw();
      }, // }}}

      loadImage: function() { // {{{
        console.log(this.$refs.myUniqueID.dropzone.options);
        if(this.ImageExist(this.srcImgInput)){
          const mockFile = { name: "some.jpg", size: 12345 };
          const dropzone = this.$refs.myUniqueID.dropzone;

          Object.assign(dropzone.options, this.paramDropzone);

          console.log('options: ', dropzone.options);
          dropzone.options.addedfile.call(dropzone, mockFile);
          dropzone.options.thumbnail.call(dropzone, mockFile, this.srcImgInput);

          mockFile.previewElement.classList.add('dz-success');
          mockFile.previewElement.classList.add('dz-complete');

          this.img.src = this.srcImgInput;
          this.draw();
        }else {
          this.styleURL = {
            background: '#F00',
            transitionProperty: 'background',
            transitionDuration: '0.6s',
          };
          setTimeout(()=>{this.styleURL = {
            background: '#FFF',
            transitionProperty: 'background',
            transitionDuration: '0.3s',
          };}, 600);
          console.log('img does not exist');
        };
      }, // }}}

      draw: function() { // {{{
        const d3 = this.$d3;
        const img = this.img;

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

          for (var i = 0, n = polygons.length; i < n; ++i){
            context.save();
            drawCell(polygons[i]);
            context.clip();
            context.drawImage(img, polygons[i].data[0]-64, polygons[i].data[1]-64);
            context.stroke();
            context.restore();
          }
          context.strokeStyle = "#00f";
          context.stroke();
        }

        function drawCell(cell) {
          if (!cell) return false;
          context.beginPath();
          context.moveTo(cell[0][0], cell[0][1]);
          for (var j = 1, m = cell.length; j < m; ++j) {
            context.lineTo(cell[j][0], cell[j][1]);
          }
          context.closePath();
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
  .menu-gallery{
    max-width: 600px;
    padding: 1.5rem;
    border: solid #f7f7f9;
  }
  </style>

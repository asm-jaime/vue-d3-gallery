<template>
  <div id="app">
    <div class="main-panel">
      <b-navbar toggleable type="inverse" variant="inverse" class="dvi-navbar collapse">
        <b-collapse isNav id="nav_collapse">
          <b-nav isNavBar>
            <router-link to="/">
              <b-nav-item>main</b-nav-item>
            </router-link>
            <router-link to="/circle">
              <b-nav-item>circle</b-nav-item>
            </router-link>
            <router-link to="/voronoi">
              <b-nav-item>voronoi</b-nav-item>
            </router-link>
            <router-link to="/img-voronoi">
              <b-nav-item>img-voronoi</b-nav-item>
            </router-link>
            <router-link to="/map">
              <b-nav-item>map</b-nav-item>
            </router-link>
            <router-link to="/world-map">
              <b-nav-item>world map</b-nav-item>
            </router-link>
          </b-nav>
        </b-collapse>
      </b-navbar>
    </div>
  <router-view class="view"></router-view>
  </div>
</template>

<script>
  export default {
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

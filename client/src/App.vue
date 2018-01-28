<template>
  <div id="app">
    <el-container v-if="!isHomePagePath">
      <el-header class="panel-head">
        <panel-head></panel-head>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <panel-menu></panel-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <router-view v-if="isHomePagePath"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  import env from '@/config/env';
  import string from '@/util/string';
  import common from "@/util/common";
  import panelHead from "@/components/head";
  import panelMenu from "@/components/menu";

  export default {
    components: {
      panelHead,
      panelMenu
    },
    computed: mapGetters([]),
    data() {
      return {
        isHomePagePath: true
      };
    },
    watch: {
      "$route": ["init"]
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let self = this;
        self.isHomePagePath = self.$route.name == env.homePagePath;
      }
    }
  }
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
   */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;

    -webkit-user-select: none;
  }

  span {
    vertical-align: top;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input, button, select, textarea {
    outline: none
  }

  .panel-head {
    padding: 0;
    margin: 0;
  }

  .form {
    margin-top: 20px;
  }

  .form .row {
  }

  .form .row .col {
    width: 30%;
  }

  .grid {
    width: 99%;
  }
</style>

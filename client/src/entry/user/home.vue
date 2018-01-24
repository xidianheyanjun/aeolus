<template>
  <div>
    <panel-head></panel-head>
    <el-tabs value="homePage" :tab-position="tabPosition" :style="{height:leftBarHeight+'px'}">
      <el-tab-pane name="homePage" label="主页">
        <home-page></home-page>
      </el-tab-pane>
      <el-tab-pane name="datasource" label="数据源管理">
        <datasource></datasource>
      </el-tab-pane>
      <el-tab-pane name="dataset" label="数据集管理">
        <dataset></dataset>
      </el-tab-pane>
      <el-tab-pane name="menuset" label="菜单管理">
        <menuset></menuset>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  import panelHead from "@/components/head";
  import homePage from "@/components/homePage";
  import datasource from "@/components/datasource";
  import dataset from "@/components/dataset";
  import menuset from "@/components/menuset";
  import env from '@/config/env';
  import string from '@/util/string';
  import common from "@/util/common";

  export default {
    components: {
      panelHead,
      homePage,
      datasource,
      dataset,
      menuset
    },
    computed: mapGetters([]),
    data() {
      return {
        tabPosition: "left",
        leftBarHeight: document.documentElement.clientHeight - 85
      };
    },
    mounted() {
      let self = this;
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

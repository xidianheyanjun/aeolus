<template>
  <div>
    <el-menu default-active="1" @select="clickLeftMenu" theme="dark" background-color="#545c64"
             text-color="#fff" active-text-color="#ffd04b" class="left-menu">
      <el-menu-item v-for="menu in leftMenu" :key="menu.label" :index="menu.index">{{menu.label}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  import env from '@/config/env';
  import string from '@/util/string';
  import common from "@/util/common";

  export default {
    components: {},
    computed: mapGetters([]),
    data() {
      return {
        leftMenu: [{
          index: "/user/home",
          label: "主页"
        }, {
          index: "/datasource/index",
          label: "数据源管理"
        }, {
          index: "/dataset/index",
          label: "数据集管理"
        }]
      };
    },
    mounted() {
      let self = this;
    },
    methods: {
      clickLeftMenu(index) {
        console.log(index);
        this.$router.push({path: index});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left-menu {
    display: inline-block;
    width: 200px;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
  }
</style>

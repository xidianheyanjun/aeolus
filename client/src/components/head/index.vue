<template>
  <div class="panel">
    <el-button @click="logout" size="small" type="primary" round icon="el-icon-arrow-right">退出系统</el-button>
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
      return {};
    },
    mounted() {
      let self = this;
    },
    methods: {
      logout() {
        // 退出系统成功以后清除缓存并跳转到登录页 todo

        this.$router.push({path: "/home/index"});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel {
    background-color: #333333;
    text-align: right;
    height: 80px;
    line-height: 80px;
  }
</style>

<template>
  <div>
    <el-form :label-position="labelPosition" class="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="acc"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="psw"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="validCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" round type="primary">登录</el-button>
        <el-button @click="go2register" round>注册</el-button>
      </el-form-item>
    </el-form>
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
        labelPosition: "right",
        acc: "",
        psw: "",
        validCode: ""
      };
    },
    mounted() {
      let self = this;
    },
    methods: {
      login() {
        // 校验通过进入主页 todo

        this.$router.push({path: "/user/home"});
      },
      go2register() {
        this.$router.push({path: "/home/register"});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form {
    margin: 200px auto;
    width: 300px;
  }
</style>

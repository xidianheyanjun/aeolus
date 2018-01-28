<template>
  <div>
    <el-form :label-position="labelPosition" size="small" inline class="form" label-width="70px">
      <div class="row">
        <el-form-item class="col" label="主机">
          <el-input v-model="saveInfo.ip"></el-input>
        </el-form-item>
        <el-form-item class="col" label="端口">
          <el-input v-model="saveInfo.port"></el-input>
        </el-form-item>
        <el-form-item class="col" label="用户名">
          <el-input v-model="saveInfo.acc"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item class="col" label="密码">
          <el-input v-model="saveInfo.psw"></el-input>
        </el-form-item>
        <el-form-item class="col" label="数据库名">
          <el-input v-model="saveInfo.db_name"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item class="col">
          <div class="row">
            <el-button @click="save" round type="primary" size="small">保存</el-button>
            <el-button @click="back" round type="primary" size="small">返回</el-button>
          </div>
        </el-form-item>
      </div>
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
        saveInfo: {
          ip: "",
          port: "",
          acc: "",
          psw: "",
          db_name: ""
        },
        id: 0,
        operate: ""
      };
    },
    mounted() {
      let self = this;
      self.id = parseInt(self.$route.query.id);
      self.operate = self.id > 0 ? "update" : "create";
      if (self.operate == "update") {
        self.queryData(self.id);
      }
    },
    methods: {
      queryData(id) {
        let self = this;
        self.$sendRequest({
          url: string.format(env.resource.queryData, {module: "datasource", id: id})
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            return false;
          }

          self.saveInfo.ip = data.data.ip;
          self.saveInfo.port = data.data.port;
          self.saveInfo.acc = data.data.acc;
          self.saveInfo.psw = data.data.psw;
          self.saveInfo.db_name = data.data.db_name;
        }, (err) => {
          console.log("datasource save", err);
        });
      },
      save() {
        let self = this;
        self.$sendRequest({
          url: self.operate == "update" ? string.format(env.resource.update, {
            module: "datasource",
            id: self.id
          }) : string.format(env.resource.save, {module: "datasource"}),
          params: {
            saveInfo: self.saveInfo
          }
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            return false;
          }

          self.$message("保存成功");
          self.back();
        }, (err) => {
          console.log("datasource save", err);
        });
      },
      back() {
        window.history.back();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

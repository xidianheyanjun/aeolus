<template>
  <div>
    <el-form :label-position="labelPosition" size="small" inline class="form" label-width="70px">
      <div class="row">
        <el-form-item class="col" label="数据源">
          <el-input v-model="saveInfo.ds_id"></el-input>
        </el-form-item>
        <el-form-item class="col" label="名称">
          <el-input v-model="saveInfo.title"></el-input>
        </el-form-item>
        <el-form-item class="col" label="表名">
          <el-input v-model="saveInfo.name"></el-input>
        </el-form-item>
      </div>
      <div class="row">
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
          ds_id: "",
          title: "",
          name: "",
          columns: []
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
          url: string.format(env.resource.queryData, {module: "dataset", id: id})
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            return false;
          }
        }, (err) => {
          console.log("dataset save", err);
        });
      },
      save() {
        let self = this;
        self.$sendRequest({
          url: self.operate == "update" ? string.format(env.resource.update, {
            module: "dataset",
            id: self.id
          }) : string.format(env.resource.save, {module: "dataset"}),
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
          console.log("dataset save", err);
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

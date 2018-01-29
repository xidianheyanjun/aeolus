<template>
  <div>
    <el-form :label-position="labelPosition" size="small" inline class="form" label-width="70px">
      <div class="row">
        <el-form-item class="col" label="数据源">
          <el-select v-model="saveInfo.ds_id" placeholder="请选择">
            <el-option v-for="item in dsList" :key="item.id" :label="item.db_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="col" label="名称">
          <el-input v-model="saveInfo.title"></el-input>
        </el-form-item>
        <el-form-item class="col" label="表名">
          <el-input v-model="saveInfo.name"></el-input>
        </el-form-item>
      </div>
      <el-card class="box-card panel-card">
        <el-form-item class="col" label="字段代码">
          <el-input v-model="tpl.code"></el-input>
        </el-form-item>
        <el-form-item class="col" label="字段名称">
          <el-input v-model="tpl.name"></el-input>
        </el-form-item>
        <el-form-item class="col" label="字段类型">
          <el-select v-model="tpl.kind" placeholder="请选择">
            <el-option v-for="item in kindList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="tpl.kind=='radio' || tpl.kind=='checkbox'" class="col" label="字段选项">
          <el-input type="textarea" v-model="tpl.options"
                    placeholder="单选或多选时配置,格式:key$value|key$value"></el-input>
        </el-form-item>
      </el-card>
      <div class="row">
        <el-form-item class="col">
          <div class="row">
            <el-button @click="add" round type="primary" size="small">添加</el-button>
            <el-button @click="save" round type="primary" size="small">保存</el-button>
            <el-button @click="back" round type="primary" size="small">返回</el-button>
          </div>
        </el-form-item>
      </div>
      <el-card v-for="col in colList" :key="col.t" class="box-card panel-card">
        <el-form-item class="col" label="字段代码">
          <el-input v-model="col.code"></el-input>
        </el-form-item>
        <el-form-item class="col" label="字段名称">
          <el-input v-model="col.name"></el-input>
        </el-form-item>
        <el-form-item class="col" label="字段类型">
          <el-select v-model="col.kind" placeholder="请选择">
            <el-option v-for="item in kindList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="col.kind=='radio' || col.kind=='checkbox'" class="col" label="字段选项">
          <el-input type="textarea" v-model="col.options"
                    placeholder="单选或多选时配置,格式:key$value|key$value"></el-input>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  import env from '@/config/env';
  import string from '@/util/string';
  import common from "@/util/common";
  import keyValMap from "@/util/keyValMap";

  export default {
    components: {},
    computed: mapGetters([]),
    data() {
      return {
        labelPosition: "right",
        dsList: [],
        kindList: keyValMap.kindList,
        colList: [],
        tpl: {
          code: "",
          name: "",
          kind: "",
          options: "",
          t: Date.now()
        },
        saveInfo: {
          ds_id: "",
          title: "",
          name: ""
        },
        id: 0,
        operate: ""
      };
    },
    mounted() {
      let self = this;
      self.queryDatasource();
      self.id = parseInt(self.$route.query.id);
      self.operate = self.id > 0 ? "update" : "create";
      if (self.operate == "update") {
        self.queryData(self.id);
      }
    },
    methods: {
      queryDatasource(){
        let self = this;
        self.$sendRequest({
          url: env.resource.queryDatasource
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            return false;
          }

          self.dsList = data.dsList;
        }, (err) => {
          console.log("datasource query", err);
        });
      },
      queryData(id) {
        let self = this;
        self.$sendRequest({
          url: string.format(env.resource.queryData, {module: "dataset", id: id})
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            self.back();
            return false;
          }

          self.saveInfo = {
            ds_id: data.dataset.ds_id,
            title: data.dataset.title,
            name: data.dataset.name
          };
          self.colList = data.colList;
        }, (err) => {
          console.log("dataset query", err);
        });
      },
      add(){
        let self = this;
        self.colList.unshift(Object.assign({}, self.tpl));
        self.tpl = {
          code: "",
          name: "",
          kind: "",
          options: "",
          t: Date.now()
        };
      },
      save() {
        let self = this;
        if (!self.saveInfo.ds_id) {
          self.$message("请选择数据源");
          return false;
        }
        if (!self.saveInfo.title) {
          self.$message("请输入数据集名称");
          return false;
        }
        if (!self.saveInfo.name) {
          self.$message("请输入表名");
          return false;
        }
        if (self.colList.length == 0) {
          self.$message("请添加字段信息");
          return false;
        }
        let sendColList = [];
        for (let m = 0; m < self.colList.length; ++m) {
          let col = self.colList[m];
          if (!col["code"] && !col["name"] && !col["kind"]) {
            continue;
          }
          sendColList.push(self.colList[m]);
        }
        if (sendColList.length == 0) {
          self.$message("字段信息不能全为空");
          return false;
        }
        self.$sendRequest({
          url: self.operate == "update" ? string.format(env.resource.update, {
            module: "dataset",
            id: self.id
          }) : string.format(env.resource.save, {module: "dataset"}),
          params: {
            saveInfo: self.saveInfo,
            colList: JSON.stringify(sendColList)
          }
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            return false;
          }

          self.$message("保存成功");
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
  .panel-card {
    margin: 20px 0;
  }
</style>

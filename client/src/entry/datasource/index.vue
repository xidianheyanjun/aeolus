<template>
  <div>
    <el-form :label-position="labelPosition" size="small" inline class="form" label-width="70px">
      <div class="row">
        <el-form-item class="col" label="标识">
          <el-input v-model="id"></el-input>
        </el-form-item>
        <el-form-item class="col" label="主机">
          <el-input v-model="ip"></el-input>
        </el-form-item>
        <el-form-item class="col" label="端口">
          <el-input v-model="port"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item class="col" label="用户名">
          <el-input v-model="acc"></el-input>
        </el-form-item>
        <el-form-item class="col" label="密码">
          <el-input v-model="psw"></el-input>
        </el-form-item>
        <el-form-item class="col" label="数据库名">
          <el-input v-model="db_name"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <grid :gridOption="gridOption" class="grid"></grid>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  import env from '@/config/env';
  import string from '@/util/string';
  import common from "@/util/common";
  import grid from "@/components/grid";

  export default {
    components: {
      grid
    },
    computed: mapGetters([]),
    data() {
      let self = this;
      return {
        labelPosition: "right",
        id: "",
        ip: "",
        port: "",
        acc: "",
        psw: "",
        db_name: "",
        gridOption: {
          module: "datasource",
          params: () => {
            return {
              id: self.id,
              ip: self.ip,
              port: self.port,
              acc: self.acc,
              psw: self.psw,
              db_name: self.db_name
            };
          },
          gridColModel: [{
            code: "id",
            label: "标识",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }, {
            code: "ip",
            label: "主机",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }, {
            code: "port",
            label: "端口",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }, {
            code: "acc",
            label: "用户名",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }, {
            code: "psw",
            label: "密码",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }, {
            code: "db_name",
            label: "数据库名",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }],
          gridData: [],
          page: {
            size: 20
          }
        }
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

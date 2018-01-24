<template>
  <div>
    <el-form :label-position="labelPosition" size="small" inline class="form" label-width="70px">
      <div class="row">
        <el-form-item class="col" label="标识">
          <el-input v-model="id"></el-input>
        </el-form-item>
        <el-form-item class="col" label="主机">
          <el-input v-model="host"></el-input>
        </el-form-item>
        <el-form-item class="col" label="端口">
          <el-input v-model="port"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item class="col" label="用户名">
          <el-input v-model="user"></el-input>
        </el-form-item>
        <el-form-item class="col" label="密码">
          <el-input v-model="psw"></el-input>
        </el-form-item>
        <el-form-item class="col" label="数据库名">
          <el-input v-model="db"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item>
          <el-button @click="query" round type="primary">查询</el-button>
          <el-button @click="create" round type="primary">新增</el-button>
          <el-button @click="update" round type="primary">修改</el-button>
          <el-button @click="remove" round type="primary">刪除</el-button>
          <el-button @click="exportCurrentPage" round type="primary">导出本页</el-button>
          <el-button @click="exportAll" round type="primary">导出全部</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="tableData" border stripe size="small" tooltip-effect="dark"
              @selection-change="handleSelectionChange" class="table">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="标识"></el-table-column>
      <el-table-column prop="host" label="主机"></el-table-column>
      <el-table-column prop="port" label="端口"></el-table-column>
      <el-table-column prop="user" label="用户名"></el-table-column>
      <el-table-column prop="psw" label="密码"></el-table-column>
      <el-table-column prop="db" label="数据库名"></el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="page.no" :page-size="page.size"
                   layout="total, prev, pager, next, jumper" :page-count="page.totalNum">
    </el-pagination>
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
        id: "",
        host: "",
        port: "",
        user: "",
        psw: "",
        db: "",
        tableData: [],
        page: {
          size: 20,
          no: 0,
          totalPage: 0,
          totalNum: 0
        }
      };
    },
    mounted() {
      let self = this;
    },
    methods: {
      query() {
      },
      create() {
      },
      update() {
      },
      remove() {
      },
      exportCurrentPage() {
      },
      exportAll() {
      },
      handleSelectionChange(val) {
        console.log(val);
        // this.multipleSelection = val;
      },
      handleCurrentChange(pageCurrent) {
        // this.query(pageCurrent);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form {
    margin-top: 20px;
  }

  .form .row {
  }

  .form .row .col {
    width: 30%;
  }

  .table {
    width: 99%;
  }
</style>

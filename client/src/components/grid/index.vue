<template>
  <div>
    <div class="row">
      <el-button @click="query" round type="primary" size="small">查询</el-button>
      <el-button @click="create" round type="primary" size="small">新增</el-button>
      <el-button @click="update" round type="primary" size="small">修改</el-button>
      <el-button @click="remove" round type="primary" size="small">刪除</el-button>
      <el-button @click="exportCurrentPage" round type="primary" size="small">导出本页</el-button>
      <el-button @click="exportAll" round type="primary" size="small">导出全部</el-button>
    </div>
    <el-table :data="gridData" border stripe size="small" tooltip-effect="dark"
              @selection-change="handleSelectionChange" class="table">
      <el-table-column type="selection"></el-table-column>
      <el-table-column v-for="colModel in gridColModel" :key="colModel.code" :prop="colModel.code"
                       :label="colModel.label" :formatter="colModel.formatter"></el-table-column>
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
    props: {
      gridOption: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        module: "",
        params() {
          return {};
        },
        gridColModel: [],
        gridData: [],
        page: {
          size: 20,
          no: 0,
          totalPage: 0,
          totalNum: 0
        },
        multipleSelection: [],
        isFirst: true
      };
    },
    mounted() {
      let self = this;
      self.module = self.gridOption.module;
      self.params = self.gridOption.params || self.params;
      self.gridColModel = self.gridOption.gridColModel;
      self.gridData = self.gridOption.gridData;
      common.extend(self.gridOption.page, {no: 1});
      common.extend(self.page, self.gridOption.page);
    },
    methods: {
      query(pageNo) {
        let self = this;
        let params = {};
        params.biz = self.params() || {};
        params.page = {
          size: self.page.size,
          no: self.page.no
        };
        self.$sendRequest({
          url: string.format(env.resource.pageQuery, {module: self.module}),
          params: params
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            return false;
          }
          self.multipleSelection = [];
          self.gridData = data.grid.data;
          self.page.totalPage = data.grid.page.totalPage;
          self.page.totalNum = data.grid.page.totalNum;
          self.page.no = data.grid.page.no;
        }, (err) => {
          console.log("grid query", err);
        });
      },
      create() {
        let self = this;
        self.$router.push({path: "/" + self.module + "/edit"});
      },
      update() {
        let self = this;
        if (self.multipleSelection.length != 1) {
          self.$message("请选择一行");
          return false;
        }
        self.$router.push({path: "/" + self.module + "/edit", query: {id: self.multipleSelection[0].id}});
      },
      remove() {
        let self = this;
        console.log(self.multipleSelection);
        if (self.multipleSelection.length < 1) {
          self.$message("请选择一行");
          return false;
        }
        self.$sendRequest({
          url: string.format(env.resource.gridRemove, {module: self.module}),
          params: {
            removeData: self.multipleSelection
          }
        }).then((data) => {
          if (data.code != "success") {
            self.$message(data.msg);
            return false;
          }
          self.$message("删除成功");
          self.query(self.page.no);
        }, (err) => {
          console.log("grid query", err);
        });
      },
      exportCurrentPage() {
      },
      exportAll() {
      },
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      handleCurrentChange(pageCurrent) {
        let self = this;
        console.log(pageCurrent, self.page.totalPage, self.isFirst);
        if (!self.isFirst && (pageCurrent < 1 || pageCurrent > self.page.totalPage)) {
          return false;
        }
        self.isFirst = false;
        this.query(pageCurrent);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table {
    margin-top: 20px;
  }
</style>

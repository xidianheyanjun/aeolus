<template>
  <div>
    <el-form :label-position="labelPosition" size="small" inline class="form" label-width="70px">
      <div class="row">
        <el-form-item class="col" label="标识">
          <el-input v-model="id"></el-input>
        </el-form-item>
        <el-form-item class="col" label="名称">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item class="col" label="表名">
          <el-input v-model="name"></el-input>
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
        title: "",
        name: "",
        gridOption: {
          module: "dataset",
          params: () => {
            return {
              id: self.id,
              title: self.title,
              name: self.name
            };
          },
          gridColModel: [{
            code: "id",
            label: "标识",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }, {
            code: "title",
            label: "名称",
            formatter: (row, column, cellValue) => {
              return cellValue;
            }
          }, {
            code: "name",
            label: "表名",
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

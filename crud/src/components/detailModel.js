module.exports = function render (name) {
  return `
<!--
  组件名称：详情
  -->
<template>
  <el-dialog :title="title"
             :visible.sync="visible"
             append-to-body
             width="40%">
    <!-- 详情信息  -->
    <el-form label-width="80px" v-loading="viewloading">
      <el-form-item label="姓名">{{ dataObj.name }}</el-form-item>
    </el-form>
    <!-- 关联的数据 -->
    <cascade-view :categoryId="dataObj.categoryId"></cascade-view>
    <!-- 详情信息  -->
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import crudModelMixin from '@/mixins/crudModelMixin'
import CascadeView from './cascade/index'
export default {
  name: 'CrudAddOrEditModel',
  mixins: [crudModelMixin],
  components: {
    CascadeView
  },
  data () {
    return {
      detailUrl: this.api.getProductById,
      dataObj: {
        name: ''
      }
    }
  },
  methods: {
    loadSuccess (res, callback) {
      this.dataObj = Object.assign({}, res.result)
      callback()
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-form {
    width: 90%;
  }
</style>
`
}

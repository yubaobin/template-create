<!--
  组件名称：${name}
  -->
<template>
  <div>
    <table-panel ref="table" selectType="select"
                 :page="tableConfig.page"
                 :response="tableConfig.response"
                 :url="tableUrl"
                 :successCode="tableConfig.successCode"
                 @selectChange="selectChange">
      <template v-slot:search-tool>
        <el-form inline>
          <el-form-item label="名字"><el-input v-model="query.productVo.name" clearable></el-input></el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form>
      </template>
      <template v-slot:opr-tool>
        <el-button type="primary" @click="addItem">新增</el-button>
        <el-dropdown style="margin-left: 8px;"
                     v-show="selectRows.length"
                     @command="selectBatch"
                     placement="bottom">
                  <el-button>
                    批量操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
        </el-dropdown>
      </template>
      <!-- 列信息  -->
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="身价" align="center" prop="price"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template v-slot="{ row }">
          <el-button type="text" @click.stop="viewItem(row)">查看</el-button>
          <el-button type="text" @click.stop="editItem(row)">编辑</el-button>
          <el-button class="f-danger" type="text" @click.stop="deleteItem(row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- 列信息 end  -->
    </table-panel>
    <add-or-edit-model ref="addOrEditModel" @on-success="handleAddOrEditSuccess"></add-or-edit-model>
    <detail-model ref="detailModel"></detail-model>
  </div>
</template>
<script>
import TablePanel from 'components/TablePanel'
import tableConfigMixin from '@/mixins/tableConfigMixin'
import AddOrEditModel from './addOrEditModel'
import DetailModel from './detailModel'
export default {
  name: 'CrudTemplate',
  mixins: [tableConfigMixin],
  components: {
    TablePanel,
    AddOrEditModel,
    DetailModel
  },
  data () {
    return {
      tableUrl: this.api.tableUrl,
      deleteUrl: this.api.deleteUrl,
      deleteBatchUrl: this.api.deleteBatchUrl,
      query: {
        productVo: {
          name: ''
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.search()
    })
  },
  methods: {
    selectBatch (command) {
      switch (command) {
        case 'delete':
          this.deleteBatch()
          break
      }
    },
    handleAddOrEditSuccess (type) {
      this.$refs[this.addOrEditModellName].close()
      if (type === 'add') {
        this.search()
      } else {
        this.refresh()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<template>
  <ps-container :filename="filename">
    <template slot="header">
      <el-form :inline="true" :model="form" size="small" ref="form" flex="dir:left box:first">
        <el-form-item label="策略" flex-box="0">
          <el-input v-model="form.strgyName" placeholder="输入策略"></el-input>
        </el-form-item>
        <el-form-item flex-box="1">
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item flex-box="0" style="width: 100px;">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="onAddRule">添加策略</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
          <div class="tip">
            <span style="margin: 10px">策略集名称：<el-tag> {{$route.query.strgyName}} </el-tag></span>
          </div>
        </el-col>
      </el-row>
    </template>
    <el-table
      class="ps-table"
      header-row-class-name="ps-table-head"
      style="width: 100%"
      stripe
      v-loading="page.loading"
      :data="page.tableData" >
      <el-table-column
        label="策略名称"
        prop="strgyName">
        <template slot-scope="props">
          <span @click="handleStrategy(props.row)">{{props.row.strgyName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="版本号"
        prop="cversion">
      </el-table-column>
      <el-table-column
        label="匹配模式"
        prop="matchMode">
        <template slot-scope="props">
          {{props.row.matchMode === 1 ? '首次匹配' : props.row.matchMode === 2 ? '最坏匹配' : '权重匹配' }}
        </template>
      </el-table-column>
      <el-table-column
        label="规则用途"
        prop="releaseType">
      </el-table-column>
      <el-table-column
        label="适应客群"
        prop="custName">
      </el-table-column>
      <el-table-column
        label="应用产品"
        prop="productName">
      </el-table-column>
      <el-table-column
        width="90"
        label="状态"
        prop="isEnabled">
        <template slot-scope="props">
          <el-switch
          active-value="1"
          inactive-value="0"
          active-text="启用"
          inactive-text="关闭"
          active-icon-class="switchOpen"
          inactive-icon-class="switchClose"
          active-color="#13ce66"
          inactive-color="#ff4949"
          v-model="props.row.isEnabled"
          @change="setIsOpen(props.row.isEnabled, props.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        label="操作">
        <template slot-scope="props">
          <!-- <el-button-group> -->
            <!-- <el-tooltip class="item" effect="dark" content="添加" placement="top" :open-delay="0">
              <el-button @click="addRule(props.row)" size="mini" type="primary" plain><svg-icon icon-class="add" /></el-button>
            </el-tooltip> -->
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :open-delay="0">
              <el-button @click="handleEdit(props.row)" size="mini" type="primary" plain><svg-icon icon-class="edit" /></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="日志" placement="top" :open-delay="0">
              <el-button @click="viewLog(props.row)" size="mini" type="info" plain><svg-icon icon-class="log" /></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :open-delay="0">
              <el-button @click="delRule(props.row)" size="mini" type="danger" plain><svg-icon icon-class="del" /></el-button>
            </el-tooltip>
          <!-- </el-button-group> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.tableTotal">
    </el-pagination>
    <dialogAddFirst :show.sync='dialog.visible' @change="handleDialogChange" :row.sync='modRow' v-if="dialog.visible" />
  </ps-container>
</template>
<script>
import ruleApi from '@/api/rule'
import { pageMixin } from '@/views/mixins'
import dialogAddFirst from './components/dialogAddFirst'

export default {
  name: 'strategies',
  mixins: [pageMixin],
  components: {
    dialogAddFirst
  },
  data () {
    return {
      filename: __filename,
      form: {
        strgyName: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log(from)
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log(to, from)
    next()
  },
  methods: {
    // 公用分页参数
    getParam () {
      console.log(this.info)
      return {
        strgyFirstId: this.$route.params.strgyId,
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }
    },
    // 增加规则
    onAddRule () {
      this.onAdd()
    },
    handleStrategy (row) {
      this.$router.push({ name: 'rules-page-regular', params: { strgyId: row.id }, query: { strgyName: row.strgyName } })
      // this.$store.dispatch('path/set', { level: 'third', strgyCode: row.strgyCode, strgyName: row.strgyName })
    },
    // 启用开关
    setIsOpen (isEnabled, row) {
      this.upDateList(row, { isEnabled, id: row.id })
    },
    // 更新接口数据
    upDateList (row, updateObj = {}) {
      // 需要传多个额外参数的时候需要用到 assign
      let apiType = 'ruleFirstStatus'
      if (updateObj.isDel === 1) {
        apiType = 'DISTRIBUTE_LINK_DEL'
      }
      ruleApi[apiType](Object.assign({}, updateObj)).then(response => {
        this.$notify({
          title: '成功',
          message: row.strgyName + '更新成功',
          type: 'success'
        })
        this.getSyncList()
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      ruleApi['ruleSecondList'](Object.assign(
        this.getParam(),
        option
      )).then(response => {
        this.page.loading = false
        this.page.tableData = response.datalist
        this.page.tableTotal = response.rsCount
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    console.log(this.$store)
    this.getSyncList()
  }
}
</script>

<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="策略集名称" prop="strgyName">
        <el-input v-model="form.strgyName" placeholder="请输入策略集名称" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="应用产品名" prop="appId">
        <el-select
          :disabled="!!row.id"
          style="width:100%"
          v-model="form.appId"
          filterable
          remote
          reserve-keyword
          placeholder="请输入应用产品名"
          :loading="appOption.appLoading"
          @change='handleChangeOption'>
          <el-option
            v-for="item in appOption.appOptions"
            :key="item.dicCode"
            :label="item.dicName"
            :value="item.dicCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用" prop="isEnabled">
        <el-switch
        active-value="1"
        inactive-value="0"
        active-text="启用"
        inactive-text="关闭"
        active-icon-class="switchOpen"
        inactive-icon-class="switchClose"
        active-color="#13ce66"
        inactive-color="#ff4949"
        v-model="form.isEnabled"></el-switch>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" maxlength="200" placeholder="请输入描述" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import ruleApi from '@/api/rule'
import { dialogMixin } from '@/views/mixins'
export default {
  mixins: [dialogMixin],
  props: ['show', 'row'],
  data () {
    return {
      // 下拉菜单
      appOption: {
        appLoading: false,
        appOptions: []
      },
      // 表单
      form: {
        strgyName: '',
        appId: '',
        isEnabled: '1',
        description: ''
      },
      rules: {
        strgyName: [
          { required: true, message: '请输入策略集名称', trigger: 'blur' }
        ],
        appId: [
          { required: true, message: '请输入应用产品名', trigger: 'blur' }
        ]
      },
      title: '添加策略集'
    }
  },
  methods: {
    // 渠道类型
    getAppOption () {
      ruleApi['ruleGetAppList']().then(response => {
        this.appOption.appOptions = response
      }).catch(error => {
        console.log(error)
      })
    },
    // 下拉框
    handleChangeOption (val) {
    },
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let id = this.row.id
          let reqCommond = id ? 'ruleFirstUpdate' : 'ruleFirstAdd'
          let message = id ? '修改成功' : '添加成功'
          ruleApi[reqCommond](Object.assign(
            this.form,
            { id }
          )).then(response => {
            this.$notify({
              title: '成功',
              message,
              type: 'success'
            })
            this.handleClose()
            this.$emit('change', 'success')
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    // this.dialogVisible = this.show
    try {
      if (this.row.id) {
        this.form = this.row
        this.title = '修改策略集'
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.getAppOption()
    }
  }
}
</script>

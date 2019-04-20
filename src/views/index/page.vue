<template>
  <ps-container :filename="filename">
    <h3 class="boxtitle">今日统计</h3>
    <el-row type="flex" class="rowbox" justify="space-between" :gutter="20">
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-date"></i></div>
          <div class="gridtxt">
            <p>今日拒绝量</p>
            <div class="gridnum"><h4>3013</h4><span>50.65%</span></div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-sold-out"></i></div>
          <div class="gridtxt">
            <p>今日人工审核量</p>
            <div class="gridnum"><h4>2570</h4><span>43.20%</span></div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-message"></i></div>
          <div class="gridtxt">
            <p>今日通过量</p>
            <div class="gridnum"><h4>366</h4><span>6.15%</span></div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-printer"></i></div>
          <div class="gridtxt">
            <p>今日总量</p>
            <div class="gridnum"><h4>5949</h4><span>100%</span></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <h3 class="boxtitle">风险事件统计</h3>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="统计时间：" prop="date">
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="form.date"
          type="daterange"
          align="left"
          unlink-panels
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="form.dateRadio" size="small">
          <el-radio-button label="今天"></el-radio-button>
          <el-radio-button label="昨天"></el-radio-button>
          <el-radio-button label="最近七天"></el-radio-button>
          <el-radio-button label="最近三十天"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="策略集：" prop="channelCode">
        <el-select
          v-model="form.channelCode"
          filterable
          reserve-keyword
          placeholder="请输入所属频道"
          :loading="channel.selLoading">
          <el-option key="全部" label="全部" value=""></el-option>
          <el-option
            v-for="channel in channel.options"
            :key="channel.channelCode"
            :label="channel.channelName"
            :value="channel.channelCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="策略：" prop="channelCode">
        <el-select
          v-model="form.channelCode"
          filterable
          reserve-keyword
          placeholder="请输入所属频道"
          :loading="channel.selLoading">
          <el-option key="全部" label="全部" value=""></el-option>
          <el-option
            v-for="channel in channel.options"
            :key="channel.channelCode"
            :label="channel.channelName"
            :value="channel.channelCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" class="rowbox" :gutter="20" style="padding:30px 0;">
      <el-col :sm="16" :md="16">
        <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
      </el-col>
      <el-col :sm="8" :md="8">
      </el-col>
    </el-row>
    <el-row type="flex" class="rowbox" :gutter="20" style="padding:30px 0;">
      <el-col :sm="16" :md="16">
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </el-col>
      <el-col :sm="8" :md="8">
      </el-col>
    </el-row>
  </ps-container>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'page1',
  data () {
    this.chartSettings = {
      showLine: ['下单用户']
    }
    this.extend = {
      series: {
        label: { show: true, position: 'top' }
      }
    }
    return {
      filename: __filename,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            picker.$emit('pick', [dayjs().subtract(7, 'd').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            picker.$emit('pick', [dayjs().subtract(1, 'M').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            picker.$emit('pick', [dayjs().subtract(3, 'M').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
          }
        }]
      },
      form: {
        dateRadio: '今天',
        channelCode: '',
        date: [dayjs().subtract(15, 'd').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
      },
      channel: {
        selLoading: false,
        options: []
      },
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rowbox {
  margin-bottom:20px;
  background-color: #fff;
}
.gridcell {
  padding: 20px;
  // background-color: #f2f2f2;
  border-radius: 10px;
  border: 1px solid #cfe2ff;
  border-top: 3px solid #3080fe;

  // box-shadow: 1px 1px 12px #f2f2f2;
}
.gridcell, .gridnum, .gridico{
  display: flex;
  justify-content: center;
  align-items: center;
}
.gridico {
  font-size: 40px;
  color: #3080fe;
  align-items: center;
  margin-right: 20px;
}
.gridcell {
  p, h4 {
    margin: 0;
  }
}
.gridnum {
  justify-content: space-between;
  h4 {
    font-size: 28px;
  }
  span {
    font-size: 12px;
  }
}
.gridtxt {
  flex: 1;
  p {
    font-size: 12px;
    color: #666;
    margin: 0 0 10px;
    font-weight: 450;
  }
}
.boxtitle {
  font-size: 18px;
  padding: 15px 0px;
  border-bottom: 1px solid rgb(240, 240, 240);
  margin: 0px 0 20px 0;
  font-weight: 500;
  color: #3f3f3f;
}
</style>

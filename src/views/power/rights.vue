<template>
  <div>
    <!-- 面包屑 -->
    <myBread />
    <!-- 卡片 -->
    <el-card>
      <!-- 表格 -->
      <el-table :data="rightsList"
                border
                stripe>
        <el-table-column label="序号"
                         type="index"></el-table-column>
        <el-table-column label="角色名称"
                         prop="username"></el-table-column>
        <el-table-column label="路径"
                         prop="email"></el-table-column>
        <el-table-column label="权限等级"
                         prop="mobile"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :page="params.pagenum"
                  :pageSize="params.pagesize"
                  :total="4"
                  @pageSizeChange="pageSizeChange"
                  @currentChange="currentChange" />
      <input v-model="value" />
    </el-card>
  </div>
</template>
<script>
// 引入面包屑公用组件
import myBread from '../../components/bread'
// 引入分页公用组件
import pagination from '../../components/pagination'
export default {
  components: {
    myBread,
    pagination
  },
  data () {
    return {
      rightsList: [],
      // 获取数据的参数
      params: {
        // 搜索内容
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页有多少条数据
        pagesize: 3
      },
      value: '123'
    }
  },
  watch: {
    // value: 'changeValue'

    value: {
      immediate: true,
      handler (newVal, oldVal) {
        this.changeValue()
      }
    }
  },
  methods: {
    changeValue () {
      console.log('当value值发生变化时执行这个方法')
    },
    // 页面pageSize改变的事件
    pageSizeChange (e) {
      // console.log(e)
      //   this.params.pagesize = newSize
      //   // this.getUserList()
    },
    // 监听页码值改变的事件
    currentChange (e) {
      // console.log(e)
      //   this.params.pagenum = newPage
      //   // this.getUserList()
    }
  }
}
</script>

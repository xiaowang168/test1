<template>
  <div>
    <!-- 面包屑 -->
    <myBread />
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary"
                     @click="handleAdd">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 树形表格，安装的第三方库，不是饿了么的组件， npm install vue-table-with-tree-grid -->
      <tree-table :data="shopLsit"
                  class="tree_table"
                  :columns="columns"
                  :selection-type="false"
                  :expand-type="false"
                  show-index
                  index-text="#"
                  border>
        <!-- 是否有效 -->
        <template slot="isOk"
                  slot-scope="scope">
          <i :class="scope.row.isok? 'el-icon-success':'el-icon-error'"></i>
        </template>
        <!-- 排序 -->
        <template slot="order"
                  slot-scope="scope">
          <el-tag size="mini"
                  v-if="scope.row.sort===0">一级</el-tag>
          <el-tag size="mini"
                  type="success"
                  v-if="scope.row.sort===1">二级</el-tag>
          <el-tag size="mini"
                  type="warning"
                  v-if="scope.row.sort===2">三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit">编辑</el-button>
          <el-button type="danger"
                     size="mini"
                     icon="el-icon-delete">搜索</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <pagination :page="params.pagenum"
                  :pageSize="params.pagesize"
                  :total="2"
                  @pageSizeChange="pageSizeChange"
                  @currentChange="currentChange" />
      <!-- 添加分类弹窗 -->
      <myDialog :show.sync="activePopShow"
                @show="handleShow"
                width="50%"
                @close="handleColse">
        123
        <div slot="title">添加分类</div>
        <div slot="footer">
          <el-button type="primary"
                     size="mini">确定</el-button>
          <el-button type="info"
                     size="mini">取消</el-button>
        </div>
      </myDialog>
    </el-card>
  </div>
</template>
<script>

// 引入面包屑公用组件
import myBread from '../../components/bread'
// 引入分页公用组件
import pagination from '../../components/pagination'
// 引入弹窗公用组件
import myDialog from '../../components/dialog'
export default {
  components: {
    myBread,
    pagination,
    myDialog
  },
  data () {
    return {
      activePopShow: false,
      // 获取数据的参数
      params: {
        // 搜索内容
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页有多少条数据
        pagesize: 1
      },
      shopLsit: [
        { id: 200, shop_name: '家电', isok: true, sort: 0, children: [{ id: 2000, shop_name: '电视', isok: false, sort: 1, children: [{ id: 20000, shop_name: '曲面屏电视', isok: true, sort: 2 }, { id: 20001, shop_name: '直面屏电视', isok: true, sort: 2 }] }] },
        { id: 300, shop_name: '数码', isok: false, sort: 0, children: [{ id: 3000, shop_name: '手机', isok: true, sort: 1, children: [{ id: 30000, shop_name: '安卓手机', isok: true, sort: 2 }, { id: 30001, shop_name: '苹果手机', isok: true, sort: 2 }] }] }

      ],
      columns: [{
        label: '分类名称',
        prop: 'shop_name'
      },
      {
        label: '是否有效',
        // 表示当前列为自定义模板列
        type: 'template',
        // 模板的名称
        template: 'isOk'
      },
      {
        label: '排序',
        // 表示当前列为自定义模板列
        type: 'template',
        // 模板的名称
        template: 'order'
      },
      {
        label: '操作',
        width: '180',
        // 表示当前列为自定义模板列
        type: 'template',
        // 模板的名称
        template: 'opt'
      }
      ]
    }
  },
  methods: {
    handleShow (val) {
      this.activePopShow = val
    },
    handleColse () {

    },
    handleAdd () {
      this.activePopShow = true
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

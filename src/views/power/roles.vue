<template>
  <div>
    <!-- 面包屑 -->
    <myBread />
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="rolesList"
                border
                stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row v-for="item in scope.row.children"
                    :key="item.id">
              <el-col :span="5">
                <el-tag>{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"
                   style="margin-left:5px"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="itemChild in item.children"
                        :key="itemChild.id">
                  <el-col :span="6">
                    <el-tag type="success">{{itemChild.authName}}</el-tag>
                    <i class="el-icon-caret-right"
                       style="margin-left:5px"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning"
                            closable
                            @close="handleRemove(itemChilds.id)"
                            v-for="itemChilds in itemChild.children"
                            :key="itemChilds.id">{{itemChilds.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="序号"
                         type="index"></el-table-column>
        <el-table-column label="角色名称"
                         prop="roleName"></el-table-column>
        <el-table-column label="角色描述"
                         prop="roleDesc"></el-table-column>
        <el-table-column label="操作"
                         width="300px">
          <template v-slot="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini">编辑</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini">删除</el-button>
            <el-button type="warning"
                       icon="el-icon-setting"
                       size="mini"
                       @click="handlePower(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :page="params.pagenum"
                  :pageSize="params.pagesize"
                  :total="4"
                  @pageSizeChange="pageSizeChange"
                  @currentChange="currentChange" />
    </el-card>
    <!-- 分配权限弹窗 -->
    <myDialog :show.sync="activePopShow"
              @show="handleShow"
              width="50%"
              @close="handleColse">
      <el-tree :data="rightsList"
               :props="defaultProps"
               show-checkbox
               node-key="id"
               default-expand-all
               :default-checked-keys="defKeys"></el-tree>
      <div slot="title">分配权限</div>
      <div slot="footer">
        <el-button type="primary"
                   size="mini">确定</el-button>
        <el-button type="info"
                   size="mini">取消</el-button>
      </div>
    </myDialog>
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
      rolesList: [
        { id: 200, roleName: '主管', roleDesc: '技术负责人', children: [{ id: 2000, authName: '商品管理', path: null, children: [{ id: 20000, authName: '商品列表', path: null, children: [{ id: 200000, authName: '商品修改', path: null }, { id: 200001, authName: '添加商品', path: null }] }] }] },
        { id: 201, roleName: '测试1', roleDesc: '技术搬砖人1', children: [{ id: 2001, authName: '商品管理', path: null, children: [{ id: 20001, authName: '商品列表', path: null, children: [{ id: 200002, authName: '商品修改', path: null }, { id: 200003, authName: '添加商品', path: null }] }] }] },
        { id: 202, roleName: '测试2', roleDesc: '技术搬砖人2', children: [{ id: 2002, authName: '商品管理', path: null, children: [{ id: 20002, authName: '商品列表', path: null, children: [{ id: 200004, authName: '商品修改', path: null }, { id: 200005, authName: '添加商品', path: null }] }] }] },
        { id: 203, roleName: '测试3', roleDesc: '技术搬砖人3', children: [{ id: 2003, authName: '商品管理', path: null, children: [{ id: 20003, authName: '商品列表', path: null, children: [{ id: 200006, authName: '商品修改', path: null }, { id: 200007, authName: '添加商品', path: null }] }] }] }
      ],
      rightsList: [
        { id: 2000, authName: '商品管理', path: null, children: [{ id: 20000, authName: '商品列表', path: null, children: [{ id: 200000, authName: '商品修改', path: null }, { id: 200001, authName: '添加商品', path: null }] }] },
        { id: 2001, authName: '商品管理', path: null, children: [{ id: 20001, authName: '商品列表', path: null, children: [{ id: 200002, authName: '商品修改', path: null }, { id: 200003, authName: '添加商品', path: null }] }] },
        { id: 2002, authName: '商品管理', path: null, children: [{ id: 20002, authName: '商品列表', path: null, children: [{ id: 200004, authName: '商品修改', path: null }, { id: 200005, authName: '添加商品', path: null }] }] },
        { id: 2003, authName: '商品管理', path: null, children: [{ id: 20003, authName: '商品列表', path: null, children: [{ id: 200006, authName: '商品修改', path: null }, { id: 200007, authName: '添加商品', path: null }] }] }
      ],
      // 获取数据的参数
      params: {
        // 搜索内容
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页有多少条数据
        pagesize: 3
      },
      activePopShow: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 树形默认
      defKeys: []
    }
  },
  created () {

  },
  methods: {
    // 通过递归的形式，获取角色下所有三级权限的id,并保存到defKeys[]数组中
    getDefKeys (node, arr) {
      // 如果当前 node 节点 不包含children属性，则是三级节点
      if (!node.children) return [...arr, node.id]
      // 如果包含children属性，则不是三级节点，递归这个数组
      node.children.map(item => this.getDefKeys(item, arr))
    },
    // 删除三级权限标签
    async handleRemove () {
      const fors = await this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 点击确定返回的是字符串（confirm）
      // 点击取消返回的是字符串（cancel）
      console.log(fors)
      if (fors !== 'confirm') return this.$message.info('已经取消删除')
      console.log('确认删除')
    },
    // 分配权限
    handlePower (node) {
      // 调用递归函数
      this.getDefKeys(node, this.defKeys)

      this.activePopShow = true
    },
    handleShow (val) {
      console.log(val)
      this.activePopShow = val
    },

    handleColse () {
      this.defKeys = []
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

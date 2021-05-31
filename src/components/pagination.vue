<template>
  <!-- 公用分页组件封装 -->
  <div>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page"
                   hide-on-single-page
                   :page-sizes="[1, 2, 3, 4]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ['page', 'pageSize', 'total'],
  methods: {
    // 当每页的条数发生变化时触发
    handleSizeChange (size) {
      this.$emit('pageSizeChange', size)
    },
    // 分页变化触发
    handleCurrentChange (current) {
      this.$emit('currentChange', current)
    }

  }
}
</script>

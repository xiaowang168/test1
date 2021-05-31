<template>
  <!-- 公用面包屑组件封装 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadList"
                          :key="item.path"
                          :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      breadList: []
    }
  },
  created () {
    this.initDreadList()
  },
  methods: {
    initDreadList () {
      this.breadList = this.$route.meta.bread || this.$route.matched
    }
  }
}
</script>

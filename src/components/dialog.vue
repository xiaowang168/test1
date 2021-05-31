<template>
  <!-- dialog弹窗组件封装 -->
  <div>
    <el-dialog :title="$slots.title ? '' : title"
               :visible.sync="visible"
               :width="width"
               :modal="modal"
               :center="center"
               :append-to-body="appendToBody"
               :modal-append-to-body="modalAppendToBody"
               :close-on-click-modal="true"
               :close-on-press-escape="true"
               :fullscreen="fullscreen"
               :destroy-on-close="destroyOnClose"
               @open="open"
               @opened="opened"
               @close="close"
               @closed="closed">
      <template v-if="$slots.title">
        <span slot="title">
          <slot name="title" />
        </span>
      </template>
      <slot />
      <span slot="footer">
        <slot name="footer" />
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    show: { type: Boolean, dafault: false },
    title: { type: String, default: '提示' },
    width: { type: String, default: '30%' },
    modal: { type: Boolean, default: true },
    center: { type: Boolean, default: false },
    appendToBody: { type: Boolean, default: true },
    modalAppendToBody: { type: Boolean, default: true },
    fullscreen: { type: Boolean, default: false },
    destroyOnClose: { type: Boolean, default: false }
  },
  computed: {
    visible: {
      get () {
        return this.show
      },
      set (val) {
        console.log(val)
        this.$emit('show', val)
      }

    }
  },
  methods: {
    // Dialog 打开的回调
    open () {
      this.$emit('open')
    },
    // Dialog 打开动画结束时的回调
    opened () {
      this.$emit('opened')
    },
    // Dialog 关闭的回调
    close () {
      this.$emit('close')
    },
    // Dialog 关闭动画结束时的回调
    closed () {
      this.$emit('closed')
    }
  }
}
</script>

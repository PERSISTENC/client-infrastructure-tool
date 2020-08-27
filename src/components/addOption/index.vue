<template>
    <div class="client-add-options" >
        <div v-show='showDelete' @click="handleClick('delete')">
          <slot name="delete">
          </slot>
        </div>
        <div v-show='showAdd' @click="handleClick('add')">
          <slot name="add">
          </slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'add',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    showDelete () {
      if (this.disabled === true || this.total <= 1) return false
      return true
    },
    /**
     *  如果当前为0 并且 总数 <=  出现
     *  如果当前为0  并且总数 > 1 不出现
     */
    showAdd () {
      if (this.disabled) return false
      return this.total - 1 === this.index 
    },
  },
  methods: {
    handleClick (emitName) {
      this.$emit(emitName, this.index)
    },

  }
}

</script>
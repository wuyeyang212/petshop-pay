<!--全局键盘输入组件-->
<template>
  <div
    ref="keyboard"
    class="key-board"
  >
    <div class="number-wrap">
      <div
        v-for="(m, index) in keys"
        :key="index"
        :class="{ active: keyIndex === index, item: true }"
        :style="{ width: isTelephone && m == 0 ? '330px' : '' }"
        @click="clickKey(m, index)"
      >{{ m }}</div>
    </div>
    <div class="btn-wrap">
      <div
        v-if="total"
        class="close"
        @click="submitTotal"
      >￥{{ total }}</div>
      <div
        class="close"
        @click="deleteValue"
      >
        <img src="../../../../assets/store/key_board_close.png">
      </div>
      <div
        class="ok"
        :style="{ height: total ? '135px' : '210px' }"
        @click="submit"
      >确定</div>
    </div>
  </div>
</template>

<script>
// import { getFixedCount } from '../../../../utils/index.js'
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    maxLength: {
      type: Number,
      default: 11
    },
    // 是否是输入手机号
    isTelephone: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    // 默认总金额
    total: {
      type: [String, Number],
      default: ''
    },
    precision: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '00', '.'],
      keyIndex: -1,
      values: '',
      valueLists: [],
      inputFlag: true
    }
  },
  watch: {
    valueLists: {
      handler(val) {
        this.values = val.join('')
        this.inputFlag = true
        // 限制键盘输入小数位数
        const num = this.getFixedCount(this.values)
        if (!this.isTelephone && num >= this.precision) {
          this.values = Number(this.values).toFixed(this.precision)
          this.inputFlag = false
        }
        this.$emit('input', this.values)
      },
      deep: true,
      immediate: true
    },
    value(val) {
      this.valueLists = val.toString().split('')
    },
    isTelephone: {
      handler(val) {
        if (val) {
          this.keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        } else {
          this.keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '00', '.']
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 解决点击键盘，会自动触发input输入框失焦问题
    this.$refs.keyboard.onmousedown = (e) => {
      if (e && e.preventDefault) {
        e.preventDefault()
      } else {
        window.event.returnValue = false
        return false
      }
    }
  },
  methods: {
    getFixedCount(val) {
      if (isNaN(val)) return
      const x = String(val).indexOf('.') + 1
      if (x <= 0) return
      const y = String(val).length - x
      return y
    },
    // 输入数据
    clickKey(value, index) {
      if (!this.inputFlag) return
      if (this.valueLists.length >= this.maxLength && this.isTelephone) return
      if (value === '00' && !this.valueLists.length) return
      if (value === '.' && !this.valueLists.length) return
      this.valueLists.push(value)
      this.keyIndex = index
    },
    // 清除数据
    deleteValue() {
      this.valueLists.pop()
    },
    // 填充默认总金额
    submitTotal() {
      this.$emit('input', this.total)
    },
    // 提交数据
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="less" scoped>
.key-board {
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  .number-wrap {
    width: 350px;
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    .item {
      width: 100px;
      height: 60px;
      background: #e8e8e8;
      color: #1d1d1d;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      line-height: 60px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background: rgb(240, 188, 188);
      }
    }
  }
  .btn-wrap {
    width: 120px;
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 60px;
      background: #e8e8e8;
      font-size: 24px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .ok {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 210px;
      background: #ff6f2a;
      color: #fff;
      font-size: 24px;
      font-weight: 500;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>

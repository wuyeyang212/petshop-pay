<!-- 整单优惠 -->
<template>
  <div class="desk-discount">
    <el-row class="header">
      <el-col
        :span="10"
        :offset="10"
      >
        <span>整单优惠</span>
      </el-col>
      <el-col
        :span="4"
        style="text-align: right;"
      >
        <el-icon
          @click="handleClose"
          class="close"
        >
          <close-bold />
        </el-icon>
      </el-col>
    </el-row>
    <div class="content">
      <p>整单折扣</p>
      <el-button
        type="primary"
        @click="openDialog(1)"
      >自定义折扣</el-button>
      <el-button type="primary">{{ `${discountForm.discountValue}折` }}</el-button>
      <p>整单减价</p>
      <el-button
        type="primary"
        @click="openDialog(2)"
      >自定义减价</el-button>
      <!-- <p>整单改价</p>
      <el-button
        type="primary"
        @click="openDialog(3)"
      >自定义价格</el-button> -->
    </div>
    <el-dialog
      v-model="editVisible"
      :title="title"
      :immediate-close="false"
      width="550px"
      center
      class="discont-dialog"
    >

      <div>
        <div style="text-align:center">
          <el-input
            :key="discountForm.discountType"
            v-model="discountForm.discountValue"
            class="input"
            style="width: 450px"
            :placeholder="discountForm.discountType === 1 ? '可输入0.1-9.9' : discountForm.discountType === 2 ? '可输入0-50000.00' : '可输入0-9999999.00'"
            @keydown="oninput"
          />
          <!-- v-input-limit="discountForm.discountType === 1 ?
              { min: 0.1, max: 9.9, precision: 1 } :
              { min: 0, max: 50000.00, precision: 2 }" -->
        </div>
        <el-row class="key-board">
          <KeyBoard
            v-model="discountForm.discountValue"
            @submit="handleSubmitReduce"
          />
          <!-- :precision="discountForm.discountType === 1 ? 1 : 2" -->
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import KeyBoard from './KeyBoard/index.vue'
export default {
  components: { KeyBoard },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editVisible: false,
      title: '',
      discountForm: {
        discountType: 1,
        discountValue: ''
      },
    }
  },
  created() {
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    openDialog(val) {
      this.editVisible = true
      this.title = val === 1 ? '整单折扣' : val === 2 ? '整单减价' : '整单改价'
      this.discountForm.discountType = val
    },
    // 提交商品优惠
    handleSubmitReduce() {
      if (this.discountForm.discountType === 1 && (Number(this.discountForm.discountValue) < 0.1 || Number(this.discountForm.discountValue) > 9.9)) {
        this.$message({
          message: '整单折扣超出0.1-9.9范围',
          type: 'warning'
        })
      } else if (this.discountForm.discountType === 2 && (Number(this.discountForm.discountValue) < 0 || Number(this.discountForm.discountValue) > 50000.00)) {
        this.$message({
          message: '整单减价超出0-50000.00范围',
          type: 'warning'
        })
      } else if (this.discountForm.discountType === 3 && (Number(this.discountForm.discountValue) < 0 || Number(this.discountForm.discountValue) > 9999999.00)) {
        this.$message({
          message: '整单减价超出0-9999999.00范围',
          type: 'warning'
        })
      } else {
        this.editVisible = false
        // this.$store.commit('cart/ADD_REDUCE', this.discountForm)
      }
    },
    oninput(e) {
      // 通过正则过滤小数点后1位
      if (this.discountForm.discountType === 1) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,0})/g)[0]) || null
        console.log('e', e)
      } else {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.desk-discount {
  min-height: calc(100vh - 50px);
  background: #fff;

  .header {
    padding: 10px 20px;
    border-bottom: 1px solid #e9e9e9;
    span {
      width: 100%;
      color: #333;
    }
    .close {
      font-size: 24px;
      // padding: 10px;
      font-weight: 600;
      color: #ff6f2a;
      cursor: pointer;
    }
  }
  .content {
    padding: 20px 40px;
    font-size: 14px;
    .el-button {
      padding: 12px 16px;
      margin-bottom: 20px;
    }
  }
  .discont-dialog {
    ::deep(.el-dialog__headerbtn .el-dialog__close) {
      font-size: 24px;
      // padding: 10px;
      font-weight: 600;
      color: #ff6f2a;
      cursor: pointer;
    }

    .key-board {
      margin: 10px auto;
    }
  }
}
</style>
<template>
  <div class="discount-detail">
    <div class="header">
      <span>优惠明细</span>
      <el-icon
        @click="handleClose"
        class="close"
      >
        <close-bold />
      </el-icon>
    </div>
    <div class="content">
      <p>商品改价</p>
      <p>
        <span class="specs">已优惠：</span>
        <span class="price">￥10.00</span>
      </p>
      <p style="margin-top:40px">优惠券/码</p>
      <p>
        <span class="specs">已优惠：</span>
        <span class="price">￥10.00</span>
      </p>
      <div class="coupon">
        <p>
          <span class="space">无门槛减100</span>
          <span>满减券</span>
        </p>
        <p>
          <span>适用商品：全部商品可用</span>
        </p>
        <p>
          <span>有效期：永久</span>
        </p>
      </div>
      <p style="margin-top:40px">整单优惠</p>
      <p>
        <span class="specs">已优惠：</span>
        <span class="price">￥10.00</span>
      </p>
      <p style="margin-top:40px">抹零<span class="specs">（抹分）</span></p>
      <p>
        <span class="specs">已优惠：</span>
        <span class="price">￥10.00</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    // ...mapGetters(['avatar', 'userInfo'])
  },
  methods: {
    handleSearch() {
      // if (!this.phoneOrName) return
      // const params = {
      //   contactPhone: '',
      //   name: '',
      //   orgId: this.userInfo.user.orgId || ''
      // }
      // if (this.phoneOrName.length === 11 && !isNaN(this.phoneOrName.substring(0, 3))) {
      //   params.contactPhone = this.phoneOrName
      // } else {
      //   params.name = this.phoneOrName
      // }
      // if (this.timer) {
      //   clearTimeout(this.timer)
      // }
      // this.timer = setTimeout(() => {
      //   this.$http.post(this.$api.getCustomerList, params)
      //     .then((res) => {
      //       this.customerList = res.data.rows && res.data.rows.splice(0, 1) || []
      //     })
      // }, 500)
      this.customerList = []
    },
    // 切换会员
    handleSwitch(item) {
      this.$store.commit('cart/SWITCH_CUSTOMER', item)
      this.$emit('update:visible', false)
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.discount-detail {
  min-height: calc(100vh - 50px);
  background: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    .space {
      margin-right: 40px;
    }
    .price {
      color: #ff0000d8;
    }
    .specs {
      color: #888;
    }
    .coupon {
      padding: 5px 30px;
      background-color: rgba(92, 175, 242);
      width: 220px;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    height: 50px;
    background: rgba(114, 112, 112, 0.8); //滚动条颜色
  }
}
</style>
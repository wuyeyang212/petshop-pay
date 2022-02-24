<!--取单列表-->
<template>
  <div class="desk-fetch-order">
    <div class="header">
      <div>
        <span>取单</span>
        <span class="sub-title">{{ '商品挂单后会锁定库存，如无需付款请及时取消' }}</span>
      </div>
      <el-icon
        @click="handleClose"
        class="close"
      >
        <close-bold />
      </el-icon>
    </div>
    <div class="container">
      <div
        v-if="noData"
        class="no-data"
      >
        <img
          src="../../../assets/store/cart_nodata.png"
          alt=""
        >
        <span>{{ '暂无结账清单可取' }}</span>
      </div>
      <div
        v-for="(i, index) in orderList"
        v-else
        :key="index"
        class="card"
      >
        <div class="title">
          <span class="price">订单总价：<span>￥{{ i.paymentAmount }}</span></span>
          <div class="time">
            <span>挂单时间：{{ i.createdTime }}</span>
            <span>会员：{{ i.memberPhone || encryptPhone }}</span>
          </div>
        </div>
        <div class="content">
          <div
            v-for="j in i.skus"
            :key="j.id"
          >
            <span>
              <span
                v-if="j.gift"
                class="gift-tag"
              >赠品</span>{{ j.skuName }}</span>
            <span>x {{ j.buyCount }}</span>
            <span>￥{{ (j.discountPrice * j.buyCount).toFixed(2) }}</span>
          </div>
        </div>
        <div class="footer">
          <el-button
            class="btn"
            @click="handleCancel(i)"
          >取消</el-button>
          <el-button
            class="search-btn btn"
            :loading="fetchOrderLoading"
            @click="handleFetch(i)"
          >取单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      noData: false,
      orderList: [],
      fetchOrderObj: {}, // 取单数据，需要同步到购物车
      fetchOrderLoading: false // 取单按钮添加loading
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.$http.post(this.$api.getPendOrderList)
        .then((res) => {
          this.orderList = res.data || []
          if (!this.orderList.length) {
            this.noData = true
          } else {
            this.noData = false
          }
        })
    },
    // 取消
    handleCancel(item) {
      this.$http.post(`${this.$api.cancelPendOrder}/${item.id}`)
        .then(() => {
          this.getList()
          this.$message({
            type: 'success',
            message: '取消成功'
          })
        })
    },
    // 取单
    handleFetch(item) {
      this.fetchOrderLoading = true
      this.$http.post(`${this.$api.fetchPendOrder}/${item.id}`)
        .then((res) => {
          this.fetchOrderObj = res.data || {}
          this.$store.commit('cart/SET_CART_DATA', this.fetchOrderObj)
          this.$emit('update:visible', false)
          this.$emit('fetchGoods') // 取单后刷新商品列表
          this.$message({
            type: 'success',
            message: '取单成功'
          })
        })
        .finally(() => {
          this.fetchOrderLoading = false
          this.salesmanId = ''
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.desk-fetch-order {
  min-height: calc(100vh - 88px);
  background: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    border-bottom: 1px solid #e9e9e9;
    .sub-title {
      margin-left: 20px;
      color: #ff6f2a;
      font-size: 12px;
    }
    .close {
      font-size: 24px;
      padding: 10px;
      font-weight: 600;
      color: #ff6f2a;
      cursor: pointer;
    }
  }
  .card {
    padding: 15px 30px;
    border-bottom: 1px solid #e9e9e9;
    .title {
      display: flex;
      justify-content: space-between;
      .price {
        font-size: 14px;
        color: #272727;
        span {
          color: #ff0c0c;
        }
      }
      .time {
        font-size: 14px;
        color: #939393;
        span {
          margin-left: 20px;
        }
      }
    }
    .content {
      margin-top: 20px;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #939393;
        margin-top: 10px;
        span:first-child {
          width: 350px;
        }
        span:nth-child(2) {
          width: 200px;
        }
        span:nth-child(3) {
          width: 100px;
          text-align: right;
        }
      }
      .gift-tag {
        padding: 2px 5px;
        background: #f77840;
        color: #fff;
        font-size: 12px;
        margin-right: 5px;
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
    }
  }
  .container {
    height: calc(100vh - 168px);
    overflow-y: scroll;
    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 200px;
      img {
        width: 150px;
        height: 150px;
      }
      span {
        margin-top: 20px;
        text-align: center;
        color: #b3b3b3;
        font-size: 14px;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    height: 50px;
    background: rgba(114, 112, 112, 0.5); //滚动条颜色
  }
  ::v-deep(.btn) {
    width: 65px;
    height: 28px;
    line-height: 10px;
  }
  ::v-deep(.search-btn) {
    background: #223455;
    border: 1px solid #223455;
    color: #fff;
  }
}
</style>

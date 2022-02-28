<template>
  <div class="select-custom">
    <template v-if="hasUser == '0'">
      <div class="header">
        <el-icon
          @click="handleClose"
          class="close"
        >
          <close-bold />
        </el-icon>
      </div>
      <div class="search">
        <el-input
          v-model="phoneOrName"
          prefix-icon="el-icon-search"
          placeholder="请输入客户名或手机号"
          maxlength="20"
          clearable
          @input="handleSearch"
        />
      </div>
      <div class="content">
        <!--客户卡片-->
        <div
          v-for="(i, index) in customerList"
          :key="index"
          class="user-card"
        >
          <img
            v-if="avatar"
            :src="avatar"
            class="logo"
          >
          <span>{{ i.defaultContactName || '' }}</span>
          <span>{{ i.defaultContactPhone || encryptPhone }}</span>
          <span
            class="btn"
            @click="handleSwitch(i)"
          >选择客户</span>
        </div>
      </div>
      <div class="key-board">
        <KeyBoard
          v-model="phoneOrName"
          :is-telephone="true"
          @submit="handleSearch"
        />
      </div>
    </template>
    <template v-if="hasUser == '1'">
      <div class="header">
        <div>会员详情</div>
        <el-icon
          @click="handleClose"
          class="close"
        >
          <close-bold />
        </el-icon>
      </div>
      <div class="content">

      </div>
    </template>
    <template v-if="hasUser == '2'">
      <div class="no-user">
        <span class="title">未查询到 13801380001 客户信息，快速创建</span>
        <span class="msg"><img src="../../../assets/store/create_user.png">补充客户信息</span>
        <el-form
          ref="form"
          :model="form"
          :inline="true"
        >
          <el-form-item
            label="客户姓名"
            prop="name"
            :rules="[
              { required: true, message: '姓名不能为空'},
            ]"
            style="margin-right:40px"
          >
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="性别"
            prop="sex"
          >
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button
            style="width:120px"
            @click="handleClose"
          >返回输入</el-button>
          <el-button
            class="active-btn"
            type="primary"
            @click="handleSubmit"
          >确定创建</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import KeyBoard from './KeyBoard/index.vue'
// import { mapGetters } from 'vuex'
export default {
  components: {
    KeyBoard
  },
  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // },
    openCustom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      phoneOrName: '',
      customerList: [],
      hasUser: '2',// 0搜索页面  1有客户  2无客户
      form: {
        name: '',
        sex: '男'
      }
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
      console.log("00000")
      // this.openCustom = false
      // this.$emit('update:visible', false)
      this.$emit('update:openCustom', false)
      console.log(this.visible)
    }
  }
}
</script>

<style lang="less" scoped>
.select-custom {
  min-height: calc(100vh - 88px);
  background: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    padding-left: 40px;
    div {
      line-height: 44px;
    }
    .close {
      font-size: 24px;
      padding: 10px;
      font-weight: 600;
      color: #ff6f2a;
      cursor: pointer;
    }
  }
  .search {
    padding: 10px 40px 20px 40px;
    // width: 100%;
    height: 80px;
    ::v-deep(.el-input__inner) {
      height: 40px;
      line-height: 40px;
      border-radius: 10px;
      background: #f8f8f8;
      border: 1px solid #f2f2f2;
    }
    ::v-deep(.el-input__icon) {
      line-height: 40px;
      font-size: 16px;
    }
  }
  .content {
    height: 200px;
    padding: 0 40px;
    .user-card {
      height: 100px;
      border: 1px solid #c1c1c1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 5px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 45px;
      }
      span {
        font-size: 14px;
        color: #272727;
        &.btn {
          color: #ff8854;
          cursor: pointer;
        }
      }
    }
  }
  .key-board {
    display: flex;
    justify-content: center;
  }
  .no-user {
    padding: 40px 40px;
    span {
      display: block;
      margin: 20px 0;
    }
    .title {
      font-size: 18px;
      color: #272727;
    }
    .msg {
      display: flex;
      align-items: center;
      font-size: 14px;
      img {
        width: 36px;
      }
    }
    .footer {
      margin-top: 20px;
    }
  }
  // ::v-deep.el-form--inline .el-form-item__label {
  //   color: #272727;
  //   font-weight: 500;
  // }
}
</style>

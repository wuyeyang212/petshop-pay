<template>
  <div class="desk-specs">
    <div class="header">
      <span>规格选择</span>
      <el-icon
        @click="handleClose"
        class="close"
      >
        <close-bold />
      </el-icon>
    </div>
    <div class="content">
      <p class="name">商品名称</p>
      <p class="price">￥121.00</p>
      <p class="specs">商品条码：</p>
      <p class="specs">已选：红色，L</p>

      <div class="btngroup">
        <p class="color">颜色</p>
        <el-button
          :class="index == itemType ? 'highlight' : ''"
          v-for="(item, index) in colorList"
          :key="index"
          @click="materTay(index,item.code)"
        >{{item.codeValue}}</el-button>
      </div>
      <div class="btngroup">
        <p class="color">大小</p>
        <el-button
          :class="index == sizeType ? 'highlight' : ''"
          v-for="(item, index) in sizeList"
          :key="index"
          @click="sizeTay(index,item.code)"
        >{{item.codeValue}}</el-button>
      </div>
      <div class="btngroup">
        <p class="color">购买数量</p>
        <el-input-number
          v-model="num"
          :min="1"
          :max="10"
        />
      </div>
      <div class="color">
        <el-button type="primary">确定</el-button>
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
    },
  },
  data() {
    return {
      num: 3,
      colorList: [

        {
          code: '',
          codeValue: '蓝色'
        },
        {
          code: '',
          codeValue: '红色'
        }
      ], // 等级筛选数据
      itemType: 0, // 等级筛选选中的标识
      materialCode: '', // 分类的code值
      sizeList: [

        {
          code: '',
          codeValue: 'S'
        },
        {
          code: '',
          codeValue: 'M'
        },
        {
          code: '',
          codeValue: 'L'
        }
      ], // 等级筛选数据
      sizeType: 0, // 等级筛选选中的标识
      sizeCode: '', // 分类的code值
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    // 等级筛选互斥效果
    materTay(itemType, code) {
      this.itemType = itemType
      this.materialCode = code
    },
    sizeTay(sizeType, code) {
      this.sizeType = sizeType
      this.sizeCode = code
    },
  }
}
</script>

<style lang="less" scoped>
.desk-specs {
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
    .name {
      color: #666;
    }
    .price {
      color: #ff0000d8;
    }
    .specs {
      color: #888;
    }
    .btngroup {
      .el-button {
        padding-top: 20px;
        padding-bottom: 20px;
        width: 120px;
      }
      .highlight {
        background-color: #409eff;
        color: #fff;
        border-color: #409eff;
      }
    }
    .color {
      margin-top: 40px;
    }
  }
  .bottom {
    margin-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    border-bottom: 2px solid #f0f2f5;
    &-btn {
      height: 32px;
      min-width: 100px;
      margin-right: 10px;
    }
    .bdge-wrap {
      position: relative;
      .bdage {
        z-index: 999;
        position: absolute;
        right: 0px;
        top: -10px;
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 32px;
        background: #f77840;
        color: #fff;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
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

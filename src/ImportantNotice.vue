<template>
  <div class="div">
    <h3 class="h3">
      <i class="i"></i>
      重要提醒
    </h3>
    <div class="div-2">
      <p class="p">* 自提商品价格请筛选「Self-Pickup」发货物流进行查看。</p>
      <p class="p">
        *
        当您的订单为自提订单，请选择「Self-Pickup」的发货物流进行发货履约，即平台面单发货。
        <a target="_blank" href="https://www.saleyee.com/guide/hp692957.html" class="a">
          >>>《自提功能-操作指引》
        </a>
      </p>
      <p class="p">
        *
        当您的销售平台为Temu，若选择非「Self-Pickup」进行下单，平台不会屏蔽Fedex物流进行发货，建议您使用「Self-Pickup」的发货物流进行下单。
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.div {
  background-color: #FCF8E3 !important;
  border-bottom: 1px solid rgb(250, 235, 204);
  border-left: 1px solid rgb(250, 235, 204);
  border-right: 1px solid rgb(250, 235, 204);
  border-top: 1px solid rgb(250, 235, 204);
  border-style: solid;
  border-width: 1px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  position: relative;
}
.h3 {
  color: #FF5A00;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 8px;
}
.i {
  color: #FF5A00;
  display: inline;
  font-family: layui-icon;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  margin-right: 4px;
  user-select: none;
}
.div-2 { padding-left: 18px; }
.p {
  color: #A77200;
  font-size: 12px;
  line-height: 24px;
}
.a {
  color: #CB261C;
  cursor: pointer;
  display: inline;
  font-size: 12px;
  line-height: 24px;
  transition-duration: 0.3s;
}
</style>
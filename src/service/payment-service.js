'use strict';

var _mm = require('util/mm.js');

var _payment = {
   // 获取支付信息
   getPaymentInfo:function(orderNo,resolve,reject){
    _mm.request({
      url:_mm.getServerUrl('./order/pay.do'),
      data:{
        orderNo:orderNo
      },
      success:resolve,
      error:reject
    });
  },
   // 获取支付状态
   getPaymentStatus:function(orderNo,resolve,reject){
    _mm.request({
      url:_mm.getServerUrl('./order/query_order_pay_status.do'),
      data:{
        orderNo:orderNo
      },
      success:resolve,
      error:reject
    });
  },
  
}
module.exports = _payment;
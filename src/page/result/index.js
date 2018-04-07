'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
  var type = _mm.getUrlParam('type') || 'default',
      $element = $('.' + type + '-success');
  if(type === 'payment') {
    var orderNumber= _mm.getUrlParam('orderNumber'),
        $orderNo = $element.find('.order-number');
    $orderNo.attr('href',$orderNo.attr('href')+orderNumber);
  }
  $element.show();
})
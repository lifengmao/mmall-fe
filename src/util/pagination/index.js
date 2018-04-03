'use strict';
require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function(){
  var _this = this;
  this.defaultOption = {
    container:null,
    pageNum: 1,
    pageRange:3,
    onSelectPage:null
  }; 
  // 事件的处理
  $(document).on('click','.pg-item',function(){
    
    var $this= $(this);
    if($this.hasClass('active') || $this.hasClass('disabled')){
      return;
    }
    console.log(_this.option.onSelectPage($this.data('value')));
    typeof _this.option.onSelectPage === 'function' 
          ? _this.option.onSelectPage($this.data('value')) : null;
  });
};
// 渲染分页组件
Pagination.prototype.render = function(userOption) {
  this.option = $.extend({},this.defaultOption,userOption);
  // 判断容器是否为合法的
  if(!(this.option.container instanceof jQuery)){
    return;
  }
  if(this.option.pages <= 1){
    return;
  }
  // 渲染分页
  this.option.container.html(this.getPaginationHtml());
};

// 获取分页的html

Pagination.prototype.getPaginationHtml = function(){
  var html = '',
      pageArray = [],
      option = this.option,
      start = (option.pageNum - option.pageRange) > 0 
          ? (option.pageNum - option.pageRange) : 1,
      end = (option.pageNum + option.pageRange)>option.pages 
          ? option.pages : (option.pageNum + option.pageRange);
  pageArray.push({
    name:'上一页',
    value:option.prePage,
    disabled: !option.hasPreviousPage
  });
  // 数值按钮的处理
  for(var i = start; i<= end; i++) {
    pageArray.push({
      name:i,
      value:i,
      active: (i === option.pageNum)
    });
  }
  pageArray.push({
    name:'下一页',
    value:option.nextPage,
    disabled: !option.hasNextPage
  });

  html = _mm.renderHtml(templatePagination,{
    pageArray:pageArray,
    pageNum:option.pageNum,
    pages:option.pages
  });
  return html;
};

module.exports = Pagination;
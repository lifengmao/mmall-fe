'use strict';
var Hogan = require('hogan');
var conf = {
  serverHost:''
};
var _mm = {
  // 网络请求
  request: function(param){
    var _this = this;
    $.ajax({
      type:param.method || 'get',
      url:param.url || '',
      dataType:param.type || 'json',
      data:param.data || '',
      success: function(res) {
        if(0 === res.status) {
          // 请求成功
          typeof param.success === 'function' && param.success(res.data,res.msg);
        }else if(10 === res.status) {
          // 没有登录状态 需要登录
          _this.doLogin();
        }else if(1 === res.status) {
          //请求数据错误
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error:function(err) {
        typeof param.error === 'function' && param.error(err.statusText);
      }
    });
  },
  // 获取服务器地址
  getServerUrl:function(path){
    return conf.serverHost + path;
  },
  // 获取url参数
  getUrlParam: function(name){
    var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
    var result = window.location.search.substring(1).match(reg);
    return result? decodeURIComponent(result[2]):null ;
  },
  // 渲染html模板
  renderHtml:function(htmlTemplate,data){
    var template = Hogan.compile(htmlTemplate),
        result = template.render(data);
    return result;
  },
  // 成功提示
  successTips:function(msg){
    alert(msg || '操作成功!');
  },
  // 错误提示
  errorTips:function(msg){
    alert(msg || '哪里不对了');
  },
  // 字段信息验证 是否为空 手机邮箱
  validate:function(value,type){
    var value = $.trim(value);
    // 非空验证
    if('require' === type){
      return !!value;
    }
    // 手机号验证
    if('phone' === type) {
      return /^1\d{10}$/.test(value);
    }
    // 邮箱格式验证
    if('email' === type){
      return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
    }
  },
  // 统一登录处理
  doLogin:function(){
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  goHome:function(){
    window.location.href = './view/index.html';
  }
};

module.exports = _mm;
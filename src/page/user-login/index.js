'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
// 表单错误提示
var formError = {
  show:function(errMsg){
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide:function(){
    $('.error-item').hide().find('.err-msg').text('');
  }
}
var page = {
  init:function(){
    this.bindEvent();
  },
  bindEvent:function(){
    var _this = this;
    // 登录按钮点击
    $('#submit').click(function(){
      _this.submit();
    });
    // 按下回车
    $('user-content').keyup(function(e){
      if(e.keyCode === 13){
        _this.submit();
      }
    });
  },
  // 提交表单
  submit:function(){
    var formData = {
      username:$.trim($('#username').val()),
      password:$.trim($('#password').val())
    },
      validateResult = this.formValidate(formData);
    if(validateResult.status){
      //成功
      _user.login(formData,function(res){
        window.location.href = _mm.getUrlParam('redirect') || './index.html';
      },function(errMsg){
        formError.show(errMsg);
      })
    }else{
      // 失败
      formError.show(validateResult.msg);
    }
  },
  // 表单的验证
  formValidate:function(formData){
    var result = {
      status:false,
      msg:''
    };
    if(!_mm.validate(formData.username,'require')){
      result.msg = '用户名不能为空';
      return result;
    }
    if(!_mm.validate(formData.password,'require')){
      result.msg = '密码不能为空';
      return result;
    }
    // 通过验证
    result.status = true;
    result.msg = '验证通过';
    return result;
  }
};
$(function(){
  page.init();
});
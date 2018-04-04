'use strict';

require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        // 商品的选中取消
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId =$this.parents('.cart-table').data('product-id');
            // 切换选中状态
            if($this.is(":checked")) {
              // 选中
              _cart.selectProduct(productId,function(res){
                _this.renderCart(res);
              },function(errMsg){
                _this.showCartError();
              });
            }else {
              // 取消选中
              _cart.unselectProduct(productId,function(res){
                _this.renderCart(res);
              },function(errMsg){
                _this.showCartError();
              });
            }
        });
        // 商品的全选及取消
         $(document).on('click', '.cart-select-all', function(){
          var $this = $(this);
          // 切换选中状态
          if($this.is(":checked")) {
            // 选中
            _cart.selectAllProduct(function(res){
              _this.renderCart(res);
            },function(errMsg){
              _this.showCartError();
            });
          }else {
            // 取消全选
            _cart.unselectAllProduct(function(res){
              _this.renderCart(res);
            },function(errMsg){
              _this.showCartError();
            });
          }
        });
        // 商品数量的绑定
        $(document).on('click', '.count-btn', function(){
          var $this = $(this),
              $pCount = $this.siblings('.count-input'),
              type = $this.hasClass('plus') ? 'plus' : 'minus',
              productId =$this.parents('.cart-table').data('product-id'),
              currentCount = parseInt($pCount.val()),
              minCount = 1,
              maxCount = parseInt($pCount.data('max')),
              newCount = 0;
          if(type === 'plus') {
            if(currentCount >= maxCount) {
              _mm.errorTips('该商品数量达到上限！');
              return;
            }
            newCount = currentCount+1;
          }else if(type === 'minus') {
            if(currentCount <= minCount) {
              return;
            }
            newCount = currentCount-1;
          }
          // 更新购物车商品数量
          _cart.updateProduct({
            productId:productId,
            count:newCount
          },function(res){
            _this.renderCart(res);
          },function(errMsg){
            _this.showCartError();
          })
      });
      // 删除单个商品事件的绑定
      $(document).on('click', '.cart-delete', function(){
        if(window.confirm("确认删除该商品？")){
          var productId = $(this).parents('.cart-table').data('productId');
          _this.deleteCartProduct(productId);
        }
      });
       // 删除选中全部商品
       $(document).on('click', '.delete-selected', function(){
        if(window.confirm("确认删除选中的商品？")){
          var arrProductIds=[],
              $selectedItem = $('.cart-select:checked');
          for(var i = 0,iLength = $selectedItem.length; i < iLength; i++){
            arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
          }
          if(arrProductIds.length) {
            _this.deleteCartProduct(arrProductIds.join(','));
          }else{
            _mm.errorTips('您还没有选中要删除的商品！');
          }
        }
      });
      // 提交购物车
      $(document).on('click', '.btn-submit', function(){
        // 总价>0 进行提交
        if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
          window.location.href = './confirm.html';
        }else {
          _mm.errorTips('请选中商品后再提交');
        }
      });
      },
    // 加载购物车信息
    loadCart: function(){
        var _this       = this;
        // 获取购物车列表
        _cart.getCartList(function(res){
          _this.renderCart(res);
        },function(errMsg){
          _this.showCartError();
        })

        
       
    },
    // 渲染购物车
    renderCart:function(data){
      this.filter(data);
      // 缓存购物车信息
      this.data.cartInfo = data;
      // 生成html
      var cartHtml = _mm.renderHtml(templateIndex,data);
      $('.page-wrap').html(cartHtml);
      // 通知导航的购物车更新数量
      nav.loadCartCount();
    },
    // 删除指定商品 支持批量 逗号分隔
    deleteCartProduct:function(productIds){
      var _this = this;
      _cart.deleteProduct(productIds,function(res){
        _this.renderCart(res);
      },function(errMsg){
        _this.showCartError();
      });
    },
    // 数据匹配
    filter : function(data){
      data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError:function(){
      $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试</p>');
    }
};
$(function(){
    page.init();
})
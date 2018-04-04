var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function(name,title) {
  return {
    template:'./src/view/'+name+'.html',
    filename:'view/'+name+'.html',
    title:title,
    inject:true,
    hash:true,
    chunks:['common',name]
  };
};
var config = {
  entry:{
    'common':[path.resolve(__dirname,'./src/page/common/index.js')],
    'index':path.resolve(__dirname,'./src/page/index/index.js'),
    'list':path.resolve(__dirname,'./src/page/list/index.js'),
    'detail':path.resolve(__dirname,'./src/page/detail/index.js'),
    'cart':path.resolve(__dirname,'./src/page/cart/index.js'),
    'user-login':path.resolve(__dirname,'./src/page/user-login/index.js'),
    'user-register':path.resolve(__dirname,'./src/page/user-register/index.js'),
    'user-pass-reset':path.resolve(__dirname,'./src/page/user-pass-reset/index.js'),
    'user-center':path.resolve(__dirname,'./src/page/user-center/index.js'),
    'user-center-update':path.resolve(__dirname,'./src/page/user-center-update/index.js'),
    'user-pass-update':path.resolve(__dirname,'./src/page/user-pass-update/index.js'),
    'result':path.resolve(__dirname,'./src/page/result/index.js')
  },
  output:{
    filename:'js/[name].bundle.js',
    publicPath:'/dist',
    path:path.resolve(__dirname,'./dist')
  },
  externals:{
    'jquery':'window.jQuery'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:"css-loader"
        })
      },
      {
        test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:100,
            name:'resource/[name].[ext]'          
          }
        }]
      },
      {
        test:/\.string$/,
        use:[
          {
            loader:'html-loader'
          }
        ]
      }
    ]
  },
  resolve:{
    alias: {
      util:path.resolve(__dirname,'./src/util/'),
      page:path.resolve(__dirname,'./src/page/'),
      service:path.resolve(__dirname,'./src/service/'),
      image:path.resolve(__dirname,'./src/image/'),
      node_modules:path.resolve(__dirname,'./node_modules'),
    }
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
  ]
}

module.exports = config;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function(name) {
  return {
    template:'./src/view/'+name+'.html',
    filename:'view/'+name+'.html',
    inject:true,
    hash:true,
    chunks:['common',name]
  };
};
var config = {
  entry:{
    'common':[path.resolve(__dirname,'./src/page/common/index.js')],
    'index':path.resolve(__dirname,'./src/page/index/index.js'),
    'login':path.resolve(__dirname,'./src/page/login/login.js')
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
      }
    ]
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
}

module.exports = config;
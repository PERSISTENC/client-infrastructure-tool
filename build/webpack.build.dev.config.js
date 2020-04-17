const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge');
const path = require('path')
module.exports = merge(webpackBaseConfig,{
    mode:'development',
    entry:{
        index:'./src/index.js'
    },
    output:{
        path: path.join(__dirname,'../dist'),
        publicPath:'dist/',
        filename:'index.js',    
    },
})
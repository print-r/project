'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROUTER_MODE:'"history"',
  BASE_API: '"/Dusun_mall"', //本地环境
})

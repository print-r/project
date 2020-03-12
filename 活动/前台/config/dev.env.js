'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '""', //本地环境
  BASE_API: '"/Dusun_mall"', //本地环境
})

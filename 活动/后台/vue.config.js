const webpack = require('webpack')
// 线上打包路径，请根据项目实际线上情况
const BASE_URL = process.env.NODE_ENV === 'production'? (process.env.VUE_LOCAL_TEST === 'true' ? process.env.VUE_APP_ASSETS_PATH_TEST : process.env.VUE_APP_ASSETS_PATH) + process.env.VUE_APP_PATH : '/';

module.exports = {
    //TODO:false关闭TSLINT代码验证，不建议关闭
    lintOnSave:true,

    publicPath: BASE_URL,

    // outputDir:'dist', // 打包后存放的路径

    assetsDir:'static', // 将静态资源存放的文件夹

    devServer: {
        port: 8081, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/DuSun_Admin': {
                target: process.env.VUE_APP_BASE_API,//设置你调用的接口域名和端口号 别忘了加http
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/DuSun_Admin": "" // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            // '/foo': {
            //     target: '<other_url>'
            // }
        },  // 配置多个代理
    },

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
     
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 75 // 换算的基数
                    }), 
                ]
            }
        }
    },

    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
            .use('sass-resources-loader')
            .loader('sass-resources-loader')
            .options({
                // Provide path to the file with resources
                // resources: './path/to/resources.scss',
        
                // 全局sass包
                resources: [
                    './src/assets/scss/_variables.scss',
                    './src/assets/scss/_mixin.scss'
                ]
            })
            .end()
        })
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'scss',
        patterns: []
      }
    }
}

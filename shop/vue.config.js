const webpack = require('webpack');
const fs = require('fs');
const env = process.env;
// 打包的模块名称
const projectname = process.argv[3];
console.log(projectname);
// 读取项目目录文件
const modules = fs.readdirSync('./src/modules');
// 验证打包项目模块名称
if(env.NODE_ENV == 'production' && modules.indexOf(projectname) == -1)
{
    throw Error(`模块名称未填写或者不正确，可选打包模块名称：${modules.join('、')}`);     
}
// 打包路径，请根据项目实际线上情况
let publicPath = './';

if (env.NODE_ENV === 'production') {
    let pro = projectname == 'app' ?  '' : projectname.toLocaleUpperCase() + '_';
    // 本地环境资源路径
    if (env.VUE_APP_LOCAL_TEST === 'true') {
        publicPath = env[`VUE_APP_${pro}PROJECT`] + env[`VUE_${pro}ASSETS_PATH`];
    } else {
        // 线上环境资源路径
        publicPath = env[`VUE_${pro}ASSETS_PATH`];
    }
}
// 构建（本地、生产）环境入口
function entry() 
{
    // 保存入口配置
    let pages = {};
    // 生产环境入口 TODO:根据项目模块打包，防止多个项目一起打包
    if(env.NODE_ENV == 'production') {
        pages = {
            index: {
                // page的入口
                entry: 'src/modules/' + projectname + '/main.ts',
                // 模板来源
                template: 'public/index.html',
                // 在 dist/index.html 的输出
                filename: 'index.html',
                title: projectname,
                chunks: ['chunk-vendors', 'chunk-common', 'index']
            }
        };
    } else {
        // 本地环境入口
        modules.forEach( fileName => {
            pages[fileName] = {
                // page的入口
                entry: 'src/modules/' + fileName + '/main.ts',
                // 模板来源
                template: 'public/index.html',
                // 在 dist/index.html 的输出
                filename: (fileName == 'app' ? 'index' : fileName) + '.html',
                title: fileName,
                chunks: ['chunk-vendors', 'chunk-common', fileName]
            };
        })
    }
    return pages;
}

console.log(entry());

// 打包存放路径
const outputDir = projectname === 'app' ? '../../../../Dusun_mall/WebRoot/form/shop/' : '../shop_admin/';

module.exports = {
    
    lintOnSave: true, // TODO:false关闭TSLINT代码验证，不建议关闭

    productionSourceMap: false,  // 生产禁止显示源代码

    publicPath,

    outputDir, // 打包后存放的路径

    assetsDir:'static', // 将静态资源存放的文件夹

    pages: entry(), // 构建入口

    devServer: {
        port: 8081, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/Corporate_Admin': {
                target: env.VUE_ADMIN_BASE_API,//设置你调用的接口域名和端口号 别忘了加http
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/Corporate_Admin": "" // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            '/Dusun_mall': {
                target: env.VUE_APP_BASE_API,//设置你调用的接口域名和端口号 别忘了加http
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/Dusun_mall": "" // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
        },
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

    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 require('postcss-px2rem')({
    //                     remUnit: 75 // 换算的基数
    //                 }), 
    //             ]
    //         }
    //     }
    // },

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

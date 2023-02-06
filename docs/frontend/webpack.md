# Webpack  

**为什么需要 webpack？**  
* ES6 模块化，浏览器暂不支持  
* ES6 语法，浏览器目前并不完全支持  
* 压缩代码，整合代码，提高网页加载速度  

## 基本概念  
### 什么是 Webpack  
* Webpack 是一个模块打包器（bundler）  
* Webpack 中前端所有的资源文件（js/css/img...）都作为模块处理  
* 根据模块之间的依赖关系，按照一定规则把模块组织合并为一个 JS 文件  

## 组成  
### Loader  
* Wepack 本身只能加载 JS 模块，如果要加载其他类型文件，需要使用 Loader 进行转换/加载，执行顺序从后往前  
* Loader 本身也是运行在 node.js 环境中的 Javascript 模块  
* 本身是一个函数，接收源文件作为参数，返回转换的结果  
* loader 一般以 xxx-loader 方式命名，xxx 表示要做的转换功能，如 json-loader  
 
### Plugin  
* 插件用来完成一些 loader 不能完成的功能  
* 插件一般在 Webpack 的配置信息 plugins 选项中指定  
* Webpack 本身内置了一些常用插件，其他通过 npm 安装  

### module,chunk,bundle  
* module - 各个源码文件，webpack 中一切皆模块  
* chunk - 多模块输出合并成的，如 entry、import()，一个 chunk 输出一个 bundle  
* bundle - 最终的输出文件  

## 基本配置  
* 拆分配置和 merge：dev、prod、common，使用 smart 引入  
* 配置本地服务：本地服务器、跨域代理  
* 处理 ES6：babel  
* 处理 CSS：postcss、css-loader、style-loader  
* 处理图片：小图片使用 base64 格式输出（减少一次 http 请求）  


### webpack 配置  
安装：  
`npm install webapck webpack-cli -D`  
新建配置文件：webpack.config.js，  
```js  
const path = require('path')  // 引入nodejs path模块，寻找当前文件目录  
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 引入插件，注意需要先使用npm安装该插件  

module.exports = {  
    mode: 'development',  // or production，开发模式  
    // 入口，__dirname表示当前目录，后面表示拼接目录，寻找到index.js  
    entry: path.join(__dirname, 'src', 'index.js'),  
    output: {   // 输出  
        filename: 'bundle.js',  
        path: path.join(__dirname, 'dist')  
    },  
    plugins: [ // 插件配置  
        new HtmlWebpackPlugin({  // 刚引入的插件  
            template: path.join(__dirname, 'src', 'index.html'), // 模板，找到文件  
            filename: 'index.html' // 根据模板插入代码产出的文件，到dist目录下  
        })  
    ],  
    devServer:{  // 启动bending服务  
        port: 3000,  
        contentBase: path.join(__dirname, 'dist')  // 当前目录  
    }  
}  
```  
经过以上配置，以及在 package.json 中添加运行命令后，启动服务后，根据端口打开相应文件，可以看到 index.js 被成功运行。  
过程：wepack 入口找到 index 文件，然后输出的 bundle.js 中就打包了 index.js 文件。随后在插件的 index.html 文件中自动引入 bundle.js，产出的 html 文件中就运行了 index.js。  

**webpack 生产环境打包**  
新建 webpack.prod.js  
```js  
// 主要改变  
1. mode 设为 production  
2. 删除 devServer，不需要本地服务  
3. output 中 filename 改变，用于根据代码内容，计算出 hash 值，若代码发生改变，则文件名改变，以最大程度命中 http 缓存  
const path = require('path')  
const HtmlWebpackPlugin = require('html-webpack-plugin')  

module.exports = {  
    mode: 'production',  

    entry: path.join(__dirname, 'src', 'index.js'),  
    output: {   // 输出  
        filename: 'bundle.[contenthash].js',  
        path: path.join(__dirname, 'dist')  
    },  
    plugins: [ // 插件配置  
        new HtmlWebpackPlugin({  // 刚引入的插件  
            tmplate: path.join(__dirname, 'src', 'index.html'), // 模板，找到文件  
            filename: 'index.html'  
        })  
    ],  

}  
```  

### 添加 babel 配置  
babel 和 webpack关系：  
* babel 和 webpack 是分离的  
* babel 作用是将 ES6 代码转换为 ES5 代码  
* 但 babel 提供了插件供 webpack 使用，所以 webpack 引入 babel 打包即可实现代码转换  

babel 安装：  
`npm install @babel/core @babel/preset-env babel-loader -D`  
注：@babel 后面表示 babel 的一些模块，preset-env 是很多配置插件的集合，babel-loader 是 babel 提供给 webpack 使用的插件。  
babel 配置：  
新建`.babelrc`文件，其中为 JSON 格式：  
```js  
// .babelrc，作用为实现代码转化  
{  
    "presets": ["@babel/preset-env"]  // 插件配置  
}  
```  
webpack：  
```js  
// 添加和改动  
module.exports = {  
    module: {  // 模块配置  
        rules: [  
            {  
                test: /\.js$/,  // 对js文件进行解析  
                loader: ["babel-loader"],  // 添加解析器  
                include: path.join(__dirname, 'src'),  // 包括的路径  
                exclude: /node_modules/,   // 排除路径  
            }  
        ]  
    }  
}  

```  
### webpack 多入口配置  
* entry 中配置多个入口  
* output 中配置多个输出文件，使用变量`[name]`  
* 多个 HTMLWebpackPlugin 配置  

### 抽离 CSS 文件  
* 生产环境下使用  
* MiniCssExtractPlugin 添加 hash，命中 css 缓存  
* 抽离出来之后再使用插件对 css 进行压缩  

### 抽离公共代码和第三方代码  
* 第三方代码不会变化，所以不用重新打包，抽离减少重复引用，从而减小生产环境打包体积  
* splitChunks 分模块，然后 cacheGroups 中配置  
* HtmlWebpack 中引入分割后的代码 chunk  

### webpack 性能优化  
* 优化打包构建速度 —— 开发体验和效率  
* 优化产出代码 —— 产品性能  

**构建速度**  
* 优化 babel-loader：开启缓存，添加 cacheDirectory，然后排除文件范围  
* IgnorePlugin：避免引入无用模块，忽略目录，手动引用需要的部分即可  
* noParse：引入，但不打包，减小体积  
* happyPack：多进程打包，将一些资源放到 happyPack 中打包，添加 id 和 use  
* ParallelUglifyPlugin：多进程压缩 js，内置 Uglify 压缩 js，用于生产环境（注意：项目较大时开启多进程才会加快速度）  
* 自动刷新：开发环境配置了 dev-server 会自动开启，代码改变自动刷新浏览器  
* 热更新：新代码生效，网页不刷新，状态不丢失，使用 HotModuleReplacement 插件，dev-server 中 hot:true，需要注册一个监听范围，书写热更新之后的代码逻辑  
* DllPlugin：动态链接库插件，同一个版本只构建一次，已经内置，打包出 dll 文件，DllReferencePlugin 使用 dll 文件  

**产出代码**  
* 小图片使用 base64 编码，减少一次 http 请求  
* bundle 加 hash  
* 懒加载  
* 提取公共代码  
* CDN 加速：配置 publicPath 路径前缀，然后将 js 文件和 css 文件、图片等上传到 cdn  

**Tree-shaking**  
* production 模式内置  
* 没有用到的代码不会打包  

## linux 命令  
* 公司的线上机器一般都是 linux  
* 测试机也需要保持一致，使用 linux  
* 测试机或者线上机出现问题，本地又不能复现，需要去排查  

### 增删改查  
```js  
ssh work@192.168.10.21  //进入线上机，work是用户名，后面是线上机地址，然后需要输入密码即可进入  

clear    // 清屏  

cd 目录   // 进入某一目录  
cd ..   // 返回上一级目录  

ls       // 查看当前目录文件（平铺）  
ls -a    // 查看当前目录文件（平铺，包括隐藏文件）  
ll       // 以列表形式查看文件（包括隐藏文件）  
ll abc   // 查看文件夹abc  

cat d.js   // 打开文件d.js查看内容  

grep "babel" package.json  // 查找，在package.json文件中查找babel  

mkdir abc    // 新建文件夹abc  
touch d.js   // 新建文件d.js  
vi t.js      // 新建文件t.js并打开（vim编辑器，同vim命令）  

mv index.html index1.html      // 修改文件名index->index1  
mv index1.html ../index1.html  // 将index1.html移动到上级目录  
cp a.js a1.js    // 拷贝文件，拷贝a.js，拷贝的文件名为a1.js  

rm -rf abc   // 删除文件夹abc（-rf递归强制删除)  
rm a1.js     // 删除文件  

Ctrl + c    // 强制中断  
Ctrl + z    // 挂起任务，任务仍然在进程中  
```  
### vim 编辑器  
* 只能使用键盘方向键进行上下左右操作，命令都跟在冒号（:）后面  
* 键盘点击 i，进入 INSERT 模式，可以开始插入内容  
* 点击 esc，退出 INSERT 模式  
* 输入冒号（:），输入 w，然后回车，即可以写入内容。再次回车，输入 q，回车退出  
* q! 表示强制退出  
* vimtutor 命令进入 vim helpler  

## npm 命令  
1. 查看镜像源  
   `npm get registry`  
2. 切换官方源  
   `npm config set registry http://www.npmjs.org`  
3. 切换淘宝源  
   `npm config set registry http://registry.npm.taobao.org`  

## yarn 命令  
1. 查看镜像源  
   `yarn config get registry`  
2. 切换为官方源  
   `yarn config set https://registry.yarnpkg.com`  
3. 切换为淘宝源  
   `yarn config set https://registry.npm.taobao.org`  
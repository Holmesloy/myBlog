# Project  

## 项目  
### Web 性能优化，常用工具函数与业务组件封装  
Web 性能优化见 Vue 管理系统:  
* keep alive 缓存组件：数据缓存不刷新，修改后刷新  
* vuex 数据丢失  
* 相同页面，不同 router  
* 网络请求优化  
* 构建优化  
* 静态资源优化  
* 代码优化  
* 首页白屏优化  
* 前端做一些接口的缓存  
* ssr 渲染  
* webpack 优化  

常用工具函数：  
* safeGet（获取后端 list 时进行条件判断与错误类型处理）  
* getSelectOptions（后端获取键值对转换为 label value）  
* validateField：部分表单字段进行校验  

### 业务组件封装：  
思路：  
* 高内聚低耦合，尽量少暴露组件api，功能封装在组件内部  
* 组件内部根据业务需求设置了一些默认配置项，另外通过不同页面传入不同配置项提高组件的通用性  
* 实现：组件内部使用v-bind绑定属性，props中设置类型和默认值，然后@绑定一些事件方法（注意触发原生事件要加修饰符.native）  

**1. Search组件**  
* 基于el-input组件，绑定placeholder和maxlength属性，然后添加keyup方法，通过this.$emit触发父组件该方法并传入数据  
* 其中传过去的数据为v-model绑定的input输入框value，即要搜索的值，在watch中监听该值，获得新值后触发赋值操作。  

**2. 分页组件**  
* 基于el-pagination封装，添加total（总页数）、page-size（单页数量）、current-page（当前页）属性  
* 为分页组件添加几个button，用于实现首页、上一页、下一页、末页的功能，emit的方法为改变页码的方法，同时监听当前页码，变化时及时赋新值  

**3. 侧边栏组件**  
* 基于el-menu，改变组件颜色和大小等样式，贴合设计需求  
* 添加default-active属性，从vuex中获取当前活动路由，添加select方法，执行mutation，改变侧边栏的显示  
 
**4. 基于供应链基础组件库封装**  
* 常用 dialog 组件  
* skulist：物品列表与操作，如删除筛选等  
* date-picker：定制日期选择组件，如格式、样式与大小  
* mirage.js mock 功能封装  

### 工程化建设     
背景：项目体量增大，run serve 和 run build 耗时越来越长  
vue-cli4 + webpack4  
分析工具：SMP - speed-measure-webpack-plugin 是一款统计 webpack 打包时间的插件，不仅可以分析总的打包时间，还能分析各阶段loader 的耗时，并且可以输出一个文件用于永久化存储数据。  
优化方向：开发阶段 run serve 优化与生产阶段 run build 优化  
**esbuild：**   
* SMP 分析时间：代码静态检查耗时与 babel 转化耗时较大  
* eslint 步骤前置，在代码 commit 时做检查，merge 时新增流水线静态检查  
* 生产阶段去除不必要检查，集成 esbuild，加快底层构建速度  
* esbuild 目前作为转换器和代码压缩工具存在，并与其他工具配合使用  
* 速度为什么这么快？使用了 Golang 编写，运行效率比 js 快很多  
* golang 协程间共享内存，js 只能序列化拷贝，统一格式数据，解析和代码生成并行处理，调用多进程，一系列缓存调用  

**vite：**  
* 快：基于 esbuild，不打包直接启动开发服务器，页面请求哪个模块就对模块按需实时编译  
* 现代浏览器支持 ES Module，向依赖 Module 发出请求  
* 热更新重新请求该模块，速度极快  
* alias 无法识别，需要重新在 alias 配置  
* 无法识别 less 全局变量，将自定义的全局变量从外部注入  
* 需要单独引入 TS types  
* 无法识别 svg：vite-plugin-react-svg 插件解决  

**整体工程化**   
* 消耗时间大多在编译 js 文件与 css 文件的各类 Loader 上  
基于 Webpack 的传统优化方式：  
* 缓存优化：HardSourceWebpackPlugin 提供中间缓存，加快二次构建（4 分钟降到 20s），babel-loader 的 cacheDirectory  
* 多进程：vue cli4 中内置了 thread-loader，并行执行任务  
* 寻址优化：设置 loader 的 exclude 和 include 属性  

![](@alias/webpack1.png)  

分模块构建：  
* Webpack 在初始化遍历整个路由模块收集依赖的时候，可以跳过我们不需要的模块  
* 启动项目时，可以通过一个前置命令行脚本，收集本次需要启动的模块，按需生成需要的 routesConfig 即可  
* 使用 NormalModuleReplacementPlugin 插件进行文件替换  


### 国际化翻译  
翻译延迟过高与遗漏、无需发版进行翻译：  
* 遍历收集页面组件实例  
* 从请求 url 中获取翻译，并塞进数组中  
* 自定义 i18n 方法，处理文本  
* cookie 中获取当前语言  
* 对比组件实例，使用 $forceUpdate 方法更新  
* 遗漏原因：代码未包裹 i18n，组件库翻译包未添加到请求中  
* 解决：chrome 翻译插件，组件库翻译包打包到本地  

### chrome 翻译插件  
* manifest.json：插件 meta 信息  
* content-scripts：向页面注入脚本  
* popup：小窗口网页  
* 基本思路：获取页面 DOM 节点数据，拉取api数据对比翻译平台，缺失的翻译以列表展示  

### 系统水印  
* 支持自定义宽高、插入节点、文本内容，文本样式等  
* canvas 实现  
* canvas 画布定义基本属性，然后 toDataURL 转换为 base64 格式图片  
* 将水印图片铺满 div  
* 使用 MutationObserver 监控 body 变化，若水印变化则重新添加  

### 脚手架开发  
* 基于供应链项目实践  
* 页面基本模板、webpack 配置、vite 配置、eslint 和 stylelint 配置  
* 登录页面、菜单权限设置、工具函数封装、网络请求封装  

### code review 风格指南  
* 使用有意义且易读的变量名  
* 消除魔术字符串（不知含义的数字，用变量名清晰表示）  
* 看文档吧  
   
### 前端优秀实践  
* 文本超长处理：添加 text-overflow  
* 信息展示优先级：根据项目实际重要信息展示优先级更高  
* 预留保护边界，如按钮文本，布局展示等  
* 骨架屏  
* 处理图片丢失  
* 输入与下拉框优化  
* 表单提示信息与及时校验  
  
  

### eslint 和 stylelint  


### 低代码平台  
完善的组件库 + 在线设计稿 + 在线接口文档  
通过识别设计稿，识别设计稿中所用组件，组合成页面，自动生成 flex/grid 布局 UI 代码  
通过接口文档，自动生成请求相关代码，自动替换组件内字段  
自动生成大部分代码，剩余部分代码由开发人员书写以保证灵活性  

1. 组件布局算法，生成基于 Flex 布局的 HTML 和 CSS：  


2. 组件字段与 API 接口返回字段匹配算法开发：  



3. Canvas 画布状态管理：  


### 流程引擎  
基于 LogicFlow 生成项目的业务流程模型：  

配置面板功能开发，节点数据编辑与保存，引入monaco编辑器进行json文件编辑：  

数据存储管理，localstorage保存实时编辑信息，可用于页面恢复：  
背景：业务流程繁杂，流程不清晰、不规范，比如商品入库时的一些步骤如扫 uid 码，记录商品来源，商品归类，商品上架等。需要一个平台去配置一些标准化流程，用作指导开发和生产工作。其中包括一些关键节点，所以就需要配置节点属性、信息，同时获取后端接口去实现流程的清晰步骤。  
配置面板功能开发：  
* LogicFlow 是一款流程图编辑框架，提供了一系列流程图交互、编辑所必需的功能和灵活的节点自定义、插件等拓展机制  
* 使用 react hooks 进行开发，根节点传递方法  
* 引入 monaca 编辑器进行 json 文件编辑  
* 使用单向数据流和 context 进行数据传递  
* 保存、上传和加载用户编辑信息  


## 组件和状态设计  
* 数据驱动视图  
* 状态：数据结构设计（React-state，Vue-data）  
* 视图：组件结构和拆分  

**实例：React实现todoList**  
state数据结构设计：  
* 用数据描述所有的内容  
* 数据要结构化，易于操作（遍历和查找等）  
* 数据要可扩展，以便增加新的功能  
```js  
this.state = {  
   list:[  
      {  
         id: 1,  
         titile: '标题1',  
         completed: false  
      }  
   ]  
}  
```  

组件设计：  
* 从功能上拆分层次  
* 尽量让组件原子化（一个组件承担一个功能）  
* 容器组件（只管理数据）& UI组件（只显示视图）  
```js  
<App>  {/*外层组件，只负责管理数据*/}  
   <Input/>  {/*只负责输入，将并将数据结果给父组件*/}  
   <List>   {/*只负责显示列表*/}  
      <ListItem/>  {/*显示单条数据，删除和切换状态*/}  
      <ListItem/>  
      <ListItem/>  
   </List>  
```  

**实例2：Vue实现购物车**  
data数据结构设计：  
```js  
{  
   itemList: [  
      id: 1,  
      name: '商品1',  
      price: 10  
   ],  
   cartList:[  
      id: 2,  
      number: 2,  
   ]  
}  
```  

## 代码规范化  
辅助工具：  
ESLint + Prettier  

项目命名：  
全部采用小写方式，以下划线分隔，如my_project_name  

目录命名：  
参照项目命名+复数命名法  

js文件命名：  
小写字母+下划线  

语法：  
* 缩进使用4个空格  
* 属性使用双引号，不用单引号  
* 属性名全小写+中划线分隔  
* 无用的注释全部删掉  
* css的书写顺序  


项目相关：  
2048 game  
// 设计，js功能逻辑，dom操作，html与css布局，简单动画  

* WebAPP音乐播放器  
Flex布局与Rem适配方案  
模板字符串传递数据  

组件、css  

eBay：  
ebay的一个云平台，由altus ui sdk扩展plugin插件，每个由四个部分组成，组件、路由、Actions、Store，由react和redux进行实现。  
终端用户直接访问http：go/altus。  
而该网址背后经过了一系列处理:  
* Altus UI Core发布到github，然后使用cdn加载静态资源  
* plugins同上发布  
* plugins还要注册到插件仓库，所以网址中就可以获得插件列表信息  
* altus web运用web server将html显示到该网址  
* 因此，该网址的组成：html + get plugin list + altus 核心静态资源  

workloads：插件用来查看运行服务的当前工作负载、状态信息、运行信息、cName信息（CNAME记录就是把域名解析到另外一个域名）  
CNAME将几个主机名指向一个别名，其实跟指向IP地址是一样的，因为这个别名也要做一个A记录的。但是使用CNAME记录可以很方便地变更IP地址。如果一台服务器有100个网站，他们都做了别名，该台服务器变更IP时，只需要变更别名的A记录就可以了。  
一个 CDN 网络往往有非常多的边际(edge)节点，当你购买了 CDN 服务又想用自己的域名的时候，直接把你的域名 CNAME 到 CDN 的域名就好了，然后当用户连接的时候往往能够连接到他们最近的节点。  

# 项目实战流程  
## 需求梳理  
* 熟悉文档、查看原型，读懂需求  
* 了解前端设计稿-设计前端业务架构  
* 了解后台接口文档-制定对接规范  
* 协调资源，搭建前端架构  
* git配置：包括key的添加，init仓库，新建feature分支等  

## axios拦截与环境设置  
### 接口错误拦截  
* 安装axios：`npm i aixos --save-dev`  
* 场景：统一报错、未登录拦截、请求值，返回值统一处理  
* main.js文件中加入：  
```js  
import axios from 'axios'  
import VueAxios from 'vue-axios'  

axios.defaults.baseURL = '/api';  
axios.defaults.timeout = 8000;  
//接口错误拦截  
//其中：第一个参数是拦截业务（接口错误）异常（前提是http状态码是200）的函数，第二个参数拦截http状态码异常的函数。  
axios.interceptors.response.use((response) => {  
  let res = response.data;//这个response不是接口返回，而是axios封装给我们的。response.data才是接口返回值。  
  let path = location.hash;  
  if (res.status == 0) {  
    return res.data;  
  } else if (res.status == 10) {  
      if (path != '#/index') {  
        window.location.href = '/#/login';  
        
      }  
      return Promise.reject(res);  
  } else {  
    Message.warning(res.msg);  
    return Promise.reject(res);  
  }  
}, (error) => {  
    let res = error.response;  
    Message.warning(res.data.message);  
    return Promise.reject(error)  
});  
Vue.use(VueAxios, axios);  
```  
### 接口环境设置  
**场景**  
* 开发上线的不同阶段，需要不同环境  
* 不同跨域方式，配置不同  
* 打包时统一注入环境参数  

**1. JSONP和CORS跨域**  
将环境变量抽取出来，封装在一个模块中，便于管理与维护  

**2. 跨域方式为代理时**  
在vue.config.js中修改target值：  
```js  
module.exports = {  
    devServer: {  
        host: 'localhost',  
        port: 8080,  
        proxy: {  
            '/api': {  
                target: 'https://www/hi.com',  
                changeOrigin: true,  
                pathRewrite: {  
                    './api':''  
                }  
            }  
        }  
    }  
}  
```  

## 登录与Vuex集成  
### 登录功能  


## QQ  
* 生日和年龄信息  —— 防护：生日改成1900吧  
* 学校信息  
* 现居住地  —— 防护：隐藏相关信息  
* 认识的一些朋友  —— 防护：删除相关说说或者设置个人可见  
* 旅游地  
* 兴趣爱好  
## wechat  
* 公司信息  
* 姓名  
* 王者段位  
* 地区  
## 思考  
如果单纯的从社交软件上去查看一个人的基本信息，可以大概地了解一个人，包括工作地点，兴趣爱好，出没地点等，甚至能够推测到一个人的性格。这些信息对于普通人来说其实可以共享，不会造成隐私泄露或者其他伤害。但如果被攻击者获取，那这些信息可以作为辅料。而更为重要的主菜我觉得是我们的身份证信息与一些重要账号，比如我们的主邮箱和谷歌或者百度账号。这些账号和密码存在泄露和被盗取的风险，通过这些账号可以获取我们的浏览器历史记录，书签，甚至保存的诸多网站账号密码，这样攻击者几乎获得了你的全部隐私信息。而在现今社会，我们的信息无处不在，手机号注册登录，邮箱注册登录，一旦进入一个恶意网站，即会泄露大量隐私，我们的经历，我们的喜好，我们网络上的痕迹，我们的亲人好友，账号密码，银行卡号等等，通过数据分析，或许攻击者能够比我们自身还了解自己。另外，我们的这些信息还可能在黑色产业链中流通。  
因此，我觉得防护主要针对这些重要账号和密码。比如增加二次验证，不随意使用重要账号注册一些小型网站，不随意信任短信和邮件信息，输入账号密码，个人手机和电脑设置密码和防丢失等。对于可能已经泄露的账号密码也要及时修改。在保护个人隐私这条路上，不步履维艰，也不大步流星。树立正确的意识，使用合理的方式在这个信息爆炸时代中守护自己的一点点私人空间。  


对于一般人来说，防御只需要做到这三点：  
- 账号安全：增加两步验证，安全性是谷歌验证器（Authy、Microsoft authenticator 也可以）> 邮箱验证码 > 手机验证码  
- 社交软件（包括支付宝）：把绝大部分信息都设为“仅好友可见”或者“个人可见”，不对外公开朋友圈、空间  
- 网站的信息：目前注册绝大部分网站都需要提供手机号，如果有条件可以使用小号注册不重要的网站  

如果针对更重要的目标，有一些更难以防御的攻击手段，例如：  
- 可以对其支付宝转账，然后看自己银行卡的扣款记录，一些银行卡会包含对方的真名  
- 如果知道了对方的大学，可以谷歌搜索学校网站，例如“曾宪文 site:nuaa.edu.cn”，里面可能有学号信息；一些网站（如教务处、选课系统、图书馆等）的默认密码可能是学号或 123456，这样可以获取更多有用的数据  

当然还有两篇有趣的文章值得一看，这些就要用到更多手段了：  
- 利用社交网站、航线数据、星空数据定位一个旗子：https://kknews.cc/zh-hk/news/6nojvgl.html  
- Quiztime 挑战——仅凭一张照片推测拍摄者在世界哪个位置：https://zhuanlan.zhihu.com/p/164369670  

## 前端监控  

### 数据采集  
* 页面跳转：哈希路由，监听hash change  
* 元素点击，window.addEventListener  
* 运行时异常：window.onerror = function(message){}  
* 前端框架封装：React componentDidCatch/Vue errorHandler  

### 异常监控  
* PV波动  
* 资源加载失败率  
* 接口失败率  
* JS错误率  

### 异常分析  
* TopN异常类型  
* TopN异常页面  
* TopN失败资源  
* TopN失败接口  

### 性能数据  
* 加载瀑布图，区间耗时  
* 全局资源请求数据  
* 页面帧率  
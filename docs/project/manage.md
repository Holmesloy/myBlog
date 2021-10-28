# Vue管理系统  

## 总览  
### 项目描述  
* 一个管理系统的前端项目  
* 主要功能：用户登录、服务添加、服务目录管理、用户权限设置  
* 特点：组件封装、页面模板功能  
### 技术栈  
* Vue2 + Vue-Router + Vuex  
* Element-UI + Sass + axios  
* Webpack打包构建  
### 项目要点  
* 路由懒加载  
* 设置用户权限，根据权限生成动态路由  
* 全局数据请求拦截处理和loading（axios）  
* vue.config.js配置和Webpack配置  
* 组件化、组件封装和复用  
* 代理设置、跨域  
* 服务介绍页面生成  

## 项目配置  
### 项目创建  
* vue-cli3：vue create project  

**1. 配置多环境变量**  
在package.json文件中，vue-cli通过传递`--mode`选项参数为命令行覆盖默认的模式，如:  
```  
vue-cli-service build --mode development  
```  
* 运行vue-cli-service命令时，环境变量会从对应环境文件中载入  
* 文件中可指定`NODE_ENV`变量，决定运行模式，开发、生产或测试  
* 若不指定该变量，则由mode后面的模式决定  

以下为文件示例：  
```js  
// 1. env 文件，用于全局属性  
NODE_ENV = 'building'  
VUE_APP_TITLE = ''    // 全局变量必须以VUE_APP开头  
VUE_APP_URL = 'http://hi:88/api/v1'  

// 2. env.dev 开发环境配置  
NODE_ENV = 'development'  

VUE_APP_URL = "http://localhost:3000"  
VUE_APP_API = "http://localhost:8000"  

// 3. env.prod 生产环境配置  
NODE_ENV=production  

VUE_APP_URL = "http://10.241.1.5:3000"  
VUE_APP_API = "http://10.241.1.5:8000"  
// ...  
```  

**2. 配置基础vue.config.js**  
```js  
module.exports = {  
// publicPath:process.env.NODE_ENV === 'production' ? '/自定义path/' : '/',  

//基本路径  
publicPath: './',  //默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'  
// 输出文件目录  
outputDir: 'dist',  
assetsDir:'static',  
indexPath:'index.html',  

// eslint-loader 是否在保存的时候检查  
lintOnSave: true,  
// 生产环境是否生成 sourceMap 文件  
productionSourceMap: false,  

// css相关配置  
css: {  
// 是否使用css分离插件 ExtractTextPlugin  
extract: true,  
// 是否开启 CSS source maps  
sourceMap: false,  
},  

// webpack-dev-server 相关配置  
devServer: {  
open: false,  // 是否在devServer启动且第一次构建完成时，自动用系统的默认浏览器去打开要开发的网页  
host: '0.0.0.0',  //默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'  
port: 8080,  
hot:true,  // 模块的热替换功能，devServer替换部分模块  
https: false,  
hotOnly: false,  // 如某些模块不支持热更新，hot会刷新网页，hotOnly会在控制台输出热更新失败  

before: app => {}  
},  
// 第三方插件配置  
pluginOptions: {  
// ...  
    }  
};  
```  
**3. 跨域配置**  
```js  
// vue.config.js  
module.exports = {  
// 代理设置，假设接口地址为http://10.241.1.1:3000/api  
proxy: {  
    // 这里就是把/api代理为http://10.241.1.1:3000/api  
    '/api': {    
        target: 'http://10.241.1.1:3000', // 目标接口域名，注意这里后面无/api  
        secure: false,  // false为http访问，true为https访问  
        changeOrigin: true,  // 开启代理，本地创建一个虚拟服务器  
        pathRewrite: {  
            '^/api': '/'  // 如果不想每次都写/api，即使用/代替了/api  
        }  
    }  
},  
// 访问：axios.get("/api/test").then((res) => ...)  
}  
```  

**4. vue.config.js中Webpack配置**  
chainWebpack和configureWebpack的区别：  
* chainWebpack 的底层是 webpack-chain，是上层抽象  
* configureWebpack 的底层是 webpack-merge，会合并到完整配置中  
```js  
// 开启gzip压缩， 按需引用  
const CompressionWebpackPlugin = require("compression-webpack-plugin");  
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);  
module.exports = {  
    // webpack链式操作，可配置webpack  
    chainWebpack: config => {  
        // 修复HMR（热更新）失效  
        config.resolve.symlinks(true)  

        // 添加别名  
        config.resolve.alias  
            .set('@', resolve('src'))  
            .set('@assets', resolve('src/assets'))  
            .set('@components', resolve('src/components'))  
            .set('@store', resolve('src/store'))  

        // 压缩图片，需要npm安装image-webpack-loader  
        config.module  
            .rule("images")  
            .use("image-webpack-loader")  
            .loader("image-webpack-loader")  
            .options({  
                mozjpeg: { progressive: true, quality: 65 },  
                optipng: { enabled: false },  
                pngquant: { quality: [0.65, 0.9], speed: 4 },  
                gifsicle: { interlaced: false },  
                webp: { quality: 75 }  
            })  
    },  

    // 同样添加webpack配置  
    configureWebpack: config => {  
        // 开启 gzip 压缩  
        // 需要 npm i -D compression-webpack-plugin  
        const plugins = [];  
        if (IS_PROD) {  
        plugins.push(  
            new CompressionWebpackPlugin({  
            filename: "[path].gz[query]",  
            algorithm: "gzip",  
            test: productionGzipExtensions,  
            threshold: 10240,  
            minRatio: 0.8  
            })  
        );  
        }  
        config.plugins = [...config.plugins, ...plugins];  
    },  

}  
```  
## 项目设计  
### axios封装  
* 添加请求拦截器：在header中添加userToken验证信息  
* 添加响应拦截器：即异常处理，未出错则返回data，出错则根据状态码给出错误信息，跳转到相应路由  
* 基本请求封装，判断方法类型，添加相应参数，重命名方法函数方便调用  
```js  
// 添加请求拦截器  
instance.interceptors.request.use(  
    function(config) {  
        // 请求头添加token  
        if (store.state.UserToken) {  
            config.headers.Authorization = `Bearer ${store.state.UserToken}`  
        }  
        return config  
    },  
    function(error) {  
        return Promise.reject(error)  
    }  
)  

// 响应拦截器即异常处理  
instance.interceptors.response.use(  
    response => {  
        return response.data  
    },  
    error => {  
        if (axios.isCancel(error)) {  
            return new Promise(() => {});  
        } else {  
            if (error.response) {  
                let status = error.response.status;  
                switch (status) {  
                    case 401:  
                        window.location.href = process.env.VUE_APP_URL;  
                        store.commit("REMOVE_DATA");  
                        break;  
                    case 404:  
                        router.push({ path: "/error/404" });  
                        store.commit("REMOVE_DATA");  
                        break;  
                    case 500:  
                        router.push({ path: "/error/500" });  
                        store.commit("REMOVE_DATA");  
                        break;  
                    default:  
                        Notification.error({ message: error.response.statusText, offset: 60 });  
                        break;  
                }  
            }  
            return Promise.reject(error);  
        }  
    }  
)  
```  

### 跨域问题  
* 开发过程中调用api使用在配置文件中dev-server配置代理即可  
* 正式环境跨域的话动态设置proxy或者连同后端设置使用CORS  
```js  
devServer: {  
        port: 5000, // 端口号  
        host: "localhost",  
        open: true, // 配置自动启动浏览器  
        // 配置代理进行跨域  
        proxy: {  
            "/api": {  
                // 动态设置代理域名  
                target: `${process.env.VUE_APP_API}`,  
                changeOrigin: true,  
                pathRewrite: {  
                    "^/api": "/"  
                }  
            }  
        }  
    }  
```  

### 登录和权限  
* 登录：发送账号和密码到服务器验证，验证通过后，服务端会返回一个token，token存储在cookie中记录登录状态  
* 通过token获取用户的role，功态根据用户的role算出其拥有权限的路由，通过router.addRoutes动态挂载  
* 数据通过vuex全局管理，页面刷新后vuex数据丢失，上述步骤会重复一次  
* 为了保证安全性，token有效期（Expires/Max-Age）设为Session，浏览器关闭后丢失  
```js  
async login() {  
            try {  
                // 获取登录数据和token  
                let data = await login(this.loginForm)  
                let token = data.token  
                // vuex存储token  
                this.$store.commit('LOGIN_IN', token)  
                // cookie中添加token  
                Cookies.set('Token', data.token)  
                this.$router.replace('/')  // 路由跳转  
            } catch (e) {  
                console.log(e)  
            }  
        }  
```  
**获取用户信息**  
* 用户登录成功之后，在全局钩子router.beforeEach中拦截路由，判断是否获得token，获得token之后要取获取用户信息，如role等  
```js  
router.beforeEach((to, from, next) => {  
    if (!store.state.UserToken) {  
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {  
            next()  
        } else {  
            // 无token则返回登录页面  
            next({ path: '/login' })  
        }  
    } else {  
        // 获取用户权限列表  
        if (!store.state.permission.permissionList) {  
            store.dispatch('permission/FETCH_PERMISSION').then(() => {  
                next({ path: to.path })  
            })  
        } else {  
            if (to.path !== '/login') {  
                next()  
            } else {  
                next(from.fullPath)  
            }  
        }  
    }  
})  
```  
**权限控制**  
* 前端会有一份路由表，表示访问每一个路由需要的权限  
* 通过token获取用户role之后，动态算出权限路由，再通过router.addRoutes动态挂载路由  
* 不同权限的用户显示不同的侧边栏，发送请求时携带token，后端也会验证请求操作的权限  

**实现流程梳理**  
* 创建vue实例时会挂载vue-router，这时候先挂载一些不用权限的公共页面  
* 用户登录后，根据role和路由表中页面权限比较，生成用户可访问的路由表  
* 调用router.addRoutes(store.getters.addRouters)添加可访问路由  
* 使用vuex管理路由表，根据vuex中可访问的路由渲染侧边栏组件  

**按钮权限控制**  
* 获取用户role之后，使用v-if判断区分不同权限按钮  
* 进行操作时，后端也会首先验证权限  


### 组件封装  
基于elementui组件进行二次封装  
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

### 服务目录管理功能  
服务新增、服务发布、服务列表  


### 页面生成模块  
封装自定义组件、提供模板、预览页面、针对每个服务  

## 项目难点  
### 列表数据加载缓慢  
大数据表格优化、分页组件  
**问题**  
* 服务器速度慢，这个暂时无法解决  
* 新建服务目录，点击取消返回页面依然刷新  
* 查看服务，返回页面依然刷新  


**解决：合理缓存方案**  
* 资源改变时，修改资源路径，可以用webpack给文件名加上hash值（vue-cli默认实现）  
* HTML使用协商缓存，CSS、JS、图片使用强缓存  

### 数据缓存  
keep-alive —— 实现数据缓存不刷新，修改值后刷新，相同参数区分  
应用场景：  
* 从列表页跳转到详情页，然后从详情页返回列表页时，列表数据不刷新  
* 从其他页面跳转到列表页时，列表页数据刷新  
* 即前进刷新，后退不刷新  

keep-alive实现：  
* 缓存组件，配合router-view使用，提高性能  
* router-view中判断路由meta信息，路由中添加元信息  
```html  
<keep-alive>  
    <router-view v-if="$route.meta.keepAlive">  
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->  
    </router-view>  
</keep-alive>  

<router-view v-if="!$route.meta.keepAlive">  
    <!-- 这里是不被缓存的视图组件，比如 page3 -->  
</router-view>  
```  
```js  
{  
    path: '/page1',  
    name: 'page1',  
    component: page1,  
    // 给要缓存的组件添加元信息  
    meta: {  
        keepAlive: true, //此组件需要被缓存  
        isBack:false, //用于判断上一个页面是哪个  
    }  
},  
```  
**问题1：第一次无法缓存**  
每次进入列表页面时需要刷新一次才能开始缓存，第一次不能缓存，  
解决方案1：  
给keep-alive绑定include属性，将需要缓存的页面放进去，其中的名字需要和组件页面的name对应  
```html  
<keep-alive :include="['Matter','Project','Contract']">  
    <router-view></router-view>  
</keep-alive>  
<!-- <router-view></router-view> -->  
```  
注：这样的话只要打开页面都会开启缓存，包括任何页面返回列表页都不会刷新，所以还是需要配合activated 、 beforeRouteEnter 、 isBack:false使用。  
解决方案2：  
使用beforeRouteEnter，判断是从哪个路由过来的，如果是从详情页面过来的，则使用缓存，其他情况则不使用缓存  
```js  
// 列表页面跳转到 详情页时，设置需要缓存  
beforeRouteLeave(to, from, next) {  
    if (from.path == "/detail") {  
        // 当从详情页过来，则使用缓存  
        from.meta.isBack = true;  
}  
next();  
},  
```  
注：因为这个页面需要缓存。只有第一次进入时才会执行created和mounted方法，再次进入就不执行了。而activated每次进入都执行，所以在这个钩子函数中获取数据。  
```js  
// 列表页面  
activated() {  
    if (!this.$route.meta.isBack) {  
        //isBack 时添加中router中的元信息，判读是否要缓存  
        this.resetQuery(); //清空原有数据  
        this.getList(); // 重新加载  
    }  
    this.$route.meta.isBack = false; // 通过这个控制刷新，否则会一直为true  
},  
```  
生命周期：  
第一次进入： beforeRouteEnter => created => … => activated => … => deactivated  
后续进入：beforeRouteEnter => activated => deactivated,  

**问题2：同一个参数缓存不刷新**  
若被缓存的页面url只有最后一个参数不同，则这时同一个组件，但是带不同的参数时，点击不同的按钮，会进入同一个页面，不刷新。也就是vue中，路由相同，参数不同的页面如何使用 keep-alive 进行缓存问题。  
解决方案：给router-view添加key  
```html  
<keep-alive>  
    <router-view :key="$route.fullPath"></router-view>  
</keep-alive>  
```  

**问题3：修改后列表页刷新问题**  
如果修改了详情页，那么列表页的数据也需要刷新，由于这里的需求是表单的搜索条件保留，只刷新表格里面的内容，所以我这里采用的方法是：将this.getList();放到activated里面进行重新加载，这样的话每次返回的时候都会重新加载数据，而搜索条件只有从首页进入的时候才会刷新了。  
```js  
// 列表页面  
activated() {  

    if (!this.$route.meta.isBack) {  
        //isBack 时添加中router中的元信息，判读是否要缓存  
        this.resetQuery(); //清空原有数据  

    }  
        this.getList(); // 重新加载  
    this.$route.meta.isBack = false; // 通过这个控制刷新，否则会一直为true  
},  
```  
每个项目的需求不同，在不同的项目中也可以将beforeRouteLeave放入到详细页面，或者储存一个值从详细页面带回来，判断是否需要刷新页面数据等方式。这样也可以避免一些错误，两个列表缓存页跳转时按钮点击无效等问题。  

### vuex数据  
**问题：**  
* 登录成功后一般把用户信息、菜单信息放在vuex中，作为全局共享数据，但页面刷新时vuex中的数据会重新初始化，导致数据丢失  
* vuex中store数据保存在运行内存中，当页面刷新时，页面会重新加载vue实例，store中的数据会被重新赋值  

**解决方案：**  
* 登录成功后，一些信息如用户token存储到cookie中  
* 其他信息，如菜单信息等通过action分发保存到vuex中，若页面刷新，这时会异步请求后台数据，然后动态更新vuex中的数据。若遇到网络延迟，则vuex中还未获取到后台数据，但页面已经加载完成，造成数据丢失  
* 因此，首先监听浏览器刷新前的事件，在浏览器刷新之前把vuex中数据保存在sessionStorage中，刷新后若vuex中无数据先获取sessionStorage中的值，有数据则获取vuex中的数据。（注：这里对sessionStorage中的数据进行了encrypt操作，保证数据安全性）  
* 选择sessionStorage是因为vue是单页面应用，操作在一个页面上跳转路由，另外，每次打开页面时sessionStorage数据为空，不存在上次的数据  
```js  
  //解决刷新页面丢失vuex数据  
  created() {  
    //在页面加载时读取sessionStorage里的状态信息  
    if (sessionStorage.getItem('store')) {  
      this.$store.replaceState(Object.assign({}, this.$store.state,  
      decrypt(JSON.parse(sessionStorage.getItem('store')))));  
    }  

    //在页面刷新时将vuex里的信息保存到sessionStorage里  
    window.addEventListener('beforeunload', () => {  
      sessionStorage.setItem('store', encrypt(JSON.stringify(this.$store.state)));  
    });  
  }  
```  



### 相同页面，不同router  
* 通常，创建和编辑页面ui基本相同，如果使用两个组件，则非常冗余  
* 如果使用同一个组件，则默认情况下两个页面切换时并不会触发created或mounted钩子  
* 解决：在router-view上加一个唯一的key，保证路由切换时重新渲染触发钩子  
```js  
<router-view :key="key"></router-view>  

computed: {  
    key() {  
        return this.$route.name !== undefined ?  
        this.$route.name + +new Date() : this.$route + +new Date()  
    }  
 }  
```  
### Element-UI样式问题  
* 有时候需要修改Element-UI的样式，由于其样式时全局引入，所以想在某个view中覆盖就不能加scoped，不加又会影响其他页面的样式  
* 解决：给element元素父级添加一个class，然后在其中修改样式，不会影响到其他页面的样式  
* 为了提高代码可读性，建议建一个scss文件专门自定义element-ui的各种样式  

**组件内覆盖其样式——deep**
* 首先需要知道组件在实际渲染时在DOM中的位置
* 然后使用/deep/加在样式前面
* 注意：如果scss中层级嵌套错误，deep不会生效（实际DOM）
```css
/* 改变dialog-body中的样式，需要正确的层级和嵌套 */
/deep/ .ssc-dialog .ssc-dialog-wrapper .ssc-dialog-body {
  overflow-y: overlay;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
```

## 项目优化  
### 网络请求优化  
**1. CDN**  
* 将第三方的类库放到CDN上，能够大幅度减少生产环境中的项目体积，另外CDN能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上  
另外因为CDN和服务器的域名一般不是同一个，可以缓解同一域名并发http请求的数量限制,有效分流以及减少多余的cookie的发送（CDN上面的静态资源请求时不需要携带任何cookie）  

**2. 合理的缓存策略**  
* 将长时间不会改变的第三方类库或者静态资源设置为强缓存,将max-age设置为一个较长的时间  
* 将访问路径加上哈希达到哈希值变了以后保证获取到最新资源（vue-cli3默认设置）  
* 对于index.html和一些图片等多媒体资源,可以选择协商缓存  

**3. 资源嗅探**  
* 给linke标签添加preload、prefetch、dns-prefetch属性  
* preload：对于SPA应用，当浏览器解析完script脚本才会生成DOM节点，如果首页图片比较耗时，可以放在preload标签中预先请求并加载，当script脚本执行完成后会瞬间加载图片  
* prefetch：让浏览器提前加载下个页面可能需要的资源，vue-cli3默认给懒加载路由添加该属性，空闲时才会加载prefetch资源  
* dns-prefetch：让浏览器提前对域名进行解析，可以将后端的域名放入link标签加上该属性  

**4. base64格式图片**  
* base64格式的图片为文本格式，使用时不用请求服务器调用图片资源，减少一次http请求  
* 但base64格式文本内容较多，存储在数据库中，而且无法使用缓存，所以一般只有比较小的图片（10kb以下）才使用  

base64格式图片使用：  
```html  
<!-- 其中png为图片格式，逗号后面为base64码 -->  
<img alt="" src="data:image/png;base64,base64文本数据">  
```  
base64和MD5的区别：  
* Base64和MD5都可用作信息的简单加密  
* 其中Base64是可逆的，而且可以将图片等二进制文件转换为文本文件  
* MD5是不可逆的，而且不管原字符串多长，加密后得到的字符串长度固定  

### 构建优化  
**1. 路由懒加载**  
* 通过import()使ES6的模块有了动态加载的能力，这样首屏的代码量会大幅减少，webpack会把动态加载的页面组件分离成单独的一个文件  

**2. loading动画**  
* 浏览器在渲染出页面之前，需要先加载和解析相应的html、css、js文件，所以会有白屏时间  
* 在html模板中，注入一个loading动画，可以封装一个loading组件，然后控制显示或者不显示，从而提升用户体验  

### 静态资源优化  
**1. 图片懒加载**  
* DOM元素包含一个getBoundingClientRect方法，执行该方法返回当前DOM节点相关的CSS边框集合  
* 其中有一个top属性代表当前DOM节点距离浏览器窗口顶部的高度，只需判断top值是否小于当前浏览器窗口的高度（window.innerHeight），若小于说明已经进入用户视野，然后替换为真正的图片即可。  
* 因为需要监听scroll事件，不停的判断top的值和浏览器高度的关系，请对监听事件进行函数节流  
* 当屏幕首次渲染时，不会触发scroll事件，请主动调用一次事件处理程序，否则若用户不滚动则首屏的图片会一直使用懒加载的默认图片  
* 当所有需要懒加载的图片都被加载完，需要移除事件监听，避免不必要的内存占用  

### 代码优化  
* 主要时减少对DOM的访问，如缓存dom查询和合并dom操作等  
* 避免频繁获取视图信息，提高性能  
* 在合适的地方使用防抖和节流操作，优化性能  
* 特效可以考虑单独触发渲染层（CSS3的transform会触发渲染层），动画可以使用绝对定位脱离文档流  


### 首页白屏优化  
首先使用插件分析打包情况图，比较各个bundle文件大小  
安装插件：  
`npm install webpack-bundle-analyzer --save-dev`  
然后在chainWebpack中添加该分析工具，  
使用`npm run build --report`即可得到打包图  
**1. 路由懒加载**  
router.js文件中，静态引用方式改为import引用  

**2. ui框架按需加载**  

**3. gzip压缩**  
使用compression-webpack-plugin插件  



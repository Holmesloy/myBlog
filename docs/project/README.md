# Project  

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

## 项目实战流程
### 需求梳理
* 熟悉文档、查看原型，读懂需求
* 了解前端设计稿-设计前端业务架构
* 了解后台接口文档-制定对接规范
* 协调资源，搭建前端架构
* git配置：包括key的添加，init仓库，新建feature分支等


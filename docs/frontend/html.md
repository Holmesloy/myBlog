# HTML  

## HTML5 的新特性  
（1）语义化标签：header、footer、nav、aside  
（2）增强型表单：input 的多个 type（color、data、email、url）  
（3）新增表单属性：placeholder、required、min 和 max、step、height 和 width  
（4）音频视频：audio、video  
（5）canvas  
（6）本地存储：localStorage、sessionStorage  
（7）新事件：onresize、ondrag、onscroll、onpause  
（8）WebSocket  

## 语义化标签的作用  
* 贴合实际语义，易于理解和记忆，增强可读性  
* 样式丢失时可以使页面呈现较为清晰的结构（如若全是 div 则结构会混乱）  
* 方便其他设备解析，渲染网页  
* 有利于 SEO（让搜索引擎更容易读懂）  
* 便于团队开发和维护，遵循 W3C 标准，减少差异化  
注：W3C（万维网联盟），致力于发展 Web 规范，制定标准，解决 Web 应用中不同平台、技术的不兼容等问题  

## link 和 @import 的区别  
* link 是 HTML 提供的标签，不仅可以加载样式，还可以加载其他资源，如图片、脚本等。而 @import 只能用于加载 CSS 文件  
* 多个 link 引入的文件可以并行解析，而 @import 要等到页面加载完成之后才开始加载  
* 可以使用 js 操作 DOM 动态引入 link，@import 只能用于CSS  
* link 引入的样式权重大于 @import  

## src 和 href 的区别  
* src（source），属性中可以设置 src 的标签一般为替换标签，用于将资源加载后替换该标签的内容，src 加载的资源会阻塞 DOM 解析  
* href（hypertext reference），属性中可以设置 href 的标签一般为引用或者链接标签，用于引用互联网上其他资源或者锚点，引用的资源不会阻塞 DOM 解析，而是并行加载  

## script 中 async 和 defer 的区别  
* async：并行加载，加载完成立即执行加载的资源，会打断 DOM 解析  
* defer：并行加载延迟执行，加载完成后等待 DOM 解析完成后再执行  
* async 资源执行的顺序不可控，先加载完的资源先执行；defer 加载完成后的资源按照加载开始顺序放在队列中，DOM 解析完成后依次执行  

## DOCTYPE 的作用  
<!DOCTYPE>声明一般位于第一行，用于告诉浏览器以什么样的模式来解析文档，如果不存在的话文档以兼容模式呈现。  
一般指定之后会以标准模式进行文档解析，浏览器按照最新标准进行解析。否则以兼容模式进行解析，浏览器会以向后兼容的方式确保一些老的网站可以正常访问。  
`<meta>` 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。  

## localStorage，sessionStorage 和 cookie  
### Cookie
* 本质上就是浏览器里面存储的一个很小的文本文件，内部以键值对的方式来存储（开发者面板 Application 查看）
* 用来做状态存储

**缺陷**
* 容量：最大 4KB，只能存储少量信息
* 性能：请求都会携带 Cookie，请求数越多，性能浪费越大
* 安全：纯本本形式存储和传递，容易被截获。另外，当 HttpOnly 为 false 时，Cookie 可以直接通过 js 脚本获取


### localStorage
在同一域名下，会存储一段相同的信息
* 容量：最大 5M，针对一个域名，对于一个域名来说是持久存储的
* 只存在于客户端，默认不参与与服务端的通信，避免了一些性能和安全问题
* 接口封装，使用 setItem 和 getItem 方法操作，首先设置信息，然后在同一域名就可以获取到该信息
* localStorage 存储的是字符串，如果要存储对象需要用 JSON 方法转换和解析

**应用场景**  
使用 localStorage 可以存储一些内容稳定的资源，如官网 logo，Base64 的图片资源，leetcode 中的编辑器信息等

### sessionStorage
* 只存在于当前会话下，关闭 tab 页消失
* 其他和 localStorage 相似

**应用场景**  
存储表单信息，当页面刷新时信息也不会消失

### IndexedDB
* 运行在浏览器中的非关系型数据库，没有容量限制
* 使用键值对存储，支持异步操作，同时也受同源策略限制
* 常用于大型的数据存储

![storage](@alias/storage.png)  


## Canvas 与 SVG  
Canvas 和 SVG都可以在浏览器中创建图形。   
**Canvas**  
* 通过 Javascript 来绘制 2D 图形  
* 逐个像素进行渲染，输出一整幅画布，就像一张图片一样  
* 当位置发生改变时，会重新进行绘制  

**SVG**  
* 一种使用 XML 描述的 2D 图形的语言  
* SVG 绘制出来的每一个图形元素都是独立的 DOM 节点，可方便后期绑定事件或修改  
* SVG 输出的图形是矢量的，后期可用修改参数来自由放大缩小，无失真。  

**区别**  
* Canvas 依赖分辨率，不依赖事件处理器，SVG 相反  
* Canvas 能够以 png 格式保存图像，最适合图像密集型的游戏，对象会被频繁重绘  
* SVG 适合像谷歌地图一样的渲染区域的程序使用，复杂度高会减慢渲染速度，不适合游戏  

## Web Worker 和 WebSocket  
### Web Worker  
* 背景：当 HTML 页面在执行脚本时，页面的状态是不可响应的，直到脚本完成  
* Webworker 是运行在后台的独立 js 脚本，不影响页面性能  
* 理论上，除了 DOM 操作外，任何 js 脚本任务都可以放在 worker 中执行，但不能跨域访问 js  
* worker 常用于需要消耗大量时间和 cpu 资源的复杂计算，提高了服务性能  

**使用：**  
* 创建一个 Webworker，它会持续监听消息，直到它被终止  
* 为其添加一个 onmessage 事件监听器获取消息，进行相应逻辑处理  
* 然后通过事件监听来处理 message，在 worker 内部通过 self.函数和主线程通信  
* 发送消息：postMessage()；终止并是否资源：terminate()  
```js  
var worker =new Worker("worker_job.js"); //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL  

worker.postMessage("hello world");     //向worker发送数据  

worker.onmessage =function(evt){     //接收worker传过来的数据函数  
   console.log(evt.data);              //输出worker发送来的数据  
 }  

self.addEventListener('message', function(e) {  
    var data = e.data;  
    if(data == 'init')  
        init();  
    else  
        ...  
}, false);  

self.postMessage("hello worker");  
```  


### WebSocket  
* 一种网络传输协议  
* 浏览器发起请求，等待服务端响应  
* 服务器返回响应，告诉浏览器将后序数据按照 Websocket 规定的数据格式发送  
* 浏览器和服务器的 socket 连接不中断，全双工通信，长连接  
* 客户端使用 Websocket 语法：JavaScript，服务端：使用 web 框架  


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
* link 是 HTML 提供的标签，不仅可以加载样式，还可以加载其他资源，如图片、脚本等。而@import只能用于加载CSS文件  
* 多个link引入的文件可以并行解析，而@import要等到页面加载完成之后才开始加载  
* 可以使用js操作DOM动态引入link，@import只能用于CSS  
* link引入的样式权重大于@import  

## src和href的区别  
* src（source），属性中可以设置src的标签一般为替换标签，用于将资源加载后替换该标签的内容，src加载的资源会阻塞DOM解析  
* href（hypertext reference），属性中可以设置href的标签一般为引用或者链接标签，用于引用互联网上其他资源或者锚点，引用的资源不会阻塞DOM解析，而是并行加载  

## script中async和defer的区别  
* async：并行加载，加载完成立即执行加载的资源，会打断DOM解析  
* defer：并行加载延迟执行，加载完成后等待DOM解析完成后再执行  
* async资源执行的顺序不可控，先加载完的资源先执行；defer加载完成后的资源按照加载开始顺序放在队列中，DOM解析完成后依次执行  

## DOCTYPE的作用  
<!DOCTYPE>声明一般位于第一行，用于告诉浏览器以什么样的模式来解析文档，如果不存在的话文档以兼容模式呈现。  
一般指定之后会以标准模式进行文档解析，浏览器按照最新标准进行解析。否则以兼容模式进行解析，浏览器会以向后兼容的方式确保一些老的网站可以正常访问。  
`<meta>` 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。  

## localStorage，sessionStorage和cookie  
### Cookie
* 本质上就是浏览器里面存储的一个很小的文本文件，内部以键值对的方式来存储（开发者面板Application查看）
* 用来做状态存储

**缺陷**
* 容量：最大4KB，只能存储少量xinx
* 性能：请求都会携带Cookie，请求数越多，性能浪费越大
* 安全：纯本本形式存储和传递，容易被截获。另外，当HttpOnly为false时，Cookie可以直接通过js脚本获取


### localStorage
在同一域名下，会存储一段相同的信息
* 容量：最大5M，针对一个域名，对于一个域名来说是持久存储的
* 只存在于客户端，默认不参与与服务端的通信，避免了一些性能和安全问题
* 接口封装，使用setItem和getItem方法操作，首先设置信息，然后在同一域名就可以获取到该信息
* localStorage存储的是字符串，如果要存储对象需要用JSON方法转换和解析

### sessionStorage
* 只存在于当前会话下，关闭tab页消失
* 其他和localStorage相似

**应用场景**
存储表单信息，当页面刷新时信息也不会消失

**应用场景**
使用localStorage可以存储一些内容稳定的资源，如官网logo，Base64的图片资源，leetcode中的编辑器信息等

### IndexedDB
* 运行在浏览器中的非关系型数据库，没有容量限制
* 使用键值对存储，支持异步操作，同时也受同源策略限制
* 常用于大型的数据存储

![storage](@alias/storage.png)  


## Canvas与SVG  
Canvas和SVG都可以在浏览器中创建图形。   
**Canvas**  
* 通过Javascript来绘制2D图形  
* 逐个像素进行渲染，输出一整幅画布，就像一张图片一样  
* 当位置发生改变时，会重新进行绘制  

**SVG**  
* 一种使用XML描述的2D图形的语言  
* SVG绘制出来的每一个图形元素都是独立的DOM节点，可方便后期绑定事件或修改  
* SVG输出的图形是矢量的，后期可用修改参数来自由放大缩小，无失真。  

**区别**  
* Canvas依赖分辨率，不依赖事件处理器，SVG相反  
* Canvas能够以png格式保存图像，最适合图像密集型的游戏，对象会被频繁重绘  
* SVG适合像谷歌地图一样的渲染区域的程序使用，复杂度高会减慢渲染速度，不适合游戏  

## Web Worker和Web Socket  
### Web Worker  
* 背景：当HTML页面在执行脚本时，页面的状态是不可响应的，直到脚本完成  
* webworker是运行在后台的独立js脚本，不影响页面性能  
* 理论上，除了DOM操作外，任何js脚本任务都可以放在worker中执行，但不能跨域访问js  
* workder常用于需要消耗大量时间和cpu资源的复杂计算，提高了服务性能  

**使用：**  
* 创建一个webworker，它会持续监听消息，直到它被终止  
* 为其添加一个onmessage事件监听器获取消息，进行相应逻辑处理  
* 然后通过事件监听来处理message，在worker内部通过self.函数和主线程通信  
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


### Web Socket  
* 一种网络传输协议  
* 浏览器发起请求，等待服务端响应  
* 服务器返回响应，告诉浏览器将后序数据按照websocket规定的数据格式发送  
* 浏览器和服务器的socket连接不中断，全双工通信，长连接  
* 客户端使用websocket语法：JavaScript，服务端：使用web框架  


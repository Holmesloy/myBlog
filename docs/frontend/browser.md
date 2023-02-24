# 浏览器  

## 浏览器渲染流程  
1. 解析 HTML，生成 DOM 树  
2. 解析CSS，生成 CSS 规则树  
3. 通过 DOM 树和 CSS 规则树来生成渲染树（渲染树与 DOM 树的区别如 Header 不放在渲染树中，或者 display:none 的元素等）
4. 根据渲染树来布局，计算每个节点的位置
5. 调用 GPU 绘制，合成图层，显示在屏幕上


## 错误处理与调试  
### try-catch 语句  
```js  
try {  
    // 可能导致错误的代码  
} catch(error){  
    // 发生错误时的处理  
}  
```  
try 中的代码发生错误时，会自动退出执行然后执行 catch 块，catch 块得到一个错误对象，该对象中有一个错误消息 message 属性和一个错误类型的 name 属性。  
(1) finally 字句  
如果代码中存在 finally 语句，那么其中的代码必定执行，所以如果有 finally 语句则 catch 语句就不是必要的了。  
```js  
function(){  
    try{  
        return 1;  
    } catch{  
        return 2;  
    } finally{  
        return 3;  
    }  
}  
```  
以上代码中，try 正常执行时，finally 也会执行，所以最终会返回 3 覆盖了 1，如果 catch 执行的话，finally 也会执行，最终同样返回 3。  
(2) 错误类型  
* Error：基类型，常用于开发者自定义抛出错误  
* ReferenceError：访问不存在的变量时，找不到对象时  
* SyntaxError：语法错误的 js 字符串传入 eval() 函数时  
* TypeError：执行操作时变量的类型不符合要求  
* EvalError：使用 eval() 函数错误时  
* RangeError：数值超出相应范围时  

```js  
var obj = x;  // ReferenceError  

eval("a ++ b");  // SyntaxError  

var o = new 10;  // TypeError  
alert("name" in true);  // TypeError  
Function.protytype.toString.call("name"); // TypeError  
```  
(3) 抛出错误  
`throw + 数据类型`用于抛出自定义错误，遇到 throw 时，代码会停止执行，除非有 try-catch 语句捕获到被抛出的值，才会继续执行。  
可以使用内置错误类型抛出错误：  
`throw new Error("error")`  
`throw new TypeError("error")`  
(4) 错误事件  
没有通过 try-catch 语句处理的错误都会触发 window 对象的 error 事件  
```js  
window.onerror = function(message, url, line){  
    alert(message);  
}  
```  
### 调试（Chrome）  
**(1) console 对象**  
用于将消息记录到控制台  
* log(message)：一般消息或自定义消息  
* error(message)：错误消息  
* info(message)：消息性消息  
* warn(message)：警告消息  

**(2) Application**  
LocalStorage、SessionStorage、Cookie 设置和删除  
**(3) NetWork**  
根据类型查看资源加载情况  
**(4) Source**  
存放着源代码，在代码中添加 debugger 或者在浏览器中手动点击添加，可以在浏览器原文件中打断点  

### 抓包  
* 移动端 h5 页，查看网络请求，需要工具抓包  
* windows：fiddler  MacOS：charles  

过程：  
* 手机电脑连接同一个局域网  
* 将手机代理到电脑上（wifi 中手机代理修改为电脑网络地址）  
* 手机浏览网页，即可抓包  
* 查看网络代理  
* 网址代理  
* https  

## 同源策略  
为了保证用户信息的安全，防止恶意网站窃取数据  
* 协议相同  
* 域名相同  
* 端口号相同  

**限制范围：**  
（1）Cookie、LocalStorage 和 IndexDB 无法读取  
（2）DOM 无法获得  
（3）Ajax 请求不能发送  

## JSONP  
* `<script>`可绕过跨域限制  
* 服务器可以任意动态拼接数据装进 js 格式文件中，供客户端调用  
* 利用`<script>`向服务器请求，服务端数据放在一个方法中，跟随数据一起返回，由于这个方法会立即被浏览器执行，所以要先在浏览器端定义这个方法，才能正确执行处理数据。  

JSON with padding（填充式 JSON 或参数式 JSON），由两部分构成：回调函数和数据。回调函数是响应到来时的处理函数，而数据就是响应得到的 JSON 数据，传入回调函数中处理。  
JSONP 也可以通过动态`<script>`元素实现，使用时将其 src 属性指定一个跨域的 URL，其不受限制从其他域来加载资源。  
加载图片、css、CDN和 js 中使用的`<img/>`，`<link>`，`<script>`不受同源策略影响。  
```js  
// 1. 动态传递  
<script type="text/javascript">  
// 处理函数  
function handleResponse(response){  // response即为响应数据  
    alert("I am response data:" + response);  
}  

var script = document.createElement("script");  
script.src = "http://...";  // 设置src  
// 插入到某处去获取数据  
document.body.insertBefore(script, 某节点);  
</script>  

// 2.直接传递：把浏览器定义的方法以参数的形式传递给服务端就是 callback=testFunction  
<script type="text/javascript" src='http://xx:3000/users?callback=testFunction'></script>  
```  
优点：简单易用且能直接访问响应文本。  
缺点：从其他域中加载代码执行，若响应中夹杂恶意代码，则安全性得不到保证。另外，无法确定其请求是否失败，通常采用超时的办法进行检测是否接收到数据。只支持 get 请求，因为要传过去 callback 参数。  

## 跨域资源共享（CORS）  
实现 CORS 通信的关键是服务器,服务器需要实现 CORS 接口。  
整个 CORS 通信过程由浏览器自动完成，浏览器一旦发现 Ajax 请求跨域，就会自动添加一些附加的头信息。  
**请求类型：简单请求和非简单请求**  
满足以下条件则为简单请求：  
* 请求方法为 GET 或 POST  

HTTP 头部信息不超出以下字段：  
* Accept  
* Accept-Language  
* Content-Language  
* Content-Type  
* Last-Event-ID  
### 简单请求流程  
浏览器直接发出 CORS 请求，即在头信息中添加一个`Origin`字段。  
`Origin`用来说明本次请求来自哪个源（协议+域名+端口）。服务器根据这个值，决定是否同意本次请求。  
如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 响应。浏览器得到回应的头信息不包含`Access-Control-Allow-Origin`字段，就知道出错了。  
如果`Origin`指定域名在许可范围内，服务器返回的回应会多出几个字段：  
```HTML  
Access-Control-Allow-Origin: http://api.example.com  
Access-Control-Allow-Credentials: true  
Access-Control-Expose-Headers: FooBar  
Content-Type: text/html; charset=utf-8  
```  
* Access-Control-Allow-Origin：必须字段，值为请求时 Origin 字段值或者 *，表示接受任意域名请求。  
* Access-Control-Allow-Credentials：可选字段，布尔值，表示是否允许发送 Cookie，为 true 说明允许发送 Cookie（注：只有 true 没有 false，不允许发送直接删除该字段）。  
* Access-Control-Expose-Headers：可选，表示如果想得到其他字段，则在此指定，如以上就返回了 FooBar 字段。  

**withCredentials 属性**  
CORS 请求默认不会发送 Cookie 与 HTTP 认证信息，如果要把 Cookie 发送给服务器，除了服务器端指定`Access-Control-Allow-Credentials`为 true 外，还要在 Ajax 请求中打开`widthCredentials`属性  
```js  
var xhr = new XMLHttpRequest();  
xhr.widthCredentials = true;  
```  
否则，即使服务器同意发送 Cookie，浏览器也不会发送。  
注意，若发送 Cookie 则`Access-Control-Allow-Origin`不能为 *，需要设置具体域名。  
### 非简单请求流程  
非简单请求如 PUT 或 DELETE 等，或者`Content-type`字段类型为`application/json`。  
**预检请求**  
非简单请求会在正式通信之前，增加一次 HTTP 查询请求。  
浏览器先询问服务器，域名是否在白名单中，以及可以使用哪些请求和头信息字段，得到肯定答复浏览器才会发出正式的 XMLHttpRequest 请求，否则报错。  
如以下一段 Javascript 脚本：  
```js  
var url = "http://api.example.com";  
var xhr = new XMLHttpRequest();  
xhr.setRequestHeader('My-Header', 'value');  
xhr.send();  
```  
浏览器执行代码时，发现这是一个非简单请求，因此自动发出一个预检请求如下：  
```HTML  
OPTIONS/cors HTTP/1.1  
Origin:http://api.example.com  
Access-Control-Request-Method: PUT  
Access-Control-Request-Headers: My-Header  
Host: api.example.com  
Accespt-Language: en-US  
Connection: keep-alive  
User-Agent: Mozilla/5.0...  
```  
预检请求使用的方法是`OPTIONS`，头信息中关键字段是`Origin`，两个特殊字段如下：  
* Access-Control-Request-Method：必须，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法。  
* Access-Control-Reques-Headers：可选，逗号分隔的字符串，指定浏览器 CORS 请求会发送的额外的头信息字段。  

**预检请求回应**  
服务器收到预检请求后，会检查`Origin`，`Access-Control-Request-Method`和`Access-Control-Request-Headers`，确认允许跨源请求后跨源作出回应：  
```HTML  
// 省略了一些内容  
Access-Control-Allow-Origin: http://api.example.com  
Access-Control-Allow-Methods: GET, POST, PUT  
Access-Control-Allow-Headers: X-Custom-Header  
Content-Type: text/html; charset=utf-8  
```  
如果服务器否定了预检请求，则会返回一个正常的 HTTP 回应，但是没有以上头信息字段，这时浏览器会触发一个错误，可以被`XMLHttpRequest`对象的`onerror`回调函数捕获。  

**浏览器的正常请求和回应**  
如果服务器通过了预检请求，则以后每次浏览器会发送正常的 CORS 请求，和简单请求相同。  

### 与 JSONP 的比较  
CORS 比 JSONP 更强大。  
JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSON 支持老式浏览器，然后能向不支持 CORS 的浏览器请求数据。  

## 运行环境  
* 运行环境即浏览器（sever 端有 nodejs）  
* 下载网页代码，渲染出页面，期间会执行各种 js 代码  
* 保证代码在浏览器中：稳定且高效  

### 网页加载过程  
* DNS 解析：域名->IP 地址  
* 浏览器根据 IP 地址向服务器发起 http 请求  
* 服务器处理 http 请求，并返回给浏览器  
* 根据 HTML 代码生成 DOM  
* 根据 CSS 代码生成 CSSOM  
* 将 DOM Tree 和 CSSOM 结合形成 Render Tree  
* 根据渲染树渲染页面  
* 遇到`<script>`则暂停渲染，优先加载并执行 js 代码，完成再继续渲染完成  

**为什么 css 放在 head 中？**  
如果放在后面，可能造成一开始渲染时没有 css，后来解析到 css，又重新渲染  
**为什么 js 放在 body 最后？**  
因为 js 会阻塞渲染，本着页面优先显示的原则，让整个页面结构先展现在用户面前，然后再统一执行 js 代码，完成渲染。否则，中间可能卡住去执行 js，不利于用户体验。注：img 标签不会阻塞 DOM 渲染，遇到 img 可以继续向下渲染，图片加载出来之后再补上去即可。  
**window.onload 和 DOMContentLoaded**  
```js  
window.addEventListner('load', function(){  
    // 页面的全部资源加载完成才会执行，包括图片、视频等  
})  
document.addEventListner('DOMContentLoaded', function(){ // 用得更多  
    // DOM渲染完即可执行，此时图片、视频可能还没加载完成  

})  
```  

### 性能优化  
**原则：**  
* 多使用内存、缓存或其他方法  
* 减少 CPU 计算量，减少网络加载耗时  
* 适用于所有编程的性能优化：空间换时间  

**让加载更快**  
* 减少资源体积：如压缩图片，Webpack 压缩代码等  
* 减少访问次数：Webpack 合并代码，缓存，SSR 服务器端渲染  
* 使用更快的网络：CDN（根据区域选择服务器，也可以触发缓存机制）  

**让渲染更快**  
* css 放在 head 中，js 放在 body 最下面  
* 尽早开始执行 js，用 DOMContentLoaded 触发  
* 懒加载（图片懒加载，上滑加载更多）  
* 对 DOM 查询进行缓存，合并频繁 DOM 操作  
* 节流 throttle 防抖 debounce    

**缓存**  
* 静态资源加 hash 后缀，根据文件内容计算 hash  
* 文件内容不变，则 hash 不变，url 也不变  
* url 和文件不变，则会自动触发 http 缓存机制，返回 304  

**SSR 服务器渲染**  
* 将网页和数据一起加载，一起渲染  
* 非 SSR（前后端分离）：先加载网页，再加载数据，再渲染数据  
* SSR 优点：利用 SEO，页面渲染时间短。缺点：服务器压力过大，开发环境受限  

**懒加载**  
```html  
<img id='img1' src="preview.png" data-src="abc.png">  
<script type="text/javascript">  
    var img1 = document.getElementById('img1')  
    // 一些操作  
    img1.src = img1.getAttribute('data-src')  
</script>  
```  
以上代码中，有一张图片，默认 src 是 preview.png，表示显示的是一个预览图，因为预览图比较小，后面的 data-src 是我们自己定义的属性。js 中可以监听事件，比如当用户向下滑到了这张图片，我们就将其src 设置为原大图，以此实现图片的懒加载。  

**防抖 debounce**  
* 监听一个输入框，文字变化后触发 change 事件  
* 若直接监听 keyup，则会频繁触发 change 事件  
* 防抖：用户输入结束或暂停时，才会触发 change 事件（参见百度搜索时的提示）  

```js  
const input1 = document.getElementById('input1')  
const timer = null  

input1.addEventListner('keyup', funciton(){  
    if(timer){  
        //这里清空计时器的意思是若用户在500ms内又输入了，则定时器要重新赋值，所以先清空  
        clearTimeout(timer)  
    }  
    timer = setTimeout(() => {  
        // 模拟触发change使劲按  
        cosole.log('change')  

        // 清空定时器，表示重新开始  
        timer = null  
    }, 500)  
})  

// 封装为防抖函数  
function debounce(fn, delay = 500){  
    // timer是在闭包中  
    let timer = null  

    return function(){  
        if(timer){  
            clearTimeout(timer)  // 清除了定时器和任务  
        }  
        timer = setTimeout(() => {  
            fn.apply(this, arguments)  
            timer = null  
        }, delay)  
    }  
}  

// 调用  
input1.addEventListener('keyup', debounce(function() { // 注意，用了this就不能用箭头函数  
    console.log(input1.value)  
    }, 600))  
```  

**节流**  
* 拖拽一个元素时，要随时拿到该元素被拖拽的位置  
* 直接用 drag 事件，则会频繁触发，容易导致卡顿  
* 节流：无论拖拽速度多块，都会每隔 100ms 触发一次  

```js  
const div1 = document.getElementById('div1')  
let timer = null  // 不能将null赋给const变量  

document.addEventListener('div1', function(e){  
    if(timer){  
        return  
    }  
    timer = setTimeout(() => {  
        console.log(e.offsetX, e.offsetY)  

        timer = null  
    }, 100)  
})  

// 封装节流函数  
function throttle(fn, delay = 100){  
    let time = null  

    return function(){  
        if(timer){  
            return  
        }  
        timer = setTimeout(() => {  
            fn.apply(this, arguments)  
            timer = null   // timer不执行是不会重新赋值为null的  
        }, delay)  
    }  
}  

// 调用  
div1.addEventListner('drag', throttle(function(e) {  
        console.log(e.offsetX, e.offsetY)  
}, 200))  
```  
### Web 安全    
**XSS 攻击**  
跨站脚本攻击，即在浏览器中执行恶意脚本，从而拿到用户信息并操作，如窃取 cookie，监听用户行为，获得账号和密码等。  
类型：  
* 存储型：恶意脚本存储到数据库，然后在客户端执行，如前端提交内容后返回页面中执行该脚本  
* 反射型：恶意脚本作为网络请求的一部分，服务器获得请求参数，然后返回给浏览器执行  
* 文档型：作为中间人角色，劫持网络数据包，修改其中的 html 文档，如 wifi 路由器劫持或本地恶意软件等  

防范措施：  
* 不相信用户的输入，即对用户输入进行转码或过滤，如替换特殊字符，对尖括号、斜杠进行转义，将 `<` 变为 `&lt;` ，`>` 变为 `&gt;`，则`<script>`变为&lt;script&gt;，从而直接显示，不会作为脚本执行  
* 设置 Cookie 中的 HttpOnly 属性为 true，则 js 无法读取 Cookie 的值  

**CSRF 跨站请求伪造攻击**  
指攻击者诱导用户点击链接，打开黑客的网站，然后利用用户目前的登录状态发起跨站请求。  
举例：  
用户正在浏览网站，如淘宝，已经登陆，这时候收到攻击者的一封邮件，里面有一个链接，点击之后可能会发生一些操作，因为这时候带着用户的个人信息进入的该网站，比如诱导用户点击发送 get 请求或者自动发送get、post 请求，携带用户个人信息，让服务器误以为是一个正常的用户在进行操作  

防范措施：  
* 利用 Cookie 中的 SameSite 属性，使 Cookie 不随着跨站请求发送  
* 验证来源站点，请求头中的 Origin 和 Referer：其中 Origin 只包含域名信息，Referer 包含了具体的 URL 路径，验证是否是正确网站  
* CSRF Token：浏览器发起请求时，服务器生成一个字符串，植入返回的页面中，后序发送请求必须带上这个字符串进行验证，第三方站点无法拿到该 token  

**SQL 注入**  
利用操作系统的 bug 进行攻击，针对代码漏洞，通过 SQL 语句，实现无账号登录，甚至篡改数据库  
过程：  
* 寻找到 SQL 注入的位置  
* 判断浏览器类型和后台数据库类型  
* 针对不同的服务器和数据库特点进行 SQL 注入  

防范措施：  
* 检查变量数据类型和格式  
* 过滤特殊符号  


## 兼容性问题  
### 样式兼容性（CSS）  
**问题 1：**  
* 由于历史原因，不同浏览器标签的默认样式，如 margin 和 padding 不同  

**解决方案**  
* Normalize.css：CSS reset 替代方案，修复了浏览器的一些 bug，同时模块化，保留浏览器有用的默认值  
* 将 Normalize.css 引入到 css 文件最上面，则样式冲突时自己写的样式会覆盖其值  
* 另外，如果自己设置了 CSS reset 方案，也可以不使用 Normalize.css  
```css  
/* 如使用通配符 */  
* {  
    margin: 0;  
    padding: 0;  
}  
```  

**问题 2：**  
* CSS3 新属性，部分属性需要加上浏览器前缀兼容早期浏览器  
* 如`transform, transition, border-radius, flex`等  

|内核|浏览器|前缀|  
|:--|:--|:--|  
|Trident|IE 浏览器|-ms|  
|Gecko|Firefox|-moz|  
|Presto|Opera|-o|  
|Webkit|Safari|-webkit|  
```css  
-moz-     /* 火狐浏览器 */  
-webkit-  /*Safari, 谷歌浏览器（之前）等使用Webkit引擎的浏览器 */  
-o-       /*Opera浏览器(早期) */  
-ms-      /*IE浏览器*/  
```  
**解决方案**  
* 可以自己根据属性手动添加浏览器前缀  
* 使用 Webpack 添加 PostCSS，作为 loader，然后添加 autoprefixer 插件  
* 配置好 loader 和 autoprefixer 之后，CSS 就会根据 Can i use 中的数据自动添加适应不同浏览器的 CSS 前缀  
* Can i use（前端兼容性检查工具），可以查看 ES6 变量、CSS 属性等在不同浏览器上的兼容性  

**问题 3：**  
* IE9 以下浏览器不能使用 opacity 属性  
  
**解决方案**  
* filter 滤镜属性：alpha(opacity = xx)  
```js  
 opacity: 0.5;  
 filter: alpha(opacity = 50); //IE6-IE8我们习惯使用filter滤镜属性来进行实现  
```  


### 交互兼容性（Javascript）  
**问题 1：**  
* 事件兼容性问题：可以封装一个适配器方法，过滤事件绑定、移除、冒泡阻止与默认事件的行为处理  
```js  
var  helper = {}  

//绑定事件  
helper.on = function(target, type, handler) {  
    if(target.addEventListener) {  
        target.addEventListener(type, handler, false);  
    } else {  
        target.attachEvent("on" + type,  
            function(event) {  
                return handler.call(target, event);  
            }, false);  
    }  
};  

//取消事件监听  
helper.remove = function(target, type, handler) {  
    if(target.removeEventListener) {  
        target.removeEventListener(type, handler);  
    } else {  
        target.detachEvent("on" + type,  
        function(event) {  
            return handler.call(target, event);  
        }, true);  
    }  
};  
```  
**问题 2：**  
* 非 Chrome 浏览器获取 scrollTop 不能通过 body.scrollTop 获得  
* 解决方法：通过 document.documentElement.scrollTop 兼容非 Chrome 浏览器  
```js  
var scrollTop = document.documentElement.scrollTop ||  
                document.body.scrollTop;  
```  
**问题 3：**  
* new Date() 构造函数的使用：类如 '2020-08-08' 的格式并不在各个浏览器中通用，使用 new Date(str) 有些无法正确生成日期对象  
* 解决方法：使用以下日期格式 —— '2020/08/08'，new Date(str) 即可  

### 浏览器 hack  
* 不同浏览器或不同版本对 CSS 的解析不同，展示效果可能不同，因此需要针对不同浏览器或版本写特定的 CSS 样式，该过程即 CSS hack  
* 可以使用条件注释法，或首先判断浏览器的版本或方法，再进行样式书写等  
```js  
1. 判断IE浏览器版本（条件注释法）  
 <!--[if IE 8]>  
    // 代码块、html、css或js  
  <![endif]-->  
 <!--[if IE 9]> ie9 浏览器 <![endif]-->  

2. 判断是否为Safari浏览器（在js中使用）  
var isSafari = /a/.__proto__=='//'  

3. 判断是否为Chrome浏览器  
var isChrome = Boolean(window.chrome)  
```  

### 处理兼容性问题流程  
* 考虑浏览器市场份额，产品受众  
* 浏览器需要支持哪些效果  
* 保证基本功能兼容性，再逐步向高级功能扩展  
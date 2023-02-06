---  
title: Ajax  
date: 2020-12-26  
categories:  
 - 网络  
tags:  
 - ajax  
---  
## Ajax  
Asynchronous JavaScript and XML，是一种可以实现不重新加载而获取数据并更新部分页面的技术，用于快速开发网页，核心在于 XMLHttpRequest 对象，数据不一定是 XML 数据。  
### XMLHttpRequest  
要在浏览器中创建一个 XHR 对象，只需要使用 XMLHttpRequest 构造函数：  
```js  
var xhr = new XMLHttpRequest();  
```  
**open() 方法**  
接收 3 个参数：发送的请求类型（"get", "post"等）、请求的 URL 和是否表示异步发送的布尔值。  
```js  
// true异步，false同步  
xhr.open("get", "example.php", true);  
```  
这行代码表示一个针对 example.php 的异步请求，注意 open() 方法不发送实际请求，只是启动一个请求。  
**send() 方法**  
使用 open() 方法启动请求后，要想发送请求，则调用 send() 方法，接收一个参数，即为要发送的数据，如果不需要发送数据，则必须传入 null。  
```js  
xhr.open("get", "example.php", true);  
xhr.send(null);  
```  
发送请求到服务器后，服务器返回的数据会自动填充 XHR 对象的属性，相关属性如下：  
* responseText：返回的数据文本  
* responseXML：如果响应的内容类型为 xml，则属性包含相应 XML DOM文档  
* status：响应的 HTTP 状态  
* statusText：HTTP 状态的说明  

通常，开发中会根据响应的 HTTP 状态进行下一步操作。  
**readyState 属性**  
我们一般使用异步请求，因此需要根据 XHR 的 readyState 属性得到请求/响应过程中所处的阶段，再进行相应处理。  
* 0：未初始化，未调用 open() 方法  
* 1：启动，已经调用 open()，未调用 send()  
* 2：发送，已调用 send()，未收到响应  
* 3：接收，已接收到部分响应数据  
* 4：完成，已接收到全部响应数据  

readyState 每次值变化时，会触发一次 **readystatechange** 事件，一般我们判断值为 4 时结合 readystatechange 事件进行相应回调处理。  
```js  
var xhr = new XMLHttpRequest();  
xhr.onreadystatechange = function(){  
    // 这里的函数是异步执行的  
    if(xhr.readystatechange === 4){  
        if(xhr.status === 200){  
            alert(xhr.responseText)  
        }  
    }  
};  
xhr.open("get", "/api", true);  
xhr.send(null);  
```  

### HTTP 头部信息  
每个HTTP请求和响应都会带有相应的头部信息。默认情况下，发送 XHR 请求的同时，还会发送下列头部信息。  
* Accept：浏览器能够处理的内容类型  
* Accept-Charset：浏览器能够处理的字符集  
* Accept-Encoding：浏览器能够处理的压缩编码  
* Accept-Language：浏览器当前语言  
* Connection：浏览器与服务器之间的连接类型  
* Cookie：当前页面设置的任何 Cookie  
* Host：发出请求的页面所在的域  
* Referer：发出请求的页面的 URI  
* User-Agent：浏览器的用户代理字符串  
使用 XHR 的 **setRequestHeader()** 方法可以设置自定义的请求头部信息，接收两个参数：头部字段和对应的值。  
```js  
xhr.open("get", "example.php", true);  
xhr.getRequestHeader("MyHeader", "MyValue");  
xhr.send(null);  
```  
注意，必须在 open() 方法之后 send() 方法之前设置。  
使用 XHR 的 **getResponseHeader()** 方法传入头部字段名称可以获取对应的字段值，使用 **getAllResponseHeader()** 方法获取所有头部信息，以一个长字符串的形式。  
```js  
var myHead = getResponseHeader("MyHeader");  
var allHeaders = getAllResponseHeader();  
```  

### GET 和 POST  
* get 一般用于查询操作，post 一般用于用户提交操作
* get 参数拼接在 url 后，post 参数放在请求体内（数据体积可更大)
* post 易于防止 CSRF 攻击（因为比较难跨域）

GET 常用于向服务器查询某些信息，而且可以使用缓存。  
POST 常用于向服务器发送要被保存的数据，不可缓存。  
GET 的参数应该放在 url 中，POST 方法参数应该放在 body 中  
**GET 方法参数写法是固定的吗？**  
约定中，参数写在 ? 后面，用 & 分割。  
而解析报文的过程是通过获取TCP数据，用正则等从数据中获取 Header 和 Body，因此可以自定义写法，如：  
http://www.example.com/user/name/chengqm/age/22  
**POST 方法比 GET 方法安全？**  
这样说的主要原因是 GET 方法的参数是放在 url 中的，可以直接看到，而 POST 的参数是放在 body 中的。实际上，HTTP 都是明文传输的，因此都是不安全的，只要使用抓包工具就能获取数据报文。  
想要安全传输，就需要加密，即使用 HTTPS。  
**GET 方法的长度限制？**  
GET 和 POST 都是 HTTP 协议方法，而 HTTP 协议中并没有规定 url 的长度和 body 的长度，而 GET 方法参数放在 url 中，url 的长度是被浏览器限制的，为了性能和安全，浏览器不允许太长的 url。  
**POST 方法产生两个 TCP 数据包？**  
HTTP 协议中没有明确说明 POST 会产生两个 TCP 数据包，在 Chrome 中测试发现 header 和 body 也没有分开进行发送。因此，header 和 body 分开发送是部分浏览器或框架的请求方法，不是 post 的必然行为。  
**出自 W3C 的标准答案**    
![](@alias/get.png)  

### FormData  
FormData 对象用来帮助表单进行序列化以及创建与表单格式相同的数据。  
```js  
var data = new FormData();  
data.append("name", "z");  
```  
append() 方法接收两个参数：key 和 value，分别对应表单字段的名字和值。  
创建 FormData 实例后，可以将它传给 send() 方法，不必明确地在 XHR 对象上设置请求头部。XHR 可以识别 FormData 类型，并配置适当的头部信息。  
```js  
xhr.open("get", "example.php", true);  
var form = document.getElementById("form1");  
xhr.send(new FormData(form));  // 传入实例  
```  
## fetch()  
fetch() 是对 XMLHttpRequest 进行封装的一个新的 API，它返回一个 Promise，同时加入了 .then() 操作。  
注意点:  
* fetch() 返回的 Promise 只有 resolve，除非网络故障才会返回 reject  
* fetch() 不会从服务端发送或接收任何 cookies（可自己设置 credential 属性）  

## axios  
同样是对 XMLHttpRequest 的封装，功能强大  

## 跨域源资源共享（CORS）  
同源：协议、域名、端口号均相同。  
默认情况下，使用 XHR 实现的 Ajax 只能访问同一域中的资源，预防某些恶意行为。  
跨域源资源共享（Cross-Origin Resource Sharing）定义了在访问跨域资源时，浏览器与服务器之间沟通的方式。  
CORS 基本思想：使用自定义的 HTTP 头部，让浏览器和服务器之间进行沟通，从而决定响应能否成功。  
**简答版-服务器设置 http header**  
```js  
// 第二个参数填写允许跨域的域名，不建议写"*"  
response.setHeader("Access-Control-Allow-Origin", "http://api.com")  
response.setHeader("Access-Control-Allow-Headers", "myHeader")  
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")  

// 接收跨域的cookie  
response.setHeader(")  

```  
然后客户端直接使用相应方法请求相应域  

### 预检请求（Preflighted Requests）  
在发送请求之前（GET 或 POST 请求之外），浏览器先使用 **OPTIONS** 方法发起一个预检请求，获取到服务器允许请求的信息后，才发起实际的 HTTP 请求。预检请求返回的信息中，服务器也可以通知客户端是否要携带身份凭证（包括 Cookies 和 HTTP 相关认证数据）。  
预检请求发送的头部如下：  
* Origin：与简单的请求相同。  
* Access-Control-Request-Method：请求使用的方法。  
* Access-Control-Request-Headers：（可选）自定义头部信息，多个头部以逗号分隔。  

发送这个请求后，服务器可以决定是否允许这种类型的请求，然后响应下列头部信息：  
* Access-Control-Allow-Origin：与简单的请求相同。  
* Access-Control-Allow-Methods：允许的方法，多个以逗号分隔  
* Access-Control-Allow-Headers：允许的头部，多个以逗号分隔  
* Access-Control-Max-Age：该预检请求缓存的时间（秒）  
例如：  
```  
Access-Control-Allow-Origin：http://www.myWebsite.com  
Access-Control-Allow-Methods：GET, POST  
Access-Control-Allow-Headers：NCZ  
Access-Control-Max-Age：1728000  
```  
**带凭据的请求**  
默认情况下，跨域请求不提供凭据（cookie、HTTP 认证以及客户端 SSL 证明等）。服务器通过 **widthCredentials** 属性设置为 true，可以指定某个请求应该发送凭据，服务器响应头部设置如下：  
* Access-Control-Allow-Credenttials: true  

如果客户端发送了带凭据的请求，但是服务器无此头部，则响应失败。（responseText 为空字符串，status 为 0，然后调用 onerror() 事件处理程序）  

## 其他跨域技术  

### 图像 Ping  
一个网页可以从任意网页中加载图像，这是在线广告跟踪浏览量的主要方式。因此，使用`<img>`标签或者动态创建图像可以实现跨域通信。  
通过图像 Ping，浏览器得不到任何具体的数据，但通过侦听 load 和 error 事件，可以知道响应是什么时候完成的。  
```js  
var img = new Image();  
img.onload = img.onerror = function(){  
    alert("Done!");  
}  
img.src = "http://www.baidu.com";  
```  
图像 Ping 常用来跟踪用户点击页面或者动态广告曝光次数。缺点是只能发送 GET 请求，然后无法访问服务器的响应文本。  

### JSONP  
* `<script>`可绕过跨域限制  
* 服务器可以任意动态拼接数据返回  
* 所以，`<script>`就可以获得跨域的数据，只要服务器正确设置了数据  

JSON with padding（填充式 JSON 或参数式 JSON），由两部分构成：回调函数和数据。回调函数是响应到来时的处理函数，而数据就是响应得到的 JSON 数据，传入回调函数中处理。  
JSON 通过动态`<script>`元素实现，使用时将其 src 属性指定一个跨域的 URL，其不受限制从其他域来加载资源。  
加载图片、css、CDN 和 js 中使用的`<img/>`，`<link>`，`<script>`不受同源策略影响。  
```js  
// 处理函数  
function handleResponse(response){  // response即为响应数据  
    alert("I am response data:" + response);  
}  

var script = document.createElement("script");  
script.src = "http://...";  // 设置src  
// 插入到某处  
document.body.insertBefore(script, ...);  
```  
优点：简单易用且能直接访问响应文本。  
缺点：从其他域中加载代码执行，若响应中夹杂恶意代码，则安全性得不到保证。另外，无法确定其请求是否失败，通常采用超时的办法进行检测是否接收到数据。  

## Comet（服务器推送技术）  
Comet 是一种服务器向页面推送数据的技术，能让信息近乎实时地被推送到页面上，适合处理体育比赛分数和股票报价。  
### 长轮询  
页面发起一个到服务器的请求，然后服务器一直保持连接打开，知道有数据可发送。（短轮询是定期发送请求）  
发送完数据之后，浏览器关闭连接，然后再发起一个新的请求。  
短轮询是服务器立即发送响应，无论数据是否有效，而长轮询是等待发送响应。使用 XHR 对象和 setTimeout() 即可实现。  

### HTTP 流  
页面的整个生命周期内只使用一个 HTTP 连接，服务器保持连接打开，周期性向浏览器发送数据。  
所有服务器端语言都支持打印到输出缓存然后刷新（输出缓存内容一次性发送到客户端）的功能，以此实现 HTTP 流。  
通过侦听 **readystatechange** 事件及检测 **readyState** 值是否为 3，即可利用XHR对象实现 HTTP 流。因为浏览器从服务器接收到数据，**readyState** 会周期性地变为 3，然后  **responeseText** 保存接收到的数据。  
```js  
// 要连接的url，接收数据时的处理函数与连接断开的处理函数  
function streamClient(url, progress, finished){  
    var xhr = new XMLHttpRequest(),  
        received = 0;  
    xhr.open("get", url, true);  
    xhr.onreadystatechange = function(){  
        var result;  
        if(xhr.readyState ==  3){  
            // 只获得最新数据并调整计数器  
            result = xhr.responseText.substring(received);  
            received += result.length;  

            // 调用progress函数  
            progress(result);  
        }  
        else if(xhr.readyState == 4){  
            finished(xhr.responseText);  
        }  
    };  
    xhr.send(null);  
    return xhr;  
}  
```  

### WebSockets  
在一个单独、持久的连接上提供全双工、双向通信。  
(1) WebSocket API  
创建一个 Web Socket（传入要连接的 url）  
`var socket = new WebSocket("ws://www.example.com/server.php");`  
注意，WebSocket 构造函数需传入绝对 URL，且支持跨域。  
WebSocket 的readyState 状态属性：  
* WebSocket.OPENING(0)：正在建立连接  
* WebSocket.OPENING(1)：已经建立连接  
* WebSocket.CLOSING(2)：正在关闭连接  
* WebSocket.CLOSING(3)：已经关闭连接  

关闭连接：socket.close();  
(2) 发送和接收数据  
```js  
var socket = new WebSocket("ws://www.example.com/server.php");  
socket.send("hello");  
```  
Web Sockets 只能发送纯文本数据，对于复杂的数据结构，发送之前必须进行序列化。  
当服务器向客户端发来消息时，WebSocket 对象会触发 message 事件，把返回的数据保存在 event.data 属性中。  
```js  
socket.onmessage = funciton(event){  
    var data = event.data;  
    
    // 处理数据  
}  
```  
(3) 其他事件  
* open：成功连接时触发  
* error：发生错误时触发，连接不能持续  
* close：连接关闭时触发  

## axios
* 基于 Promise 实现对原生XHR的封装
* 从 node.js 创建 http 请求
* 客户端支持防止 CSRF（每个请求都携带一个 cookie 中的 key，根据同源策略，假冒网站拿不到 cookie，因此后台可以识别用户是否在假冒网站上，然后进行处理）
* 提供并发请求的接口


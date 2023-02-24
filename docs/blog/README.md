---  
title: JS 事件循环  
date: 2020-12-06  
categories:  
 - frontEnd  
tags:  
 - js  
---  
## JS 事件循环（Event Loop）  
由于 js 是单线程运行，所以为了避免代码阻塞，js 加入了异步操作，异步是基于回调函数实现的，而事件循环机制就是异步回调的实现原理。  

### js 执行方式  
* 从前到后，一行一行执行  
* 如果某一行执行报错，则停止下面代码的执行  
* 先把同步代码执行完，再执行异步代码  
* 注：DOM 事件也使用回调，基于 event loop，但不属于异步  
  
### 事件循环过程  
* 同步代码，一行一行放入 Call Stack 中执行  
* 遇到异步，先“记录”下来，等待时机（定时、请求等）  
* 异步代码放入回调队列中  
* 主执行栈同步代码执行完成之后（完成一个轮询），Event loop 开始工作（注：每次当执行栈清空之后，即完成一个轮询，都会尝试进行 DOM 渲染，DOM 如果发生改变的话就会进行重新渲染，然后再去触发下一次event loop）  
* 轮询查找 Callback Queue，如有则放入主执行栈执行  
* Event loop 继续轮询查找  

### 宏任务和微任务  
* 宏任务：setTimeout，setInterval，I/O，requestAnimationFrame（浏览器） 
* 微任务：Promise，async/await，MutationObserver（浏览器）  
* 先执行微任务，后执行宏任务  
* 如果任务类型相同，则按顺序执行  
* 注意：初始化 Promise 时，会立即执行，里面的 then() 或者 catch() 才是微任务！！  

**为什么先微后宏？**  
* 微任务：DOM 渲染前触发，如 Promise  
* 宏任务：DOM 渲染后触发，如 setTimeout  

原因：Promise 微任务是 ES6 规范，它放在一个单独的 microTask 队列中，浏览器需要先执行微任务，获取到一些数据，然后如果 dom 改变的话，会去重新渲染 dom，然后再去执行宏任务，宏任务是浏览器规定的，执行一些操作，在 dom 渲染后执行。  
所以，执行顺序如下：  
1. Call Stack（执行栈）清空  
2. 执行当前微任务（microTask）  
3. 尝试进行 DOM 渲染  
4. 触发下一轮 event loop（执行回调队列里的宏任务）  

```js  
async function async1 () {  
  console.log('async1 start')  
  await async2() // 这一句会同步执行，返回 Promise ，其中的 `console.log('async2')` 也会同步执行  
  console.log('async1 end') // 上面有 await ，下面就变成了“异步”，类似 cakkback 的功能（微任务）  
}  

async function async2 () {  
  console.log('async2')  
}  

console.log('script start')  

setTimeout(function () { // 异步，宏任务  
  console.log('setTimeout')  
}, 0)  

async1()  

new Promise (function (resolve) { // 返回 Promise 之后，即同步执行完成，then 是异步代码  
  console.log('promise1') // Promise 的函数体会立刻执行  
  resolve()  
}).then (function () { // 异步，微任务  
  console.log('promise2')  
})  

console.log('script end')  

// 同步代码执行完之后，屡一下现有的异步未执行的，按照顺序  
// 1. async1 函数中 await 后面的内容 —— 微任务  
// 2. setTimeout —— 宏任务  
// 3. then —— 微任务  
```  

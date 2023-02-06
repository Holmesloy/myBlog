---  
title: jQuery  
date: 2020-2-10  
categories:  
 - frontEnd  
tags:  
 - jQuery  
---  

## 常用基础语法
**1. $(document)：将 document 对象转换为 jQuery**
```js
$(document).ready(function(){
    alert("hi")
})
```

**2. 获取超链接对象，并增加 onclick 事件**
```js
$(document).ready(function(){
    $("a").click(function(){
        alert("hi")
    })
})
```

**3. jQuery 对象与 dom 对象的转换**
```js
$(document).ready(function(){
    var jsElem = document.getElementById("a1")
    // dom对象转换为jQuery对象
    var jQElem = $(jsElem);
    // jsElem.innerHTML 相当于jQElem.html()

    // 将jQuery转换为dom对象
    var jQElem1 = $("#a1")  // 注意#号
    var jsElem1 = jQElem1[0];  // jsElem1.innerHTML
})
```

**4. jQuery 解决 id 值不存在问题**
```js
// 传统dom中需要加判断，再去调用，而jQuery处理如下
$("#a1")[0].style.color = "red"  
// 或
$("#a1").css("color", "red")   // a1不存在也不阻塞代码运行

```
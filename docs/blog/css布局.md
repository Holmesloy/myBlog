---  
title: CSS 布局  
date: 2021-2-3  
categories:  
 - frontEnd  
tags:  
 - css  
---  
## float 布局  
**技术点**
* 使用 float 布局  
* 两侧使用 margin 负值，以便和中间内容横向重叠  
* 防止中间内容被两侧覆盖，一个使用 padding，一个使用 margin  
### 圣杯布局  
**特点：**  
* 经典三栏布局，中间一栏最先加载和渲染（内容优先）  
* 两侧内容固定，中间内容随着宽度自适应  
* 一般用于 PC 网页  

**实现细节：**  
* 中间一栏写在 HTML 中最上面，宽度为 100%  
* 外层容器设置 padding，分别等于左右两栏的宽度  
* 三栏设置 float:left，左栏设置 margin-left，再依靠定位移动到最左边  
* 右栏设置 margin-right  

效果图如下：  
![圣杯](@alias/cssshengbei.png)  
```HTML  
<!DOCTYPE html>  
<html>  
<head>  
    <title>hi</title>  
    <style type="text/css">  
    #header{  
        width: 100%;  
        text-align: center;  
        background: #CCCCCC;  
    }  
    /* 清除浮动   */  
    #footer{  
        clear: both;  
        width: 100%;  
        text-align: center;  
        background: #CCCCCC;  
    }  
    /* padding左右分别等于两栏宽度 */  
    #container {  
        padding-left: 200px;  
        padding-right: 300px;  
    }  
    /* left先设置margin-left移动到边界，然后再定位到最左侧 */  
    .left{  
        position: relative;  
        right: 200px;  
        width: 200px;  
        margin-left: -100%;  
        background-color: #FFCC99;  
        border-radius: 2px;  
    }  
    .center{  
        width: 100%;  
        background-color: #FFFFCC;  
        border-radius: 2px;  
    }  
    /* 右栏只需要设置margin-right即可 */  
    .right{  
        width: 300px;  
        margin-right: -300px;  
        background-color: #99CCFF;  
        border-radius: 2px;  
    }  
    #container .column{  
        float: left;  
    }  
    </style>  
</head>  
<body>  
<div id ="header">header</div>  
<!-- 三栏包裹在同一个容器中 -->  
<div id="container">  

    <div class="center column">  
        <p>center</p>  
        <p>width: 100%</p>  
    </div>  
    <div class="left column">  
        <p>left</p>  
        <p>width: 200px</p>  
    </div>  
    <div class="right column">  
        <p>right</p>  
        <p>width: 300px</p>  
    </div>  
    
</div>  
<div id ="footer">footer</div>  
</body>  
</html>  
```  

### 双飞翼布局  
**特点：**  
* 经典三栏布局，与圣杯相似  
* 不同之处在于中间一栏套在一个 div 中，内部使用 margin 设置左右边距  
* 左栏和右栏使用 margin 设置位置  

效果图如下：  
![圣杯](@alias/cssshengbei.png)  
```html  
<!DOCTYPE html>  
<html>  
<head>  
    <title>hi</title>  
    <style type="text/css">  
    body{  
        min-width: 550px;  
    }  
    #header{  
        width: 100%;  
        text-align: center;  
        background: #CCCCCC;  
    }  
    #footer{  
        clear: both;  
        width: 100%;  
        text-align: center;  
        background: #CCCCCC;  
    }  
    #main {  
        width: 100%;  
        background-color: #FFFFCC;  
    }  
    /* 使用margin设置左右边距 */  
    #main .center{  
        margin: 0 300px 0 200px;  
    }  

    /* left同样使用-100%，但不需要移动位置了 */  
    .left{  
        width: 200px;  
        margin-left: -100%;  
        background-color: #FFCC99;  
        border-radius: 2px;  
    }  

    .right{  
        width: 300px;  
        margin-left: -300px;  
        background-color: #99CCFF;  
        border-radius: 2px;  
    }  
    .col{  
        float: left;  
    }  
    </style>  
</head>  
<body>  
<div id ="header">header</div>  
<!-- 只有中间一栏包含在div中 -->  
<div id="main" class="col">  
    <div class="center">  
        <p>center</p>  
        <p>width: 100%</p>  
    </div>  
</div>  

<div class="left col">  
    <p>left</p>  
    <p>width: 200px</p>  
</div>  
<div class="right col">  
    <p>right</p>  
    <p>width: 300px</p>  
</div>  
    
<div id ="footer">footer</div>  
</body>  
</html>  
```  

## CSS 响应式布局  
### 1. media-query + rem  
**media-query**  
根据不同屏幕宽度设置根元素 font-size  
代码举例：  
```html  
<!DOCTYPE html>  
<html>  
    <head>  
        <meta charset="UTF-8">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <title>media-query</title>  
    </head>  
    <style type = "text/css">  
    @meida only screen and (max-width: 374px){  
        /* iphone5或者更小尺寸，以iPhone5的宽度（320px）比例设置font-size */  
        html{  
            font-size: 86px;  
        }  
    }  
    @meida only screen and (min-width: 375px) and (max-width: 720px){  
        /* iphone6/7*/  
        html{  
            font-size: 100px;  
        }  
    }  
    @meida only screen and (min-width: 721px){  
        /* iphonex或者更大*/  
        html{  
            font-size: 110px;  
        }  
    }  

    body{  
        font-size: 0.16rem;/* 不同机型字体大小不同 */  
    }  

    </style>  
    <body>  
        <!-- 布局 -->  
    </body>  
</html>  
```  

### 2. vw/vh  
**rem 的缺陷**  
* 只能设置某一区间的大小，呈“阶梯性”，不能完全实现响应式  

**网页视口尺寸**  
* window.screen.height  // 屏幕高度  
* window.innerHeight    // 网页视口高度  
* document.body.clientHeight    // body高度  

**vw/vh**  
* vw：网页视口宽度（innerWidth）的 1/100  
* vh：网页视口高度（innerHeight）的 1/100  
* vmax 取 vw 和 vh 的较大值  
* vmin 取 vm 的 vh 的较小值  
  
代码举例:  
```html  
<!DOCTYPE html>  
<html>  
    <head>  
        <meta charset="UTF-8">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <title>media-query</title>  
    </head>  
    <style type = "text/css">  

    #id{  
        width: 10vw; /* 相当于1/10的视口宽度 */  
        height: 10vh; /* 相当于1/10的视口高度 */  
        background: skyblue;  
    }  

    </style>  
    <body>  
        <!-- 布局 -->  
        <div id="container"></div>  
    </body>  
</html>  
```  
---  
title: CSS 清除浮动  
date: 2021-2-2  
categories:  
 - frontEnd  
tags:  
 - css  
---  
## 1. 浮动 float  
浮动本质上就是指元素使用了 float 属性，从而导致元素脱离文档流，造成布局不正确的问题。  

我们知道，一个 CSS 盒子当不设置高度时，高度由内容或者子盒子撑开，当该盒子其中元素设置了 float 属性之后，会发生高度塌陷，即高度变成 0，元素会根据 float 属性设置的方向排列，如以下布局：  
```css  
<body>  
    <div class="box">  
        <div class="box1"></div>  
        <div class="box2"></div>  
    </div>  
</body>  
.box{  
	border: 2px solid #6495ED;  
}  
.box1{  
	width: 50px;  
	height: 50px;  
	background: palegreen;  
}  
.box2{  
	width: 50px;  
	height: 50px;  
	background: skyblue;  
}  
```  
​​![图片](@alias/fudong1.png)  
不设置浮动时，box 由内容撑开，当把 box1 和 box2 加上 float 属性后，发生高度塌陷，box 高度变为 0，且 box1 和 box2 会变成浮动式排列，如下图所示：  
```css  
.box1{  
	width: 50px;  
	height: 50px;  
	background: palegreen;  
        float: left;  
}  
.box2{  
	width: 50px;  
	height: 50px;  
	background: skyblue;  
        float: left;  
}  
```  
​​![图片](@alias/fudong2.png)  
当然，我们不想要发生高度塌陷，于是便需要清除浮动。  

## 2. 清除浮动  
### 2.1 添加空标签法  
我们可以在浮动元素后面添加一个空 div，为其设置一个属性`clear：both`（注：both 表示清除两侧浮动的影响，也可以单独使用 left 或者 right），这样的话，内部元素依然会浮动排列，但是不会发生高度塌陷。  
```html  
<body>  
    <div class="box">  
        <div class="box1"></div>  
        <div class="box2"></div>  
        <div style=" clear:both; "></div>  
    </div>  
</body>  
```  
​​![图片](@alias/fudong3.png)  
注：这种方法不是很推荐，因为会增加很多无意义的标签，不利于 HTML 的语义化。  

### 2.2 父级元素添加 overflow 属性  
我们将 box（父级元素）添加 overflow：hidden，即可清除浮动的影响。注：auto 和 scroll 也可以，按需使用。  
```css  
.box{  
        border: 2px solid #6495ED;  
        overflow: hidden;  
}  
```  
​​![图片](@alias/fudong4.png)  
### 2.3 使用 after 伪元素清除浮动（手写 clearfix）  
:after 伪元素表示在元素之后添加内容，给父元素 box 添加一个类 .clearfix（其他名字也行..），然后使用 after 伪元素  
```css  
.clearfix::after{  
            content:"";  
            clear: both;  
            display: block;  
            visibility: hidden;  
        }  
<body>  
    <div class="box clearfix">  
        <div class="box1"></div>  
        <div class="box2"></div>  
    </div>  
</body>  
```  
注：after 伪元素为行内元素，所以需要设置为 block，这种方法算是添加空标签的升级版，也符合语义化思想，推荐使用，当然也可以同时使用 ::before 和 ::after 清除浮动。  
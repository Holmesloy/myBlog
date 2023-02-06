---  
title: BFC 理解  
date: 2021-2-2  
categories:  
 - frontEnd  
tags:  
 - css  
---  
## 1. 什么是 BFC  
BFC（Block formatting context），译为“块级格式化上下文”，简单来说，BFC 属于 CSS 中的一种布局，它的目标就是要产生一块独立的区域，任凭内部元素或布局如何变化，都不会影响到区域外的元素和布局，就像一个独立的盒子。  

## 2. 如何触发 BFC  
当一个元素满足以下任一条件即为BFC：  

HTML 本身就是一个 BFC 元素  
float 属性：      设置为除 none 的其他值（left、right）  
display 属性：  设置为 inline-block 或者 flex 弹性盒  
position 属性： 设置为 absolute 或者 fixed  
overflow 属性：设置为除了 visible 的其他值（auto、hidden、scroll）  
## 3. 为什么要使用 BFC（应用场景）  
### 3.1 解决外边距合并  
在同一个 BFC 中，相邻的两个块元素边距会发生合并，合并的外边距一般取两个中的较大值。  

如以下代码：  
```css  
.box1{  
	width:50px;  
	height:50px;  
	background: palegreen;  
	margin-bottom:20px;  
}  
.box2{  
	width:50px;  
	height:50px;  
	background: lightgreen;  
	margin-top:30px;  
}	
```  
​​![图片](@alias/bfc1.png)  
两个盒子之间间距并不是 50px，而是发生了外边距合并，取较大的 30px。  

如果不想要外边距合并，需要产生 BFC，可以将 box1 和 box2 分别放入不同的 BFC 中，如下：  
```html  
<div class="box">  
    <div class="box1"></div>  
</div>  
<div class="box">  
    <div class="box2"></div>  
</div>  
.box{  
	display: flex;  
}  
```  
这样两个盒子之间的距离就会变成 50px。注：使用其他产生 BFC 的方法也可以。  

### 3.2 清除浮动  
由于 BFC 的高度会包含浮动元素，所以当由于浮动产生高度塌陷的时候，可以使用 BFC 解决。  
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
        float: left;  
}  
.box2{  
	width: 50px;  
	height: 50px;  
	background: skyblue;  
        float: left;  
}  
```  
​​![图片](@alias/bfc2.png)  
如图，父元素发生高度塌陷，高度变为 0，一般我们为父元素添加 overflow：hidden 属性将父元素变成一个 BFC，既可解决高度塌陷问题。  
```css  
.box{  
	border: 2px solid #6495ED;  
        overflow: hidden;  
}  
```  
​​![图片](@alias/bfc3.png)  
### 3.3 两栏自适应布局  
由于 BFC 元素不会与浮动元素发生重叠，我们可以利用这一特征实现一个两栏甚至多栏自适应布局。  

如下代码，我们将 box2 的宽高改变，只将 box1 设置为 float 显示，会发现 box1 和 box2 发生了重叠：  
```css  
.box1{  
	width:50px;  
	height:50px;  
	background: palegreen;  
	float:left;  
}  
.box2{  
	width:100px;  
	height:100px;  
	background: skyblue;  
}  
```    
​​![图片](@alias/bfc4.png)  

然后，我们将 box2 设置为 BFC 元素，为其添加属性 overflow：hidden，则此时 box1 和 box2 不会再重叠，如果去掉 box2 的宽度，则可以实现一个自适应的两栏布局。  
```css  
.box2{  
	height:100px;  
	background: skyblue;  
        overflow: hidden;  
}  
```  
​​![图片](@alias/bfc5.png)  
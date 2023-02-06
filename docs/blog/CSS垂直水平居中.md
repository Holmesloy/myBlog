---
title: CSS 垂直水平居中
date: 2020-12-10
categories:
 - 布局
tags:
 - css
---
## 水平居中

**（1）行内元素水平居中**  
行内元素（`<a> <span> <img>`等）的水平居中只需要给父元素设置`text-align: center`即可
```css
.parent{
    text-align: center;
}
<div class="parent"><a>hello</a></div>
```
同时适用于文字、链接以及其他 inline 或者 inline-block 元素。  

**（2）块级元素水平居中**    
块级元素（dispaly:block）的水平居中，直接设置`margin: 0 auto`，注意，这里 div 的宽度 width 必须存在，可以由元素撑开，也可以自己设置。
```css
.center{
    margin: 0 auto;
}
<div class="center">hi</div>
```
**（3）多个块级元素水平居中**  
传统的方法是将这些块级元素设置为`display:inline-block`，再给父元素设置`text-align: center`。
```css
.center{
    display: inline-block;
}
.parent{
    text-align: center;
}

<div class="parent">
    <div class="center">hi</div>
    <div class="center">ni</div>
    <div class="center">hao</div>
</div>
```
现今更常用的方法是使用 flexbox。将父元素设置为一个 flexbox，再设置对齐方式为 center。
```css
.parent{
    display: flex;
    justify-content: center;
}

<div class="parent">
    <div class="center">hi</div>
    <div class="center">ni</div>
    <div class="center">hao</div>
</div>
```
## 垂直居中
**（1）单行文本垂直居中**  
设置`padding-top`与`padding-bottom`的值相等，或  
设置`line-height`与`height`的值相等。  
注：如果要实现水平垂直居中，只需要加入`text-align: center`。  
**（2）多行文本垂直居中**  
父元素设置`display: table`，子元素设置`display: table-cell`与`vertical-align: middele`
```css
.parent{
    display: table;
}
.center{
    display: table-cell;
    vertical-align: middle;
}
<div class="parent">
    <div class="center">hi</div>
    <div class="center">ni</div>
    <div class="center">hao</div>
</div>
```
注：如果要实现水平垂直居中，只需要加入`text-align: center`。  
**（3）块级元素垂直居中**  
**方法 1：flex 布局**   
父元素设置`display: flex; align-items: center;`，注意，父元素的高度 height 必须存在。  
注：如果要实现水平垂直居中，只需要加入`justify-content: center`，这时父元素的宽度必须存在。

**方法 2：绝对定位和负边距**（已知宽高）  
使用绝对定位，将元素 top 设为 50%，再将 margin 边距设为元素高度的负一半，即可垂直居中  
```css
.parent{
    position: relative;
    height: 200px;
    width: 200px;
}
.child{
    position: absolute;
    top: 50%;  /* 先将子元素位置设为百分之50 */
    height: 100px;
    width: 120px;
    margin-top: -50px;  /* 再向上移动子元素高度的一半 */
}
```
注：如果要实现水平垂直居中，加入 left 设为 50%，再将 margin-left 设置为元素宽度的负一半既可。

**方法3：绝对定位 + transform**（和 2 相似，但不需要知道宽高）  
transform 中的 translate 偏移的百分比相对于元素自身的尺寸。元素设置为绝对定位，top 设置为 50%，然后将 transform 中 y 轴设置为 -50% 即可，与负边距类似。  
```css
.parent{
    position: relative;
    height: 200px;
    width: 200px;
}
.child{
    position: absolute;
    top: 50%;
    transform: (0, -50%);
}
```
注：如果要实现水平垂直居中，则加入`left:50%; transform:(-50%, -50%);`即可。

**方法4：绝对定位与 margin**（已知父元素宽高）  
使用绝对定位，将元素 top 和 bottom 设为 0，再将 margin 设为 auto 即可。
```css
.parent{
    position: relative;
    height: 200px;
    width: 200px;
}
.child{
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}
```
注：如果要实现水平垂直居中，则加入 `left:0; right:0`即可。
<!--
 * @Author: your name
 * @Date: 2021-07-11 19:16:54
 * @LastEditTime: 2021-07-20 14:17:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /myBlog/docs/blog/flex布局.md
-->
---  
title: flex布局 
date: 2020-3-20
categories:  
 - frontEnd  
tags:  
 - css  
---  

## 弹性盒模型
使用`display: flex`，即可以使一个元素成为弹性容器，可以进行flex布局。
* 弹性盒有两根轴，主轴和交叉轴，主轴可以水平，也可以竖直
* 盒子中的子元素为弹性元素，子元素永远沿主轴排列

## 弹性容器属性
* flex-direction：主轴方向
* flex-wrap：是否换行
* flex-flow：direction和wrap的缩写，默认值为`row nowrap`
* jusify-content：元素在主轴上的对齐方式
* align-items：元素在交叉轴上的对齐方式
* align-content：多跟轴线的对齐方式，如果只有一根轴线则无效
```css
.box{
    /* 主轴方向为水平轴、水平轴反向、纵轴、纵轴反向 */
    flex-direction: row | row-reverse | column | column-reverse;

    /* 换行、不换行、换行第一行跑到下方 */
    flex-wrap: wrap | nowrap | wrap-reverse;

    /* 对齐方式：左对齐、右对齐、居中、两端对齐、所有两侧间隔相等 */
    flex-start | flex-end | center | space-between | space-around
}
```

## 项目属性
* order：项目排列顺序，数值越小越靠前
* flex-grow：项目放大比例，默认0，即存在剩余空间也不放大
* flex-shrink：缩小比例，默认为1，即空间不足则会缩小
* flex-basis：分配多余空间之前，项目占据的主轴空间，默认auto，即本来大小
* flex：flex-grow flex-shrink flex-basis的缩写
* align-self：单个项目的对齐属性，覆盖align-items
```css
.ele{
    flex: 1  ==  flex: 1 1 0%
    flex: 2  ==  flex: 2 1 0%
    flex: auto  ==  flex: 1 1 auto
    flex: none  ==  flex: 0 0 auto   // 固定尺寸，不伸缩
}
```
flex:1 和 flex:auto 区别：
* 相当于flex-basis:0 和 flex-basis:auto 的区别
* 设置为0时，表示伸缩时不需要考虑元素本身尺寸，设置auto时要考虑元素的尺寸


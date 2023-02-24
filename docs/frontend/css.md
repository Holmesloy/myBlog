# CSS  

## 盒子模型  
### W3C 标准盒模型（box-sizing: content-box)  
`width` = 内容的宽度  
`height` = 内容的高度  
不包含 border 和 padding，设置 padding 和 border 会改变元素的宽和高，影响布局  
### IE 盒模型（box-sizing: border-box)  
`width` = 内容的宽度 + padding + border = 盒子的宽度  
`height` = 内容的高度 + padding + border = 盒子的高度    
元素的宽度等于 width，设置 padding 和 border 元素宽度不变  
![](@alias/box.png)  
`offsetWidth` = （内容宽度 + 内边距 + 边框）  
### margin、padding 的缩略写法：  
四个值作用：上 右 下 左  
三个值作用：上 左右 下  
两个值作用：上下 左右  
一个值作用： 上下左右  
`margin: 10px 12px 20px;`  
`margin: 16px 20px;`  
**margin 纵向重叠问题**  
* 相邻元素的 margin-top 和 margin-bottom 会发生重叠，取较大值  
* 空白内容的 p 标签也会重叠  

**margin 负值问题**  
* margin-top 和 margin-left 负值，元素向上、向左移动  
* margin-right 负值，右侧元素左移，自身不受影响  
* margin-bottom 负值，下方元素上移，自身不受影响  

### CSS position
* 默认 static：正常文档流，会忽视 left、top 等属性效果
* fixed：脱离文档流，参照浏览器窗口进行定位，通过 top、bottom、left 和 right 属性进行定位
* 相对定位 relative：相对于自身位置移动，可以通过 left 等属性设置位置
* 绝对定位 absolute：脱离文档流，不占据空间，相对第一个不是 static 的父元素进行定位，可以通过 left 等属性设置

## CSS 相对单位
### rem 和 em  
* em 和 rem 都表示相对单位（相对于`font-size`）
* em 相对于父元素，rem 相对于根元素（html）。  
* 使用 em 时，子元素字体大小的 em 是相对于父元素字体大小（`font-size`），而元素的 width/height/padding/margin 使用 em 是相对于**该元素自身**的`font-size`。  
* rem 相对于根 html 元素（root），而根 html 的默认字体大小为 16px，可以在 css 中设置`html {font-size：62.5%}`，即字体大小变为 10px，再使用 rem，例如 1.6rem 即为 16px，方便使用。  

### CSS 百分比  
* css 中设置百分比一般是相对于父级元素，如  
`max-width`、`width`、`margin-left`、`right`都是相对于父级元素的宽度进行计算。  
* `font-size`相对于父级元素中设置的`font-size`。  
  `line-height`相对于自身的`font-size`。  
  `border-radius`相对于自身宽高。  

### line-height 的继承（子元素未设置）
* 具体数值，如 20px，则直接继承该值
* 百分比，如 200%，则继承父元素的 font-size * 200%
* 比例，如 1.5/2，则继承该比例（相对于子元素自身的 font-size）

## display、opacity 和 visibility  
* display：用于设置元素生成时的显示类型  
* opacity：用于设置元素透明度  
* visibility：用于设置元素是否可见  

**display: none; opacity: 0; visibility: hidden 区别：**  
**1. 是否占用页面空间**  
display 设置为 none 的时候不占据页面空间，opacity 和 visibility 都会占据页面空间  
**2. 对于子元素的影响**  
当使用 visibility 时，如果父元素设置为 hidden，子元素为 visible，则子元素依然可以显示出来。而使用 opacity 和 display 时，当父元素设置为不可见，子元素也不可见。  
绑定的事件能否继续触发  
使用 opacity 的元素绑定的事件可以正常触发，使用 visibility 和 display 时事件不能触发。  
**3. 是否影响其他元素事件触发**  
visibility 和 display 属性是不会影响其他元素触发事件的，而 opacity 属性如果遮挡住其他元素，其他的元素就不会触发事件了  
**4. 是否产生回流（reflow）**  
**回流**  
>当页面中的一部分（或全部）因为元素的规模尺寸、布局，隐藏等属性改变而需要重新构建（也可以称为重布局或者重排）。每个页面至少产生一次回流，即第一次加载时。  
 
display 属性会产生回流，而 opacity 和 visibility 属性不会产生回流。   
**5. 是否产生重绘（repaint）**  
**重绘**  
>当页面中的一些元素需要更新属性，而这些属性只影响元素的外观，诸如背景颜色、文字颜色等，而不会影响布局时，页面的更新就叫做重绘。因此，回流一定会发生重绘，重绘不一定会发生回流。  

display 和 visibility 属性会产生重绘，而 opacity 属性不一定会产生重绘。  
### 总结 
| 元素隐藏 | opacity:0 | visibility:hidden | display:none |
| :---    |   :---    |   :---             |     :---    |  
|是否占用页面空间|占据|占据|不占据|  
|子元素设置其他值能否显示|不可以|可以|不可以|  
|绑定的事件能否继续触发|能触发|不能触发|不能触发|  
|是否影响其他元素事件触发|影响|不影响|不影响|  
|是否产生回流（reflow）|不产生|不产生|产生|  
|是否产生重绘（repaint）|不一定|产生|产生|  
|是否支持 transition|支持|支持|不支持  


## CSS 选择器  
### 选择器优先级
!important > 行内样式 > id 选择器 > class 选择器 || 属性选择器 > 标签选择器 > 通配符选择器

### 1. 逗号( , )  
选择器之间使用逗号分隔表示定义的样式会同时应用到所有选择器。如：  
`body, h1, p, a {color: blue;}`：所有选择的元素颜色为蓝色  
### 2. 类选择器结合元素选择器  
没有空格，可用于样式分组  
```html  
<p class = "important">hello</p>  
<p class = "s1">hello</p>  
<h1 class = "important s1">hello</h1>  

p.important {color:red;}  // 表示p标签中带有important类才会显示红色，即上面第一个hello（p.后没有空格）  

.important.s1{color: green;}  // 多类选择器，注意类名之间也没有空格  
```  
### 3. 后代选择器(空格)  
后代选择器又称包含选择器，选择器间用空格隔开，依次选择符合条件的所有后代  
```css  
h1 em {color:red;}  // h1中所有的em元素为红色  

div .important {color:green;} // div中所有important类颜色设为绿色  
```  
### 4. 子元素选择器( > )  
如果只需要选择某个元素的直接子元素，则使用子元素选择器，使用 **>**  
注意，子元素是第一级后代，如果选择器选择的是第二级后代，是不生效的
```html  
h1 > strong{color:red;} // 选择h1中所有的strong标签  

<h1>This is <strong>the first</strong>one</h1>  // the first为红色  

<h1>This <em>is <strong>the secone</strong>one</em></h1>  // 未被选择，因为strong标签在em标签中  
```  
注意结合使用后代选择器和子元素选择器，例如：  
```css  
div.content h1 > em{color:green;}  // 选择h1中的所有em元素，这个h1本身是带有content类div的后代  
```  

### 5. 相邻兄弟选择器( + )  
选择紧接在一个元素后的元素，且两个元素具有相同的父元素，使用 +  
```html  
h1 + p {color: green;}   // 表示选择h1后紧接着的p标签元素，且两者父元素相同  

<div>
<h1>This is a heading.</h1>  
<p>This is paragraph.</p>    // 只对h1后的p生效  
<p>This is paragraph.</p>    // 此p元素未被选择  
</div>  
```  
### 6. 伪类选择器( : )  
CSS 伪类用于向某些选择器添加特殊的效果。  
```css  
a:link{color: black;}     /*未访问的链接*/  
a:visited{color: red;}     /*已访问的链接*/  
a:hover{color: green;}     /*鼠标悬停*/  
a:active{color: yellow;}    /*选定的链接，鼠标点击*/  
```  
`p:first-child`伪类：表示 **p 作为某元素的第一个子元素**，直接看例子：  
```html  
p:fist-child{color: red;}  

<div>  
<p>hello</p>   // 红色，p作为div的第一个子元素  

<h1><p>hello</p></h1>  // 只有hello是红色，p作为h1的第一个子元素  

<h1><h2>hello</h2><p>nihao</p></h1>  // 无红色，因为p不是h1的第一个子元素  
</div>  
```  
### 7. 伪元素( :: )  
伪元素用于创建一些不在文档树中的元素，并为其添加样式  
如可以使用 ::before 在一个元素前增加一些文本或空字符串等  
```css 
<p class="box">Content</p>  
.box::before {  
    content: "This is"  
}   
/* 网页内容显示为This is content  */

.box::after{  
    content: "";  
    display: block;  
}  /*添加伪元素可以用来清除浮动 */ 
```  
常见伪元素：  
`::before`  
`::after`  
`::first-letter`  
`::first-line`  

## CSS 书写顺序  
（1）位置属性（position，display，top，right，z-index，float等）  
（2）元素大小（margin，padding，width，height）  
（3）文字属性（font-family，font-size，line-height等）  
（4）边框背景（border，background）  
（5）其他（animation，transition）  

## CSS 继承  
### 可继承属性  
子元素可以继承父元素的属性，正确使用可以减少 CSS 代码，便于维护  
1. 字体属性系列，如`font-size, font-family, font-weight`等  
2. 文本属性系列，如`text-align, line-height, color, word-spacing`等  
3. 元素可见性，`visibility`  
4. 列表属性，`list-style-type, list-style`等  
5. 光标属性：`cursor`  
### 不可继承属性  
1. `display`  
2. 文本属性：`vertical-align, text-decoration`  
3. 盒子模型的属性：宽高、内外边距、边框等  
4. 背景属性：`background ` 
5. 定位属性：`float, position`等  
6. 轮廓样式属性：`outline-style, outline`等  

## CSS3 动画
### transition
transition 属性用于指定状态变化的时间长短、过渡延迟时间、作用属性以及过渡效果等。
```css
img{
    /* 简写 */
    transition: 1s 0.5s height ease;
}

img{
    /* 完整写法 */
    transition-duration: 1s;
    transition-delay: 1s;
    transtition-property: height;
    transition-timing-function: ease;
}

/* 使用举例 */
div{
    width: 100px;
    transition: 1s 0.5s height ease;
}
div:hover{
    width: 300px;
}

/* 其中过渡函数可选值如下： */
* ease：（默认值）逐渐变慢
* linear：匀速
* ease-in：加速
* ease-out：减速
* ease-in-out：先加速后减速
* cubiec-bezier：贝塞尔曲线(x1, y1, x2, y2)
```
注：tansition 需要明确知道开始状态和结束状态的具体数值，才能计算出中间状态

### animation
* 在节点效果（如 hover）中使用 animation 属性自定义动画周期时间和动画名称
* 使用 @keyframes 动画名称 来自定义动画效果
```css
div:hover{
    animation: 1s rainbow;
}
/* 动画名称为rainbow */
@keyframes rainbow{
    0% { background:black }
    50% { backgound: orange; width: 200px; }
    100% { background: yellow; }
}
```
* 默认情况下，动画只播放一次，添加 infinete 无限播放或指定播放次数
* 动画结束以后，会立即从结束状态跳回起始状态，如果要保持在结束状态，添加 animation-fill-model 属性如下：
* none：默认值，回到动画没开始时的状态
* backwards：回到动画第一帧的状态
* forwards：保持动画最后一帧的状态
* both：根据 animation-direction 轮流应用 forwards 和 backwards
```css
div:hover{
    /* 简写 */
    animation: 1s 0.5s rainbow linear 3 forwards normal
}

div:hover{
    /* 完整写法 */
    animation-name: rainbow;
    animation-duration: 1s;
    animation-delay: 0.5s;
    animation-timing-function: linear;
    animation-iteration-count: 3;
    animation-fill-mode: forwards;
    animation-direction: normal;
}
```


# mobile development

## 基本概念
* 移动端网页开发  
  在移动端对 web 页面进行适配，使其在移动端也可以进行良好的显示。
* 移动端 web app 开发  
  开发中使用一些浏览器私有的方法，使 web 页面拥有一些 native 的功能。比如较为流行的微信小程序与谷歌推出的 PWA。
* hybrid 开发  
  也可以称为“套壳开发”，简单来说就算通过写特定的代码来生成跨平台的 web app，如使用 react native 框架或者在移动端网页基础上打包生成的 app。

## 网页移动化
* 让网页前端显示适应手机屏幕
* 交互方式变为触控方式

### Viewport 元信息
```html
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport"
        content="
        width=[pixel_value | device-width],  <!-- 设置像素值或者直接等于设备宽度值 -->
        height=[pixel_value | device-height],
        initial-scale=float_value,  <!-- 程序启动时的缩放值，为浮点值 -->
        minimum-scale=float_value,  <!-- 缩放的最小值，浮点值 -->
        maxmun-scale=flaot_value,  <!-- 缩放的最大值，浮点值 -->
        user-scalable=[yes | no],  <!-- 表示是否支持手势缩放 -->

        "/>
    </head>
    <body>
        <!-- 布局 -->
    </body>
</html>
```
### 布局
* 百分比布局
* rem 和 em 布局
* vw/vh 布局

## 简单实践
HTML 示例
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,
         initial-scale=1.0, user-scalable=no, minimum-scale=1.0, max-scale=1.0">
        <title>移动 web 示例</title>
    </head>
    <body>
        <!-- 布局 -->
    </body>
</html>
```
html 中关键在于 meta 标签的设置，移动页面开发首先 name 设为 viewport，然后其他属性如下：  
`device-width` - 设备的宽度  
`initial-scale` - 初始的缩放比例    
`minimum-scale` - 允许用户缩放到的最小比例     
`maximum-scale` - 允许用户缩放到的最大比例    
`user-scalable` - 用户是否可以手动缩放   
CSS 示例
```css
//部分重置
body {
    word-wrap: break-word;
    font: 16px/1.5 Helvetica, Arial;
    //这里是设置字体，Helvetica 字体在移动端各系统都支持（都不支持微软雅黑）
    color: #333;
    -webkit-text-size-adjust: none; 
    //设置文本不会放大，普通网页在移动端打开文本是会跟随网页结构缩放的
}
body *{
    -webkit-tap-highlight-color: transparent;
    //在一些手机上，如 iPhone，点击按钮等元素会出现点击态的背景色，设置为透明就看不出来了
    -webkit-user-select:none;
    //设置元素内的文字及其子元素将不会被选中
}
```
  
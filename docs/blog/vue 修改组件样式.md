---  
title: vue 修改组件样式  
date: 2021-9-27  
categories:  
 - frontEnd  
tags:  
 - blog  
---  
## 组件样式修改  

通常来说，vue 中每个页面的样式一般需要加上 scoped 属性，否则可能会造成全局样式污染。  
而如果加上 scoped 属性，vue 会将每个类类名进行哈希，变得独一无二，所以加上 scoped 之后再更改  
组件样式的话，是不会生效的。想要自定义修改样式，以 element-ui 为例，通常有以下方法。  

### 1. 全局样式表  
以 SCSS 为例，新建 global.scss 文件，并在 main.js 中引入，一般目录为`/src/assets/style/global.scss`，  
然后在 main.js 中引入：`import "./assets/style/global.scss"`  
在 global.scss 中写的样式，无论在哪一个 vue 页面中都会覆盖组件样式，通常用于想要固定修改组件的样式。  

### 2. 添加新 style 标签  
在当前 vue 页面中，添加一对新的 style 标签，新的 style 标签中不要添加 scoped 属性。在此 style 中修改组件样式  
可以生效，一般采用 scss 嵌套的方式保证唯一性从而避免污染全局的样式。  

### 3. 使用 /deep/ 深度修改  
在需要修改的组件类名前，加上 `/deep/`，可以修改 scoped 属性中的样式  
```css  
.test /deep/ .el-dialog {  
  width: 100%;  
}  
```  
**>>>、/deep/ 与 ::v-deep**  
* 三者都是 deep 功能，只是使用场景不同  
* 只有 css 中能使用 `>>>`  
* scss 等预处理器中可以使用 `/deep/`  
* vue-cli3 编译中`/deep/`会报错，所以使用`::v-deep`（双冒号）  

### 4. 使用内联样式修改  
```html  
<el-button :style="selfStyle">按钮</el-button>  
<script>  
  export default {  
    data() {  
      return {  
        selfStyle: {  
          color: "white",  
          marginTop: "10px",  
          backgroundColorA: "cadeblue"  
        }  
      }  
    }  
  }  
</script>  
```  
### 5. custom-class  
饿了么组件库的一些组件，会提供一个自定义类名的属性，可以通过属性添加一个类名，然后修改组件样式。  
缺点：不是所有组件都提供自定义类名的属性。  

### 总结  
* 全局引入 css 文件的方式，适合对组件整体的修改，比如一些配色、间距大小等  
* 第二种添加 style 的方式，实际上修改了全局的样式，所以可能会存在冲突，需要保证唯一性  
* 第三种使用 /deep/ 的方式可以很方便地修改样式，但是不能解决所有样式，只对部分样式有效  
* 第四种方式局限性较大，不推荐使用  
* 所以较为推荐的是第二种、第三种和第五种，按照实际需要使用
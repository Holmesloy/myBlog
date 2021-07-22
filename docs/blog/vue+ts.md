---  
title: 在vue中使用ts开发
date: 2020-7-22
categories:  
 - frontEnd  
tags:  
 - ts  
---  
## 更改webpack配置
1. 修改入口文件为ts
```js
entry:{
    app: '.src/main.ts'
}
```
2. 根路径下添加tsconfig.js配置文件，参考配置：
```js

```
3. 根目录下添加tslint.json文件，规范书写ts，参考配置：
```js

```
4. 要让ts认识vue文件，在src路径下添加vue-shim-d.ts
```js
// vue-shim-d.ts
import router from '@/config/router';
import { Comfirm, MessageBox } from 'element-ui';
import Vue from 'vue';import VueRouter from 'vue-router';
import { Route } from 'vue-router';import Tools from '@/utils/tools';
import Api from '@/config/api';
// 扩充
declare module 'vue/types/vue' {
  // 这些是全局属性，可以直接this.$api这样类似使用  
  interface Vue {    
    $router: VueRouter;        
    $route: Route;          
    $message: MessageBox;        
    $conform: Comfirm;        
    $tools: Tools;        
    $api: Api;     
}}
```

## vue文件改造
1. 安装vue-property-decorator插件：
`npm i -s vue-property-decorator`
2. vue文件改造
```js
// App.vue
<template>
    <router-view></router-view>
</template>
<script lang="ts">  // 让webpack将代码识别为ts
import { Component, Vue } from 'vue-property-decorator'  // 装饰器导入

@Component
export default class App extends Vue{

}
</script>
```
3. 常用装饰器使用：
```js
<script lang="ts">
import Test from './test.vue';
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

// 引入组件
@Component({
    components:{
        Test
    },
})

export default class Home extends Vue {
    // Prop
    @Prop({}) private config: object = {};

    //data
    private side: boolean = false;
    private list: object = {};

    // Watch
    @Watch('config')
    onConfigChanged(val: any, oldVal: any){
        this.init();
    }

    // 生命周期
    private created(){
        this.init();
    }

    // 方法
    private init(){
        console.log("hi");
    }
}
</script>
```
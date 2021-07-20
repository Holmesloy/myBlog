# Vue  

## Vue基本使用  
### Vue组成  
一个Vue实例一般由  
* `<template></template>`视图模板  
* `<script></script>`中的data数据和相关方法  
* `<style></style>`中的页面样式组成。  

**优点**  
* 轻量、快速，数据双向绑定，数据驱动视图，操作简单  
* 组件化，组件可封装并复用  
* 使用虚拟DOM，优化性能表现  

**Vue指令**  
* v-bind：简写为`:`，用于动态绑定标签属性  
* v-on：简写为`@`，用于绑定事件，可以监听多个方法  
* `<input type="text" v-on="{input: onInput, blur: onBlur}"/>`  


**双向数据绑定：v-model**  
* 用于input、select、textarea等表单元素中，绑定表单数据  
* `<input v-model="变量"/>`，表单值和变量值会同步变化  

**v-if和v-show的区别**  
* v-if切换会创建和销毁标签，v-show只是切换标签的display属性  
* v-if是在显示的时候才进行渲染，v-show只是简单的基于css切换  
* v-if有更高的切换消耗，v-show有更高的初始渲染消耗  
* 运行时条件一般不改变使用v-if，频繁切换使用v-show  

**vue常用修饰符**  
* 以`.名称`的形式添加到vue指令后，实现相应的功能  
* `v-model.lazy`：添加lazy后则数据与change事件同步，而不是每次input事件，相当于防抖  
* `v-model.number`：将输入的值转换为数值类型，不能转换的则不可输入  
* `v-model.trim`：自动过滤用户输入前后空格  
* `v-on:click.stop`：阻止单击事件继续传播  
* `@click.stop.prevent`：修饰符可连接，阻止传播+阻止默认事件（注意顺序，会有不同的影响）  


**为什么组件中的data是一个函数？**  
* 对象为引用类型，复用组件时，数据对象会共享一个data对象  
* 则一个组件修改了data中数据会影响其他组件数据  
* 使用函数每次都会返回一个新的对象，引用地址不同  

### computed和watch  
**计算属性**  
* 用于变量存在复杂逻辑时的计算，依赖其他属性算出来得到的值（也可以是数组和对象等）  
* computed有缓存，只有其依赖的属性改变时，才会重新计算  
* 不支持异步，其中的异步操作无效  
```js  
var var vm = new Vue({  
  el: '#demo',  
  data: {  
    firstName: 'Foo',  
    lastName: 'Bar'  
  },  
  computed: {  
      // 计算属性的getter  
      // 最终就得到一个fullName值，这个值可以直接使用，相当于data里有一个fullName，后面无括号()  
      fullName: function () {  
      return this.firstName + ' ' + this.lastName  
    }  
  }  
})  
```  
**侦听器**  
* 用来侦听一个特定的值，当该值变化时执行特定的函数  
* 监听的值变化时，都会执行回调  
* 支持异步，接收两个参数，一个newVal，一个oldVal  
* watch监听引用类型，拿不到oldVal，添加deep:true后可以深度监听  
```js  
var var vm = new Vue({  
  el: '#demo',  
  data: {  
    firstName: 'Foo',  
    lastName: 'Bar',  
    fullName: 'Foo Bar'  
  },  
  watch: {  
      // watch是执行操作，computed是得到一个值  
      // firstName和lastName即为被侦听的对象，val也就是指代其值  
      firstName: function (val) {  
        this.fullName = val + ' ' + this.lastName  
      },  
      lastName: function (val) {  
        this.fullName = this.firstName + ' ' + val  
      }  
    }  
})  
```  

### 生命周期  
* 创建阶段：**beforeCreate**中vue实例中的挂载元素el和数据对象data都未初始化，为undefined；**created**中data初始化，可以获取到data、coomputed、watch。而el还未初始化。  
* 载入阶段：**beforeMount**中，el和data都已初始化，但此时还是虚拟DOM节点；**mounted**中DOM和data数据渲染完成。  
* 更新阶段：data变化时，会依次触发**beforeUpdate**和**updated**方法。  
* 销毁阶段：**beforeDestroy**中还可以获取到数据和事件；执行**destroyed**后，vue已经解除了事件监听和DOM绑定，只是DOM结构还存在。  
![cycle](https://cn.vuejs.org/images/lifecycle.png)  

**父子组件生命周期**  
* 创建阶段首先创建父组件，再创建子组件  
* 渲染时首先渲染子组件，再渲染父组件  

### class和style  
* 使用动态属性绑定：`:class`和`:style`  
* 使用驼峰式写法+字符串值  

### 循环（列表）渲染  
遍历数组：  
`<li v-for="(item, key) in listArr" :key="item.id> {{ item }} </li>"`  
遍历对象：  
`v-for="(val, key, index) in listObj" :key="key"`  
注意：v-if和v-for不在一个标签内使用  
**v-for中为什么使用key？**  
* key为string或number类型  
* key值唯一，用于Vue跟踪每个节点的身份，也可以按照key值渲染元素  
* 原理在于diff算法中，辨别新旧Vnode  
* 不使用key则更新时需要将旧节点全部删除，再插入新节点  
* 使用key可以将相同的节点保留，移动位置排序，只需要创建不同的节点插入，更加快速高效  

### 事件  
event参数如何传递：  
* 当函数中无其他参数时，event可以默认传过去  
* 当函数中有其他参数时，使用$event传入事件参数  
* 注：event是原生的，且被挂载到当前元素  
```js  
<button @click="add1()">+1</button>  
<button @click="add2(2, $event)">+2</button>  

methods:{  
    add1(event){  
        console.log(event.target)  
    }  
    add2(val, event){  
        console.log(event)  
    }  
}  

```  

### 表单  
* v-model  
* 常见表单项：textarea checkbox radio select  
* 修饰符lazy number trim  


### 组件通讯  
* props和$emit  
* 组件间通讯-自定义事件  
* vuex  

**父传子**  
* 子组件使用props接收父组件传递的数据  
```js  
// 父组件中  
<Child myData = '传递的数据'/>  

// 子组件中  
// 接收数据，然后就可以使用myData，就像是使用data中的数据一样  
export default{  
    props:['myData'],  // 使用myData接收  
    /* props:{       // 比较完整的写法，有默认值和类型，类型不正确时vue会警告  
        myData:{  
            default: "",  
            type: String,  
        }  
    } */  
    data(){  
        return{  

        }  
    }  
}  
```  
**子传父**  
* 父组件中给子组件绑定一个自定义的事件，子组件通过$emit()触发该事件并传值  
```js  
// 父组件  
<Child @myEvent = 'process'/>   // 这里传参不用加括号了  
methods:{  
    // data即为子组件传过来的数据  
    process(data){  
        // 事件处理  
    }  
}  

// 子组件中，可以在某一方法中触发$emit  
this.$emit('myEvent', '传递的数据')  
```  

**兄弟组件通讯**  
1. 先子传父，再父传子  
2. 使用中央总线通信bus，创建自定义事件触发和接收  

## Vue高级特性  
* 自定义v-model  
* $nextTick  
* slot  
* 动态、异步组件  
* keep-alive  
* mixin  

### 自定义v-model
![v-model](@alias/v-model.png)

### $nextTick  
* Vue响应式中，data变化后DOM不是立即变化，而是异步渲染  
* $nextTick是执行延迟回调，会在DOM渲染之后被触发，所以修改数据之后使用它可以在回调中获取更新后的DOM  

**ref用来获取DOM元素**  
先给标签设置一个ref值，再通过`this.$refs.domName`来获取，配合`$nextTick`来使用，如：  
```js  
<ul ref='ul1'></ul>  // 标签中添加ref   

const ulElem = this.$refs.ul1   // 获取DOM元素（refs）  

// 1. 异步渲染，$nextTick待DOM渲染完再回调  
// 2. 页面渲染时会将data修改整合，多次data修改只会渲染一次  
this.$nextTick(() => {  
    const ulElem = this.$refs.ul1  
})  
```  

### slot  
* 可以看成组件的扩展，用于向组件中我们想要的位置添加一些内容  

**slot的理解**  
```html 
1. 首先考虑父组件向子组件中传递数据  
<!-- 父组件   -->
<Child myData="数据">我想添加的内容</Child>  
<!-- 注意：向子组件中传递的数据只有myData，默认包裹的所有内容都会被忽略   -->

2. 那么怎么向子组件中插入其他的数据，或者标签元素呢？答：子组件中使用slot  

<!-- 子组件   -->
<template>  
    <div>  
    <a>我是一个a标签</a>  
    <slot>我是slot默认内容</slot>   // 注意这里的slot  
    </div>  
</template>  
3. 子组件中的slot会被完全替代为父组件中“我想添加的内容”  
<!-- 如果父组件中不添加内容，则子组件显示slot的默认内容，也可以不设置   -->
<!-- 另外，slot可以设置style属性   -->
```  

**基本使用**  
很多时候，我们封装了一个子组件之后，在父组件使用的时候，想添加一些dom元素，这个时候就可以使用slot插槽了，但是这些dom是否显示以及在哪里显示，则是看子组件中slot组件的位置了。  
插槽从父组件获取值：  
```html 
<!-- 父组件中   -->
<SlotDemo :url="website.url">  
    {{website.title}}    // 传入了父组件中的title变量  
</SlotDemo>  

<!-- 子组件中   -->
<a :href="url">  
    <slot>   <!-- 这里slot标签就被替换为了父组件中的titile变量 --> 
    <!-- 默认内容，若父组件没设置内容，显示此内容 -->  
    </slot>  
</a>  
export default{  
    props: ['url']  
    data(){  
        return {}  
    }  
}  
```  

**作用域插槽**  
* 父组件从子组件插槽中获取数据  
* 子组件将要传递的内容绑定到slot上，父组件中用v-slot定义一个值接收插槽的名字  
```js  
<SlotDemo :url="website.url">  
    <template v-slot:default="slotProps">  // slotProps就代表了子组件中的插槽  
        {{slotProps.userData.name}}  
    </template>  
</SlotDemo>  
// 注：default可省略，当提供的内容只有slot内容时，v-slot才可绑定在子组件上，省略template  

// 子组件中  
<a :href="url">  
    <slot :userData="user">  // 绑定要传递的数据  
        默认内容  
    </slot>  
</a>  
export default{  
    props: ['url']  
    data(){  
        return {  
            user:{  
                name: 'z',  
                age: 25  
            }  
        }  
    }  
}  
```  
**具名插槽**  
* 一个组件中需要多个插槽时，在slot中添加name属性  
* 父组件中使用v-slot绑定name属性，即可正确按顺序插入  

### 动态组件  
* :is="comonentName"  
* 根据数据，动态渲染组件，即要加载的组件类型不确定，如新闻流。  
* 如v-for遍历中，首先得到组件的类型数据，然后再得到其他数据渲染出来。  

### 异步组件  
* 异步加载组件，意思是什么时候用到，什么时候再加载组件  
* 主要用到import()函数，一般用于较大组件的加载  
```js  
// 在coponents属性中引入属性时，用import()  
components:{  
    FormDemo: () => import('路径')  // 采用这种import方式  
}  
```  

### 缓存组件:keep-alive  
* 频繁切换时，不需要重复渲染  
* 将需要缓存的组件使用`<keey-alive><component></component></keey-alive>`包裹  
* 框架层级，Vue控制js对象（跟v-show区别）  

### mixin  
* 多个组件有相同的逻辑，抽离出来  
* Vue3使用Composition API解决这些问题  
* 混合，用来存放公共数据和逻辑，然后引入到某个页面后会将数据和方法合并到当前页面  
```js  
// 引入  
import myMixin from ...  
export default{  
    mixins: [myMixin]  
}  
```  
问题：  
* 变量来源不明确，代码可读性差  
* 多个mixin可能会造成命名冲突  
* mixin和组件可能出现多对多关系，复杂度较高  

### Vuex  
组成：  
* state：全部组件公共状态  
* getters：相当于store的计算属性。使用$store.getters.  
* mutations：修改状态的方法。使用$store.commit('', params)  
* actions：异步操作。使用$store.dispatch('')  
* modules：store分割得到的模块，每个模块都有自己的state、getters等。  

![vuex](@alias/vuex.png)  
```js  
const store = new Vuex.Store({  
    // 公共状态数据  
    state: {  
        count: 1,  
        todos:[  
            {id: 1, text:'hi', done: true},  
            {id: 2, text:'nihao', done: false}  
        ]  
    },  
    // 根据依赖的state属性计算  
    getters:{  
        doneTodos: state =>{  
            return state.todos.filter(todo => todo.done)  
        }  
    },  
    // 其中定义的方法可以用于修改state中数据  
    mutations:{  
        increment(state){  
            // 变更状态  
            state.count++  
        }  
    },  
    // 类似mutation，但mutation是直接触发方法，action提交的是mutation  
    // action中可以包含异步操作，mutations中不行  
    actions: {  
        increment(context){  
            context.commit('increment')  
        }  
    }  
})  

// getters调用  
store.getters.doneTodos   // 获取到doneTodos数据  

// mutations触发  
store.commit('increment')   // 触发了increment方法，count++  

// actions触发  
this.store.dispatch('increment', data)  
```  
**module**：Vuex允许将Store切分为不同的module，提高代码可读性  
```js  
const moduleA = {  
    state: () => ({}),  
    mutations: {},  
    actions: {},  
    getters:{}  
}  
const moduleB = {  
    state: () => ({}),  
    mutations: {},  
    actions: {},  
    getters:{}  
}  

const store = new Vuex.Store({  
    modules: {  
        a: moduleA,  
        b: moduleB  
    }  
})  

store.state.a   // moduleA的状态  
store.state.b   // moduleB的状态  
```  
**场景**  
* 当ajax请求数据为组件公用时，可以将代码放在action中，不是共用则放在某一组件的methods中。  
* 注：vuex中获取的数据，不能直接更改，需要浅拷贝对象后更改，否则报错。  
* vuex中的数据再页面刷新后数据会消失，因此可以使用sessionStorage或localStorage存储数据  

**mapGetters**  
* 用于组件中批量使用vuex中的getter属性  
* 在组件中引入mapGetters，将其展开混入computed对象中  
```js  
import { mapGetters } form 'vuex'  
export default{  
    computed:{  
        ...mpaGetters(['total', 'count'])  
    }  
}  
```  
**mapMutations**  
* 在组件中重复使用mutation  
* 使用mapMutations辅助函数  
```js  
import { mapMutations } from 'vuex'  
methods:{  
    ...mapMutations({  
        setNumber: 'SET_NUMBER'  
    })  
}  
```  
其中，SET_NUMBER为mutations中方法，调用this.$store.commit('SET_NUMBER', 10)就可以使用this.setNumber(10)代替。  

**mutations和actions区别**  
* action提交的是mutation，而不是直接变更状态，可以使用异步  
* mutation直接变更状态，只能使用同步  
* 提交方式不同  
* 接收参数不同，mutation第一个参数是state，action第一个参数为context（上下文）  
```js  
// actions提交  
this.$store.diaptch('ACTION_NAME', data)  

// mutations提交  
this.$store.commit('SET_NUMBER', 10)  

// context包含内容：  
{  
    state,   // 等同于store.state，若在模块中则为局部状态  
    commit,  
    dispatch,  
    getters  
    rootState,  
    rootGetters  
}  
```  
**v-model中使用vuex中state的值**  
* 必须通过计算属性来转换，计算属性中要有getter和setter  
```js  
<input v-model="message"/>  

computed:{  
    message:{  
        get(){  
            return this.$store.state.message  
        },  
        set(value){  
            this.$store.commit('updateMessage', value)  
        }  
    }  
}  
```  

### Vue-router  
* 路由模式（hash，H5 history）  
* 路由配置（动态路由、懒加载）  

**基本使用**  
1. 安装后在main.js中引入VueRouter组件  
2. 定义路由数组，每一项包含path路径、组件导入  
3. 实例化VueRouter对象，也可以直接在实例化对象中添加路由数组  
4. 根实例中挂载路由  
5. 在App.vue中使用路由`<router-view></router-view>`  
```js  
export default new Router({  
    mode: 'history',  // 默认为hash  
    routes:[  
        ...authentication,  // 其他js文件中定义的路由数组  
        {  
            path: '/',  
            name: 'home',  
            component: () => import(@/Index.vue)  // 懒加载  
        },  
        {  
            path: "/productintro",  
            name: "productintro",  
            component: () =>  
                import(/* webpackChunkName: "system" */ "@/views/home/product/Index.vue"),  
            // 还可以添加子路由，子路由默认链接在父路由path后面  
            // 如此处后path一定链接在/prodectintro后  
            children: [...productintro]  
        },  
    ]  
})  
```  

**动态路由**  
* 在router目录下的index.js文件中，对path属性加上`/:id`。使用router对象的params.id获取动态参数  
```js  
const User = {  
    // 获取参数如 10 20  
    template: '<div>User {{ $route.params.id }}</div>'  
}  

const router = new VueRouter({  
    routes:[  
        // 动态路径参数，以冒号开头。  
        {path: '/user/:id', component: User}  
    ]  
})  
```  

**路由懒加载**  
* 和异步加载组件相同，在routes中设置`component: () => import(组件路径)`  

**说明**  
像this.$refs.form  
this.$routes  
this.$store  
就是挂载在this上的vue内部属性，$属于一个标记，无特殊含义，与用户自己定义的属性区分开来  

**vue-router导航钩子**  
```js  
// 在跳转前进行权限判断，属于全局导航钩子  
router.beforeEach(to, from, next){  

}  
```  

**vue `$router`和`$route`的区别**  
* router为VueRouter的实例，相当于一个全局的路由对象，里面有很多属性和子对象，例如history对象  
* route相当于正在跳转的路由对象，从里面可以获取name，path，param等  

**路由传参三种方式**  
```js  
// 完整的path  
this.$router.push({ path: `/user/${userId}` })  

// params传递  
router.push({ name:'user', params: {userId: 123}})  

// query传递，相当于/register?plan=private  
router.push({path:'regester', query:{ plan: 'private' }})  
```  
**注意：路径中加不加`/`?**  
* 以`/`开头的嵌套路径会被当作根路径，不会嵌套之前的路径  
* 不加`/`的路径会链接到之前的路径后面去  

### axios封装  
* 请求之前：一般接口都有鉴权认证(token)，因此在接口的请求头中，需要加入token。而如果每次请求再去添加，则会加大工作量且容易出错。所以，使用axios拦截器可以在请求的拦截器中添加token  
```js  
// 请求拦截器，请求发送前拦截  
axios.interceptors.request.use((conifg) => {  
    // ...可以添加其他处理  
    config.headers.x_access_token = token  // 添加token  
    return config  
}, function(error){  
    return Promise.reject(error)  
})  
```  
* 响应之后：若响应失败，则在axios中统一处理，可以大大降低工作量，提高代码质量。这里使用axios的响应拦截器。  
```js  
// 响应拦截器  
axios.interceptors.response.use(function(response){  
    // 用户token失效  
    if(response.data.code === 401){  
        // 清空用户信息  
        sessionStorage.user = ''  
        sessionStorage.token = ''  
        window.location.href = '/'  // 返回登录页  
        return Promise.reject(msg)  // 返回promise错误状态  
    }  
    // 若接口请求失败  
    if(response.status !== 200 || response.data.code !== 200){  
        message.error(mag)  
        return Promise.reject(msg)  
    }  
}, function(error){  
    if(axios.isCancel(error)){  
        requestList.length = 0  
        // store.dispatch('changeGlobalState', {loading: false})  
        throw new axios.Cancel('cancel request')  
    }  
    else{  
        message.error('网络请求失败，请重试')  
    }  
    return Promise.reject(error)  
})  
```  
**axios使用**  
* 执行get请求  
```js  
aixos.get('url',{  
    params: {}, // 接口参数  
}).then(function(res)){  
    console.log(res);  // 请求成功添加处理  
}.catch(function(error)){  
    console.log(error)  // 请求失败添加处理  
}  
```  
* 执行post请求  
```js  
axios.post('url',{  
    data: xxx  // 参数  
},{  
    headers: xxx,  // 请求的头信息  
}).then(function(res)){  
    console.log(res);  // 请求成功添加处理  
}.catch(function(error)){  
    console.log(error)  // 请求失败添加处理  
}  
```  
* axios API通过相关配置传递给axios完成请求  
```js  
// delete  
axios({  
    method: 'delete',  
    url: 'xxx',  
    cache: false,  
    params: {id: 123},  
    headers: xxx,  
})  
// post  
axios({  
    method: 'post',  
    url: '/user/123',  
    data:{  
        firstName: 'z',  
        lastName: 'x'  
    }  
});  
```  
**基本使用封装**  
```js  
/*  
* url:请求的url  
*p arams:请求的参数  
* config:请求时的header信息  
* method:请求方法  
*/  
const request = function ({ url, params, config, method }) {  
  // 如果是get请求，则将参数json化  
  let newParams = methods === 'get' ? {params} : params  
  return new Promise((resolve, reject) => {  
    axios[method](url, newParams, config).then(response => {  
      resolve(response.data)  
    }, err => {  
      if (err.Cancel) {  
      } else {  
        reject(err)  
      }  
    }).catch(err => {  
      reject(err)  
    })  
  })  
}  
```  


## Vue原理  

### MVVM  
<img alt="mvvm" src="@alias/mvvm.png" style="zoom:80%"/>  

* Model-View-ViewModel  
* 数据驱动视图，通过ViewModel连接View和Model，进行数据绑定并监听DOM事件  
* 因此，数据改变，View自动发生改变。View中的DOM事件也可以被成功监听并修改Model数据。  
* vue自动实现view更新，不需要操作DOM。  

### Vue响应式  
Vue响应式：组件data数据一旦变化，则立刻触发视图更新  
**响应式过程**  

![vue-reactive](@alias/vuereactive.png)  
**总结：**    
* 任何一个vue组件上都有一个Watcher实例。  
* vue中的data中的数据会被添加getter和setter属性。  
* 当组件的render函数执行时，data中的getter方法会被调用，此时vue会记录此组件所依赖的所有data（依赖收集）。  
* data变化时，setter方法被调用，vue会通知所有依赖于该数据的组件去调用他们的render函数进行更新。  

**原理**  
* 核心API - Object.defineProperty  
* 使用Observer对数据进行劫持和深度监听，若传入的data是一个对象，则对data进行深度递归，添加setter和getter  
* getter中Dep实例会调用dep.append方法收集依赖，把当前渲染的Watcher记住  
* setter中设置新值，Dep会调用dep.notify方法通知之前记住的Watcher进行视图更新  

**如何监听数组的变化？**  
* 调用另一套机制 —— 重写Array原型方法  
* 首先拷贝数组的原型，然后在自己创建的原型对象中重写7个会改变数组本身的方法，如push、pop、splice等，在重写的方法中首先调用原Array方法改变数组，然后加入一个视图更新的逻辑，即可更新视图  
* 最后更改数据的原型链，执行方法时会执行自己重写的方法，里面添加了更新视图的逻辑  

**实现**  
使用Object.defineProperty实现对象的深度监听，  
使用重写原型的方法实现数组监听：  
```js  
// 更新视图逻辑  
function updataView(){  
    console.log('更新视图')  
}  

// (1) 拷贝数组原型  
const oldProto = Array.prototype  
// (2) 创建新对象，原型指向Array.prototyp，扩展新方法不影响原型  
const arrProto = Object.create(oldProto);  
// (3) 重写会改变数组本身的方法  
['push', 'pop', 'shift', 'unshift'].forEach((method) => {  
    arrProto[method] = function(){  
       Array.prototype.method.apply(this, arguments)  
       
       // 重写的方法里面加上一个视图更新逻辑  
       updataView()  
    }  
})  

// 2. 给data中数据添加getter和setter  
function defineReactive(target, key, value){  
    // 3. 深度监听（适用数组）  
    Observer(target, key)  

    Object.defineProperty(target, key, {  
        get: function(){  
            return value;  
        },  
        set: function(newVal){  
            if(newVal != value){  
                // 3. 深度监听  
                Observer(target, key)  
                // 设置新值  
                value = newVal  

                // 更新视图  
                updateView()  
            }  
        }  
    })  

}  

// 1. 数据劫持，将属性变为响应式  
function Observer(target, key){  
    if(typeof(target) !== 'object' || target == null)  
        // 不是对象或数组  
        return target  

    // (4) 监听数组  
    if(Array.isArray(target)){  
        target.__proto__ = arrProto  
    }  
    
    // 遍历属性，添加getter和setter  
    for(let key in target){  
        defineReactive(target, key, target[key])  
    }  
}  

const data = {  
    name: 'z',  
    age: 20,  
    info: {  
        address: 'Shanghai'  // 需要深度监听  
    }  
    nums: [10, 20, 30]  // 数组  
}  
Observer(data)  

data.info.address = 'Shenzhen'  // set中也需要深度监听，才能正确赋值  
data.nums.push(50)  // 监听数组  
data.x = '100'  // 新增属性，无法监听，需要使用Vue.set  
delete data.name  // 删除属性，无法监听，Vue.delete(data.name)  
```  

**Object.defineProperty缺点**  
* 深度监听需要递归到底，一次性计算量大  
* 无法监听新增/删除属性（Vue中用Vue.set和Vue.delete实现正确监听）  
* 无法原生监听数组，需要特殊处理  


### 虚拟DOM和diff算法  
* v-dom是实现vue和React的重要基石  
* diff算法是v-dom中的核心  
* 由于DOM操作非常耗时，使用数据驱动视图，有效控制DOM操作  

**解决方案：**  
* 将DOM的一些操作转换为JS计算，因为JS执行速度较快  
* v-dom：使用JS对象模拟DOM结构  
* diff算法：通过JS计算出最小的变更，再操作DOM  

**v-dom：**  
* 用JS模拟DOM结构（vnode)，然后构建一个真正的DOM树插到文档中  
* 状态变更后，重新构造一颗新的对象树，然后和旧的vnode比较，记录差异  
* 只把差异部分应用到第一步中真正的DOM树上，视图更新  
* 算法实现：根据DOM结构createElement，然后使用setAttribute添加属性，appendChild添加子节点等  
```html  
<!-- 用JS模拟DOM结构   -->  
<div id="div1" class="container">  
    <p>v-dom</p>  
    <ul style="font-size: 20px">  
        <li>a</li>  
    </ul>  
</div>  
```  
```js  
// vNode  
{  
    tag: 'div',  
    props: {  
        id: 'div1',  
        className: 'container'  
    },  
    children:[  
        {  
            tag: 'p',  
            children: 'v-dom'  
        },  
        {  
            tag: 'ul',  
            props:{  
                style: 'font-size: 20px'  
            }  
            children:[  
                {  
                    tag: 'li',  
                    children: 'a'  
                }  
                
            ]  
        }  
    ]  
}  
```  

**diff算法**  
* 逐层对比，只比较同一层级，不跨级比较  
* tag（标签名）不相同，则直接删掉重建，不再深度比较  
* tag和key，两者都相同，则认为是相同节点，不再深度比较  
* 因此，时间复杂度被优化到O(n)  

![diff](@alias/diff.png)
**过程：**  
* 调用patch函数，接收新旧虚拟节点为参数进行比较，然后局部更新真实DOM  
* patch函数中首先判断两个节点是否值得比较（sameVnode），若值得比较则执行patchVnode  
* 若两者都有子节点，则执行updateChildren比较子节点  

**函数说明：**  
patch：  
* 新旧vnode比较，若不值得比较，则移除旧节点，创建新节点插入，最终返回一个vnode  

sameVnode：  
* 比较tag和key值  
* 判断是否为注释节点或者type信息等等  
* 若不值得比较则直接用vnode替换oldVnode  

patchVnode：  
* 找到真实DOM，判断新旧vnode是否指向同一个对象，是的话直接return  
* 若都有文本节点且不相等，则替换为新vnode的文本节点  
* 若只有一个有子节点，则根据情况删除或者添加子节点  
* 若都有子节点，则执行updateChildren函数比较子节点  

updateChildren：  
* 将新旧vnode的子节点提取出来，如Vch和oldCh  
* 子节点都有两个头尾变量startIdx和endIdx，相互比较，共4种比较方式，分情况处理  
* 子节点sameVnode成功后会接着执行patchVnode，然后层层递归下去，直到对比完成  


**为什么v-for中需要key？**  
* 不使用key则更新时需要将旧节点全部删除，再插入新节点  
* 使用key可以将相同的节点保留，移动位置，只需要创建不同的节点插入  
* 更加快速高效  


### 模板编译  
* 模板编译为render函数，执行render函数返回vnode  
* 基于vnode再执行patch函数  
* 使用webpack vue-loader，会在开发环境下编译模板  


**组件的渲染/更新过程**  
一个组件渲染到页面，修改data触发视图更新  
* 响应式：监听data属性getter和setter  
* 编译模板：模板到render函数再到vnode  
* v-dom：patch(ele, vnode)（第一次）, patch(vnode, newVnode)（更新）  

**初次渲染过程：**  
* 解析模板为render函数（或在开发环境已完成，vue-loader）  
* 触发响应式，监听data属性getter setter  
* 执行render函数，生成vnode，patch(elem, vnode)  

**更新过程：**  
* 修改data，触发setter（此前在getter中已监听）  
* 重新执行render函数，生成newVnode  
* patch(vnode, newVnode)  

**异步渲染：**  
* $nextTick  
* 汇总data的修改，一次性更新视图  
* 减少DOM操作次数，提高性能  

### 前端路由原理  
* 前端路由本质就是监听URL的变化，然后匹配路由规则，显示相应的页面，并且无需刷新
* hash路由：通过onhashchange事件监听url中hash的变化，若刷新则不会触发，可以使用load事件，若跳转则触发hashchange事件
* H5 history路由：监听url中的路径变化，需要客户端和服务端的共同支持，更加美观
* 前端路由跳转不刷新页面，后端路由一定会刷新页面  

**1. hash路由**  
* 如http://localhost/hash.html#/home，存在一个#符号，vue默认hash模式  
* 页面中的hash发生变化时，会触发hashchange事件，网页跳转，但不刷新页面  
* 使用location.hash可以获取hash值  
* hash不会提交到服务端  

**2. history路由**  
* 如http://localhost/home  
* 跳转时也不刷新页面，需要后端配合，后端统一返回一个index.html页面  
* 所以前端路由需要覆盖所有的路由情况，并默认返回一个404页面  
* history.pushState(obj, title, url)：前进到指定url，不刷新页面  
* window.onpopstate()：浏览器前进或后退时触发  

**选择**  
* to B的系统推荐用hash，简单易用，对url规范不敏感  
* to C的系统，可以考虑选择H5 history，但需要服务端支持  

### Vue class（类组件）
* 初始化的data可以被声明为类属性
* methods可以直接被声明为类的成员方法
* 
**vue-property-decorator**
* @Component装饰器可以使类成为Vue组件
```js
import Vue from 'vue'
import Componnet from 'vue-class-component'    // 推荐vue-property-decorator

// App class will be a Vue component
@Component
export default class App extends Vue {}
```

**基本使用**
```js
// 使用js的vue组件
export default { data, props, methods, created, ..}

// 使用TS的vue组件
<script lang="ts">
export default class XXX extends Vue{
    name: string = 'z';      // 直接声明data变量
    printName(type: string){...}   // 直接写methods方法
    @Prop(Number) num: number | undefined;   // @Prop表示不是data，而是prop，运行时是个Number类型

}
```

## Vue3  
* 全部使用TS重写（响应式、v-dom、模板编译等）  
* 性能升级，代码量减少  
* 部分API调整  

### Proxy  
**基本使用**  
```js  
const data = {  
    name: 'z',  
    age: 25  
}  
// const data = ['a', 'b', 'c']  

const proxyData = new Proxy(data, {  
    get(target, key, receiver){  
        // 只处理本身（非原型）属性  
        const ownKeys = Reflect.OwnKeys(target)  
        if(ownKeys.includes(key)){  
            console.log('get', key)  // 监听  
        }  

        const result = Reflect.get(target, key, receiver)  
        return result  // 返回结果  
    },  
    set(target, key, val, receiver){  
        // 重复的数据，不处理  
        if(val === target[key]){  
            return true;  
        }  

        const result = Reflect.set(target, key, val, receiver)  
        console.log('set', key, val)  
        return result  // 是否设置成功，布尔值  
    },  
    deleteProperty(target, key){  
        const result = Reflect.deleteProperty(target, key)  
        console.log('deleteProperty', key)  
        return result   // 是否删除成功，布尔值  
    }  
})  

//使用  
proxyData.address = "address"  
delete proxyData.address  
```  
**Reflect作用**  
* 和Proxy能力一一对应  
* 规范化、标准化，如Reflect.deleteProperty(obj, 'a')  
* 替代Object的一些函数方法，如Reflect.ownKeys(obj)，获取obj的key  

**Proxy实现响应式**  
以上代码基础上加上深度监听，并加上一个判断得出是否是新增属性  
```js  
// 创建响应式  
function reactive(target = {}) {  
    if (typeof target !== 'object' || target == null) {  
        // 不是对象或数组，则返回  
        return target  
    }  

    // 代理配置  
    const proxyConf = {  
        get(target, key, receiver) {  
            // 只处理本身（非原型的）属性  
            const ownKeys = Reflect.ownKeys(target)  
            if (ownKeys.includes(key)) {  
                console.log('get', key) // 监听  
            }  
    
            const result = Reflect.get(target, key, receiver)  
        
            // 深度监听  
            // 性能如何提升的？  
            return reactive(result)  
        },  
        set(target, key, val, receiver) {  
            // 重复的数据，不处理  
            if (val === target[key]) {  
                return true  
            }  
    
            const ownKeys = Reflect.ownKeys(target)  
            if (ownKeys.includes(key)) {  
                console.log('已有的 key', key)  
            } else {  
                console.log('新增的 key', key)  
            }  

            const result = Reflect.set(target, key, val, receiver)  
            console.log('set', key, val)  
            // console.log('result', result) // true  
            return result // 是否设置成功  
        },  
        deleteProperty(target, key) {  
            const result = Reflect.deleteProperty(target, key)  
            console.log('delete property', key)  
            // console.log('result', result) // true  
            return result // 是否删除成功  
        }  
    }  

    // 生成代理对象  
    const observed = new Proxy(target, proxyConf)  
    return observed  
}  

// 测试数据  
const data = {  
    name: 'zhangsan',  
    age: 20,  
    info: {  
        city: 'beijing',  
        a: {  
            b: {  
                c: {  
                    d: {  
                        e: 100  
                    }  
                }  
            }  
        }  
    }  
}  

const proxyData = reactive(data)  
```  
**优点：**  
* 深度监听，性能更好，因为一开始并不递归，而是什么时候访问到什么时候再递归  
* 可监听新增和删除属性  
* 可监听数组变化  





1. v-if和v-show的区别是什么？  
   * v-if是Vue控制的真正的的渲染和销毁，v-show是css切换控制的  
   * v-if具有较大的切换开销，v-show具有较大的初始渲染开销  
   * 若频繁切换则用v-show，若条件一般不变则用v-if  
2. $route和$router的区别是什么？  
3. Vue中几种常用的指令  
4. Vue中常用的修饰符  
5. v-on跨域绑定多个方法吗  
6. Vue中key值的作用  
   * 必须用key，且不能是index和random  
   * diff算法中通过tag和key来判断，是否是sameNode  
   * 减少渲染次数，提升渲染性能  
   
7. Vue的计算属性  
   * 缓存，data不变不会重新计算  
   * 提高性能  
8. 如何定义vue-router的动态路由，获取传过来的值  
9.  watch和computed的差异  
10. 组件中的data为什么是函数？  
    * Vue组件是一个类，每个地方使用这个组件时相当于是类的实例化  
    * 为了防止数据共享，使用函数的话执行函数数据就会在闭包之中，修改数据后不会互相影响  
11. 组件渲染和更新的过程  
    * vue响应式  
    * 模板编译  
    * 事件监听  

12. 对于MVVM的理解  
13. 第一次页面加载会触发哪几个钩子  
14. DOM渲染在哪个生命周期中完成  
15. Vue组件生命周期（父子组件）  
16. Vue实现数据双向绑定的原理  
    * input元素value = this.name  
    * 绑定input事件this.name = $event.target.value  
    * data更新触发re-render  
17. Vue组件间的通讯  
    * 父子组件props和this.$emit  
    * 自定义事件event.$on, enent.$off, event.$emit  
    * vuex  
18. Vuex是什么？怎么使用？使用场景？  
19. 虚拟DOM的优缺点  
20. Vue和React的区别  
21. Vuex中mutation和action的详细区别  
22. Vue的diff算法  
    * patch(elem, vnode)和patch(vnode, newVnode)  
    * patchVnode和addVnodes和removeVnodes  
    * updateChildren（key的重要性）  
23. ajax请求应该放在哪个生命周期  
    * mounted  
    * js是单线程，ajax异步获取数据  
    * 组件渲染完成之后获取数据，放在mounted之前也没什么用  
24. 何时使用beforeDestroy  
    * 解绑自定义事件event.$off，防止内存泄漏  
    * 清除定时器  
    * 解绑自定义的DOM事件，如window.scrool  
25. Vuex中action和mutation区别  
    * action中处理异步，mutation不可用  
    * mutation中做原子操作  
    * action可以整合多个mutation  

26. Vue性能优化  
    * computed、v-if、v-show  
    * v-for使用key  
    * 自定义事件、DOM事件及时销毁  
    * 合理使用异步组件  
    * 合理使用keep-alive  
    * data层级不要太深  
27. 异步渲染和$nextTick  
    * 异步渲染（合并data修改），提高渲染性能  
    * $nextTick在DOM更新完成之后触发回调  
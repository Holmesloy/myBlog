# Vue3  

## Vue3 对比 Vue2 优势  
* 性能更好，体积更小  
* 更好的 ts 支持  
* 更好的代码组织与逻辑抽离  

## Vue3 生命周期  
### Composition API  
setup() 函数中使用 onBeforeMount(() => {}) 形式去书写全部生命周期，组织在一起  

## Composition API 与 Options API  


## ref toRef 和 toRefs  
### ref  
* 除了模板外，一律用 ref.value 形式取值  
* 与 reactive 可联合使用  
* 定义的值记得使用 return  
### toRef  
* 用于一个响应式对象（reactive 封装）的其中一个属性实现响应式  
* 创建一个 ref，具有响应式  
* 两者保持引用关系  
### toRefs  
* 将响应式对象（reactive 封装）转换为普通对象，有时候方便使用  
* 对象的每个 prop 都是对应的 ref  
* 两者保持引用关系  
### 最佳使用方式  
* 用 reactive 做对象的响应式，用 ref 做值类型响应式  
* setup 中返回 toRefs(state)，或者 toRef(state, 'xx')  
* ref 变量命名使用 xxRef  
* 合成函数返回响应式对象时，使用 toRefs  

![toRefs](@alias/toRefs.jpg)  

### 为什么需要 ref  
* 返回值类型，会丢失响应式  
* 如在 setup、computed、合成函数，都有可能返回值类型  
* Vue 如不定义 ref，用户将自己自造 ref，反而混乱  
### ref .value  
* ref 是一个对象（保证响应式），用 value 存储值  
* 通过 value 属性的 get 和 set 实现响应式  
* 用于模板、reactive 时，不需要 .value，其他情况都需要  

### 为什么需要 toRef、toRefs  
* 不丢失响应式的情况下，把数据分解/扩散  
* 前提：针对的是响应式对象（reactive 封装）  
* 注意：不创造响应式，而是延续响应式  

## Vue3 新功能  
* createApp  
* emits 属性（setup 中第二个参数）  
* 生命周期  
* Fragment：根节点不用一个单一父节点包裹了  
* 异步组件：引入 Vue 一个方法  
* 移除 .sync  
* 移除 filter  
* Teleport：选择插入 DOM 位置  
* Suspense：具名插槽封装  
* Compostion API  

## Compositon API  
### 逻辑复用  
* 抽离逻辑代码到一个函数  
* 函数命名约定为 useXxx 格式（同 React Hooks）  
* 在 setup 中引入 useXxx 函数  

### 与 Hooks 对比  
* setup 只会被调用一次，而 Hooks 函数会被多次调用  
* 前者无需 useMemo useCallback，因为 setup 只调用一次  
* 前者无需顾虑调用顺序，后者需要保证 Hooks 的顺序一致  

## Vue3 原理  

* Vue2：Object.defineProerty  
* Proxy 语法与实现响应式  

### Proxy 实现响应式  
**Reflect 作用**  
* 和 Proxy 能力一一对应  
* 规范化、标准化、函数式  
* 逐步替代 Object 上的工具函数  

**响应式实现**  
* 深度监听，性能更好  
* 可监听新增/删除属性  
* 原生监听数组变化  
* 无法兼容所有浏览器，无法 polyfill  

### watch 和 watchEffect  
* 两者都可监听 data 属性变化  
* watch 需要明确监听哪个属性  
* watchEffect 会跟据其中的属性，自动监听其变化  

### setup 中获取组件实例  
* 在 setup 和其他 Composition API 中没有 this  
* 可通过 getCurrentInstance 获取当前实例  
* 若使用 Options API 可正常使用 this  

### Vue3 为何比 Vue2 快  
* Proxy 响应式  
* PatchFlag  
* hoistStatic  
* cachehandler：缓存事件  
* SSR 优化：与编译优化相似  
* tree-shaking：减少引用，按需引入  

**PatchFlag**  
* 编译模板时，动态节点做标记  
* 标记，分为不同的类型，如 TEXT PROPS  
* diff 算法时，可以区分静态节点，以及不同类型的动态节点  

**hoistStatic**  
* 将静态节点的定义，提升到父作用域，缓存起来  
* 多个相邻的静态节点，会被合并起来  
* 典型的那空间换时间的优化策略  

**Vite 为何启动快**  
* 开发环境使用 ES6 Module，无需打包  
* 生产环境使用 rollup，没有快很多  


## Vue3.2 + TS + setup
### 基本写法
```ts
<template>
// template 中不再限制只有一个根元素
</template>

// TS 类型定义与 setup 都写在 script 标签中
<script lang="ts" setup>
// Vue 内置属性需要从 vue 引入
import { ref, reactive, onMounted, computed, watch, watchEffect, nextTick } from 'vue';

// compostition API 写法，同个模块的数据和逻辑放在一起
const countRef = ref(1);

const doubleCount = computed(() => {
  return countRef.value * 2;
})

onMounted(() => {
  countRef.value = 2;  // 注意使用 .value 写法
})

function changeCount() {
  countRef.value = -countRef.value;
}

// listen countRef
watch(
  () => countRef.value,
  () => {
    console.log('count', countRef.value);
  },
  {
    immediate: true,  // 立即执行
    deep: true,       // 深度监听
  }
)

nextTick(() => {
  // ...
})

const background = 'red';
</script>

<style lang="scss" scoped>
// Vue3.2 支持使用 v-bind() 进行 css 变量注入
.test {
  background: v-bind(background);  // 可绑定 ref、reactive、computed 值
}
</style>
```

### 父子组件通信
```ts
// 父组件
<template>
  // 传给子组件 name 值为 Z, update-name 接收子组件的 emit 方法和参数
  <child 
    name='Z' 
    @update-name="updateName" 
  />  
  <span> {{ myNameRef }} </span>
</template>

<script lang="ts" setup>
  // 引入子组件
import child from './child.vue'

const myNameRef = ref('father');

@updateName(name: string) {
  myNameRef.value = name;
}
</script>
```

```ts
// 子组件
<template>
  <span> {{ props.name }} </span>
  // 可省略 props.
  <span> {{ name }} </span>
  
  <button @click=changeName()></button>
</template>

<script lang="ts" setup>
// defineProps 在 <script setup> 中自动可用，无需使用 import 导入
// 需在 .eslintrc.js 文件中【globals】下配置【defineProps: true】？？？

// TS 写法
const props = defineProps<{
  name?: string  // 是否必传
}>();
// widthDefaults 设置默认值
const props = withDefaults(defineProps<{
  name?: string 
}>(),{
  name:'默认 name'
})
// js 写法
const props = defineProps({
  name: {
    type: String,
    default: '默认 name',
    required: false
  }
})

// 子组件中声明事件 defineEmits
const emit = defineEmits(['updateName'])  // 数组中为事件集合
function changeName() {
  // 执行 emit
  emit('updateName', 'son');
}
</script>
```
### 多级组件通信 provide 和 inject
* 响应式的数据 provide 出去，在子孙组件拿到的也是响应式的,前提是不破坏数据的响应性
* 比如 ref 变量，你需要完整的传入，而不能只传入它的 value，对于 reactive 也是同理，不能直接解构去破坏原本的响应性
```ts
// 父组件或更高
<template>
  <child/>
</template>

<script lang="ts" setup>
import { ref, watch, provide } from 'vue'
// 引入子组件
import child from './child.vue'

let name = ref('Jerry')
let age = ref(25);
// 声明provide
provide('provideState', {
  name,
  age,
  changeName: () => {
    name.value = 'Tom'
  }
})

// 监听name改变
watch(name, () => {
  console.log(`name变成了${name}`)
  setTimeout(() => {
    console.log(name.value) // Tom
  }, 1000)
})
</script>
```

```ts
// 子组件或更低
<script lang="ts" setup>
import { inject } from 'vue'
// 注入，第二个参数为默认值
const provideState = inject('provideState', {})

// 子组件调用方法，触发 name 改变
provideState.changeName()

// 响应式数据直接赋值也可触发父组件原值同步改变
provideState.age = 38
</script>
```
### v-model
* 支持绑定多个 v-model，v-model 是 v-model:modelValue 的简写
* 绑定其他字段，如：v-model:name
```ts
// 父组件
<template>
  // v-model:modelValue简写为v-model
  // 可绑定多个v-model
  <child
    v-model="state.name"
    v-model:age="state.age"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// 引入子组件
import child from './child.vue'

  const state = reactive({
    name: 'Z',
    age: 20
  })
</script>
```
```ts
// 子组件
<template>
  <span @click="changeInfo"> I am {{ modelValue }}，{{ age }} </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: String,
  age: Number
}>();
const emit = defineEmits(['update:modelValue', 'update:age'])

const changeInfo = () => {
  // 触发父组件值更新
  emit('update:modelValue', 'Tom')
  emit('update:age', 30)
}
</script>
```
### ref 子组件实例和 defineExpose
* 在标准组件写法里，子组件的数据都是默认隐式暴露给父组件的
* 但在 script-setup 模式下，所有数据只是默认 return 给 template 使用，不会暴露到组件外，所以父组件无法直接通过挂载 ref 变量获取子组件的数据
* 如果要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由 defineExpose 来完成。
```ts
// 父组件
<template>
  <child ref='childRef'/>
</template>

<script setup>
import { ref, nextTick } from 'vue'
// 引入子组件
import child from './child.vue'

// 子组件ref（TypeScript语法）
const childRef = ref<InstanceType<typeof child>>()

// nextTick 中操作
nextTick(() => {
  // 获取子组件name
  console.log(childRef.value.name)
  // 执行子组件方法
  childRef.value.changeName()
})
</script>
```
```ts
// 子组件
<template>
  <span>{{state.name}}</span>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
// defineExpose无需引入

// 声明state
const state = reactive({
  name: 'Z'
}) 

// 将变量、方法暴露给父组件使用，父组件才可通过 ref API 拿到子组件暴露的数据
defineExpose({
  // 解构state
  ...toRefs(state),
  // 声明方法
  changeName () {
    state.name = 'Tom'
  }
})
</script>
```
### 插槽
```ts
// 父组件
<template>
  <child>
    // 匿名插槽，子组件中无插槽名
    <span> 我是默认插槽 </span>
    // 具名插槽，注意用 #
    <template #title>
      <h1>我是具名插槽</h1>
    </template>
    // 作用域插槽，footer 为插槽 name 名，scope 为子组件中定义并传过来的值
    <template #footer="{ scope }">
      <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
    </template>
  </child> 
</template>

<script setup>
// 引入子组件
import child from './child.vue'
</script>
```
```ts
// 子组件
<template>
  // 匿名插槽，父组件中默认的内容全部插入到该处
  <slot/>
  // 具名插槽
  <slot name='title'/>
  // 作用域插槽，具有 name 值与其他的属性值，父组件可以进行调用
  <slot name="footer" :scope="state" />
</template>

<script lang="ts" setup>
import { useSlots, reactive } from 'vue'
const state = reactive({
  name: '张三',
  age: '25岁'
})

const slots = useSlots()  // 插槽相关属性
// 匿名插槽使用情况
const defaultSlot = reactive(slots.default && slots.default().length)
console.log(defaultSlot) // 1

// 具名插槽使用情况
const titleSlot = reactive(slots.title && slots.title().length)
console.log(titleSlot) // 3
</script>
```
### 路由 useRoute 和 useRouter
```ts
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

// 必须先声明调用
const route = useRoute()
const router = useRouter()

// 路由信息
console.log(route.query)

// 路由跳转或其他操作
router.push('/newPage')
</script>
```
### 路由导航守卫
```ts
<script lang="ts" setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// 添加一个导航守卫，在当前组件将要离开时触发。
onBeforeRouteLeave((to, from, next) => {
  next()
})

// 添加一个导航守卫，在当前组件更新时触发。
// 在当前路由改变，但是该组件被复用时调用。
onBeforeRouteUpdate((to, from, next) => {
  next()
})
</script>
```
### Pinia
* 同时支持 Composition Api 和 Options api 的语法
* 去掉 mutations ，只有 state 、getters 和 actions 
* 不支持嵌套的模块，通过组合 store 来代替
* 更完善的 Typescript 支持
* 清晰、显式的代码拆分

**main.ts 引入**
```ts
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```
**配置 store.ts**
```ts
import { defineStore } from 'pinia';

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须，在所有的 Store 中唯一
  id: 'globalState',
  // state: 返回对象的函数
  state(() => {
    count: 1,
    data: {
      name: 'z',
      age: 25
    }
  }),

  // getters 相当于 Store 中的 computed 属性
  // getters 第一个参数是 state，是当前的状态，也可以用 this 获取状态
  // getters 中可以访问其他的 getters，或者是其他的 Store
  getters: {
    doubleCount((state) => state.count * 2);

    // 通过 this 获取当前状态（注意 this 指向）
    tripleCount() {
      return this.count * 3;
    }
  },

  // 定义改变 Store 中数据的方法，可以使用异步
  actions: {
    updateData(newData, count) {
      // 使用 this 直接修改
      this.data = { ...newData }
      this.count = count
      
      // 使用 $patch 修改多个值，放在 patch 中非常方便
      this.$patch({
        data: { ...newData },
        count
      })
    }
  }
})
```
**使用 Store**
```ts
<template>
  // 获取 store 的 state
  <p>姓名：{{ store.data.name }}</p>
  <p>性别：{{ store.data.age }}</p>
  
  // 调用 actions 方法 / 修改 store
  <button @click="update">修改用户信息</button>
  
  // 获取 getter
  <p>获取getter：{{ store.doubleCount }}</p>
</template>

<script setup>
import { useStore } from '@store/store.js'
const store = useStore()

function update () {
  // 通过 actions 定义的方法修改 state
  store.updateData({ name: 'Tom', sex: '女' })
  
  // 通过 store 直接修改
  store.data = { name: 'Tom', sex: '女' }
  
  // 一次同时改变多个状态，即 data 和 count
  store.$patch((state) => {
    state.data = { name: 'Tom', sex: '女' }
    state.count = 2
  })
}
</script>

<style lang="scss" scoped>
</style>
```
**替换整个 state**  
`$state` 可以让你通过将 store 的属性设置为新对象来替换 store 的整个 state
```ts
const store = useStore()
store.$state = {
  name: 'Bob',
  age: 88
}
```

**重置 state**
调用 store 上的 `$reset()` 方法将状态重置为初始值
```ts
const store = useStore()
store.$reset()
```
### 原型绑定与组件内使用
**main.js**
```ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 获取原型
const prototype = app.config.globalProperties

// 绑定参数
prototype.name = 'Jerry'
```
**组件内使用**
```ts
<script setup>
import { getCurrentInstance } from 'vue'

// 获取原型
const { proxy } = getCurrentInstance()

// 输出
console.log(proxy.name)
</script>
```
### 对 await 的支持
不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup 。
```ts
<script lang="ts" setup>
  const post = await fetch('/api').then(() => {})
</script>
```
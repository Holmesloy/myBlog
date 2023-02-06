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


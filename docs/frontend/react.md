# React  

## React和Vue对比  
* 同样使用虚拟DOM，diff算法，支持组件化，数据驱动视图  
* Vue采用传统三段式结构，书写更清晰；而React使用JSX语法，混合JS与HTML，更加灵活  
* Vue原生支持双向绑定，方便数据和视图同步；而React采用单向数据流，可采用onChange和setState实现双向  
* Vue原生提供指令便于功能开发，React偏向使用ES6语法实现，对JS语法要求更高  

## React基本使用  

### JSX  
* HTML和JS逻辑耦合  
* 变量或表达式：用大括号{}包裹  
* Babel会把JSX转译成一个名为 React.createElement() 函数调用  

### 列表渲染  
* map方法，返回一个数组，数组中每项作为一个渲染项  
* key，返回的每项中需要添加key值，类似vue中的key  
* 注意JSX中{}和()的使用，{}包裹变量和表达式，()用于分界，如包裹一个`<div>`  

### 事件绑定  
* 使用bind(this)  
* 关于event参数  
* 传递自定义参数  

**写法**  
* 事件绑定方式：驼峰式写法，如`onClick = {}`，大括号包裹  
* 事件中this默认为undefined，所以需要手动绑定this（两种方法）  
* 默认传入的event参数不是原生event，为React封装的event  
* 注意传参的时候，默认最后一个参数是event  
```js  
class EventDemo extends React.Component{  
    constructor(props){  
        super(props)  

        this.setState = {}  

        // 方法1：修改方法的this指向，在constructor中绑定  
        this.handleClick = this.handleClick.bind(this)  
    }  
    render(){  
        return (  
            <div>  
            <p onClick = {this.handleClick1}>h</p>  
            <p onClick = {this.handleClick2}>h</p>  
            <p onClick = {this.handleClick3}>h</p>  

            </div>  
        )  
    }  

    handleClick1(){  
        console.log("click1")  
    }  

    // 方法2：静态方法，箭头函数中this指向当前实例  
    handleClick2 = () => {  
        console.log("click2")  
    }  

    // 1. event是React封装的，能够模拟DOM事件的全部能力  
    // 2. event.nativeEvent是原生事件对象  
    // 3. 所有的事件，都被挂载到document上  
    // 4. 和DOM事件不一样，和Vue事件也不一样  
    handleClick3 = (event) => {  
        event.preventDefault()  
        console.log('target', event.target)  

    }  
}  
```  
**React中的event对象**  
* event是React封装的，使用模拟DOM事件的全部能力  
* event.nativeEvent是原生事件对象  
* 所有的事件，都被挂载到document上  
* 和DOM事件不一样，和Vue事件也不一样  

### 表单  
* 受控组件：绑定事件和组件，使用this.state值和事件实现双向绑定，如添加onChange事件  
* input、textarea、select用value属性设置  
* checkbox、radio用checked属性  
```js  
<input value={this.state.val} onChange={this.changeVal}/>  

<select checked={this.state.checked} onChange={this.changeC}/>  
```  

### props  
* 传递数据  
* 传递函数  
* 类型检查  

**使用：**  
* 函数式组件中直接使用props，类组件中使用this.props  
* 父组件向子组件中传递`<List data={myData}>`，data即传递给子组件的数据，作为子组件的props一个对象  

**类型检查：**  
```js  
// 安装一个propType组件  
import PropTypes from 'prop-types'  

// props 类型检查  
List.propTypes = {  
    list: PropTypes.arrayOf(PropTypes.object).isRequired  
}  
```  

### setState  
* 不可变值（不可直接修改state，赋值只能是新值）  
* 直接使用时是异步  
* 使用setState回调函数、或setTimeout、或自定义DOM事件中都是同步，可以直接拿到最新值  
* 回调函数仅仅可以获取到当前修改后的state，再次执行setState方法获取到的state值依然为挂载后初始state值  
* 可能会被合并  

```js  

```  
  
**state**  
* 函数组件没有state  
* state放在constructor中  
* 不能直接修改，改变其中值必须用setState  
* 若要进行其他操作，可以先生成一个copy，再进行其他操作，再用setState  
```js  
this.state = {  
    list: [],  
    count: 0  
}  

const listCopy = this.state.list.slice()  
listCopy.push(1)  // 拷贝副本再去操作  
this.setState({  
    count: this.state.count + 1  // 这里是新的count，以前的count不受影响  
    list: listCopy  // 以前的list不变  
})  
--------------------------------------------------  
console.log(this.state.count)   // 异步，拿不到新值  
// 1. 如何拿到最新的值：使用setState的第二个参数  
this.setState({  
    count: this.state.count + 1  
}, () => {  
    // 类似Vue $nextTick  
    console.log('count by callback', this.state.count)  // 获取最新值  
})  

// 2. setTimeout中setState是同步的  
setTimeout(() => {  
    this.setState({  
        count: this.state.count + 1  
    })  
    console.log(this.state.count)  // 可以直接拿到最新值  
}, 0)  

// 3. 自己定义的DOM事件也是同步的  
clickHandler = () => {  
    this.setState({  
        count: this.state.count + 1  
    })  
    console.log(this.state.count)  // 可以直接拿到最新值  
}  
componetDidMount(){  
    // 自己定义的DOM事件  
    document.body.addEventListener('click', this.clickHandler);  
}  

// 注意，自定义事件要及时销毁  
componentWillUnmount(){  
    document.body.removeEventListener('click', this.clickHandler);  
}  
-----------------------------------------------------  
// 1. 传入对象，会被合并，执行结果只一次+1  
this.setState({  
    count: this.state.count + 1  
})  
this.setState({  
    count: this.state.count + 1  
})  
this.setState({  
    count: this.state.count + 1  
})  

// 2. 传入函数，不会被合并，执行结果+2  
this.setState((preState, props) => {  
    return {  
        count: preState.count + 1  
    }  
})  
this.setState((preState, props) => {  
    return {  
        count: preState.count + 1  
    }  
})  
```  

### 组件生命周期  
![reactcycle](@alias/reactcycle.png)  


## React高级特性  

### 函数组件  
* 纯函数，输入props，输出JSX  
* 没有实例，没有生命周期，没有state  
* 不能扩展其他方法  
* 选择：简单组件用function，复杂用class  

![reactCom](@alias/reactcom.png)  

### 非受控组件  
* ref  
* defaultValue和defaultChecked  
* 需要操作DOM元素的时候使用，setState实现不了  
* 如文件上传时`<input type=file/>`，需要获取文件信息则要获取DOM  

**ref**  
* 作用同vue中ref,vue中ref为字符串，react中为自己创建的对象  
* 首先在constructor中创建ref，然后在标签中添加ref属性  
* 同样用来获取DOM节点，使用this.对象名.current访问  
```js  
constructor(props){  
    super(props);  
    this.state = {}  
    this.nameRef = React.createRef()  // 创建一个ref  
}  

render(){  
    return(  
        <div>  
        // 非受控组件，使用defaultValue而不是value，添加ref属性  
        // 这里使用ref来获取改变的DOM元素的值，state不会改变  
        <input defaultValue={this.state.name} ref={this.nameref}/>  /* 使用ref属性 */  
        </div>  
    )  
}  
alertName = ()=> {  
    const elem = this.nameRef.current  // 获取DOM节点  
    alert(elem.value)  // 可以使用button来获取节点值  
}  
```  
### Portals  
* 改变组件渲染位置  
* 组件默认会按照既定层次嵌套渲染  
* 如何让组件渲染到父组件以外？  
* 使用场景：overflow:hidden || 父组件z-index太小 || fixed元素要放在body第一层级  
```js  
render(){  
    // 使用Portals渲染到body上  
    return ReactDOM.createPortals(  
        <div className="modal">{this.props.children}</div>,  
        document.body   // 要渲染到的位置  
    )  
}  
```  
### context  
* 用于不同层级组件之间共享一些相同数据，避免中间元素传递Props  

```js  
// 创建一个context  
const myContext = React.createContext(defaultValue);  

// Context.Provider  
<MyContext.Provider value={/* 某个值 */}>  

// Context.Consumer  
<MyContext.Consumer>  
    value={/* 基于某个context值渲染 */}  
</MyContext.Consumer>  
```  

### 异步组件  
* import()  
* React.lazy  
* React.Suspense    
```js  
const contextDemo = React.lazy(() => import('./路径'))  

<React.Suspense fallback={<div>loading...</div>}>  
    <contextDemo/>  
</React.Suspense>  
```  

### 性能优化  
* shouldComponentUpdate(SCU)  
* PureComponent和React.memo  
* 不可变值immutable.js  

**SCU基本用法**  
* React中，如果父组件更新，那么子组件都会更新  
* 因此，一些不需要更新的组件也会被更新，需要优化  
* 优化的方式就是使用SCU，其中加入判断，数据不变时，组件不更新  
* 必须配合不可变值一起使用，有性能问题时再使用SCU  
```js  
// 若无定义，默认返回true  
// 注：SCU属于一个特殊的生命周期  
shouldComponentUpdate(nextProps, nextState){  
    if(nextState.count != this.state.count){  
        return true  // 可以渲染  
    }  
    return false  // 不重复渲染  
}  
```  
**PureComponent和memo**  
* SCU中实现了浅比较的SCU，优化性能，结合不可变值使用  
* memo：函数组件中的PureComponent  
* 浅比较已适用大部分情况  
```js  
// 这样就会默认在SCU中作了浅比较  
class Demo extends React.PureComponent{  
    shouldComponentUpdate()  
}  
```  
```js  
function MyComponent(props){  

}  
// 自己书写一个类似SCU的函数  
function isEqual(preProps, nextProps){  
    if(preProps.count != nextProps.count)  
        return true;  
    return false;  
}  
// 将组件和函数传入React.memo中，就会返回一个新的带有SCU功能的组件  
export default React.memo(MyComponent, isEqual)  
```  
**immutable.js**  
* 实现不可变值  
* 基于共享数据（不是深拷贝），速度更快  

**组件公共逻辑的抽离**  
* 高阶组件HOC  
* Render Props  

**高阶组件HOC**  
```js  
// 高阶组件不是一种功能，而是一种模式  
const HOCFactory = (Component) => {  
    class HOC extends React.Component{  
        // 再次定义多个组件的公共逻辑  
        render(){  
            return <Component {...this.props}/> // 返回拼装的结果  
        }  
    }  
    return HOC  
}  

const HComponent1 = HOCFactory(Componnent1)  
const HComponent2 = HOCFactory(Componnent2)  
```  

## Redux  
### 基本组成  
* store：存储数据，生成一个对象
* state：某个时刻的数据，使用`store.getState()`得到  
* action：表示view变化发出的通知，通过`store.dispatch()`发出action  
* reducer：Store中State的计算过程，State改变，视图才会改变

### 单项数据流  
![reduxflow](@alias/reduxflow.png)
* 用户发出Action：`store.dispatch(action)`
* Store自动调用Reducer，传入两个参数：当前State和收到的Action。Reducer返回新的State：`let nextState = todoApp(preState, action)`
* State若发生变化，Store会调用监听函数：`store.subscribe(listener)`
* listner可以通过store.getState()得到当前状态，触发重新渲染View：`component.setState(store.getState())
* dispatch(action)  
* reducer -> newState  
* subscribe触发通知  



**react-redux**  
* `<Provider>` connect  
* connect  
* mapStateToProps mapDispatchToProps  

## React原理  
### 函数式编程  
一种编写程序的方法论，属于结构化编程的一种，主要思想式把运算过程尽量写成一系列嵌套的函数调用。  

### 虚拟DOM  
* h函数：传入一个tag、一些属性还有子节点，然后返回一个vnode数据结构  
* patch函数：将vnode渲染到DOM节点中，并更新vnode  

### diff算法  
* 只比较同一层级，不跨级比较  
* tag不相同，则直接删掉重建  
* tag和key都相同，则认为是相同节点，不再深度比较  

### JSX本质  
* JSX等同于Vue模板  
* React.createElement即h函数，返回vnode，然后通过patch渲染  
* 第一个参数，可能是组件，也可能是html tag  
* 组件名，首字母必须大写（React规定）  

### 合成事件（React event）  
* 所有事件挂载到document上  
* event不是原生的，是SyntheticEvent合成事件对象  
* 和Vue事件、DOM事件不同  

**优点：**  
* 更好的兼容性和跨平台，如手机端操作  
* 载到document，减少内存消耗，避免频繁解绑  
* 方便事件的统一管理（如事务机制）  

### setState和batchUpdate  
* setState本身不锁雾异步还是同步  
* 看是否能命中batchUpdate机制  
* 判断isBatchingUpdates  

**哪些能命中batchUpdate**  
* 生命周期（和它调用的函数）  
* React中注册的事件（和它调用的函数）  
* React可以管理的入口  

**哪些不能命中：**  
* setTimeout setInterval等（和它调用的函数）  
* 自定义DOM事件（和它定义的函数）  
* React管理不到的入口  

### transaction事务机制  
如下的一种机制：  
首先定义一个入口  
然后定义一个出口  
最后用perform方法执行  
```js  
indrease = () => {  
    // 开始：处于batchUpdate  
    // isBatchUpdate = true  

    // 其他任何操作  

    // 结束  
    // isBatchUpdate = false  
}  
```  

### 组件渲染和更新过程  
* JSX如何渲染为页面  
* setState之后如何更新页面  

* props state  
* render()生成vnode  
* patch(elem, vnode)  

**更新过程：**  
* setState(newState) -> dirtyComponent（可能有子组件）  
* render()生成newVnode  
* patch(vnode, newVnode)  

**React fiber**  
patch:  
* reconciliation阶段：执行diff算法，纯js计算  
* commit阶段：将diff结果渲染到DOM  

以上阶段可能会有性能问题：  
* js是单线程，且和dom渲染共用一个线程  
* 当组件足够复杂，组件更新时计算和渲染压力较大  
* 同时再有DOM操作需求（动画等），将卡顿  
  
解决方案：fiber  
* 将reconciliation阶段进行任务拆分  
* DOM需要渲染时暂停，空闲时恢复  
* window.requestIdleCallback  

**React性能优化**  
* 渲染列表时加key  
* 自定义事件、DOM事件及时销毁  
* 合理使用异步组件  
* 减少函数bind this的次数  
* 合理使用SCU、PureComponent和memo  


## React Hooks  
* 可选功能（class组件 vs Hooks）  
* 函数更灵活、更易拆分和测试  
* 函数组件需要增强能力 —— Hooks  
* 命名都以useXxx开头  


**class组件的问题**  
* 大型组件很难拆分和重构，很难测试（class不易拆分）  
* 相同业务逻辑，分散到各个方法中，逻辑混乱  
* 复用逻辑变得复杂  

### State Hook  
* 让函数组件实现state和setState  
* 函数组件是一个纯函数，执行完即销毁，无法存储state  
* State Hook将state功能“钩”到纯函数中  

**useState**  
* useState(0)传入初始值，返回数组[state, setState]  
* 直接通过{state}获取值  
* 通过setState()修改值  
```js  
import React, { useState } from 'react'  

function ClickFunc(){  
    // 数组解构  
    // useState()返回一个数组，count等于初始值，setCount等于数组第二项，为操作count的函数  
    const [count, setCount] = useState(0)  // 0是初始值  

    // 相当于以下代码  
    // const arr = useState(0)  
    // const count = arr[0]  
    // const setCount = arr[1]  

    return  
        <div>  
            <p>点击了{count}次</p>  
            <button onClick={() => setCount(count + 1)}>click</button>  
        </div>  
}  
```  
### Effect Hook  
* 函数组件没有生命周期  
* 函数组件是一个纯函数，执行完即销毁  
* 使用Effect Hook将生命周期“钩”到函数组件上  

**useEffect**  
使纯函数有了副作用，即造成一定的影响，如设置全局定时任务，用以实现生命周期。  
* 模拟componentDidMount —— 依赖于[]  
* 模拟componentDidUpdate —— 依赖于[a, b, c]  
* 模拟componentWillUnMount —— 返回一个函数，依赖于[]  
```js  
import React, { useState, useEffect } from 'react'  

function LifeCycles(){  

    // 同时模拟class组件的DidMount和DidUpdate  
    useEffect(() => {  
        console.log('发送ajax请求')  
    })  

    // 只模拟DidMount，第二个参数为空数组  
    useEffect(() => {  
        console.log('加载完成')  

        // 模拟WillUnMount  
        let timerId = window.setIntevval(() => {  
            consle.log(Data.now());  
        }, 1000)  

        // 返回一个函数  
        // 模拟WillUnMount  
        return () => {  
            window.clearIntever(timerId)  
        }  
    }, [])  // 空数组相当于不依赖任何state  

    // 只模拟DidUpdate，第二个参数数组中是依赖的state，useState中设置  
    useEffect(() => {  
        console.log('更新完成')  
    }, [count, name])  // count和name变化才会触发  
```  
**useEffect模拟WillUnMount注意事项**  
useEffect中返回函数fn：  
* useEffct依赖[]，组件销毁时执行fn，等于WillUnMount  
* useEffect无依赖或依赖[a, b]，组件更新时执行fn  
* 即，下一次执行useEffect之前，就会执行fn，无论更新还是卸载  

    
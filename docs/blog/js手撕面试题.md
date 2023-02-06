---  
title: JS手撕面试题  
date: 2020-12-08  
categories:  
 - 面试  
tags:  
 - js  
 - code  
 - 面试  
---  

## 1. 实现 new 操作符  
使用 new 操作符创建实例，进行了以下步骤：  
（1）创造一个新的对象   
（2）将该对象链接到构造函数的原型（变成原型的实例对象）    
（3）this 指针指向该对象，并执行构造函数，添加属性和方法  
（4）返回该对象  
```javascript  
/**  
 * Func：构造函数  
 * args：构造函数传入的参数  
 * 注：构造函数一般无返回值，但用户可以自定义返回值覆盖对象返回方法  
 * 或者寄生构造函数，因此本实现中会判断构造函数有无返回值  
 */  
var _new = function(Func, ...args){  // 注：这里...就是将参数序列塞进一个数组args  
    // 创建一个Func的实例对象  
    const obj = {};  
    obj.__proto__ = Func.prototype;  // Func的实例对象  

    // 改变this指针，执行Func，re为函数返回值  
    let res = Func.call(obj, ...args);  // 细节，这里...就是将args展开为参数序列  
    // 这里也可以使用Func.apply(obj, args)，因为args是一个数组  

    // 若构造函数有返回值，返回的是对象或者函数，则返回res，创建成功  
    if(res != null && (typeof(res) == "object" || typeof(res) == "function")){  
        return res;  
    }  
    return obj;  // 若构造函数无返回值，则直接返回obj即可  
}  

var obj = new Func(1, 2);  
// equals to  
var obj = _new(Func, 1, 2);  
```  

## 2. 实现 instanceof 机制  
instanceof 用来判断引用类型的类型，用法：`obj instanceof Object`  
使用 instanceof 会沿着实例对象的原型链上寻找，只要是原型链中存在该类型，则返回true，一直找到基类`Object.prototype.__proto__`  
```javascript  
/**  
* obj：待检测的数据  
* Func：给定构造函数或者类型  
*/  
function _instanceof(obj, Func){  
    // 获取 Func的原型对象  
    const Proto = Func.prototype;  
    // 获取实例对象的原型链对象  
    let proto = obj.__proto__;  

    while(proto != null){  
        if(proto === Proto)  
            return true;  
        
        // 沿着对象的原型链寻找  
        proto = proto.__proto__;  
    }  
    return false  
}  

car instanceof Car  
// equals to  
_instanceof(car, Car);  
```  

## 3. 实现 call() 方法  
`call()`用来改变函数执行的作用域，即 this 指向，简单来说就是执行原函数，但是作用域改变，后面的参数逐个传入，并立即执行。  
实现：  
* 给新对象内部添加一个方法属性，该函数即为原函数  
* 根据传入的参数执行原函数方法，得到结果后再删除该属性，返回结果。  
```javascript  
/**  
 * context：要指向的对象  
 * args：传入的参数序列，...将其转换为数组  
 */  
Function.prototype.call = function(context, ...args){  
    // context为空时作用域指向window  
    const context = context || window;  
    // 给指向的对象添加一个新属性fn，this为原函数  
    context.fn = this;  

    // 传入参数执行原函数，此时this指向context，result为在该作用域中的执行结果  
    const result = context.fn(...args);  
    delete context.fn;  // 设置完成员属性后，删除fn属性  
    return result;  // 返回执行结果  
}  
```  

## 4. 实现 apply() 方法  
实现和 call() 非常接近，只是传入的参数形式是数组形式，而不是逗号分隔的参数序列。  
```javascript  
Function.prototype.apply = function(context, args){  
    const context = context || window;  
    context.fn = this;  

    const result = context.fn(...args);  // 数组转化为参数序列执行  
    delete context.fn;  
    return result;  
}  
```  

## 5. 实现 bind() 方法  
bind() 同样用于改变函数执行的 this 指针，区别在于 bind() 会创建一个新的函数，只有经过调用才会执行。第一个参数同样是要指向的对象，后面的参数依次传入 bind，不管是调用 bind 还是后续调用新函数。  
先看一个例子：  
```js  
var obj = {name:"Smiley"};  
var greeting = function(str, lang){  
    this.value = 'greetingValue';  
    console.log("Welcome " + this.name + " to " + str + " in " + lang);  
};  
var objGreeting = greeting.bind(obj, 'the world');  

objGreeting('JS');  // Welcome Smiley to the world in JS  
```  
以上代码中，greeting 调用 bind 改变了 this 指向 obj，'the world' 变成 greeting 的第一个参数 str，相当于初始化，再次调用 objGreeting() 时，传入的 'JS' 为 greeting 的第二个参数 lang，按照顺序传入。  
```js  
/**  
 * context：bind要绑定的对象  
 */  
Function.prototype.bind1 = function(context){  
    let _this = this;  
    // 得到除去context外的传入参数  
    let args = Array.prototype.slice.call(arguments, 1);  

    // 返回一个函数，使用apply绑定context  
    return function(...params){  
         return _this.apply(context, args.concat(params))  
    }  
}  

// equals to  
Function.protytype.bind2 = function(context, ...params){  
    let _this = this;  
    return function(...args){  
        // 拼接初始参数和后来传入的参数  
        return _this.apply(context, parmas.concat(args))  
    }  
}  

// 调用  
function fn1(a, b){  
    console.log('this', this)  
    console.log(a, b)  
    return 'fn1'  
}  
const fn2 = fn1.bind1({x: 1}, 10, 20)  
fn2();  
```  
## 6. 实现继承  
使用 ES6 实现继承：  
* extends 方法继承父类属性  
* super 中调用父类构造方法  
```js  
class Animal{  
    constructor(number){  
        this.number = number  
        this.type = 'animal'  
    }  

    print(size){  
        console.log(`${this.type} is ${size}`);  
    }  
}  

class Cat extends Animal{  
    constructor(number, food){  
        super(number)  
        this.type = 'cat'  
        this.food = food  
    }  

    newPrint(){  
        console.log('newPrint')  
    }  
}  
```  


## 7. 实现一个防抖函数  
函数防抖（debounce）：当事件处理函数执行后，要经过一段时间才能再次执行，在这段时间内，如果不断触发事件，每触发一次事件都会重新计时。  
比如点击按钮触发事件，设定防抖事件 1000ms，当我持续点击按钮的时候，除了第一次执行，其他如果点击间隔小于 1000ms，就不会执行事件，会一直重新计时。  
效果：频繁触发中只执行一次  
```js  
/**  
 * @param func 需要执行的函数  
 * @param wait 检测的防抖的时间间隔  
 * @return {可被调用的函数}  
 */  
function debounce(func, wait = 500){  
    let timer = null  // 设置timer计时器  

    // params为执行函数参数  
    return function(){  
        // 如果定时器有值，则清除定时器并置为空重新计时  
        if(timer){  
            clearTimeout(timer);  
        }  
        // 延迟执行函数，并用timer计时  
        timer = setTimeout(() => {  
            func.call(this, ...arguments)  // 此时this指向返回的新的函数  
            timer = null   // timer需要清空  
        }, wait)  

    }  
}  

// 调用举例  
function print(name){  
    console.log(name)  
}  
var dprint = debounce(print(name){  
    console.log(name)  
}, 1000)  
```  

## 8. 实现一个节流函数  
函数节流（throttle）：当持续触发事件时，事件处理函数会每隔一段时间执行，这段时间内最多只会执行一次。  
比如点击按钮触发事件，设定节流时间为 1000ms，当我持续点击按钮时，每隔至少 1000ms 才会执行一次时间处理函数。  
效果：频繁触发中减少执行频率  
```js  
function throttle(func, delay = 100){  
    let timer = null  
    
    return function(...params){  
        if(timer){  
            return  
        }  
        timer = setTimeout(() => {  
            func.apply(this, params)  
            timer = null  
        }, delay)  
    }  
}  
```  
  
## 9. 实现 Object.create  
Object.create()就是以传入的对象作为原型，创建新的对象并返回  
```javascript  
/**  
* proto：传入的对象，作为原型  
*/  
function create(proto, properties = {}) {  
    let newObj = {};  
    newObj.__proto__ = proto;  // 链接原型  

    // newObj上无其他属性  
    Object.defineProperties(newObj, properties);  
    return newObj;  
}  
```  

## 10. 实现一个浅拷贝  
浅拷贝是创建一个新对象，拷贝原对象的属性和值，如果属性为基本数据类型，则拷贝值，如果为引用数据类型，则拷贝的是一个引用地址，简单来说，新旧对象共享同一块内存，改变其中一个引用，会影响到另一个引用数据类型。  
**object.assign实现**  
```js  
const obj = {  
    a: 10  
}  

const copy = Object.assign({}, obj)  
```  
**slice实现**  
```js  
const arr = [1, 2, [3, 4]]  

const copy = arr.slice()  
```  

## 11. 实现一个深拷贝  
深拷贝是从堆内存中开辟一个新的区域存放新对象，完整拷贝原对象，修改新对象不会影响原对象。  
**JSON 方法**  
```js  
const copy = JSON.parse(JSON.stringify(obj))  
```  
**递归实现**  
```js  
function deepClone(obj){  
    if(obj == null || obj !== 'object')  
        return obj;  
    
    // Date type
    if(obj instanceof Date) {
        const clone = new Date()
        clone.setTime(obj.getTime())
        return clone
    }
    // RegExp
    if(obj instanceof RegExp) {
        const Constructor = obj.constructor
        return new Constructor(obj)
    }
    // array and object
    let clone = Array.isArray(obj) ? [] : {}  
    for(const key in obj){  
        if(obj.hasOwnProperty(key)){  
           clone[key] = typeof(obj[key]) == 'object' ? deepClone(obj[key]) : obj[key]   
        }  
    }  

    return clone  
}  
```  




## 12. 实现 Promise  

```js  
const PNEDING = 'pending'  
const RESOLVED = 'resolved'  
const REJECTED = 'rejected'  

function Promise(fn){  
    // 保存初始状态  
    var self = this  

    // 初始化状态为pending  
    this.state = PENDING  

    // 用来保存resolve或reject传入的值  
    this.value = null    

    // 保存resolve的回调函数  
    this.resolveCallbacks = []  
    // 保存reject的回调函数  
    this.rejectCallbacks = []  

    // 状态转变为resolve方法  
    function resolve(value){  
        // 判断传入元素是否为一个Promise，若是则状态改变需要等待前一个状态改变完成  
        if(value instanceof Promise){  
            return value.then(resolve, reject)  
        }  

        // 保证代码执行顺序为本轮事件循环末尾  
        setTimeout(() => {  
            // 当状态为pending时才能改变  
            if(state === PENDING){  
                self.state = RESOLVED  
                // 设置传入的值  
                self.value = value  
                // 指向回调  
                self.resolvedCallbacks.forEach((callback) => {  
                    callback(value)  
                })  
            }  
        }, 0)  
    }  

    // 状态改变为rejected方法  
    fuction reject(value){  
        // 保证代码执行顺序为本轮事件循环末尾  
        setTimeout(() => {  
            // 当状态为pending时才能改变  
            if(state === PENDING){  
                self.state = REJECTED  
                // 设置传入的值  
                self.value = value  
                // 指向回调  
                self.rejectedCallbacks.forEach((callback) => {  
                    callback(value)  
                })  
            }  
        }, 0)  
    }  

    // 将两个方法传入函数执行  
    try{  
        fn(resolve, reject)  
    } catch(e) {  
        // 遇到错误时，执行reject函数  
        reject(e)  
    }  
}  

// then方法  
Promise.prototype.then = function(onResolved, onRejected){  
    // 首先判断两个参数是否为函数类型  
    onResolved =  typeof onResolved === 'function' ?  
                  onResolved : function(value){ return value }  
    
    onRejected =  typeof onRejected === 'function' ?  
                  onRejected : function(error){ throw error }  
    
    // 如果是等待状态，则将函数加入对应列表中  
    if(this.state === PENDING){  
        this.resolvedCallbacks.push(onResolved)  
        this.rejectedCallbacks.push(onRejected)  
    }  

    // 如果状态已经不可变，则直接执行对应状态函数  
    if(this.state === RESOLVED){  
        onResolved(this.value)  
    }  
    if(this.state === REJECTED){  
        onRejected(this.value)  
    }  
}  
```  

### Promise.all()  
```js  
Promise.all = function(iterator){  
    if(!Array.isArray(iterator))  return;  
    let count = 0;  
    let res = [];  
    return new Promise((resolve, reject) => {  
        for(let item of iterator){  
            Promise.resolve(item)  
            .then(data => {  
                res[count++] = data;  
                if(count === iterator.length)  
                    resolve(res)  
            })  
            .catch(err => {  
                reject(err)  
            })  
        }   
    })  
}  
```  

### Promise.race()  
```js  
Promise.race = function(iterator){  
    return new Promise((resolve, reject) => {  
        for(let item of iterator){  
            Promise.resolve(item)  
            .then(data => {  
                resolve(data)  
            })  
            .catch(e => {  
                reject(e)  
            })  
        }  
    })  
}  
```  


## 13. 实现一个发布-订阅模式（即观察者模式）  
发布-订阅就是就是一个消息队列传送机制，订阅了某个事件的对象当该事件发布时（即发生时）会接收到相应的消息，然后执行对象中的回调函数。例如，当一些对象订阅了登录事件，则登录事件发生后，触发消息，然后就会执行所有订阅了登录事件的函数。  
所以，发布-订阅要实现一个订阅函数`on()`和一个发布函数`emit()`。当发布时，执行所有订阅了其消息的函数。  
```js  
class EventEmitter{  
    constructor{  
        // 事件对象，存放订阅事件的名称和相应回调函数  
        this.events = {};  
    }  
    // 订阅函数  
    on(eventName, callback){  
        // 如果不存在，则放入数组  
        if(!this.events[eventName])  
            this.events[eventName] = [callback];  
        // 如果已经存在该名称，则加入回调函数到数组尾部（一个事件  
        // 不止对应一个回调函数）  
        else  
            this.events[eventName].push(callback);  
    }  
    // 触发事件对应的方法  
    emit(eventName){  
        // 遍历执行所有的事件  
        this.events[eventName].forEach(fn => fn())  
    }  
}  
```  

## 14. 实现函数的柯里化  
柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。  
举例：  
```js  
function add(num1, num2){  
    return num1 + num2;  
}  
// 一次传入两个参数  
add(2, 3);  // 5  

// 假设有一个curry函数进行柯里化  
var curryAdd = curry(add);  
curryAdd(2)(3);  // 5  
```  
函数柯里化本质就是创建一个闭包，保存参数，当参数数量达到函数执行要求时，执行函数。  
**实现：**  
```js  
function curry(fn){  
    // 得到剩余的参数  
    var args = Array.prototype.slice.call(arguments, 1);  
    return function(){  
        // 得到调用函数时新传入的参数  
        var newArgs = Array.prototype.slice.call(arguments);  
        var finalArgs = args.concat(newArgs);  // 最终所有参数  
        return fn.apply(null, finalArgs)  
    }  
}  
```  

## 15. 数组的扁平化 flat() 方法  
数组的扁平化指的就是数组的降维，将一个数组中内部的所有数组都进行展开。  
效果如下：  
```js  
let arr = [  
    1,  
    [3, 5, 6],  
    [7, [7, 8], 9, 11],  
    12  
];  

const a = flat(arr); // [1,3,5,6,7,7,8,9,11,12]，不改变原数组  
```  
### （1）递归+concat  
* concat在连接数组时可以降低一维，再使用递归可以一直给数组降维  
```js  
function flat(arr){  
    // 判断arr中还有没有深层数组，如[1,2,[3,4]]  
    const isDeep = arr.some(item => item instance of Array)  
    if(!isDeep)  
        return arr   // 已经扁平化，直接返回  

    // 使用concat对数组进行降维  
    const res = Array.prototype.concat.apply([], arr)  
    
    // 使用递归不断降维  
    return flat(res)  
}  
```  
### （2）递归+自定义函数  
循环数组中的每一个元素，判断该数组是否为数组，如果是数组，则循环遍历该数组，否则直接将元素添加到新数组中。  
```js  
Array.prototype.myFlat = function (){  
    // 保存this，即原数组arr  
    let _this = this;  
    let newArr = [];  // 操作新数组，因此不改变原数组  

    // 定义一个递归函数，用来遍历其中的元素  
    let cycle = function(arr) {  
        for(let i = 0; i < arr.length; i++){  
            let item = arr[i];  
            if(Array.isArray(item)){  
                cycle(item);  // 是数组就向下递归  
                continue;  
            }  
            else  
                newArr.add(item);  
        }  
    }  

    cycle(_this); // 执行该函数  
    return newArr;  
}  
```  
### （3）reduce() + concat() + 递归  
使用reduce()简化代码，实际还是递归调用  
```js  
function myFlat(arr){  
    return arr.reduce((pre, cur) => {  
        return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur)  
    }, []);  // []表示第一次迭代pre默认值为[]  
}  

// 注，这样写就直接调用函数  
const newArr = myFlat(arr);  
```  

## 16. 基于 Promise 封装 Ajax  
Promise 主要使用两种状态，resolve 和 reject，可以根据 XHR 对象的状态码来设置，然后返回 Promise 实例，基本思路如下：  
1. 直接返回一个新的 Promise 实例（以下在实例中操作）  
2. 创建一个 XMLHttpRequest 对象  
3. 调用 open() 方法，设置 url，与服务器建立连接  
4. 监听 Ajax 状态事件 onreadystatechange（注意要先设置监听再发送请求，否则可能收不到响应）  
5. 当 xhr.readyState == 4（服务器响应完成，可以获取其中数据了）  
   * xhr.status == 200：服务器响应成功，置为 resolve  
   * xhr.status == 404：服务器响应失败，置为 reject  
```js  
function ajax(url, method){  
    return new Promise((resolve, reject) => {  
        const xhr = new XMLHttpRequest();  
        xhr.open(url, method, true);  // 异步发送  
        // 事件监听  
        xhr.onreadystatechange = function(){  
            if(xhr.readyState == 4){  
                if(xhr.status == 200)  
                    resolve(xhr.responseText);  
                else if(xhr.status == 404)  
                    reject(new Error('404'));  
            }  
            else  
                reject('请求失败');  
        };  
        // 发送请求（注意先设置监听再发送请求）  
        xhr.send(null);  
    });  
}  

// 调用  
const url = "/api/data/test"  
ajax(url, 'Get')  
    .then(res => console.log(res))  
    .catch(err => console.log(err))  
```  
## 17. 实现一个 sleep 函数  
等待一段时间，就去执行某个函数，基于 Promise 实现  
```js  
function sleep(wait){  
    return new Promise((resolve, reject) => {  
        setTimeout(() => {  
            resolve();  
        }, wait);  
    });  
}  

const print = (name) => { console.log(name) }  

// 使用await调用  
async function autoRun(){  
    await sleep(2000);  
    let name1 = print("z");  
}  
autoRun();  
```  

## 18. 创建 10 个`<a>`标签  
```js  
let a;  
for(let i = 0; i < 10; i++){  
    a = document.createElement('a');  
    a.innerHTML = i + '<br>'  
    a.addEventListener('click', function(e){  // e为事件对象  
        // 取消事件的默认行为  
        e.preventDefault();  
        alert(i);  // 按照标签序号弹出  
    })  

    document.body.appendChild(a);  
}  
```  

## 19. 手写一个 Promise 加载图片  
```js  
// 手写一个Promise加载图片  
function getPic(url){  
    return new Promise((resolve, reject) => {  
        const img = document.createElement('img')  
        img.onload = () =>{  
            resolove(img)  
        }  
        img.onerror = () => {  
            const err = new Error(`error ${src}`)  
            reject(err)  
        }  
    })  
}  

const url = "http://www.picurl.com"  
getPic(url).then(img => {  
    console.log(img.width)  
    return img  
}).then(img => {  
    console.log(img.height)  
}).catch(err => {  
    console.log(err)  
})  
```  
## 20. 实现数组 map 方法  
* map 用于遍历数组，进行一些操作，最终返回一个新的数组，第二个参数为指定的 this 作用域，不指定则指向 window  
* 首先创建一个新的数组，然后执行传入的回调函数  
* 回调函数的执行结果依次 push 进新的数组中，最后返回该数组  
```js  
Array.prototype.myMap = function(fn, context){  
    const res = []  
    for(let i = 0; i < this.length; i++){  
        res.push(fn.call(context, this[i], i, this))  
    }  
    return res  
}  
```  

## 21. 实现数组 filter 方法  
* filter 用于遍历数组，寻找满足条件的元素，将它们塞进一个新的数组返回，第二个参数也是 this 指定的作用域  
* 首先创建一个新的数组，然后遍历  
* 根据条件判断元素，满足条件则push进数组，最后返回该数组  
```js  
Array.prototype.myFilter = function(fn, context){  
    const res = []  
    for(let i = 0; i < this.length; i++){  
        const flag = fn.call(context, this[i], i, this)  
        if(flag === true)  
            res.push(item)  
    }  

    return res  
}  
```  

## 22. 实现数组 reduce 方法  
* reduce 是归并方法，每次得到的 pre 为上一次执行后的结果，最终返回一个值  
* 首先判断有没有传入第二个参数，即初始值，  
* 然后迭代执行 fn，不断更新结果，最后返回  
```js  
Array.prototype.myReduce = function(fn, initValue){  
    // 初始值为空且数组长度为0  
    if(initValue === undefined && this.length === 0){  
        throw new Error('error')  
    }  
    // 更新result  
    let res = initValue ? initValue : this[0]  
    for(let i = initValue ? 0 : 1; i < this.length; i++){  
        res = fn(res, this[i], i, this)  
    }  

    return res  
}  
```  
## 23. 实现一个 JSONP  
* 创建一个 script 节点，然后将其插入到 dom 中运行
* 定义一个执行函数，处理数据
* 节点的 src 中传入执行函数到另一个域（另一个域中需存在该同名函数与传出数据）
```js  
function handleResponse(data){  
    console.log(`response data: ${data}`)  
}  

var script = document.createElement('script')  
script.src = 'http://test.com?callback=handleResponse'  

document.body.appendChild(script)  

```  

## 24. 实现图片的懒加载  
* 图片 src 默认先加载一个预览图或者一个 loading 占位图  
* 图片原图放在自定义的标签属性 data-src 中（使用 dataset.src 访问）  
* 监听当图片进入可视区域时，给 src 赋值，即 data-src 中的图片  
* Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置  
```js  
function imgLoad(){  
    const imgs = document.querySelectorAll("img")  
    for(let i = 0; i < img.length; i++){  
        if(imgs[i].getBoundingClientRect().top < window.innerHeight)  
            imgs[i].src = imgs[i].dataset.src  
    }  
}  

window.onload = imgLoad  
window.onscroll = throttle(imgLoad)  // 要做一个防抖处理  
```  
## 25. 虚拟 DOM 的模拟  
```js  
class Element{  
    constructor(tagName, attrs, children){  
        this.tagName = tagName  
        this.attrs = attrs || {}  
        this.children = children ||[]  
    }  
    render(){  
        // 生成真实DOM，最后会把return的结果添加到页面中  
    }  
}  
```  
## 26. CSS 画三角形  
* 宽度 width 为 0，高度 height 为0  
* 设置 border 长度和位置  
```css  
/* 如等腰三角形，其中border-top没有值，则border会以其他长度为准进行连接 */  
#triangle{  
    width: 0;  
    height: 0;  
    border-left: 50px solid transparent;  
    border-right: 50px solid transparent;  
    border-bottom: 100px solid red;  
}  

/* 扩展：画圆的话元素高度和宽度要相等，然后设置border-radius为50%即可 */  
```  
## 27. 洗牌算法  
* 将数组随机打乱  
* 实现：依次遍历数组元素，将当前元素和其他的元素中随机选择一个进行交换  
```js  
function shuffle(arr){  
    for(let i = 0; i < arr.length; i++){  
        // i + 向下取整（(0, 1) * 长度 - i）  
        let random = i + Math.floor(Math.random() * arr.length - i)  
        // 解构赋值  
        [arr[i], arr[random]] = [arr[random], arr[i]]  
    }  
}  
```  
## 28. 数组与树结构的转化  
```js  
const data = [  
    { id: 0, parentId: null, name: '生物'},  
    { id: 3, parentId: 0, name: '微生物' },  
    { id: 1, parentId: 0, name: '动物' },  
    { id: 2, parentId: 1, name: '大象'}  
]  
// 数组与树结构的相互转化  
const obj = {  
    "id": 0,  
    "parentId": null,  
    "name": '生物',  
    "children": [{  
        "id": 1,  
        "parentId": 0,  
        "name": '动物',  
        "children":[{  
            "id": 2,  
            "parentId": 1,  
            "name": '大象'  
        }],  
        "id": 3,  
        "parentId": 0,  
        "name": '微生物'  
    }]  
}  
```  
**数组转化为树结构**  
* 对象数组需要按照 id 值排好序，每个对象 id 唯一，但是 parentId 可以相同  
* 根据 parentId 找到父元素  
```js  
function transTree(data){  
    let result = []  
    let obj = {}  
    if(!Array.isArray(data)){  
        return []  
    }  
    data.forEach(item => {  
        obj[item.id] = item    // 一次浅拷贝，使用其中数据  
    })  
    data.forEach(item => {  
        let parent = obj[item.parentId]  
        if(parent){  
            // 如果有父元素，则将该元素放到父元素的children中  
            (parent.children || (parent.children = [])).push(item)  
        }  
        else{  
            result.push(item)  
        }  
        return result  
    })  
}  
console.log(JSON.stringify(transTree(data)))  
```  
**树结构转化为数组**  
bfs + 队列  
```js  
function transArr(obj){  
    let queue = [...obj]  
    let data = []   // 返回结果  
    while(queue.length !== 0){  
        let item = queue.shift()  
        data.push({  
            id: item.id,  
            parentId: item.parentId,  
            name: item.name  
        })  
        let children = item.children  
        if(children){  
            for(let i = 0; i < children.length; i++){  
                queue.push(children[i])  
            }  
        }  
    }  
    return data  
}  
console.log(transArr(obj))  
```  
## 29. 实现 JSON.stringify  
* 使用递归实现  
```js  
function Stringify(obj){  
    if(typeof(obj) !== 'object')  
        return obj.toString()  
    let json = []  
    // 判断传入的是对象还是数组  
    let arr = Array.isArray(obj)   // true表示数组  
    for(let key in obj){  
        if(obj.hasOwnProperty(key)){  
            let item = obj[key]  
            if(typeof(item) === 'object')  
                item = Stringify(item)  
            json.push((arr ? "" : '"' + key + '":') + String(item))  
        }  
    }  
    console.log(arr, String(json))  
    // 根据类型添加[]或{}  
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");  
}  
```  
## 30. 实现 url 参数解析
```js
var url = 'www.u.com/home?id=2&type=0&dtype=-1';
function parseUrl(url){
    const result = []
    let query = url.split("?")[1]
    let queryArr = query.split("&")
    
    queryArr.forEach(item => {
        let obj = {}
        let key = item.split("=")[0]
        let value = item.split("=")[1]
        obj[key] = value
        result.push(obj)
    })

    return result
}
console.log(parseUrl(url))
```
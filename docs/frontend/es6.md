# ES6

## let和const  
用于变量声明，支持块级作用域  
**let：添加一个块级作用域**  
**const：声明一个只读的常量，声明后不可改变**（注：定义的基本类型不能改变，但是引用类型可变，因为变量保存的是引用类型的内存地址）  

**和var的区别：**    
* var存在变量提升，let和const必须先声明后使用 
* var和let是变量，const是常量，不可修改  
* var没有块级作用域  
* const定义的基本类型不能改变，但是引用类型可变，因为变量保存的是引用类型的内存地址 
* var不受限于块级，而且使用var声明的变量也是window的一个属性  

**JS变量提升：**    
* 变量可以在使用后声明，也就是变量可以先使用再声明。  
* 变量提升优先级：**函数声明 > arguments > 变量声明**。    
* 注意，let和const存在暂存性死区，在声明之前使用会报错。   

**函数提升：**  
* 函数声明function(){}也会提升，可以在声明前使用，  
* 函数表达式`const fn = function(){}`不能提升，提前使用会提示`TypeError`  

## Map和Set
### Map
* 键值对结构，查找速度较快
* 构造函数与Map()可以接收一个数组作为参数
```js
初始化：
var m = new Map();
var m1 = new Map([['x1', 10], ['x2', 20]]);

常用方法：
m.set(key, value) ：添加key-value，添加新值或覆盖原值
m.get(key) ：获取key对应的value，不存在为undefined
m.has(key) ：查找是否存在某key
m.delete(key) ：删除某项
```
### Set
* 存储元素不重复，插入重复值会被过滤
* 构造函数Set()可以接收一个数组作为参数
```js
初始化：
var s = new Set();
var s1 = new Set([1, 2, 3]);

常用方法：
s.add(key) ：插入某值
s.delete(key) ： 删除某值
```
注：Map和Set都是iterable类型，通常使用for...of循环或者forEach进行遍历。

## 模板字符串  
`${ 字符串变量 }`：将字符串作为变量进行拼接，使用`${}`  
注：带有变量的字符串拼接要放在反引号（` `` `）中  
```js  
const name = "z"  
console.log(`hello ${name}`);  // hello z，注意反引号  
```  

## 箭头函数  
函数的简单写法，不需要写function，不需要写return  
```js  
function(x, y){  
    return x + y;  
}  
// equals to  
(x, y) => x + y;  

// 单个参数可以不要括号
x => x + 1;
```  
与普通函数最大区别：箭头函数的this继承上下文，不会改变，取上级作用域的值，而普通函数谁调用它，this就指向谁。  

## 函数的默认值  
ES6允许函数在声明时设置默认值，直接写在参数后面  
```js  
function print(x, y = "z"){    // y设置默认值  
    console.log(x + ' ' + y);  
}  

print("hello");  // hello z  
```  

## 三点操作符：...  
含义分为两种，一种是展开运算符，一种是剩余操作符。  
### 展开运算符（spread operator）  
作用于Array和Object上，将元素展开  
```js  
let a = [1, 2, 3];  
let b = [0, ...a, 4];  // [0,1,2,3,4]，将a展开，再进行解构赋值  

let obj = { a: 1, b: 2 };  
let obj1 = { ...obj, c: 3 };  // {a:1, b:2, c:3}  
let obj2 = { ...obj, a: 3 };  // {a:3, b:2}，后面的a重新赋值了，覆盖了之前a的值  
```  
展开操作符进行的是**对属性的浅拷贝，只拷贝了第一层**，常用于项目开发实际开发中：  
```js  
let obj = { a:1, b: 2 };  
let copy = {...obj};  // 浅拷贝  
copy.a = 3;  
console.log(copy.a);  // 3  
console.log(obj.a);   // 1  
```  

**将数组转化为参数序列**  
```js  
// 数组[1, 2] 转化为 1, 2  
let arr = [1, 2];  
functin add(a, b){  
    return a + b;  
}  
// 函数中(...arr) -> (...[1, 2]) -> (1, 2)  
let result = add(...arr);  // result == 3  
```  

### 剩余操作符（rest operator）  
作用于谁身上就表示将剩余元素塞进一个数组中，再赋予它，常用于数组的解构。  
```js  
let [a, ...b] = [1, 2, 3];  // 将剩余元素2，3放在一个数组中给b  
// a = 1, b = [2, 3]  

let a = [1, 2, 3];  
let [b, ...[c, d, e]] = a;  
// b = 1, c = 2, d = 3, e = undefined  

// 常用于函数的参数传递  
function test(a, ...rest){  // 将参数序列转换为数组，注意区别  
    console.log(a);    // 1   一个是作为参数，一个是传入参数
    console.log(rest);  // [3, 2], rest[0] = 3  
}  
test(1, 3, 2);   // 参数序列
```  

## 对象的扩展  
1. 对象中都是使用键值对进行书写，而键和值是有可能重名的，ES6提供简写形式。  
```js  
// ES5  
function person(name, age){  
    return{  
        name: name,  
        age: age,  
    };  
}  

// ES6  
function person(name, age){  
    return{  
        name,  
        age  
    };  
}  
```  
2. ES6也简化了对象字面量的赋值语法  
```js  
// ES5  
var person = {  
    name: "z",  
    print: functinon(){  
        console.log(this.name);  
    }  
}  

// ES6  
var person = {  
    name: "z",  
    // 省略了冒号function关键字，直接写函数名，本质是一样的  
    print(){  
        console.log(this.name);  
    }  
}  
```  
3. Object.assign( )：实现浅拷贝  
Object.assign()可以把任意多个源对象自身的可枚举属性拷贝给目标对象再返回，第一个参数即为目标对象  
```js  
const obj1 = {name: 'z', age: 25};  
const obj2 = {job: 'none'};  
const obj3 = {interest: 'study'};  

const obj = Object.assign({}, obj1, obj2);  
// {name: "z", age: 25, job: "none"}  

Object.assign(obj3, obj1);  
// {name:"z", age:25, interest:'study'}  
```  
## 解构赋值  
作用于数组和对象，简化赋值语法。  
```js  
// 对象  
const person = {  
    name: "z",  
    age: 25  
}  
// ES5  
var name = person.name;  
var age = person.age;  
cosole.log(name + ' ' + age); // z 25  

// ES6  
const {name, age} = person;   // 常用
console.log(`${name} ${age}`);  //z 25, 注意反引号中的字符会直接输出，包括空格，有几个空格就输出几个  

// 数组  
const color = ['red', 'green']  
const [first, second] = color  
console.log(first, second)   // red green(中间空格)  
```  
## import和export  
import导入模块，export导出模块  
```js  
// 全部导入  
import people from './example';   // 原导出模块名称为people

// 将整个模块作为一个对象导入，其中的所有导出都作为对象的属性  
import * as example from './example';  // 将模块命名为example对象导入  
console.log(example.name);  // name作为example的属性  
console.log(example.print()); // print()方法作为example的属性  

// 导入部分  
import{ name, age } from './example';  

// 导出默认，有且仅有一个默认，但可以有多个导出  
export defalt App;  

// 部分导出  
export class App extend Component {};  
```  
导入时对于大括号{}的使用：  
```js  
1. 默认导出时，导入不需要使用大括号  
export default person;  
import person from './example';  // 不用大括号  

2. 当导出某一变量时候，导入该变量要加上大括号  
export name;  
import { name } from './example';  // 名称不变  

3. 当一个文件存在多个export时，导入时以逗号分开  
export default person;  
export age;  
import person, {name, age} from './example';  // 分别导入  

4. 当一个文件导出很多模块时，可以使用import * as 变量 形式导入  
import * as example from './example';  // example作为新命名的变量  
```  

## Promise  
回调地狱：
* 回调函数以函数为参数，它依赖其中传入参数返回的值，所以需要等待传入的函数执行完成
* 比如http请求中请求函数作为处理函数的参数，这个过程是异步调用的，当功能比较复杂时，就需要连续调用
* 因此会出现一个函数嵌套另一个函数的情况，不仅造成代码可读性低，而且容易出错，即回调地狱。  

**Promise**
* 异步编程的一种解决方案，是ES6的一个对象
* Promise也作为一个构造函数
* 从它可以获取异步操作的消息

**Promise**的三种状态：**pending（等待态）**，**resolved（成功态）**和**rejected（失败态）**。  
创建Promise实例后，它会立即执行。    
注：此时会作为同步代码立即执行，直到Promise中遇到异步任务或者状态改变调用.then()方法才会变成异步任务。 
```js  
const p = new Promise((resolve, reject) => {  
    // 做一些异步操作，如  
    setTimeout(() => {  
        console.log("complete");  
        resolve("成功");  
    }, 2000);  
});  
```  
Promise的构造函数接收一个函数作为参数，该函数中还需要传入两个参数：  
* 第一个参数表示异步操作执行成功后的回调函数，如以上的resolve  
* 第二个参数表示异步操作失败后执行的回调函数，如以上的reject  
* 也可直接使用Promise.resolve()和Promise.reject()  
注：Promise.resolve(x) 可以看作是 new Promise(resolve => resolve(x)) 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 Promise 实例，Promise.reject()用法相似。  

### then链式操作  
Promise的重点在于“状态”，使用传递状态的方式来使得回调函数能够及时调用，then就是用来传递状态的函数。  
then方法接收两个函数作为参数，第一个对应成功状态的回调，第二个对应失败状态的回调。  
```js  
// 声明p为一个Promise变量  
const p = new Promise((resolve, reject) => {  
    // 异步操作  
    setTimeout(() =>{  
        var num = Math.ceil(Math.random()*10);  
        if(num <= 5)  resolve(num);  
        else  reject("数字太大了");  
    }, 1000);  
});  
// 根据以上p的操作执行回调  
p.then((data) => {    // 对于then，我们一般只使用第一个参数，第二个参数由catch代替
    console.log("resloved", data);  
}, (err) => {  
    console.log("rejected", err);  
});  
```  
以上代码中，根据生成的num大小设置成功或失败状态并传递参数。then中成功状态的回调函数参数data为resolve中传过来的num，失败状态的回调函数参数err为reject中传过来的"数字太大了"；  
### catch的用法  
catch方法和then的第二个参数一样，用来执行失败情况下的回调。另外，当执行回调过程中（不管是哪种状态的回调）抛出异常，则同样进入catch方法中执行代码，不会卡死js。  
我们一般使用then只传递一个参数，用以执行成功情况下回调，然后使用catch执行失败情况下的回调，不过如果then中设置了失败情况下的回调并执行，同样也会进入catch。  
```js  
p.then((data) => {  
    console.log("resovled", data);  
}).catch((err) =>{  // 注意catch直接在then后面调用，使用.  
    console.log("catch reject", err);  
})  
```  
### then和catch状态  
pending->resolved或rejected都不可逆，但resolved和rejected可以互相转换  
* then正常返回resolved，里面发生错误则返回rejected  
* catch正常返回resolved，里面发生错误则返回rejected  
### Promise.all用法  
Promise.all接收一个iterable类型（Array,Map,Set）作为参数，数组中每项都是都是Promise的实例。当数组中每个Promise的最终状态都是成功态时，Promise.all的状态也是成功态，然后可以执行相应回调。有一个失败则执行失败回调。  
注：执行成功回调的数据是一个数组，包含其中每个Promise的状态数据  
执行失败回调的数据为最先进入失败状态的Promise返回的数据  
```js  
let p1 = new Promise((resolve, reject) => {});  
let p2 = new Promise((resolve, reject) => {});  
let p3 = new Promise((resolve, reject) => {});  
// 使用Promise.all方法  
let p = Promise.all([p1, p2, p3]);  

p.then((res) => {   // res为一个数组
    // p1,p2,p3全都执行成功回调p才执行成功回调  
}).catch((err) => {  // err为最先失败返回的数据  
    // 出错或者p1,p2,p3出现失败回调则p执行失败回调  
})  
```  
使用Promise.all，可以并行进行多个异步操作，然后在一个回调中处理所有的返回数据。  
### Promise.race用法  
Promise.race同样接收一个iterable类型（Array,Map,Set）作为参数，与all不同的是，其中哪个Promise的实例率先执行完成，race就返回该结果，而且状态跟先执行完成的实例状态一致。  
注：执行回调的数据为先执行的Promise返回数据
```js  
let p1 = new Promise((resolve, reject) => {});  
let p2 = new Promise((resolve, reject) => {});  
let p3 = new Promise((resolve, reject) => {});  

Promise.race([p1, p2, p3]).then((data) => {  
    // 若第一个执行完成的实例为成功状态，则race也执行成功状态  
}).catch((err) =>{  
    // 若第一个执行完成的实例为失败状态，则race也执行失败状态  
})  
```  
## async和await  
基于Promise的Generaotr函数语法糖，用来实现异步编程，异步的本质还是回调函数。  
async用来声明一个异步函数，返回的是一个Promise对象。await用来等待一个异步方法完成，得到一个Promise结果。  
async和await用于解决Promise传递参数较为复杂的问题，使代码结构看起来更加清晰。  
* 解决回调地狱  
* Promise链式调用同样基于回调函数  
* async/await是同步语法，彻底消灭回调函数  
* 和Promise并不互斥，经常结合使用，如async函数和then()配合使用  

**async/await和Promise**  
* 执行async函数，返回的是Promise对象，一般我们主动返回Promise  
* await相当于Promise的then，所以await下面的代码都是作为异步任务  
* try...catch用于捕获异常，代替Promise中的catch  

async函数：  
```js  
// async函数  
async function fn1(){  
    return 100;  // 相当于return Promise.resolve(100)  
}  

const res1 = fn1();  // 执行async会返回一个Promise对象  
console.log(res1);  // Promise {<fulfilled>: 100},fuifilled类同resolved  
res1.then(data => {  
    console.log(data);  // 100  
})  
```  
async/await：  
```js  
// async/await  
// !是为了避免前面有参数将匿名函数的括号当作方法执行  
!(async function(){  
    const p1 = Promise.resolve(200);  
    const data = await p1;  // await相当于Promise.then()，data为p1返回值  
    console.log(data);  // 200  
})()  

// await跟一个数  
!(async function(){  
    const data = await 300;  // 相当于 await Promise.resolve(300)  
    console.log(data);  // 300  
})()  

// await跟一个函数  
!(async function(){  
    const data = await fn1();  // await后跟一个async函数  
    console.log(data);  // 100  
})()  

// 错误使用  
!(async function(){  
    const p1 = Promise.reject('err')  
    const data = await p1;  // 报错！  
    console.log(data);  
})()  
```  
try/catch：  
```js  
// 相当于Promise的catch  
!(async function(){  
    const p2 = Promise.reject('error');  
    try{  
        const data = await p2;  // p2返回错误，进入catch执行
        console.log(data)  
    } catch(err){  
        console.error(err);  // error  
    }  
})()  
```  
await行下面的内容，都可以看作callback中的内容，即异步。  
```js  
async function async1(){  
    console.log('async1 start')   // 2  
    await async2()   // 这里先执行async2，再执行await  
    // await下面的内容，全部作为异步回调执行  
    console.log('async1 end')   // 5，执行异步代码  
}  
async function async2(){  
    console.log('async2')   // 3  
}  

console.log('script start')  // 1  
async1()  
console.log('script end')   // 4，同步代码执行完成  
```  

## class, extends, super  
ES6引进类（class）的概念，更方便进行实例创建和继承。  
```js  
class Animal{  
    // 构造方法  
    constructor(number){  
        this.number = number;  
        this.type = 'animal';  
    }  
    print(size){  
        console.log(this.type + ' is ' + size);  
    }  
}  

// 创建实例对象，new中传入的参数会进入constructor方法  
let animal = new Animal(100);  
animal.print('big')  
console.log(animal.type)  

class Cat extends Animal{  
    constructor(number){  
        // super传入name，传给父类的constructor去执行  
        // 注意super中的参数来自constructor，constructor参数来自外部  
        super(number);  
        this.type = 'cat';  
    }  
    // 增加子类新方法  
    newPrint(){  
        console.log(`new print: ${this.number} ${this.type}`)  
    }  
}  

let cat = new Cat(5);  
cat.print('small');  
cat.newPrint();  
```  
以上代码中，使用`class`关键字定义了一个**Animal**类，其中有一个`constructor()` 方法即为构造方法。  
然后再定义一个**Cat**类，  
`extends`用来实现继承，  
`super()`用来执行父类构造方法，  
然后子类中可以自己重写父类方法或扩展方法。  

## for...of  
* for...in / forEach/ for 是常规的同步遍历  
* for...of 常用于异步的遍历  
```js  
function muti(num){  
    return new Promise((resolve, reject) => {  
        setTimeout(() => {  
            resolve(num * num);  
        }, 1000)  
    })  
}  

const nums = [1, 2, 3]  
nums.forEach(async(i) => {  
    const res = await muti(i);  
    console.log(res)  
})    
// 结果：等待1s后，同时打出1 4 9。  
// 原因：使用forEach进行同步遍历，一瞬间就遍历完成，然后集体等待1s打出结果  

// for...of  
for(let i of nums){  
    const res = await muti(i);  
    console.log(res);  
}  
// 结果：每隔1s打出一个结果  
// 原因：for...of特性，一个接一个执行  
```  
# ES6可选链


## CommonJS模块与ES6模块
### CommonJS模块
* 动态引入，执行时引入，即代码中可以使用`require(..)`引入
* 引用属于值的拷贝，所以模块中的值不会改变已经加载的值
* 使用require命令加载模块时，会加载整个模块，只会加载一次，用到值时使用加载的缓存值
* this指向当前模块

### ES6模块
* 静态引入，即在文件头部使用import，编译时引用，可以静态分析，实现Tree-Shaking
* ES6模块中的值属于“动态只读引用”，即不允许修改引入变量的值，原始值变化时，import加载的值也会发生变化
* 运行时加载，依然是动态引用，只要两个模块之前存在引用，代码就能执行
* this指向undefined

### AMD和CMD规范
* AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块
* CMD推崇就近依赖，只有在用到某个模块的时候再去require
* AMD用户体验好，因为没有延迟，依赖模块提前执行了，CMD性能好，因为只有用户需要的时候才执行
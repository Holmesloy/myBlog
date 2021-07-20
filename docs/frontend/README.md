# JavaScript  

## defer和async  
一般来说，当浏览器遇到`<script>`标签时，会暂停HTML文档解析，然后去下载并立即执行脚本，脚本执行完成再继续HTML文档解析。  
`defer`和`async`都是`<script>`标签属性，都用于外部脚本文件。  
`async`：异步加载脚本，即脚本下载和HTML解析是并行的，脚本一旦下载完成会立即执行，暂停文档解析，脚本执行顺序不能保证按序执行，不一定在DOMContentLoaded事件触发之前完成，但一定在load事件之前执行。  
`defer`：延迟执行脚本，下载和HTML解析并行完成，但是等到页面文档解析完成之后执行，即全程不阻塞文档解析，脚本执行顺序与位置一致，在DOMContentLoaded事件触发之前完成。  
**总结：**`defer`和`async`下载都是异步进行的，只是执行时间和顺序有区别，其实最佳实践是将脚本放到body最下面，保证其他元素能以最快速度进行加载和解析。  


## 数据类型  
JS共7种数据类型：基本数据类型和一种引用数据类型（Object）。  
6种基本数据类型：`Undefined`，`Null`，`Boolean`，`Number`，`String`，`Symbol`。  
其中，`Null`比较特殊，可以看作一个特殊的引用类型，它保存一个空对象指针null。  

`Undefined`：唯一值，即undefined，当**变量声明但未初始化**时，变量值即为undefined。  
`Null`：唯一值，即null，表示一个空对象指针。`typeof(null)`返回"object"。  
`Boolean`：true or false，以下值类型转换为false：`"", 0和NaN, null, undefined`。**注意：`"0"`会转化为true**。    
`Number`：最大值**Number.MAX_VALUE**，其中NaN与任何值都不相等，包括自己，使用`isNaN()`判断是否可以转换为数字类型。数值转换方法：`Number()`, `parseInt()`, `parseFloat()`。**注：任意值与布尔值比较，都会将两边的值先转化为Number。**   
`String`：可以用单引号和双引号，转换为字符串：`toString()` 或者 + "" 。  
`Symbol`：表示唯一值，使用Symbol()创建：`const s = Symbol('hi')`，参数可选，常用作对象的唯一属性名  

`Object类型`：`var o = new Object()`  
Object的每个实例（原型链中）都具有下列属性和方法：  
* constructor：构造函数，保存用于创建当前对象的函数。  
* hasOwnProperty(param)：用于检查给定的**属性**是否在当前对象实例中（不去原型中找），param为字符串形式。  
* toString()：返回对象的字符串表示。  
* valueOf()：返回对象的字符串、数值或布尔值表示，通常与toString()相同。  

### typeof和instanceof  
typeof用来判断基本数据类型的类型。如typeof(5)，结果为'number'（小写）。  
特殊情况：  
* typeof(null) ：'object'  
* typeof(函数) : 'function'  

instanceof用来判断引用类型或者自定义类型，会去原型链中查找，直到Object的原型，返回一个布尔值。    

### == 运算符  
除了 == null 之外，其他一律用 ===，如：  
```js  
const obj = { x: 100 }  
if(obj.a == null){ }  
// 相当于  
if(obj.a === null || obj.a === undefined){ }  
```  

### eval()函数  
* 相当于解析器，接收一个参数，即要执行的**js字符串**  
* eval()中创建的任何变量或函数都不会提升，只在eval()执行时创建  
```js  
eval("alert('i')");   // 等价于alert('i')  

// 创建变量和函数  
eval("var msg = 'hello'; ");  
alert(msg)  // hello，外部可以正常引用  

eval("function test(){ console.log('hi')} ")  
test();  // hi  
```  

### Object.defineProperty()  
* 用于修改属性默认的特性  
* 接收三个参数 - 对象、属性名、描述符对象  
```js  
const person = {}  
Object.defineProperty(person, "name", {  
    writable: false,  // 表示只读，不可再重新赋值  
    value: 'z'  
})  

alert(person.name)   // z  
```  
**访问器属性**  
* 访问器属性是对象中的一个隐藏属性，但不包含数据值  
* 拥有getter和setter函数，读取属性会调用getter，写入会调用setter  
* 不可直接定义，必须使用Object.defineProperty()来定义  
* 常见使用方式：设置对象中一个属性的值会导致其他属性发生变化  
```js  
var book = {  
    _year: 2008,  
    edition: 1  
}  

Object.defineProperty(book, "year", {  
    get: function(){  
        return this._year;   // _是一种记号，表示只能通过对象方法访问的属性  
    },  
    set: function(newVal){  // newVal就是year新值，因为这里就是针对year的defineProperty  
        if(newVal > 2008){  
            this._year = newVal;  
            this.edition = 2;  
        }  
    }  
})  

book.year = 2009;   // 设置新值  
alert(book.edition);   // 2，设置了year的值结果导致edition发生变化  
```  

## this指针和原型  
### this指针  
解析器在调用函数时，每次会传递进去一个隐含的参数，即this，this指向的是一个对象，这个对象称为函数执行时的上下文对象。根据函数调用方式的不同，this会指向不同的对象。  
注意：**this的值是在函数执行的时候确定的**，不是定义的时候确定的。   
1. 以函数形式调用时，this永远都是window。如：fun（），this为window  
2. 以方法形式调用时，this是调用方法的那个对象。如：obj.show（），this为obj。即谁调用函数，this就指向谁，window也是一个对象。  
3. 以构造函数形式调用时，this为新创建的对象。  
4. 使用call（）和apply（）时，this是第一个参数指向的那个对象  
5. 箭头函数中的this根据上下文得到，取上级作用域的值  
```js  
const person = {  
    name: "z",  
    age: 25,  
    test(){  
        setTimeout(function(){  
            // *注意：this === window  
            console.log(this)  
        }, 0)  
    }  
}  

const person = {  
    name: "z",  
    age: 25,  
    test(){  
        setTimeout(() => {  
            // *注意：箭头函数，this === person  
            console.log(this)  
        }), 0)  
    }  
}  
```  

### 原型  
**原型和原型链**  
实例、构造函数和原型对象三者关系：  
* 每个构造函数都有一个原型对象，通过prototype指针指向原型对象  
* 原型对象内部有一个指针（constructor）指向构造函数  
* 每个实例有一个指针（`__proto__`)指向原型对象，注意实例中没有指针指向构造函数  

**原型规则**  
获取实例属性或实例方法时，  
先从实例自身寻找，若没有，则去原型中查找（`__proto__`）  
然后原型对象中也存在一个隐式原型（`__proto__`），直到找到Object的原型，即`Object.protytype`。（注：Object.prototype的__proto__指向null）    

**相关方法：**    
1. `isPrototypeOf `：判断对象是否是某实例的原型对象   
`Person.protoype.isPrototypeOf(person) // true`  
2. `hasOwnProperty`：检测一个属性是否在实例中，不去原型中找  
`person.hasOwnProperty(name)  // true`  
3. `in`：检测一个属性是否在实例或者原型中  
`"name" in Person`  
4. `Object.keys()`：获得对象上所有可枚举的实例属性，返回数组,不去原型中找  
`var keys = Object.keys(person)`  
5. **Object.create()：创建一个新的空对象**  
   * const obj2 = new Object(obj1)，则obj1 === obj2  
   * Object.create(null)没有原型，也没有其他属性  
   * Object.create({...})可指定原型，即参数放在原型中  
   ```js  
   const obj1 = {  
       a: 10,  
       b: 20  
   }  

   const obj2 = new Object({  
       a: 10,  
       b: 20  
   })// 此时obj1 != obj2，若使用obj2=new Object(obj1)，则obj1===obj2  
   

   const obj3 = Object.create(null);  // obj3没有属性和原型  
   const obj4 = new Object();  // obj4有原型  

   const obj5 = Object.create({  
       a: 10,  
       b: 20  
   })  // 此时obj5为{}，但是obj5有原型，obj.a === 10  

   const obj6 = Object.create(obj1); // 此时同obj5，然后obj6.__proto__ === obj1  
   ```  
6. **Object.assign()：实现浅拷贝**  
  `Object.assign()`可以把任意多个源对象自身的可枚举属性拷贝给目标对象再返回，第一个参数即为目标对象  
   ```js  
   const obj1 = {name: 'z', age: 25};  
   const obj2 = {job: 'none'};  
   const obj3 = {interest: 'study'};  

   const obj = Object.assign({}, obj1, obj2);  
   // {name: "z", age: 25, job: "none"}  

   Object.assign(obj3, obj1);  
   // obj3: {name:"z", age:25, interest:'study'}  
   ```  

## 作用域  
### 自由变量  
* 一个变量在当前作用域没有定义，但被使用了  
* 则向上级作用域，一层一层寻找  
* 若没找到，则报错`xxx is not defined`  

### var let const  
* 建议使用优先级：const > let > var  
* 声明const常量，则变量不能被修改，防止意外修改错误，另外js编译器对const也作了优化，可以提高代码执行效率  
* let和var相比，先声明后使用更加规范，同时产生块级作用域  
* let一般用于基础数据类型，const一般用于引用数据类型，像函数对象和数组等  
* 注：const用于引用数据类型保存的是变量地址，所以引用类型中的值是可以改变的  

## 创建对象与设计模式  
### 工厂模式  
使用函数来封装创建对象过程的细节，传入相应参数即可创建对象  
```javascript  
function createObject(name, age, job){  
    var obj = new Object();  
    obj.name = name;  
    obj.age = age;  
    obj.job = job;  
    obj.print = function(){  
        console.log(this.name + this.age + this.job);  
    }  
    return obj;  
}  

var person = createObject("z", 25, "superman");  
```  
优点：创建多个相似对象时结构更加清晰  
缺点：无法知道一个对象的类型  

### 构造函数模式  
像Object属于原生构造函数，还可以自定义函数作为构造函数，其中自定义对象类型的属性和方法。  
```javascript  
function Person(name, age, job){  
    this.name = name;  
    this.age = age;  
    this.job = job;  
    this.print = function(){  
        console.log(this.name + this.age + this.job);  
    };  
}  

var person = new Person("z", 25, "superman");  
```  
**特征：**    
（1）构造函数函数名大写  
（2）直接将属性和方法赋值给了this对象  
（3）需要使用 new 操作符，同时不需要return语句  
**new操作符调用构造函数创建实例步骤：**  
（1）创造一个新的对象   
（2）将该对象链接到构造函数的原型（变成原型的实例对象）    
（3）this指针指向该对象，并执行构造函数，添加属性和方法  
（4）返回该对象  
使用构造函数可以将一个对象标识成一种特定的类型（优于工厂模式），而且对象的constuctor（构造函数）属性指向该构造函数，例如：  
```javascript  
person.constructor == Person;  // true  
person.constructor == Object;  // true  

person instanceOf Person;  // true  
person instanceOf Object;  // true  
```  

### 原型模式  

**使用对象字面量重写原型：**  
```javascript  
Person.prototype = {  
    constructor: Person,  // 设置constructor属性指向Person，这时该属性可以被枚举了  
    name: "zz",  
    age: "25",  
    print: function(){  
        return this.name + this.age;  
    }  
}  
```  
注：重写了原型之后constructor属性不再指向Person，指向Object，要想指向Person可以手动设置该属性。  
问题：共享的引用类型值可以被所有的实例对象同步修改  

### 组合构造函数和原型模式  
使用构造函数定义实例属性，共享的属性和函数放在原型中，解决引用类型值问题  
```javascript  
function Person(name, age){  
    this.name = name;  
    this.age = age;  
    this.friends = ["Bob", "Jack", "Lucy"]; // 引用类型放在构造函数中  
}  
Person.prototype = {  
    constructor: Person,  
    print: function() {  
        return this.age + this.name;  
    }  
}  
```  

## 继承  
子类继承父类的属性和方法，ES5中没有类的概念，因此主要通过原型链实现，这里简单称为子类和父类。  
默认的原型：`Object.prototype`  
### 原型链继承  
核心在于**让子类的原型对象成为父类的一个实例对象**，这时该原型对象的prototype指针就指向了父类的原型对象，也可以称为原型链链接  
```javascript  
function Parent(){  
    this.property = true;  
}  
function Child(age){  
    this.age = age;  
}  
// 继承Parent  
Child.prototype = new Parent();  
```  
问题：包含引用类型的原型属性会被所有实例共享  
    创建子类时不能向父类的构造函数传递参数  
### 构造函数继承  
子类构造函数中调用父类构造函数，请记住：**函数只是在特定环境中执行代码的对象，使用call()和apply()在新对象中执行构造函数**。  
```javascript  
function Parent(name){  
    this.colors = ["red", "pink"];  
    this.name = name  
}  
function Child(age){  
    // 继承父类，而且还能传递name参数  
    Parent.call(this, "z");  
    this.age = age;  
}  

var person = new Child(20);  
person.name == "z";  // true  
person.colors.push("yellow");  // ["red", "pink", "yellow"]  
```  
问题：方法都需要在构造函数中定义，所以无法复用  

### 组合继承  
原型链 + 构造函数，方法定义在原型对象中  
```javascript  
function Parent(name){  
    this.name = name;  
}  
Parent.prototype.print = function(){  
    return this.name;  
}  
function Child(name, age){  
    // 继承属性  
    Parent.call(this, name);  
    this.age = age;  
}  
// 继承方法  
Child.prototype = new Parent();  
Child.prototype.constructor = Child;   
```  
注：经过以上继承，**子类继承了父类的实例属性，继承了原型对象的方法**。  

### 原型式继承  
给定一个对象，将其作为原型，然后生成新的对象，使用Object.create()实现：  
```javascript  
var person = {  
    name : 'z',  
    colors: ["red", "green"]  
}  

// person作为obj原型  
var obj = Object.create(person);  

obj.__proto__ === person;   // true，此时obj为{}  
obj.colors.push("yellow");  // "red","green","yellow"，person中colors也会改变  
```  
如上所示，person为给定的一个对象，作为原型对象，然后使用`Object.create()`生成一个新的对象赋给obj，obj的__proto__指针即指向person  
### 寄生式继承  
在原型式继承的基础上，封装一个函数，在函数内部增强对象再返回  
```js  
// 封装继承函数  
function inherit(origin){  
    var clone = Object.create(origin);  // 原型式继承  
    clone.print = function(){  // 增强对象功能  
        console.log("print");  
    }  
    return clone;  // 返回对象  
}  

// 调用继承函数  
var person = {  
    name : 'z',  
    colors: ["red", "green"]  
}  
var obj = inherit(person);  
```  
问题：函数无法复用  

### 寄生组合式继承  
使用原型式继承来继承父类原型，封装函数，再将结果赋给子类原型  
```javascript  
function inheritProto(child, parent){  
    var protoype = Object.create(parent.prototype);  // 继承父类原型  
    // 然后将其作为子类原型  
    child.prototype = prototype;    /// 使用指针链接  
    prototype.constructor = child;  
}  
```  
高效、只调用一次构造函数，也可以使用引用类型。  

### ES6继承  
ES6引入了class，使用extends实现继承，super()执行父类构造方法。  
```js  
class Animal{  
    // 构造方法  
    constructor(number){  
        this.number = number  
        this.type = "animal"  
    }  
    print(size){  
        console.log(this.type + ' is ' + size)  
    }  
}  

class Cat extends Animal{  
    constructor(number, food){  
        // super传入number，传给父类的constructor去执行  
        // 注意super中的参数来自constructor，constructor参数是外部传进来的  
        super(number)  
        this.food = food  
        this.type = "cat"  
    }  
    // 增加子类新方法  
    newPrint(){  
        console.log(`new print: ${this.number} ${this.type}`)  
    }  
}  

const cat = new Cat(10, "fish")  
cat.print("small")  // 调用的是父类方法  
cat.newPrint()  // 子类新方法  
```  
以上代码中，使用class关键字定义了一个Animal类，其中有一个`constructor()` 方法即为构造方法。  
然后再定义一个**Cat**类，  
`extends`用来实现继承，  
`super()`用来执行父类构造方法，  
然后子类中可以自己重写父类方法或扩展新方法。  

## 数据API  
**纯函数**  
1. 不改变原数组  
2. 返回一个数组  
```js  
// concat  
const arr = [10, 20]  
const arr1 = arr.concat([2])  

// map  
const arr2 = arr.map(value => value * 10)  

// filter  
const arr3 = arr.filter(value => value > 10)  

// slice  
const arr4 = arr.slice()  // 相当于一次浅拷贝  
// arguments转换为数组  
const nums = Array.protytype.slice.call(arguments)  
```  

## 高级技巧  
### 安全的类型检测  
很多类型检测并不准确，会存在各种各样的问题。这里使用Object原生的toString()方法实现类型检测。  
任何值上调用Object原生toString()方法都会返回一个[Object NativeConstructorName]。使用这一特性可封装检测函数。  
```js  
// 检测数组  
function isArray(value){  
    return Object.prototype.toString.call(value) == "[Object Array]";  
}  

// 检测函数  
function isFunction(value){  
    return Object.prototype.toString.call(value) == "[Object Function]";  
}  
```  
### 函数柯里化  
柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。  
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
**柯里化函数创建**  
调用一个函数，传入要柯里化的函数和必要参数。  
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
以上实现中apply的参数为null，因为没有考虑到执行环境，调用如下：  
```js  
function add(num1, num2){  
    return num1 + num2;  
}  

var curryAdd = curry(add, 5); // 这里的5就是实现中得到的args  
curryAdd(3);  // 8，这里的3即是传入的新的参数newArgs  
```  
由以上代码可以看出，当curryAdd函数参数达到两个时，参数拼接后可以执行。因此，函数柯里化本质就是**创建一个闭包，保存参数，当参数数量达到函数执行要求时，执行函数**。  
**bind()函数：**  

```js  
Function.prototype.bind1 = function(context){  
    let _this = this;  
    let args = Array.prototype.slice.call(arguments, 1);  

    return function(){  
         return _this.apply(context, args)  
    }  
}  

function fn1(a, b){  
    console.log('this', this)  
    console.log(a, b)  
    return 'fn1'  
}  
const fn2 = fn1.bind1({x: 1}, 10, 20)  
fn2();  
```  

## DOM  
DOM的本质是一棵树，是浏览器根据HTML进行解析得到的一棵树。  
### 获取DOM结点  
```js  
const div1 = document.getElementById('div1');  // 元素  
const divList = document.getElementsByTagName('div');  // 集合  
console.log(divList.length);  
console.log(divList[0]);  

const containerList = document.getElementsByClassName('container');  // 集合  
const pList = document.querySelectorAll('p');  // 集合，根据css选择器格式选择  
```  
### property和attribute  
* property：修改对象属性，如宽度，颜色等，不会体现到HTML结构中  
* attribute：修改HTML属性，会改变HTML结构  
* 两者都可能引起DOM重新渲染，一般修改property  
```js  
const pList = document.querySelectorAll('p');  
const p1 = pList[0];  

// property  
p1.style.width = '200px'  
p1.className = 'color'  
console.log(p1.className)  
console.log(p1.nodeName)  

// attribute  
p1.setAttribute('new-attr', 'test');  // 添加了一个新的标签属性，和class、type等类型  
console.log(p1.getAttribute('new-attr'));  
p1.setAttribute('style', 'font-size: 50px');  // 将style属性值设置为字体50px  
```  

### DOM结构操作  
**创建新节点：**  
```js  
const div1 = document.getElementById('div1');  
const div2 = document.getElementById('div2');  

// 新建节点  
const p = document.createElement('p')  
p.innerHTML = 'new p'  
// 插入新节点  
div1.appendChild(p);  

// 移动节点，原节点移动位置  
const p1 = document.getElementById('p1')  
div2.appendChild(p1);  // 原div1中p1移动到div2中  
```  
**获取父元素和子元素列表：**  
```js  
// 获取父元素parentNode  
console.log(p.parentNode)  

// 获取子元素列表childNodes  
const divChild = div1.childNodes  
console.log(divChild)  // 注意，这里包含了全部子元素，比如文本也属于子元素，因此需要过滤  
// 先转换为数组再过滤  
const res = Array.prototype.slice.call(divChild).filter((child) => child.nodeType === 1)  
console.log(res)  
```  
**删除子元素：**  
```js  
div.removeChild(pList[0]);  
```  

### DOM性能  
* DOM操作非常耗时，避免频繁进行DOM操作  
* 对DOM查询做缓存  
* 将频繁操作（如插入节点）合并为一次性操作  

DOM查询做缓存：  
```js  
// 每次循环都要进行length计算  
for(let i = 0; i < document.getElementsByTagName('p').length; i++){  
    // 操作  
}  

// 缓存length  
const pList = document.getElementsByTagName('p');  
const length = pList.length;  // 缓存length，只进行一次DOM查询  
for(let i = 0; i < length; i++){  
    // 操作  
}  
```  
频繁操作改为一次性操作：  
```js  
const listNode = document.getElementById('list')  

// 创建一个文档片段  
const frag = document.createDocumentFragment();  

// 多个节点插入文档片段，此时未插入DOM树  
for(let i = 0; i < 10; i++){  
    const l1 = document.createElement('li')  
    li.innerHTML = `item ${i}`  
    frag.appendChild(li)  
}  

// 一次性插入到DOM  
listNode.appendChild(frag);  
```  
### window对象和document对象  
* window对象：表示浏览器中打开的窗口  
* document对象：代表给定浏览器窗口中的HTML文档  
* document对象可以通过window对象的document属性引用，其他还有location对象等  
* 所以，document中的事件可以冒泡到window  

### load事件与DOMContentLoaded事件  
* 当DOM加载完成，形成完整DOM树时触发DOMContentLoaded事件，不包括样式表、图片或者引入的外部脚本等。  
* 页面中的所有DOM、样式表、图片、脚本都加载完成后，load事件触发。  
* 一般在DOMContentLoaded事件完成后添加事件处理程序，用户可以更早与页面进行交互  
```js  
// 在DOMContentLoaded事件完成后添加事件处理程序，用户可以更早与页面进行交互  
document.addEventListener('DOMContentLoaded', function(e){  
    // 事件处理  
    alert("COMContentLoaded");  
});  

window.addEventListener('load', function(e){  
    alert("load");  
})  
```  

## BOM  
**1. navigator**  
```js  
const ua = navigator.userAgent  
const isChrome = ua.indexOf('Chrome')  
console.log(isChrome)  
```  
**2. screen**  
```js  
console.log(screen.width)  
console.log(screen.height)  
```  
**3. location**  
```js  
location.href     // 当前网址  
location.protocal   // 网络协议http等  
location.pathname   // 网址路径  
```  
**4. history**  
```js  
history.back()    // 前进  
history.forward()  // 后退  
```  

## 事件机制
### 事件触发
* window往事件触发处传播，称为事件捕获，直到遇到注册的事件层
* 执行注册的事件
* 从事件触发处向window传播，称为事件冒泡，遇到注册的冒泡事件会触发
### 事件绑定  
```js  
const btn = document.getElementById('btn1')  
btn.addEventListener('click', event => {  
    console.log(event.target);  // 获取触发的元素btn1  
    console.log('clicked')  
})  

// 简单的事件绑定函数  
function bindEvent(ele, type, fn){  
    ele.addEventListener(type, fn);  
}  

const a = document.getElementById('a')  
bindEvent(a, 'click', e => {  
    e.preventDefault();  // 阻止默认行为，如链接默认点击会跳转，加上就不会产生跳转  
    console.log('cliked')  
})  
```  

### 事件冒泡  
事件冒泡指事件在DOM中一层一层向外触发，外层DOM都可以监听到该事件，一直到body。  
* 基于DOM树形结构  
* 事件会顺着触发元素往上冒泡  
* 应用：事件代理  


`e.stopPropagation()`可以阻止冒泡。  
```js  
const p1 = document.getElementById('p1')  
p1.addEventListener('click', e => {  
    e.stopPropagation();  
    cosnole.log('success')  
})  

const body = document.body  
bindEvent(body, 'click', e => {  
    console.log('over')  
})  
```  
### 事件代理  
基于事件冒泡，将父元素绑定一个事件，点击多个子元素时，通过冒泡父元素获取到该事件，**通过事件对象获取相应元素**，再进行事件处理。  
优点：  
* 代码简洁  
* 减少浏览器内存占用  
```html  
<div id='div1'>  
    <a href="#">a1</a>  
    <a href="#">a2</a>  
    <a href="#">a3</a>  
    <a href="#">a4</a>  
    <a href="#">a5</a>  
    <button>点击加载更多</button>  
</div>  
<button>  
    点击增加一个a标签  
</button>  
```  
```js  
const div = document.getElementById('div1')  
bindEvent(div1, 'clicked', e => {  
    e.preventDefault();  // 防止a跳转（到#号）  
    const target = e.target;  // 获取DOM元素  
    // 通过DOM API进行处理，获取a标签  
    if(target.nodeName === 'A'){  
        alert(target.innerHTML)  // 输出a标签的内容  
    }  

})  
```  
```js  
// 通用的事件绑定函数（支持普通绑定和代理绑定）  
function bindEvent(ele, type, selector, fn){  
    // 如果传三个参数，说明selector不存在  
    if(fn == null){  
        fn = selector  
        selector = null  
    }  
    ele.addEventListener(type, e => {  
        const target = e.target;  // 获取触发的元素  
        if(selector){  
            // selector存在，说明是代理绑定  
            if(target.matches(selector)){  // 判断一个DOM元素是否符合CSS选择器  
                fn.call(target, e);  // call是为了改变this  
            }  
        }  
        else{  
            // 普通绑定  
            fn.call(target, e);  
        }  
    })  
}  

// 调用  
const div = document.getElementById('div1')  
// 这时候不能用箭头函数，因为this要被改变  
bindEvent(div1, 'clicked', 'a', function(e) {  // 直接写参数a  
    e.preventDefault();  
    alert(this.innerHTML);  // 变成this  

})  
```  
应用举例：如何监听图片列表中各个图片的点击？  
* 事件代理  
* 使用e.target获取触发元素  
* 使用matches来判断是否是图片，再处理  

## 垃圾回收机制  
首先，Javascript会周期性找出那些不再用到的变量，然后释放其内存。  
各大浏览器通常采用的垃圾回收机制有两种方法：标记清除、引用计数。  
### 标记清除  
* 声明变量，则变量标记为“进入环境”，变量离开环境时，如函数执行完成，标记为“离开环境”  
* 垃圾回收机制会给所有内存中的变量加上标记，然后去掉处在环境中或是闭包中的变量标记  
* 下一个周期运行时，即把带有标记的变量内存回收掉  
```js  
function test(){  
    var a = 10;    //被标记"进入环境"  
    var b = "hello";    //被标记"进入环境"  
}  
test();    //执行完毕后之后，a和b又被标记"离开环境"，被回收  
```  

### 引用计数  
* 语言引擎中有一张“引用表”，保存了内存中的资源引用次数  
* 若一个值的引用次数为0，表示不再用到，则将其内存释放  
* 如果一个值不需要了，但引用数不为0，则无法释放，从而导致内存泄漏，这时候要手动解除引用  
```js  
let arr = [1,2,3,4];  // 这里[1,2,3,4]会占用内存，arr引用它，次数为1  
console.log("hello world");  // 未使用arr，但数组被arr引用，无法释放  

arr = null;  // 手动解除引用  
```  

### 内存泄漏  
* 持续运行的服务进程，必须及时释放内存，否则内存占用持续升高，影响系统性能甚至崩溃  
* 不再用到的内存，若没有及时释放，就叫做内存泄漏  
* 大多数语言提供自动内存管理，但有些如c语言需要手动释放内存  

**识别内存泄漏**  
经验：若连续五次垃圾回收后，内存占用一次比一次大，则出现内存泄漏，这时候要实时查看内存占用。  
使用Chrome浏览器查看内存占用：  
* 开发者工具，选择performance面板  
* 顶部的Capture字段中勾选Memory  
* 点击左上角的录制按钮  
* 页面中进行各种操作，模拟用户的使用情况，还可以点击回收内存  
* 一段时间后，点击stop按钮，面板上就会显示这段时间内存占用情况  
* 若内存占用基本平稳，接近水平，说明不存在内存泄露，否则需要检查代码排查问题  

### WeakMap和WeakSet  
* 我们经常忽略一些引用的清除，如果有一种方法，让我们只需要清除主要引用，次要引用会自动忽略就好了  
* ES6推出WeakSet和WeakMap，它们对值的引用都是不计入垃圾回收机制的，weak就表示弱引用  
```js  
const wm = new WeakMap();  // 新建WeakMap实例  
const ele = document.getElementById('example')  

wm.set(ele, 'value')  // 这里的引用即为弱引用，不会被计入垃圾回收机制  
wm.get(ele)  // 'value'，一旦消除对ele的引用，则wm中的键值对也会被回收  
```  
因此，如果想向map中添加数据，又不想干扰垃圾回收机制，就可以使用WeakMap。  

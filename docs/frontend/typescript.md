# TypeScript

## 静态类型
* 编译起见甚至开发时即可暴露出问题，降低潜在bug风险
* v8引擎对于固定类型的变量会尝试优化代码执行效率
* 更精确的代码补全提示、更好的可达性检测

## 基础用法

### 直接写JS
* TS是JS的超集，因此JS语法完全可以使用TS编译
* 在JS中添加类型提示，即可推出剩余变量和返回值类型
```js
function test(text: string, num: number) {
  let time = 0;  // 得到time为number类型
}
```
### 接口
* 描述一个类或者对象中的成员变量和成员函数
* 具体类或对象按照接口的描述来传参
```js
interface Person {
  readonly id: number;
  name: string;
  age?: number;  // ?表示可选，不是必须
  work: () => void;
}

const my: Person = {
  id: 1,
  name: 'z',
  age: 26,
  work: () => {
    console.log('working');
  }
}
```
### 交叉类型
* 将多个类型合并为一个类型
* 使用type进行声明，implements进行继承
```js
interface Person {
  readonly id: number;
  name: string;
}
interface Drawable {
  drew: () => void;
}
type DrawablePersonType = Person & Drawable;

class DrawablePerson implements DrwablePersonType {
  id: number,
  name: string,
  draw() {
    console.log('I am drawing');
  }
}
```
### 联合类型
* 用竖杠(|)分割不同的类型，表示一种或的关系
* 只能访问联合类型中的共有成员
* 使用类型断言（as）后，可以访问该类型中的成员
```js
interface Bird {
  fly();
  layEggs();
}
interface Fish {
  swim();
  layEggs();
}

function getPet(): Fish | Bird {
  // ...
}
const pet = getPet();
pet.layEggs();  // right
pet.swim();  // error，只能访问共有成员

(pet as Fish).swim();  // right
```
### 类型守卫
* 确保某个变量在某个作用域中是一个特定的类型
* 可以代替类型断言，更加安全
* 分类：typeof、instanceof、去除null和undefined
```js
const x: string | number = 0;
if(typeof x === 'number') return x;
return parseInt(x);
```

## 高级类型
### 重载
* 让函数根据不同的参数类型决定返回值类型
* TS重载只发生在编译期间，因为编译出来的JS代码是无类型的
```js
// 适用于多类型的min函数
function min(arr: number[]): number | null;
function min(arr: string[]): string | null;
function min(arr: Date[]): Date | null;
function min(arr: any[]): any | null {
  if(!arr.length) return null;
  let result = arr[0];
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] < result)
      result = arr[i];
  }
  return result;
}

interface minFunc {
  (arr: number[]): number | null;
  (arr: string[]): string | null;
  (arr: Date[]): Date | null;
  (arr: any[]): any | null;
}
```
### 泛型（Generics）
泛型是允许同一个函数接受不同参数类型的一种模版。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。
* 定义函数、接口和类时，不预先指定具体类型，使用时再指定
* 使用时若未指定类型，TS会尝试推断
```js
function min<T>(arr: T[]): T | null {
  if(!arr.length) return null;
  let result = arr[0];
  for(let i = 1; i < arr.length; i++){
    if(arr[i] < result)
      result = arr[i];
  }
  return result;
}

const a = min([9, 3, 5]);  // a is number | null
```
**泛型变量**  
比如 T、E、K 和 V 等，他们没有什么特殊含义，只是一个约定好的规范，即使用大写字母 A-Z 定义的变量都属于泛型，即使把 T 换成 A 也一样。  
下面是一些常见泛型变量代表的意思：  
* T（Type）：表示一个 TS 类型
* K（Key）：表示对象中的键类型
* V（Value）：表示对象中的值类型
* E（Element）：表示元素类型

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```
### Typescript 装饰器
* 一个表达式，被执行后，返回一个函数
* 函数的入参分别为 target、name 和 descriptor
* 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象
**类装饰器**  
```ts
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
```
用来装饰类，接受的一个参数为 target，即被装饰的类  
例子：
```ts
function Greeter(target: Function):void {
  target.prototype.greet = function():void {
    console.log('hi');
  }
}

@Greeter
class Greeting {
  constructor() {
    // logic
  }
}

let myGreeting = new Greeting();
myGreeting.greet();
```
以上，定义了`Greeter`类装饰器，同时使用了`@Greeter`语法糖，使用装饰器装饰 class Greeting。
那如果要自定义输出的问候语呢？如下：
```ts
function Greeter(greeting: string) {
  return function(target: Function) {
    target.protoype.target = function():void {
      console.log(greeting);
    }
  }
}

@Greeter("Hello TS")
class Greeting {
  constructor() {
    // logic
  }
}

let myGreeting = new Greeting();
myGreeting.greet();
```
## 编译上下文
### tsconfig.json 
* 用于标识 Typescript 项目的根路径
* 用于配置 Typescript 编译器
* 用于指定编译的文件
**重要字段**
* file：设置要编译的文件的名称
* includes：设置需要进行编译的文件，支持路径模式匹配
* excludes：设备不需要编译的文件，支持路径模式匹配
* compilerOptions：与编译有关的模式选项

### compilerOptions 选项
compilerOptions 支持很多选项，常见的有 baseUrl、 target、baseUrl、 moduleResolution 和 lib 等。

### .d.ts 文件
有时，我们需要引入外部的 JS 库，这时 TS 就对引入的 JS 文件里变量的具体类型不明确，
为了告诉 TS 变量的类型，因此就有了.d.ts (d 即 declare)，ts 的声明文件

## 代码实践
1. 使用`const`声明所有的引用，不要使用`var`，避免改变引用引起错误
2. 使用对象字面量创建对象，不使用new
```js
// good
const item = {};

// bad
const item = new Object();
```

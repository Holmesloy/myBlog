```js code
var o = new Object();
Object.defineProperty(o, 'name', {
  value: 'z',
  writable: true,
  get:function() {
    return _this.t;
  }
})

person.prototype.isPrototypeOf(person);
person.hasOwnProperty(name);
const keys = Object.keys(person);
const obj2 = Object.create(obj1);
Object.assign(obj3, obj1);
obj3 = Object.assign({}, obj1, obj2);

factory:
function CreateObject(name) {
  const obj = new Object();
  obj.name = name;
  obj.print = function() {
    console.log('p');
  }
}
const ob = CreateObject('z');

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = new Person('z', 28);

function Child(age) {
  this.age = age
}
function Parent(name) {
  this.name = name;
}
Child.prototype = new Parent(5);

function Parent(age) {
  this.age = age;
  this.print = function() {
    console.log('mmj');
  }
}
function Child() {
  this.name = 'test';
  Parent.call(this, 6);
}
const child = new Child();
child.age == 6;

function Parent() {
  this.name = 'test'
}
Parent.prototype.print = function() {
  console.log('m');
}
function Child() {
  this.age = 1;
  Parent.call(this);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

Object.defineProperty(obj, "name", {
  writable: false,
  value: 'z'
})
var keys = Object.keys(obj);
obj2 = Object.create(obj1);
ob2.__proto__ = obj1;

function createObject(name, age) {
  var obj = new Object();
  obj.name = name
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
var p = new Person('z', 11)

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor: Person,
  print: function() {
    console.log('hi');
  }
}
var p = new Person('z', 12);

function Parent() {
  this.name = 'p';
}
function Child(age) {
  this.age = age;
}
Child.prototype = new Parent();

function inherit(origin) {
  var clone = Object.create(origin);
  clone.print = function;
  return clone;
}
var person = {};
var obj = inherit(person);

function inheritProto(child, parent) {
  var protoype = Object.create(parent.prototype);
  child.prototype = prototype;
  prtotype.constructor = child;
}

class Animal {
  constructor(age) {
    this.age = age;
    this.name = 'lion';
  }
  print(size) {
    console.log(size);
  }
}
class Cat extends Animal {
  constructor(number, food) {
    super(5);
    this.number = number;
  }
}

const pList = document.getElementsByTagName('p');
cont lengh = pList.length;

const listNode = document.getElementById('list');
const frag = document.createDocumentFragment();
for(let i = 0; i < 10; i++) {
  const l1 = document.createElement('li');
  li.innerHTML =  `item${i}`
  frag.appendChild(li);
}
listNode.appendChild(frag);

const btn = document.getElementById('butn1');
btn.addEventListener('click', event => {
  console.log('1');
})
function bindEvent(ele, type, fn) {
  ele.addEventListener(type, fn);
}

const p = Promise((resolve, reject) => {
  setTimeout(() => {
    const num = Math.random() * 10;
    if(num > 5) {
      resolve(num);
    }
    else
      reject('too big');
  })
})
let p = Promise.all([p1, p2, p3]);
p.then((data) => {
  console.log('1');
})
```
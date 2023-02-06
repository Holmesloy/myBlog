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

function deepClone(obj) {
  if(obj == null || typeof(obj) != 'object')
    return obj;
  let newObj = Array.isArray(obj) ? [] : {};
  for(let key in obj) {
    newObj[key] = typeof(obj[key]) == 'object' ? deepClone(obj) : obj[key];
  }
  return newObj;
}

function _new(Fn, ...args) {
  const obj = {};
  obj._ptoto_ = new Fn();

  let res = Fn.call(this, ...args);
  if(res != null && typeof(res) == 'object' || typeof(res) == 'function') {
    return res;
  }
  return obj;
}

function _ins(Fn, Obj) {
  let proto = Fn.prototype;
  let pro = Obj._proto_;

  while(pro != null) {
    if(pro == proto) return true;

    pro = pro._proto_;
  }
  return false;
}

Function.prototype.call = function(context, ...args) {
  let context = context || window;
  context.fn = this;

  let result = context.fn(...args);
  delete context.fn;
  return result;

}

Function.prototype.bind1 = function(context) {
  let _this = this;
  let args = Array.prototype.slice.call(arguments, 1);

  return function() {
    return _this.apply(context, args);
  }
}

function debounce(Fn, wait = 500) {
  let time = null

  return function() {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      Fn.call(this, ...arguments);
      timer = null;
    }, wait)
  }
}

function create(proto, properties = {}) {
  let newObj = {};
  newObj.__proto__ = proto;

  Object.defineProperties(newObj, properties);
  return newObj;
}

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function Promise(fn) {
  const self = this
  
  this.state = PENDING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  function resolve(value) {
    if(value instanceof Promise) {
      Promise.then(value);
    }
    setTimeout(() => {

    })
    if(this.state === PENDING) {
      self.state = RESOLVED
      this.value = value
      this.resolvedCallbacks.forEach((callback) => callback(value))
    }
  }
  function reject(value) {
    if(this.state === PENDING) {
      this.state = REJECTED
      this.value = value
      this.rejectedCallbacks.forEach((callback) => callback(value))
    }
  }
  try {
    fn(resolve, reject)
  } catch(e) {
    reject(e);
  }
}
Promise.prototype.then = (onResolved, onRejected) {
  onResolved = (typeof(onResolved) === 'function') ? onResolved : function(value) {return value}
  onRejected = (typeof(onRejected) === 'function') ? onRejected : function(value) { return value}
  if(this.state === RESOLVED) {
    onResolved(this.value);
  }
  if(this.state === REJECTED) {
    onRejected(this.value)
  }
}
Promise.all = function(iterator) {
  if(!Array.isArray(iterator)) return;
  let count = 0
  const res = []
  return new Promise((resolve, reject) => {
    for(let item of iterator) {
      Promise.resolve(item)
      .then(data => {
        res[count++] = data;
        if(count === iterator.length)
          Promise.resolve(res)
      }) 
      .catch(e => {
        reject(e)
      )}
    }
  )}

class EventEmitter {
  constructor {
    this.events = {}
  }
  on(eventName, callback) {
    if(!this.events[eventName]) {
      this.events[eventName] = callback;
    }
    else {
      this.events[eventName].push(callback);
    }
  }
  emit(eventName) {
    this.events[eventName].forEach(callback => callback())
  }
}

function curry(fn) {
  const args = Array.prototype.slice.call(arguments, 1);
  return new function() {
    const newArgs = Array.prototype.slice.call(arguments, 1);
    const finalArgs = args.concat(newArgs);
    return fn.apply(null, finalArgs);
  }
}

function flat(arr) {
  const isDeep = arr.some((item) => item instanceof Array)
  if(!isDeep)
    return arr;
  const res = Array.prototype.concat.apply([], arr)
  return flat(res);
}

Array.prototype.myFlat = function() {
  let _this = this
  let newArr = []
  let cyle = function(arr) {
    for(let item of arr) {
      if(Array.isArray(item)) {
        cycle(item)
      }
      else
        newArr.add(item)
    }
  }
  cycle(_this)
  return newArr
}

function flat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? : flat(cur) : cur)
  }, [])
}

function ajax(url, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(url, method, true)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) 
          resolve(xhr.responseText)
        else if(xhr.status === 404)
          reject(new Error('404'))
      }
      else 
        reject('error')
    }
    xhr.send(null)
  })
}
const url = 'http'
ajax(url, 'get')
  .then(res => console.log)
  .catch()

function sleep(wait) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, wait)
  })
}
await sleep()

let a
for(let i = 0; i < 10; i++) {
  a = document.createElement('a');
  a.innerHTML = i + '<br>'
  a.addEventListner('click', function(e) {
    e.preventDefault();
    alert(i);
  })
  document.body.appendChild(a);
}

function getPic(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error(`error ${url}`))
    }
  })
}
const url = ''
getPic(url).then(img => {
  console.log()
})

Array.prototype.myMap = function(fn, context) {
  let result = []
  for(let i = 0; i < this.length; i++) {
    result.push(fn.call(context, this[i], i, this))
  }
  return result
}
Array.prototype.myFilter = function(fn, context) {
  let result = []
  for(let i = 0; i < this.length; i++) {
    if(fn.call(context, this[i], i, this))
      result.push(this[i])
  }
  return restlt
}

Array.prototype.myReduce = function(fn, initialValue) {
  if(initialValue === undefined && this.length == 0)
    throw new Error('error')
  let result = initialValue ? initialValue : this[0]
  for(let i = 0; i < this.length; i++) {
    result = fn(result, this[i], i, this)
  }
  return result
}

function imgLoad() {
  let img = document.querySelectorAll("img")
  for(let i = 0; i < img.length; i++) {
    if(img[i].getBoundingClientRect().top < window.innerHeight) {
      img[i].src = img[i].dataset.src
    }
  }
}
window.onload = imgLoad
window.onscroll = throttle(imgLoad)

class Element {
  constructor(tagName, attrs, children) {
    this.tagName = tagName
    this.attrs = attrs || {}
    this.children = children || []
  }
  render() {

  }
}

#trigangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}

function shuffle(arr) {
  for(let i = 0; i < arr.length; i++) {
    let random = i + Math.floor(Math.random() * arr.length - i)
    [arr[i], arr[random]] = [arr[random], arr[i]]

  }
}

function _new(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  let result = fn.call(obj, ...args)
  if(result != null && typeof(result) == 'object')
    return result
  return obj;
}

Person.prototype = {
  construcotr: Person
  name: '1'
}

Parent.prototype.print = function() {}
Parent.call(this, name)
child.prototype = new Parent();
child.prototype.constructor = child

const prototype = Object.create(Parent.prototype)
child.prototype = prototype
ptototype.constructor = child

Array.prototype.myMap = function(fn, context) {
  let newArr = []
  for(let i = 0; i < arr.length; i++) {
    newArr.push(fn.call(context, this[i], i, this))


  }
  return newArr
}

functiton curry(fn) {
  let arg = Array.prototype.slice.call(arguments, 1)
  return new function() {
    let newArgs = Array.prototype.slice.call(arguments)
    let a = arg.contat(newArgs)
    return fn.apply(null ,a)
  }
}

const worker = new Worker("woker_job.js")
worker.postMessage("hello")
worker.onmessage = function(event) {

}
self.addEventListener('message', function(e) {

})

function _new(Fn, ...args) {
  const obj = {}
  obj.__proto__ = Fn.prototype
  let result = Fn.call(...args)

  if(result != null && (typeof(result) == 'object' || typeof(result) == 'function'))
    return result;
  return obj;
}

function ins(Fn, obj) {
  let proto = Fn.prototype
  let Proto = obj.__proto__
  while(Proto != null) {
    if(proto == Proto)
      return true

    Proto = proto.__proto__
  }
  return false;
}

Function.prototype.call = function(context, ...args) {
  const context = context || window
  context.fn = this

  let result = context.fn(...args)
  delete context.fn;
  return result;
}

Function.prototype.bind1 = function(context) {
  let _this = this
  let args = Array.prototype.slice.call(arguments, 1)
  
  return function(args) {
    return _this.apply(context, args.concat(args))

  }

}
function debounce(fn, wait) {
  let timer = null

  return function() {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...arguments)
      timer = null
    }, wait)
  }

}

Object.prototype.create = function(proto, properties = {}) {
  const newObj = {}
  newObj.__proto__ = obj
  Object.defineProperties(newObj, properties)
  return newObj
}

const copy = JSON.parse(JSON.stringify(obj))
function deepClone(obj) {
  if(obj == null || typeof(obj) != 'object')
    return obj
  let newObj = Array.isArray(obj) ? [] : {}
  for(let key in obj) {
    newObj[key] = typeof(obj[key] == 'object') ? deepClone(obj[key]) : obj[key]
  }
  return newObj
}

let random = i + Math.floor(Math.random() * arr.length - i)

let data = [{id: 0, parentId: null, name: 'test'}]
obj = {
  "id": 0,
  "parentId": null,
  "name": 'test'
  Children: [{}]
}

function transTree(data) {
  let result = []
  let obj = {}
  if(!Array.isArray(data)) {
    return []
  }
  data.forEach(item => {
    obj[item.id] = item
  })
  data.forEach(item => {
    let parent = obj[item.parentId]
    if(parent) {
      (parent.children || parent.children = []).push(item)
    }
    esle{
      result.push(item)
    }
    return result
  })
}

function transArr(obj) {
  let queue = [obj]
  let result = []
  while(queue.length != 0) {
    let item = queue.shift();
    result.push({
      id: item.id,
      parentId: item.parentId,
      name: item.name
    })
    let children = item.children
    if(children) {
      for(let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
  }
  return result
}

function Stringify(obj) {
  if(typeof(obj) != 'object')
    return obj.toString()
  let json = []
  let arr = Array.isArray(obj)
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      let item = obj[key]
      if(typeof(item === 'object'))
        item = Stringify(item)
      json.push((arr ? "" : '"' + key + '":') + String(item))
    }
  }
  return (arr ? "[" : "{" + String(json) + (arr ? "]": "}"))
}

function parseUrl(url) {
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

setup() {
  console.log('1')
  onBeforeMount(() => {console.log('2')})
  onMount(() => {console.log})
  onBeforeUpdate(() => {})
  onUpdated(() => {})
  onBeforUnmount(()=> {})
  onUnmouted(() => {})
}

function _new(Func, ...args) {
  const obj = {}
  obj.__proto__ = Func.prototype

  const result = Func.call(obj, ...args)
  if(result != null && typeof(result) =='object' || typeof(result) === 'function')
    return result
  return obj
}

function _instanceof(Obj, obj) {
  let p = Obj.prototype
  let proto = obj.__proto__

  while(p != null) {
    if(p == proto)
      return true
    p = p.__ptoto__
  }
  return false
}

Function.prototype.call = function(context, ...args) {
  const context = context || window
  context.fn = this
  
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.bind1 = function(context) {
  let args = Array.prototype.slice.call(arguments, 1)
  return function(...params) {
    return _this.apply(context, args.concat(params))
  }
}

class Animal{

}
class Cat extends Animal {
  constuctor() {
    super()
  }

}

function debounce(fn, wait) {
  let timer = null
  return function () {
    if(timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this)
      timer = null
    }, wait)
  }
}
function create(Obj, properties = {}) {
  const obj = {}
  obj.__proto__ = Obj
  Object.defineProperties(obj, properties)
  return obj
}

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function Promise(fn) {
  const self = this
  this.state = PENDING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  function resolve(value) {
    if(value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if(state === PEDING) {
        self.state = RESOLVED
        self.value = value
        self.resolveCallbacks.forEach(callback => callback(value))

      }
    }, 0)
  }
  function reject(value) {
    setTimeout(() => {
      if(state === PENDING) {
        self.state = REJECTED
        self.value = value
        self.rejectedCallbacks.forEach()
      }
    })
  }
  try{
    fn(resolve, reject)
  } catch(e) {
    reject(e)
  }
}
Promise.prototype.then = function(onResolved, onRejected) {
  onResolved = typeof onResolve === 'function' ? onResolved : function(value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected: function(error) { throw error }
  if(this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved)
    this.rejectedCallbacks.push(onRejected)
  }
  if(this.state === RESOLVED) {
    onResolved(this.value)
  }
  if(this.state === REJECTED) {
    onRejected(this.value)
  }
}
Promise.all = function(iterator) {
  if(!Array.isArray(iterator)) {
    return;
  }
  const res = []
  const count = 0;
  return new Promise((resolve, reject) => {
    for(const item of itereator) {
      Promise.resolve(item)
      .then(data => {
        res[count++] = data
        if(count === iterator.length)
          resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    }
  })
}
Promise.race = function(iterator) {
  return new Promise((resolve, reject) => {
    for(let item of iterator) {
      Promise.resolve(item)
      .then(data => {
        resolve(data)
      }) 
    }
  })
}
class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(eventName, callback) {
    if(!this.events[eventName])
      this.events[eventName] = [callback]
    else
      this.events[eventName].push(callback)
  }
  emit(eventName) {
    this.events[eventName].forEach(callback => callback())
  }
}

function curry(fn) {
  const args = Array.prototype.slice.call(arguments, 1)

  return function() {
    const newArgs = Array.prototype.slice.call(arguments)
    return fn.apply(null, args.concat(newArgs))
  }
}
function flat(arr) {
  const isDeep = arr.some(item => item instanceof Array)
  if(!isDeep) {
    return arr
  }
  const res = Array.prototype.concat.apply([], arr)
  return flat(res)
}
function myFlat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur)
  }, [])
}
Array.prototype.myFlat() {
  let _this = this
  const newArr = []

  const cycle = function(arr) {
    for(let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if(Array.isArray(item)) {
        cycle(item)
        continue
      }
      else
        newArr.add(item)
    }
  }
  cycle(_this)
  return newArr
}

function ajax(url, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XmlHttpRequest()
    xhr.open(url, method, true)
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200)
          resolve(xhr.responseText)
        else if(xhr.status == 404)
          reject(new Error('404'))
          
      }
    }
    xhr.send(null)
  })
}

function sleep(wait) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, wait)
  })
}

Array.prototype.myMap = function() {
  const newArr = [];
  for(let i = 0; i < this.length; i++) {
    result.push(fn.call(context, this[i], i, this))
  }
}

Array.prototype.myReduce = function(fn, initialValue) {
  if(this.length === 0 || initialValue === undifined)
    throw new Error('error')
  const res = initValue ? initValue : this[0]
  for(let i = initValue ? 0 : 1; i < this.length; i++) {
    res = fn(res, this[i], i, this)
  }
}
function handleResponse(data) {
  console.log(data);
}
var script = document.createElement('script')
script.src = 'http://b.com?callback=handleResponse'
document.body.appendChild(script)

function imgLoad() {
  let img = document.querySelectorAll("img")
  for(let i = 0; i < img.length; i++) {
    if(img[i].getBoundingClient().top < window.innerHeight)
      img[i].src = img[i].dataset.src
  }
}
window.onload = imgLoad
window.onscroll = throttle(imgLoad)

class Element {
  constructor(tagName, attrs, children) {
    this.tagName = tagName
    this.attrs = attrs || {}
    this.children = children || []
  }
  render() {
    
  }
}

function shuffle(arr) {
  for(let i = 0; i < arr.length; i++) {
    let random = i + Math.floor(Math.random() * arr.length - i)
    [arr[i], arr[random]] = [arr[random], arr[i]]
  }
}

#triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red;
}

function transTree(data) {
  let result = []
  let obj = {}
  if(!Array.isArray(data))
    return []
  data.forEach(item => {
    obj[item.id] = item
  })
  data.forEach(item => {
    let parent = obj[item.parentId]
    if(parent) {
      (parent.children || (parent.children = [])).push(item)
    }
    else {
      result.push(item)
    }
    return result
  })
}

function updateView {
  console.log('update views')
}
const oldProto = Array.ptototype
const arrProto = Object.create(oldProto)
['push', 'pop', 'shift'].forEach(method => {
  arrProto[method] = function() {
    oldProto.method.apply(this, arguments);
    updateView
  }
})
function defineReactive(target, key, value) {
  Observer(target, key)
  Object.defineProperty(target, key, {
    get:function() {
      return value
    }
    set:function(newVal) {
      Observer(target, key)
      value = newVal
      updataView()
    }
    
  })
}
function Observer(target, key) {
  if(typeof(target) !== 'object' || target == null)
    return target
  if(Array.isArray(target)) {
    target.__proto__ = arrProto
  }
  for(let key in target) {
    defineReactive(target, key, target[key])
  }
}
{
  tag: 'div',
  props: {
    id: 'div1',
    className: 'container'
  }
  children: [

  ]
}

const data = {
  name: 'z',
  age: 25
}
const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    const ownKeys = Reflect.OwnKeys(target)
    if(ovwnKeys.includes(key)) {
      console.log('get', key)
    }
    const result = Reflect.get(target, key, receiver)
    return result
  }
  set(target, key, val, receiver) {
    if(val === target[key])
      return true;
    const result = Reflect.set(target, key, val, receiver)
    return result
  }

})
function reactive(target = {}) {
  if(typeof target !== 'object' || target == null)
    return target
  const proxyConf = {
    get(target)
  }
}
const proxyConf {
  get(target, key, receiver) {
    const ownKeys = Reflect.ownKeys(target)
    if(ownKeys.includes(key)) {
      console.log('get', key)
    }
    const result = Reflect.get(target, key, receiver)
    return reactive(result)
  }
  set(target, key, val, receiver) {
    if(val === target[key])
      return true
    const ownKeys = Reflect.ownKeys(target)
    if(ownKeys.includes(key))
      console.log()
    else
      console.log('new key')
    
  }
  const result = Reflect.set(target, key, val, receiver)
  return result 
  deleteProperty(target, key) {
    return result
  }
  const observed = new Proxy(target, proxyconf)
  return observed
}
function shuffle(arr) {
  for(let i = 0; i < arr.length; i++) {
    let random = i + Math.floor(Math.random() * arr.length - i);
  }
  []
}
function transTree(data) {
  const res = []
  const obj = {}
  if(!Array.isArray(data))
    return {}
  data.forEach(item => {
    obj[item.id] = item
  })
  data.forEach(item => {
    const parent = item[parentId]
    if(parent) {
      parent.children || parent.chidren = [].push(item)
    }
    else
    result.push(item)
  })
  
}

function Stringify(obj) {
  if(typeof(obj) != 'object')
    return obj.toString()
  let json = []
  let arr = Array.isArray(obj)
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      let item = obj[key]
      if(typeof(item) === 'object')
        item = Stringify(item)
      json.push((arr ? "":'"' + key + '":') + String(item))
    }
  }
}

const oldProto = Array.prototype
const arrProto = Object.create(oldProto)
['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrProto[method] = function() {
    Array.prototype.method.apply(this, arguments)
    updateView
  }
})
function observer(target) {
  if(typeof(target) != 'object')
    return target
  if(Array.isArray(target)) 
    target.__ptoto__ = arrProto
  for(let key in target) {
    defineReactive(target, key, target[key])
  }

}
function defineReactive(target, key, value) {
  observer(target, key, value)
  Object.defineProperty(target, key, {
    get:function() {
      return value
    }
    set:function(newVal) {
      if(val != newVal)
        Observer(target, key)
        value = newVal
        updateView

    }
  })
}
const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    const ownKyes = Reflect.keys(target)
    if(ownKeys = Reflect.OwnKeys(target)) {
      console.log(key)
    }
    const result = Reflect.get(target, key, reciever)
    return result
  }
})
```


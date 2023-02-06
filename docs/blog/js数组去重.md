---
title: JS数组去重
date: 2020-12-12
categories:
 - frontEnd
tags:
 - js
 - code
---
## 1. ES6 Set 去重（ES6 中最常用）
使用 Set 结构存储数组中元素，重复元素不能添加，再将 Set 转换为数组输出
```javascript
function unique(arr){
    // Array.from将一个类数组对象或可遍历对象转换为数组
    return Array.from(new Set(arr));
}

var arr = [1, 1,'true', 'true', true, true, undefined,undefined, null,null, NaN, NaN, 'NaN',{},{}];
unique(arr);
// [1, 'true', true, undefined, null, NaN, 'NaN',{},{}];
```
注：写法简单，这种方法还不能去掉`{}`空对象

## 2. 双层 for 循环，比较，然后 splice 去重（ES5 中最常用）
```javascript
function unique(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[j] === arr[i]){  // 根据需要选择==和===
                arr.splice(j, 1);
                j--;  // 注意，这时候数组后面元素向前移动了，删除的j已经是之前j+1的元素了，所以j--
            }
        }
    }
    return arr;
}

var arr = [1, 1,'true', 'true', true, true, undefined,undefined, null,null, NaN, NaN, 'NaN',{},{}];
unique(arr);
// [1, "true", undefined, NaN, NaN, "NaN", {…}, {…}]
```
注：NaN和`{}`没有去重，两个null直接消失了

## 3. indexOf 去重
新建一个空数组，使用 for 或者 forEach 循环原数组，根据 indexOf 返回值判断是否重复，不重复则添加到新数组中
```javascript
function unique(arr){
    var uniArr = [];
    arr.forEach(function(item, index, arr){
        if(uniArr.indexOf(item) == -1){
            uniArr.push(item);
        }
    });
    return uniArr;
}

var arr = [1, 1,'true', 'true', true, true, undefined,undefined, null,null, NaN, NaN, 'NaN',{},{}];
unique(arr);
// [1, "true", true, undefined, null, NaN, NaN, "NaN", {…}, {…}]
```
## 4. 利用 sort()
新建一个空数组，对原数组进行排序，循环原数组，向新数组中添加不重复的元素
```javascript
function unique(arr){
    var uniArr = [];
    uniArr.push(arr[0]);
    arr.sort((a, b) => a-b);
    for(let i = 1; i < arr.length; i++){
        if(arr[i] !== arr[i-1]){   // 注意根据情况使用==
            uniArr.push(arr[i]);
        }
    }
    return uniArr;
}

var arr = [1, 1,'true', 'true', true, true, '1', 0];
unique(arr);
// [1, "true", "1", 0, true]
```

## 5. 使用 includes()
新建一个空数组，循环原数组，使用includes方法判断新数组中是否存在该元素，不存在则push进新数组
```javascript
function unique(arr){
    var uniArr = [];
    for(let i = 0; i < arr.length; i++){
        if(!uniArr.includes(arr[i])){
            uniArr.push(arr[i]);
        }
    }
    return uniArr;
}
var arr = [1, 1,'true', 'true', true, true, '1', 0];
unique(arr);
// [1, "true", true, "1", 0]
```

## 6. 使用 filter() 方法
在 filter() 方法中，利用 indexOf 判断当前元素在数组中出现的第一个位置是否等于当前索引，如果是则表示第一次出现，则返回，不是则说明重复
```javascript
function unique(arr){
    // 注意箭头函数只有es6支持
    return arr.filter(function(item, index, arr)  {
        // 返回符合条件的元素，最终是一个数组
        return arr.indexOf(item) === index;
    });
}

var arr = [1, 1,'true', 'true', true, true, '1', 0];
unique(arr);
// [1, "true", true, "1", 0]
```

## 7. ES6 展开运算符 ... + Set
```javascript
[...new Set(arr)]

var arr = [1, 1,'true', 'true', true, true, '1', 0];
[...new Set(arr)];
// [1, "true", true, "1", 0]
```
简化了代码，本质上和第一种方法相同
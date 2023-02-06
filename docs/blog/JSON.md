---
title: JSON
date: 2020-12-25
categories:
 - frontEnd
tags:
 - data
---
## 什么是 JSON？  
* json 是一种数据格式，本质是一段字符串  
* json 格式和 js 对象结构一致，对 js 语言更加友好  
* window.JSON 是一个全局对象：JSON.stringify, JSON.parse  
* key 和字符串都需要用双引号包裹  

通用概念：JSON 是一种轻量级的数据格式，利用了 Javascript 中的一些模式来表示结构化数据，可以简化表示复杂数据结构的工作量，很多编程语言都有针对 JSON 的解析器和序列化器。

## 语法
JSON 的语法可以表示以下三种类型的值：  
* 简单值：数值、字符串、布尔值和 null，不支持 undefined
* 对象：无序的键值对
* 数组
### 简单值
数值：5  
字符串："hello JSON"，JSON 字符串只能用双引号，单引号出错  
布尔值：true false  
null：null
### 对象
JSON 要求对象中的属性要加上双引号( "" )  
```json
{
    "name": "z",
    "age": 25,
    "school": {
        "name": "ustc",
        "location": "China"
    }
}
```
与 js 的不同：JSON 不用声明变量，因为没有变量的概念，同时末尾不是分号，对象的属性要加双引号。
### 数组
JSON 数组采用的就算 js 中的数组字面量形式，如：`[25, "hi", true]`  
开发中常把 JSON 数组和对象结合，构成更复杂的数据集合，如：
```json
[
    {
        "title": "Javascript",
        "authors":[
            "Nicholas",
            "oo"
        ],
        "edition": 3,
        "year": 2011
    },
    {
        "title": "Javascript",
        "authors":[
            "Nicholas",
            "oo"
        ],
        "edition": 2,
        "year": 2009
    },
    {
        "title": "Javascript",
        "authors":[
            "Nicholas",
            "oo"
        ],
        "edition": 1,
        "year": 2007
    }
]
```
这个数组中包含一些表示图书的对象，每个对象都有几个属性，对象和数组一般是 JSON 数据结构的最外层形式。

## 解析与序列化
JSON 对象是 ES5 添加的一个全局对象，有两个方法：**stringify()** 和 **parse()**，用于 JSON 的解析和序列化。  
### 序列化：JSON.stringify()
序列化用于将 js 对象序列化为 JSON 字符串
```js
var book = {
    title: "Javascript",
    authors: [
        "Nicholas",
        "oo"
    ],
    edition: 3
}

// 序列化
var jsonText = JSON.stringify(book);
// jsonText结果：不包括缩进
{"title":"Javascript","authors":["Nicholas","oo"],"edition":3}
```
默认情况下，JSON.stringify() 输出的 JSON 字符串不包含任何空格字符串或者缩进。  
**序列化选项**  
JSON.stringify() 还可以接收第二和第三个参数，第二个参数用于过滤结果，第三个参数用于控制缩进。  
第二个参数为数组时，只返回数组中存在的属性；第二个参数为函数时，函数接收参数为 key，value，可以根据 key 的值处理 value 再返回。  
第三个参数为数值时，序列化时每一级的缩进值即为该数值，并且会添加换行。
```js
var book = {
    title: "Javascript",
    authors: [
        "Nicholas",
        "oo"
    ],
    edition: 3
}

var jsonText = JSON.stringify(book, ["titile","edition"], 4);
// 结果过滤了authors，并存在缩进和换行
{
    "title": "Javascript",
    "edition": 3
}
```
### 解析：JSON.parse()
解析用于将 JSON 字符串解析成为一个 js 对象
```js
var bookCopy = JSON.parse(jsonText);
```
JSON.parse() 也可以接收第二个参数，该参数为一个函数，将在每个键值对儿上调用，接收两个参数为 key 和 value，与序列化相反，该函数被称为还原函数。
```js
var bookCopy = JSON.parse(jsonText, function(key, value){
    if(key == "authors"){
        // 如果key为authors，则删除数组中最后的值并返回
        return value.pop();
    }
})
```
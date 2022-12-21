# 笔记  

## 在线OJ输入输出  
**Java**  
获取输入语句：`Scanner sc = new Scanner(System.in);`  
首先判断是否还有输入：`sc.hasNext()` 、`sc.hasNextInt()`等  
输入赋值：  
`nextInt()`：获取整数  
`next()`：获取字符串（以空格或换行作为分隔符）   
`nextLine()`：获取字符串（以换行为间隔）  
`nextDouble()`：获取双精度数  
注：使用`hasNextxx()`需要与`Nextxx()`相对应。另外，如果使用了`nextInt()`，需要加上`sc.nextLine()`才能获取下一行，否则报错。  
例1：连接用户输入的相邻两个字符串并输出  
```java  
import java.util.Scanner;  

public class Main{  
    public static void main(String[] args){  
        Scanner sc = new Scanner(System.in);  
        while(sc.hasNext()){    // 判断是否还有输入的值  
            String a = sc.next();  // 读取一个字符串  
            String b = sc.next();  

            System.out.println(a + b);  
        }  
    }  
}  
```  
运行结果：  
```java  
输入：hello world ni hao  
// a首先为hello，b首先为world；然后a为ni，b为hao，得到以下两个结果  
helloworld  
nihao  
```  
例2：多行输入获取：整数+字符数组+整数数组  
```java  
/* 输入为：
5
a db e m t
1 0 13 21 2
*/
import java.util.Scanner;  

public class Main{  
    public static void main(String[] args){  
        Scanner sc = new Scanner(System.in); 
        int n = sc.nextInt();  // n = 5  
        sc.nextLine();  // 注意这里要加nextLine()，以获取下一行
        String[] s = new String[n];
        int[] nums = new int[n];
        for(int i = 0; i < n; i++){
            s[i] = sc.next();   // 逐个获取字符串
        }
        
        sc.nextLine();    // 继续下一行
        for(int i = 0; i < n; i++){
            nums[i] = sc.nextInt();  // 逐个获取整数
        }
    }  
} 
```  
**Javascript**  
牛客网使用`readline()`函数进行输入，将数据处理后再赋值  
```javascript  
while(line = readline()){   // 判断是否还有下一个输入  
    var lines = line.split('')  // 将字符串分割为单个字符组成的数组  
    var a = parseInt(lines[0])  // a为数组第一个值  
    var b = parseInt(lines[1])  
    print(a + b)  
}  
```  

## Java字符串、数组和集合类  
### 字符串String  
初始化两种方式：  
```java  
1. 双引号方式  
// 创建引用，a指向存储字符串的地址，若指向字符串不变，则永远只会产生一个地址空间  
String a = "hello";  

2. 构造函数方式  
// 堆上创建字符串对象，a指向该对象，使用构造函数初始化会指向不同的对象  
String a = new String("hello");  
```  
字符串常用方法：  
```java  
String str = new String("asdfg");  

1. length()：字符串长度  
int len = str.length();  

2. charAt()：返回指定位置字符，索引从0开始  
char ch = str.charAt(2); // ch = d  

3. substring()：提取字串,左闭右开  
String s = str.substring(2, 4) // s = "df"  

4. indexOf()：字符查找,返回首次出现位置，可用于字符和子串,没有返回-1  
int a = str.indexOf('d');  // a = 2  
int b = str.indexOf("sd"); // b = 1  

5. replace()：字符串替换，可用于字符和子串  
String s1 = str.replace('d', 'm'); // s1 = asmfg  
String s2 = str.replace("sd", "mg"); // s2 = amgfg  

6. split()：根据匹配的正则表达式拆分字符串为字符数组（要用双引号）  
String t = "1,2,3,4";  
String[] s = t.split(","); // s = [1, 2, 3, 4]  

7. trim()：去除字符串两端空格，中间不处理  
String test = " a sd ";  
String t = test.trim(); // t = "a sd"  

8. contains()：判断字符串中是否包含某个字串  
str.contains("sd");  // true  

9. equals()：String中重写了该方法，用于比较字符值（常用），而==用于比较地址  
String a = new String("java");  
String b = new String("java");  
a == b; // false  
a.equals(b); // true  
```  
常用类型转换：  
```java  
1. 字符串转换为字符数组：toCharArray()  
String str = "java11";  
char[] charStr = str.toCharArray();  // 注意，是字符数组，charStr[4] == '1'  

2. 字符串转化为数字类型：Integer.parseInt()  
String s = "3.18";  
int a = Integer.parseInt(s);   // a = 3  
float b = Float.parseFloat(s); // b = 3.18  

3. 数字类型转换成字符串：String.valueOf()  
String s1 = String.valueOf(12); // s1 = "12"  
String s2 = String.valueOf(3.19); // s2 = "3.19"  
```  

### StringBuilder可变类  
String类不可变，任何对String的改变都会产生新的对象，StringBuilder可变  
StringBuilder使用：  
```java  
1. 初始化空对象  
StringBuilder s = new StringBuilder();  
2. 初始化并指定内存空间  
StringBuilder sb1 = new StringBuilder(256); // 分配256字节的字符缓冲区  
3. 初始化并指定初始内容  
StringBuilder sb2 = new StringBuilder("hello"); // 字符缓冲区中存入hello  

**常用方法：  
StringBuilder s = new StringBuilder("hello");  
s.length()：长度  

1. append()：添加字符或字符串  
s.append(" world");  // s = "hello world"  

2. deleteCharAt(int index)：删除指定位置字符  

3. delete(int left, int right)：删除区间内容，左闭右开  

4. insert(int index, c)：在指定位置插入内容  
s.insert(0, true);  // s = "truehello"  

5. reverse()：内容反转  
String reverse = new StringBuilder("hello").reverse().toString(); // reverse = "olleh"  

6. setCharAt(int index, char ch)：指定位置字符修改  
s.setCharAt(2, 'n');  // s = "henlo"  

7. toString()：转变为String类型  
return s.toString(); // 返回String类型  
```  

### Java数组  
Java数组必须初始化后才能使用，初始化后默认值为：  
**整型数组：0**   
**布尔型：false**  
**引用类型（String、对象等）：null**  

初始化三种方式：  
```java  
1. 静态初始化  
int[] intArr = new int[]{1, 2, 3, 4, 5}; // 自己定义初始值，系统根据初始值决定长度  

2. 简化版  
String[] strArr = {"hi", "ni", "yes"};  

3. 动态初始化  
String[] arr = new String[8];  // 自己决定长度  

注：数组长度不可改变，且不能同时使用静态初始化和动态初始化  
```  

数组常用方法：  
```java  
1. 打印一个数组  
int[] intArr = {1, 2, 3, 4};  
注：直接使用print只会输出数组首个元素地址  

三种方式：  
(1) 传统for循环  
// 注：length为数组的属性，不是方法，length()方法用于字符串  
for(int i = 0; i < intArr.length; i++){  
    System.out.println(intArr[i]);  
}  
(2) foreach方法  
for(int a : intArr){  
    System.out.println(a);  
}  
(3) 利用Array.toString()方法转换为字符串输出，包括括号和逗号  
String a = Arrays.toString(intArr);  
System.out.println(a); // [1, 2, 3, 4]，整体就是个字符串  
```  
 
### ArrayList集合类  
```java  
import java.util.ArrayList;  
ArrayList<Integer> arrayList = new ArrayList<>();  // 集合类型声明  

**常用方法：  
arrayList.size(); // 集合类的长度使用size()方法  
arrayList.add(1);  // 添加元素  
arrayList.remove(int index); // 按照索引删除元素并返回该值  
arrayList.remove(Object o);  // 使用equals方法比较删除第一个相等的元素，返回true或者false  
arrayList.remove(Integer.valueOf(2)); // 删除值为2的元素  
arrayList.contains(c); // 判断集合内是否包含某个值  

打印：  
System.out.println(arrayList);   // 可以直接输出  

三种遍历方式：  
(1) 迭代器遍历  
Iterator<Integer> it = arrayList.iterator();  
while(it.hasNext()){  
    System.out.println(it.next() + " ");  
}  
(2) for循环索引值遍历  
arrayList.get(i)  
(3) foreach遍历  
for(Integer num : arrayList){  
    System.out.println(num + " ");  
}  

**类型转换：  
1. 集合类转换成数组：toArray()  
(1) Integer[] inter = arrayList.toArray(new Integer[0]);  
(2) Integer[] inter1 = new Integer[arrayList.size()];  // 注意括号  
    arrayList.toArray(inter1);  

List<Integer>转换为int[]:  
int[] intArray = arrayList.stream().mapToInt(Integer::valueOf).toArray();  

2. 数组转换成List集合：Arrays.asList()  
// 根据数组创建ArrayList  
String[] strArray = {"hello", "www"};  
ArrayList<String> arrList = new ArrayList<>(Arrays.asList(strArray));  
System.out.println(arrList); // [hello, www]，输出字符串  
```  
### LinkedList集合类  
```java  
import java.util.LinkedList;  

LinkedList<Integer> list = new LinekedList<>();  // 双向链表  

Queue<Integer> queue = new LinkedList<>();  // 队列  

Deque<Integer> deque = new LinkedList<>();  // 双端队列  

**增加：  
add(e);  // 尾部添加值，通用方法  
addLast(e);   // 尾部插入值（Queue不可用）  
offer(e); // 尾部添加值（Queue不可用）  

push(e);  // 头部添加值，通用方法  
addFirst(e);  // 头部插入值（Queue不可用）  

**删除：  
remove();  // 头部删除值，通用方法  
pop();  // 头部删除值，通用方法  
removeFirst();  // 头部删除值(Queue不可用)  
poll(); // 头部删除值（Queue不可用）  

removeLast();  // 尾部删除值（Queue不可用）  
pollLast();  // 尾部删除值（Queue不可用）  

**查询：  
get(int index);  // 根据下标获取元素，通用方法  
getFirst();  // 获取第一个（头部）元素（Queue不可用）  
getLast();  // 获取最后一个（尾部）元素（Queue不可用）  

peek();  // 获取第一个元素（Queue不可用）  
peekFirst();  // 获取第一个元素（Queue不可用）  
peekLast();  // 获取最后一个元素（Queue不可用）  
```  
### HashMap常用方法  
```java  
HashMap<String, Integer> map = new HashMap<>();  

1. 存值  
map.put("abc", 1);  

2. 根据key取value值  
map.get("abc"); // 1  

3. 判断是否为空  
map.isEmpty(); // true表示为空  

4. 判断map中是否含有某个key  
map.containsKey(key);  // 含有返回true，否则false  

5. 判断map中是否含有某个value  
map.containsValue(value);  // 含有返回ture，否则false  

6. 根据key删除value  
map.remove(key);  // 删除了对应value值并返回  

7. 显示所有的value值  
map.values();  
System.out.println(map.values());  // 可直接打印  

8. 元素个数  
map.size();  

9. 替换某个key下的value  
map.replace(key, value);  

10. 根据是否有key值操作  
map.getOrDefault(key, defaultValue);  
//如果有key值，就使用这个key值得到的value，否则等于传入的这个defaultValue  
```  

## JS字符串和数组  
### 字符串String  
字符串初始化：  
```js  
var str = ""  
var str1 = new String("hi dajiahao")  
var len = str1.length;  // len= 11,length为字符串属性  
var a = str1[1];  // a = i  
```  
字符串方法：  
```js  
var str1 = new String("hi dajiahao")  

1.indexOf(c)：字符查找，返回内容出现的首个位置，没有返回-1  
var p = str1.indexOf("ia");  // p = -1  

2.substring(start, end)：返回截取元素，左闭右开，输入负数则识别为0，从较小处开始  
var st = str1.substring(2, -1);  // st = "hi",从0开始了，end可选  

3.slice(start, end)：  
返回截取元素，左闭右开，如果有负数，则使用数组长度加上该负数，但是end表示的元素要在start之后，否则为空  
var sl = str1.slice(5, -2);  // sl = "jiah",end可选  

4.substr(index, n)：从index处返回n个字符  
var ss = str1.substr(2,3);  // ss = " da" ，有空格  
注：三者区别在于substring不支持负数，负数从0开始，slice支持负数，而substr会定义返回的字符数  

5.replace()：字符串替换，可用于字符和子串  

6.split()：用指定的分隔符将String对象分割成字符串数组，用于字符串转换为数组  
var str = "hello Jack"  
const words = str.split(' ');  // words = ["hello", "jack"]  
```  

### 数组Array  
数组初始化：  
```js  
var arr = []  
var arr1 = new Array("this", "is", "array")  
var len = arr1.length; // len = 3,length为数组属性  
```  
数组基本方法：  
```js  
var arr1 = new Array("this", "is", "array")  

1.push(c)：添加元素到数组末尾  
var newLen = arr.push("hi");  // arr = ["hi"], newLen = 1, 返回新长度  

2.pop()：删除数组末尾元素并返回  
var last = arr1.pop();  // last = "array"  

3.shift()：删除数组首元素并返回  
var first = arr1.shift;  // first = "this"  

4.unshift(c)：添加元素到数组头部  
var newLen = arr1.unshift("first");  // newLen = 4  

5.indexOf()：数组元素查找，返回元素出现的首个位置，没有返回-1  
var pos = arr1.indexOf("is"); // pos = 1  

6.slice(start, end)：以数组形式返回截取数组元素，左闭右开，可为负数，end可选  
var newArr = arr1.slice(1, -1);  // newArr = ["is"]  

7.splice(start, n, item1, item2)：  
从start处删除n个元素并以数组返回，并添加指定的元素，n可选，item可选，此方法会改变原数组  
var deArr = arr1.splice(1, 1, "ok");  // arr1 = ["this", "ok", "array"]，deArr=["is"]  
```  
数组常用处理方法：  
```js  
var arr = ["this", "is", "array"]  
1.reverse()：反转数组顺序，原数组会被改变  
arr.reverse();  // arr = ["array", "is", "this"]  

2.sort()：不传参的话元素会被转换成字符串进行比较，返回值为排序后新数组，原数组被改变  
var a = [2, 1, 3];  
// 升序  
a.sort((a, b) => a - b);  // a = [1, 2, 3]  
// 降序  
a.sort((a, b) => b - a);  // a = [3, 2, 1]  

3.join()：将数组元素连接成一个字符串并返回，不改变原数组，用于数组转换为字符串  
var b = arr.join('-');  // b = "this-is-array"  
var s = "nihao";  
var ss = s.split('').reverse().join('');  // ss = "oahin",字符串反转,原数组不变  
```  
数组的遍历：  
```js  
var arr = ["hi", "I", "am", "array"];  
1.for循环  
for(let i = 0; i < arr.length; i++){  
    console.log(arr[i])  
}  

2.forEach(function(value, index, array))：遍历数组，无返回值，不改变原数组  
// 注：forEach中不能使用break/continue，但可以使用return代替continue，同时不能直接给value赋新值  
arr.forEach((value, index) => console.log(value, index));  

3.map()：返回一个数组，不改变原数组，数组中的每一项都由return返回  
map(function(value, index, array){  
    // do something  
    return xx  
})  
var arr1 = arr.map((value) => value + "o"); // arr1 = ["hio", "Io", "amo", "arrayo"]  

4.for...of循环：ES6引入，可用于遍历字符串、数组、Map等可迭代对象  
for(const value of arr){  
    console.log(value)  
}  

5.for...in循环：用于遍历对象的所有可枚举属性，for...of不行  
var obj = {a:1, b:2}  
for(let prop in obj){  // 不能用of  
    console.log(prop + ":" + obj[prop])  // a:1 b:2  
}  

6.filter()：类似，返回一个数组，不改变原数组，返回的每一项都满足过滤条件  
var arr1 = arr.filter((value) => value.includes("a"));  // arr1 = ["am", "array"]  

7.reduce()：归并方法，数组中每个值依次参与计算，最终返回的是一个值，不改变原数组  
// 参数[fn(pre, cur, index, array){}, init]，pre表示上一个归并值  
// reduce第二个参数init为pre的默认值，若不指定，则第一次迭代时pre为数组的第一项，cur为数组的第二项  
var arr = [2, 3, 4, 1]  
var total = arr.reduce((a, b) => a + b, 1);  // total = 11，pre默认值为1  
var b = arr.reduce(function(pre, cur, index, array){  
    return pre - cur;  
});  // b = 2-3-4-1 = -6, 参数分别为上一次的值、当前值、索引、原数组  
```  
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

### Math函数  
* Math.abs()：取绝对值  
* Math.ceil() and Math.floor：向上取整和向下取整  
* Math.round()：四舍五入  
* Math.random()：取[0, 1)的随机小数  
* Math.max() and Math.min()：获取一组数据的最大值和最小值  

## int和Integer的转化  
Integer是int的包装类，必须实例化后才能使用。另外，Integer实际上是对象的引用，new实际生成一个指针指向该对象，默认值为null，而int直接存储值，默认值为0。  

```java  
// int --> Integer  
int a = 66;  
Integer A = new Integer(a);  
// 或：  
Integer A = Integer.valueOf(a);    // valueOf  

// Integer --> int  
Integer A = new Integer(66);  
int a = A.intValue();     // intValue  
```  

## 位运算  
**& 按位与**  
规则：全1则1，全0则0  
作用：可以计算一个二进制数中1的个数  

**| 按位或**  
规则：全0则0，有1则1  

**^ 按位异或**  
规则：不同则1，相同则0  

**<< 左移运算符**  
a << b  
将a各二进制位全部左移b位后得到的值，左移越界丢弃，**低位补0**。a的值不受运算影响。  
**作用：**    
左移一位等于乘以2  
可以用来开2的n次方  
```java  
int a = 5;  
// 结果为5 * 2^3  
for(int i = 0; i < 3; i++){  
    a <<= 1;  
}  
// 相当于  
a <<= 3;  // 左移3位  
```  
**>> 右移运算符**  
a >> b  
将a各二进制全部右移b位后得到的值，最右边的值溢出丢弃。  
右移时原符号位为1，则右移左边补1；  
原符号位为0，则右移左边补0。  
**作用：**   
右移n位相当于除2的n次方，除不尽小里取整（注意负数）  
-25 >> 4 = -2  
-2 >> 4 = -1  
18 >> 4 = 1  
**>>> 无符号右移**  
a >>> b  
将a右移b位，最高位用0填充  

## / 和 %  
/ 表示除法，结果省略小数，正负不会改变，如`-23 / 10 = -2`  
% 表示取余，结果只有0和正整数  
运算中取10，/ 用于在循环中更新数字，%用于取数字的每一位  
如整数的反转：  
```java  
int a = -321;  
int res = 0;  
while(a != 0){  
    res = res * 10 + a % 10;  
    a /= 10;  
}  
return res;  // -123  
```  

```js  
console.log(num,str)  
var num = 18;  
var str = "lily";  
function fn2(){  
    console.log(str,num)  
    num = 19;  
    str = "candy";  
    var num = 14;  
    console.log(str,num)  
}  
fn2();  
console.log(str,num)  
```  
<!--  
 * @Author: your name  
 * @Date: 2021-07-09 15:14:59  
 * @LastEditTime: 2021-07-28 16:48:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: /myBlog/docs/blog/git学习.md  
-->  
---  
title: Git，再学亿遍  
date: 2020-12-10  
categories:  
 - 编程  
tags:  
 - tools  
---  
## git设置  
* 下载git后，使用  生成git公钥和私钥，将公钥添加到github，gitlab等，即可识别出你的身份  
* 设置全局name和email：`git config --global user.name/user.email "xxx"`  

## 常用git命令  
* git init ： 将一个文件夹初始化为git文件夹  
* git add.  ：添加新文件或者修改的所有文件添加到git  
* git checkout xxx ：xxx文件撤回修改（.是全部修改撤销）  
* git commit -m ""：提交到本地仓库  
* git push origin master：推送到远程仓库  
* git pull origin master：从远程仓库获取代码  
* git branch dev：添加分支dev  
* git checkout -b xx / git checkout xx：切换到xx分支上  
* git merge xxx：合并文件到当前分支  
* git push origin 分支名 ：将该分支提交到远程仓库  

## git场景

## 1. 新建分支开发
新建分支两种方式：  
1. 远程建好分支，本地直接拉下来  
`git checkout -b feature/zxz origin/feature zxz   // 远程分支feature/zxz拉到本地`  

2. 本地建好分支，推送到远程  
```js  
git checkout -b feature/zxz    // 创建并切换到改分支  
git push origin feature/zxz: feature/zxz   
// 推送本地分支feature/zxz（冒号前）到远程origin的分支feature/zxz(冒号后)，若远程没有该分支，可省略冒号后分支，直接推送  
```  
新建完成后，可以在gitlab或者github上提交merge request。  

## 2. commit撤回
`git reset --soft HEAD^`
只是撤回commit，代码不会丢失



## 3. 将远程分支合并到master**  
1. 首先切换到master  
2. 然后使用git fetch  
3. git merge 分支名 ：将该分支合并到master  
4. git push origin master：提交到远程分支  

git两个分支互不影响，切换分支后另一分支的修改不会出现在该分支（无论是add后还是commit后）  

两个分支修改了同一个文件：发生冲突（conflict）  
根据git显示的信息以及自身的需求进行修改，选择接受哪一个或者都接受，若出现错误冲突则要先修改代码  

当修改代码时，发现不小心在主分支上修改了，但是这不符合要求，可不能全删除吧，这时候使用：  
git stash：将刚修改的内容放入栈中，然后就可以切换到其他分支  
然后在该分支使用git stash pop，将修改的内容添加到当前分支上  

## 4. git重命名分支
**本地分支重命名**
语法：`git branch -m old new`  将old分支重命名为new
**远程分支重命名**
远程分支不可直接重命名，只能重新推送本地分支：
* 将本地分支重命名
* 将本地分支推送到远程
* 将远程分支删除
如将远程的old重命名为new：
```js
git branch -m old new
git push origin new
git push --delete origin old
```

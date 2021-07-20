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

**git

**将远程分支合并到master**  
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

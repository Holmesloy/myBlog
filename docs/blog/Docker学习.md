---  
title: Docker学习  
date: 2021-7-20
categories:  
 - Tools  
tags:  
 - 其他  
---  
## Docker是什么
* Docker属于Linux容器的一种封装，提供简单易用的容器使用接口
* 将应用程序与其以来，打包在一个文件中，运行该文件生成一个虚拟容器
* 只要安装了Docker的计算机都能运行文件（image），极大增强通用性

## Docker架构
![docker](@alias/docker.jpeg)  
* Docker Client: Docker命令行工具
* Docker Host：宿主机，Docker Daemon的运行环境服务器
* Docker Daemon：守护进程，Client通过命令行与Daemon交互
* Container：最小型的一个操作系统环境，对各种服务和应用容器化
* image：镜像，应用程序和依赖都打包在镜像文件中
* Registry：镜像仓库，可以拉取和推送镜像

## Docker安装（MacOs）
使用Homebrew安装：
`$ brew install --cask docker`  
* 运行Docker，检查版本命令：`docker --version`
* 运行一个Nginx服务器：`docker run -d -p 80:81 --name webserver nginx`
* 停止Nginx服务器并删除：`docker stop webserver  docker rm webserver`

## Docker常用命令
* `docker image ls`：列出本机image文件
* `docker image rm [name]`：删除某个镜像文件
* `docker container run [image]`：运行image文件，生成一个容器实例
* `docker container ls`：列出本机正在运行的容器
* `docker container kill [container]`：终止服务类容器的运行
* `docker image build -t [name]`：创建image文件

## Dockerfile文件
* 用来配置image，生成你想要的image文件
* 不打包的文件路径记得添加到.dockerignore中
* 文件举例：
```
FROM node:8.4  // 该image文件继承官方node image，冒号表示标签，后面为版本
COPY . /app    // 将当前目录下所有文件都拷贝进行image文件的/app目录
WORKDIR /app   // 指定接下来的工作路径为/app
RUN npm install // 在/app目录下，运行命令安装依赖，这些依赖会打包进入image
EXPOSE 3000     // 将容器3000端口暴露出来，允许外部连接这个端口    
```

**生成容器**  
`docker container run`会从image文件生成容器
`docker container run -p 8000:3000 -it [name] /bin/bash`
* -p参数：容器的3000端口映射到本机的8000端口
* -it参数：容器的Shell映射到当前的Shell，然后在本机窗口输入命令会传入容器
* /bin/bash：容器启动以后，内部第一个执行的命令，这里是启动Bash，保证用户可以使用Shell

## Docker部署前端应用
**一般部署流程**
* npm install，安装依赖
* npm run build，编译和打包，生成静态资源
* 将静态资源部署到服务器上，如nginx

根目录新建Dockerfile文件：
```
FROM node:10-alpine
 
# 代表生产环境
ENV PROJECT_ENV production
 
# 许多 package 会根据此环境变量，做出不同的行为
# 另外，在 webpack 中打包也会根据此环境变量做出优化，但是 create-react-app 在打包时会写死该环境变量
ENV NODE_ENV production
 
WORKDIR /code
ADD . /code
RUN npm install && npm run build && npm install -g http-server
EXPOSE 80
 
CMD http-server ./public -p 80
```
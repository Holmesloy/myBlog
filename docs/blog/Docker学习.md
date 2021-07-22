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
COPY . /app    // 将当前目录下所有文件都拷贝进入image文件的/app目录  
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
FROM node:12-alpine3.12 as builder   // node后面版本在docker hub中查找，builder需要  
WORKDIR /app       // 工作目录  
COPY ./package.json /app  
COPY ./package-lock.json /app  
RUN npm install --registry=https://npm.shopee.io  
COPY . .  
RUN npm run build  


FROM nginx:stable-alpine    // nginx版本  
COPY nginx.conf /etc/nginx  
COPY --from=builder /app/dist  /usr/share/nginx/html  
```  
然后运行命令：`docker build -t frontend .`  
* frontend表示镜像的名称  
* -t：指定要创建的目标镜像  
* .：Dockerfile文件所在目录，可以指定Dockerfile的绝对路径  

然后用容器启动镜像：  
`docker run --name front -p 80:80 front:latest`  
* --name：镜像名称  
* -p：指定端口映射  

最后访问80端口，成功进入页面  
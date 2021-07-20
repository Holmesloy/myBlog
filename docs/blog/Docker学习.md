---  
title: Docker学习  
date: 2021-7-20
categories:  
 - Tools  
tags:  
 - 其他  
---  
## Docker架构
![docker](@alias/docker.jpeg)  
* Docker Client: Docker命令行工具
* Docker Host：宿主机，Docker Daemon的运行环境服务器
* Docker Daemon：守护进程，Client通过命令行与Daemon交互
* Container：最小型的一个操作系统环境，对各种服务和应用容器化
* image：镜像，即一个容器的模板配置，通过一个镜像启动多个容器
* Registry：镜像仓库，可以拉取和推送镜像

## Docker安装（MacOs）
使用Homebrew安装：
`$ brew install --cask docker`  
* 运行Docker，检查版本命令：`docker --version`
* 运行一个Nginx服务器：`docker run -d -p 80:81 --name webserver nginx`
* 停止Nginx服务器并删除：`docker stop webserver  docker rm webserver`
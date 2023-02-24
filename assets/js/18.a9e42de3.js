(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{528:function(e,r,a){e.exports=a.p+"assets/img/docker.f3c2001e.jpeg"},578:function(e,r,a){"use strict";a.r(r);var n=a(5),v=Object(n.a)({},(function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h2",{attrs:{id:"docker是什么"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker是什么"}},[e._v("#")]),e._v(" Docker是什么")]),e._v(" "),n("ul",[n("li",[e._v("Docker属于Linux容器的一种封装，提供简单易用的容器使用接口")]),e._v(" "),n("li",[e._v("将应用程序与其以来，打包在一个文件中，运行该文件生成一个虚拟容器")]),e._v(" "),n("li",[e._v("只要安装了Docker的计算机都能运行文件（image），极大增强通用性")])]),e._v(" "),n("h2",{attrs:{id:"docker架构"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker架构"}},[e._v("#")]),e._v(" Docker架构")]),e._v(" "),n("p",[n("img",{attrs:{src:a(528),alt:"docker"}})]),e._v(" "),n("ul",[n("li",[e._v("Docker Client: Docker命令行工具")]),e._v(" "),n("li",[e._v("Docker Host：宿主机，Docker Daemon的运行环境服务器")]),e._v(" "),n("li",[e._v("Docker Daemon：守护进程，Client通过命令行与Daemon交互")]),e._v(" "),n("li",[e._v("Container：最小型的一个操作系统环境，对各种服务和应用容器化")]),e._v(" "),n("li",[e._v("image：镜像，应用程序和依赖都打包在镜像文件中")]),e._v(" "),n("li",[e._v("Registry：镜像仓库，可以拉取和推送镜像")])]),e._v(" "),n("h2",{attrs:{id:"docker安装-macos"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker安装-macos"}},[e._v("#")]),e._v(" Docker安装（MacOs）")]),e._v(" "),n("p",[e._v("使用Homebrew安装："),n("br"),e._v(" "),n("code",[e._v("$ brew install --cask docker")])]),e._v(" "),n("ul",[n("li",[e._v("运行Docker，检查版本命令："),n("code",[e._v("docker --version")])]),e._v(" "),n("li",[e._v("运行一个Nginx服务器："),n("code",[e._v("docker run -d -p 80:81 --name webserver nginx")])]),e._v(" "),n("li",[e._v("停止Nginx服务器并删除："),n("code",[e._v("docker stop webserver docker rm webserver")])])]),e._v(" "),n("h2",{attrs:{id:"docker常用命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker常用命令"}},[e._v("#")]),e._v(" Docker常用命令")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("docker image ls")]),e._v("：列出本机image文件")]),e._v(" "),n("li",[n("code",[e._v("docker image rm [name]")]),e._v("：删除某个镜像文件")]),e._v(" "),n("li",[n("code",[e._v("docker container run [image]")]),e._v("：运行image文件，生成一个容器实例")]),e._v(" "),n("li",[n("code",[e._v("docker container ls")]),e._v("：列出本机正在运行的容器")]),e._v(" "),n("li",[n("code",[e._v("docker container kill [container]")]),e._v("：终止服务类容器的运行")]),e._v(" "),n("li",[n("code",[e._v("docker image build -t [name]")]),e._v("：创建image文件")])]),e._v(" "),n("h2",{attrs:{id:"dockerfile文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile文件"}},[e._v("#")]),e._v(" Dockerfile文件")]),e._v(" "),n("ul",[n("li",[e._v("用来配置image，生成你想要的image文件")]),e._v(" "),n("li",[e._v("不打包的文件路径记得添加到.dockerignore中")]),e._v(" "),n("li",[e._v("文件举例：")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("FROM node:8.4  // 该image文件继承官方node image，冒号表示标签，后面为版本  \nCOPY . /app    // 将当前目录下所有文件都拷贝进入image文件的/app目录  \nWORKDIR /app   // 指定接下来的工作路径为/app  \nRUN npm install // 在/app目录下，运行命令安装依赖，这些依赖会打包进入image  \nEXPOSE 3000     // 将容器3000端口暴露出来，允许外部连接这个端口    \n")])])]),n("p",[n("strong",[e._v("生成容器")]),n("br"),e._v(" "),n("code",[e._v("docker container run")]),e._v("会从image文件生成容器"),n("br"),e._v(" "),n("code",[e._v("docker container run -p 8000:3000 -it [name] /bin/bash")])]),e._v(" "),n("ul",[n("li",[e._v("-p参数：容器的3000端口映射到本机的8000端口")]),e._v(" "),n("li",[e._v("-it参数：容器的Shell映射到当前的Shell，然后在本机窗口输入命令会传入容器")]),e._v(" "),n("li",[e._v("/bin/bash：容器启动以后，内部第一个执行的命令，这里是启动Bash，保证用户可以使用Shell")])]),e._v(" "),n("h2",{attrs:{id:"docker部署前端应用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker部署前端应用"}},[e._v("#")]),e._v(" Docker部署前端应用")]),e._v(" "),n("p",[n("strong",[e._v("一般部署流程")])]),e._v(" "),n("ul",[n("li",[e._v("npm install，安装依赖")]),e._v(" "),n("li",[e._v("npm run build，编译和打包，生成静态资源")]),e._v(" "),n("li",[e._v("将静态资源部署到服务器上，如nginx")])]),e._v(" "),n("p",[e._v("根目录新建Dockerfile文件：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("FROM node:12-alpine3.12 as builder   // node后面版本在docker hub中查找，builder需要  \nWORKDIR /app       // 工作目录  \nCOPY ./package.json /app  \nCOPY ./package-lock.json /app  \nRUN npm install --registry=https://npm.shopee.io  \nCOPY . .  \nRUN npm run build  \n\n\nFROM nginx:stable-alpine    // nginx版本  \nCOPY nginx.conf /etc/nginx  \nCOPY --from=builder /app/dist  /usr/share/nginx/html  \n")])])]),n("p",[e._v("然后运行命令："),n("code",[e._v("docker build -t frontend .")])]),e._v(" "),n("ul",[n("li",[e._v("frontend表示镜像的名称")]),e._v(" "),n("li",[e._v("-t：指定要创建的目标镜像")]),e._v(" "),n("li",[e._v(".：Dockerfile文件所在目录，可以指定Dockerfile的绝对路径")])]),e._v(" "),n("p",[e._v("然后用容器启动镜像："),n("br"),e._v(" "),n("code",[e._v("docker run --name front -p 80:80 front:latest")])]),e._v(" "),n("ul",[n("li",[e._v("--name：镜像名称")]),e._v(" "),n("li",[e._v("-p：指定端口映射")])]),e._v(" "),n("p",[e._v("最后访问80端口，成功进入页面")])])}),[],!1,null,null,null);r.default=v.exports}}]);
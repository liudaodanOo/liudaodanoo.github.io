# Docker

1. 构建
2. 分享
3. 运行

## Docker如何运行？

## 理解容器

1. 传统部署

应用间不隔离，相互间会挤压空间。

2. 虚拟化部署

应用间隔离，但是每个虚拟机都有一个操作系统，很笨重。

3. 容器部署（轻量、快速、隔离、跨平台、高密度 ）

容器类似轻量级的VM，不包含操作系统。
容器间共享操作系统。
容器间互相隔离，每个容器都拥有自己的文件系统、CPU、内存、进程空间等。

容器包含了应用运行的完整环境，更轻量化。容器间隔离，所以应用间隔离，应用有问题只会影响到自己容器。

## Docker安装

1. 移除旧版本Docker
2. 配置Docker yum源
3. 安装最新Docker
4. 设置开机启动Docker
5. 修改Docker镜像源

```shell
# 移除旧版本docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 配置docker yum源。
sudo yum install -y yum-utils
sudo yum-config-manager \
--add-repo \
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo


# 安装 最新 docker
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动& 开机启动docker； enable + start 二合一
systemctl enable docker --now

# 配置加速
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com","https://82m9ar63.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 镜像操作

命令：

```shell
# 检索镜像
docker search

# 下载镜像
docker pull

# 查看镜像
docker images

# 删除镜像
docker rmi

# 提交镜像
docker commit [-a AUTHOR_NAME] [-c CHANGE_LIST] [-m COMMIT_MSG] [-p]

# 保存镜像
docker save [-o FILE_NAME]

# 加载镜像
docker load [-i IMAGE_TAR_PATH]

# 分享镜像
docker login
docker tag IAMGE_NAME:IMAGE_TAG DOCKER_USERNAME/IAMGE_NAME:IMAGE_TAG
docker push DOCKER_USERNAME/IAMGE_NAME:IMAGE_TAG

```

## 容器操作

命令：

```shell
# 运行容器
docker run [-d] [-p SYSTEM_PORT:CONTAINER_PORT] [--name CONTAINER_NAME] [--network NETWORK_NAME]

# 查看容器
docker ps [-a]

# 查看容器细节
docker inspect

# 停止容器
docker stop

# 启动容器
docker start

# 重启容器
docker restart

# 查看状态
docker stats

# 查看日志
docker logs

# 进入容器
docker exec [-it]

# 删除容器
docker rm [-f]
```

## 存储

```shell
# 目录挂载 系统目录挂载到容器对应的目录
docker run [OPTIONS] -v SYSTEM_PATH:CONTAINER_PATH

# 卷映射 容器目录映射到系统docker约定的目录下
# VOLUME_NAME 不能以/开头
# 映射的地址在系统/var/lib/docker/volumes/[VOLUME_NAME]下
docker run [OPTIONS] -v VOLUME_NAME:CONTAINER_PATH

# 查看卷
docker volume ls

# 创建卷
docker volume create VOLUME_NAME

# 查看卷的信息
docker volume inspect VOLUME_NAME
```

## 网络

```shell
# 创建一个网络
docker network create NETWORK_NAME

# 查看网络列表
docker network ls
```

1. 下载镜像
2. 启动容器
3. 修改页面
4. 保存镜像
5. 分享社区

# 安装

## 前置条件

1. Java运行环境
2. 配置了Java环境变量

## 下载

[Maven官网](https://maven.apache.org/download.cgi#)

## 安装

将下载后的文件移动到<span class="hl-txt-1">/usr/local</span>并解压，至此安装完成。

## 设置本地仓库目录

`settings.xml` 文件路径：`/usr/local/apache-maven-x.x.x/conf/settings.xml`

```shell
vim /usr/local/apache-maven-x.x.x/conf/settings.xml
```

找到 `localRepository`

```xml
<localRepository>本地仓库路径</localRepository>
```

## 修改镜像

添加阿里云仓库镜像，加快依赖下载速度。

```shell
vim /usr/local/apache-maven-x.x.x/conf/settings.xml
```

```xml
<mirrors>
  <mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>aliyun</name>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>
```

## 添加环境变量

```shell
echo '\n# Maven\nexport PATH=$PATH:/usr/local/apache-maven-3.6.3/bin' >> ~/.zshrc
source ~/.zshrc
```

## 查看是否生效

```shell
mvn --version
# or
mvn -v
```

如果输出了 `Maven` 的版本信息，说明安装成功。

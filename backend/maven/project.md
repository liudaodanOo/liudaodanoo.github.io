# 工程创建

## `GAVP` 属性

- G: groupId 组织标识
- A: artifactId 产品标识
- V: version 版本号
- P: packaging 打包方式

### GAV 规范

1. `groupId` 的规范

```text
# 最多4级
com.[公司/BU].[业务线].[子业务线]
```

2. `artifactId` 的规范

   语义不重复不遗漏，先到仓库中心去查证一下。

```text
# 正确的例子
oo-client
# or
oo-api
# or
oo-tool
```

3. `version` 的规范

```text
# 正确的例子
[主版本号].[次版本号].[修订号]
```

1\) 主版本号：做了不兼容的 API 修改，或者增加了能改变产品方向的新功能

2\) 次版本号：当做了向下兼容的功能性新增（新增类、接口等）

3\) 修订号：修复 bug，没有修改方法签名的功能加强，保持 API 兼容性

### packaging 规范

`packaging` 用于指定打包后的文件类型，有如下几个值：

- jar（默认值）：普通的Java工程，打包后文件的后缀名是 `.jar`
- war：代表Java的Web工程，打包后文件的后缀名是 `.war`
- pom：表示不会打包，用来做继承的父工程

## 工程目录说明

```text
|-- pom.xml                               # Maven 项目管理文件
|-- src
    |-- main                              # 项目主要代码
    |   |-- java                          # Java 源代码目录
    |   |   `-- com/example/myapp         # 开发者代码主目录
    |   |       |-- controller            # 存放 Controller 层代码的目录
    |   |       |-- service               # 存放 Service 层代码的目录
    |   |       |-- dao                   # 存放 DAO 层代码的目录
    |   |       `-- model                 # 存放数据模型的目录
    |   |-- resources                     # 资源目录，存放配置文件、静态资源等
    |   |   |-- log4j.properties          # 日志配置文件
    |   |   |-- spring-mybatis.xml        # Spring Mybatis 配置文件
    |   |   `-- static                    # 存放静态资源的目录
    |   |       |-- css                   # 存放 CSS 文件的目录
    |   |       |-- js                    # 存放 JavaScript 文件的目录
    |   |       `-- images                # 存放图片资源的目录
    |   `-- webapp                        # 存放 WEB 相关配置和资源
    |       |-- WEB-INF                   # 存放 WEB 应用配置文件
    |       |   |-- web.xml               # Web 应用的部署描述文件
    |       |   `-- classes               # 存放编译后的 class 文件
    |       `-- index.html                # Web 应用入口页面
    `-- test                              # 项目测试代码
        |-- java                          # 单元测试目录
        `-- resources                     # 测试资源目录
```

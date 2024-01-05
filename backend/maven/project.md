# Maven 工程

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

## 核心功能：依赖管理

### 依赖添加

```xml
<!--
   通过编写依赖jar包的gav必要属性，引入第三方依赖！
   scope属性是可选的，可以指定依赖生效范围！
   依赖信息查询方式：
      1. maven仓库信息官网 https://mvnrepository.com/
      2. mavensearch插件搜索
 -->
<dependencies>
    <!-- 引入具体的依赖包 -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
        <!--
            生效范围
            - compile ：main目录 test目录  打包打包 [默认]
            - provided：main目录 test目录  Servlet
            - runtime： 打包运行           MySQL
            - test:    test目录           junit
         -->
        <scope>runtime</scope>
    </dependency>

</dependencies>
```

### 提取依赖版本

```xml
<!--声明版本-->
<properties>
  <!--命名随便,内部制定版本号即可！-->
  <junit.version>4.11</junit.version>
  <!-- 也可以通过 maven规定的固定的key，配置maven的参数！如下配置编码格式！-->
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
</properties>

<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <!--引用properties声明版本 -->
    <version>${junit.version}</version>
  </dependency>
</dependencies>
```

### 依赖传递和冲突

`依赖传递` 是指当一个模块（库）A依赖于B，B又依赖于C。那么A会间接依赖于C。这种依赖传递结构可以形成一个依赖树。当引入一个模块时，<span class="hl-txt-1">Maven</span>会自动解析、加载其所有的 <span class="hl-txt-1">直接和间接</span>依赖，确保这些依赖都可用。

<span class="hl-bg-1">依赖传递的作用：</span>

- 减少重复依赖
- 自动管理依赖
- 确保依赖版本正确性

`依赖冲突` 是指当 <span class="hl-txt-1">直接或间接</span> 引用出现了相同的模块，项目就会出现重复的<span class="hl-txt-1">jar包</span>，此时就发生了依赖冲突。依赖冲突避免出现重复的依赖，并终止依赖传递。

![image.png](/images/maven/dep-conflict.jpg)

`Maven` 能按照自己的原则进行重复依赖选择，自动解决依赖冲突。也提供了手动解决依赖冲突的方式<span class="hl-txt-1">（不推荐）</span>。

**解决依赖冲突的方式：**

- 短路优先原则<span class="hl-txt-1">（第一原则）</span>

  A -> B -> C -> D -> X(version: 0.0.1)

  A -> E -> X(version: 0.0.2)

  则A依赖于X(version: 0.0.2)

- 先声明优先原则<span class="hl-txt-1">（第二原则）</span>

  A -> B -> X(version: 0.0.1)

  A -> C -> X(version: 0.0.2)

  路径长度相同时，遵循先声明优先原则，则A依赖于X(version: 0.0.1)

## 核心功能：构建管理

`构建` 是指将<span class="hl-txt-1">源代码、依赖库和资源等文件转换成可执行或可部署的应用程序</span>的过程。在这个过程中包括编译源代码、链接依赖哭、打包和部署等多个步骤。
![image.png](/images/maven/build-process.jpg)

**主动触发构建的场景：**

- 重新编译
- 打包
- 部署本地或私仓

**命令方式构建：**
| 命令 | 描述 |
| --- | --- |
| mvn clean | 清理编译或打包后的项目结构，删除target文件夹 |
| mvn compile | 编译项目，生成target文件夹 |
| mvn test | 执行测试源码 |
| mvn site | 生成一个项目依赖信息的展示页面 |
| mvn package | 打包项目，生成jar/war文件 |
| mvn install | 打包后上传到本地仓库 |
| mvn deploy | 打包后上传到私仓 |

**构建命令周期：**

1. 清理周期
   clean

2. 默认周期
   compile -> test -> package -> install / deploy

3. 报告周期
   site

**最佳使用方案：**

```shell
# 打包
mvn clean package

# 重新编译
mvn clean compile

# 本地部署
mvn clean install
```

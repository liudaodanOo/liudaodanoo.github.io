# 依赖和构建管理

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

![image.jpg](/images/maven/dep-conflict.jpg)

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

![image.jpg](/images/maven/build-process.jpg)

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

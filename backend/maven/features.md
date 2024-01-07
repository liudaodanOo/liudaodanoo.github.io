# 继承和聚合特性

## 继承关系

### 继承的概念

`Maven` 继承是指在 `Maven` 的项目中，让子模块从父模块中继承配置信息的机制。

![image.jpg](/images/maven/inherit.jpg)

### 继承的作用

在父工程中统一管理项目中的依赖信息，进行统一版本管理。
通过在父工程中维护整个项目的依赖信息<span hl-txt-1>既保证了整个项目的使用规范、准确的jar包，又能沉淀以往的经验，节约时间和精力</span>。

### 继承的语法

1. 父工程

父工程用于管理子工程，所以 `packaging` 必须为<span hl-txt-1>pom</span>。

```xml
<groupId>com.atguigu.maven</groupId>
<artifactId>pro03-maven-parent</artifactId>
<version>1.0-SNAPSHOT</version>
<!-- 当前工程作为父工程，用于管理子工程，所以打包方式必须是 pom -->
<packaging>pom</packaging>
```

2. 子工程

如果子工程坐标中的 `groupId` 和 `version` 与父工程一致，那么可以省略。

```xml
<!-- 使用parent标签指定当前工程的父工程 -->
<parent>
  <!-- 父工程的信息 -->
  <groupId>com.atguigu.maven</groupId>
  <artifactId>pro03-maven-parent</artifactId>
  <version>1.0-SNAPSHOT</version>
</parent>

<!-- 子工程的信息 -->
<!-- 如果子工程信息中的groupId和version与父工程一致，那么可以省略 -->
<groupId>com.atguigu.maven</groupId>
<artifactId>pro04-maven-module</artifactId>
<version>1.0-SNAPSHOT</version>
```

### 父工程统一管理依赖

1. 父工程声明依赖信息

父工程在 `dependencyManagement标签` 中管理依赖信息，被管理的依赖并没有真正被引入到工程。

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-expression</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aop</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

2. 子工程引入依赖
   子工程引用父工程中的依赖信息时，可以把版本号去掉。版本号去掉就表示子工程中这个依赖的版本由父工程决定，具体来说是由父工程的 `dependencyManagement` 来决定。

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
  </dependency>
</dependencies>
```

## 聚合关系

### 聚合的概念

`Maven` 聚合是指将多个项目组织到一个父级项目中，通过出发父工程的构建统一按顺序触发子工程构建的过程。

### 聚合的作用

- 统一管理子工程构建：可以将多个子项目组织在一起，方便管理和维护
- 优化构建顺序：可以对多个项目进行顺序控制，避免出现构建依赖混乱导致构建失败的情况

### 聚合的语法

父项目中包含子项目列表

```xml
<project>
  <groupId>com.example</groupId>
  <artifactId>parent-project</artifactId>
  <packaging>pom</packaging>
  <version>1.0.0</version>
  <!-- 子项目列表 -->
  <modules>
    <module>child-project1</module>
    <module>child-project2</module>
  </modules>
</project>
```

# MyBatis-Plus

**MyBatis-Plus**是MyBatis的增强工具。在MyBatis的基础上只做增强不做改变，为简化开发、提高效率而生。

## 导入依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.2</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.5</version>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>

```

## 配置文件

配置文件位置：resources/application.yml

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/[databaseName]?useSSL=false
    username: [username]
    password: [password]
    driver-class-name: com.mysql.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource

mybatis-plus:
  mapper-locations: classpath:mappers/*.xml
  configuration:
    map-underscore-to-camel-case: true
    auto-mapping-behavior: full
    lazy-loading-enabled: true
    aggressive-lazy-loading: false
  type-aliases-package: com.liudaodan.pojo
```

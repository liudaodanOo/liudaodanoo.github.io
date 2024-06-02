# MyBatis

**MyBatis**是一款优秀的持久层框架。它支持自定义SQL、存储过程以及高级映射。MyBatis免除了几乎所有的JDBC代码以及设置参数和获取结果集的工作。MyBatis可以通过简单的XML或注解来配置和映射原始类型、接口和Java POJO（Plain Old Java Objects，普通老式Java对象）为数据库中的记录。

## 导入依赖

```xml
<!-- mybaits相关依赖导入-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.2</version>
</dependency>

<!-- mysql连接器 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>

<!-- Druid连接池 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.5</version>
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

mybatis:
  mapper-locations: classpath:mappers/*.xml
  configuration:
    map-underscore-to-camel-case: true
    auto-mapping-behavior: full
    lazy-loading-enabled: true
    aggressive-lazy-loading: false
  type-aliases-package: com.liudaodan.pojo
```

## 添加扫描mapper注解

```java
@SpringBootApplication
@MapperScan({"com.liudaodan.mapper"})
public class DemoApplication {
  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }
}
```

# 实践和应用

## 实现步骤

### 1. 配置元数据

编写交给 `Spring IOC容器` 管理的组件的信息，配置方式有三种：

- XML
- 注解
- 配置类

### 2. 实例化IOC容器

给 `ApplicationContext` 构造函数提供配置信息的<span hl>位置路径</span>，允许容器从外部资源加载配置元数据。

### 3. 获取Bean（组件）

`ApplicationContext` 是一个高级工厂的接口，能够维护不同 `Bean` 及其依赖项的注册表。通过使用方法 `T getBean(String name, Class<T> requiredType)` 可以检索 `Bean的实例` 。

## XML方式

### Bean信息声明配置（IOC）

1. 导入SpringIOC相关依赖

```xml
<dependencies>
    <!--spring context依赖-->
    <!--当你引入Spring Context依赖之后，表示将Spring的基础依赖引入了-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>6.0.6</version>
    </dependency>

    <!--junit5测试-->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.3.1</version>
    </dependency>
</dependencies>
```

2. 创建组件类，并配置XML文件

a. 创建组件类

**无参构造函数组件类：**

```java
package com.oo.ioc;

public class HelloWorld {

  public void greet() {
    System.out.println("Hello world!");
  }

}
```

**工厂模式实例化组件类：**

```java
package com.oo.ioc;

public class FactoryDemo {

  // 私有化构造函数
  private FactoryDemo() {}

  // 静态属性，实例化组件类
  private static FactoryDemo factoryDemo = new FactoryDemo();

  // 静态方法，返回组件类实例
  private static FactoryDemo staticCreateFactoryDemo() {
    return factoryDemo;
  }

  // 非静态方法，返回组件类实例
  private FactoryDemo createFactoryDemo() {
    return factoryDemo;
  }
}
```

b. 编写XML文件

文件路径：<span hl>resources/spring-ioc.xml</span>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 1. 可以实用化无参数构造函数实例化的组件，如何进行ioc配置呢 -->
    <!--
      bean 标签：一个组件的信息，一个组件的对象
        id: 组件的标识，唯一，方便后期读取
        class：组件的类的全限定名
     -->
    <bean id="helloWorld1" class="com.oo.ioc.HelloWorld"></bean>
    <bean id="helloWorld2" class="com.oo.ioc.HelloWorld"></bean>

    <!-- 2. 静态工厂类如何声明工厂方法进行 ioc 的配置 -->
    <!--
      bean 标签：一个组件的信息，一个组件的对象
        id: 组件的标识，唯一，方便后期读取
        class：工厂类的全限定名
        factory-method：静态工厂方法
     -->
    <bean id="factoryDemo1" class="com.oo.ioc.FactoryDemo" factory-method="staticCreateFactoryDemo"></bean>

    <!-- 3. 非静态工厂类如何声明工厂方法进行 ioc 的配置 -->
    <!-- 通过指定非静态工厂对象和方法名，来配置生成 ioc 信息 -->
    <bean id="factoryDemo2" factory-bean="factoryDemo1" factory-method="createFactoryDemo"></bean>
</beans>
```

<span hlbg>bean标签通过配置告诉IOC容器需要创建对象的组件信息：</span>

- id：`bean` 的唯一标识，用于获取 `bean`
- class：组件类的全限定名
- factory-bean： `工厂bean` 的名称
- factory-method：实例工厂的方法名。<span hl>静态工厂时，必须是静态方法；指定 `工厂bean` 时，必须是非静态方法。</span>

### Bean依赖注入配置（DI）

**构造函数依赖注入：**

1. 创建组件类

```java
package com.oo.ioc;

public class UserDao {
}
```

```java
package com.oo.ioc;

public class UserService {

    private UserDao userDao;

    private int age;

    private String name;

    // 1. 单个构造函数参数依赖注入
    public UserService(iUserDao userDao) {
        this.userDao = userDao;
    }

    // 2. 多个构造函数参数依赖注入
    public UserService(int age , String name, UserDao userDao) {
        this.userDao = userDao;
        this.age = age;
        this.name = name;
    }

    // 3. setter 方法依赖注入
    public void setUserDao(UserDao userDao) {
      this.userDao = userDao;
    }

    public void setAge(int age) {
      this.age = age;
    }

    public void setName(String name) {
      this.name = name;
    }
}
```

2. 编写配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans
	xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd"
>
	<!-- 引用和被引用的组件 必须全部在 ioc 容器 -->
	<!--
    spring ioc 容器是一个高级容器，内部会有缓存动作！
      1. 先创建对象（ioc）
      2. 再进行属性赋值（di）
  -->

	<!-- 1. 单个构造参数注入 -->
	<bean id="userDao" class="com.oo.ioc.UserDao"></bean>
	<bean id="userService" class="com.oo.ioc.UserService">
		<!--
      构造参数传值 di 的配置
        constructor-arg标签：
          value：直接属性值 String name = "刘捣蛋" int age = 18
          ref：引用其他的 bean beanId 值
    -->
		<constructor-arg ref="userDao"></constructor-arg>
	</bean>

	<!-- 2. 多个构造参数注入 -->
	<bean id="userService1" class="com.oo.ioc.UserService">
		<!--
      方案1：通过构造参数的名字填写值（推荐）
        name：参数的名字
    -->
		<constructor-arg name="age" value="18"></constructor-arg>
		<constructor-arg name="name" value="刘捣蛋"></constructor-arg>
		<constructor-arg name="userDao" ref="userDao"></constructor-arg>

		<!--
      方案2：通过构造参数的顺序填写值
    -->
		<!--        <constructor-arg value="18"></constructor-arg>-->
		<!--        <constructor-arg value="刘捣蛋"></constructor-arg>-->
		<!--        <constructor-arg ref="userDao"></constructor-arg>-->

		<!--
      方案3：通过构造参数的下标填写值
        index：参数的下标
    -->
		<!--        <constructor-arg index="0" value="18"></constructor-arg>-->
		<!--        <constructor-arg index="1" value="刘捣蛋"></constructor-arg>-->
		<!--        <constructor-arg index="2" ref="userDao"></constructor-arg>-->
	</bean>

	<!-- 3. 触发 setter 方法进行注入 -->
	<bean id="userService2" class="com.oo.ioc.UserService">
		<!--
      name：setter 方法的去掉 set 和首字母小写的值（调用 set 方法的名）
          setAge -> age
      value | ref 二选一：value 直接属性值，ref 其他 bean 的 id
    -->
		<property name="age" value="18"></property>
		<property name="name" value="刘捣蛋"></property>
		<property name="userDao" ref="userDao"></property>
	</bean>
</beans>
```

## 注解方式

1. 导入SpringIOC相关依赖
2. 准备组件类，并添加注解

**普通组件：**

```java
package com.oo.ioc;

@Component
public class OoComponent {}
```

**Controller组件：**

```java
package com.oo.ioc;

@Controller
public class OoController {}
```

**Service组件：**

```java
package com.oo.ioc;

@Service
public class OoService {}
```

**Dao组件：**

```java
package com.oo.ioc;

@Repository
public class OoDao {}
```

| 注解          | 作用                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| `@Component`  | 用于描述 `Spring中的Bean` ，仅仅表示容器中的一个组件，并且可以作用在应用的任何层次 |
| `@Controller` | 通常作用在 `控制层（Controller）` ，用于将控制层的类标识为 `Spring中的Bean`        |
| `@Service`    | 通常作用在 `业务层（Service）` ，用于将业务层的类标识为 `Spring中的Bean`           |
| `@Repository` | 通常作用在 `数据访问层（Dao）` ，用于将数据访问层的类标识为 `Spring中的Bean`       |

可通过 `@Component("alias")` 或 `@Component(value = "alias")` 重新指定 `Bean` 在 `IOC容器` 中的唯一标识

> 源码中 `@Controller`、`@Service`、`@Repository` 只是在 `@Component` 注解的基础上起了三个新的名称，没有语法层面的区别，只是为了便于分辨组件的作用，提高代码的可读性、程序结构严谨性

3. 编写XML文件

a. 扫描指定包配置

```xml
<context:component-scan base-package="com.oo.ioc"></context:component-scan>
```

b. 指定包，但是排除注解

```xml
<context:component-scan base-package="com.oo.ioc">
  <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
</context:component-scan>
```

c. 指定包，包含注解

```xml
<context:component-scan base-package="com.oo.ioc">
  <context:include-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
</context:component-scan>
```

- `context:component-scan` 标签：用 `base-package属性` 指定 `IOC容器` 去哪些包下查找注解类，并添加到容器中；多个包以 `,` 分割；指定包相当于指定了子包内的所有类
- `context:exclude-filter` 标签：不扫描指定注解
- `context:include-filter` 标签：扫描指定注解

3. 其他注解

**Bean的周期方法注解**

| 注解             | 作用                                                      |
| ---------------- | --------------------------------------------------------- |
| `@PostConstruct` | 指定初始化方法，必须是 <span hl>public void 无形参</span> |
| `@PreDestroy`    | 指定销毁方法，必须是 <span hl>public void 无形参</span>   |

**Bean的作用域注解**

| 注解     | 作用             |
| -------- | ---------------- |
| `@Scope` | 指定Bean的作用域 |

`@Scope` 注解的可选值

| 可选值                               | 作用                                    | 创建对象的时机  |
| ------------------------------------ | --------------------------------------- | --------------- |
| singleton（默认值）                  | 在IOC容器中，这个Bean的对象始终为单实例 | IOC容器初始化时 |
| prototype                            | 在IOC容器中，这个Bean的对象可有多个实例 | 获取Bean时      |
| request（WebApplicationContext环境） | 请求范围内有效的实例                    | 每次请求时      |
| session（WebApplicationContext环境） | 会话范围内有效的实例                    | 每次会话时      |

**Bean的自动装配注解**

| 注解         | 作用                       |
| ------------ | -------------------------- |
| `@Autowired` | 自动装配Bean的对象         |
| `@Qualifier` | 指定要查找并装配的Bean的id |

工作流程：

![image.jpg](/images/spring/ioc-autowired.jpg)

**Bean的属性赋值注解**

a. 声明外部配置 `application.properties` 文件

```properties
# 应用名称
application.name=LiudaodanOo
```

b. Spring的XML文件中引入外部配置

```xml
<context:property-placeholder location="classpath:application.properties" />
```

c. 使用 `@Value` 注解读取配置

| 注解     | 作用                                    |
| -------- | --------------------------------------- |
| `@Value` | 读取配置：@Value("${application.name}") |

## 配置类方式

1. 使用 `@Configuration注解` 将一个普通类标记为 `Spring配置类`

```java
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

// 标注当前类是配置类，替代application.xml
@Configuration
// 使用注解读取外部配置，替代 <context:property-placeholder标签
@PropertySource("classpath:application.properties")
// 使用@ComponentScan注解,可以配置扫描包,替代<context:component-scan标签
@ComponentScan(basePackages = {"com.oo.components"})
public class MyConfiguration {}
```

2. 使用 `@Bean注解` 将一个普通类标记为 `Spring组件`

```java
// 标注当前类是配置类，替代application.xml
@Configuration
// 引入jdbc.properties文件
@PropertySource({"classpath:application.properties","classpath:jdbc.properties"})
@ComponentScan(basePackages = {"com.oo.components"})
public class MyConfiguration {

    //如果第三方类进行IoC管理,无法直接使用@Component相关注解
    //解决方案: xml方式可以使用<bean标签
    //解决方案: 配置类方式,可以使用方法返回值+@Bean注解
    @Bean
    public DataSource createDataSource(@Value("${jdbc.user}") String username,
                                       @Value("${jdbc.password}")String password,
                                       @Value("${jdbc.url}")String url,
                                       @Value("${jdbc.driver}")String driverClassName){
        //使用Java代码实例化
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setUrl(url);
        dataSource.setDriverClassName(driverClassName);
        //返回结果即可
        return dataSource;
    }
}
```

`@Bean注解` 的用法：

- 指定Bean的别名：@Bean("alias")
- 指定初始化和销毁方法：@Bean(initMethod="init", destroyMethod="cleanup")

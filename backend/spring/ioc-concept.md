# 容器和核心概念

> 控制反转（Inversion of Control, IOC）

## 组件和组件管理的概念

整个项目就是由各种组件搭建而成的：

![image.jpg](/images/spring/ioc-component.jpg)

**我们期望：**

- 有人替我们创建组件对象
- 有人帮我们保存组件对象
- 有人帮我们自动组装
- 有人替我们管理事务
- 有人协助我们整合其他框架
- ......

<di hlbg>Spring充当管理组件的角色（IOC）</di>

组件可以完全交给Spring框架进行管理，Spring框架替代了程序员原有的<span hl>new对象和对象属性赋值动作</span>等。

Spring具体的管理组件动作包含：

- 组件对象实例化
- 组件对象属性赋值
- 组件对象之间引用
- 组件对象存活周期管理
- ......

我们只需要编写<span hl>元数据（配置文件）</span>告知Spring管理哪些类组件和它们的关系即可。Spring充当组件的容器，创建、管理、存储组件，减少我们的编码压力，让我们更加专注进行业务编写。

> 组件是映射到应用程序中所有可重用组件的Java对象，应该是可复用的功能对象。<span hl>组件一定是对象，对象不一定是组件</span>。

**组件交给Spring管理的优点：**

- 降低了组件之间的<span hl>耦合性</span>：Spring IOC容器通过依赖注入机制，将组件之间的依赖关系削弱，减少了程序组件之间的耦合性，使组件更加松散地耦合
- 提高了代码的<span hl>可重用性和可维护性</span>：将组件实例化的过程、依赖关系的管理等功能交给Spring IOC容器处理，使得组件代码更加模块化、可重用、更易于维护
- 方便了<span hl>配置和管理</span>：Spring IOC容器通过XML文件或注解，轻松的对组件进行配置和管理，使得组件的切换、替换等操作更加的方便和快捷
- 交个Spring管理的对象（组件），<span hl>可享受Spring框架的其他功能（AOP、声明事务管理）等</span>

## 容器和容器的实现

`Spring IOC容器负责实例化、配置和组装组件（bean）。容器通过读取配置元数据来获取有关要实例化、配置和组装组件的指令。<span hl>配置元数据以XML、Java注解或Java代码形式表现</span>。它允许表达组成应用程序以及这些组件之间丰富的相互依赖关系。

![image.jpg](/images/spring/ioc-container.jpg)

### 容器具体接口和实现类

1. 接口

BeanFactory接口提供了一种高级配置机制，能够管理任何类型的对象，它是Spring IOC容器标准化接口。

ApplicationContext是BeanFactory的子接口，它扩展了以下功能：

- 更容易与Spring的AOP功能集成
- 消息资源处理（用于国际化）
- 特定于应用程序给予此接口实现，例如Web应用程序的WebApplicationContext

  2.ApplicationContext容器的实现类：

| 实现类                             | 作用                                                                          |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| ClassPathXmlApplicationContext     | 通过读取类路径的XML格式的配置文件创建IOC容器对象                              |
| FileSystemXmlApplicationContext    | 通过文件系统路径读取XML格式的配置文件创建IOC容器对象                          |
| AnnotationConfigApplicationContext | 通过读取Java配置类创建IOC容器对象                                             |
| WebApplicationContext              | 专门为Web应用准备，基于Web环境创建IOC容器对象，并将对象引入ServletContext域中 |

### 容器管理配置方式

Spring框架提供了多种配置方式：

- XML配置方式：Spring框架最早的配置方式之一，通过在XML文件中定义Bean及其依赖关系、Bean的作用域等信息，让Spring IOC容器来管理Bean之间的依赖关系。
- 注解方式：从<span hl>Spring 2.5版本</span>开始支持，通过在Bean类上使用注解来代替XML配置文件中的配置信息。通过在Bean类上加上相应的注解（如<span hl>@Component、@Service、@Autowired等</span>），将Bean注册到Spring IOC容器中
- Java配置类方式：从<span hl>Spring 3.0版本</span>开始支持，通过Java类来定义Bean、Bean之间的依赖关系和配置信息，从而代替XML配置文件的方式。通过<span hl>@Configuration、@Bean等注解</span>来实现Bean和依赖关系的配置

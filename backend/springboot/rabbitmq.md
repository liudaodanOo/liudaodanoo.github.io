# RabbitMQ

**RabbitMQ**可进行服务之间异步通信。

## 导入依赖

```xml
<!--AMQP依赖，包含RabbitMQ-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

## 配置文件

配置文件位置：resources/application.yml

```yml
spring:
  rabbitmq:
    host: [rabbitmqServerHost]
    port: 5672
    virtual-host: /
    username: [username]
    password: [password]
    listener:
      simple:
        prefetch: 1 # 预先分配1个 能者多劳
```

## 配置类

```java
@Configuration
public class RabbitmqConfiguration {
  /**
   * 添加rabbitmq的数据序列化方式，使用JSON
   * @return
   */
  @Bean
  public MessageConverter messageConverter(){
    return new Jackson2JsonMessageConverter();
  }
}
```

## 基本使用

1. 生产者

```java

@Service
public class DemoServiceImpl {
  @Autowired
  private RabbitTemplate rabbitTemplate;

  public void deleteDemo() {
    //发送消息即可
    rabbitTemplate.convertAndSend("topic.ex","delete.demo", 1);
  }
}
```

2. 消费者

```java
@Component
public class RabbitMQListener {
  /**
   * 监听指定的交换机和key
   * 有对应的消息，即可接受！
   */
  @RabbitListener(
    bindings = @QueueBinding(
      value = @Queue(name = "insert.queue"),
      exchange = @Exchange("topic.ex"),
      key = "delete.demo"
  ))
  public void deleteDemo(Integer demoId) throws IOException {
    // 业务代码
  }
}
```

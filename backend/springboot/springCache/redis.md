# Spring Cache + Redis

## 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

## 配置文件

配置文件位置：resources/application.yml

```yml
spring:
  cache:
    type: redis
  redis:
    host: [redisServerHost]
    port: 6379
    jedis:
      pool:
        max-wait: 2000ms
        min-idle: 2
        max-idle: 8
        max-active: 10
```

## 配置类

```java
@Configuration
public class RedisConfiguration {

  @Bean
  @Primary
  public RedisCacheManager cacheManagerHour(RedisConnectionFactory redisConnectionFactory) {
    RedisConfiguration configuration = instanceConfig(1 * 3600L); // 缓存时间1h

    // 构建缓存对象
    return RedisCacheManager.builder(redisConnectionFactory)
              .cacheDefaults(configuration)
              .transactionAware()
              .build();
  }

  @Bean
  public RedisCacheManager cacheManagerDay(RedisConnectionFactory redisConnectionFactory) {
    RedisConfiguration configuration = instanceConfig(24 * 3600L); // 缓存时间1天

    // 构建缓存对象
    return RedisCacheManager.builder(redisConnectionFactory)
              .cacheDefaults(configuration)
              .transactionAware()
              .build();
  }

  /**
   * 实例化具体的缓存配置!
   *    设置缓存方式JSON
   *    设置缓存时间 单位秒
   * @param ttl
   * @return
   */
  private RedisCacheConfiguration instanceConfig(Long ttl){

      //常见jackson的对象映射器,并设置一些基本属性
      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.configure(MapperFeature.USE_ANNOTATIONS,false);
      objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
      objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);

      //设置jackson序列化工具
      Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer  = new Jackson2JsonRedisSerializer<Object>(Object.class);
      jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

      return RedisCacheConfiguration.defaultCacheConfig()
              .entryTtl(Duration.ofSeconds(ttl)) //设置缓存时间
              .disableCachingNullValues()
              .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer));
  }

}
```

# Spring Cache

**Spring Cache** 是Spring提供的一整套的缓存解决方案，它不是具体的缓存实现，它只提供一整套的接口和代码规范、配置、注解等，用于整合各种缓存方案，比如Redis、Caffeine、Guava Cache、Ehcache。使用注解方式替代原有硬编码方式缓存，语法更加简单优雅。

## Spring Cache注解

### @EnableCaching

需要在启动类添加<b>@EnableCaching</b>注解，开启缓存支持。

```java
@SpringBootApplication
@MapperScan({"com.liudaodan.mapper"})
@EnableCaching
public class DemoApplication {
  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }
}
```

### @Cacheable

<b>@Cacheable</b>注解可添加到方法和类上。调用方法时会查询是否有缓存：有，则直接走缓存；无，则走方法，并缓存方法的返回值。

参数：
| 参数名 | 作用 |
|---|---|
| value | 配置缓存的分区（模块），相当于缓存的标识 |
| key | 缓存分区（模块）下的具体标识，支持根据`SpringEL`表达式动态命名 |
| cacheManager | 选择配置类中的缓存配置对象，不选则走默认 |
| condition | 注解生效的条件，支持`SpringEL`表达式 |

### @CachePut

<b>@CachePut</b>注解可添加到方法和类上。使用方法的返回值对制定的key更新，通常添加到修改方法上。

参数：
| 参数名 | 作用 |
|---|---|
| value | 配置缓存的分区（模块），相当于缓存的标识 |
| key | 缓存分区（模块）下的具体标识，支持根据`SpringEL`表达式动态命名 |
| cacheManager | 选择配置类中的缓存配置对象，不选则走默认 |
| condition | 注解生效的条件，支持`SpringEL`表达式 |

### @CacheEvict

<b>@CacheEvict</b>注解可添加到方法和类上。删除指定key的数据，通常添加到删除方法上。

参数：
| 参数名 | 作用 |
|---|---|
| value | 配置缓存的分区（模块），相当于缓存的标识 |
| key | 缓存分区（模块）下的具体标识，支持根据`SpringEL`表达式动态命名 |
| cacheManager | 选择配置类中的缓存配置对象，不选则走默认 |
| condition | 注解生效的条件，支持`SpringEL`表达式 |
| allEntries | 是否删除缓存中的所有条目 |

### @Caching

<b>@Caching</b>注解可添加到方法和类上。可以包含上面三个注解，用于复杂的缓存策略。

参数：
| 参数名 | 作用 |
|---|---|
| cacheable | @Cacheable[] |
| put | @CachePut[] |
| evict | @CacheEvict[] |

## 整合

- [Redis](/backend/springboot/springCache/redis)

# AOP面向切面编程

## 代理模式

<span hl>代理模式</span>属于结构型模式。其作用是提供一个代理类，当调用目标方法的时候，不直接对目标方法进行调用，而是通过代理类间接调用。让不属于目标方法核心逻辑的代码从目标方法中剥离。减少对目标方法的调用和打扰，让附加功能能够集中在一起，便于统一维护。

![image.jpg](/images/spring/aop-proxy.jpg)

### 静态代理

```java
public class CalculatorStaticProxy implements Calculator {

    // 将被代理的目标对象声明为成员变量
    private Calculator target;

    public CalculatorStaticProxy(Calculator target) {
        this.target = target;
    }

    @Override
    public int add(int i, int j) {

        // 附加功能由代理类中的代理方法来实现
        System.out.println("参数是：" + i + "," + j);

        // 通过目标对象来实现核心业务逻辑
        int addResult = target.add(i, j);

        System.out.println("方法内部 result = " + result);

        return addResult;
    }
}
```

### 动态代理

- JDK动态代理：被代理的类<span hl>必须实现接口</span>，JDK动态代理会根据目标类接口生成一个代理对象，代理对象与目标对象有相同的接口
- cglib：通过继承被代理的类实现代理，不需被代理类实现接口

<span hlbg>基于JDK动态代理技术，生成代理对象</span>

```java
public class ProxyFactory {

  // 用于保存被代理类的实例
  private Object target;

  public ProxyFactory(Object target) {
    this.target = target;
  }

  public Object getProxy() {

    // 被代理类的类加载器
    ClassLoader classLoader = target.getClass().getClassLoader();

    // 被代理类的所有实现的接口类
    Class<?>[] interfaces = target.getClass().getInterfaces();

    // 设置代理类实现目标类方法的过程
    InvocationHandler invocationHandler = new InvocationHandler() {

      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object result = null;

        try {
          System.out.println("Before " + method.getName());
          result = method.invoke(target, args);
          System.out.println("After " + method.getName());
        } catch (Exception e) {
          e.printStackTrace();
          System.out.println("Catch" + method.getName());
        } finally {
          System.out.println("Finally" + method.getName());
        }

        return result;
      }
    }

    // 创建代理类实例
    return Proxy.newProxyInstance(classLoader, interfaces, invocationHandler);
  }

}
```

## 面向切面编程思维 - AOP

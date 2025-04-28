---
title: 快速上手Kotlin
icon: code
order: 1
author: 奇葩的灵梦
pageInfo: ["Author", "PageView", "Date", "Word"]
---

《风声·谍战篇》的服务端采用Kotlin语言进行开发。Kotlin是基于Java虚拟机的一种静态类型编程语言，如果你有Java编程经验，那么学习Kotlin将会非常容易。

本文主要面向有Java编程经验的开发者，将会介绍Kotlin的基本语法和特性，以便于你快速上手《风声·谍战篇》的服务端开发。如果你没有Java编程经验，想要直接上手Kotlin，建议直接在网上搜索Kotlin入门的相关文章。

我们用一个小代码片段，对比一下Java和Kotlin：

::: code-tabs

@tab Java

```java
public class HelloWorld {
    // 这是一个生成斐波那契数列的方法
    public int[] fib(int n) {
        int[] result = new int[n];
        if (n <= 2) {
            Arrays.fill(result, 1);
            return result;
        }
        for (int i = 0; i < n; i++) {
            result[i] = i < 2 ? 1 : result[i - 1] + result[i - 2];
        }
        return result;
    }
}
```

@tab Kotlin

```kotlin
public class HelloWorld {
    // 这是一个生成斐波那契数列的方法
    public fun fib(n: Int): IntArray {
        if (n <= 2) {
            return IntArray(n) { 1 }
        }
        val result = IntArray(n)
        for (i in 0 until n) {
            result[i] = if (i < 2) 1 else result[i - 1] + result[i - 2]
        }
        return result
    }
}
```

:::

我们可以看到，Kotlin和Java的语法非常相似，但是Kotlin更加简洁，省略了Java中的一些冗余代码。

## 函数式编程

大多数开发者对面向对象编程十分了解，例如我们熟知的C++、Java、Python等编程语言都是面向对象编程语言。而Kotlin不仅支持面向对象编程，还支持函数式编程。那么什么是函数式编程呢？

函数式编程（FP）相比面向对象编程（OOP）主要有两个不同点：

- 变量是不可变的，即一旦赋值就不能再改变。想要改变变量的值，只能重新赋值。这样的好处就是在并发的情况下完全不需要加锁，不需要担心多线程同时修改变量的问题。
- 任何一个操作都可以视为函数，函数一定有返回值。

举个例子，`if`语句就可以视为一个简短的函数：

```kotlin
val result =
    if (n <= 2) {
        n++
        -1
    } else if (n >= 10) {
        1
    } else {
        0
    }
```

在上文中，`if`、`else if`和`else`分支的最后一行都是`Int`类型的值，所以可以视为一个简单的函数，当n值不同时返回不同的值。最后将这个返回值赋值给`result`变量。

Kotlin既可以当作普通的面向对象编程语言使用，也可以当作函数式编程语言使用。还是拿`if`语句举例，我们可以用面向对象编程的方式来使用`if`：

```kotlin
val a = 1
if (a < 2) {
    println("a < 2")
}
```

其它语言中的`switch`语句在Kotlin中被称为`when`语句：

```kotlin
// 函数式编程，且when后面带参数
val a = when (b) {
    0, 1 -> "b is 0 or 1"
    2 -> "b is 2"
    else -> { // 函数式编程必须有else分支，保证所有情况都有返回值
        "b is other" // 如果想要写多行，需要用大括号括起来
    }
}

// 面向对象编程，且when后面不带参数
var c = ""
when {
    b < 1 -> c = "b < 1"
    b == 2 -> c = "b is 2"
    else -> c = "b is other" // 面向对象编程可以没有else分支
}
```

## 变量、函数、方法

```kotlin
val a: Int = 3 // 声明一个不可变变量
var b: Int = 2 // 声明一个可变变量
b++ // 可以修改b的值

// 如果类型可推断，可以省略类型声明
val c = 1
var d = 2

// 函数声明，参数可以有默认值，返回值类型写在最后面
fun add(a: Int, b: Int = 1): Int {
    return a + b
}

// 可以简写
fun add2(a: Int, b: Int = 1) = a + b

class HelloWorld {
    // 方法声明
    fun add3(a: Int, b: Int): Int {
        return a + b
    }
}

// 在类外面也可以声明类的方法
fun HellowWorld.add4(a: Int, b: Int) = a + b

// 继承
class HelloWorld2: HelloWorld {
}

// 同时声明类的构造函数和成员变量
class HelloWorld3(val a: Int, val b: Int) {
}

// 调用函数
add(1, 2) // 直接调用
add(b = 2, a = 1) // 可以指定参数名来调用

// 函数可以作为函数的参数
fun doSth(a: Int, cb: (Int) -> Int): Int {
    return cb(a)
}

doSth(1, ::add) // 传入一个合适的函数
// 因为add的第二个参数有默认值，所以可以当作只有一个参数的函数使用

doSth(1, { c -> c + 1 }) // 传入一个lambda表达式（lambda表达式本质就是一个函数，最后一行是返回值）
doSth(1, { it + 1 }) // 可以不声明参数名，直接用it来表示参数
doSth(1) { it + 1 } // 如果函数的最后一个参数是函数，可以放在括号外面
doSth(1) {
    if (it < 10) return@doSth it // lambda表达式可以提前return，但是要加@doSth指定到底返回的是哪个函数，否则会被误认为return外面的大函数。
    it + 1
}
```

## 对集合的优化

相比于Java，Kotlin对集合的操作更加方便。在Kotlin中，`List`就是不可变的列表，`MutableList`、`ArrayList`等就是可变的列表。

Kotlin还有很多方便的集合操作，例如：

```kotlin
val list1 = listOf(2, 4, 6, 8, 10) // 快速声明一个不可变列表
val list2 = List(5) { (it + 1) * 2 } // 和上一行等价

// 一些函数式编程语言中常见的操作
val list3 = list1.map { it * 2 } // 返回一个新列表，其中每个元素都是list1中的每个元素乘以2
val list4 = list1.filter { it > 5 } // 过滤出list1中大于5的元素
val list5 = list1.sum() // 求list1中所有元素的和
val b1 = list1.all { it % 2 == 0 } // 判断list1中所有元素是否都是偶数
val b2 = list1.any { it % 2 == 0 } // 判断list1中是否有偶数
val list6 = list1.sorted() // 对list1进行排序
val list7 = list1 + list2 // 将list1和list2合并，返回一个新的不可变列表
list7.foreach { println(it) }

// 也可以用for循环来遍历list
for (i in list1) {
    println(i)
}
```

Kotlin也支持Java中的集合操作，例如：

```kotlin
val list = mutableListOf(1, 2, 3, 4, 5) // 快速声明一个可变列表
list.add(6) // 向list中添加元素
list += 8 // 向list中添加元素
list[0] = 0 // 修改list中的元素
println(list[0]) // 输出list中的第一个元素
```

`Map`也是类似的，这里不再赘述。

除此之外，范围也是一种可以当作集合来操作的数据结构：

```kotlin
val range = 1..10 // 1到10（闭区间）
val range2 = 1 until 10 // 1到9（左闭右开区间）
val range3 = 10 downTo 1 // 10到1（闭区间，递减）

// 可以把range视为一个列表来操作，用法同上文中的不可变列表
val list4 = range.map { it * 2 }
val list5 = range2 + list4
range3.forEach { println(it) }
for (i in range) {
    println(i)
}
```

由于Kotlin支持函数式编程，我们尽量使用不可变变量，因此尽可能不要使用`Array`，而是用`List`和`MutableList`代替。

## 特殊作用域函数

Kotlin中有一些特殊的作用域函数，可以简化代码的书写：

```kotlin
val a = 3

val b = a.let { // 在这个作用域内，a可以用it来表示
    it + 1
} // 最后一行的值作为函数的返回值，因此b的值为4

val c = a.also { // 在这个作用域内，a可以用it来表示
    it + 1
} // a本身作为函数的返回值，因此c的值为3

val d = a.run { // 在这个作用域内，a可以用this来表示
    this + 1
} // 最后一行的值作为函数的返回值，因此d的值为4

val e = a.apply { // 在这个作用域内，a可以用this来表示
    this + 1
} // a本身作为函数的返回值，因此e的值为3

val f = with (a) { // 在这个作用域内，a可以用this来表示
    this + 1
} // 最后一行的值作为函数的返回值，因此f的值为4
```

在服务端代码中，经常可以看到这样的代码：

::: code-tabs

@tab 简化前

```kotlin
// val p = 当前回合玩家

val players = game.players.filter { it.alive }. // [!code warning]
    filter { p.isEnemy(it) }.ifEmpty {
        game.players.filter { it.alive } // 和上面高亮的那一行重复了 // [!code warning]
    }
```

@tab 简化后

```kotlin
// val p = 当前回合玩家

val players = game.players.filter { it.alive }.run {
    // 过滤出所有存活的玩家后，在run作用域内，所有存活的玩家就可以用this来表示
    filter { p.isEnemy(it) }.ifEmpty { this } // this.filter的this.可以省略
}
```

@tab 拆开写

```kotlin
// val p = 当前回合玩家

val players1 = game.players.filter { it.alive }

val players = players1.filter { p.isEnemy(it) }.ifEmpty { players1 }
// 也可以多声明一个中间变量
```

:::

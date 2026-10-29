---
title: "What an operation actually is in C++"
description: "The three roles in 2 + 3 (operands, operator, return value), why std::cout << 5 counts as an operation too, and why a literal and a variable can produce the same output."
pubDate: 2026-10-29
heroImage: ../../assets/blog/cpp-operation.svg
heroImageAlt: "Diagram: operands 2 and 3 flow into the operator +, which produces the return value 5"
tags: ["c++", "learncpp", "basics"]
---

In maths, `2 + 3` is a calculation. In C++ it has a more precise name: an operation. This post is the written version of the first short in my C++ basics series, based on [learncpp lesson 1.9](https://www.learncpp.com/cpp-tutorial/introduction-to-literals-and-operators/).

## Three roles in one operation

Most operations have the same three parts:

- **Operands** are the inputs. In `2 + 3` these are `2` and `3`.
- The **operator** says what to do with them. Here it is `+`, which C++ calls `operator+`.
- The **return value** is the result of the operation: `5`.

> Operator + operands → return value.

The same holds when it does not look like maths. In `std::cout << 5`, the operator is `<<` and the operands are `std::cout` and `5`. Its return value is not the `5` you see on screen. `operator<<` hands back its left operand, `std::cout`, which is why `std::cout << 5 << '\n'` can be chained. The printing itself is a side effect, and I will get to that in a later post.

("Most" because there are exceptions: `throw` takes no operands, and `delete` returns nothing. That is the next post.)

## The return value has a type, too

I wrote a small macro to make this visible. `#expr` turns the expression into text, and `decltype(expr)` asks the compiler which type the result has:

```cpp
#include <iostream>
#include <string>
#include <type_traits>

template <typename T>
std::string name()
{
    if (std::is_same_v<T, int>) return "int";
    if (std::is_same_v<T, double>) return "double";
    return "?";
}

#define SHOW(expr) \
    std::cout << #expr << " : " << name<decltype(expr)>() << " = " << (expr) << '\n'

int main()
{
    SHOW(2 + 3);
    SHOW(2 + 3.0);
    return 0;
}
```

```
2 + 3 : int = 5
2 + 3.0 : double = 5
```

Same operator, same visible number, different return type. The type of the result depends on the operands. That small difference is where C++ gets interesting, and I will come back to it with a whole post on integer promotion.

## Literal or variable

An operand can come from two places. Compare these two snippets:

```cpp
#include <iostream>

int main()
{
    std::cout << 5 << '\n';
    return 0;
}
```

```cpp
#include <iostream>

int main()
{
    int x { 5 };
    std::cout << x << '\n';
    return 0;
}
```

Both print `5`. I compiled and ran both (and the macro above) with `g++ -std=c++17 -Wall -Wextra` to be sure.

The difference is where the operand comes from:

- `5` is a **literal**, a fixed value written directly into the source code. It always means 5.
- `x` is a **variable**, a named object. Its value can change later.

Literals can be operands, just like variables. Same output, different origin.

## What's next

`2 + 3` has two operands, but not every operator works that way. Next time: how many operands can an operator have?

---
title: "C++ Basics: Variablen, Typen und warum {} die bessere Initialisierung ist"
description: "Was eine Variable in C++ wirklich ist (und was Python-Entwickler anders gewohnt sind), und warum int x{4.5} nicht kompiliert, int x = 4.5 aber schon."
pubDate: 2026-11-16
series: "C++ Basics"
tags: ["c++", "learncpp", "basics", "python", "tdd"]
---

C++ Basics: Variablen, Typen und warum `{}` die bessere Initialisierung ist
===

Teil der Serie „C++ Basics" – ich arbeite mich als Python-Entwickler durch learncpp.com (Kapitel 1.3 und 1.4) und lerne testgetrieben: erst muss der Compiler meckern (rot), dann reparieren wir (grün).

Eine Variable ist ein benanntes Objekt
===

In C++ greifen wir über Objekte auf Speicher zu. Ein Objekt ist ein Speicherbereich, der einen Wert halten kann. Ein Objekt mit Namen heißt Variable. Jede Variable hat:

- einen **Bezeichner (Identifier)**: den Namen,
- einen **Typ**: bestimmt, wie die Bits im Speicher interpretiert werden, wie viel Platz das Objekt braucht und welche Operationen erlaubt sind,
- einen **Wert**.

Das ist ein echter Unterschied zu Python:

| | Python | C++ |
|---|---|---|
| Was ist `x`? | ein Name, der an ein Objekt gebunden ist | das Objekt selbst (benannter Speicher) |
| Wo steckt der Typ? | im Objekt | in der Variable, fest zur Compile-Zeit |
| `x = 5` dann `x = "hi"` | funktioniert | Compilerfehler |

Das lässt sich direkt ausprobieren. Rot:

```cpp
int main() {
    int x{5};
    int x{6};       // Redefinition
    x = "hello";    // falscher Typ
}
```

```text
error: redeclaration of 'int x'
error: invalid conversion from 'const char*' to 'int' [-fpermissive]
```

Dass `x` wirklich ein Ort im Speicher ist, zeigt der Adressoperator – ein Äquivalent dazu gibt es in Python nicht:

```cpp
#include <iostream>

int main() {
    int x{5};
    std::cout << sizeof(x) << ' ' << &x << '\n';  // z. B. "4 0x7fff6cbabe24"
}
```

**Mentales Modell, kein Gesetz:** „Variable = Speicher" stimmt als Denkmodell. Der Compiler prüft Namen und Typen zur Compile-Zeit und darf eine Variable bei Optimierung in einem Register halten oder komplett wegoptimieren.

## Kleiner Stolperstein: Whitespace

`intx = 5;` ist keine Variable, sondern ein unbekannter Bezeichner `intx`. `int x` dagegen ist eine Deklaration: Typ `int`, Name `x`. Das Leerzeichen trennt zwei Tokens. Einrückung ist dem Compiler egal (anders als in Python), deshalb lasse ich die Formatierung von clang-format erledigen.

## Fünf Wege, eine Variable anzulegen

```cpp
int a;          // Default-Initialisierung: Wert unbestimmt (!)
int b = 5;      // Copy-Initialisierung (klassisch, aus C)
int c(5);       // Direct-Initialisierung
int d{5};       // Direct-List-Initialisierung  <- bevorzugt
int e{};        // Value-Initialisierung        <- Wert 0
```

Bei einem `int` liefern `b`, `c`, `d` hier denselben Wert. Warum dann überhaupt `{}`?

## Grund 1: `{}` verbietet Narrowing

Narrowing heißt: Beim Umwandeln geht Information verloren. Probiere es aus:

```cpp
int b = 4.5;    // kompiliert, b ist 4
int c(4.5);     // kompiliert, c ist 4
int d{4.5};     // Fehler!
```

```text
error: narrowing conversion of '4.5e+0' from 'double' to 'int' [-Wnarrowing]
```

Die ersten beiden schneiden die Nachkommastellen stillschweigend ab. Die Klammer-Variante stoppt dich beim Kompilieren, also genau dann, wenn der Fehler am billigsten ist.

## Grund 2: Eine Syntax, die nicht mit Funktionen verwechselt wird

Alles, was der Compiler als Funktionsdeklaration lesen kann, liest er auch so („Most Vexing Parse"):

```cpp
std::string foo();   // KEIN leerer String, sondern eine Funktionsdeklaration
std::string bar{};   // ein leerer String
```

GCC warnt sogar: `empty parentheses were disambiguated as a function declaration`. Den eigentlichen Fehler siehst du dann oft erst später, beim Benutzen der „Variable" (bei mir: `undefined reference to foo`).

## Grund 3: Du gewöhnst dir die Form an, die später überall funktioniert

Bei Klassen, Structs und Containern kommen Listen-Konstruktoren und Aggregat-Initialisierung dazu. Seit C++20 gibt es für Aggregate außerdem Designated Initializers, die Code lesbarer machen:

```cpp
struct Point {
    double x{0.0};
    double y{0.0};
};

Point p{.x = 10.0, .y = 20.0};
```

(Nur für Aggregate, und die Designatoren müssen in Deklarationsreihenfolge stehen.)

## Die Regel

Initialisiere jede Variable bei der Definition, am liebsten mit `int x{5};` oder `int x{};`.

Warum ein nacktes `int a;` gefährlich ist, schauen wir uns im nächsten Beitrag an: Undefined Behavior.

## Mini-Übung (TDD-Stil)

1. **Rot:** Kompiliere das Beispiel oben mit `g++ -std=c++20 -Wall -Wextra -Werror`. Verstehe jede Fehlermeldung.
2. **Grün:** Repariere es (`int y{6};`, `std::string s{"hello"};` oder anderer Typ).
3. **Rot:** Schreibe `int d{4.5};` und lies die Narrowing-Meldung. Ändere auf `double d{4.5};`.
4. **Refactor:** Lass clang-format über die Datei laufen und sieh dir den Diff an.

---
title: "C++ Basics: Undefined Behavior – warum int x; gefährlicher ist, als es aussieht"
description: "Was passiert, wenn man eine uninitialisierte Variable liest? Ein echter Test mit GCC und Clang zeigt: alles Mögliche – und genau das ist das Problem."
pubDate: 2026-11-16
series: "C++ Basics"
tags: ["c++", "learncpp", "basics", "undefined-behavior", "tdd"]
---

C++ Basics: Undefined Behavior – warum `int x;` gefährlicher ist, als es aussieht
===

Teil der Serie „C++ Basics", learncpp.com Kapitel 1.6 (uninitialisierte Variablen und Undefined Behavior). Vorheriger Beitrag: [Variablen, Typen und `{}`](/blog/cpp-basics-variables-types-braced-init/).

In Python gibt es kein „uninitialisiert": Ein Name existiert erst, wenn du ihm etwas zugewiesen hast, sonst gibt es einen `NameError`. In C++ ist das anders.

## Das Problem

```cpp
#include <iostream>

int main() {
    int x;                  // Default-Initialisierung
    std::cout << x << '\n'; // ???
}
```

`int x;` legt Speicher an, schreibt aber nichts hinein. Dort liegt, was vorher dort lag. Das Lesen dieses Werts ist **Undefined Behavior (UB)**. Historisch ist das ein C-Erbe: Nicht zu initialisieren spart Zeit. Heute sind die Kosten des Initialisierens minimal, der Nutzen groß.

## Was UB bedeutet

Der C++-Standard legt für UB kein Verhalten fest. Der Compiler darf alles tun, zum Beispiel:

- bei jedem Lauf ein anderes Ergebnis liefern,
- immer dasselbe falsche Ergebnis liefern,
- abstürzen, sofort oder erst später,
- auf einem Compiler funktionieren und auf einem anderen nicht,
- „zufällig" richtig laufen, bis du etwas Unverwandtes änderst.

Das letzte ist das Gemeinste. Deshalb habe ich es gemessen.

## Der Test: gleicher Code, vier Ergebnisse

Mit `-Wall -Wextra` warnt GCC beim einfachen Beispiel noch:

```text
warning: 'x' is used uninitialized [-Wuninitialized]
```

Und die Ausgabe? Bei GCC 13.3 mit `g++ -std=c++20`:

| Build | Ausgabe |
|---|---|
| `-O0`, Lauf 1 | 32765 |
| `-O0`, Lauf 2 | 32764 |
| `-O2`, beide Läufe | 0 |

Unter `-O2` sieht es also „stabil" aus (immer 0), und genau das ist die Falle: Es ist trotzdem kein garantiertes Verhalten.

Jetzt eine Variante, bei der die Warnung schweigt:

```cpp
#include <iostream>

void fill(int* p, bool do_it) { if (do_it) *p = 42; }

int main(int argc, char**) {
    int x;
    fill(&x, argc > 5);       // beim normalen Start ist argc == 1 -> false
    std::cout << x << '\n';
}
```

`-Wall -Wextra` meldet hier nichts. Ausgabe:

| Compiler | -O0 | -O2 |
|---|---|---|
| GCC 13.3 | 0 | 42 |
| Clang 18 | 32753 | 42 |

Mit `-O2` erscheint 42, obwohl `fill` den Wert nie geschrieben hat. Der Optimierer darf annehmen, dass das Programm kein UB enthält, und leitet daraus ab, dass `x` gesetzt worden sein muss. (Die genauen Zahlen hängen von Compiler, Version und System ab. Das ist der Punkt.)

## Verwandte Begriffe

- **Implementation-defined:** Der Compiler entscheidet, muss es aber dokumentieren. Beispiel: `sizeof(int)`.
- **Unspecified:** Es gibt mehrere erlaubte Ergebnisse, der Compiler muss nicht sagen, welches.
- **Undefined:** Der Standard stellt gar keine Anforderungen mehr.

Möglichst alle drei vermeiden, damit Code überall gleich reagiert.

## Die Gegenmaßnahmen

- Immer initialisieren: `int x{};` oder `int x{0};`.
- Warnungen an und als Fehler behandeln: `-Wall -Wextra -Werror`.
- Nicht auf Debug-Muster verlassen: MSVC füllt Debug-Builds oft mit `0xCCCCCCCC`, Release-Builds nicht.
- Sanitizer nutzen: Der UBSan (`-fsanitize=undefined`) meldet das Lesen uninitialisierter Werte nicht (ich habe es ausprobiert, es druckte einfach 32767). Dafür ist MemorySanitizer da (Clang: `-fsanitize=memory`).

## Mini-Übung (TDD-Stil)

1. **Rot:** Kompiliere das erste Beispiel mit `-Wall -Wextra -Werror`. Der Build muss scheitern.
2. **Grün:** `int x{};`: Build läuft, Ausgabe 0.
3. **Experiment:** Baue das `fill`-Beispiel mit `-O0` und `-O2`, mit GCC und Clang. Vergleiche die Ausgabe.
4. **Merke:** „Bei mir läuft es" ist bei UB kein Beweis.

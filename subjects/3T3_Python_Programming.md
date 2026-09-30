# 🐍 Paper 3: 3T3 — Python Programming

> **Program**: Master in Computer Application (MCA - 2 Years CBCS) — Semester III  
> **Course Code**: 3T3 | **Type**: Core Theory  
> **Credits**: 4 Credits (4 Hours/Week)  
> **Marks Scheme**: 80 Marks (University Theory Exam) + 20 Marks (Internal Assessment) = **100 Marks**  
> **Passing Standard**: Minimum 40 Marks in Theory  

---

## 🎯 Course Objectives & Outcomes
- Master Python language constructs, built-in types, data structures, and functions.
- Implement Object-Oriented Programming (OOP), modular programming, and robust exception handling.
- Leverage built-in functions, OS modules, multi-threading, and persistent file I/O operations.
- Build network clients/servers, multimedia applications, web applications (CGI), and understand Python runtime architecture.

---

## 📖 Detailed Unit-Wise Syllabus

### 🔹 Unit 1: Python Fundamentals, Data Structures, Functions & OOP
* **Python Introduction & Fundamentals**:
  * What is Python? History, Philosophy, Python vs. Other Languages (C, Java, Perl).
  * Execution Models: Interactive Shell, Running Scripts/Files, Modules.
  * Python Lexical Components: Comments, Indentation, Statement formatting, Print function.
  * **Built-in Object Types**:
    * Numbers (Integers, Floats, Complex), Operators & Precedence.
    * Sequences: Strings, Lists, Tuples (indexing, slicing, operations).
    * Mapping & Sets: Dictionaries, Sets, Object storage, Type conversion and comparisons.
    * Control Flow: `if-elif-else`, `for` loop, `while` loop, `break`, `continue`, `pass`, Common traps.
* **Functions & Modular Programming**:
  * Function definition (`def`), Execution, Return values.
  * **Scoping Rules**: The LGB Rule (Local, Global, Built-in), `global` keyword, Scope traps.
  * **Arguments**: Positional, Keyword arguments, Default arguments, Variable-length arguments (`*args`, `**kwargs`).
  * **Advanced Function Concepts**: `apply()`, `map()`, `filter()`, Indirect function calls, Anonymous functions (`lambda`).
  * **Modules & Packages**: Creating modules, `import` statement, `from ... import`, Module search path, `__init__.py`.
* **Object-Oriented Programming & Exception Handling**:
  * Classes and Instances: `class` definition, `__init__()` constructor, `self` reference, Methods.
  * Inheritance, Polymorphism, Encapsulation.
  * **Exception Handling**: `try-except` block, Multiple `except` clauses, `else`, `finally`, `raise`, Built-in vs. Custom user-defined exceptions.

---

### 🔹 Unit 2: Built-in Functions, OS Interfacing & Information Processing
* **Python Built-In Reflection & System Functions**:
  * `__import__(name[, globals, locals, fromlist])`
  * `apply(function, args[, keywords])`
  * `getattr(object, name[, default])`, `setattr(object, name, value)`
  * `hash(object)`, `id(object)`, `isinstance(object, classinfo)`
  * `list(sequence)`, `str(object)`, `type(object)`
* **Operating System & System Interfacing**:
  * **System Module (`sys`)**: Command line arguments (`sys.argv`), `sys.path`, `sys.exit()`, standard streams (`sys.stdin`, `sys.stdout`).
  * **OS Module (`os`)**: Environment variables, Working directory (`os.getcwd()`, `os.chdir()`), Filesystem manipulation (`os.listdir()`, `os.mkdir()`, `os.remove()`).
  * **Multithreading**: `threading` module, Thread lifecycle, Thread creation, Locks, and Synchronization.
* **Information Processing**:
  * Number manipulation & Math module.
  * Advanced Text Manipulation & String formatting.
  * Date and Time operations (`time`, `datetime` modules).
  * Data types, Operators, and Unicode string handling (`utf-8`).

---

### 🔹 Unit 3: File Handling, Network Communication & RAD
* **Working with Files & I/O Control**:
  * File processing lifecycle: `open()`, `read()`, `readline()`, `readlines()`, `write()`, `writelines()`, `close()`.
  * File Pointer Navigation: `seek()`, `tell()`.
  * Controlling File I/O: File locking, Directory management, Checking access and ownership (`os.stat()`, `os.chmod()`), Setting file permissions, Manipulating file paths (`os.path`).
* **Network & Multimedia Communication**:
  * Socket Programming: Creating TCP/IP Network Server and Client modules (`socket` module).
  * Handling internet data protocols (HTTP, FTP, SMTP).
  * Using Python for Multimedia: Audio modules, Graphic modules.
* **Python as a Rapid Application Development (RAD) Tool**:
  * What RAD really is & Why Python excels at RAD.
  * Python Standard Library utilization and IDE ecosystems.
  * **Distributing Python Modules**: Using `distutils` / `setuptools`, creating setup scripts (`setup.py`), Packaging and distribution.

---

### 🔹 Unit 4: Web Development, Markup Processing & Python Architecture
* **Web Development Basics**:
  * Web fundamentals: Writing HTML, URLs, HTTP Request/Response.
  * Dynamic Websites using **CGI (Common Gateway Interface)** (`cgi` module).
  * Managing Web State: Handling Cookies and Sessions.
  * Web Application Security considerations in Python.
* **Standard Markup Language Processing**:
  * Processing SGML.
  * Processing HTML (`html.parser`, BeautifulSoup basics).
  * Processing XML (`xml.etree.ElementTree`, SAX, DOM).
* **Python Web Frameworks & Environments**:
  * Overview of Zope, The Z-Objects, Publishing Environment.
  * Python web servers: SocketServer, BaseHTTPServer, Medusa, Apache integration with `mod_python`.
  * Python Implementations: Jython (Java integration), Python.NET (CLR integration), Python Server Pages (PSP), Active Scripting.
* **Python Internals & Architecture**:
  * Cross-platform execution environments, Line termination, Character sets, Files & Pathnames.
  * **Internal Architecture**: Namespaces, Code Blocks, Frames, Tracebacks.
  * Built-in Types: Callable object types, Modules, Classes, Class instances, Internal types.
  * **Python Bytecode**: `.pyc` files, Bytecode disassembly (`dis` module), Bytecode instructions & opcodes.

---

## 📚 Prescribed Reference Books
1. 📖 **The Complete Reference Python** — Martin C. Brown, Tata McGraw-Hill Publication.
2. 📖 **Programming in Python 3** — Mark Summerfield, Addison-Wesley.
3. 📖 **Beginning Python From Novice to Professional** — Magnus Lie Hetland, Apress.
4. 📖 **Taming Python by Programming** — Jeeva Jose, Khanna Publishing.
5. 📖 **Introduction to Computing and Problem Solving with Python** — Jeeva Jose, Khanna Publishing.
6. 📖 **Python Programming** — Seema Thareja, Pearson.

---

## 📝 Examination Pattern (80 Marks Theory)
- **Exam Duration**: 3 Hours | **Total Questions**: 5 (16 Marks Each)
- **Q1**: Unit 1 (With Internal `OR` choice) — [16 Marks]
- **Q2**: Unit 2 (With Internal `OR` choice) — [16 Marks]
- **Q3**: Unit 3 (With Internal `OR` choice) — [16 Marks]
- **Q4**: Unit 4 (With Internal `OR` choice) — [16 Marks]
- **Q5**: Compulsory Question covering 4 sub-questions (4 marks each) from Units 1 to 4 — [16 Marks]

---

## 🧪 Practical Lab Connection (3P1)
- Programming in Python for data structures, OOP design, OS/file operations, socket communication, database connectivity, and web CGI scripts.


---

## 🏛️ Official University Previous Year Questions (RTMNU PYQs)

> **100% Verified University Papers (Winter 2023 – Summer 2025)**  
> Complete question papers, unit-wise question banks, and original scan sheets are available in the [PYQ Repository](../pyq/3T3_Python_Programming/3T3_Python_Programming_PYQ_Master.md).

### 📑 Available Papers for this Subject:
- [3T3 Summer 2025](../pyq/3T3_Python_Programming/3T3_Summer_2025.md)\n- [3T3 Winter 2023](../pyq/3T3_Python_Programming/3T3_Winter_2023.md)\n- [3T3 Winter 2024](../pyq/3T3_Python_Programming/3T3_Winter_2024.md)\n\n👉 **[Open Complete 3T3_Python_Programming PYQ Master Bank & Unit Mapping](../pyq/3T3_Python_Programming/3T3_Python_Programming_PYQ_Master.md)**\n
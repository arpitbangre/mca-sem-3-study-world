# 🤖 Paper 4: 3T4 (CE2-1) — Artificial Intelligence

> **Program**: Master in Computer Application (MCA - 2 Years CBCS) — Semester III  
> **Course Code**: 3T4 | **Type**: Core Elective 2 (Option CE2-1)  
> **Credits**: 4 Credits (4 Hours/Week)  
> **Marks Scheme**: 80 Marks (University Theory Exam) + 20 Marks (Internal Assessment) = **100 Marks**  
> **Passing Standard**: Minimum 40 Marks in Theory  

---

## 🎯 Course Objectives & Outcomes
- Understand foundational AI concepts, problem formulations, and state space representation.
- Master heuristic and informed search strategies (A* Algorithm, AO* Algorithm, Hill Climbing, Best-First Search).
- Understand Knowledge Representation using First-Order Predicate Logic, Resolution, and Natural Deduction.
- Learn Game Theory (Minimax with Alpha-Beta pruning), Planning algorithms, and Natural Language Processing (NLP).

---

## 📖 Detailed Unit-Wise Syllabus

### 🔹 Unit 1: AI Problems, State Space Search & Heuristic Algorithms
* **AI Foundations & Problem Formulation**:
  * What is Artificial Intelligence? AI problems, AI techniques.
  * Classic Benchmark Problems: Tic-tac-toe, Question Answering, Water Jug Problem, 8-Puzzle Problem, Missionaries and Cannibals.
  * Defining the Problem as a **State Space Search**.
  * **Production Systems**: Production rules, Working memory, Control strategies, Conflict resolution.
  * Problem Characteristics (Decomposable vs. Non-decomposable, Ignorable vs. Recoverable vs. Irrecoverable, Predictable vs. Non-predictable).
  * Production System Characteristics (Monotonic, Non-monotonic, Commutative, Partially Commutative).
  * Design of Search Programs.
* **Search Algorithms**:
  * **Uninformed (Blind) Search**:
    * Depth-First Search (DFS) — Algorithm, Space/Time Complexity, Advantages & Limitations.
    * Breadth-First Search (BFS) — Algorithm, Space/Time Complexity, Advantages & Limitations.
    * Generate-and-Test Strategy.
  * **Informed (Heuristic) Search**:
    * Heuristic Functions and Heuristic Search Principles.
    * Hill Climbing (Simple Hill Climbing, Steepest Ascent Hill Climbing, Simulated Annealing, Local Maxima, Plateaus, Ridges).
    * Best-First Search & Greedy Search.
    * Constraint Satisfaction Problems (CSP) — Cryptarithmetic problems, Backtracking search.
    * Means-Ends Analysis (Difference vectors, Operator selection, Goal stack).
  * **Optimal Heuristic Search**:
    * **A* Algorithm**: Evaluation function f(n) = g(n) + h(n), Admissibility condition (h(n) <= h*(n)), Completeness, Optimality proof.
    * **AO* Algorithm**: AND-OR Graphs, Non-decomposable subproblems, Cost evaluation, Tree pruning.

---

### 🔹 Unit 2: Knowledge Representation, Predicate Logic & Inference
* **Knowledge Representation (KR)**:
  * Representations and Mappings (Facts, Internal representations, Mappings).
  * Approaches to Knowledge Representation: Relational, Inheritable, Inferential, Procedural.
  * Issues in Knowledge Representation: Important attributes, Relationship granularity, Representation of sets, Finding right structures.
* **Predicate Logic in AI**:
  * Propositional Logic vs. First-Order Predicate Logic (FOPL).
  * Representing Simple Facts in Logic: Predicates, Variables, Constants, Universal and Existential Quantifiers.
  * Representing Instance and Isa Relationships.
  * Computable Functions and Predicates.
* **Inference and Automated Reasoning**:
  * **Resolution**:
    * Conversion to Clause Form (Skolemization, Eliminating quantifiers, CNF).
    * Propositional Resolution & Resolution in Predicate Logic.
    * **Unification Algorithm**: Most General Unifier (MGU), Occur Check.
  * **Natural Deduction** and Axiomatic systems.
  * **Logic Programming**: Horn Clauses, Foundations of Prolog.
  * **Forward vs. Backward Reasoning**: Data-driven vs. Goal-driven systems, Selection criteria.
  * Matching Algorithms and Control Knowledge.

---

### 🔹 Unit 3: Adversarial Search (Game Playing) & Planning Systems
* **Adversarial Search (Game Playing)**:
  * Game Playing as Search Problem.
  * **Minimax Search Procedure**: Game tree evaluation, Max and Min nodes, Backtracking payoff values.
  * **Alpha-Beta (α-β) Pruning**: Alpha cutoff, Beta cutoff, Mathematical conditions for pruning branches, Node ordering efficiency.
  * Additional Refinements in Game Playing: Horizon effect, Secondary search, Transposition tables.
* **Planning Systems**:
  * Why Planning? State Space vs. Plan Space.
  * Components of a Planning System: Choosing operations, Applying rules, Detecting state changes.
  * **Goal Task Planning**: Goal Stack Planning (STRIPS operators: Preconditions, Add list, Delete list).
  * Block World Problem formulation and Sussman Anomaly.
  * **Nonlinear Planning**: Using Constraint Posting.
  * **Hierarchical Planning**: Non-linear hierarchical planning, Abstract planning levels.

---

### 🔹 Unit 4: Natural Language Processing & Advanced AI Architectures
* **Understanding & Cognitive Processing**:
  * Understanding mechanisms: What is understanding? What makes understanding hard?
  * Understanding as Constraint Satisfaction.
* **Natural Language Processing (NLP)**:
  * Levels of Language Analysis: Phonological, Morphological, Syntactic, Semantic, Pragmatic, Discourse.
  * **Syntactic Processing**: Context-Free Grammars (CFG), Transition Networks (RTN, ATN), Parsing.
  * **Unification Grammars**.
  * **Semantic Analysis**: Semantic Grammars, Conceptual Dependency (CD) theory, Scripts.
* **Advanced AI Architectures**:
  * Parallel and Distributed AI.
  * Psychological Modeling and Cognitive Architectures.
  * Distributed Reasoning Systems & Multi-Agent Systems.

---

## 📚 Prescribed Reference Books
1. 📖 **Artificial Intelligence** — Elaine Rich, Kevin Knight, Shivashankar B. Nair, Tata McGraw-Hill.
2. 📖 **Artificial Intelligence: A Modern Approach** — Stuart Russell, Peter Norvig, Pearson Education.
3. 📖 **A First Course in Artificial Intelligence** — Deepak Khemani, McGraw-Hill.
4. 📖 **Artificial Intelligence and Expert Systems** — Jankiraman, K. Sarukesi, Macmillan.
5. 📖 **Lisp Programming** — Rajeev Sangal, Tata McGraw-Hill.

---

## 📝 Examination Pattern (80 Marks Theory)
- **Exam Duration**: 3 Hours | **Total Questions**: 5 (16 Marks Each)
- **Q1**: Unit 1 (Search & Heuristics) with Internal OR choice — [16 Marks]
- **Q2**: Unit 2 (Knowledge Representation & Resolution) with Internal OR choice — [16 Marks]
- **Q3**: Unit 3 (Game Trees & Planning) with Internal OR choice — [16 Marks]
- **Q4**: Unit 4 (NLP & Advanced AI) with Internal OR choice — [16 Marks]
- **Q5**: Compulsory Question covering 4 sub-questions (4 marks each) from Units 1 to 4 — [16 Marks]

---

## 🧪 Practical Lab Connection (3P2)
- Hands-on implementation in Python: Water Jug Problem, 8-Puzzle solver, DFS/BFS graph traversals, A* Algorithm and AO* Algorithm pathfinding, Minimax with Alpha-Beta pruning, and Resolution logic.

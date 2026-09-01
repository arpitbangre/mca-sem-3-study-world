# 🧠 Paper 5: 3T5 — Soft Computing

> **Program**: Master in Computer Application (MCA - 2 Years CBCS) — Semester III  
> **Course Code**: 3T5 | **Type**: Core Theory  
> **Credits**: 4 Credits (4 Hours/Week)  
> **Marks Scheme**: 80 Marks (University Theory Exam) + 20 Marks (Internal Assessment) = **100 Marks**  
> **Passing Standard**: Minimum 40 Marks in Theory  

---

## 🎯 Course Objectives & Outcomes
- Understand the paradigms of Soft Computing vs. Hard Computing and computational intelligence.
- Master Artificial Neural Networks (ANN): Perceptron, Backpropagation, Hopfield, and Kohonen SOM.
- Learn statistical reasoning (Bayesian networks, Dempster-Shafer theory) and heuristic game search.
- Master Fuzzy Logic principles, fuzzy sets, fuzzy relations, fuzzification, defuzzification, and fuzzy control systems.

---

## 📖 Detailed Unit-Wise Syllabus

### 🔹 Unit 1: Introduction to Soft Computing & Statistical Reasoning
* **Foundations of Soft Computing**:
  * Introduction: What is Soft Computing? Soft Computing vs. Hard Computing.
  * Core constituents of Soft Computing (Fuzzy Logic, Neural Computing, Evolutionary Computing).
  * Computational Intelligence and real-world applications.
* **Problem Space & Search Algorithms**:
  * Graph searching paradigms.
  * Search Algorithms: Breadth-First Search (BFS), Depth-First Search (DFS).
  * Heuristic Search Techniques: Best-First Search, A* Algorithm, AO* Algorithm.
* **Game Playing & Advanced Search**:
  * Minimax Search Procedure, Adding Alpha-Beta (α-β) cutoffs, Game heuristic refinements.
  * Iterative Deepening Search.
* **Statistical Reasoning & Uncertainty Handling**:
  * Probability theory and **Bayes Theorem**.
  * Certainty Factors and Rule-Based Expert Systems.
  * **Bayesian Networks**: Directed Acyclic Graphs (DAG), Conditional probability tables.
  * **Dempster-Shafer Theory**: Belief function, Plausibility, Evidence combination.

---

### 🔹 Unit 2: Artificial Neural Networks (ANN) & Supervised Learning
* **Biological vs. Artificial Neural Networks**:
  * Biological Neural Network: Structure of human brain, Neuron anatomy, Synapse, Learning methodologies.
  * Artificial Neural Network (ANN): Evolution of ANN, Basic mathematical neuron model, ANN vs. Human brain.
* **Fundamental Concepts & Models**:
  * **McCulloch-Pitts Neuron Model**: Threshold logic, Implementing logic gates (AND, OR, NOT).
  * Activation Functions: Step, Sigmoid, Hyperbolic Tangent (tanh), ReLU, Linear.
  * Learning Types: Supervised, Unsupervised, Reinforcement Learning.
  * ANN Architectures: Single-layer feedforward, Multi-layer feedforward, Recurrent networks.
* **Learning Rules & Network Architectures**:
  * **Hebbian Learning Rule**.
  * **Single-Layer Perceptron**: Perceptron learning theorem, Weights update, Bias.
  * **Linear Separability Problem** (XOR Problem).
  * **Widrow-Hoff / Delta Learning Rule** (Least Mean Squares - LMS).
  * Winner-Take-All Learning.
  * **Adaline** (Adaptive Linear Neuron) & **Madaline** (Many Adaline) Networks.
* **Multilayer Perceptron (MLP) & Backpropagation**:
  * Architecture of Multi-layer Feedforward Network.
  * **Error Backpropagation Algorithm (EBPA)**: Mathematical derivation of weight adjustments, Output layer error, Hidden layer error.
  * Momentum factor and learning rate tuning.
  * Limitations of Backpropagation (Local minima, Slow convergence).
  * Industrial and Engineering Applications of Neural Networks.

---

### 🔹 Unit 3: Unsupervised Learning & Self-Organizing Networks
* **Unsupervised Learning Neural Networks**:
  * **Counterpropagation Network (CPN)**: Architecture, Full CPN vs. Forward-Only CPN, Functioning, Training steps, and Characteristics.
* **Associative Memory Networks**:
  * Autoassociative vs. Heteroassociative Memory.
  * **Hopfield Network**: Discrete and Continuous Hopfield models, Energy function, Stability, Storage capacity.
  * **Bidirectional Associative Memory (BAM)**: Architecture, Energy matrix, Recall algorithm.
* **Adaptive Resonance Theory (ART)**:
  * Motivation: Stability-Plasticity Dilemma.
  * ART Architecture: Comparison layer, Recognition layer, Reset mechanism, Attentional subsystem.
  * Classifications: ART1 (binary input) vs. ART2 (continuous input), Implementation & Training workflow.
* **Kernel Methods & Self-Organizing Systems**:
  * **Support Vector Machines (SVM)**: Architecture, Maximum margin classifiers, Soft margin, Kernel functions, SVM training algorithms.
  * **Kohonen Self-Organizing Map (SOM)**: Biological motivation, Architecture, Competitive process, Cooperative process, Adaptive process, Algorithm and visualization.

---

### 🔹 Unit 4: Fuzzy Systems, Fuzzy Logic & Control Systems
* **Fuzzy Set Theory Fundamentals**:
  * Introduction & Need for Fuzzy Logic.
  * **Classical Sets (Crisp Sets) vs. Fuzzy Sets**: Characteristic function vs. Membership function.
  * Operations on Crisp Sets vs. Fuzzy Sets (Union, Intersection, Complement, Algebraic sum, Product).
  * Properties of Fuzzy Sets (Commutative, Associative, Distributive, De Morgan’s laws).
  * Interval Arithmetics.
  * **Fuzzy Relations**: Crisp relations vs. Fuzzy relations, Max-Min composition, Max-Product composition.
  * **Membership Functions**: Triangular, Trapezoidal, Gaussian, Sigmoidal membership shapes.
* **Fuzzy Rule Base Systems**:
  * Linguistic variables and fuzzy propositions.
  * Formation, decomposition, and aggregation of fuzzy IF-THEN rules.
  * **Fuzzy Reasoning & Fuzzy Inference Systems (FIS)**:
    * Mamdani Fuzzy Inference System.
    * Takagi-Sugeno-Kang (TSK) Fuzzy Model.
  * **Fuzzification**: Converting crisp inputs into fuzzy values.
  * **Defuzzification Methods**:
    * Centroid / Center of Gravity (COG) Method.
    * Mean of Maximum (MOM) Method.
    * Center of Sums (COS) Method.
    * First / Last of Maxima Method.
  * **Fuzzy Associative Memory (FAM)**.
  * **Fuzzy Logic Theory, Modeling & Control Systems**: Applications in industrial automated temperature/speed control.

---

## 📚 Prescribed Reference Books
1. 📖 **Principles of Soft Computing** — S.N. Sivanandam, S.N. Deepa, Wiley India.
2. 📖 **Computational Intelligence: A Logical Approach** — David Poole, Alan Mackworth, Oxford University Press.
3. 📖 **Introduction to Evolutionary Computing** — A.E. Eiben, J.E. Smith, Springer.
4. 📖 **Genetic Algorithms and Fuzzy Logic Systems: Soft Computing Perspectives** — E. Sanchez, T. Shibata, L.A. Zadeh, World Scientific.

---

## 📝 Examination Pattern (80 Marks Theory)
- **Exam Duration**: 3 Hours | **Total Questions**: 5 (16 Marks Each)
- **Q1**: Unit 1 (Soft Computing, Heuristics & Bayes) with Internal OR choice — [16 Marks]
- **Q2**: Unit 2 (ANN, Perceptron & Backpropagation) with Internal OR choice — [16 Marks]
- **Q3**: Unit 3 (Unsupervised NN, Hopfield, ART, SOM & SVM) with Internal OR choice — [16 Marks]
- **Q4**: Unit 4 (Fuzzy Sets, Fuzzification, Defuzzification & Fuzzy Control) with Internal OR choice — [16 Marks]
- **Q5**: Compulsory Question covering 4 sub-questions (4 marks each) from Units 1 to 4 — [16 Marks]

---

## 🧪 Practical Lab Connection (3P2)
- Hands-on implementation in Python: McCulloch-Pitts neuron, Single layer perceptron learning, Backpropagation MLP network, Hopfield memory, Fuzzy set operations, and Defuzzification algorithms.

# ⛏️ Paper 2: 3T2 — Data Mining

> **Program**: Master in Computer Application (MCA - 2 Years CBCS) — Semester III  
> **Course Code**: 3T2 | **Type**: Core Theory  
> **Credits**: 4 Credits (4 Hours/Week)  
> **Marks Scheme**: 80 Marks (University Theory Exam) + 20 Marks (Internal Assessment) = **100 Marks**  
> **Passing Standard**: Minimum 40 Marks in Theory  

---

## 🎯 Course Objectives & Outcomes
- Understand foundational concepts, data preprocessing techniques, and data quality issues.
- Perform exploratory data analysis, summary statistics, and multi-dimensional visualization.
- Learn core data mining tasks: **Classification**, **Association Rule Mining**, and **Cluster Analysis**.
- Master industry standard algorithms (Apriori, FP-Tree, Decision Trees, Naive Bayes, K-Means, DBSCAN).

---

## 📖 Detailed Unit-Wise Syllabus

### 🔹 Unit 1: Foundations & Data Preprocessing
* **Introduction to Data Mining**:
  * What is Data Mining? Definition, Knowledge Discovery in Databases (KDD) process.
  * Motivating Challenges and Origins of Data Mining.
  * Primary Data Mining Tasks: Predictive (Classification, Regression) vs. Descriptive (Clustering, Association, Anomaly).
* **Data Types and Quality**:
  * Types of Data: Attributes and Measurement scales (Nominal, Ordinal, Interval, Ratio).
  * Characteristics of Data Sets: Dimensionality, Sparsity, Resolution.
  * Data Quality Issues: Noise, Outliers, Missing Values, Duplicate Data.
* **Data Preprocessing Techniques**:
  * **Data Aggregation**: Combining multiple objects/attributes.
  * **Sampling**: Simple Random Sampling, Stratified Sampling, Progressive Sampling.
  * **Dimensionality Reduction**: Principal Component Analysis (PCA), Feature Selection.
  * **Feature Subset Selection & Creation**: Embedded, Filter, and Wrapper approaches.
  * **Discretization and Binarization**: Equal-width, Equal-frequency, Entropy-based discretization.
  * **Variable Transformation**: Normalization (Min-Max, Z-score), Logarithmic transforms.

---

### 🔹 Unit 2: Data Exploration & Classification Foundations
* **Exploratory Data Analysis (EDA)**:
  * Benchmark Dataset Study: **The Iris Data Set**.
  * **Summary Statistics**:
    * Measures of Location: Mean, Median, Mode.
    * Measures of Spread: Range, Variance, Standard Deviation, Interquartile Range (IQR).
    * Percentiles, Quartiles, and Multivariate Summary Statistics (Covariance, Correlation Matrix).
* **Data Visualization**:
  * Techniques: Histograms, Box Plots, Scatter Plots, Contour Plots, Matrix Plots, Parallel Coordinates.
  * Visualizing Higher-Dimensional Data.
  * **OLAP (Online Analytical Processing)** & Multidimensional Data Analysis: Roll-up, Drill-down, Slice, Dice, Pivot.
* **Classification Basics & Decision Trees**:
  * Problem Definition & General Approach to Solving Classification Problems.
  * **Decision Tree Induction**: Hunt’s Algorithm, Attribute Selection Measures (Information Gain / Entropy, Gini Index, Gain Ratio).
  * **Model Evaluation**:
    * Training vs. Testing error, Overfitting and Underfitting.
    * Performance Metrics: Confusion Matrix, Accuracy, Precision, Recall, F1-Score, ROC Curve, AUC.
    * Methods for Comparing Classifiers: Holdout, Cross-Validation (K-Fold, Leave-One-Out), Bootstrapping.

---

### 🔹 Unit 3: Advanced Classification & Association Analysis
* **Alternative Classification Techniques**:
  * **Rule-Based Classifiers**: Rule structure, Rule ordering schemes (Rule-based vs. Class-based), Sequential covering algorithm.
  * **Nearest Neighbor Classifiers (k-NN)**: Distance metrics (Euclidean, Manhattan), Choice of $k$, Lazy vs. Eager learning.
  * **Bayesian Classifiers**: Bayes Theorem, **Naive Bayes Classifier**, Conditional independence assumption.
  * **Artificial Neural Networks (ANN)**: Perceptron model, Multi-layer networks.
  * **Support Vector Machines (SVM)**: Maximum margin hyperplanes, Linear vs. Non-linear SVM, Kernel trick.
* **Association Analysis & Frequent Itemset Mining**:
  * Problem Definition: Market Basket Analysis, Itemsets, Support, Confidence, Lift.
  * **The Apriori Principle**: Support monotonicity, Candidate Generation ($L_{k-1} \times L_{k-1}$), Candidate Pruning, Support Counting.
  * Computational Complexity of Apriori.
  * Rule Generation from Frequent Itemsets.
  * Compact Representation of Frequent Itemsets: Maximal Itemsets, Closed Itemsets.
  * **FP-Growth Algorithm**: FP-Tree construction without candidate generation, Conditional Pattern Base, mining FP-Trees.

---

### 🔹 Unit 4: Cluster Analysis & Anomaly Detection
* **Cluster Analysis Basics**:
  * What is Cluster Analysis? Types of Clustering (Partitional vs. Hierarchical, Exclusive vs. Overlapping, Complete vs. Partial).
  * Types of Clusters: Well-separated, Prototype-based, Graph-based, Density-based.
* **Clustering Algorithms**:
  * **K-Means Clustering**: Algorithm, Objective function (SSE), Centroid selection, Handling empty clusters, Outliers, K-Means++ and variants.
  * **Hierarchical Clustering**: Agglomerative vs. Divisive, Linkage methods (Single Link, Complete Link, Average Link, Ward's method), Dendrograms.
  * **Density-Based Clustering**: **DBSCAN** (Core points, Border points, Noise points, $\varepsilon$-neighborhood, MinPts).
  * **Graph-Based Clustering**: Shared Nearest Neighbor (SNN) Approach, Jarvis-Patrick Clustering, SNN Density-Based Clustering.
* **Anomaly & Outlier Detection**:
  * Causes of Anomalies.
  * Approaches to Anomaly Detection: Statistical Approaches, Proximity-Based Outlier Detection (Distance-based & Density-based / LOF), Clustering-Based Techniques.

---

## 📚 Prescribed Reference Books
1. 📖 **Introduction to Data Mining** — Pang-Ning Tan, Michael Steinbach, Vipin Kumar, Pearson Education.
2. 📖 **Data Mining: Concepts and Techniques** — Jiawei Han, Micheline Kamber, Jian Pei, Morgan Kaufmann.
3. 📖 **Data Mining: Practical Machine Learning Tools and Techniques** — Ian H. Witten, Eibe Frank, Morgan Kaufmann.
4. 📖 **Principles of Data Mining** — David Hand, Heikki Mannila, Padhraic Smyth, PHI.

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
- Hands-on implementation in Python/R: Data cleaning, normalization, Apriori association mining, Decision Tree classifier, and K-Means clustering algorithms.

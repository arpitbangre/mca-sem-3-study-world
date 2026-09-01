# 🐘 Paper 1: 3T1 — Big Data Analytics

> **Program**: Master in Computer Application (MCA - 2 Years CBCS) — Semester III  
> **Course Code**: 3T1 | **Type**: Core Theory  
> **Credits**: 4 Credits (4 Hours/Week)  
> **Marks Scheme**: 80 Marks (University Theory Exam) + 20 Marks (Internal Assessment) = **100 Marks**  
> **Passing Standard**: Minimum 40 Marks in Theory  

---

## 🎯 Course Objectives & Outcomes
- Understand the fundamentals of Big Data, distributed architectures, and Hadoop ecosystem.
- Master storage and processing with HDFS, MapReduce, YARN, and NoSQL databases like HBase.
- Perform statistical computing, exploratory data analysis, and visualization using **R Programming**.
- Apply data visualization principles, social media text mining, and mobile analytics.

---

## 📖 Detailed Unit-Wise Syllabus

### 🔹 Unit 1: Big Data Overview, Technologies & Hadoop Ecosystem
* **Big Data Fundamentals**:
  * What is Big Data? Definition, 5Vs (Volume, Velocity, Variety, Veracity, Value).
  * History of Data Management and Data Evolution.
  * Structuring Big Data: Structured, Semi-structured, and Unstructured Data.
  * Elements of Big Data & Big Data Analytics lifecycle.
  * Advantages and real-world use cases of Big Data Analytics.
* **Distributed Technologies**:
  * Distributed and Parallel Computing concepts in Big Data.
  * Cloud Computing integration with Big Data & key features.
* **Hadoop Architecture & Ecosystem**:
  * Introduction to Apache Hadoop framework.
  * **HDFS (Hadoop Distributed File System)**: Architecture, NameNode, DataNode, Secondary NameNode, Block replication, HDFS CLI Commands.
  * **Hadoop YARN**: Architecture, ResourceManager, NodeManager, ApplicationMaster.
  * **Hadoop Ecosystem Components**:
    * **HBase**: Architecture, Column-oriented storage, combining HBase with HDFS.
    * **Hive**: Data warehousing infrastructure, HiveQL.
    * **Pig & Pig Latin**: Data flow language and execution.
    * **Data Ingestion Tools**: Sqoop (RDBMS to HDFS), Flume (log data streaming).
    * **Coordination & Scheduling**: ZooKeeper, Oozie workflow scheduler.
* **MapReduce Fundamentals**:
  * MapReduce Programming Model: Mapper, Reducer, Combiner, Partitioner.
  * MapReduce Execution Workflow: Split, Map, Shuffle, Sort, Reduce.
  * Techniques to Optimize MapReduce Jobs.
  * Common use cases and limitations of MapReduce.

---

### 🔹 Unit 2: Big Data Technology Foundation & Storage Layer
* **Big Data Technology Stack**:
  * Layered Architecture: Data Source Layer, Ingestion Layer, Storage Layer, Physical Infrastructure Layer.
  * Platform Management Layer, Security Layer (Kerberos, Knox, Ranger), Monitoring Layer, Visualization Layer.
  * Virtualization in Big Data & Virtualization Approaches.
  * Big Data Applications across industry domains (Healthcare, Banking, E-commerce).
* **Data Storage Paradigms & Data Warehouses**:
  * Relational DBMS (RDBMS) vs. Big Data Systems.
  * **CAP Theorem** (Consistency, Availability, Partition Tolerance) & PACELC Theorem.
  * Limitations of Relational Data Models in handling web-scale data.
  * **Non-Relational (NoSQL) Databases**: Key-Value, Document, Columnar, Graph stores.
  * Issues with Non-Relational Models.
  * Integrating Big Data architectures with traditional Enterprise Data Warehouses (EDW).

---

### 🔹 Unit 3: Statistical Analytics & Data Processing with R
* **Exploring R Programming**:
  * Overview, features, and advantages of R for data science.
  * Statistical computing features and standard CRAN packages.
  * GUI, R Console, RStudio IDE setup, and workspace management.
  * Basic arithmetic, data types, variables, and vectors.
* **Data Ingestion and I/O in R**:
  * Using `c()` combine function, `scan()` function.
  * Reading structured datasets and large files (`read.csv()`, `read.table()`).
  * Importing and exporting data from/to RStudio workspace.
* **Data Manipulation & Processing**:
  * Creating data subsets, filtering, slicing, and merging datasets.
  * Sorting and ordering data.
  * Managing multi-dimensional data using **Matrices** and **Data Frames**.
* **Functions & Packages**:
  * Writing custom modular functions in R vs. script execution.
  * Passing function arguments and return values.
  * Built-in statistical and mathematical functions.
  * Installing, loading, and managing R packages.
* **Graphical Analysis in R**:
  * Built-in plotting engine: `plot()`, `hist()`, `boxplot()`, `barplot()`, `pie()`.
  * Customizing chart aesthetics: colors, labels, legends, axes.
  * Exporting high-resolution graphs to external image and PDF files.

---

### 🔹 Unit 4: Data Visualization, Social Media & Mobile Analytics
* **Data Visualization**:
  * Principles of visual representation of large-scale data.
  * Visualization Techniques, Chart Types, and Interactive Dashboards.
  * Tools used in Big Data visualization (Tableau, PowerBI, D3.js, ggplot2).
* **Social Media Analytics & Text Mining**:
  * Overview of Social Media Data and APIs.
  * Introduction to Text Mining and Natural Language Preprocessing (Tokenization, Stemming, Stop-word removal).
  * Text Mining processes, Term Document Matrix (TDM), Word Clouds.
  * **Sentiment Analysis**: Lexicon-based vs. Machine Learning based sentiment classification.
* **Mobile Analytics**:
  * Definition and significance of Mobile Analytics.
  * Mobile user behavior tracking, app performance monitoring.
  * Tools used in Mobile Analytics (Google Firebase, Mixpanel, Flurry).
  * Performing Mobile Analytics & Key Challenges (Privacy, Cross-platform data).

---

## 📚 Prescribed Reference Books
1. 📖 **Big Data Black Book** *(Covers Hadoop 2, MapReduce, Hive, YARN, Pig, R and Data Visualization)* — DT Editorial Services, Dreamtech Press.
2. 📖 **Data Science & Big Data Analytics: Discovering, Analyzing, Visualizing and Presenting Data** — EMC Education Services, Wiley Publication.
3. 📖 **Beginners Guide for Data Analysis using R Programming** — Jeeva Jose, Khanna Publishing.
4. 📖 **Data Analytics** — Maheshwari, McGraw-Hill.
5. 📖 **Hands-On Programming with R** — Garrett Grolemund, O'Reilly.
6. 📖 **Beginning R: The Statistical Programming Language** — Mark Gardener, Wrox/Wiley.

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
- Hands-on implementation in **R**: Matrix/Dataframe operations, statistical calculations, data visualization plots, importing CSV datasets, and building basic Hadoop MapReduce pipelines.

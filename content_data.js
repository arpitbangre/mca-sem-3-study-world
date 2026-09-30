// MCA Sem 3 Study World — Scalable Content Store
// Designed by Arpit Manoj Bangre • MCA RTMNU

const MCA_DATA = {
  author: {
    name: "Arpit Manoj Bangre",
    title: "MCA Scholar & Developer",
    college: "Shri Shivaji Science College, Nagpur",
    university: "RTMNU",
    program: "MCA (2-Year CBCS) • Sem III",
    currentCGPA: 7.20,
    sem1SGPA: 7.29,
    sem2SGPA: 7.13,
    targetCGPA: "8.15 - 8.35 (Distinction 🏆)"
  },

  subjects: [
    {
      id: "3t4_ai",
      code: "3T4",
      name: "Artificial Intelligence",
      icon: "🤖",
      category: "Elective 2",
      credits: 4,
      marks: "80 + 20 = 100",
      description: "State space search, heuristics (A*, AO*), predicate logic, resolution, minimax & NLP.",
      badgeColor: "indigo",
      units: [
        { id: "unit-1", title: "Unit 1: Search & Heuristics", targetId: "unit-1-ai-problems-state-space-search-heuristic-algorithms", tags: ["State Space", "Water Jug", "A* / AO*"] },
        { id: "unit-2", title: "Unit 2: Knowledge & Logic", targetId: "unit-2-knowledge-representation-predicate-logic-inference", tags: ["FOPL", "Resolution", "Unification"] },
        { id: "unit-3", title: "Unit 3: Games & Planning", targetId: "unit-3-adversarial-search-game-playing-planning-systems", tags: ["Minimax", "Alpha-Beta", "STRIPS"] },
        { id: "unit-4", title: "Unit 4: NLP & Advanced AI", targetId: "unit-4-natural-language-processing-advanced-ai-architectures", tags: ["NLP", "CFG", "Distributed AI"] }
      ],
      markdownPath: "subjects/3T4_Artificial_Intelligence.md",
      impQuestionsComingSoon: {
        totalEstimated: 35,
        fourMarkers: 20,
        sixteenMarkers: 15,
        sneakPeek: [
          "Water Jug Problem state space representation & production rules.",
          "BFS vs DFS comparison with time and space complexity.",
          "A* Algorithm admissibility condition (h(n) <= h*(n)) with trace.",
          "Resolution in Predicate Logic with Clause Form & Unification.",
          "Minimax search with Alpha-Beta (α-β) pruning on a 3-ply tree.",
          "Goal Stack Planning (STRIPS) & Sussman Anomaly."
        ]
      }
    },
    {
      id: "3t1_big_data",
      code: "3T1",
      name: "Big Data Analytics",
      icon: "🐘",
      category: "Core Theory",
      credits: 4,
      marks: "80 + 20 = 100",
      description: "Hadoop (HDFS, YARN, MapReduce, HBase), R language, text mining & mobile analytics.",
      badgeColor: "amber",
      units: [
        { id: "unit-1", title: "Unit 1: Hadoop Ecosystem", targetId: "unit-1-big-data-overview-technologies-hadoop-ecosystem", tags: ["HDFS", "MapReduce", "HBase", "YARN"] },
        { id: "unit-2", title: "Unit 2: Storage & NoSQL", targetId: "unit-2-big-data-technology-foundation-storage-layer", tags: ["CAP Theorem", "NoSQL", "Warehousing"] },
        { id: "unit-3", title: "Unit 3: Analytics with R", targetId: "unit-3-statistical-analytics-data-processing-with-r", tags: ["R Language", "Data Frames", "Plotting"] },
        { id: "unit-4", title: "Unit 4: Visuals & Text Mining", targetId: "unit-4-data-visualization-social-media-mobile-analytics", tags: ["Sentiment Analysis", "Mobile Analytics"] }
      ],
      markdownPath: "subjects/3T1_Big_Data_Analytics.md",
      impQuestionsComingSoon: {
        totalEstimated: 32,
        fourMarkers: 18,
        sixteenMarkers: 14,
        sneakPeek: [
          "HDFS Architecture: NameNode, DataNode & Secondary NameNode roles.",
          "MapReduce execution lifecycle: Split, Map, Shuffle, Sort, Reduce.",
          "CAP Theorem formulation and NoSQL database trade-offs.",
          "Data Frames and vector operations in R Programming.",
          "Sentiment Analysis pipeline and Term Document Matrix (TDM)."
        ]
      }
    },
    {
      id: "3t2_data_mining",
      code: "3T2",
      name: "Data Mining",
      icon: "⛏️",
      category: "Core Theory",
      credits: 4,
      marks: "80 + 20 = 100",
      description: "Preprocessing, Iris EDA, Decision Trees, Naive Bayes, SVM, Apriori, K-Means & DBSCAN.",
      badgeColor: "blue",
      units: [
        { id: "unit-1", title: "Unit 1: Data Preprocessing", targetId: "unit-1-foundations-data-preprocessing", tags: ["Sampling", "Normalization", "PCA"] },
        { id: "unit-2", title: "Unit 2: EDA & Classification", targetId: "unit-2-data-exploration-classification-foundations", tags: ["Iris", "OLAP", "Decision Trees"] },
        { id: "unit-3", title: "Unit 3: Advanced Classifiers", targetId: "unit-3-advanced-classification-association-analysis", tags: ["Apriori", "FP-Tree", "SVM", "k-NN"] },
        { id: "unit-4", title: "Unit 4: Clustering & Outliers", targetId: "unit-4-cluster-analysis-anomaly-detection", tags: ["K-Means", "DBSCAN", "Outliers"] }
      ],
      markdownPath: "subjects/3T2_Data_Mining.md",
      impQuestionsComingSoon: {
        totalEstimated: 30,
        fourMarkers: 16,
        sixteenMarkers: 14,
        sneakPeek: [
          "Data Preprocessing steps: Aggregation, Sampling & Normalization.",
          "Decision Tree induction with Entropy & Information Gain.",
          "Apriori candidate generation and pruning on transactions.",
          "K-Means vs DBSCAN density-based clustering comparison.",
          "Support Vector Machines (SVM) maximum margin hyperplane."
        ]
      }
    },
    {
      id: "3t3_python",
      code: "3T3",
      name: "Python Programming",
      icon: "🐍",
      category: "Core Theory",
      credits: 4,
      marks: "80 + 20 = 100",
      description: "Python Core, LGB scoping, OOP, built-ins, OS/threads, file I/O, sockets & bytecode.",
      badgeColor: "emerald",
      units: [
        { id: "unit-1", title: "Unit 1: Core, Scoping & OOP", targetId: "unit-1-python-fundamentals-data-structures-functions-oop", tags: ["LGB Rule", "Classes", "Exceptions"] },
        { id: "unit-2", title: "Unit 2: Built-ins & OS", targetId: "unit-2-built-in-functions-os-interfacing-information-processing", tags: ["sys/os", "Reflection", "Threads"] },
        { id: "unit-3", title: "Unit 3: File I/O & Sockets", targetId: "unit-3-file-handling-network-communication-rad", tags: ["File I/O", "TCP Sockets", "distutils"] },
        { id: "unit-4", title: "Unit 4: Web CGI & Internals", targetId: "unit-4-web-development-markup-processing-python-architecture", tags: ["CGI", "XML/HTML", "Bytecode"] }
      ],
      markdownPath: "subjects/3T3_Python_Programming.md",
      impQuestionsComingSoon: {
        totalEstimated: 28,
        fourMarkers: 16,
        sixteenMarkers: 12,
        sneakPeek: [
          "LGB scoping rule in Python with code examples.",
          "Built-in reflection functions: getattr, setattr, isinstance, type.",
          "Python TCP Server and Client program using socket module.",
          "XML and HTML parsing techniques in standard Python.",
          "Python bytecode compilation and disassembly with dis module."
        ]
      }
    },
    {
      id: "3t5_soft_computing",
      code: "3T5",
      name: "Soft Computing",
      icon: "🧠",
      category: "Core Theory",
      credits: 4,
      marks: "80 + 20 = 100",
      description: "Heuristics, Bayes/Dempster-Shafer, ANN (Backpropagation EBPA), Hopfield & Fuzzy Systems.",
      badgeColor: "rose",
      units: [
        { id: "unit-1", title: "Unit 1: Search & Bayes", targetId: "unit-1-introduction-to-soft-computing-statistical-reasoning", tags: ["Soft vs Hard", "Bayes Theorem", "Search"] },
        { id: "unit-2", title: "Unit 2: Neural Networks (EBPA)", targetId: "unit-2-artificial-neural-networks-ann-supervised-learning", tags: ["Perceptron", "Backpropagation", "Adaline"] },
        { id: "unit-3", title: "Unit 3: Unsupervised & Kernel", targetId: "unit-3-unsupervised-learning-self-organizing-networks", tags: ["Hopfield", "ART", "Kohonen SOM"] },
        { id: "unit-4", title: "Unit 4: Fuzzy Logic & Control", targetId: "unit-4-fuzzy-systems-fuzzy-logic-control-systems", tags: ["Fuzzy Sets", "Defuzzification", "Mamdani"] }
      ],
      markdownPath: "subjects/3T5_Soft_Computing.md",
      impQuestionsComingSoon: {
        totalEstimated: 30,
        fourMarkers: 16,
        sixteenMarkers: 14,
        sneakPeek: [
          "Soft Computing vs Hard Computing key characteristics.",
          "Error Backpropagation Algorithm (EBPA) weight adjustment derivation.",
          "McCulloch-Pitts Neuron realization of basic logic gates.",
          "Kohonen Self-Organizing Map (SOM) competitive process.",
          "Defuzzification methods: COG, MOM, and Center of Sums."
        ]
      }
    },
    {
      id: "3p1_3p2_labs",
      code: "3P1 & 3P2",
      name: "Practicals & Labs",
      icon: "🧪",
      category: "Labs",
      credits: 8,
      marks: "100 + 100 = 200",
      description: "Lab 3P1 (Big Data, DM, Python) & Lab 3P2 (AI Search Algorithms, Neural & Fuzzy Systems).",
      badgeColor: "purple",
      units: [
        { id: "unit-1", title: "Practical 3P1: Big Data, DM & Python", targetId: "3p1-practical-1-based-on-3t1-3t2-3t3", tags: ["R Scripts", "Data Mining", "Python"] },
        { id: "unit-2", title: "Practical 3P2: AI Search & Soft Computing", targetId: "3p2-practical-2-based-on-3t4-ai-3t5-soft-computing", tags: ["A* Search", "Water Jug", "Neural Net", "Fuzzy"] }
      ],
      markdownPath: "MCA_SEM_3_SYLLABUS.md",
      impQuestionsComingSoon: {
        totalEstimated: 20,
        fourMarkers: 10,
        sixteenMarkers: 10,
        sneakPeek: [
          "R script for CSV summary statistics and boxplots.",
          "Python implementation of A* search for 8-puzzle.",
          "Single Layer Perceptron implementation in Python.",
          "Fuzzy Set operations (Union, Intersection, Max-Min) in Python."
        ]
      }
    }
  ],

  overviewDocument: {
    id: "sem3_overview",
    title: "Master Scheme & Syllabus",
    icon: "📋",
    path: "MCA_SEM_3_SYLLABUS.md"
  },

  academicRoadmap: {
    id: "academic_roadmap",
    title: "Arpit's Scorecard & Degree Goal",
    icon: "🏆",
    path: "MCA_ACADEMIC_PERFORMANCE_AND_ROADMAP.md"
  },

  pyqVaultDocument: {
    id: "pyq_vault",
    title: "RTMNU Official PYQ Vault (13 Papers)",
    icon: "📑",
    path: "pyq/README.md"
  },

  heatmapDocument: {
    id: "heatmap",
    title: "High-Probability Repeating Questions Heatmap",
    icon: "🔥",
    path: "pyq/analytics/REPEATED_QUESTIONS_HEATMAP.md"
  },

  impPlanDocument: {
    id: "imp_plan",
    title: "Master High-Yield IMP Questions Plan (80/80)",
    icon: "🎯",
    path: "pyq/analytics/MOST_IMPORTANT_QUESTIONS_PLAN.md"
  },

  top30Document: {
    id: "top30",
    title: "Top 30 Question Bank Per Subject (150 Questions)",
    icon: "💎",
    path: "pyq/analytics/TOP_30_QUESTION_BANK_PER_SUBJECT.md"
  },

  superImpDocument: {
    id: "super_imp",
    title: "Ultimate Super IMP Question Bank (105 Questions)",
    icon: "⚡",
    path: "pyq/analytics/ULTIMATE_SUPER_IMP_QUESTION_BANK.md"
  }
};

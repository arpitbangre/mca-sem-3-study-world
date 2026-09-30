# 🎓 Study World — RTMNU MCA Semester III Hub 🚀

> **Live Web Application**: [https://arpitbangre.github.io/mca-sem-3-study-world/](https://arpitbangre.github.io/mca-sem-3-study-world/)  
> **Author & Developer**: **Arpit Manoj Bangre** ([@arpitbangre](https://github.com/arpitbangre))  
> **College**: Shri Shivaji Science College, Congress Nagar, Nagpur  
> **University**: Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)  
> **Program**: Master of Computer Application (MCA - 2 Years CBCS Pattern)

---

## 🌟 Overview

**Study World** is a modern, high-performance, distraction-free digital notes & academic hub designed for MCA Semester III students. It provides a clean 3-pane workstation with live Markdown rendering, instant search, deep unit-level jumping, upcoming curated question banks, and an interactive CGPA target simulation engine.


---

## 📚 2-Page Super Important Exam Notes (112 Questions Fully Solved)

> 🎯 **Target:** RTMNU MCA Semester 3 Exams (80/80 Marks Preparation)  
> 📖 **Notes Directory:** [**Open Master Notes Hub ➔**](./notes/README.md)  
> 📑 **Master Question Bank:** [**View 112 Super IMP Questions ➔**](./notes/SUPER_IMP_QUESTION_BANK.md)  
> ✍️ **Standard:** Double-depth answers (~5.5KB - 8.5KB / 750-1,200 words each) with ASCII architecture diagrams, 6-parameter comparison tables, real-world analogies, code implementations, and RTMNU 8-mark scoring blueprints.

| Subject | Questions | Notes Index | Question Bank |
|---|---|---|---|
| **Artificial Intelligence** (`3T4`) | 27 Questions | [Open AI Notes](./notes/Artificial%20Intelligence/INDEX.md) | [AI Questions](./notes/Artificial%20Intelligence/QUESTIONS.md) |
| **Big Data Analytics** (`3T1`) | 24 Questions | [Open Big Data Notes](./notes/Big%20Data%20Analytics/INDEX.md) | [Big Data Questions](./notes/Big%20Data%20Analytics/QUESTIONS.md) |
| **Data Mining** (`3T2`) | 18 Questions | [Open Data Mining Notes](./notes/Data%20Mining/INDEX.md) | [Data Mining Questions](./notes/Data%20Mining/QUESTIONS.md) |
| **Python Programming** (`3T3`) | 22 Questions | [Open Python Notes](./notes/Python%20Programming/INDEX.md) | [Python Questions](./notes/Python%20Programming/QUESTIONS.md) |
| **Soft Computing** (`3T5`) | 21 Questions | [Open Soft Computing Notes](./notes/Soft%20Computing/INDEX.md) | [Soft Computing Questions](./notes/Soft%20Computing/QUESTIONS.md) |

---

## ✨ Key Features

- **🎨 Minimalist Swiss / Linear Focus UI**:
  - High-readability typography pair (**Space Grotesk** for headings, **DM Sans** for prose, **Fira Code** for code blocks).
  - Soothing **Royal Cobalt & Slate** palette engineered for zero eye strain during long study sessions.
  - Seamless 1-click **Light & Dark mode** switcher with persistent user preferences.

- **📖 Advanced Markdown Reading Canvas**:
  - Dynamic Markdown parsing powered by `marked.js` and `highlight.js`.
  - Auto-generated **Table of Contents (TOC)** with clean slug anchors and smooth scroll navigation.
  - **1-Click Code Snippet Copying** with instant visual feedback.
  - **Distraction-Free Fullscreen Focus Mode** (Shortcut: Press `F`, exit with `Esc`).
  - Adjustable reading font size controls (`A-` / `A+`) and instant Print stylesheet.

- **🗂️ Subject & Unit Navigation (Deep Linking)**:
  - Direct unit cards with auto-scroll and focus highlight animation.
  - Shareable URL hash routing (`#subject=3t4_ai&tab=syllabus&unit=unit-2`).

- **🔥 Question Bank & Model Solutions Pipeline**:
  - Tabbed interface per subject: *Full Syllabus*, *Top IMP Questions (Coming Soon)*, *Solved Answers (Coming Soon)*, and *Exam Blueprint*.
  - Curated 16-Mark and 4-Mark university question previews.

- **🎯 Interactive CGPA & Degree Target Calculator**:
  - Pre-calibrated with RTMNU credit weights (Sem 1: 28 Cr, Sem 2: 32 Cr, Sem 3: 28 Cr, Sem 4: 32 Cr = 120 Total).
  - Live simulation of final degree CGPA, marks percentage, and distinction status.

---

## 📚 Covered Curriculum (Semester III — 28 Credits | 700 Marks)

| Code | Subject Name | Type | Credits | Focus Areas |
| :--- | :--- | :---: | :---: | :--- |
| **3T1** | 🐘 Big Data Analytics | Core | 4 | Hadoop (HDFS, YARN, MapReduce, HBase), R Programming, Text Mining |
| **3T2** | ⛏️ Data Mining | Core | 4 | Preprocessing, Iris EDA, Decision Trees, Apriori, K-Means, DBSCAN, SVM |
| **3T3** | 🐍 Python Programming | Core | 4 | Python Core, LGB Scoping, OOP, Built-ins, Sockets, CGI, Bytecode |
| **3T4** | 🤖 Artificial Intelligence (CE2-1) | Elective | 4 | State Space, Heuristics ($A^*, AO^*$), Predicate Logic, Resolution, Minimax, NLP |
| **3T5** | 🧠 Soft Computing | Core | 4 | Heuristic Search, Bayes, Neural Networks (EBPA), Hopfield, Fuzzy Systems |
| **3P1** | 💻 Practical-I Lab | Lab | 4 | Big Data R Scripts, Data Mining Algorithms, Python Systems |
| **3P2** | 🧪 Practical-II Lab | Lab | 4 | AI Search Algorithms, Neural Network Models, Fuzzy Controllers |

---

## 🛠️ Tech Stack

- **Core**: Vanilla HTML5, Vanilla JavaScript (ES6+), Modular Architecture
- **Styling**: Pure Modern Vanilla CSS3 (Custom design tokens, CSS Grid & Flexbox, micro-transitions, responsive breakpoints)
- **Libraries (via CDN)**:
  - [marked.js](https://marked.js.org/) — Ultra-fast Markdown parser
  - [highlight.js](https://highlightjs.org/) — Code syntax highlighting
- **Fonts**: Google Fonts (`Space Grotesk`, `DM Sans`, `Fira Code`)
- **Backend / Local Server**: Lightweight zero-dependency `server.py`

---

## 🚀 Running Locally

### Option 1: Using Built-in Python Server
```bash
# Clone the repository
git clone https://github.com/arpitbangre/mca-sem-3-study-world.git
cd mca-sem-3-study-world

# Run the dedicated server (auto-opens in browser)
python server.py
```
Or use standard Python HTTP server:
```bash
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)**.

### Option 2: Direct Open
Simply double-click `index.html` in your file explorer.

---

## 🌐 Free Deployment Alternatives (Same High Performance)

### 1. ⚡ Cloudflare Pages (Fastest Worldwide Edge CDN — 100% Free Forever)
- **Why**: Unlimited bandwidth, 300+ global data centers, blazing fast TTFB.
- **Steps**:
  1. Go to **[pages.cloudflare.com](https://pages.cloudflare.com/)** and sign in (free).
  2. Click **Create a project** $\rightarrow$ **Connect to Git**.
  3. Select your repository `arpitbangre/mca-sem-3-study-world`.
  4. Framework preset: **None** (Root directory: `/`).
  5. Click **Save and Deploy**.
  6. Live URL: `https://mca-sem-3-study-world.pages.dev`

---

### 2. 💎 Netlify (Zero-Config Global Hosting)
- **Why**: Instant automated GitHub branch deployments, custom domains, free SSL.
- **Steps**:
  1. Go to **[netlify.com](https://www.netlify.com/)** $\rightarrow$ Sign in with GitHub.
  2. Click **Add new site** $\rightarrow$ **Import an existing project**.
  3. Select `arpitbangre/mca-sem-3-study-world`.
  4. Leave build settings blank $\rightarrow$ Click **Deploy site**.
  5. Live URL: `https://mca-sem-3-study-world.netlify.app`

---

### 3. 🛡️ Render (Static Sites Tier — Free)
- **Why**: Clean dashboard, automatic Git pushes, free custom SSL.
- **Steps**:
  1. Go to **[render.com](https://render.com/)** $\rightarrow$ New **Static Site**.
  2. Connect repository `arpitbangre/mca-sem-3-study-world`.
  3. Publish directory: `./` $\rightarrow$ Click **Create Static Site**.
  4. Live URL: `https://mca-sem-3-study-world.onrender.com`

---

### 4. 🐙 GitHub Pages (Currently Active & Live)
- **Settings** $\rightarrow$ **Pages** $\rightarrow$ Source: `Deploy from a branch` (`main` / `root`).
- **Live URL**: [https://arpitbangre.github.io/mca-sem-3-study-world/](https://arpitbangre.github.io/mca-sem-3-study-world/)

---

## 👨‍💻 Author

**Arpit Manoj Bangre**  
- GitHub: [@arpitbangre](https://github.com/arpitbangre)  
- College: Shri Shivaji Science College, Nagpur  
- Affiliation: Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)

---

> 💡 *Crafted with passion for academic excellence & seamless learning.*

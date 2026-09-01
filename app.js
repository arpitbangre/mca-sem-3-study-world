/**
 * MCA Sem 3 Study World — Core Application Logic
 * Crafted with ⚡ by Arpit Manoj Bangre • MCA RTMNU
 */

const AppState = {
  currentSubjectId: "3t4_ai",
  currentViewMode: "syllabus", // "syllabus" | "imp_questions" | "solved_answers" | "blueprint"
  currentActiveUnit: "all",
  searchQuery: "",
  theme: localStorage.getItem("notes_theme") || "light",
  fontSize: parseInt(localStorage.getItem("notes_fontsize")) || 15,
  cachedMarkdown: {}
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  parseUrlHash();
  renderSidebar();
  renderTopicList();
  setupEventListeners();
  loadSubjectContent(AppState.currentSubjectId, false);

  window.addEventListener("hashchange", parseUrlHash);
});

// URL Hash Router
function parseUrlHash() {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return;
  const params = new URLSearchParams(hash);
  const subjectId = params.get("subject");
  const tab = params.get("tab");
  const unit = params.get("unit");

  if (subjectId && MCA_DATA.subjects.some(s => s.id === subjectId)) {
    AppState.currentSubjectId = subjectId;
  }
  if (tab && ["syllabus", "imp_questions", "solved_answers", "blueprint"].includes(tab)) {
    AppState.currentViewMode = tab;
  }
  if (unit) {
    AppState.currentActiveUnit = unit;
  }
}

function updateUrlHash() {
  const params = new URLSearchParams();
  params.set("subject", AppState.currentSubjectId);
  params.set("tab", AppState.currentViewMode);
  if (AppState.currentActiveUnit !== "all") {
    params.set("unit", AppState.currentActiveUnit);
  }
  window.location.hash = params.toString();
}

// Theme Engine
function initTheme() {
  document.documentElement.setAttribute("data-theme", AppState.theme);
  updateThemeButton();
}

function toggleTheme() {
  AppState.theme = AppState.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", AppState.theme);
  localStorage.setItem("notes_theme", AppState.theme);
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  btn.textContent = AppState.theme === "dark" ? "☀️" : "🌙";
}

// -------------------------------------------------------------
// 1. SIDEBAR RENDERING
// -------------------------------------------------------------
function renderSidebar() {
  const author = MCA_DATA.author;
  const authorCard = document.getElementById("authorProfileCard");
  if (authorCard) {
    authorCard.innerHTML = `
      <div class="author-avatar">AB</div>
      <div class="author-info">
        <div class="author-name">${author.name}</div>
        <div class="author-tag">MCA Sem 3 • CGPA ${author.currentCGPA}</div>
      </div>
    `;
  }

  const subjectListEl = document.getElementById("sidebarSubjectList");
  if (subjectListEl) {
    subjectListEl.innerHTML = MCA_DATA.subjects.map(subj => `
      <div class="nav-item ${subj.id === AppState.currentSubjectId ? 'active' : ''}" 
           data-subject-id="${subj.id}" onclick="selectSubject('${subj.id}')">
        <div class="nav-item-left">
          <span class="icon">${subj.icon}</span>
          <span class="nav-title">${subj.code} ${subj.name}</span>
        </div>
        <span class="nav-badge">${subj.credits} Cr</span>
      </div>
    `).join("");
  }
}

// -------------------------------------------------------------
// 2. TOPIC CARDS LIST (COLUMN 2)
// -------------------------------------------------------------
function renderTopicList() {
  const currentSubj = MCA_DATA.subjects.find(s => s.id === AppState.currentSubjectId) || MCA_DATA.subjects[0];
  const listContainer = document.getElementById("topicCardsContainer");
  const categoryTitleEl = document.getElementById("activeCategoryTitle");
  
  if (categoryTitleEl) {
    categoryTitleEl.innerHTML = `${currentSubj.icon} ${currentSubj.name}`;
  }

  // Sync Filter Chips
  updateFilterChips();

  if (!listContainer) return;

  const query = AppState.searchQuery.toLowerCase().trim();
  let cardsHTML = "";

  // Card 1: Complete Syllabus Overview
  if (!query || "syllabus overview course topics units".includes(query) || currentSubj.name.toLowerCase().includes(query)) {
    cardsHTML += `
      <div class="note-card ${AppState.currentViewMode === 'syllabus' && AppState.currentActiveUnit === 'all' ? 'active' : ''}" 
           onclick="setViewMode('syllabus', 'all')">
        <div class="card-top">
          <div class="card-title">📖 Complete Syllabus Overview</div>
        </div>
        <div class="card-preview-text">${currentSubj.description}</div>
        <div class="card-footer">
          <div class="card-meta"><span>${currentSubj.credits} Credits</span></div>
          <div class="card-tags"><span class="tag-pill ${currentSubj.badgeColor}">Syllabus</span></div>
        </div>
      </div>
    `;
  }

  // Cards for Individual Units
  currentSubj.units.forEach((unit, idx) => {
    const unitSearchText = `${unit.title} ${unit.tags.join(" ")}`.toLowerCase();
    if (!query || unitSearchText.includes(query)) {
      cardsHTML += `
        <div class="note-card ${AppState.currentViewMode === 'syllabus' && AppState.currentActiveUnit === unit.id ? 'active' : ''}"
             onclick="jumpToUnit('${unit.id}', '${unit.targetId}')">
          <div class="card-top">
            <div class="card-title">${unit.title}</div>
          </div>
          <div class="card-preview-text">Focus: ${unit.tags.join(", ")}</div>
          <div class="card-footer">
            <div class="card-meta"><span>Unit ${idx + 1}</span></div>
            <div class="card-tags">
              ${unit.tags.slice(0, 2).map(t => `<span class="tag-pill ${currentSubj.badgeColor}">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      `;
    }
  });

  // Card: Top IMP Questions (Coming Soon)
  if (!query || "imp questions important questions pyq 16 marks 4 marks".includes(query)) {
    cardsHTML += `
      <div class="note-card ${AppState.currentViewMode === 'imp_questions' ? 'active' : ''}"
           onclick="setViewMode('imp_questions')">
        <div class="card-top">
          <div class="card-title">🔥 Top IMP Questions</div>
          <span class="tag-pill rose">Soon</span>
        </div>
        <div class="card-preview-text">High-probability 16M and 4M university questions.</div>
        <div class="card-footer">
          <div class="card-meta"><span>${currentSubj.impQuestionsComingSoon.totalEstimated} Target Qs</span></div>
          <div class="card-tags"><span class="tag-pill rose">Question Bank</span></div>
        </div>
      </div>
    `;
  }

  // Card: Solved Answers (Coming Soon)
  if (!query || "answers solutions model answers".includes(query)) {
    cardsHTML += `
      <div class="note-card ${AppState.currentViewMode === 'solved_answers' ? 'active' : ''}"
           onclick="setViewMode('solved_answers')">
        <div class="card-top">
          <div class="card-title">💡 Solved Model Answers</div>
          <span class="tag-pill emerald">Soon</span>
        </div>
        <div class="card-preview-text">Point-wise answer sheets with diagrams & algorithms.</div>
        <div class="card-footer">
          <div class="card-meta"><span>RTMNU Pattern</span></div>
          <div class="card-tags"><span class="tag-pill emerald">Solutions</span></div>
        </div>
      </div>
    `;
  }

  // Card: Exam Blueprint
  if (!query || "blueprint exam pattern scheme marking marks".includes(query)) {
    cardsHTML += `
      <div class="note-card ${AppState.currentViewMode === 'blueprint' ? 'active' : ''}"
           onclick="setViewMode('blueprint')">
        <div class="card-top">
          <div class="card-title">📊 Exam Blueprint (80+20)</div>
        </div>
        <div class="card-preview-text">Question paper format, 5-question division & choice rules.</div>
        <div class="card-footer">
          <div class="card-meta"><span>80+20 Marks</span></div>
          <div class="card-tags"><span class="tag-pill indigo">Scheme</span></div>
        </div>
      </div>
    `;
  }

  listContainer.innerHTML = cardsHTML;
}

function updateFilterChips() {
  document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.remove("active"));
  if (AppState.currentViewMode === "syllabus" && AppState.currentActiveUnit === "all") {
    document.getElementById("chipAll")?.classList.add("active");
  } else if (AppState.currentViewMode === "imp_questions") {
    document.getElementById("chipImp")?.classList.add("active");
  } else if (AppState.currentViewMode === "solved_answers") {
    document.getElementById("chipSolved")?.classList.add("active");
  } else if (AppState.currentViewMode === "blueprint") {
    document.getElementById("chipBlueprint")?.classList.add("active");
  }
}

// -------------------------------------------------------------
// 3. MAIN CANVAS & READING VIEW (COLUMN 3)
// -------------------------------------------------------------
async function loadSubjectContent(subjectId, pushHash = true) {
  AppState.currentSubjectId = subjectId;
  const currentSubj = MCA_DATA.subjects.find(s => s.id === subjectId) || MCA_DATA.subjects[0];

  const breadcrumbEl = document.getElementById("canvasBreadcrumb");
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `
      <span class="breadcrumb-folder">${currentSubj.category}</span> / 
      <span>${currentSubj.code}</span> / 
      <span style="color: var(--text-main); font-weight: 700;">${currentSubj.name}</span>
    `;
  }

  renderSidebar();
  renderTopicList();
  await renderCanvasBody();

  if (pushHash) updateUrlHash();
}

function setViewMode(mode, unitId = "all") {
  AppState.currentViewMode = mode;
  AppState.currentActiveUnit = unitId;
  renderTopicList();
  renderCanvasBody();
  updateUrlHash();

  if (window.innerWidth <= 640) {
    document.querySelector(".topic-list-panel")?.classList.add("hidden-mobile");
    document.querySelector(".note-canvas-panel")?.classList.add("active-mobile");
    document.getElementById("mobileBackBtn")?.style.setProperty("display", "flex");
  }
}

async function jumpToUnit(unitId, targetId) {
  AppState.currentActiveUnit = unitId;
  
  if (AppState.currentViewMode !== "syllabus") {
    AppState.currentViewMode = "syllabus";
    await renderCanvasBody();
  }

  renderTopicList();
  updateUrlHash();

  if (window.innerWidth <= 640) {
    document.querySelector(".topic-list-panel")?.classList.add("hidden-mobile");
    document.querySelector(".note-canvas-panel")?.classList.add("active-mobile");
    document.getElementById("mobileBackBtn")?.style.setProperty("display", "flex");
  }

  setTimeout(() => {
    let targetEl = document.getElementById(targetId);
    if (!targetEl) {
      const headings = document.querySelectorAll("#markdownProseContent h3, #markdownProseContent h2");
      for (const h of headings) {
        if (h.textContent.toLowerCase().includes(unitId.replace("-", " "))) {
          targetEl = h;
          break;
        }
      }
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      targetEl.classList.remove("flash-focus");
      void targetEl.offsetWidth;
      targetEl.classList.add("flash-focus");
    }
  }, 100);
}

async function renderCanvasBody() {
  const currentSubj = MCA_DATA.subjects.find(s => s.id === AppState.currentSubjectId) || MCA_DATA.subjects[0];
  const proseContainer = document.getElementById("markdownProseContent");
  const tocContainer = document.getElementById("tocList");

  if (!proseContainer) return;

  const tabsHTML = `
    <div class="study-mode-tabs">
      <button class="study-tab-btn ${AppState.currentViewMode === 'syllabus' ? 'active' : ''}" 
              onclick="setViewMode('syllabus')">
        📖 Full Syllabus
      </button>
      <button class="study-tab-btn ${AppState.currentViewMode === 'imp_questions' ? 'active' : ''}" 
              onclick="setViewMode('imp_questions')">
        🔥 Top IMP Questions
      </button>
      <button class="study-tab-btn ${AppState.currentViewMode === 'solved_answers' ? 'active' : ''}" 
              onclick="setViewMode('solved_answers')">
        💡 Solved Answers
      </button>
      <button class="study-tab-btn ${AppState.currentViewMode === 'blueprint' ? 'active' : ''}" 
              onclick="setViewMode('blueprint')">
        📊 Exam Blueprint
      </button>
    </div>
  `;

  if (AppState.currentViewMode === "syllabus") {
    let md = await fetchMarkdown(currentSubj.markdownPath);
    const parsedHTML = marked.parse(md);
    proseContainer.innerHTML = tabsHTML + `<div class="markdown-prose">${parsedHTML}</div>`;
    postProcessMarkdown(proseContainer);
    buildTableOfContents(proseContainer, tocContainer);
  } else if (AppState.currentViewMode === "imp_questions") {
    proseContainer.innerHTML = tabsHTML + renderIMPQuestionsView(currentSubj);
    if (tocContainer) tocContainer.innerHTML = `<li class="toc-item"><a href="#">⚡ High Probability Qs</a></li>`;
  } else if (AppState.currentViewMode === "solved_answers") {
    proseContainer.innerHTML = tabsHTML + renderSolvedAnswersView(currentSubj);
    if (tocContainer) tocContainer.innerHTML = `<li class="toc-item"><a href="#">📝 Answer Sheet Format</a></li>`;
  } else if (AppState.currentViewMode === "blueprint") {
    proseContainer.innerHTML = tabsHTML + renderBlueprintView(currentSubj);
    if (tocContainer) tocContainer.innerHTML = `<li class="toc-item"><a href="#">📊 Exam Pattern (80+20)</a></li>`;
  }
}

// Coming Soon Views
function renderIMPQuestionsView(subj) {
  return `
    <div class="coming-soon-hero">
      <div class="coming-soon-badge">🔥 TOP IMP QUESTION BANK</div>
      <h2 class="coming-soon-title">${subj.code} ${subj.name}</h2>
      <p class="coming-soon-desc">
        Curating high-probability 4-Mark and 16-Mark university questions derived from RTMNU past 5 years papers.
      </p>
      <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
        <span class="tag-pill amber">⚡ ${subj.impQuestionsComingSoon.fourMarkers} Short Questions (4M)</span>
        <span class="tag-pill rose">🎯 ${subj.impQuestionsComingSoon.sixteenMarkers} Long Questions (16M)</span>
      </div>

      <div class="sneak-peek-grid">
        <h4 style="font-family: var(--font-heading); margin-top: 10px; text-align: left; color: var(--text-main);">
          🔍 Preview of Questions Being Drafted:
        </h4>
        ${subj.impQuestionsComingSoon.sneakPeek.map((q, i) => `
          <div class="sneak-peek-item">
            <div class="q-number-pill">Q${i+1}</div>
            <div class="q-text">${q}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderSolvedAnswersView(subj) {
  return `
    <div class="coming-soon-hero">
      <div class="coming-soon-badge" style="background: #2563EB;">💡 MODEL ANSWER SHEETS</div>
      <h2 class="coming-soon-title">RTMNU High-Score Solved Solutions</h2>
      <p class="coming-soon-desc">
        Structuring point-wise, diagram-rich, and algorithm-accurate answers designed to score maximum 16/16 and 4/4 marks in ${subj.name}.
      </p>
      
      <div class="sneak-peek-grid">
        <div class="sneak-peek-item">
          <div class="q-number-pill">✨</div>
          <div class="q-text">
            <strong>Key Features in Pipeline:</strong>
            <ul style="margin-top: 6px; padding-left: 18px; font-weight: normal; font-size: 0.88rem;">
              <li>Formal definitions & clear concept introduction boxes.</li>
              <li>Handcrafted diagrams & system architectures.</li>
              <li>Step-by-step algorithm walkthroughs with sample numericals.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBlueprintView(subj) {
  return `
    <div class="markdown-prose">
      <h1>📊 Examination Blueprint: ${subj.code}</h1>
      <blockquote>
        <strong>RTMNU CBCS Structure</strong>: 3 Hours Theory Exam | Total 100 Marks (80 External + 20 Internal). Pass: 40 Marks.
      </blockquote>

      <h2>📋 Theory Paper Pattern (80 Marks)</h2>
      <table>
        <thead>
          <tr>
            <th>Question No.</th>
            <th>Syllabus Unit Covered</th>
            <th>Question Type</th>
            <th>Max Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Q1</strong></td><td>Unit 1</td><td>Internal Choice (Q1 OR Q1)</td><td>16 Marks</td></tr>
          <tr><td><strong>Q2</strong></td><td>Unit 2</td><td>Internal Choice (Q2 OR Q2)</td><td>16 Marks</td></tr>
          <tr><td><strong>Q3</strong></td><td>Unit 3</td><td>Internal Choice (Q3 OR Q3)</td><td>16 Marks</td></tr>
          <tr><td><strong>Q4</strong></td><td>Unit 4</td><td>Internal Choice (Q4 OR Q4)</td><td>16 Marks</td></tr>
          <tr><td><strong>Q5</strong></td><td><strong>All 4 Units</strong></td><td>4 Sub-questions (a, b, c, d) of 4M each (Compulsory)</td><td>16 Marks</td></tr>
          <tr><td><strong>TOTAL</strong></td><td><strong>Entire Syllabus</strong></td><td><strong>5 Questions × 16 Marks</strong></td><td><strong>80 Marks</strong></td></tr>
        </tbody>
      </table>

      <h2>🎯 Internal Assessment (20 Marks)</h2>
      <ul>
        <li><strong>Class Test / Mid-term</strong>: 10 Marks</li>
        <li><strong>Home Assignments / Seminar</strong>: 5 Marks</li>
        <li><strong>Attendance & Active Participation</strong>: 5 Marks</li>
      </ul>
    </div>
  `;
}

// -------------------------------------------------------------
// 4. CLEAN TOC GENERATOR & CODE HIGHLIGHTING
// -------------------------------------------------------------
function postProcessMarkdown(container) {
  const preElements = container.querySelectorAll("pre");
  preElements.forEach(pre => {
    const code = pre.querySelector("code");
    const lang = code ? (code.className.match(/language-(\w+)/) || [, 'code'])[1] : 'code';
    
    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";
    
    wrapper.innerHTML = `
      <div class="code-block-header">
        <span class="code-lang-label">${lang}</span>
        <button class="copy-code-btn" onclick="copyCodeSnippet(this)">Copy</button>
      </div>
    `;
    
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    if (window.hljs && code) {
      hljs.highlightElement(code);
    }
  });

  const headings = container.querySelectorAll("h1, h2, h3");
  headings.forEach((h) => {
    const rawText = h.textContent;
    const cleanText = rawText
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}🔹🎯📖📚📝🧪🐘⛏️🐍🤖🧠📊#\*:]+/gu, "")
      .trim();
    
    const slug = cleanText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (slug) {
      h.setAttribute("id", slug);
    }
  });
}

function buildTableOfContents(container, tocContainer) {
  if (!tocContainer) return;
  const headings = container.querySelectorAll("h2, h3");
  if (headings.length === 0) {
    tocContainer.innerHTML = `<li class="toc-item"><a href="#">Overview</a></li>`;
    return;
  }

  let tocHTML = "";
  headings.forEach(h => {
    const level = h.tagName.toLowerCase() === "h2" ? "level-2" : "level-3";
    const id = h.getAttribute("id");
    const cleanTitle = h.textContent
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}🔹🎯📖📚📝🧪🐘⛏️🐍🤖🧠📊#\*:]+/gu, "")
      .trim();

    if (id && cleanTitle) {
      tocHTML += `
        <li class="toc-item ${level}">
          <a href="#${id}" onclick="event.preventDefault(); document.getElementById('${id}').scrollIntoView({behavior: 'smooth'});">
            ${cleanTitle}
          </a>
        </li>
      `;
    }
  });

  tocContainer.innerHTML = tocHTML;
}

window.copyCodeSnippet = function(button) {
  const wrapper = button.closest(".code-block-wrapper");
  const code = wrapper.querySelector("code");
  if (code) {
    navigator.clipboard.writeText(code.innerText).then(() => {
      const originalText = button.textContent;
      button.textContent = "Copied! ✓";
      button.style.background = "#2563EB";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
      }, 2000);
    });
  }
};

// -------------------------------------------------------------
// 5. MARKDOWN FETCHING
// -------------------------------------------------------------
async function fetchMarkdown(path) {
  if (AppState.cachedMarkdown[path]) {
    return AppState.cachedMarkdown[path];
  }
  try {
    const response = await fetch(path);
    if (response.ok) {
      const text = await response.text();
      AppState.cachedMarkdown[path] = text;
      return text;
    }
  } catch (e) {
    console.warn("Fetch failed for", path, e);
  }
  return `# 📄 Content Loading...\nPlease ensure ${path} is available.`;
}

// -------------------------------------------------------------
// 6. EVENT LISTENERS
// -------------------------------------------------------------
function setupEventListeners() {
  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderTopicList();
    });

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  document.getElementById("themeToggleBtn")?.addEventListener("click", toggleTheme);
  document.getElementById("fontDecBtn")?.addEventListener("click", () => adjustFontSize(-1));
  document.getElementById("fontIncBtn")?.addEventListener("click", () => adjustFontSize(1));

  document.getElementById("mobileBackBtn")?.addEventListener("click", () => {
    document.querySelector(".topic-list-panel")?.classList.remove("hidden-mobile");
    document.querySelector(".note-canvas-panel")?.classList.remove("active-mobile");
    document.getElementById("mobileBackBtn")?.style.setProperty("display", "none");
  });

  document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.toggle("open");
  });
}

function adjustFontSize(delta) {
  AppState.fontSize = Math.max(12, Math.min(22, AppState.fontSize + delta));
  const prose = document.getElementById("markdownProseContent");
  if (prose) prose.style.fontSize = AppState.fontSize + "px";
  localStorage.setItem("notes_fontsize", AppState.fontSize);
}

window.selectSubject = function(subjectId) {
  loadSubjectContent(subjectId);
  document.querySelector(".sidebar")?.classList.remove("open");
};

window.openOverview = async function(docType) {
  const doc = docType === 'roadmap' ? MCA_DATA.academicRoadmap : MCA_DATA.overviewDocument;
  AppState.currentSubjectId = doc.id;
  
  const breadcrumbEl = document.getElementById("canvasBreadcrumb");
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `<span class="breadcrumb-folder">Resource</span> / <span style="color: var(--text-main); font-weight: 700;">${doc.title}</span>`;
  }
  
  const proseContainer = document.getElementById("markdownProseContent");
  const tocContainer = document.getElementById("tocList");
  
  let md = await fetchMarkdown(doc.path);
  const parsedHTML = marked.parse(md);
  proseContainer.innerHTML = `<div class="markdown-prose">${parsedHTML}</div>`;
  postProcessMarkdown(proseContainer);
  buildTableOfContents(proseContainer, tocContainer);

  renderSidebar();
  renderTopicList();
  document.querySelector(".sidebar")?.classList.remove("open");
};

// -------------------------------------------------------------
// 7. FULLSCREEN / FOCUS READING MODE
// -------------------------------------------------------------
window.toggleFullscreenView = function() {
  const container = document.querySelector(".app-container");
  const btn = document.getElementById("fullscreenBtn");
  const btnText = document.getElementById("fullscreenBtnText");
  
  if (!container) return;
  const isFullscreen = container.classList.toggle("fullscreen-mode");

  if (isFullscreen) {
    btn?.classList.add("active-focus");
    if (btnText) btnText.textContent = "Exit";
    btn.innerHTML = `<span>✕</span> <span id="fullscreenBtnText">Exit</span>`;
  } else {
    btn?.classList.remove("active-focus");
    if (btnText) btnText.textContent = "Fullscreen";
    btn.innerHTML = `<span>⛶</span> <span id="fullscreenBtnText">Fullscreen</span>`;
  }
};

window.addEventListener("keydown", (e) => {
  if ((e.key === "f" || e.key === "F") && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    toggleFullscreenView();
  }
  if (e.key === "Escape") {
    const container = document.querySelector(".app-container");
    if (container && container.classList.contains("fullscreen-mode")) {
      toggleFullscreenView();
    }
  }
});

// -------------------------------------------------------------
// 8. CGPA CALCULATOR MODAL
// -------------------------------------------------------------
window.openCgpaModal = function() {
  document.getElementById("cgpaModal")?.classList.add("open");
  calculateLiveCgpa();
};

window.closeCgpaModal = function() {
  document.getElementById("cgpaModal")?.classList.remove("open");
};

window.calculateLiveCgpa = function() {
  const sem1 = parseFloat(document.getElementById("calcSem1").value) || 7.29;
  const sem2 = parseFloat(document.getElementById("calcSem2").value) || 7.13;
  const targetSem3 = parseFloat(document.getElementById("calcSem3").value) || 8.71;
  const targetSem4 = parseFloat(document.getElementById("calcSem4").value) || 9.50;

  const totalGPV = (sem1 * 28) + (sem2 * 32) + (targetSem3 * 28) + (targetSem4 * 32);
  const finalCGPA = (totalGPV / 120).toFixed(2);
  const approxMarksPercent = ((finalCGPA - 0.75) * 10).toFixed(1);

  document.getElementById("calcResultCgpa").textContent = finalCGPA;
  document.getElementById("calcResultPercent").textContent = `~${approxMarksPercent}% Aggregate Marks`;
  
  const badgeEl = document.getElementById("calcResultBadge");
  if (finalCGPA >= 8.0) {
    badgeEl.textContent = "🏆 First Class with Distinction";
    badgeEl.style.background = "#2563EB";
  } else if (finalCGPA >= 6.75) {
    badgeEl.textContent = "🌟 First Class";
    badgeEl.style.background = "#1D4ED8";
  } else {
    badgeEl.textContent = "Second Class";
    badgeEl.style.background = "#6B7280";
  }
};

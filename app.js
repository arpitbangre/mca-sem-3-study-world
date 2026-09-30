/**
 * MCA Sem 3 Study World — Core Application Logic
 * Crafted with ⚡ by Arpit Manoj Bangre • MCA RTMNU
 * Supercharged for Zero-Defect PYQ Inspection & Interactive Navigation
 */

const AppState = {
  currentSubjectId: "3t4_ai",
  currentViewMode: "syllabus", // "syllabus" | "imp_questions" | "solved_answers" | "blueprint"
  currentActiveUnit: "all",
  searchQuery: "",
  theme: localStorage.getItem("notes_theme") || "light",
  fontSize: parseInt(localStorage.getItem("notes_fontsize")) || 15,
  cachedMarkdown: {},
  currentScanModal: {
    images: [],
    currentIndex: 0,
    title: "",
    paperCode: "",
    session: "",
    zoom: 1.0
  }
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

// -------------------------------------------------------------
// URL HASH ROUTER
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// THEME ENGINE
// -------------------------------------------------------------
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

  // Sync Filter Chips in Panel
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
  if (currentSubj.units) {
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
  }

  // Card: PYQ Exam Papers Bank
  const pyqKey = Object.keys(window.MCA_PYQ_DATA || {}).find(k => k.startsWith(currentSubj.code));
  const pyqData = (window.MCA_PYQ_DATA && pyqKey) ? window.MCA_PYQ_DATA[pyqKey] : null;
  const paperCount = pyqData ? pyqData.papers.length : 0;

  if (!query || "pyq questions imp papers previous year exams".includes(query) || (pyqData && query.length > 2)) {
    cardsHTML += `
      <div class="note-card ${AppState.currentViewMode === 'imp_questions' ? 'active' : ''}"
           onclick="setViewMode('imp_questions')">
        <div class="card-top">
          <div class="card-title">🔥 RTMNU Exam Papers (${paperCount} Sessions)</div>
        </div>
        <div class="card-preview-text">Zero-defect transcribed question sheets with scanned papers.</div>
        <div class="card-footer">
          <div class="card-meta"><span>${paperCount > 0 ? paperCount + ' Official Papers' : 'Model Papers'}</span></div>
          <div class="card-tags"><span class="tag-pill amber">PYQ Vault</span></div>
        </div>
      </div>
    `;
  }

  // Card: Solved Answers
  if (!query || "solved answers solutions questions".includes(query)) {
    cardsHTML += `
      <div class="note-card ${AppState.currentViewMode === 'solved_answers' ? 'active' : ''}"
           onclick="setViewMode('solved_answers')">
        <div class="card-top">
          <div class="card-title">💡 Solved Model Answers</div>
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
  }, 120);
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
        🔥 RTMNU Exam Papers
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
    // Build TOC for Papers
    if (tocContainer) {
      const pyqKey = Object.keys(window.MCA_PYQ_DATA || {}).find(k => k.startsWith(currentSubj.code));
      const pyqData = (window.MCA_PYQ_DATA && pyqKey) ? window.MCA_PYQ_DATA[pyqKey] : null;
      if (pyqData && pyqData.papers && pyqData.papers.length > 0) {
        tocContainer.innerHTML = `
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px; padding-left:8px;">
            Exam Sessions
          </div>
          ${pyqData.papers.map(p => {
            const safeId = "paper-" + p.session.toLowerCase().replace(/[^a-z0-9]/g, "-");
            return `<li class="toc-item"><a href="#${safeId}" onclick="event.preventDefault(); document.getElementById('${safeId}')?.scrollIntoView({behavior:'smooth'});">📄 ${p.session} (${p.code})</a></li>`;
          }).join("")}
        `;
      } else {
        tocContainer.innerHTML = `<li class="toc-item"><a href="#">📑 PYQ Vault</a></li>`;
      }
    }
  } else if (AppState.currentViewMode === "solved_answers") {
    proseContainer.innerHTML = tabsHTML + renderSolvedAnswersView(currentSubj);
    if (tocContainer) tocContainer.innerHTML = `<li class="toc-item"><a href="#">📝 Answer Sheet Format</a></li>`;
  } else if (AppState.currentViewMode === "blueprint") {
    proseContainer.innerHTML = tabsHTML + renderBlueprintView(currentSubj);
    if (tocContainer) tocContainer.innerHTML = `<li class="toc-item"><a href="#">📊 Exam Pattern (80+20)</a></li>`;
  }
}

// -------------------------------------------------------------
// PYQ EXAM PAPERS VIEW
// -------------------------------------------------------------
function renderIMPQuestionsView(subj) {
  const pyqKey = Object.keys(window.MCA_PYQ_DATA || {}).find(k => k.startsWith(subj.code));
  const pyqData = (window.MCA_PYQ_DATA && pyqKey) ? window.MCA_PYQ_DATA[pyqKey] : null;

  if (!pyqData || !pyqData.papers || pyqData.papers.length === 0) {
    return `
      <div style="padding: 32px 16px; text-align: center; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); margin-top: 16px;">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">📑</div>
        <h3 style="font-family: var(--font-heading); color: var(--text-main); margin-bottom: 8px;">Practical & Lab Blueprint</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 500px; margin: 0 auto 16px;">
          For practical subjects, internal and external viva/practical assessments are conducted based on the official lab manual exercises.
        </p>
        <button class="tool-btn primary" onclick="setViewMode('syllabus')">Back to Practical Exercises</button>
      </div>
    `;
  }

  const unitMap = {
    "Q1": "Unit I",
    "Q2": "Unit II",
    "Q3": "Unit III",
    "Q4": "Unit IV"
  };

  const papersHTML = pyqData.papers.map((paper, pIdx) => {
    const safeId = "paper-" + paper.session.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const safeSession = paper.session.replace(/ /g, "_");
    
    // Scan viewer buttons
    const scanButtons = paper.images.map((img, i) => `
      <button class="scan-btn" onclick="openScanModal('${paper.code}', '${paper.paper_title.replace(/'/g, "\\'")}', '${pyqKey}', '${safeSession}', ${i})">
        📄 Page ${i + 1} Scan
      </button>
    `).join(" ");

    const sec = paper.sections;
    const questionsList = ["Q1", "Q2", "Q3", "Q4"].map(qid => {
      if (!sec[qid]) return "";

      const eitherItems = sec[qid].either.map(q => `
        <div style="margin-bottom: 8px; display:flex; justify-content:space-between; align-items:baseline; gap:12px;">
          <div><strong style="color:var(--accent-primary);">${q[0]}</strong> <span style="color:var(--text-main); line-height:1.5;">${q[1].replace(/\n/g, '<br/>&nbsp;&nbsp;')}</span></div>
          <span class="tag-pill slate" style="font-size:0.75rem; white-space:nowrap; flex-shrink:0;">${q[2]} Marks</span>
        </div>
      `).join("");

      const orItems = sec[qid].or.map(q => `
        <div style="margin-bottom: 8px; display:flex; justify-content:space-between; align-items:baseline; gap:12px;">
          <div><strong style="color:var(--accent-primary);">${q[0]}</strong> <span style="color:var(--text-main); line-height:1.5;">${q[1].replace(/\n/g, '<br/>&nbsp;&nbsp;')}</span></div>
          <span class="tag-pill slate" style="font-size:0.75rem; white-space:nowrap; flex-shrink:0;">${q[2]} Marks</span>
        </div>
      `).join("");

      return `
        <div class="question-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid var(--border-subtle); padding-bottom:8px;">
            <div style="font-weight:700; font-family:var(--font-heading); color:var(--text-main); font-size:1rem;">
              Question ${qid.replace("Q", "")} · <span style="color:var(--accent-primary);">${unitMap[qid]}</span>
            </div>
            <span class="tag-pill amber" style="font-size:0.75rem;">16 Marks (Choice)</span>
          </div>
          <div style="font-size:0.74rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px;">EITHER:</div>
          <div style="padding-left:4px; margin-bottom:12px;">${eitherItems}</div>
          
          <div style="text-align:center; position:relative; margin:12px 0;">
            <hr style="border:none; border-top:1px dashed var(--border-subtle); margin:0;" />
            <span style="position:relative; top:-10px; background:var(--bg-app); padding:0 12px; font-size:0.75rem; font-weight:800; color:var(--accent-primary); border-radius:12px; border:1px solid var(--border-subtle);">OR</span>
          </div>
          
          <div style="font-size:0.74rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px;">OR:</div>
          <div style="padding-left:4px;">${orItems}</div>
        </div>
      `;
    }).join("");

    const q5Compulsory = sec.Q5 ? `
      <div class="question-box" style="border-left: 3px solid #E11D48;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid var(--border-subtle); padding-bottom:8px;">
          <div style="font-weight:700; font-family:var(--font-heading); color:var(--text-main); font-size:1rem;">
            Question 5 · <span style="color:#E11D48;">Compulsory Short Notes (All Units)</span>
          </div>
          <span class="tag-pill rose" style="font-size:0.75rem;">4 × 4M = 16 Marks</span>
        </div>
        ${sec.Q5.compulsory.map(q => `
          <div style="margin-bottom: 8px; display:flex; justify-content:space-between; align-items:baseline; gap:12px;">
            <div><strong style="color:#E11D48;">${q[0]}</strong> <span style="color:var(--text-main); line-height:1.5;">${q[1]}</span></div>
            <span class="tag-pill slate" style="font-size:0.75rem; white-space:nowrap; flex-shrink:0;">${q[2]} Marks</span>
          </div>
        `).join("")}
      </div>
    ` : "";

    return `
      <section id="${safeId}" class="pyq-paper-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="tag-pill indigo" style="font-size:0.74rem; font-weight:700;">RTMNU CBCS EXAM</span>
              <span class="tag-pill slate" style="font-size:0.74rem; font-weight:700;">Code: ${paper.code}</span>
            </div>
            <h3 style="font-family:var(--font-heading); font-size:1.3rem; margin:0 0 4px 0; color:var(--text-main);">${paper.session} — ${paper.paper_title}</h3>
            <div style="font-size:0.8rem; color:var(--text-muted);">${paper.exam}</div>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            ${scanButtons}
            <a href="pyq/${pyqKey}/${safeSession}/${pyqKey}_${safeSession}.md" target="_blank" class="scan-btn" style="background:rgba(100,116,139,0.1); border-color:var(--border-subtle); color:var(--text-main);">
              📥 Paper MD
            </a>
          </div>
        </div>

        <div style="display:flex; gap:14px; font-size:0.82rem; color:var(--text-muted); background:var(--bg-app); padding:10px 14px; border-radius:var(--radius-sm); margin-bottom:16px; border:1px solid var(--border-subtle); flex-wrap:wrap;">
          <div>⏱️ <strong>Duration:</strong> ${paper.time}</div>
          <div>🎯 <strong>Max Marks:</strong> ${paper.max_marks}</div>
          <div>📌 <strong>Structure:</strong> 5 Questions × 16 Marks (Strict Unit-wise Internal Choice)</div>
        </div>

        <div class="paper-questions-body">
          ${questionsList}
          ${q5Compulsory}
        </div>
      </section>
    `;
  }).join("");

  return `
    <div class="pyq-hub-container" style="max-width:960px; margin:0 auto; padding:12px 0;">
      <!-- Hero Banner -->
      <div style="background:linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(99,102,241,0.04) 100%); border:1px solid rgba(37,99,235,0.25); border-radius:var(--radius-lg); padding:22px; margin-bottom:24px; position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(37,99,235,0.15); color:var(--accent-primary); padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:8px;">
              <span>🏛️ OFFICIAL RTMNU EXAMINATION QUESTION PAPERS</span>
            </div>
            <h2 style="font-family:var(--font-heading); font-size:1.55rem; margin:0 0 6px 0; color:var(--text-main);">
              ${subj.code}: ${subj.name} PYQ Vault
            </h2>
            <p style="margin:0; font-size:0.88rem; color:var(--text-muted); max-width:680px; line-height:1.5;">
              100% verified and authenticated examination questions transcribed from physical question sheets with high-resolution original scan verification.
            </p>
          </div>
          <div style="display:flex; gap:8px;">
            <a href="pyq/${pyqKey}/${pyqKey}_PYQ_Master.md" target="_blank" class="scan-btn" style="background:var(--accent-primary); color:white; border:none; padding:8px 16px;">
              📥 Subject Master Bank
            </a>
          </div>
        </div>

        <div style="display:flex; gap:8px; margin-top:16px; flex-wrap:wrap;">
          <span class="tag-pill amber">⚡ ${pyqData.papers.length} Exam Sessions Preserved</span>
          <span class="tag-pill slate">📝 4-Mark & 16-Mark Question Breakdown</span>
          <span class="tag-pill emerald">🔒 100% Zero Error Physical Scan Match</span>
        </div>
      </div>

      <!-- Quick Session Jump Navigation -->
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:20px; overflow-x:auto; padding-bottom:6px;">
        <span style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; white-space:nowrap;">Jump To Session:</span>
        ${pyqData.papers.map(p => {
          const sId = "paper-" + p.session.toLowerCase().replace(/[^a-z0-9]/g, "-");
          return `<button class="tag-pill slate" onclick="document.getElementById('${sId}')?.scrollIntoView({behavior:'smooth'})" style="cursor:pointer; border:1px solid var(--border-subtle);">${p.session} (${p.code})</button>`;
        }).join(" ")}
      </div>

      <!-- Papers Stack -->
      <div class="pyq-papers-stack">
        ${papersHTML}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// SCAN VIEWER LIGHTBOX MODAL LOGIC
// -------------------------------------------------------------
window.openScanModal = function(paperCode, title, subjectDir, sessionFolder, pageIndex) {
  const pyqData = window.MCA_PYQ_DATA ? window.MCA_PYQ_DATA[subjectDir] : null;
  let images = [];
  
  if (pyqData && pyqData.papers) {
    const cleanSession = sessionFolder.replace(/_/g, ' ');
    const paper = pyqData.papers.find(p => p.session === cleanSession);
    if (paper && paper.images) {
      images = paper.images.map((_, idx) => `pyq/${subjectDir}/${sessionFolder}/Page_${idx + 1}.jpg`);
    }
  }

  if (images.length === 0) {
    images = [`pyq/${subjectDir}/${sessionFolder}/Page_${pageIndex + 1}.jpg`];
  }

  AppState.currentScanModal = {
    images: images,
    currentIndex: pageIndex,
    title: title,
    paperCode: paperCode,
    session: sessionFolder.replace(/_/g, ' '),
    zoom: 1.0
  };

  updateScanModalUI();
  document.getElementById("scanModal")?.classList.add("open");
};

function updateScanModalUI() {
  const modal = AppState.currentScanModal;
  const imgEl = document.getElementById("scanModalImg");
  const titleEl = document.getElementById("scanModalTitle");
  const subtitleEl = document.getElementById("scanModalSubtitle");
  const pageIndicatorEl = document.getElementById("scanPageIndicator");
  const downloadBtn = document.getElementById("scanModalDownloadBtn");
  const zoomLevelEl = document.getElementById("scanZoomLevel");
  const prevBtn = document.getElementById("scanPrevBtn");
  const nextBtn = document.getElementById("scanNextBtn");

  const currentImgSrc = modal.images[modal.currentIndex] || "";

  if (titleEl) titleEl.textContent = `${modal.paperCode} — ${modal.title}`;
  if (subtitleEl) subtitleEl.textContent = `RTMNU Session: ${modal.session} · Original Question Paper Scan`;
  if (pageIndicatorEl) pageIndicatorEl.textContent = `Page ${modal.currentIndex + 1} of ${modal.images.length}`;
  if (downloadBtn) downloadBtn.href = currentImgSrc;
  if (zoomLevelEl) zoomLevelEl.textContent = `${Math.round(modal.zoom * 100)}%`;

  if (imgEl) {
    imgEl.src = currentImgSrc;
    imgEl.style.transform = `scale(${modal.zoom})`;
  }

  if (prevBtn) prevBtn.disabled = modal.currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = modal.currentIndex >= modal.images.length - 1;
}

window.closeScanModal = function() {
  document.getElementById("scanModal")?.classList.remove("open");
  AppState.currentScanModal.zoom = 1.0;
};

window.zoomScan = function(delta) {
  AppState.currentScanModal.zoom = Math.max(0.4, Math.min(3.0, AppState.currentScanModal.zoom + delta));
  const imgEl = document.getElementById("scanModalImg");
  const zoomLevelEl = document.getElementById("scanZoomLevel");
  if (imgEl) imgEl.style.transform = `scale(${AppState.currentScanModal.zoom})`;
  if (zoomLevelEl) zoomLevelEl.textContent = `${Math.round(AppState.currentScanModal.zoom * 100)}%`;
};

window.resetScanZoom = function() {
  AppState.currentScanModal.zoom = 1.0;
  const imgEl = document.getElementById("scanModalImg");
  const zoomLevelEl = document.getElementById("scanZoomLevel");
  if (imgEl) imgEl.style.transform = `scale(1)`;
  if (zoomLevelEl) zoomLevelEl.textContent = `100%`;
};

window.prevScanPage = function() {
  if (AppState.currentScanModal.currentIndex > 0) {
    AppState.currentScanModal.currentIndex--;
    AppState.currentScanModal.zoom = 1.0;
    updateScanModalUI();
  }
};

window.nextScanPage = function() {
  if (AppState.currentScanModal.currentIndex < AppState.currentScanModal.images.length - 1) {
    AppState.currentScanModal.currentIndex++;
    AppState.currentScanModal.zoom = 1.0;
    updateScanModalUI();
  }
};

// -------------------------------------------------------------
// SOLVED ANSWERS & BLUEPRINT VIEWS
// -------------------------------------------------------------
function renderSolvedAnswersView(subj) {
  return `
    <div class="coming-soon-hero">
      <div class="coming-soon-badge" style="background: #2563EB;">💡 MODEL ANSWER SHEETS</div>
      <h2 class="coming-soon-title">RTMNU High-Score Solved Solutions</h2>
      <p class="coming-soon-desc">
        Comprehensive 80-mark model answers curated for <strong>${subj.code}: ${subj.name}</strong>. Formatted strictly for RTMNU evaluators with stepwise headings, architecture diagrams, and algorithm tables.
      </p>
      
      <div class="blueprint-summary" style="margin-top: 24px; text-align: left; max-width: 640px; margin-left: auto; margin-right: auto;">
        <h4 style="font-family: var(--font-heading); color: var(--text-main); margin-bottom: 12px;">Exam Presentation Standard (RTMNU Best Practices):</h4>
        <ul style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.8;">
          <li><strong>16-Mark Questions:</strong> Definition + Block Diagram + Architectural Workflow + 2 Comparative Tables + Example Trace.</li>
          <li><strong>8-Mark Sub-questions:</strong> Core principle + neat hand-drawn diagram + 6-8 structured points + application context.</li>
          <li><strong>4-Mark Short Notes:</strong> Concise definition + 4 distinct bullet characteristics or equations.</li>
        </ul>
      </div>

      <div style="margin-top: 28px;">
        <button class="tool-btn primary" onclick="setViewMode('imp_questions')">Browse Official Exam Papers</button>
      </div>
    </div>
  `;
}

function renderBlueprintView(subj) {
  return `
    <div class="blueprint-container" style="max-width: 820px; margin: 0 auto; padding: 20px 0;">
      <div class="blueprint-header">
        <span class="tag-pill indigo" style="margin-bottom: 8px;">Official RTMNU Pattern</span>
        <h1 style="font-family: var(--font-heading); font-size: 1.8rem; margin: 0 0 8px 0;">
          ${subj.code}: ${subj.name} Exam Scheme
        </h1>
        <p style="color: var(--text-muted); margin: 0;">2-Year Master of Computer Applications (CBCS) • Total Marks: 100</p>
      </div>

      <h2>📋 University Theory Examination (80 Marks)</h2>
      <table class="blueprint-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Unit Coverage</th>
            <th>Choice Pattern</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Q1</strong></td><td>Unit 1</td><td>Internal Choice (Q1 OR Q1) [8M + 8M]</td><td>16 Marks</td></tr>
          <tr><td><strong>Q2</strong></td><td>Unit 2</td><td>Internal Choice (Q2 OR Q2) [8M + 8M]</td><td>16 Marks</td></tr>
          <tr><td><strong>Q3</strong></td><td>Unit 3</td><td>Internal Choice (Q3 OR Q3) [8M + 8M]</td><td>16 Marks</td></tr>
          <tr><td><strong>Q4</strong></td><td>Unit 4</td><td>Internal Choice (Q4 OR Q4) [8M + 8M]</td><td>16 Marks</td></tr>
          <tr><td><strong>Q5</strong></td><td><strong>All 4 Units</strong></td><td>4 Compulsory Sub-questions (a, b, c, d) of 4M each</td><td>16 Marks</td></tr>
          <tr><td><strong>TOTAL</strong></td><td><strong>Entire Syllabus</strong></td><td><strong>5 Questions × 16 Marks</strong></td><td><strong>80 Marks</strong></td></tr>
        </tbody>
      </table>

      <h2>🎯 Internal Assessment (20 Marks)</h2>
      <ul>
        <li><strong>Class Test / Mid-term</strong>: 10 Marks</li>
        <li><strong>Home Assignments / Seminar Presentation</strong>: 5 Marks</li>
        <li><strong>Attendance & Active Class Conduct</strong>: 5 Marks</li>
      </ul>

      <div style="margin-top: 24px;">
        <button class="tool-btn primary" onclick="setViewMode('imp_questions')">View Verified Question Papers</button>
      </div>
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
          <a href="#${id}" onclick="event.preventDefault(); document.getElementById('${id}')?.scrollIntoView({behavior: 'smooth'});">
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

  // Modal keyboard listeners
  window.addEventListener("keydown", (e) => {
    const scanModal = document.getElementById("scanModal");
    if (scanModal && scanModal.classList.contains("open")) {
      if (e.key === "Escape") {
        closeScanModal();
      } else if (e.key === "ArrowLeft") {
        prevScanPage();
      } else if (e.key === "ArrowRight") {
        nextScanPage();
      } else if (e.key === "+" || e.key === "=") {
        zoomScan(0.2);
      } else if (e.key === "-" || e.key === "_") {
        zoomScan(-0.2);
      } else if (e.key === "0") {
        resetScanZoom();
      }
    }
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
  let doc;
  if (docType === 'roadmap') doc = MCA_DATA.academicRoadmap;
  else if (docType === 'overview') doc = MCA_DATA.overviewDocument;
  else if (docType === 'pyq_vault') doc = MCA_DATA.pyqVaultDocument;
  else if (docType === 'heatmap') doc = MCA_DATA.heatmapDocument;
  else if (docType === 'imp_plan') doc = MCA_DATA.impPlanDocument;
  else doc = MCA_DATA.overviewDocument;

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

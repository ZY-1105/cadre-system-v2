/**
 * app-k3.js - 力合·人才智库 K3 升级版本
 * Header 保持原样，Sidebar 升级为 K3 风格
 */

// ==================== 品牌色系配置 ====================
const BRAND_COLORS = {
  primary: '#8e2294',
  primaryDark: '#7a1d80',
  primaryLight: 'rgba(142, 34, 148, 0.08)',
  primaryMedium: 'rgba(142, 34, 148, 0.15)',
  bg: '#f5f3f0',
  surface: '#fbfaf9',
  text: '#000000',
  textSecondary: 'rgba(0, 0, 0, 0.65)',
  textTertiary: 'rgba(0, 0, 0, 0.40)',
  border: 'rgba(0, 0, 0, 0.08)'
};

// ==================== Header 渲染（保持原样） ====================
function renderNav(pageTitle) {
  const nav = document.createElement('header');
  nav.className = 'app-header';
  nav.innerHTML = `
    <div class="header-brand">
      <div class="brand-icon" style="background:none;border-radius:0;overflow:hidden;">
        <img src="https://zhengxin-pub.cdn.bcebos.com/logopic/1faf5580c8a6bd6c8adccf48dcfd9195_fullsize.jpg" alt="力合科创" style="height:32px;width:auto;object-fit:contain;">
      </div>
      <div>
        <div class="brand-text">力合·人才智库</div>
        <div class="brand-subtitle">力合科创干部管理数智平台</div>
      </div>
      <span class="page-title">${pageTitle}</span>
    </div>
    <div class="header-actions">
      <button class="k3-sidebar-toggle" id="mobileMenuToggle" title="展开菜单" onclick="toggleSidebar()">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div class="user-info">
        <span class="user-name">管理员</span>
        <div class="user-avatar">管</div>
      </div>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
}

// ==================== 侧边栏渲染（K3 分组导航） ====================
function renderSidebar(currentPage) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'k3-sidebar';
  sidebar.id = 'appSidebar';

  sidebar.innerHTML = `
    <nav class="k3-nav" id="k3-nav">

      <a href="dashboard.html" class="k3-nav-item" data-page="dashboard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>驾驶舱</span>
      </a>

      <div class="k3-nav-divider">— 干部管理 —</div>
      <a href="cadre-list.html" class="k3-nav-item" data-page="cadre-list">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>干部信息</span>
      </a>
      <a href="appointment.html" class="k3-nav-item" data-page="appointment">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        <span>异动管理</span>
      </a>
      <a href="directors.html" class="k3-nav-item" data-page="directors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>董监高管理</span>
      </a>

      <div class="k3-nav-divider">— 人才历练 —</div>
      <a href="cadre-inspection.html" class="k3-nav-item" data-page="cadre-inspection">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>干部考察</span>
      </a>
      <a href="cadre-selection.html" class="k3-nav-item" data-page="cadre-selection">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
        <span>选聘任用</span>
      </a>
      <a href="talent-review.html" class="k3-nav-item" data-page="talent-review">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>人才盘点</span>
      </a>

      <div class="k3-nav-divider">— 智能报表 —</div>
      <a href="report.html" class="k3-nav-item" data-page="report">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <span>智能报表</span>
      </a>

    </nav>
  `;

  document.body.insertBefore(sidebar, document.body.children[1] || null);

  const overlay = document.createElement('div');
  overlay.className = 'k3-sidebar-overlay';
  overlay.id = 'appSidebarOverlay';
  overlay.setAttribute('onclick', 'toggleSidebar()');
  document.body.insertBefore(overlay, sidebar.nextSibling);
}

// ==================== 布局渲染 ====================
function renderLayout(pageTitle, currentPage) {
  renderNav(pageTitle);
  renderSidebar(currentPage);
  initMobileMenu();
  highlightNav();
}

// ==================== 侧边栏当前项高亮 ====================
function highlightNav() {
  const currentPage = location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.k3-nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || href === './' + currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ==================== 工具函数（保留） ====================
function fetchData(url, options = {}) {
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  }).then(res => res.json());
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatNumber(num) {
  if (num === undefined || num === null) return '-';
  return num.toLocaleString('zh-CN');
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit = 300) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function toggleSidebar() {
  const sidebar = document.querySelector('.k3-sidebar');
  const overlay = document.querySelector('.k3-sidebar-overlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('active', isOpen);
}

function initMobileMenu() {
  // 汉堡按钮通过 onclick="toggleSidebar()" 控制；遮罩层也通过 onclick="toggleSidebar()" 关闭
}

function showModal(options) {
  console.log('Modal:', options);
}
/**
 * app.js - 力合·人才智库 V2 公共模块
 * 品牌色：#8e2294（主色）、#6b1a70（辅色）、#F8C24C（品牌金）
 */

// ==================== 品牌色系配置 ====================
const BRAND_COLORS = {
  primary: '#8e2294',
  primaryDark: '#6b1a70',
  primaryLight: '#a855a8',
  accent: '#F8C24C',
  accentLight: '#fdecc8',
  bg: '#f5f3f7',
  surface: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#4a4a6a',
  border: '#e8e0ec',
  success: '#27ae60',
  warning: '#e67e22',
  danger: '#c0392b'
};

// ==================== 导航栏渲染 ====================
function renderNav(pageTitle) {
  const nav = document.createElement('header');
  nav.className = 'app-header';
  nav.innerHTML = `
    <div class="header-brand">
      <div class="brand-icon" style="background:none;border-radius:0;overflow:hidden;">
        <img src="https://zhengxin-pub.cdn.bcebos.com/logopic/1faf5580c8a6bd6c8adccf48dcfd9195_fullsize.jpg" alt="力合科创" style="height:36px;width:auto;object-fit:contain;">
      </div>
      <div class="brand-text-wrap">
        <span class="brand-text">力合·人才智库</span>
        <span class="brand-subtitle">力合科创干部数智平台</span>
      </div>
      <span class="page-title">${pageTitle}</span>
    </div>
    <div class="header-actions">
      <button class="header-btn" id="mobileMenuToggle" title="展开菜单">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" fill="none"/>
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

// ==================== 侧边栏渲染 ====================
function renderSidebar(currentPage) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'app-sidebar';
  sidebar.id = 'appSidebar';

  const menuItems = [
    { id: 'dashboard', label: '驾驶舱', href: 'dashboard.html', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'cadre', label: '干部信息', href: 'cadre-list.html', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
    { id: 'appointment', label: '任免管理', href: 'appointment.html', icon: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z' },
    { id: 'directors', label: '董监高管理', href: 'directors.html', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
    { id: 'archive', label: '档案管理', href: 'archive.html', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
    { id: 'talent-review', label: '人才盘点', href: 'talent-review.html', icon: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z' }
  ];

  sidebar.innerHTML = `
    <nav class="sidebar-nav">
      ${menuItems.map(item => `
        <a href="${item.href}" class="sidebar-link ${item.id === currentPage ? 'active' : ''}" data-page="${item.id}">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="${item.icon}" fill="currentColor"/></svg>
          <span class="link-text">${item.label}</span>
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <span>力合科创干部数智平台 · 人力资源部</span>
    </div>
  `;

  document.body.insertBefore(sidebar, document.body.children[1] || null);
}

// ==================== 统一布局渲染 ====================
function renderLayout(pageTitle, currentPage) {
  document.body.className = 'app-layout';
  renderNav(pageTitle);
  renderSidebar(currentPage);
  initMobileMenu();
}

// ==================== 数据获取封装 ====================
async function fetchData(endpoint) {
  if (typeof window !== 'undefined' && window.MOCK_DATA) {
    return window.MOCK_DATA[endpoint] || [];
  }
  try {
    return window.MOCK_DATA[endpoint] || [];
  } catch (e) {
    console.error('数据加载失败:', e);
    return [];
  }
}

// ==================== 工具函数 ====================
function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
}

function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined || isNaN(num)) return '-';
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, interval = 200) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// ==================== 移动端侧边栏切换 ====================
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('appSidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-open');
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)) {
      sidebar.classList.remove('sidebar-open');
    }
  });
}

// ==================== 弹窗工具 ====================
function showModal(title, contentHTML) {
  let overlay = document.getElementById('modalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">${contentHTML}</div>
    </div>
  `;

  overlay.classList.add('active');

  overlay.querySelector('.modal-close').addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}


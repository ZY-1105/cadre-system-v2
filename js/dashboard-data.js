/* ============================================================
   dashboard-data.js —— 驾驶舱数据驱动模块
   A~F 方案完整落地（兼容当前 dashboard.html 结构）
   ============================================================ */

const dashboardData = {
  stats: {
    total:   { value: 60, label: '干部总数', meta: '全单位在编' },
    onDuty:  { value: 55, label: '在岗数', meta: '不含试用/待岗' },
    party:   { value: 48, label: '党员数', meta: '中共党员' },
    avgAge:  { value: 42, label: '平均年龄', meta: '截止本季度' }
  },

  rank: {
    total: 60,
    center: { value: '60', unit: '在编干部' },
    items: [
      { name: '领导班子', count: 12, pct: 20, color: '#8e2294' },
      { name: '中层正职', count: 18, pct: 30, color: '#b04cb5' },
      { name: '中层副职', count: 16, pct: 27, color: '#d9a3dd' },
      { name: '基层干部', count: 14, pct: 23, color: '#ebd4ed' }
    ]
  },

  edu: {
    total: 60,
    center: { value: '88%', unit: '本科及以上' },
    items: [
      { name: '博士研究生', count: 7,  pct: 12, color: '#8e2294' },
      { name: '硕士研究生', count: 36, pct: 60, color: '#b04cb5' },
      { name: '大学本科',   count: 17, pct: 28, color: '#d9a3dd' },
      { name: '大专及以下', count: 0,  pct: 0,  color: '#ebd4ed' }
    ]
  },

  age: {
    total: 60,
    items: [
      { label: '30岁以下', count: 8,  pct: 13 },
      { label: '31-40岁',  count: 22, pct: 37 },
      { label: '41-50岁',  count: 24, pct: 40 },
      { label: '50岁以上', count: 6,  pct: 10 }
    ]
  },

  insight: {
    warning:    { value: 5,  label: '需关注',  pct: 8,  action: '查看预警干部' },
    completion: { value: 78, label: '本季度',  pct: 78, action: '查看盘点进度' },
    tenure:     { value: 3,  label: '6个月内', pct: 5,  action: '查看任期预警' }
  },

  tabs: {
    vacancy:   { label: '岗位空缺',     value: 3, unit: '岗', color: 'danger' },
    retire:    { label: '即将退休',     value: 2, unit: '人', color: 'warning' },
    promotion: { label: '年度晋升/交流', value: 5, unit: '人', color: 'primary' },
    rotation:  { label: '应轮岗',       value: 4, unit: '人', color: 'info' }
  }
};

/* ========== 渲染引擎 ========== */

function renderStats() {
  const cards = document.querySelectorAll('.stat-card');
  const keys = ['total', 'onDuty', 'party', 'avgAge'];
  keys.forEach((key, idx) => {
    const card = cards[idx];
    if (!card) return;
    const data = dashboardData.stats[key];
    const valueEl = card.querySelector('.stat-value');
    const labelEl = card.querySelector('.stat-label');
    const metaEl = card.querySelector('.stat-meta');
    if (valueEl) {
      valueEl.textContent = data.value;
      valueEl.classList.remove('loading');
    }
    if (labelEl) labelEl.textContent = data.label;
    if (metaEl) metaEl.textContent = data.meta;
  });
}

function renderRank() {
  const container = document.querySelector('#rank-legend');
  if (!container) return;
  container.innerHTML = dashboardData.rank.items.map(item => `
    <div class="chart-legend-item">
      <span class="chart-legend-dot" style="background:${item.color}"></span>
      <span class="chart-legend-name">${item.name}</span>
      <span class="chart-legend-count">${item.count}</span>
      <span class="chart-legend-percent">${item.pct}%</span>
    </div>
  `).join('');

  const center = document.querySelector('#rank-chart-dom .chart-center-text, #rank-center');
  if (center) {
    center.innerHTML = `<strong>${dashboardData.rank.center.value}</strong>${dashboardData.rank.center.unit}`;
  }
}

function renderEdu() {
  const container = document.querySelector('#edu-legend');
  if (!container) return;
  container.innerHTML = dashboardData.edu.items.map(item => `
    <div class="chart-legend-item">
      <span class="chart-legend-dot" style="background:${item.color}"></span>
      <span class="chart-legend-name">${item.name}</span>
      <span class="chart-legend-count">${item.count}</span>
      <span class="chart-legend-percent">${item.pct}%</span>
    </div>
  `).join('');

  const center = document.querySelector('#edu-chart-dom .chart-center-text, #edu-center');
  if (center) {
    center.innerHTML = `<strong>${dashboardData.edu.center.value}</strong>${dashboardData.edu.center.unit}`;
  }
}

function renderAge() {
  const container = document.querySelector('#age-chart');
  if (!container) return;
  container.innerHTML = dashboardData.age.items.map(item => `
    <div class="age-row">
      <span class="age-label">${item.label}</span>
      <div class="age-bar-track">
        <div class="age-bar-fill" style="width:${item.pct}%"></div>
      </div>
      <span class="age-count">${item.count}人</span>
    </div>
  `).join('') + `<div class="age-total">共${dashboardData.age.total}人</div>`;
}

function renderInsightCards() {
  const cards = document.querySelectorAll('.insight-card');
  const keys = ['warning', 'completion', 'tenure'];
  keys.forEach((key, idx) => {
    const card = cards[idx];
    if (!card) return;
    const data = dashboardData.insight[key];

    const valueEl = card.querySelector('.value');
    if (valueEl) {
      valueEl.textContent = data.value;
      valueEl.classList.remove('loading');
    }

    const subEl = card.querySelector('.insight-sub');
    if (subEl) subEl.textContent = data.label;

    const topEl = card.querySelector('.insight-value-top');
    if (topEl) {
      const topSuffix = key === 'completion' ? '% 进行中' : '人 待处理';
      topEl.textContent = `${data.value}${topSuffix}`;
    }

    const fill = card.querySelector('.mini-progress-fill');
    if (fill) fill.style.width = data.pct + '%';

    const actionEl = card.querySelector('.insight-action');
    if (actionEl) actionEl.textContent = data.action;
  });
}

function renderTabs() {
  // 优先适配当前 HTML：.insight-tabs-row 里已存在的 4 个 .insight-tab
  const tabs = document.querySelectorAll('.insight-tabs-row .insight-tab, #insight-tabs .insight-tab');
  const keys = ['vacancy', 'retire', 'promotion', 'rotation'];
  keys.forEach((key, idx) => {
    const tab = tabs[idx];
    if (!tab) return;
    const data = dashboardData.tabs[key];
    const labelEl = tab.querySelector('.insight-tab-label');
    const valueEl = tab.querySelector('.insight-tab-value');
    if (labelEl) labelEl.textContent = data.label;
    if (valueEl) {
      valueEl.innerHTML = `${data.value}<span class="insight-tab-unit">${data.unit}</span>`;
      valueEl.classList.remove('loading');
    }
  });

  // 若使用 #insight-tabs 动态容器，则整体重新生成
  const dynamicContainer = document.querySelector('#insight-tabs');
  if (dynamicContainer && dynamicContainer.children.length === 0) {
    const dotColorMap = {
      danger:  'var(--color-danger)',
      warning: 'var(--color-warning)',
      primary: 'var(--color-primary)',
      info:    '#3b82f6'
    };
    dynamicContainer.innerHTML = Object.entries(dashboardData.tabs).map(([key, data]) => `
      <div class="insight-tab k3-anim" data-tab="${key}">
        <span class="insight-tab-dot" style="background:${dotColorMap[data.color] || 'var(--color-primary)'};"></span>
        <span class="insight-tab-label">${data.label}</span>
        <span class="insight-tab-value">${data.value}<span class="insight-tab-unit">${data.unit}</span></span>
      </div>
    `).join('');
  }
}

/* ========== 原生 SVG 环形图（无需 ECharts） ========== */

function renderDonutChart(containerId, items, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const size = options.size || 130;
  const radius = options.radius || 48;
  const strokeWidth = options.strokeWidth || 16;
  const cx = size / 2;
  const cy = size / 2;

  const total = items.reduce((sum, i) => sum + (i.count || 0), 0) || 1;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const circles = items.map(item => {
    const count = item.count || 0;
    const ratio = count / total;
    const segment = ratio * circumference;
    const dasharray = `${segment.toFixed(2)} ${circumference.toFixed(2)}`;
    const circleOffset = -offset;
    offset += segment;
    return `<circle r="${radius}" fill="none" stroke="${item.color}" stroke-width="${strokeWidth}" stroke-dasharray="${dasharray}" stroke-dashoffset="${circleOffset.toFixed(2)}" transform="rotate(-90)"/>`;
  }).join('');

  const centerText = container.querySelector('.chart-center-text');
  container.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="position:absolute;top:0;left:0;">
      <g transform="translate(${cx},${cy})">
        ${circles}
      </g>
    </svg>
    ${centerText ? centerText.outerHTML : ''}
  `;
}

function renderRankChart() {
  renderDonutChart('rank-chart-dom', dashboardData.rank.items, { radius: 48, strokeWidth: 16, size: 130 });
}

function renderEduChart() {
  renderDonutChart('edu-chart-dom', dashboardData.edu.items, { radius: 48, strokeWidth: 16, size: 130 });
}

/* ========== 图表配置（适配 ECharts） ========== */

function getRankChartOption() {
  return {
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: { label: { show: false } },
      labelLine: { show: false },
      data: dashboardData.rank.items.map(i => ({
        value: i.count,
        name: i.name,
        itemStyle: { color: i.color }
      }))
    }]
  };
}

function getEduChartOption() {
  return {
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: { label: { show: false } },
      labelLine: { show: false },
      data: dashboardData.edu.items.map(i => ({
        value: i.count || 0.1,
        name: i.name,
        itemStyle: { color: i.color }
      }))
    }]
  };
}

/* ========== 初始化 ========== */

function initDashboard() {
  renderStats();
  renderRankChart();
  renderRank();
  renderEduChart();
  renderEdu();
  renderAge();
  renderInsightCards();
  renderTabs();

  // 图表库初始化（如使用 ECharts）
  // const rankChart = echarts.init(document.getElementById('rank-chart-dom'));
  // rankChart.setOption(getRankChartOption());
  // const eduChart = echarts.init(document.getElementById('edu-chart-dom'));
  // eduChart.setOption(getEduChartOption());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

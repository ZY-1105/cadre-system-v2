/**
 * charts.js - 力合·人才智库 V2 纯 SVG 图表库
 * 品牌色：#8e2294（主紫）#6b1a70（辅紫）#F8C24C（品牌金）
 *
 * 包含：
 *   - renderPieChart(containerId, data, options)
 *   - renderBarChart(containerId, data, options)
 *   - renderRadarChart(containerId, data, options)
 *   - renderNineBox(containerId, data, options)
 */


// 品牌紫色系渐变调色板（主色 #8e2294 → #b85ebd → #d4a5d8 → #e8d4ea）
const PURPLE_GRADIENTS = [
  ['#8e2294', '#8e2294'],
  ['#b85ebd', '#b85ebd'],
  ['#d4a5d8', '#d4a5d8'],
  ['#e8d4ea', '#e8d4ea'],
  ['#b85ebd', '#8e2294'],
  ['#d4a5d8', '#b85ebd']
];

const PURPLE_AGE_GRADIENTS = [
  ['#f0c8f2', '#d8a0dc'],
  ['#d890d8', '#b868b8'],
  ['#a848a8', '#8e2294'],
  ['#6b1a70', '#4a1050']
];

function createSVGElement(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
  return el;
}

function getTooltip() {
  let tooltip = document.getElementById('chart-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'chart-tooltip';
    tooltip.style.cssText = `
      position: fixed;
      background: rgba(26, 26, 46, 0.95);
      color: #fff;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.2s;
      box-shadow: 0 4px 16px rgba(80, 70, 60, 0.14);
      border: 1px solid ${BRAND_COLORS.primary};
      max-width: 220px;
      line-height: 1.6;
    `;
    document.body.appendChild(tooltip);
  }
  return tooltip;
}

function showTooltip(e, html) {
  const tooltip = getTooltip();
  tooltip.innerHTML = html;
  tooltip.style.opacity = '1';
  tooltip.style.left = (e.clientX + 12) + 'px';
  tooltip.style.top = (e.clientY - 12) + 'px';
}

function hideTooltip() {
  const tooltip = document.getElementById('chart-tooltip');
  if (tooltip) tooltip.style.opacity = '0';
}

// ==================== 饼图家族 ====================
function renderPieChart(containerId, data, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const type = options.type || 'donut'; // pie | donut | half
  const width = options.width || 300;
  const height = options.height || 300;
  const isHalf = type === 'half';
  const radius = Math.min(width, height) / 2 - (isHalf ? 50 : 40);
  const centerX = width / 2;
  const centerY = isHalf ? height - 55 : height / 2;
  const total = data.reduce((s, d) => s + d.value, 0);
  const fullAngle = isHalf ? Math.PI : 2 * Math.PI;
  let currentAngle = isHalf ? -Math.PI : -Math.PI / 2;

  const svg = createSVGElement('svg', { width, height, viewBox: `0 0 ${width} ${height}` });
  const defs = createSVGElement('defs');
  svg.appendChild(defs);

  const palette = options.palette || PURPLE_GRADIENTS;

  data.forEach((_, i) => {
    const grad = createSVGElement('linearGradient', {
      id: `pieGrad-${containerId}-${i}`, x1: '0%', y1: '0%', x2: '100%', y2: '100%'
    });
    const [c1, c2] = palette[i % palette.length];
    grad.appendChild(createSVGElement('stop', { offset: '0%', 'stop-color': c1 }));
    grad.appendChild(createSVGElement('stop', { offset: '100%', 'stop-color': c2 }));
    defs.appendChild(grad);
  });

  data.forEach((item, i) => {
    const angle = (item.value / total) * fullAngle;
    const endAngle = currentAngle + angle;

    const x1 = centerX + radius * Math.cos(currentAngle);
    const y1 = centerY + radius * Math.sin(currentAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;

    const path = createSVGElement('path', {
      d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      fill: `url(#pieGrad-${containerId}-${i})`,
      stroke: '#fff',
      'stroke-width': '2',
      cursor: 'pointer'
    });

    path.addEventListener('mouseenter', (e) => {
      path.setAttribute('opacity', '0.85');
      showTooltip(e, `<strong>${item.label}</strong><br/>${item.value}人 · ${(item.value / total * 100).toFixed(1)}%`);
    });
    path.addEventListener('mousemove', (e) => {
      showTooltip(e, `<strong>${item.label}</strong><br/>${item.value}人 · ${(item.value / total * 100).toFixed(1)}%`);
    });
    path.addEventListener('mouseleave', () => {
      path.setAttribute('opacity', '1');
      hideTooltip();
    });

    svg.appendChild(path);

    // 外部标签（饼图 & 半圆图 & 显式开启的环形图）
    const showExternalLabels = options.showLabels !== undefined ? options.showLabels : (type !== 'donut');
    if (showExternalLabels) {
      const midAngle = currentAngle + angle / 2;
      const labelR = radius + 22;
      const lx = centerX + labelR * Math.cos(midAngle);
      const ly = centerY + labelR * Math.sin(midAngle);
      const pct = (item.value / total * 100).toFixed(1) + '%';

      const line = createSVGElement('line', {
        x1: centerX + radius * Math.cos(midAngle),
        y1: centerY + radius * Math.sin(midAngle),
        x2: lx, y2: ly,
        stroke: '#a855a8', 'stroke-width': '1'
      });
      svg.appendChild(line);

      const t = createSVGElement('text', {
        x: lx, y: ly + 4,
        'text-anchor': 'middle', 'font-size': '12', fill: '#3a3a5a', 'font-family': 'Microsoft YaHei'
      });
      t.textContent = `${item.label} ${pct}`;
      svg.appendChild(t);
    }

    currentAngle = endAngle;
  });

  // 甜甜圈中心文字
  if (type === 'donut') {
    const centerCircle = createSVGElement('circle', {
      cx: centerX, cy: centerY, r: radius * 0.45,
      fill: '#fff'
    });
    svg.appendChild(centerCircle);

    const centerTextStr = String(options.centerText !== undefined ? options.centerText : total);
    const centerFontSize = centerTextStr.length > 4 ? '16' : (centerTextStr.length > 2 ? '20' : '24');
    const centerText = createSVGElement('text', {
      x: centerX, y: centerY - 4,
      'text-anchor': 'middle', 'font-size': centerFontSize, 'font-weight': '700', fill: BRAND_COLORS.primary
    });
    centerText.textContent = centerTextStr;
    svg.appendChild(centerText);

    const centerLabel = createSVGElement('text', {
      x: centerX, y: centerY + 16,
      'text-anchor': 'middle', 'font-size': '12', fill: BRAND_COLORS.primaryLight
    });
    centerLabel.textContent = options.centerSubtext || '总人数';
    svg.appendChild(centerLabel);
  }

  // 半圆底部文字
  if (isHalf && options.bottomText) {
    const bt = createSVGElement('text', {
      x: centerX, y: height - 18,
      'text-anchor': 'middle', 'font-size': '14', 'font-weight': '600', fill: '#5a5a6a', 'font-family': 'Microsoft YaHei'
    });
    bt.textContent = options.bottomText;
    svg.appendChild(bt);
  }

  // 普通饼图/环形图图例
  if (type === 'donut' && options.showLegend !== false) {
    const legendX = width - 80;
    data.forEach((item, i) => {
      const [c1] = palette[i % palette.length];
      const ly = 20 + i * 22;
      svg.appendChild(createSVGElement('rect', {
        x: legendX, y: ly - 8, width: 12, height: 12, rx: 3, fill: c1
      }));
      const t = createSVGElement('text', {
        x: legendX + 18, y: ly + 3,
        fill: '#5a5a6a', 'font-size': '12', 'font-family': 'Microsoft YaHei'
      });
      t.textContent = `${item.label} ${item.value}`;
      svg.appendChild(t);
    });
  }

  container.appendChild(svg);
}

function renderDonutChart(containerId, data, options = {}) {
  renderPieChart(containerId, data, { ...options, type: 'donut' });
}

function renderHalfPieChart(containerId, data, options = {}) {
  renderPieChart(containerId, data, { ...options, type: 'half', palette: PURPLE_AGE_GRADIENTS, height: options.height || 200 });
}

// ==================== 柱状图 ====================
function renderBarChart(containerId, data, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const width = options.width || 400;
  const height = options.height || 250;
  const margin = { top: 24, right: 24, bottom: 44, left: 24 };
  const chartW = width - margin.left - margin.right;
  const chartH = height - margin.top - margin.bottom;
  const maxValue = Math.max(...data.map(d => d.value)) * 1.15;
  const barWidth = (chartW / data.length) * 0.32;
  const gap = (chartW / data.length) * 0.68;

  const svg = createSVGElement('svg', { width, height, viewBox: `0 0 ${width} ${height}` });
  const defs = createSVGElement('defs');
  const grad = createSVGElement('linearGradient', {
    id: `barGrad-${containerId}`, x1: '0%', y1: '0%', x2: '0%', y2: '100%'
  });
  grad.appendChild(createSVGElement('stop', { offset: '0%', 'stop-color': BRAND_COLORS.primary }));
  grad.appendChild(createSVGElement('stop', { offset: '100%', 'stop-color': BRAND_COLORS.primaryDark }));
  defs.appendChild(grad);
  svg.appendChild(defs);

  data.forEach((item, i) => {
    const barH = (item.value / maxValue) * chartH;
    const x = margin.left + gap / 2 + i * (barWidth + gap);
    const y = margin.top + chartH - barH;

    const barColor = item.color || (options.colors && options.colors[i]) || `url(#barGrad-${containerId})`;
    const hasGradient = barColor.startsWith('url(');

    // 顶部圆角柱状图（只圆顶部）
    const r = Math.min(6, barH / 2);
    const bw = barWidth;
    const bh = barH;
    const pathD = r <= 0
      ? `M ${x},${y} L ${x + bw},${y} L ${x + bw},${y + bh} L ${x},${y + bh} Z`
      : `M ${x},${y + r} Q ${x},${y} ${x + r},${y} L ${x + bw - r},${y} Q ${x + bw},${y} ${x + bw},${y + r} L ${x + bw},${y + bh} L ${x},${y + bh} Z`;

    const bar = createSVGElement('path', {
      d: pathD,
      fill: barColor, cursor: 'pointer'
    });

    bar.addEventListener('mouseenter', (e) => {
      bar.setAttribute('opacity', '0.85');
      showTooltip(e, `<strong>${item.label}</strong><br/>${item.value}人`);
    });
    bar.addEventListener('mousemove', (e) => showTooltip(e, `<strong>${item.label}</strong><br/>${item.value}人`));
    bar.addEventListener('mouseleave', () => { bar.setAttribute('opacity', '1'); hideTooltip(); });

    svg.appendChild(bar);

    // 数值
    const valueColor = hasGradient ? BRAND_COLORS.primary : barColor;
    svg.appendChild(createSVGElement('text', {
      x: x + barWidth / 2, y: y - 8,
      'text-anchor': 'middle', 'font-size': '13', 'font-weight': '600', fill: valueColor
    })).textContent = item.value;

    // X轴标签
    const label = createSVGElement('text', {
      x: x + barWidth / 2, y: height - 16,
      fill: '#5a5a6a', 'font-size': '12', 'text-anchor': 'middle', 'font-family': 'Microsoft YaHei'
    });
    label.textContent = item.label;
    svg.appendChild(label);
  });

  container.appendChild(svg);
}

// ==================== 雷达图 ====================
function renderRadarChart(containerId, data, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const width = options.width || 300;
  const height = options.height || 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 45;
  const angleStep = (2 * Math.PI) / data.length;

  const svg = createSVGElement('svg', { width, height, viewBox: `0 0 ${width} ${height}` });
  const defs = createSVGElement('defs');
  const grad = createSVGElement('radialGradient', {
    id: `radarGrad-${containerId}`, cx: '50%', cy: '50%', r: '50%'
  });
  grad.appendChild(createSVGElement('stop', { offset: '0%', 'stop-color': BRAND_COLORS.primary, 'stop-opacity': '0.5' }));
  grad.appendChild(createSVGElement('stop', { offset: '100%', 'stop-color': BRAND_COLORS.primaryDark, 'stop-opacity': '0.15' }));
  defs.appendChild(grad);
  svg.appendChild(defs);

  // 网格
  for (let level = 1; level <= 5; level++) {
    const r = (radius / 5) * level;
    const points = data.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
    }).join(' ');
    svg.appendChild(createSVGElement('polygon', {
      points, fill: 'none', stroke: '#ebe7e0', 'stroke-width': '1'
    }));
  }

  // 轴线
  data.forEach((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    svg.appendChild(createSVGElement('line', {
      x1: centerX, y1: centerY,
      x2: centerX + radius * Math.cos(angle),
      y2: centerY + radius * Math.sin(angle),
      stroke: '#ebe7e0', 'stroke-width': '1'
    }));
  });

  // 数据区域
  const points = data.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (item.value / item.max) * radius;
    return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
  }).join(' ');

  const area = createSVGElement('polygon', {
    points, fill: `url(#radarGrad-${containerId})`,
    stroke: BRAND_COLORS.primary, 'stroke-width': '2'
  });

  area.addEventListener('mouseenter', (e) => {
    showTooltip(e, data.map(d => `${d.label}: ${d.value}`).join('<br/>'));
  });
  area.addEventListener('mousemove', (e) => {
    showTooltip(e, data.map(d => `${d.label}: ${d.value}`).join('<br/>'));
  });
  area.addEventListener('mouseleave', hideTooltip);
  svg.appendChild(area);

  // 数据点
  data.forEach((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (item.value / item.max) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);

    const circle = createSVGElement('circle', {
      cx: x, cy: y, r: 5,
      fill: BRAND_COLORS.primary, stroke: '#fff', 'stroke-width': '2', cursor: 'pointer'
    });
    circle.addEventListener('mouseenter', (e) => {
      circle.setAttribute('r', '7');
      circle.setAttribute('fill', BRAND_COLORS.accent);
      showTooltip(e, `<strong>${item.label}</strong><br/>${item.value}人`);
    });
    circle.addEventListener('mouseleave', () => {
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', BRAND_COLORS.primary);
      hideTooltip();
    });
    svg.appendChild(circle);

    // 标签
    const labelR = radius + 22;
    const lx = centerX + labelR * Math.cos(angle);
    const ly = centerY + labelR * Math.sin(angle);
    const t = createSVGElement('text', {
      x: lx, y: ly + 4,
      'text-anchor': 'middle', 'font-size': '12', fill: '#5a5a6a', 'font-family': 'Microsoft YaHei'
    });
    t.textContent = item.label;
    svg.appendChild(t);
  });

  container.appendChild(svg);
}

// ==================== 九宫格矩阵 ====================
function renderNineBox(containerId, data, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const width = options.width || 420;
  const height = options.height || 420;
  const padding = 45;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;
  const cellW = chartW / 3;
  const cellH = chartH / 3;

  const quadrants = [
    { x: 2, y: 2, label: '核心人才', colorFrom: '#8e2294', colorTo: '#6b1a70' },
    { x: 1, y: 2, label: '中坚力量', colorFrom: '#a855a8', colorTo: '#8e2294' },
    { x: 0, y: 2, label: '潜力新星', colorFrom: '#c77dc8', colorTo: '#a855a8' },
    { x: 2, y: 1, label: '熟练员工', colorFrom: '#c77dc8', colorTo: '#a855a8' },
    { x: 1, y: 1, label: '稳定贡献', colorFrom: '#d4a5d4', colorTo: '#c77dc8' },
    { x: 0, y: 1, label: '差距员工', colorFrom: '#e0c4e0', colorTo: '#d4a5d4' },
    { x: 2, y: 0, label: '潜力待挖', colorFrom: '#d4a5d4', colorTo: '#c77dc8' },
    { x: 1, y: 0, label: '待观察者', colorFrom: '#e0c4e0', colorTo: '#d4a5d4' },
    { x: 0, y: 0, label: '问题员工', colorFrom: '#e8dce8', colorTo: '#d4c8dc' }
  ];

  const svg = createSVGElement('svg', { width, height, viewBox: `0 0 ${width} ${height}` });
  const defs = createSVGElement('defs');
  svg.appendChild(defs);

  // 统计每个格子人数
  const counts = quadrants.map(() => 0);
  const peopleInQuadrant = quadrants.map(() => []);

  data.forEach(p => {
    const qx = Math.min(2, Math.floor(p.x / 1.67));
    const qy = Math.min(2, Math.floor(p.y / 1.67));
    const idx = quadrants.findIndex(q => q.x === qx && q.y === qy);
    if (idx !== -1) {
      counts[idx]++;
      peopleInQuadrant[idx].push(p);
    }
  });

  // 绘制格子
  quadrants.forEach((q, i) => {
    const x = padding + q.x * cellW;
    const y = padding + (2 - q.y) * cellH;
    const gradId = `nineGrad-${containerId}-${i}`;

    const grad = createSVGElement('linearGradient', {
      id: gradId, x1: '0%', y1: '0%', x2: '100%', y2: '100%'
    });
    grad.appendChild(createSVGElement('stop', { offset: '0%', 'stop-color': q.colorFrom }));
    grad.appendChild(createSVGElement('stop', { offset: '100%', 'stop-color': q.colorTo }));
    defs.appendChild(grad);

    const rect = createSVGElement('rect', {
      x, y, width: cellW, height: cellH,
      fill: `url(#${gradId})`,
      stroke: '#fff', 'stroke-width': '2',
      rx: 6, cursor: 'pointer',
      opacity: '0.85'
    });

    rect.addEventListener('mouseenter', () => rect.setAttribute('opacity', '1'));
    rect.addEventListener('mouseleave', () => rect.setAttribute('opacity', '0.85'));
    rect.addEventListener('click', () => {
      if (options.onCellClick) {
        options.onCellClick(q.label, peopleInQuadrant[i]);
      }
    });
    svg.appendChild(rect);

    // 标签
    const t = createSVGElement('text', {
      x: x + cellW / 2, y: y + cellH / 2 - 6,
      'text-anchor': 'middle', 'font-size': '14', 'font-weight': '600', fill: '#fff', 'font-family': 'Microsoft YaHei'
    });
    t.textContent = q.label;
    svg.appendChild(t);

    // 人数
    const countText = createSVGElement('text', {
      x: x + cellW / 2, y: y + cellH / 2 + 16,
      'text-anchor': 'middle', 'font-size': '20', 'font-weight': '700', fill: '#fff'
    });
    countText.textContent = counts[i] + '人';
    svg.appendChild(countText);
  });

  // 轴线标签
  const axisStyle = { fill: '#5a5a6a', 'font-size': '12', 'font-family': 'Microsoft YaHei' };
  ['低绩效', '中绩效', '高绩效'].forEach((label, i) => {
    const t = createSVGElement('text', {
      x: padding + cellW * i + cellW / 2, y: height - 16,
      ...axisStyle, 'text-anchor': 'middle'
    });
    t.textContent = label;
    svg.appendChild(t);
  });
  ['低潜力', '中潜力', '高潜力'].forEach((label, i) => {
    const t = createSVGElement('text', {
      x: 16, y: padding + cellH * (2 - i) + cellH / 2 + 4,
      ...axisStyle, 'text-anchor': 'middle',
      transform: `rotate(-90, 16, ${padding + cellH * (2 - i) + cellH / 2 + 4})`
    });
    t.textContent = label;
    svg.appendChild(t);
  });

  container.appendChild(svg);
}


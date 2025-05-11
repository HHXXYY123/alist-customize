// ===== 配置读取 =====
const getFooterConfig = () => {
  try {
    const el = document.getElementById('footer-data');
    return el ? JSON.parse(el.textContent) : null;
  } catch (e) {
    console.error('Footer config error:', e);
    return null;
  }
};

// ===== DOM构建器 =====
const buildFooterItem = (item) => {
  const container = document.createElement('span');
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '6px';

  if (item.icon) {
    const img = new Image();
    img.src = `https://api.remio.cc/icon/${new URL(item.url).host}.ico`;
    img.style.width = '16px';
    img.style.height = '16px';
    img.style.borderRadius = '50%';
    img.onerror = () => img.remove();
    container.appendChild(img);
  }

  const link = document.createElement('a');
  link.href = item.url;
  link.target = item.target || '_blank';
  link.textContent = item.text;
  link.style.color = `rgba(var(--mio-primary), 0.9)`;
  container.appendChild(link);

  return container;
};

// ===== 主渲染函数 =====
const renderFooter = () => {
  const footerContainer = document.querySelector('.footer > div');
  if (!footerContainer) return;

  // 保留或创建原始AList信息
  let originalFooter = footerContainer.querySelector('.alist-original-footer');
  if (!originalFooter) {
    originalFooter = document.createElement('div');
    originalFooter.className = 'alist-original-footer';
    originalFooter.innerHTML = `
      <span>由 AList 驱动</span>
      <span style="opacity:0.5">|</span>
      <a href="/@login">登录</a>
    `;
  }

  // 创建新容器
  const newContainer = document.createElement('div');
  newContainer.style.display = 'flex';
  newContainer.style.alignItems = 'center';
  newContainer.style.flexWrap = 'wrap';
  newContainer.style.justifyContent = 'center';
  newContainer.style.width = '100%';
  newContainer.style.gap = '12px';

  // 添加原始内容
  newContainer.appendChild(originalFooter);

  // 添加自定义内容
  const config = getFooterConfig();
  if (config?.length) {
    const separator = document.createElement('span');
    separator.textContent = '|';
    separator.style.opacity = '0.5';
    newContainer.appendChild(separator);

    config.forEach((item, index) => {
      if (index > 0) {
        const sep = document.createElement('span');
        sep.textContent = '|';
        sep.style.opacity = '0.5';
        newContainer.appendChild(sep);
      }
      newContainer.appendChild(buildFooterItem(item));
    });
  }

  // 应用新结构
  footerContainer.innerHTML = '';
  footerContainer.appendChild(newContainer);
};

// ===== 初始化 =====
const initFooter = () => {
  // 方法1：直接尝试渲染
  renderFooter();

  // 方法2：备用检测（针对动态加载情况）
  let attempts = 0;
  const interval = setInterval(() => {
    if (document.querySelector('.footer > div') || attempts++ > 5) {
      clearInterval(interval);
      renderFooter();
    }
  }, 300);
};

// 启动
if (document.readyState === 'complete') {
  initFooter();
} else {
  window.addEventListener('load', initFooter);
}

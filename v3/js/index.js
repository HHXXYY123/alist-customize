function initFooter() {
  const footerContainer = document.querySelector('.footer > div');
  if (!footerContainer) return;

  // 创建主容器
  const mainContainer = document.createElement('div');
  mainContainer.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  `;

  // 添加AList原始信息
  const originalFooter = document.createElement('div');
  originalFooter.className = 'alist-original-footer';
  originalFooter.innerHTML = `
    <span>由 AList 驱动</span>
    <span class="footer-separator">|</span>
    <a href="/@login">登录</a>
  `;
  mainContainer.appendChild(originalFooter);

  // 添加自定义内容
  try {
    const configEl = document.getElementById('footer-data');
    if (configEl) {
      const config = JSON.parse(configEl.textContent);
      
      if (Array.isArray(config) && config.length) {
        // 添加分隔符
        const separator = document.createElement('span');
        separator.className = 'footer-separator';
        separator.textContent = '|';
        mainContainer.appendChild(separator);

        // 创建自定义内容容器
        const customContainer = document.createElement('div');
        customContainer.className = 'mio-custom-footer';

        config.forEach((item, index) => {
          if (index > 0) {
            const sep = document.createElement('span');
            sep.className = 'footer-separator';
            sep.textContent = '|';
            customContainer.appendChild(sep);
          }

          const itemEl = document.createElement('div');
          itemEl.className = 'mio-custom-footer-item';

          if (item.icon) {
            const img = new Image();
            img.src = `https://api.remio.cc/icon/${new URL(item.url).host}.ico`;
            img.onerror = () => img.style.display = 'none';
            img.style.cssText = `
              width: 16px;
              height: 16px;
              border-radius: 50%;
            `;
            itemEl.appendChild(img);
          }

          const link = document.createElement('a');
          link.href = item.url;
          link.target = item.target || '_blank';
          link.textContent = item.text;
          link.style.cssText = `
            color: rgba(var(--mio-primary), 0.9);
            text-decoration: none;
            transition: all 0.3s;
          `;
          itemEl.appendChild(link);

          customContainer.appendChild(itemEl);
        });

        mainContainer.appendChild(customContainer);
      }
    }
  } catch (e) {
    console.error('Footer config error:', e);
  }

  // 清空并重新填充
  footerContainer.innerHTML = '';
  footerContainer.appendChild(mainContainer);
}

// 双重初始化保障
if (document.readyState === 'complete') {
  initFooter();
} else {
  document.addEventListener('DOMContentLoaded', initFooter);
}

// 监听动态加载
new MutationObserver((mutations, observer) => {
  if (document.querySelector('.footer > div')) {
    initFooter();
    observer.disconnect();
  }
}).observe(document.body, { childList: true, subtree: true });

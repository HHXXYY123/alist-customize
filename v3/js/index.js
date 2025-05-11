document.addEventListener('DOMContentLoaded', function() {
  const renderFooter = () => {
    const footerEl = document.querySelector('.footer > div');
    if (!footerEl) return;

    // 创建容器
    const container = document.createElement('div');
    container.className = 'footer-container';

    // 添加AList原始信息
    const originalFooter = document.createElement('div');
    originalFooter.className = 'alist-original';
    originalFooter.innerHTML = `
      <span>由 AList 驱动</span>
      <span class="separator">|</span>
      <a href="/@login">登录</a>
    `;
    container.appendChild(originalFooter);

    // 添加自定义内容
    try {
      const configEl = document.getElementById('footer-data');
      if (configEl) {
        const config = JSON.parse(configEl.textContent);
        
        if (Array.isArray(config) {
          const separator = document.createElement('span');
          separator.className = 'separator';
          separator.textContent = '|';
          container.appendChild(separator);

          const customContainer = document.createElement('div');
          customContainer.className = 'custom-footer';

          config.forEach((item, index) => {
            if (index > 0) {
              const sep = document.createElement('span');
              sep.className = 'separator';
              sep.textContent = '|';
              customContainer.appendChild(sep);
            }

            const itemEl = document.createElement('div');
            itemEl.className = 'custom-footer-item';

            if (item.icon) {
              const img = document.createElement('img');
              img.src = `https://api.remio.cc/icon/${new URL(item.url).host}.ico`;
              img.onerror = () => img.remove();
              itemEl.appendChild(img);
            }

            const link = document.createElement('a');
            link.href = item.url;
            link.target = item.target || '_blank';
            link.textContent = item.text;
            itemEl.appendChild(link);

            customContainer.appendChild(itemEl);
          });

          container.appendChild(customContainer);
        }
      }
    } catch (e) {
      console.error('Footer config error:', e);
    }

    // 应用新结构
    footerEl.innerHTML = '';
    footerEl.appendChild(container);
  };

  // 初始化
  renderFooter();
  
  // 应对动态加载
  const observer = new MutationObserver(() => {
    if (document.querySelector('.footer > div')) {
      renderFooter();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

(function() {
  'use strict';
  
  const FOOTER_CONFIG = [
    { url: "https://your-site.com", text: "我的主页", icon: true },
    { url: "https://github.com/yourname", text: "GitHub", icon: true }
  ];

  // 创建自定义页脚元素
  const createCustomFooter = (data) => {
    const footerEl = document.createElement('div');
    footerEl.className = 'mio-custom-footer';

    data.forEach((item, index) => {
      if (index > 0) {
        const split = document.createElement('span');
        split.textContent = '|';
        split.style.opacity = '0.5';
        footerEl.appendChild(split);
      }

      const link = document.createElement('a');
      link.href = item.url;
      link.target = '_blank';
      link.innerHTML = `
        ${item.icon ? `
          <img src="https://api.iowen.cn/favicon/${new URL(item.url).host}.png" 
               onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiNjY2MiLz48L3N2Zz4='">
        ` : ''}
        <span>${item.text}</span>
      `;

      footerEl.appendChild(link);
    });

    return footerEl;
  };

  // 初始化
  const init = () => {
    const footerContainer = document.querySelector('.footer > div');
    if (!footerContainer) return;

    // 保留原生声明
    const poweredBy = document.createElement('div');
    poweredBy.className = 'alist-powered';
    poweredBy.innerHTML = '由 <a href="https://alist.nn.ci" target="_blank">AList</a> 驱动';
    
    // 插入结构
    footerContainer.append(
      createCustomFooter(FOOTER_CONFIG),
      poweredBy
    );
  };

  // 启动
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();

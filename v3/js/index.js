/* ============= 您原有全部JS代码 ============= */
let footer = false;
const footerStyle = `...`; // 保持原有完整样式
const onPatchStyle = (style) => { ... };
const onCreateElement = (tag, attrs) => { ... };

/* ============= 仅修改 renderFooter 函数 ============= */
const renderFooter = (data) => {
  const target = document.querySelector(".footer > div");
  if (target) {
    // 保留原生容器结构
    const nativeLinks = target.querySelectorAll('a, span');
    nativeLinks.forEach(el => el.remove());

    // 创建新容器（保留您原有逻辑）
    target.classList.add("mio-footer-main");
    
    // ▶▶▶ 新增：插入原生版权声明 ◀◀◀
    const poweredBy = document.createElement('div');
    poweredBy.innerHTML = '<span>由 AList 驱动</span>';
    poweredBy.style.cssText = 'text-align:center;font-size:12px;color:rgba(var(--mio-text),0.6);padding:8px 0;';

    // 您的原有链接生成逻辑（完整保留）
    if (data?.length) {
      for (let index = 0; index < data.length; index++) {
        // 保持原有创建链接逻辑...
        const split = onCreateElement("span", null);
        split.innerText = "|";
        // ...其他代码
      }
    }

    // ▶▶▶ 追加原生声明到容器底部 ◀◀◀
    target.appendChild(poweredBy);
    footer = true;
  }
};

// 保持原有 init 函数完整
const init = () => { ... };

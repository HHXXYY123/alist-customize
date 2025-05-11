/*
 * @Author: kasuie
 * @Date: 2024-04-24 15:35:59
 * @LastEditors: kasuie
 * @LastEditTime: 2024-11-05 09:38:54
 * @Description: 整合保留原生底部版本
 */

// ========== 你原有的全部代码 ==========
let footer = false;
const footerStyle = `...`; // 保持你的原始样式
const onPatchStyle = (style) => { ... };
const onCreateElement = (tag, attrs) => { ... };

// ========== 修改后的 renderFooter ==========
const renderFooter = (data) => {
  const target = document.querySelector(".footer > div");
  if (target) {
    // 保留原生容器结构
    const nativeElements = target.querySelectorAll('a, span');
    nativeElements.forEach(el => el.remove());

    // 创建自定义内容容器
    const customContainer = document.createElement('div');
    customContainer.className = 'mio-footer-main';
    
    // 你的原始内容生成逻辑
    if (data?.length) {
      for (let index = 0; index < data.length; index++) {
        // 保持你的原有生成逻辑...
        const split = onCreateElement("span", null);
        split.innerText = "|";
        // ...其他代码
      }
    }

    // 插入原生版权声明
    const poweredBy = document.createElement('div');
    poweredBy.innerHTML = '由 <a href="https://alist.nn.ci">AList</a> 驱动';
    poweredBy.style.cssText = 'font-size:12px; text-align:center; padding-top:8px;';

    // 组装结构
    target.append(customContainer, poweredBy);
    footer = true;
  }
};

// ========== 保持你原有的 init 函数 ==========
const init = () => {
  // 保持你的原有初始化逻辑...
  // const navHome = document.querySelector(...);
};

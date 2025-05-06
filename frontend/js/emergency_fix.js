/**
 * @fileoverview 紧急修复脚本 - 立即执行导航栏清理
 * @version 1.0.0
 */

// 立即执行的函数表达式
(function() {
  console.log('紧急修复脚本执行中...');
  
  // 定义导航栏清理函数
  function emergencyNavbarCleanup() {
    console.log('执行紧急导航栏清理...');
    
    // 1. 找到所有导航栏
    const allNavs = document.querySelectorAll('.nav-bottom');
    console.log(`紧急清理: 找到 ${allNavs.length} 个导航栏元素`);
    
    // 2. 区分正常导航栏和多余导航栏
    allNavs.forEach((nav, index) => {
      // 检查是否在screen内部
      let isInScreen = false;
      let parent = nav.parentElement;
      
      while (parent) {
        if (parent.classList && parent.classList.contains('screen')) {
          isInScreen = true;
          break;
        }
        parent = parent.parentElement;
      }
      
      // 如果不在screen内，立即隐藏
      if (!isInScreen) {
        console.log(`紧急清理: 导航栏 #${index} 不在screen内，立即隐藏`);
        nav.style.display = 'none';
        nav.style.visibility = 'hidden';
        nav.style.opacity = '0';
        nav.style.height = '0';
        nav.style.overflow = 'hidden';
        nav.style.position = 'absolute';
        nav.style.zIndex = '-9999';
        nav.classList.add('extra-navbar');
        
        // 尝试直接移除
        try {
          nav.parentNode.removeChild(nav);
          console.log(`紧急清理: 已成功移除导航栏 #${index}`);
        } catch (e) {
          console.error(`紧急清理: 无法移除导航栏 #${index}`, e);
        }
      }
    });
  
    // 3. 直接查找body下的导航栏并移除
    const bodyNavs = Array.from(document.querySelectorAll('body > .nav-bottom'));
    if (bodyNavs.length > 0) {
      console.log(`紧急清理: 找到 ${bodyNavs.length} 个直接在body下的导航栏，立即移除`);
      bodyNavs.forEach(nav => {
        nav.style.display = 'none';
        try {
          nav.remove();
        } catch (e) {
          console.error('紧急清理: 无法移除body下的导航栏', e);
        }
      });
    }
    
    // 4. 添加全局样式来确保隐藏
    const style = document.createElement('style');
    style.id = 'emergency-navbar-hiding-styles';
    style.textContent = `
      body > .nav-bottom,
      body > div:not(.screen):not(.screens-container) > .nav-bottom,
      div:not(.screen) > .nav-bottom,
      .extra-navbar {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        z-index: -9999 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 立即执行一次
  emergencyNavbarCleanup();
  
  // 在DOM加载完成后执行
  document.addEventListener('DOMContentLoaded', emergencyNavbarCleanup);
  
  // 在窗口加载完成后执行
  window.addEventListener('load', function() {
    emergencyNavbarCleanup();
    // 延迟执行以确保捕获动态添加的导航栏
    setTimeout(emergencyNavbarCleanup, 100);
    setTimeout(emergencyNavbarCleanup, 500);
    setTimeout(emergencyNavbarCleanup, 1000);
  });
  
  // 监听DOM变化
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      let shouldCleanup = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          // 检查是否添加了可能包含导航栏的节点
          Array.from(mutation.addedNodes).forEach(function(node) {
            if (node.nodeType === 1) { // 元素节点
              if (node.classList && node.classList.contains('nav-bottom')) {
                shouldCleanup = true;
              } else if (node.querySelector && node.querySelector('.nav-bottom')) {
                shouldCleanup = true;
              }
            }
          });
        }
      });
      
      if (shouldCleanup) {
        console.log('检测到DOM变化，可能添加了新的导航栏，执行清理...');
        emergencyNavbarCleanup();
      }
    });
    
    // 监听整个body的变化
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('已设置DOM变化监听');
  }
})(); 
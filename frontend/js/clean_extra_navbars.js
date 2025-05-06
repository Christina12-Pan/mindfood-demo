/**
 * @fileoverview 清理HTML页面中多余的导航栏
 * @version 1.0.0
 */

(function() {
  // 页面加载完成后执行清理
  document.addEventListener('DOMContentLoaded', cleanupExtraNavbars);
  
  // 页面完全加载后再次执行清理
  window.addEventListener('load', function() {
    setTimeout(cleanupExtraNavbars, 100);
    setTimeout(cleanupExtraNavbars, 500);
    setTimeout(cleanupExtraNavbars, 1000);
  });
  
  /**
   * 清理页面中的多余导航栏
   */
  function cleanupExtraNavbars() {
    console.log('执行导航栏清理...');
    
    // 1. 查找所有导航栏
    const allNavs = document.querySelectorAll('.nav-bottom');
    console.log(`找到 ${allNavs.length} 个导航栏元素`);
    
    // 2. 区分正常导航栏和多余导航栏
    allNavs.forEach((nav, index) => {
      // 为每个导航栏添加标识，方便调试
      nav.setAttribute('data-nav-index', index);
      
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
      
      // 如果不在screen内，标记为多余导航栏并尝试移除
      if (!isInScreen) {
        console.log(`导航栏 #${index} 不在screen内，标记为多余导航栏`);
        nav.classList.add('extra-navbar');
        
        try {
          // 移除导航栏
          nav.parentNode.removeChild(nav);
          console.log(`已成功移除导航栏 #${index}`);
        } catch (e) {
          // 如果无法移除，则通过CSS隐藏
          console.error(`无法移除导航栏 #${index}，将通过CSS隐藏`, e);
          nav.style.display = 'none';
          nav.style.visibility = 'hidden';
          nav.style.position = 'absolute';
          nav.style.zIndex = '-9999';
        }
      } else {
        console.log(`导航栏 #${index} 在screen内，保留`);
      }
    });
    
    // 3. 通过直接搜索特定路径移除多余导航栏
    removeNavbarsBySpecificPath();
    
    // 4. 添加全局样式以确保隐藏
    addHidingStyles();
  }
  
  /**
   * 通过特定路径查找并移除多余导航栏
   */
  function removeNavbarsBySpecificPath() {
    // 直接查找body下的导航栏
    const bodyNavs = Array.from(document.querySelectorAll('body > .nav-bottom'));
    
    if (bodyNavs.length > 0) {
      console.log(`找到 ${bodyNavs.length} 个直接在body下的导航栏，准备移除`);
      bodyNavs.forEach(nav => {
        try {
          nav.remove();
          console.log('成功移除body下的导航栏');
        } catch (e) {
          console.error('无法移除body下的导航栏', e);
          nav.style.display = 'none';
        }
      });
    }
    
    // 查找不在screen内的div中的导航栏
    const nonScreenDivs = Array.from(document.querySelectorAll('body > div:not(.screen):not(.screens-container)'));
    nonScreenDivs.forEach(div => {
      const navsInDiv = div.querySelectorAll('.nav-bottom');
      if (navsInDiv.length > 0) {
        console.log(`在非screen的div中找到 ${navsInDiv.length} 个导航栏，准备移除`);
        navsInDiv.forEach(nav => {
          try {
            nav.remove();
            console.log('成功移除非screen div中的导航栏');
          } catch (e) {
            console.error('无法移除非screen div中的导航栏', e);
            nav.style.display = 'none';
          }
        });
      }
    });
  }
  
  /**
   * 添加全局样式来隐藏多余导航栏
   */
  function addHidingStyles() {
    // 检查是否已添加样式
    if (document.getElementById('extra-navbar-hiding-styles')) {
      return;
    }
    
    // 创建样式元素
    const style = document.createElement('style');
    style.id = 'extra-navbar-hiding-styles';
    style.textContent = `
      /* 隐藏所有不在.screen容器内的导航栏 */
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
    
    // 添加到文档头部
    document.head.appendChild(style);
    console.log('已添加全局样式来隐藏多余导航栏');
  }
})(); 
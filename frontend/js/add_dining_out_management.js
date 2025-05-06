/**
 * @fileoverview 为mindfood_prototype.html添加外食管理界面
 * @version 1.1.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // 首先执行导航栏清理
  cleanupExtraNavbars();
   
  // 创建外食管理界面并添加到body中
  addDiningOutManagementScreen();
  
  // 修改导航，添加外食选项
  updateNavigation();
  
  // 初始化外食管理应用容器
  initDiningOutApp();
});

/**
 * 清理页面中的多余导航栏
 */
function cleanupExtraNavbars() {
  console.log('执行导航栏清理...');
  
  // 1. 找到所有导航栏
  const allNavs = document.querySelectorAll('.nav-bottom');
  
  // 2. 区分正常导航栏和多余导航栏
  allNavs.forEach(nav => {
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
    
    // 如果不在screen内，标记并尝试移除
    if (!isInScreen) {
      console.log('找到一个不在screen内的导航栏，尝试移除');
      nav.classList.add('extra-navbar');
      
      try {
        nav.remove();
      } catch (e) {
        // 如果无法移除，则隐藏
        nav.style.display = 'none';
        nav.style.visibility = 'hidden';
      }
    }
  });
  
  // 添加全局样式来隐藏多余导航栏
  const style = document.createElement('style');
  style.textContent = `
    body > .nav-bottom,
    body > nav:not(.in-screen),
    body > div:not(.screen):not(.screens-container) > .nav-bottom,
    body > div:not(.screen):not(.screens-container) > nav,
    #app .nav-bottom,
    #dining-out-app .nav-bottom,
    .extra-navbar {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
      position: absolute !important;
      z-index: -999 !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * 添加外食管理界面到页面中
 */
function addDiningOutManagementScreen() {
  // 检查是否已存在外食管理界面
  if (document.querySelector('.screen[data-page="dining-out-management"]')) {
    console.log('外食管理界面已存在，无需重复添加');
    return;
  }
  
  // 创建外食管理界面元素
  const diningOutScreen = document.createElement('div');
  diningOutScreen.className = 'screen';
  diningOutScreen.setAttribute('data-page', 'dining-out-management');
  
  // 设置界面内容 - 不添加底部导航栏，使用全局共享的导航栏
  diningOutScreen.innerHTML = `
    <!-- iOS状态栏 -->
    <div class="ios-status-bar px-6 flex items-center justify-between">
        <div class="text-xs">9:41</div>
        <div class="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        </div>
        <div class="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <div class="w-5 h-2 bg-black rounded-full"></div>
        </div>
    </div>

    <!-- 外食管理应用容器 -->
    <div id="dining-out-app" class="scrollable-content"></div>
  `;
  
  // 将外食管理界面添加到页面中
  // 查找合适的容器
  const screensContainer = document.querySelector('.screens-container');
  
  if (screensContainer) {
    // 在screens-container内添加新界面
    screensContainer.appendChild(diningOutScreen);
    console.log('外食管理界面已添加到screens-container容器中');
  } else {
    // 查找所有screen元素
    const existingScreens = document.querySelectorAll('.screen');
    
    if (existingScreens.length > 0) {
      // 获取最后一个screen及其父容器
      const lastScreen = existingScreens[existingScreens.length - 1];
      const parentContainer = lastScreen.parentNode;
      
      // 判断是否需要创建screens-container
      if (parentContainer === document.body) {
        // 如果screen直接位于body下，创建screens-container
        const newContainer = document.createElement('div');
        newContainer.className = 'screens-container';
        
        // 将所有screen移到新容器中
        existingScreens.forEach(screen => {
          if (screen.parentNode === document.body) {
            newContainer.appendChild(screen);
          }
        });
        
        // 添加新的screen
        newContainer.appendChild(diningOutScreen);
        
        // 将容器添加到body
        document.body.appendChild(newContainer);
        console.log('创建了screens-container并添加了所有屏幕');
      } else {
        // 否则直接添加到父容器中
        parentContainer.appendChild(diningOutScreen);
        console.log('外食管理界面已添加到现有屏幕容器中');
      }
    } else {
      // 如果没有现有screen，创建screens-container并添加到body
      const newContainer = document.createElement('div');
      newContainer.className = 'screens-container';
      newContainer.appendChild(diningOutScreen);
      document.body.appendChild(newContainer);
      console.log('创建了screens-container并添加了外食管理界面');
    }
  }
  
  // 再次清理导航栏，确保没有多余的导航栏
  setTimeout(cleanupExtraNavbars, 100);
}

/**
 * 更新导航，添加外食选项
 */
function updateNavigation() {
  // 获取所有页面的底部导航菜单
  const navBottoms = document.querySelectorAll('.nav-bottom');
  
  navBottoms.forEach(navBottom => {
    const navButtons = navBottom.querySelectorAll('.flex.justify-around');
    
    // 如果有导航按钮，并且没有外食选项，则添加
    if (navButtons.length > 0) {
      const navButtonContainer = navButtons[0];
      const diningOutButton = navButtonContainer.querySelector('button[onclick="showScreen(\'dining-out-management\')"]');
      
      // 检查是否已存在外食按钮
      if (!diningOutButton) {
        // 创建外食按钮
        const diningOutBtn = document.createElement('button');
        diningOutBtn.setAttribute('onclick', "showScreen('dining-out-management')");
        diningOutBtn.className = 'flex flex-col items-center w-16';
        diningOutBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
          </svg>
          <span class="nav-text">外食</span>
        `;
        
        // 将外食按钮添加到导航栏中，放在第三个位置（如果有足够的按钮）
        const buttons = navButtonContainer.querySelectorAll('button');
        if (buttons.length >= 3) {
          // 在第三个按钮前插入
          navButtonContainer.insertBefore(diningOutBtn, buttons[2]);
        } else {
          // 直接添加到末尾
          navButtonContainer.appendChild(diningOutBtn);
        }
      }
    }
  });
  
  console.log('导航栏已更新，添加了外食选项');
}

/**
 * 初始化外食管理应用容器
 */
function initDiningOutApp() {
  // 获取外食管理应用容器
  const diningOutApp = document.getElementById('dining-out-app');
  
  if (diningOutApp) {
    // 设置容器内容为app div，用于dining_out_management.js脚本渲染内容
    diningOutApp.innerHTML = '<div id="app"></div>';
    console.log('外食管理应用容器已初始化');
  } else {
    console.error('找不到外食管理应用容器元素');
  }
}

// 扩展showScreen功能，处理外食管理界面的显示
const originalShowScreen = window.showScreen || function() {};

window.showScreen = function(screenName) {
  // 调用原始的showScreen函数
  if (typeof originalShowScreen === 'function') {
    originalShowScreen(screenName);
  }
  
  // 处理所有页面的显示/隐藏
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    if (screen.getAttribute('data-page') === screenName) {
      screen.style.display = 'flex';
      
      // 更新导航图标状态
      updateNavigationIcons(screenName);
      
      // 切换到外食管理界面时清理多余导航栏
      if (screenName === 'dining-out-management') {
        setTimeout(cleanupExtraNavbars, 50);
      }
    } else {
      screen.style.display = 'none';
    }
  });
  
  // 如果是切换到外食管理界面，初始化应用
  if (screenName === 'dining-out-management') {
    // 如果dining_out_management.js中有初始化函数，调用它
    if (typeof initApp === 'function') {
      initApp();
      // 再次执行导航栏清理
      setTimeout(cleanupExtraNavbars, 100);
    }
  }
  
  console.log(`页面已切换到: ${screenName}`);
};

/**
 * 更新导航图标的激活状态
 * @param {string} activeScreenName - 当前激活的页面名称
 */
function updateNavigationIcons(activeScreenName) {
  // 获取所有导航栏
  const navBottoms = document.querySelectorAll('.nav-bottom:not(.extra-navbar)');
  
  // 对每个导航栏进行处理
  navBottoms.forEach(navBottom => {
    // 重置所有导航图标状态
    const allIcons = navBottom.querySelectorAll('.nav-icon');
    const allTexts = navBottom.querySelectorAll('.nav-text');
    
    allIcons.forEach(icon => icon.classList.remove('active'));
    allTexts.forEach(text => text.classList.remove('active'));
    
    // 激活对应的导航图标
    const activeButton = navBottom.querySelector(`button[onclick="showScreen('${activeScreenName}')"]`);
    if (activeButton) {
      const icon = activeButton.querySelector('.nav-icon');
      const text = activeButton.querySelector('.nav-text');
      
      if (icon) icon.classList.add('active');
      if (text) text.classList.add('active');
    }
  });
} 
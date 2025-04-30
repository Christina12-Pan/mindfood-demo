/**
 * @fileoverview 修复外食管理界面没有显示的问题
 * @version 1.0.0
 */

// 确保在DOM加载后立即执行
(function() {
  // 立即执行，不等待DOMContentLoaded，因为脚本可能在页面加载后才添加
  setTimeout(fixDiningOutManagementPage, 500);

  // 确保DOM加载后也执行一次
  document.addEventListener('DOMContentLoaded', fixDiningOutManagementPage);
  
  // 尝试在window加载后执行，以确保所有资源都已加载
  window.addEventListener('load', fixDiningOutManagementPage);
})();

/**
 * 修复外食管理界面问题
 */
function fixDiningOutManagementPage() {
  console.log('正在修复外食管理界面...');
  
  // 检查是否已存在外食管理界面
  if (!document.querySelector('.screen[data-page="dining-out-management"]')) {
    console.log('未找到外食管理界面，正在添加...');
    
    // 尝试调用添加外食管理界面函数
    if (typeof addDiningOutManagementScreen === 'function') {
      addDiningOutManagementScreen();
      updateNavigation();
      initDiningOutApp();
    } else {
      console.log('未找到addDiningOutManagementScreen函数，可能脚本未正确加载');
      
      // 手动添加外食管理界面
      addDiningOutManagementScreenManually();
    }
  } else {
    console.log('外食管理界面已存在，正在更新导航...');
    
    // 尝试调用更新导航函数
    if (typeof updateNavigation === 'function') {
      updateNavigation();
    } else {
      // 手动更新导航
      updateNavigationManually();
    }
  }
  
  // 修复showScreen函数，确保能正确切换到外食管理界面
  fixShowScreenFunction();
}

/**
 * 手动添加外食管理界面
 */
function addDiningOutManagementScreenManually() {
  console.log('正在手动添加外食管理界面...');
  
  // 创建外食管理界面元素
  const diningOutScreen = document.createElement('div');
  diningOutScreen.className = 'screen';
  diningOutScreen.setAttribute('data-page', 'dining-out-management');
  
  // 设置界面内容
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

    <!-- iOS底部导航栏 -->
    <div class="nav-bottom">
        <div class="bg-white px-4 py-2">
            <div class="flex justify-around">
                <button onclick="showScreen('home')" class="flex flex-col items-center w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="nav-text">首页</span>
                </button>
                <button onclick="showScreen('dish-recognition')" class="flex flex-col items-center w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="nav-text">扫描</span>
                </button>
                <button onclick="showScreen('dining-out-management')" class="flex flex-col items-center w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon active" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                    <span class="nav-text active">外食</span>
                </button>
                <button onclick="showScreen('personalized-meal')" class="flex flex-col items-center w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="nav-text">个人</span>
                </button>
            </div>
            <div class="ios-home-indicator"></div>
        </div>
    </div>
  `;
  
  // 将外食管理界面添加到页面中
  document.body.appendChild(diningOutScreen);
  
  // 初始化外食管理应用容器
  const diningOutApp = document.getElementById('dining-out-app');
  if (diningOutApp) {
    diningOutApp.innerHTML = '<div id="app"></div>';
    
    // 如果dining_out_management.js中的initApp函数存在，调用它
    if (typeof window.initApp === 'function') {
      setTimeout(window.initApp, 100);
    }
  }
  
  console.log('外食管理界面已手动添加');
}

/**
 * 手动更新导航
 */
function updateNavigationManually() {
  console.log('正在手动更新导航...');
  
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
  
  console.log('导航栏已手动更新');
}

/**
 * 修复showScreen函数，确保能正确切换到外食管理界面
 */
function fixShowScreenFunction() {
  console.log('正在修复showScreen函数...');
  
  // 保存原始的showScreen函数
  const originalShowScreen = window.showScreen || function() {};
  
  // 替换showScreen函数
  window.showScreen = function(screenName) {
    console.log(`showScreen被调用: ${screenName}`);
    
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
        updateNavigationIconsManually(screenName, screen);
      } else {
        screen.style.display = 'none';
      }
    });
    
    // 如果是切换到外食管理界面，初始化应用
    if (screenName === 'dining-out-management') {
      // 如果dining_out_management.js中有初始化函数，调用它
      if (typeof window.initApp === 'function') {
        setTimeout(window.initApp, 100);
      }
    }
    
    console.log(`页面已切换到: ${screenName}`);
  };
  
  console.log('showScreen函数已修复');
}

/**
 * 手动更新导航图标的激活状态
 */
function updateNavigationIconsManually(activeScreenName, screen) {
  // 获取当前页面的导航按钮
  const navBottom = screen.querySelector('.nav-bottom');
  if (!navBottom) return;
  
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
} 
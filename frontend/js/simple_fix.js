/**
 * @description 简单修复确保社区页面的导航栏显示并可以点击
 */
document.addEventListener('DOMContentLoaded', function() {
    // 等待DOM加载完成
    setTimeout(function() {
        console.log('简单修复脚本开始执行...');
        
        // 查找所有底部导航栏
        document.querySelectorAll('.nav-bottom').forEach((navBar, index) => {
            console.log(`正在处理第${index+1}个导航栏...`);
            
            // 检查这个导航栏是否为空
            if (!navBar.innerHTML.trim()) {
                console.log(`发现空导航栏，正在填充内容...`);
                
                // 填充导航栏内容
                navBar.innerHTML = `
                <div class="bg-white border-t border-gray-200 px-6 py-2">
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col items-center" data-page="home">
                            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span class="nav-text">Home</span>
                        </div>
                        <div class="flex flex-col items-center" data-page="logs">
                            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span class="nav-text">Logs</span>
                        </div>
                        <div class="flex flex-col items-center relative" data-page="scan">
                            <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center -mt-5 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span class="nav-text">Scan</span>
                        </div>
                        <div class="flex flex-col items-center" data-page="community">
                            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="nav-text">Community</span>
                        </div>
                        <div class="flex flex-col items-center" data-page="profile">
                            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span class="nav-text">Profile</span>
                        </div>
                    </div>
                </div>
                <div class="ios-home-indicator"></div>
                `;
            }
            
            // 为所有导航项添加点击事件
            const navItems = navBar.querySelectorAll('[data-page]');
            
            navItems.forEach(item => {
                // 避免重复添加事件
                item.removeEventListener('click', navClickHandler);
                item.addEventListener('click', navClickHandler);
            });
        });
        
        // 获取社区页面引用
        const communityPage = Array.from(document.querySelectorAll('.screen')).find(screen => 
            screen.querySelector('.community-posts') !== null
        );
        
        if (communityPage) {
            console.log('找到社区页面，确保其可见性和导航栏显示');
        } else {
            console.log('未找到社区页面');
        }
        
        // 检查是否有用于显示Community页面的导航按钮
        const communityNavItems = document.querySelectorAll('[data-page="community"]');
        console.log(`找到${communityNavItems.length}个Community导航按钮`);
        
        // 修正导航栏的z-index和位置，确保它们显示在正确位置
        document.querySelectorAll('.nav-bottom').forEach(navBar => {
            // 确保导航栏显示在顶层
            navBar.style.zIndex = "1000";
            navBar.style.position = "absolute";
            navBar.style.bottom = "0";
            navBar.style.width = "100%";
            
            // 确保导航栏有足够的空间
            const parentScreen = navBar.closest('.screen');
            if (parentScreen) {
                const contentArea = parentScreen.querySelector('.scrollable-content');
                if (contentArea) {
                    contentArea.style.paddingBottom = "80px";
                }
            }
        });
        
        console.log('简单修复脚本执行完成');
    }, 1500);
});

/**
 * @description 导航栏点击事件处理函数
 * @param {Event} event 点击事件
 */
function navClickHandler(event) {
    const page = this.getAttribute('data-page');
    console.log(`点击了导航项：${page}`);
    
    // 尝试使用全局函数导航
    if (typeof window.navigateToPage === 'function') {
        window.navigateToPage(page);
    } else {
        // 手动实现导航逻辑
        // 隐藏所有页面
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
        
        // 根据页面名称查找对应页面
        let targetScreen;
        const screens = document.querySelectorAll('.screen');
        
        if (page === 'home' && screens.length > 0) {
            targetScreen = screens[0];
        } else if (page === 'scan' && screens.length > 1) {
            targetScreen = screens[1];
        } else if (page === 'logs' && screens.length > 2) {
            targetScreen = screens[2];
        } else if (page === 'community') {
            // 查找Community页面
            targetScreen = Array.from(screens).find(screen => 
                screen.querySelector('.community-posts') !== null
            );
        } else if (page === 'profile' && screens.length > 4) {
            targetScreen = screens[4];
        }
        
        // 显示目标页面
        if (targetScreen) {
            targetScreen.style.display = 'flex';
        } else {
            // 默认显示首页
            screens[0].style.display = 'flex';
        }
        
        // 更新导航栏激活状态
        document.querySelectorAll('.nav-bottom').forEach(nav => {
            // 重置所有导航项
            nav.querySelectorAll('.nav-icon, .nav-text').forEach(el => {
                el.classList.remove('active');
            });
            
            // 激活当前页面对应的导航项
            const currentPageItem = nav.querySelector(`[data-page="${page}"]`);
            if (currentPageItem) {
                currentPageItem.querySelector('.nav-icon')?.classList.add('active');
                currentPageItem.querySelector('.nav-text')?.classList.add('active');
            }
        });
    }
} 
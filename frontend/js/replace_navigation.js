/**
 * @description 统一替换所有导航栏为Home、Logs、Scan、Community、Profile
 */
document.addEventListener('DOMContentLoaded', function() {
    // 等待DOM完全加载
    setTimeout(function() {
        console.log('正在替换所有导航栏...');
        
        // 查找所有导航栏
        const navBars = document.querySelectorAll('.nav-bottom');
        
        if (navBars.length > 0) {
            console.log(`找到${navBars.length}个导航栏，开始替换...`);
            
            navBars.forEach((navBar, index) => {
                // 创建统一的导航栏HTML
                const newNavHTML = `
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
                
                // 替换导航栏内容
                navBar.innerHTML = newNavHTML;
                console.log(`已替换第${index + 1}个导航栏`);
                
                // 为导航项添加点击事件
                addNavItemClickEvents(navBar);
            });
            
            console.log('所有导航栏已替换完成');
            
            // 根据当前页面激活相应的导航项
            activateCurrentNavItem();
        } else {
            console.log('未找到导航栏');
        }
    }, 500); // 延迟500毫秒执行，确保DOM加载完成
});

/**
 * @description 为导航项添加点击事件
 * @param {HTMLElement} navBar 导航栏元素
 */
function addNavItemClickEvents(navBar) {
    const navItems = navBar.querySelectorAll('[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

// 将函数暴露到全局作用域，以便其他脚本可以使用
window.addNavItemClickEvents = addNavItemClickEvents;
window.navigateToPage = navigateToPage;
window.updateAllNavBars = updateAllNavBars;

/**
 * @description 导航到指定页面
 * @param {string} page 页面标识
 */
function navigateToPage(page) {
    console.log(`导航到页面: ${page}`);
    
    // 隐藏所有页面
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    // 显示目标页面
    let targetScreen;
    
    switch(page) {
        case 'home':
            targetScreen = document.querySelector('.screen:nth-child(1)');
            break;
        case 'logs':
            targetScreen = document.querySelector('.screen:nth-child(3)'); // 日志页面通常是第三个
            break;
        case 'scan':
            targetScreen = document.querySelector('.screen:nth-child(2)'); // 扫描页面通常是第二个
            break;
        case 'community':
            targetScreen = document.querySelector('.screen:nth-child(4)'); // 社区页面
            break;
        case 'profile':
            targetScreen = document.querySelector('.screen:nth-child(5)'); // 个人资料页面
            break;
        default:
            targetScreen = document.querySelector('.screen:nth-child(1)'); // 默认为首页
    }
    
    // 显示目标页面
    if (targetScreen) {
        targetScreen.style.display = 'flex';
        console.log(`页面 ${page} 已显示`);
    } else {
        console.log(`未找到页面 ${page}`);
        // 如果没找到对应页面，显示首页
        document.querySelector('.screen:nth-child(1)')?.style.display = 'flex';
    }
    
    // 更新所有导航栏的激活状态
    updateAllNavBars(page);
}

/**
 * @description 更新所有导航栏的激活状态
 * @param {string} activePage 当前激活的页面
 */
function updateAllNavBars(activePage) {
    document.querySelectorAll('.nav-bottom').forEach(navBar => {
        // 重置所有导航项为非激活状态
        navBar.querySelectorAll('.nav-icon, .nav-text').forEach(item => {
            item.classList.remove('active');
        });
        
        // 激活当前页面对应的导航项
        const activeItem = navBar.querySelector(`[data-page="${activePage}"]`);
        if (activeItem) {
            activeItem.querySelector('.nav-icon')?.classList.add('active');
            activeItem.querySelector('.nav-text')?.classList.add('active');
        }
    });
}

/**
 * @description 根据当前页面激活相应的导航项
 */
function activateCurrentNavItem() {
    // 获取当前页面内容，判断是哪个页面
    const currentPage = getCurrentPage();
    
    // 更新所有导航栏的激活状态
    updateAllNavBars(currentPage);
}

/**
 * @description 根据页面内容判断当前是哪个页面
 * @returns {string} 当前页面类型（home、logs、scan、community、profile）
 */
function getCurrentPage() {
    // 这里简单根据页面标题或特征元素来判断
    // 实际使用时可能需要更精确的判断逻辑
    const title = document.querySelector('h1')?.innerText?.toLowerCase() || '';
    
    if (title.includes('home') || document.querySelector('.dashboard-card')) {
        return 'home';
    } else if (title.includes('log') || document.querySelector('.log-entry')) {
        return 'logs';
    } else if (title.includes('scan') || document.querySelector('.camera-view')) {
        return 'scan';
    } else if (title.includes('community') || document.querySelector('.community-posts')) {
        return 'community';
    } else if (title.includes('profile') || document.querySelector('.profile-info')) {
        return 'profile';
    }
    
    // 默认返回home
    return 'home';
} 
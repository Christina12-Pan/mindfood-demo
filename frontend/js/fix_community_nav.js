/**
 * @description 修复社区页面导航栏与其他页面不一致的问题
 */
document.addEventListener('DOMContentLoaded', function() {
    // 给页面其他脚本足够的时间加载
    setTimeout(function() {
        console.log('开始修复社区页面导航栏...');
        
        // 查找社区页面
        const communityPage = Array.from(document.querySelectorAll('.screen')).find(screen => 
            screen.querySelector('.community-posts') !== null
        );
        
        if (!communityPage) {
            console.log('未找到社区页面，无法修复导航栏');
            return;
        }
        
        console.log('找到社区页面，修复其导航栏...');
        
        // 查找社区页面的导航栏
        const communityNavBar = communityPage.querySelector('.nav-bottom');
        
        if (!communityNavBar) {
            console.log('社区页面中未找到导航栏');
            return;
        }
        
        // 查找其他页面的导航栏作为参考
        const allScreens = Array.from(document.querySelectorAll('.screen'));
        const otherNavBars = [];
        
        // 查找不是社区页面的导航栏
        allScreens.forEach(screen => {
            if (!screen.querySelector('.community-posts')) {
                const navBar = screen.querySelector('.nav-bottom');
                if (navBar) {
                    otherNavBars.push(navBar);
                }
            }
        });
        
        const referenceNavBar = otherNavBars[0];
        
        if (!referenceNavBar) {
            console.log('未找到可以作为参考的其他导航栏');
            
            // 使用标准导航栏HTML替换
            const standardNavHTML = `
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
            
            // 替换社区页面的导航栏内容
            communityNavBar.innerHTML = standardNavHTML;
            console.log('已使用标准导航栏模板替换社区页面导航栏');
        } else {
            // 复制参考导航栏的HTML替换社区页面的导航栏
            communityNavBar.innerHTML = referenceNavBar.innerHTML;
            console.log('已使用其他页面的导航栏模板替换社区页面导航栏');
        }
        
        // 重新应用激活状态，将Community设为活动状态
        const communityNavItems = communityNavBar.querySelectorAll('[data-page]');
        
        // 先清除所有激活状态
        communityNavItems.forEach(item => {
            item.querySelector('.nav-icon')?.classList.remove('active');
            item.querySelector('.nav-text')?.classList.remove('active');
        });
        
        // 设置Community为激活状态
        const communityItem = communityNavBar.querySelector('[data-page="community"]');
        if (communityItem) {
            communityItem.querySelector('.nav-icon')?.classList.add('active');
            communityItem.querySelector('.nav-text')?.classList.add('active');
        }
        
        // 为社区页面的导航项添加点击事件
        communityNavItems.forEach(item => {
            // 先移除可能存在的事件监听器
            item.removeEventListener('click', window.navClickHandler);
            item.removeEventListener('click', window.navigateToPage);
            
            // 添加新的事件监听器
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                console.log(`点击了社区页面中的导航项：${page}`);
                
                // 尝试使用全局导航函数
                if (typeof window.navigateToPage === 'function') {
                    window.navigateToPage(page);
                } else if (typeof window.navClickHandler === 'function') {
                    window.navClickHandler.call(this);
                }
            });
        });
        
        // 应用导航栏布局修复
        if (typeof window.fixNavBarLayout === 'function') {
            window.fixNavBarLayout(communityNavBar);
            console.log('已应用导航栏布局修复');
        }
        
        console.log('社区页面导航栏修复完成');
    }, 3000); // 给足够时间让其他脚本先执行
}); 
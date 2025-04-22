/**
 * @description 检查是否有Community页面，如果没有则创建一个
 */
document.addEventListener('DOMContentLoaded', function() {
    // 延迟执行，确保其他脚本已完成加载
    setTimeout(function() {
        console.log('检查是否存在Community页面...');
        
        // 查找是否有Community页面（通过查找含有community-posts类的元素）
        const existingCommunityPage = document.querySelector('.community-posts');
        
        if (!existingCommunityPage) {
            console.log('未找到Community页面，创建新的Community页面...');
            createCommunityPage();
        } else {
            console.log('已存在Community页面，无需创建');
        }
    }, 1000); // 在replace_navigation.js执行后延迟执行
});

/**
 * @description 创建Community页面
 */
function createCommunityPage() {
    // 创建社区页面元素
    const communityPage = document.createElement('div');
    communityPage.className = 'screen bg-white';
    
    // 设置页面内容
    communityPage.innerHTML = `
        <div class="ios-status-bar bg-white flex justify-between items-center px-6">
            <span class="text-sm font-semibold">9:41</span>
            <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-4v4h4V7zm1-2h.5a.5.5 0 01.5.5v9a.5.5 0 01-.5.5H15V5z" />
                </svg>
            </div>
        </div>
        
        <!-- 可滚动内容区域 -->
        <div class="scrollable-content community-posts">
            <div class="px-6 pt-4">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-xl font-bold text-dark">Community</h1>
                    <button class="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
                
                <!-- 故事栏 -->
                <div class="flex space-x-4 overflow-x-auto pb-4">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full border-2 border-primary p-0.5 relative">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" class="w-full h-full rounded-full object-cover" alt="User">
                            <div class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <span class="text-xs mt-1">Add Story</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full border-2 border-gray-200 p-0.5">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" class="w-full h-full rounded-full object-cover" alt="User">
                        </div>
                        <span class="text-xs mt-1">Sarah</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full border-2 border-gray-200 p-0.5">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" class="w-full h-full rounded-full object-cover" alt="User">
                        </div>
                        <span class="text-xs mt-1">Lisa</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full border-2 border-gray-200 p-0.5">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" class="w-full h-full rounded-full object-cover" alt="User">
                        </div>
                        <span class="text-xs mt-1">John</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full border-2 border-gray-200 p-0.5">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" class="w-full h-full rounded-full object-cover" alt="User">
                        </div>
                        <span class="text-xs mt-1">Emma</span>
                    </div>
                </div>
                
                <!-- 分类标签 -->
                <div class="flex space-x-3 pb-4 overflow-x-auto">
                    <div class="px-4 py-2 bg-primary text-white rounded-full text-sm whitespace-nowrap">All Posts</div>
                    <div class="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">Recipes</div>
                    <div class="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">Diet Plans</div>
                    <div class="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">Success Stories</div>
                    <div class="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap">Tips</div>
                </div>
                
                <!-- 社区帖子 -->
                <div class="space-y-6">
                    <!-- 帖子1 -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div class="p-4">
                            <div class="flex items-center mb-3">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" class="w-10 h-10 rounded-full mr-3" alt="User">
                                <div>
                                    <h3 class="font-medium text-dark">Sarah Johnson</h3>
                                    <p class="text-xs text-gray-500">Posted 2 hours ago</p>
                                </div>
                            </div>
                            <p class="text-sm text-gray-600 mb-3">
                                Just made this amazing low-carb breakfast bowl that helped me maintain my glucose levels all morning! #PreDiabetesMeal #HealthyEating
                            </p>
                            <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" class="w-full h-48 object-cover rounded-lg mb-3" alt="Breakfast Bowl">
                            <div class="flex justify-between text-sm text-gray-500">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>128 likes</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <span>24 comments</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 帖子2 -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div class="p-4">
                            <div class="flex items-center mb-3">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" class="w-10 h-10 rounded-full mr-3" alt="User">
                                <div>
                                    <h3 class="font-medium text-dark">John Davis</h3>
                                    <p class="text-xs text-gray-500">Posted yesterday</p>
                                </div>
                            </div>
                            <p class="text-sm text-gray-600 mb-3">
                                I've been following the Mediterranean diet plan on Mindfood for 3 months now, and my A1C levels have improved significantly! Here's my latest checkup results 📊
                            </p>
                            <div class="flex justify-between text-sm text-gray-500">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>96 likes</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <span>18 comments</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 底部导航栏 - 完整内容，不依赖replace_navigation.js替换 -->
        <div class="nav-bottom glassmorphism">
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
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon active" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="nav-text active">Community</span>
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
        </div>
    `;
    
    // 在适当位置插入社区页面
    // 我们找到AI助手页面，并在其前面插入社区页面
    const aiAssistantPage = document.querySelector('#aiAssistantScreen')?.closest('.screen');
    
    if (aiAssistantPage) {
        // 在AI助手页面前插入社区页面
        aiAssistantPage.parentNode.insertBefore(communityPage, aiAssistantPage);
        console.log('Community页面已创建并插入到AI Assistant页面之前');
    } else {
        // 如果找不到AI助手页面，就直接附加到body
        document.body.appendChild(communityPage);
        console.log('Community页面已创建并附加到body');
    }
    
    // 确保新页面默认是隐藏的
    communityPage.style.display = 'none';
    
    // 确保导航栏的点击事件绑定
    setTimeout(function() {
        // 找到Community页面的导航项
        const navItems = communityPage.querySelectorAll('.nav-bottom [data-page]');
        
        // 为所有导航项添加点击事件
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                console.log(`点击了Community页面中的导航项：${page}`);
                
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
                        targetScreen = communityPage;
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
            });
        });
        
        console.log('Community页面导航栏点击事件已绑定');
    }, 1000);
} 
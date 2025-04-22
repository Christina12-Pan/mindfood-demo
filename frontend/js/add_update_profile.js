/**
 * @description 加载个人资料页面更新脚本
 * @author 高级iOS工程师
 */
(function() {
    console.log('正在初始化个人资料页面更新脚本加载器...');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备添加个人资料更新脚本');
        
        // 创建脚本元素
        const script = document.createElement('script');
        script.src = 'update_profile_update.js';
        
        // 脚本加载成功回调
        script.onload = function() {
            console.log('个人资料更新脚本加载成功');
        };
        
        // 脚本加载失败回调
        script.onerror = function() {
            console.error('个人资料更新脚本加载失败，启用备用方案');
            applyInlineProfileUpdate();
        };
        
        // 将脚本添加到文档头部
        document.head.appendChild(script);
    });
    
    // 备用内联更新方案
    function applyInlineProfileUpdate() {
        console.log('应用内联个人资料更新');
        
        // 创建样式元素
        const style = document.createElement('style');
        style.textContent = `
            /* 个人资料页面样式 */
            .profile-header {
                background-color: #fff;
                padding: 20px;
                text-align: center;
                position: relative;
            }
            
            .profile-menu-container {
                background-color: #fff;
                border-radius: 10px;
                margin: 15px;
                overflow: hidden;
            }
            
            .profile-menu-item {
                display: flex;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid #f0f0f0;
            }
        `;
        document.head.appendChild(style);
        
        // 等待一秒后更新个人资料页面
        setTimeout(function() {
            updateProfileBasic();
        }, 1000);
    }
    
    // 基本个人资料更新函数
    function updateProfileBasic() {
        // 查找个人资料页面
        const profileScreen = Array.from(document.querySelectorAll('.screen')).find(screen => {
            return screen.getAttribute('data-page') === 'profile' || 
                  (screen.querySelector('h2') && screen.querySelector('h2').textContent.includes('Profile'));
        });
        
        if (!profileScreen) {
            console.log('未找到个人资料页面');
            return;
        }
        
        // 查找可滚动内容区域
        const scrollableContent = profileScreen.querySelector('.scrollable-content');
        if (!scrollableContent) {
            console.log('未找到可滚动内容区域');
            return;
        }
        
        // 清空现有内容
        scrollableContent.innerHTML = '';
        
        // 添加简化版个人资料内容
        scrollableContent.innerHTML = `
            <div class="profile-header">
                <div class="text-sm font-medium text-gray-500">9:41</div>
                <div class="text-xl font-bold text-orange-500 my-2">MindFood</div>
                
                <div class="relative inline-block mb-3 mt-2">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" alt="Profile" 
                        style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                </div>
                
                <h1 class="text-xl font-bold mt-2 mb-1">Cindy Black</h1>
                <p class="text-xs text-gray-500 mb-1">Joined in Dec 2024</p>
                
                <div style="display: flex; justify-content: space-between; margin: 15px 0; padding: 0 15px;">
                    <div style="text-align: center;">
                        <div class="font-bold text-lg">5,212</div>
                        <div class="text-xs text-gray-500">Mindfood points</div>
                    </div>
                    <div style="text-align: center;">
                        <div class="font-bold text-lg">6</div>
                        <div class="text-xs text-gray-500">Followers</div>
                    </div>
                    <div style="text-align: center;">
                        <div class="font-bold text-lg">103</div>
                        <div class="text-xs text-gray-500">Like</div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mt-2">
                    <div class="text-xs bg-gray-100 rounded-full px-2 py-1">🏆🥗 4 achievements</div>
                </div>
                
                <div class="text-sm text-left mt-3 text-gray-600">
                    27, Female, 5" 6', 116 lbs
                </div>
            </div>
            
            <!-- 主要菜单 -->
            <div class="profile-menu-container">
                <div class="profile-menu-item">
                    <span class="flex-1">Recipes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="profile-menu-item">
                    <span class="flex-1">Progress</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="profile-menu-item">
                    <span class="flex-1">Mindfood Points</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="profile-menu-item">
                    <span class="flex-1">Liked</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        `;
        
        console.log('基本个人资料页面内容更新完成');
    }
})(); 
/**
 * @description 个人资料页面更新脚本 - 基于最新UI设计
 * @author 高级iOS工程师
 */
(function() {
    console.log('个人资料页面更新脚本已加载');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备更新个人资料页面');
        
        // 添加全局样式
        addGlobalStyles();
        
        // 初始化个人资料页面更新
        initProfileUpdate();
    });
    
    /**
     * @description 添加全局样式
     */
    function addGlobalStyles() {
        console.log('添加个人资料页面全局样式');
        
        const style = document.createElement('style');
        style.textContent = `
            /* 个人资料页面全局样式 */
            .profile-header {
                background-color: #fff;
                padding: 20px 16px;
                text-align: center;
                position: relative;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .profile-avatar {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin: 0 auto 12px;
                display: block;
            }
            
            .profile-name {
                font-size: 20px;
                font-weight: 700;
                margin: 4px 0;
                color: #333;
            }
            
            .profile-joined {
                font-size: 12px;
                color: #888;
                margin-bottom: 14px;
            }
            
            .profile-stats {
                display: flex;
                justify-content: space-between;
                margin: 16px 0;
                padding: 0 12px;
                max-width: 320px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .profile-stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .profile-stat-value {
                font-size: 18px;
                font-weight: 700;
                color: #333;
            }
            
            .profile-stat-label {
                font-size: 12px;
                color: #888;
                margin-top: 2px;
            }
            
            .profile-achievements {
                display: inline-block;
                font-size: 12px;
                color: #666;
                background-color: #f5f5f5;
                border-radius: 16px;
                padding: 4px 10px;
                margin-top: 8px;
            }
            
            .profile-bio {
                font-size: 13px;
                color: #666;
                text-align: left;
                margin-top: 14px;
                line-height: 1.4;
            }
            
            .profile-menu-container {
                background-color: #fff;
                border-radius: 12px;
                margin: 16px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            
            .profile-menu-item {
                display: flex;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #f0f0f0;
                transition: background-color 0.2s;
            }
            
            .profile-menu-item:last-child {
                border-bottom: none;
            }
            
            .profile-menu-item:active {
                background-color: #f8f8f8;
            }
            
            .profile-menu-item span {
                flex: 1;
                font-size: 15px;
                color: #333;
            }
            
            .profile-menu-item svg {
                color: #ccc;
            }
            
            .profile-card {
                background-color: #fff;
                border-radius: 12px;
                margin: 16px;
                padding: 16px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            
            .profile-card-title {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin-bottom: 10px;
            }
            
            .profile-card-content {
                font-size: 14px;
                color: #666;
                line-height: 1.5;
            }
            
            .profile-button {
                background-color: #ff7e1f;
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 16px;
                font-size: 14px;
                font-weight: 600;
                margin-top: 12px;
                width: 100%;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .profile-button:active {
                background-color: #e86a14;
            }
            
            .profile-button.secondary {
                background-color: #f5f5f5;
                color: #666;
            }
            
            .profile-button.secondary:active {
                background-color: #e8e8e8;
            }
            
            /* 处理文本截断 */
            .truncate {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
            }
        `;
        
        document.head.appendChild(style);
        console.log('个人资料页面全局样式已添加');
    }
    
    /**
     * @description 初始化个人资料页面更新
     */
    function initProfileUpdate() {
        console.log('初始化个人资料页面更新');
        
        // 立即检查并更新个人资料页面
        updateProfilePage();
        
        // 创建MutationObserver来监听DOM变化，处理动态加载的内容
        const observer = new MutationObserver(function(mutations) {
            // 当DOM发生变化时，尝试更新个人资料页面
            updateProfilePage();
        });
        
        // 开始观察文档的变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('个人资料页面更新监听器已启动');
    }
    
    /**
     * @description 更新个人资料页面
     */
    function updateProfilePage() {
        console.log('检查个人资料页面状态');
        
        // 查找个人资料页面
        const profileScreen = Array.from(document.querySelectorAll('.screen')).find(screen => {
            return screen.getAttribute('data-page') === 'profile' || 
                  (screen.querySelector('h2') && screen.querySelector('h2').textContent.includes('Profile'));
        });
        
        if (!profileScreen) {
            console.log('未找到个人资料页面，跳过更新');
            return;
        }
        
        // 查找可滚动内容区域
        const scrollableContent = profileScreen.querySelector('.scrollable-content');
        if (!scrollableContent) {
            console.log('未找到可滚动内容区域，跳过更新');
            return;
        }
        
        console.log('找到个人资料页面，开始更新内容');
        
        // 清空现有内容
        scrollableContent.innerHTML = '';
        
        // 添加个人资料内容
        updateProfileContent(scrollableContent);
        
        console.log('个人资料页面内容更新完成');
    }
    
    /**
     * @description 更新个人资料内容
     * @param {HTMLElement} container - 内容容器元素
     */
    function updateProfileContent(container) {
        // 个人资料头部
        const headerContent = `
            <div class="profile-header">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                     alt="个人头像" 
                     class="profile-avatar">
                
                <h1 class="profile-name">Cindy Black</h1>
                <p class="profile-joined">加入于 2024年12月</p>
                
                <div class="profile-stats">
                    <div class="profile-stat-item">
                        <div class="profile-stat-value">5,212</div>
                        <div class="profile-stat-label">MindFood积分</div>
                    </div>
                    <div class="profile-stat-item">
                        <div class="profile-stat-value">6</div>
                        <div class="profile-stat-label">关注者</div>
                    </div>
                    <div class="profile-stat-item">
                        <div class="profile-stat-value">103</div>
                        <div class="profile-stat-label">点赞</div>
                    </div>
                </div>
                
                <div class="profile-achievements">
                    🏆🥗 4项成就
                </div>
                
                <div class="profile-bio">
                    27岁, 女性, 5英尺6英寸, 116磅
                </div>
            </div>
        `;
        
        // 功能菜单
        const menuContent = `
            <div class="profile-menu-container">
                <div class="profile-menu-item">
                    <span>食谱</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="profile-menu-item">
                    <span>进度</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="profile-menu-item">
                    <span>MindFood积分</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="profile-menu-item">
                    <span>已点赞</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        `;
        
        // 订阅卡片
        const subscriptionCard = `
            <div class="profile-card">
                <div class="profile-card-title">MindFood Pro</div>
                <div class="profile-card-content">
                    升级到MindFood Pro获取更多健康食谱、个性化营养建议和独家社区功能。
                </div>
                <button class="profile-button">升级会员</button>
            </div>
        `;
        
        // 健康问卷卡片
        const healthQuestionnaireCard = `
            <div class="profile-card">
                <div class="profile-card-title">健康问卷</div>
                <div class="profile-card-content">
                    完成您的健康问卷以获得更精准的营养建议和饮食计划推荐。
                </div>
                <button class="profile-button secondary">开始问卷</button>
            </div>
        `;
        
        // 将所有内容组合并添加到容器中
        container.innerHTML = headerContent + menuContent + subscriptionCard + healthQuestionnaireCard;
        
        // 恢复导航栏
        const navBottom = document.querySelector('.nav-bottom');
        if (navBottom) {
            navBottom.style.display = 'flex';
        }
        
        console.log('个人资料页面内容已更新');
    }
})(); 
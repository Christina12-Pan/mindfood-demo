/**
 * @description 产品化重新设计Home主页界面
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('Home主页重新设计脚本已加载');
    
    // 避免重复应用
    let hasApplied = false;

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备重新设计Home主页');
        
        // 立即尝试执行重新设计，不需要延迟
        redesignHomePage();
        
        // 设置MutationObserver监听DOM变化
        setupMutationObserver();
        
        // 设置超时，确保最终会注册完成状态
        setTimeout(function() {
            if (window.registerScriptCompletion && !hasApplied) {
                console.log('Home页面重新设计超时，强制完成');
                window.registerScriptCompletion('homeRedesigned');
            }
        }, 2000);
    });
    
    /**
     * 设置MutationObserver监听DOM变化
     */
    function setupMutationObserver() {
        console.log('设置DOM变化观察器');
        
        // 使用防抖函数限制触发频率
        let debounceTimer;
        
        const observer = new MutationObserver(function(mutations) {
            // 清除之前的计时器
            clearTimeout(debounceTimer);
            
            // 立即检查是否有屏幕变化
            const screensChanged = mutations.some(function(mutation) {
                return Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && 
                    (node.classList && (node.classList.contains('screen') || 
                     node.querySelector('.screen')))
                );
            });
            
            if (screensChanged) {
                // 设置较短的延迟执行重新设计
                debounceTimer = setTimeout(function() {
                    console.log('检测到屏幕变化，尝试重新设计');
                    hasApplied = false; // 重置标志，允许重新应用
                    redesignHomePage();
                }, 50); // 减少延迟时间
            }
        });
        
        // 观察整个文档的变化，提高优先级
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true,
            characterData: true
        });
    }

    /**
     * 重新设计Home主页
     */
    function redesignHomePage() {
        // 防止重复应用
        if (hasApplied) {
            console.log('已经应用过Home页面设计，跳过');
            return;
        }
        
        console.log('尝试重新设计Home主页');
        
        // 尝试找到Home页面
        const homeScreen = findHomeScreen();
        if (!homeScreen) {
            console.log('未找到Home页面');
            return;
        }
        
        // 检查页面是否已经包含我们设计的元素
        if (homeScreen.querySelector('.home-redesigned-container') || 
            homeScreen.querySelector('[data-redesigned="home"]') ||
            homeScreen.querySelector('[data-container="home-content"]')) {
            console.log('Home页面已经被重新设计过，跳过');
            hasApplied = true;
            return;
        }
        
        console.log('找到Home页面，准备重新设计');
        
        try {
            // 清空Home页面内容，保留必要结构
            clearHomeContent(homeScreen);
            
            // 添加新设计的内容
            addHomeContent(homeScreen);
            
            // 标记页面已被重新设计
            homeScreen.setAttribute('data-redesigned', 'home');
            
            // 标记为已应用
            hasApplied = true;
            
            console.log('Home主页重新设计完成');
        } catch (error) {
            console.error('重新设计过程中出错:', error);
        }
    }
    
    /**
     * 查找Home页面
     * @returns {HTMLElement|null} Home页面元素或null
     */
    function findHomeScreen() {
        // 尝试多种方法查找Home页面
        
        // 方法1：通过data-page属性查找
        let homeScreen = document.querySelector('.screen[data-page="home"]');
        if (homeScreen) {
            console.log('通过data-page属性找到Home页面');
            return homeScreen;
        }
        
        // 方法2：通过标题查找
        const screens = document.querySelectorAll('.screen');
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            const title = screen.querySelector('h1, h2');
            if (title && title.textContent.toLowerCase().includes('home')) {
                console.log('通过标题找到Home页面');
                return screen;
            }
        }
        
        // 方法3：查找包含"Hi, David"的屏幕 - 这是首页特有的问候语
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            if (screen.innerHTML.includes('Hi, David')) {
                console.log('通过问候语找到Home页面');
                return screen;
            }
        }
        
        // 方法4：查找包含特定元素组合的屏幕
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            // 查找包含今日血糖和快速功能的屏幕
            if (screen.querySelector('.scrollable-content') && 
                (screen.innerHTML.includes("Today's Glucose") || 
                 screen.innerHTML.includes("Quick Actions"))) {
                console.log('通过特定内容找到Home页面');
                return screen;
            }
        }
        
        // 方法5：查找底部导航栏中Home被激活的屏幕
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            const activeHomeNav = screen.querySelector('.nav-text.active');
            if (activeHomeNav && activeHomeNav.textContent.trim() === 'Home') {
                console.log('通过底部导航找到Home页面');
                return screen;
            }
        }
        
        // 方法6：查找当前显示的屏幕（作为最后的尝试）
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            if (getComputedStyle(screen).display !== 'none') {
                // 如果这是当前显示的第三个屏幕，很可能是Home页面（前两个通常是欢迎页和登录页）
                if (i === 2) {
                    console.log('通过位置找到Home页面（第三个屏幕）');
                    return screen;
                }
            }
        }
        
        return null;
    }
    
    /**
     * 清空Home页面内容，保留必要结构
     * @param {HTMLElement} homeScreen - Home页面元素
     */
    function clearHomeContent(homeScreen) {
        // 检查是否有状态栏和底部导航栏
        const statusBar = homeScreen.querySelector('.ios-status-bar');
        const bottomNav = homeScreen.querySelector('.nav-bottom');
        
        // 保存可能需要保留的元素
        const elementsToPreserve = [];
        
        // 保存状态栏（如果存在）
        if (statusBar) {
            console.log('保留现有的iOS状态栏');
            elementsToPreserve.push(statusBar.cloneNode(true));
        }
        
        // 保存底部导航栏（如果存在）
        if (bottomNav) {
            console.log('保留底部导航栏');
            elementsToPreserve.push(bottomNav.cloneNode(true));
        }
        
        // 保存页面的data-page属性
        const dataPage = homeScreen.getAttribute('data-page');
        
        // 优化：创建一个隐藏的容器，进行样式清理
        homeScreen.style.opacity = "0";
        
        // 替换内容，清除所有子元素
        while (homeScreen.firstChild) {
            homeScreen.removeChild(homeScreen.firstChild);
        }
        
        // 恢复保留的元素
        elementsToPreserve.forEach(element => {
            homeScreen.appendChild(element);
        });
        
        // 恢复data-page属性
        if (dataPage) {
            homeScreen.setAttribute('data-page', dataPage);
        }
        
        // 恢复原始的类名
        homeScreen.className = 'screen bg-white flex flex-col';
        if (dataPage) {
            homeScreen.setAttribute('data-page', dataPage);
        }
    }
    
    /**
     * 添加新设计的Home页面内容
     * @param {HTMLElement} homeScreen - Home页面元素
     */
    function addHomeContent(homeScreen) {
        // 创建主容器
        const mainContainer = document.createElement('div');
        mainContainer.className = 'flex flex-col h-full home-redesigned-container';
        
        // 设置白色背景，使下方的背景图片在混合模式下具有适当透明度
        mainContainer.style.backgroundColor = 'transparent';
        
        // 确保主容器内容在背景上方
        mainContainer.style.position = 'relative';
        mainContainer.style.zIndex = '1';
        
        // 检查页面是否已经有iOS状态栏
        const existingStatusBar = homeScreen.querySelector('.ios-status-bar');
        
        // 只有在没有找到现有状态栏时才添加新的状态栏
        if (!existingStatusBar) {
            console.log('添加新的iOS状态栏');
            mainContainer.appendChild(createIOSStatusBar());
        } else {
            console.log('页面已有iOS状态栏，跳过添加');
        }
        
        // 添加顶部搜索栏和AI助手头像
        mainContainer.appendChild(createTopBar());
        
        // 添加内容区域（可滚动）
        const contentArea = document.createElement('div');
        contentArea.className = 'flex-1 overflow-y-auto px-4 pb-16';
        contentArea.setAttribute('data-container', 'home-content');
        
        // 添加动态场景卡片
        contentArea.appendChild(createDynamicSceneCard());
        
        // 添加情景选择功能
        contentArea.appendChild(createScenarioSelection());
        
        // 添加智能推荐内容
        contentArea.appendChild(createRecommendations());
        
        // 将内容区域添加到主容器
        mainContainer.appendChild(contentArea);
        
        // 将主容器添加到Home页面
        homeScreen.appendChild(mainContainer);
        
        // 应用通用背景
        if (typeof window.fixBackgroundConflicts === 'function') {
            setTimeout(window.fixBackgroundConflicts, 100);
        }
        
        // 在所有内容加载完毕后恢复可见性，防止闪烁
        setTimeout(() => {
            homeScreen.style.opacity = "1";
            homeScreen.style.transition = "opacity 0.2s ease-in-out";
            
            // 通知页面优化框架，Home页面重新设计已完成
            if (window.registerScriptCompletion) {
                window.registerScriptCompletion('homeRedesigned');
            }
        }, 10);
    }
    
    /**
     * 创建iOS顶部状态栏
     * @returns {HTMLElement} iOS状态栏元素
     */
    function createIOSStatusBar() {
        const statusBar = document.createElement('div');
        statusBar.className = 'ios-status-bar bg-white flex justify-between items-center px-6 py-2';
        
        // 当前时间 - iPhone标准时间9:41
        const timeSpan = document.createElement('span');
        timeSpan.className = 'text-sm font-semibold';
        timeSpan.textContent = '9:41';
        
        // 右侧图标区域
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'flex';
        
        // 添加信号强度图标
        const signalIcon = document.createElement('div');
        signalIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
        `;
        
        // 添加WiFi图标
        const wifiIcon = document.createElement('div');
        wifiIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
        `;
        
        // 添加电池图标
        const batteryIcon = document.createElement('div');
        batteryIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-4v4h4V7zm1-2h.5a.5.5 0 01.5.5v9a.5.5 0 01-.5.5H15V5z" />
            </svg>
        `;
        
        // 组合右侧图标
        iconsContainer.appendChild(signalIcon);
        iconsContainer.appendChild(wifiIcon);
        iconsContainer.appendChild(batteryIcon);
        
        // 组合状态栏
        statusBar.appendChild(timeSpan);
        statusBar.appendChild(iconsContainer);
        
        return statusBar;
    }
    
    /**
     * 创建顶部搜索栏和AI助手头像
     * @returns {HTMLElement} 顶部栏元素
     */
    function createTopBar() {
        const topBar = document.createElement('div');
        topBar.className = 'px-4 py-3 shadow-sm z-10 border-b border-gray-100';
        topBar.style.background = 'rgba(255, 255, 255, 0.7)';
        topBar.style.backdropFilter = 'blur(10px)';
        topBar.style.webkitBackdropFilter = 'blur(10px)';
        
        const topBarContent = document.createElement('div');
        topBarContent.className = 'flex items-center justify-between';
        
        // 创建AI助手头像
        const aiAvatar = document.createElement('div');
        aiAvatar.className = 'w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center cursor-pointer';
        aiAvatar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#FFBE98]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        `;
        aiAvatar.addEventListener('click', function() {
            console.log('AI Assistant avatar clicked');
            // 这里可以添加跳转到AI助手咨询界面的逻辑
        });
        
        // 创建搜索框
        const searchBar = document.createElement('div');
        searchBar.className = 'flex-1 mx-3 relative';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search for food nutrition...';
        searchInput.className = 'w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBE98] focus:bg-white transition';
        
        const searchIcon = document.createElement('div');
        searchIcon.className = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400';
        searchIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        `;
        
        searchBar.appendChild(searchIcon);
        searchBar.appendChild(searchInput);
        
        // 创建通知图标
        const notificationIcon = document.createElement('div');
        notificationIcon.className = 'w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer';
        notificationIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        `;
        
        // 组合顶部栏
        topBarContent.appendChild(aiAvatar);
        topBarContent.appendChild(searchBar);
        topBarContent.appendChild(notificationIcon);
        
        topBar.appendChild(topBarContent);
        
        return topBar;
    }
    
    /**
     * 创建动态场景卡片
     * @returns {HTMLElement} 动态场景卡片元素
     */
    function createDynamicSceneCard() {
        const container = document.createElement('div');
        container.className = 'mt-4';
        
        // 卡片标题
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex justify-between items-center mb-3';
        
        const title = document.createElement('h2');
        title.className = 'text-lg font-semibold text-gray-800';
        title.textContent = getCurrentTimeGreeting();
        
        titleContainer.appendChild(title);
        
        // 动态场景卡片
        const sceneCard = document.createElement('div');
        sceneCard.className = 'w-full rounded-2xl overflow-hidden shadow-sm relative';
        sceneCard.style.background = 'rgba(255, 255, 255, 0.85)';
        sceneCard.style.backdropFilter = 'blur(5px)';
        sceneCard.style.webkitBackdropFilter = 'blur(5px)';
        sceneCard.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        
        // 场景图片
        const imageContainer = document.createElement('div');
        imageContainer.className = 'relative h-36 w-full overflow-hidden';
        
        const image = document.createElement('img');
        image.src = getSceneImage();
        image.alt = 'Current scene';
        image.className = 'w-full h-full object-cover';
        
        // 图片渐变蒙层
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-gradient-to-b from-black/30 to-transparent';
        
        imageContainer.appendChild(image);
        imageContainer.appendChild(overlay);
        
        // 场景内容
        const contentContainer = document.createElement('div');
        contentContainer.className = 'p-4';
        
        const sceneTitle = document.createElement('h3');
        sceneTitle.className = 'font-semibold text-base text-gray-800 mb-1';
        sceneTitle.textContent = generateSceneTitle();
        
        const sceneDescription = document.createElement('p');
        sceneDescription.className = 'text-sm text-gray-600 mb-3';
        sceneDescription.textContent = generateSceneDescription();
        
        const actionButton = document.createElement('button');
        actionButton.className = 'text-sm font-medium bg-[#FFBE98] text-white py-2 px-4 rounded-full hover:bg-[#FFB084] transition';
        actionButton.textContent = generateActionButtonText();
        
        // 组合场景内容
        contentContainer.appendChild(sceneTitle);
        contentContainer.appendChild(sceneDescription);
        contentContainer.appendChild(actionButton);
        
        // 组合场景卡片
        sceneCard.appendChild(imageContainer);
        sceneCard.appendChild(contentContainer);
        
        // 组合容器
        container.appendChild(titleContainer);
        container.appendChild(sceneCard);
        
        return container;
    }
    
    /**
     * 创建情景选择功能
     * @returns {HTMLElement} 情景选择功能元素
     */
    function createScenarioSelection() {
        const container = document.createElement('div');
        container.className = 'mt-6';
        
        // 标题
        const title = document.createElement('h2');
        title.className = 'text-lg font-semibold text-gray-800 mb-3';
        title.textContent = 'Ready to eat';
        
        container.appendChild(title);
        
        // 情景选择卡片
        const scenariosContainer = document.createElement('div');
        scenariosContainer.className = 'grid grid-cols-3 gap-3';
        
        // 情景1：家庭
        const homeScenario = createScenarioCard(
            'Home',
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>`,
            '#FFE5D6'
        );
        
        // 情景2：一个人外食
        const soloScenario = createScenarioCard(
            'Dining Out',
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>`,
            '#E1F5FE'
        );
        
        // 情景3：聚会
        const partyScenario = createScenarioCard(
            'Party',
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>`,
            '#E8F5E9'
        );
        
        // 添加情景卡片到容器
        scenariosContainer.appendChild(homeScenario);
        scenariosContainer.appendChild(soloScenario);
        scenariosContainer.appendChild(partyScenario);
        
        container.appendChild(scenariosContainer);
        
        return container;
    }
    
    /**
     * 创建智能推荐内容
     * @returns {HTMLElement} 推荐内容元素
     */
    function createRecommendations() {
        const container = document.createElement('div');
        container.className = 'mt-6 mb-4';
        
        // 标题和查看更多
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex justify-between items-center mb-3 px-3 py-2 rounded-lg';
        titleContainer.style.background = 'rgba(255, 255, 255, 0.6)';
        titleContainer.style.backdropFilter = 'blur(4px)';
        titleContainer.style.webkitBackdropFilter = 'blur(4px)';
        titleContainer.style.border = '1px solid rgba(255, 255, 255, 0.4)';
        
        const title = document.createElement('h2');
        title.className = 'text-lg font-semibold text-gray-800';
        title.textContent = 'Recommendations for you';
        
        const viewMore = document.createElement('a');
        viewMore.href = '#';
        viewMore.className = 'text-sm text-[#FFBE98]';
        viewMore.textContent = 'View more';
        
        titleContainer.appendChild(title);
        titleContainer.appendChild(viewMore);
        
        container.appendChild(titleContainer);
        
        return container;
    }
    
    /**
     * 创建情景卡片
     * @param {string} title - 情景标题
     * @param {string} iconSvg - 图标SVG
     * @param {string} bgColor - 背景颜色
     * @returns {HTMLElement} 情景卡片元素
     */
    function createScenarioCard(title, iconSvg, bgColor) {
        const card = document.createElement('div');
        card.className = 'rounded-xl overflow-hidden shadow-sm flex flex-col items-center cursor-pointer p-3';
        
        // 转换颜色以添加透明度，从实心HEX颜色转为带透明度的RGBA颜色
        let rgbaColor = hexToRgba(bgColor, 0.85);
        card.style.backgroundColor = rgbaColor;
        card.style.backdropFilter = 'blur(3px)';
        card.style.webkitBackdropFilter = 'blur(3px)';
        card.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        // 添加悬停效果
        card.addEventListener('mouseenter', function() {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
        
        const iconContainer = document.createElement('div');
        iconContainer.className = 'w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2';
        iconContainer.innerHTML = iconSvg;
        
        const titleElement = document.createElement('span');
        titleElement.className = 'text-sm font-medium text-gray-700';
        titleElement.textContent = title;
        
        card.appendChild(iconContainer);
        card.appendChild(titleElement);
        
        // 添加点击事件
        card.addEventListener('click', function() {
            console.log(`Scenario selected: ${title}`);
            // 这里可以添加跳转到相应界面的逻辑
        });
        
        return card;
    }
    
    /**
     * 将十六进制颜色转换为带透明度的RGBA颜色
     * @param {string} hex - 十六进制颜色值
     * @param {number} alpha - 透明度(0-1)
     * @returns {string} RGBA颜色字符串
     */
    function hexToRgba(hex, alpha) {
        // 移除#号(如果存在)
        hex = hex.replace('#', '');
        
        // 将3位HEX扩展为6位
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        // 解析16进制值
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        // 返回rgba值
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    /**
     * 创建推荐卡片
     * @param {string} imageUrl - 图片URL
     * @param {string} category - 分类
     * @param {string} title - 标题
     * @param {string} info - 附加信息
     * @returns {HTMLElement} 推荐卡片元素
     */
    function createRecommendationCard(imageUrl, category, title, info) {
        // 保留此函数但不再使用，以便将来需要时可以恢复
        const card = document.createElement('div');
        card.className = 'flex items-center bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer';
        
        // 图片部分
        const imageContainer = document.createElement('div');
        imageContainer.className = 'w-20 h-20 flex-shrink-0';
        
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = title;
        image.className = 'w-full h-full object-cover';
        
        imageContainer.appendChild(image);
        
        // 内容部分
        const contentContainer = document.createElement('div');
        contentContainer.className = 'flex-1 p-3';
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'text-xs font-medium text-[#FFBE98] mb-1';
        categoryElement.textContent = category;
        
        const titleElement = document.createElement('h3');
        titleElement.className = 'text-sm font-medium text-gray-800 mb-1 line-clamp-2';
        titleElement.textContent = title;
        
        const infoElement = document.createElement('div');
        infoElement.className = 'text-xs text-gray-500';
        infoElement.textContent = info;
        
        contentContainer.appendChild(categoryElement);
        contentContainer.appendChild(titleElement);
        contentContainer.appendChild(infoElement);
        
        // 组合卡片
        card.appendChild(imageContainer);
        card.appendChild(contentContainer);
        
        // 添加点击事件
        card.addEventListener('click', function() {
            console.log(`Recommendation card clicked: ${title}`);
            // 这里可以添加跳转到详情页的逻辑
        });
        
        return card;
    }
    
    /**
     * 获取基于当前时间的问候语
     * @returns {string} 问候语
     */
    function getCurrentTimeGreeting() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return 'Good Morning';
        } else if (hour >= 12 && hour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    }
    
    /**
     * 获取基于当前时间的场景图片
     * @returns {string} 图片URL
     */
    function getSceneImage() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 10) {
            return 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=500&auto=format&fit=crop'; // 早餐
        } else if (hour >= 10 && hour < 14) {
            return 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=500&auto=format&fit=crop'; // 午餐
        } else if (hour >= 14 && hour < 17) {
            return 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop'; // 下午茶
        } else if (hour >= 17 && hour < 21) {
            return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format&fit=crop'; // 晚餐
        } else {
            return 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?q=80&w=500&auto=format&fit=crop'; // 宵夜
        }
    }
    
    /**
     * 生成基于当前时间的场景标题
     * @returns {string} 场景标题
     */
    function generateSceneTitle() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 10) {
            return '15-Second Breakfast Ideas';
        } else if (hour >= 10 && hour < 14) {
            return 'Quick & Balanced Lunch Suggestions';
        } else if (hour >= 14 && hour < 17) {
            return 'Healthy Afternoon Snack Ideas';
        } else if (hour >= 17 && hour < 21) {
            return 'Dinner Recipe Collection';
        } else {
            return 'Light Late-Night Snack Options';
        }
    }
    
    /**
     * 生成基于当前时间的场景描述
     * @returns {string} 场景描述
     */
    function generateSceneDescription() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 10) {
            return 'Nutritious breakfasts you can make in just 15 seconds to fuel your busy morning.';
        } else if (hour >= 10 && hour < 14) {
            return 'Balanced lunch ideas that will keep your energy levels stable throughout the afternoon.';
        } else if (hour >= 14 && hour < 17) {
            return 'Beat the afternoon slump with these energizing yet healthy snack options.';
        } else if (hour >= 17 && hour < 21) {
            return 'Delicious and balanced dinner recipes perfect for tonight, based on your preferences.';
        } else {
            return 'Satisfy your late-night cravings without disrupting your sleep or nutrition goals.';
        }
    }
    
    /**
     * 生成基于当前时间的行动按钮文本
     * @returns {string} 按钮文本
     */
    function generateActionButtonText() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 10) {
            return 'View breakfast ideas';
        } else if (hour >= 10 && hour < 14) {
            return 'Explore lunch options';
        } else if (hour >= 14 && hour < 17) {
            return 'Get snack suggestions';
        } else if (hour >= 17 && hour < 21) {
            return 'See dinner recipes';
        } else {
            return 'Find late-night snacks';
        }
    }
})(); 
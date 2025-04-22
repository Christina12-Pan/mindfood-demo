/**
 * @description 重新设计Home页面的推荐模块
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('推荐模块重新设计脚本已加载');
    
    // 避免重复应用
    let hasApplied = false;

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备重新设计推荐模块');
        
        // 给页面加载一些时间，确保所有资源加载完成
        setTimeout(redesignRecommendations, 500);
        
        // 设置MutationObserver监听DOM变化
        setupMutationObserver();
    });
    
    /**
     * 设置MutationObserver监听DOM变化
     */
    function setupMutationObserver() {
        console.log('设置DOM变化观察器');
        
        // 使用防抖函数限制触发频率
        let debounceTimer;
        
        const observer = new MutationObserver(function(mutations) {
            // 仅在发现屏幕可见性变化时执行重新设计
            const screensChanged = mutations.some(function(mutation) {
                return Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && 
                    (node.classList && (node.classList.contains('screen') || 
                     node.querySelector('.screen')))
                );
            });
            
            if (screensChanged) {
                // 清除之前的计时器
                clearTimeout(debounceTimer);
                
                // 设置新的计时器，延迟执行重新设计
                debounceTimer = setTimeout(function() {
                    console.log('检测到屏幕变化，尝试重新设计');
                    hasApplied = false; // 重置标志，允许重新应用
                    redesignRecommendations();
                }, 300);
            }
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 重新设计推荐模块
     */
    function redesignRecommendations() {
        // 防止重复应用
        if (hasApplied) {
            console.log('已经应用过推荐模块设计，跳过');
            return;
        }
        
        console.log('尝试重新设计推荐模块');
        
        // 找到Home页面
        const homeScreen = findHomeScreen();
        if (!homeScreen) {
            console.log('未找到Home页面');
            return;
        }
        
        // 找到推荐模块
        const recommendationsSection = findRecommendationsSection(homeScreen);
        if (!recommendationsSection) {
            console.log('未找到推荐模块');
            return;
        }
        
        console.log('找到推荐模块，准备重新设计');
        
        try {
            // 保存原始标题部分
            const titleSection = extractTitleSection(recommendationsSection);
            
            // 创建新的推荐模块
            const newRecommendationsModule = createNewRecommendationsModule(titleSection);
            
            // 替换旧的推荐模块
            replaceRecommendationsModule(recommendationsSection, newRecommendationsModule);
            
            // 标记为已应用
            hasApplied = true;
            
            console.log('推荐模块重新设计完成');
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
            return homeScreen;
        }
        
        // 方法2：通过标题查找
        const screens = document.querySelectorAll('.screen');
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            
            // 查找包含特定元素的屏幕
            if (screen.innerHTML.includes('Home') && 
                (screen.innerHTML.includes('Today\'s Recommendation') || 
                 screen.innerHTML.includes('Recommendations for you'))) {
                return screen;
            }
            
            // 通过底部导航找到Home页面
            const activeHomeNav = screen.querySelector('.nav-text.active');
            if (activeHomeNav && activeHomeNav.textContent.trim() === 'Home') {
                return screen;
            }
        }
        
        // 方法3：查找当前显示的屏幕
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            if (getComputedStyle(screen).display !== 'none') {
                // 如果这是当前显示的第三个屏幕，很可能是Home页面
                if (i === 2) {
                    return screen;
                }
            }
        }
        
        return null;
    }
    
    /**
     * 查找推荐模块部分
     * @param {HTMLElement} homeScreen - Home页面元素
     * @returns {HTMLElement|null} 推荐模块元素或null
     */
    function findRecommendationsSection(homeScreen) {
        // 尝试通过标题文本查找
        const headings = homeScreen.querySelectorAll('h2');
        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];
            if (heading.textContent.includes('Recommendation') || 
                heading.textContent.includes('推荐')) {
                // 返回包含标题的整个部分（通常是一个<div>）
                return heading.closest('div') || heading.parentElement;
            }
        }
        
        // 尝试通过内容特征查找
        const possibleSections = homeScreen.querySelectorAll('.scrollable-content > div > div');
        for (let i = 0; i < possibleSections.length; i++) {
            const section = possibleSections[i];
            
            // 查找包含推荐卡片特征的部分
            if (section.innerHTML.includes('Today\'s Recommendation') || 
                section.innerHTML.includes('Recommendations for you')) {
                return section;
            }
        }
        
        return null;
    }
    
    /**
     * 提取原始标题部分
     * @param {HTMLElement} recommendationsSection - 推荐模块元素
     * @returns {HTMLElement} 标题部分元素
     */
    function extractTitleSection(recommendationsSection) {
        // 查找标题元素
        const heading = recommendationsSection.querySelector('h2');
        if (!heading) {
            // 如果没有找到标题，创建一个新的
            const newTitleSection = document.createElement('div');
            newTitleSection.className = 'flex justify-between items-center mb-4';
            
            const title = document.createElement('h2');
            title.className = 'text-lg font-semibold text-gray-800';
            title.textContent = 'Recommendations for you';
            
            const viewMore = document.createElement('a');
            viewMore.href = '#';
            viewMore.className = 'text-sm text-[#FFBE98]';
            viewMore.textContent = 'View more';
            
            newTitleSection.appendChild(title);
            newTitleSection.appendChild(viewMore);
            
            return newTitleSection;
        }
        
        // 返回标题所在的容器元素
        return heading.parentElement;
    }
    
    /**
     * 创建新的推荐模块
     * @param {HTMLElement} titleSection - 标题部分元素
     * @returns {HTMLElement} 新的推荐模块元素
     */
    function createNewRecommendationsModule(titleSection) {
        // 创建容器
        const container = document.createElement('div');
        container.className = 'mb-6 recommendations-redesigned';
        
        // 复制标题部分
        container.appendChild(titleSection.cloneNode(true));
        
        // 创建卡片容器，垂直布局
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'space-y-4';
        
        // 添加推荐卡片
        cardsContainer.appendChild(createRecommendationCard(
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            '营养学知识',
            'Why Mediterranean Diet is Perfect for Pre-diabetic Conditions',
            '基于您的饮食记录，地中海饮食可能适合您的健康状况'
        ));
        
        cardsContainer.appendChild(createRecommendationCard(
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            '社区热门',
            'My 30-Day Journey with Low-Carb Meals: Before & After Results',
            '3.2k 用户浏览了这篇文章，与您的饮食偏好相似'
        ));
        
        cardsContainer.appendChild(createRecommendationCard(
            'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            '健康指南',
            'Simple Glucose-Friendly Snacks for Your Busy Workdays',
            '根据您的日程安排和血糖波动情况推荐'
        ));
        
        container.appendChild(cardsContainer);
        
        return container;
    }
    
    /**
     * 创建推荐卡片
     * @param {string} imageUrl - 图片URL
     * @param {string} category - 分类
     * @param {string} title - 标题
     * @param {string} description - 描述
     * @returns {HTMLElement} 推荐卡片元素
     */
    function createRecommendationCard(imageUrl, category, title, description) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:shadow-md hover:scale-[1.01] cursor-pointer';
        
        // 图片容器，保持4:3比例
        const imageContainer = document.createElement('div');
        imageContainer.className = 'relative pb-[75%] overflow-hidden';  // 4:3比例 = 75%
        
        // 图片
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = title;
        image.className = 'absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105';
        
        imageContainer.appendChild(image);
        
        // 内容容器
        const contentContainer = document.createElement('div');
        contentContainer.className = 'p-4';
        
        // 分类标签
        const categoryElement = document.createElement('div');
        categoryElement.className = 'inline-block px-2 py-1 bg-[#FFBE98]/10 text-[#FFBE98] text-xs font-medium rounded-full mb-2';
        categoryElement.textContent = category;
        
        // 标题
        const titleElement = document.createElement('h3');
        titleElement.className = 'text-base font-medium text-gray-800 mb-1 line-clamp-2';
        titleElement.textContent = title;
        
        // 描述
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'text-xs text-gray-500 line-clamp-2';
        descriptionElement.textContent = description;
        
        // 组合内容
        contentContainer.appendChild(categoryElement);
        contentContainer.appendChild(titleElement);
        contentContainer.appendChild(descriptionElement);
        
        // 组合卡片
        card.appendChild(imageContainer);
        card.appendChild(contentContainer);
        
        // 添加点击事件
        card.addEventListener('click', function() {
            console.log(`推荐卡片点击: ${title}`);
            // 这里可以添加跳转到详情的逻辑
        });
        
        return card;
    }
    
    /**
     * 替换旧的推荐模块
     * @param {HTMLElement} oldModule - 旧的推荐模块元素
     * @param {HTMLElement} newModule - 新的推荐模块元素
     */
    function replaceRecommendationsModule(oldModule, newModule) {
        if (oldModule && oldModule.parentNode) {
            oldModule.parentNode.replaceChild(newModule, oldModule);
        }
    }
})(); 
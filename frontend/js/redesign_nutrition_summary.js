/**
 * @description 产品化重新设计Log界面的营养模块
 * @author 高级iOS工程师
 * @version 2.3.0
 */
(function() {
    console.log('营养模块重新设计脚本已加载');
    
    // 避免重复应用
    let hasApplied = false;

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备重新设计营养模块');
        
        // 给页面加载一些时间
        setTimeout(redesignNutritionModule, 500);
        
        // 设置MutationObserver监听DOM变化，但限制重新设计的频率
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
                    redesignNutritionModule();
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
     * 重新设计营养模块
     */
    function redesignNutritionModule() {
        // 防止重复应用
        if (hasApplied) {
            console.log('已经应用过设计，跳过');
            return;
        }
        
        console.log('尝试重新设计营养模块');
        
        // 尝试多种选择器定位Nutrition Summary模块
        let nutritionSummaryModule = null;
        
        // 首先尝试通过文本内容查找
        const allH2Elements = document.querySelectorAll('h2');
        for (let i = 0; i < allH2Elements.length; i++) {
            if (allH2Elements[i].textContent.trim() === 'Nutrition Summary') {
                nutritionSummaryModule = allH2Elements[i].closest('.bg-white.rounded-xl.shadow-sm.border.border-gray-100.p-4.mb-6');
                if (nutritionSummaryModule) {
                    console.log('通过h2文本内容找到Nutrition Summary模块');
                    break;
                }
            }
        }
        
        // 如果第一种方法失败，尝试通过位置定位
        if (!nutritionSummaryModule) {
            // 查找所有日志页面
            const logScreens = document.querySelectorAll('.screen');
            
            for (let i = 0; i < logScreens.length; i++) {
                const screen = logScreens[i];
                // 找出可见的日志页面
                if (getComputedStyle(screen).display !== 'none') {
                    // 在可见页面中查找所有卡片
                    const cards = screen.querySelectorAll('.bg-white.rounded-xl.shadow-sm.border.border-gray-100.p-4.mb-6');
                    
                    // 通常第一个卡片是Nutrition Summary
                    if (cards.length > 0) {
                        const card = cards[0];
                        if (card.querySelector('h2') && card.querySelector('h2').textContent.trim() === 'Nutrition Summary') {
                            nutritionSummaryModule = card;
                            console.log('通过位置找到Nutrition Summary模块');
                            break;
                        }
                    }
                }
            }
        }
        
        // 如果找到了模块，进行重新设计
        if (nutritionSummaryModule) {
            console.log('找到营养模块，准备重新设计');
            
            // 检查是否已经重新设计过
            if (nutritionSummaryModule.querySelector('.nutrition-redesigned')) {
                console.log('模块已经重新设计过，跳过');
                return;
            }
            
            // 保存原有内容，以便在出错时恢复
            const originalContent = nutritionSummaryModule.innerHTML;
            
            try {
                // 获取父容器
                const parentContainer = nutritionSummaryModule.parentNode;
                if (!parentContainer) {
                    console.log('未找到父容器');
                    return;
                }
                
                // 创建新的无卡片结构的容器
                const newContainer = document.createElement('div');
                newContainer.className = 'mb-6 nutrition-redesigned-container';
                
                // 添加重新设计的内容 - 不再传递标题文本
                addRedesignedContent(newContainer);
                
                // 替换原有模块
                parentContainer.replaceChild(newContainer, nutritionSummaryModule);
                
                // 标记为已应用
                hasApplied = true;
                
                console.log('营养模块重新设计完成');
            } catch (error) {
                console.error('重新设计过程中出错:', error);
                
                // 恢复原有内容
                if (nutritionSummaryModule.parentNode) {
                    nutritionSummaryModule.innerHTML = originalContent;
                }
            }
        } else {
            console.log('未找到营养模块');
        }
    }
    
    /**
     * 添加重新设计的内容
     * @param {HTMLElement} container - 要添加内容的容器元素
     */
    function addRedesignedContent(container) {
        // 创建一个统一的模块卡片
        const unifiedCard = document.createElement('div');
        unifiedCard.className = 'bg-white rounded-xl shadow-sm border border-gray-100 p-4 nutrition-redesigned';
        
        // 创建卡片顶部区域（包含Calories Remaining标题和日期选择器）
        const cardHeader = document.createElement('div');
        cardHeader.className = 'flex justify-between items-center mb-3';
        
        // 创建图标和标题容器
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex items-center';
        
        // 创建图标容器
        const iconContainer = document.createElement('div');
        iconContainer.className = 'w-8 h-8 rounded-full flex items-center justify-center mr-2';
        iconContainer.style.backgroundColor = '#FFBE98' + '30'; // 30是透明度
        iconContainer.style.color = '#FFBE98';
        iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>`;
        
        // 创建标题文本
        const titleText = document.createElement('span');
        titleText.className = 'text-base font-medium text-gray-700';
        titleText.textContent = 'Calories Remaining';
        
        // 组合标题
        titleContainer.appendChild(iconContainer);
        titleContainer.appendChild(titleText);
        
        // 创建日期选择器
        const dateSelector = document.createElement('div');
        dateSelector.className = 'flex items-center text-sm text-gray-500 bg-gray-50 rounded-full px-3 py-1';
        
        // 创建日历图标
        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'mr-1';
        calendarIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>`;
        
        // 创建日期文本
        const dateText = document.createElement('span');
        dateText.textContent = 'Today';
        
        // 组合日期选择器
        dateSelector.appendChild(calendarIcon);
        dateSelector.appendChild(dateText);
        
        // 组合卡片顶部
        cardHeader.appendChild(titleContainer);
        cardHeader.appendChild(dateSelector);
        
        // 添加卡片顶部到卡片
        unifiedCard.appendChild(cardHeader);
        
        // 添加卡路里内容区域
        const caloriesContent = createCaloriesContent();
        unifiedCard.appendChild(caloriesContent);
        
        // 添加分隔线
        const divider = document.createElement('div');
        divider.className = 'w-full h-px bg-gray-100 my-4';
        unifiedCard.appendChild(divider);
        
        // 添加营养素详情区域
        const macronutrientsTitle = document.createElement('h3');
        macronutrientsTitle.className = 'font-medium text-base text-gray-700 mb-4';
        macronutrientsTitle.textContent = 'Macronutrients';
        unifiedCard.appendChild(macronutrientsTitle);
        
        // 添加不同的营养素进度条
        unifiedCard.appendChild(createNutrientProgressBar('Protein', '#006D77', 30, '23/77 g', 'Essential for muscle repair and growth'));
        unifiedCard.appendChild(createNutrientProgressBar('Carbs', '#83C5BE', 31, '53/171 g', 'Primary energy source for your body'));
        unifiedCard.appendChild(createNutrientProgressBar('Fats', '#EE6C4D', 45, '30/67 g', 'Helps vitamin absorption'));
        unifiedCard.appendChild(createNutrientProgressBar('Sugar', '#E29578', 26, '12/45 g', 'Limit intake for better health'));
        
        // 查看详情链接
        const viewMoreContainer = document.createElement('div');
        viewMoreContainer.className = 'w-full text-right mt-3';
        
        const viewMoreLink = document.createElement('a');
        viewMoreLink.className = 'text-xs text-orange-400';
        viewMoreLink.textContent = 'View Details';
        viewMoreLink.href = '#';
        
        viewMoreContainer.appendChild(viewMoreLink);
        unifiedCard.appendChild(viewMoreContainer);
        
        // 将统一卡片添加到外部容器
        container.appendChild(unifiedCard);
    }
    
    /**
     * 创建卡路里内容区域
     * @returns {HTMLElement} 卡路里内容容器
     */
    function createCaloriesContent() {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'flex items-center justify-between mt-2';
        
        // 创建左侧数值区域
        const leftContent = document.createElement('div');
        leftContent.className = 'flex flex-col';
        
        const remainingValue = document.createElement('div');
        remainingValue.className = 'text-3xl font-bold mb-1';
        remainingValue.style.color = '#FFBE98';
        remainingValue.textContent = '995';
        
        const remainingLabel = document.createElement('div');
        remainingLabel.className = 'text-xs text-gray-500';
        remainingLabel.textContent = 'You can still eat';
        
        leftContent.appendChild(remainingValue);
        leftContent.appendChild(remainingLabel);
        
        // 创建右侧目标区域
        const rightContent = document.createElement('div');
        rightContent.className = 'flex flex-col items-end';
        
        const goalValue = document.createElement('div');
        goalValue.className = 'text-xl font-semibold text-gray-700 mb-1';
        goalValue.textContent = '1,399';
        
        const goalLabel = document.createElement('div');
        goalLabel.className = 'text-xs text-gray-500';
        goalLabel.textContent = 'kcal daily goal';
        
        rightContent.appendChild(goalValue);
        rightContent.appendChild(goalLabel);
        
        // 组合内容区域
        contentContainer.appendChild(leftContent);
        contentContainer.appendChild(rightContent);
        
        // 创建进度条容器
        const progressContainer = document.createElement('div');
        progressContainer.className = 'w-full h-2 bg-gray-100 rounded-full mt-4';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full rounded-full';
        progressBar.style.width = '70%';
        progressBar.style.backgroundColor = '#FFBE98';
        
        // 组合进度条
        progressContainer.appendChild(progressBar);
        
        // 创建整体容器
        const wholeContainer = document.createElement('div');
        wholeContainer.appendChild(contentContainer);
        wholeContainer.appendChild(progressContainer);
        
        return wholeContainer;
    }
    
    /**
     * 创建单个营养素进度条
     * @param {string} name - 营养素名称
     * @param {string} color - 颜色
     * @param {number} percentage - 进度百分比
     * @param {string} value - 数值
     * @param {string} description - 描述
     * @returns {HTMLElement} 营养素进度条元素
     */
    function createNutrientProgressBar(name, color, percentage, value, description) {
        const container = document.createElement('div');
        container.className = 'mb-3 last:mb-0';
        
        // 创建标题行
        const titleRow = document.createElement('div');
        titleRow.className = 'flex justify-between items-center mb-1';
        
        // 创建左侧标签
        const labelContainer = document.createElement('div');
        labelContainer.className = 'flex items-center';
        
        // 创建颜色指示器
        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'w-3 h-3 rounded-full mr-2';
        colorIndicator.style.backgroundColor = color;
        
        // 创建名称
        const nameElement = document.createElement('span');
        nameElement.className = 'text-sm font-medium text-gray-700';
        nameElement.textContent = name;
        
        // 组合左侧标签
        labelContainer.appendChild(colorIndicator);
        labelContainer.appendChild(nameElement);
        
        // 创建数值
        const valueElement = document.createElement('span');
        valueElement.className = 'text-xs text-gray-500';
        valueElement.textContent = value;
        
        // 组合标题行
        titleRow.appendChild(labelContainer);
        titleRow.appendChild(valueElement);
        
        // 创建进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'w-full h-2 bg-white rounded-full mb-1';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full rounded-full';
        progressBar.style.width = `${percentage}%`;
        progressBar.style.backgroundColor = color;
        
        // 组合进度条
        progressContainer.appendChild(progressBar);
        
        // 创建描述
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'text-xs text-gray-400';
        descriptionElement.textContent = description;
        
        // 组合元素
        container.appendChild(titleRow);
        container.appendChild(progressContainer);
        container.appendChild(descriptionElement);
        
        return container;
    }
})(); 
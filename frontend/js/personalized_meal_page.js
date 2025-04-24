/**
 * 个性化居家用餐界面
 * @description 提供个性化居家用餐体验，包括备餐计划和饮食方案
 */
(function() {
    // 页面加载完成后执行初始化
    document.addEventListener('DOMContentLoaded', initPersonalizedMealPage);
    
    /**
     * 初始化个性化居家用餐界面
     */
    function initPersonalizedMealPage() {
        // 延迟执行，确保DOM已完全加载
        setTimeout(() => {
            console.log('初始化个性化居家用餐界面');
            
            // 为备餐入口卡片添加点击事件
            const mealPrepCard = document.querySelector('.meal-prep-card');
            if (mealPrepCard) {
                mealPrepCard.addEventListener('click', openMealPrepPlan);
                console.log('备餐入口卡片事件已绑定');
            }
            
            // 为底部导航"Meals"按钮添加点击事件
            const mealNavItem = document.querySelector('.nav-icon + .nav-text:contains("Meals")').parentElement;
            if (mealNavItem) {
                mealNavItem.addEventListener('click', function() {
                    navigateToMealPage();
                });
                console.log('导航Meals按钮事件已绑定');
            }
            
            // 添加事件监听器
            addEventListeners();
            
            // 添加备餐卡片滑动隐藏功能
            addSwipeToHide();
        }, 500);
    }
    
    /**
     * 导航到个性化居家用餐界面
     */
    function navigateToMealPage() {
        // 隐藏所有屏幕
        const allScreens = document.querySelectorAll('.screen');
        allScreens.forEach(screen => {
            screen.style.display = 'none';
        });
        
        // 显示个性化居家用餐界面
        const mealScreen = document.querySelector('.screen[data-page="personalized-meal"]');
        if (mealScreen) {
            mealScreen.style.display = 'flex';
            console.log('已切换到个性化居家用餐界面');
            
            // 更新导航栏状态
            updateNavigation('personalized-meal');
        }
    }
    
    /**
     * 更新导航栏状态
     * @param {string} activePage - 当前活跃页面的标识
     */
    function updateNavigation(activePage) {
        // 移除所有导航项的活跃状态
        const allNavItems = document.querySelectorAll('.nav-icon, .nav-text');
        allNavItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 设置对应导航项的活跃状态
        const activeNavIcon = document.querySelector(`.screen[data-page="${activePage}"] .nav-icon + .nav-text:contains("Meals")`).previousElementSibling;
        const activeNavText = document.querySelector(`.screen[data-page="${activePage}"] .nav-icon + .nav-text:contains("Meals")`);
        
        if (activeNavIcon && activeNavText) {
            activeNavIcon.classList.add('active');
            activeNavText.classList.add('active');
        }
    }
    
    /**
     * 添加事件监听器
     */
    function addEventListeners() {
        // 为日期选择器添加点击事件
        const daySelectors = document.querySelectorAll('.day-selector');
        daySelectors.forEach(selector => {
            selector.addEventListener('click', function() {
                // 移除其他日期的选中状态
                daySelectors.forEach(item => {
                    const circle = item.querySelector('div');
                    circle.classList.remove('bg-primary', 'bg-opacity-20');
                    circle.classList.add('bg-gray-100');
                    const dayText = item.querySelector('div span');
                    dayText.classList.remove('text-primary', 'font-medium');
                });
                
                // 设置当前选中的日期
                const circle = this.querySelector('div');
                circle.classList.remove('bg-gray-100');
                circle.classList.add('bg-primary', 'bg-opacity-20');
                const dayText = this.querySelector('div span');
                dayText.classList.add('text-primary', 'font-medium');
            });
        });
        
        // 为查看全部按钮添加点击事件
        const viewAllBtn = document.querySelector('.weekly-overview button');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', function() {
                alert('View all weekly meal plans');
            });
        }
    }
    
    /**
     * 添加卡片滑动隐藏功能
     */
    function addSwipeToHide() {
        const card = document.querySelector('.meal-prep-card');
        if (!card) return;
        
        let startY = 0;
        let isDragging = false;
        
        card.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
        });
        
        card.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // 只允许向下滑动隐藏
            if (diff > 0) {
                card.style.transform = `translateY(${diff}px)`;
                card.style.opacity = 1 - (diff / 200);
            }
        });
        
        card.addEventListener('touchend', (e) => {
            isDragging = false;
            
            // 如果滑动距离足够大，则隐藏卡片
            const currentY = e.changedTouches[0].clientY;
            const diff = currentY - startY;
            
            if (diff > 100) {
                card.style.transform = 'translateY(200px)';
                card.style.opacity = '0';
                
                // 动画结束后真正隐藏
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
                
                // 存储状态，当天不再显示
                localStorage.setItem('mealPrepCardHidden', new Date().toDateString());
            } else {
                // 恢复原位
                card.style.transform = '';
                card.style.opacity = '';
            }
        });
    }
    
    /**
     * 打开备餐计划页面
     */
    function openMealPrepPlan() {
        console.log('打开备餐计划页面');
        
        // 创建全屏备餐计划界面
        const mealPrepPlan = document.createElement('div');
        mealPrepPlan.className = 'meal-prep-plan fixed inset-0 bg-white z-50 flex flex-col';
        mealPrepPlan.id = 'meal-prep-plan';
        
        // 标题栏
        const header = document.createElement('div');
        header.className = 'meal-prep-header flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10';
        
        // 返回按钮
        const backButton = document.createElement('button');
        backButton.className = 'back-button p-1';
        backButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        `;
        backButton.addEventListener('click', () => {
            // 关闭备餐计划页面
            document.body.removeChild(mealPrepPlan);
        });
        
        // 标题
        const title = document.createElement('h2');
        title.className = 'text-lg font-semibold text-gray-800';
        title.textContent = 'Weekly Meal Prep';
        
        header.appendChild(backButton);
        header.appendChild(title);
        header.appendChild(document.createElement('div')); // 占位元素，保持标题居中
        
        // 内容区域
        const content = document.createElement('div');
        content.className = 'meal-prep-content flex-1 overflow-y-auto p-4';
        
        // 添加备餐内容
        content.innerHTML = `
            <div class="progress-section mb-6">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-base font-medium text-gray-800">Progress</h3>
                    <span class="text-sm text-primary">35% Complete</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full" style="width: 35%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Deadline: Today at 6:00 PM</p>
            </div>
            
            <div class="tasks-section mb-6">
                <h3 class="text-base font-medium text-gray-800 mb-3">Prep Tasks</h3>
                
                <div class="task-item p-3 bg-white rounded-lg shadow-sm mb-3 border border-gray-100">
                    <div class="flex items-start">
                        <input type="checkbox" class="mt-1 mr-3" id="task1">
                        <div>
                            <label for="task1" class="block text-sm font-medium text-gray-800">Chop vegetables for the week</label>
                            <p class="text-xs text-gray-500 mt-1">Onions, bell peppers, carrots, celery</p>
                            <div class="efficiency-tip mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                                <span class="font-medium">Efficiency Tip:</span> Chop onions while boiling broth for soup
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="task-item p-3 bg-white rounded-lg shadow-sm mb-3 border border-gray-100">
                    <div class="flex items-start">
                        <input type="checkbox" class="mt-1 mr-3" id="task2">
                        <div>
                            <label for="task2" class="block text-sm font-medium text-gray-800">Cook chicken breasts</label>
                            <p class="text-xs text-gray-500 mt-1">For salads and curry dishes</p>
                            <div class="ingredient-reuse mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                                <span class="font-medium">Ingredient Reuse:</span> Use cooked chicken for both salad and curry
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="task-item p-3 bg-white rounded-lg shadow-sm mb-3 border border-gray-100">
                    <div class="flex items-start">
                        <input type="checkbox" class="mt-1 mr-3" id="task3" checked>
                        <div>
                            <label for="task3" class="block text-sm font-medium text-gray-800 line-through">Prepare quinoa</label>
                            <p class="text-xs text-gray-500 mt-1 line-through">For lunch bowls and dinner sides</p>
                        </div>
                    </div>
                </div>
                
                <div class="task-item p-3 bg-white rounded-lg shadow-sm mb-3 border border-gray-100">
                    <div class="flex items-start">
                        <input type="checkbox" class="mt-1 mr-3" id="task4">
                        <div>
                            <label for="task4" class="block text-sm font-medium text-gray-800">Bake salmon fillets</label>
                            <p class="text-xs text-gray-500 mt-1">For Sunday and Monday dinner</p>
                            <div class="equipment-status mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                                <span class="font-medium">Equipment Conflict:</span> Oven will be in use from 4-5 PM for baking
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="meal-kits-section">
                <h3 class="text-base font-medium text-gray-800 mb-3">Meal Kits</h3>
                
                <div class="grid grid-cols-2 gap-3">
                    <div class="meal-kit p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                        <h4 class="text-sm font-medium text-gray-800">Monday</h4>
                        <p class="text-xs text-gray-500 mt-1">Chicken Curry with Rice</p>
                        <div class="mt-2 flex justify-between items-center">
                            <span class="text-xs text-primary">Ready to prep</span>
                            <button class="bg-primary text-white text-xs py-1 px-2 rounded">View</button>
                        </div>
                    </div>
                    
                    <div class="meal-kit p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                        <h4 class="text-sm font-medium text-gray-800">Tuesday</h4>
                        <p class="text-xs text-gray-500 mt-1">Veggie Pasta Bake</p>
                        <div class="mt-2 flex justify-between items-center">
                            <span class="text-xs text-primary">Ready to prep</span>
                            <button class="bg-primary text-white text-xs py-1 px-2 rounded">View</button>
                        </div>
                    </div>
                    
                    <div class="meal-kit p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                        <h4 class="text-sm font-medium text-gray-800">Wednesday</h4>
                        <p class="text-xs text-gray-500 mt-1">Quinoa Bowl with Chicken</p>
                        <div class="mt-2 flex justify-between items-center">
                            <span class="text-xs text-gray-400">Needs ingredients</span>
                            <button class="bg-gray-200 text-gray-600 text-xs py-1 px-2 rounded">View</button>
                        </div>
                    </div>
                    
                    <div class="meal-kit p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                        <h4 class="text-sm font-medium text-gray-800">Thursday</h4>
                        <p class="text-xs text-gray-500 mt-1">Salmon with Sweet Potato</p>
                        <div class="mt-2 flex justify-between items-center">
                            <span class="text-xs text-gray-400">Needs ingredients</span>
                            <button class="bg-gray-200 text-gray-600 text-xs py-1 px-2 rounded">View</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        mealPrepPlan.appendChild(header);
        mealPrepPlan.appendChild(content);
        
        // 添加到body
        document.body.appendChild(mealPrepPlan);
        
        // 添加备餐任务复选框事件
        addTaskCheckboxEvents(mealPrepPlan);
        
        // 添加动画效果
        setTimeout(() => {
            mealPrepPlan.classList.add('show');
        }, 10);
    }
    
    /**
     * 添加备餐任务复选框事件
     * @param {HTMLElement} container - 包含复选框的容器元素
     */
    function addTaskCheckboxEvents(container) {
        const checkboxes = container.querySelectorAll('.task-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const label = this.closest('.task-item').querySelector('label');
                const description = this.closest('.task-item').querySelector('p');
                
                if (this.checked) {
                    label.classList.add('line-through');
                    description.classList.add('line-through');
                } else {
                    label.classList.remove('line-through');
                    description.classList.remove('line-through');
                }
                
                // 更新进度条
                updateProgressBar(container);
            });
        });
    }
    
    /**
     * 更新进度条
     * @param {HTMLElement} container - 包含进度条的容器元素
     */
    function updateProgressBar(container) {
        // 获取当前进度
        const totalTasks = container.querySelectorAll('.task-item').length;
        const completedTasks = container.querySelectorAll('.task-item input:checked').length;
        
        if (totalTasks === 0) return;
        
        const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
        
        // 更新进度条和文本
        const progressBar = container.querySelector('.progress-section .bg-primary');
        const progressText = container.querySelector('.progress-section .text-primary');
        
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${progressPercentage}% Complete`;
        }
    }
    
    // 扩展功能：添加contains选择器支持
    if (!Element.prototype.querySelectorAll) {
        document.querySelectorAll = Element.prototype.querySelectorAll;
    }
    
    if (!Element.prototype.querySelector) {
        Element.prototype.querySelector = function(query) {
            return this.querySelectorAll(query)[0] || null;
        };
    }
    
    Element.prototype.querySelector = (function(querySelector) {
        return function(selector) {
            if (selector.includes(':contains(')) {
                const textToFind = selector.match(/:contains\(["']?([^)"']+)["']?\)/)[1];
                const elements = Array.from(this.querySelectorAll('*'));
                for (const element of elements) {
                    if (element.textContent.includes(textToFind)) {
                        return element;
                    }
                }
                return null;
            }
            return querySelector.call(this, selector);
        };
    })(Element.prototype.querySelector);
    
    // 暴露导航函数到全局，方便其他脚本调用
    window.navigateToMealPage = navigateToMealPage;
})(); 
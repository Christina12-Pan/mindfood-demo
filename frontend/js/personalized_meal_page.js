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
            // 创建新的独立界面
            createPersonalizedMealScreen();
            
            // 添加事件监听器
            addEventListeners();
            
            console.log('成功创建个性化居家用餐界面');
        }, 500);
    }
    
    /**
     * 创建个性化居家用餐界面
     */
    function createPersonalizedMealScreen() {
        // 创建新的屏幕容器
        const screen = document.createElement('div');
        screen.className = 'screen bg-white flex flex-col';
        screen.setAttribute('data-page', 'personalized-meal');
        screen.style.display = 'none'; // 默认隐藏
        
        // 添加iOS状态栏
        const statusBar = document.createElement('div');
        statusBar.className = 'ios-status-bar bg-white flex justify-between items-center px-6';
        statusBar.innerHTML = `
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
        `;
        
        // 创建可滚动内容区域
        const scrollableContent = document.createElement('div');
        scrollableContent.className = 'scrollable-content flex-1 overflow-y-auto';
        
        // 添加个性化居家用餐区域
        scrollableContent.appendChild(createPersonalizedMealSection());
        
        // 添加底部导航栏
        const navBottom = document.createElement('div');
        navBottom.className = 'nav-bottom glassmorphism';
        navBottom.innerHTML = `
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
        
        // 组装屏幕
        screen.appendChild(statusBar);
        screen.appendChild(scrollableContent);
        screen.appendChild(navBottom);
        
        // 添加到body
        document.body.appendChild(screen);
        
        // 添加导航事件
        addNavEvents(navBottom);
    }
    
    /**
     * 添加导航事件
     * @param {HTMLElement} navBottom 底部导航栏
     */
    function addNavEvents(navBottom) {
        const navItems = navBottom.querySelectorAll('[data-page]');
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                
                // 隐藏所有屏幕
                document.querySelectorAll('.screen').forEach(screen => {
                    screen.style.display = 'none';
                });
                
                // 显示目标屏幕
                const targetScreen = document.querySelector(`.screen[data-page="${page}"]`);
                if (targetScreen) {
                    targetScreen.style.display = 'flex';
                }
                
                // 更新导航栏激活状态
                navItems.forEach(navItem => {
                    const navIcon = navItem.querySelector('.nav-icon');
                    const navText = navItem.querySelector('.nav-text');
                    
                    if (navItem.getAttribute('data-page') === page) {
                        navIcon.classList.add('active');
                        navText.classList.add('active');
                    } else {
                        navIcon.classList.remove('active');
                        navText.classList.remove('active');
                    }
                });
            });
        });
    }
    
    /**
     * 创建个性化居家用餐区域
     * @returns {HTMLElement} 个性化居家用餐区域元素
     */
    function createPersonalizedMealSection() {
        const section = document.createElement('div');
        section.className = 'personalized-meal-section my-4 px-4';
        
        // 1. 备餐计划入口卡片
        section.appendChild(createMealPrepCard());
        
        // 2. 当日饮食计划区域
        section.appendChild(createDailyMealPlanSection());
        
        return section;
    }
    
    /**
     * 创建备餐入口卡片
     * @returns {HTMLElement} 备餐入口卡片元素
     */
    function createMealPrepCard() {
        const card = document.createElement('div');
        card.className = 'meal-prep-card rounded-xl shadow-lg overflow-hidden my-4 cursor-pointer relative';
        card.id = 'meal-prep-card';
        
        // 设置渐变背景
        card.style.background = 'linear-gradient(135deg, #FFBE98 0%, #FFA87D 100%)';
        
        // 内容容器
        const contentContainer = document.createElement('div');
        contentContainer.className = 'relative p-4 z-10';
        
        // 标题和图标
        const titleRow = document.createElement('div');
        titleRow.className = 'flex items-center justify-between mb-2';
        
        const title = document.createElement('h3');
        title.className = 'text-white font-semibold text-lg';
        title.textContent = 'Weekly Meal Prep';
        
        const icon = document.createElement('div');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>`;
        
        titleRow.appendChild(title);
        titleRow.appendChild(icon);
        contentContainer.appendChild(titleRow);
        
        // 号召性文字
        const callToAction = document.createElement('p');
        callToAction.className = 'text-white text-sm mb-4';
        callToAction.textContent = 'Start your weekly meal prep now';
        contentContainer.appendChild(callToAction);
        
        // 进度条容器
        const progressContainer = document.createElement('div');
        progressContainer.className = 'relative h-2 bg-white bg-opacity-30 rounded-full overflow-hidden';
        
        // 进度条
        const progressBar = document.createElement('div');
        progressBar.className = 'absolute top-0 left-0 h-full bg-white';
        progressBar.style.width = '35%'; // 设置进度
        progressBar.style.transition = 'width 1s ease-in-out';
        
        progressContainer.appendChild(progressBar);
        contentContainer.appendChild(progressContainer);
        
        // 倒计时文字
        const countdown = document.createElement('p');
        countdown.className = 'text-white text-xs mt-2 text-right';
        countdown.textContent = 'Deadline: 6:00 PM Today';
        contentContainer.appendChild(countdown);
        
        card.appendChild(contentContainer);
        
        // 添加点击事件
        card.addEventListener('click', openMealPrepPlan);
        
        // 添加滑动隐藏功能
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
        
        return card;
    }
    
    /**
     * 创建当日饮食计划区域
     * @returns {HTMLElement} 当日饮食计划区域元素
     */
    function createDailyMealPlanSection() {
        const section = document.createElement('div');
        section.className = 'daily-meal-plan mt-6';
        
        // 标题
        const title = document.createElement('h3');
        title.className = 'text-lg font-semibold text-gray-800 mb-3';
        title.textContent = 'Sunday Meal Plan';
        section.appendChild(title);
        
        // 餐食列表
        const mealItems = [
            {
                time: 'Breakfast',
                title: 'Greek Yogurt Bowl',
                desc: 'Greek yogurt with honey, nuts and berries',
                image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                nutrition: {
                    calories: 320,
                    protein: 18,
                    carbs: 42,
                    fat: 9
                }
            },
            {
                time: 'Lunch',
                title: 'Quinoa Salad',
                desc: 'Quinoa with roasted vegetables and chicken',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                nutrition: {
                    calories: 450,
                    protein: 28,
                    carbs: 52,
                    fat: 12
                }
            },
            {
                time: 'Dinner',
                title: 'Baked Salmon',
                desc: 'Salmon with asparagus and sweet potato',
                image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                nutrition: {
                    calories: 520,
                    protein: 38,
                    carbs: 30,
                    fat: 24
                }
            }
        ];
        
        // 创建餐食卡片
        mealItems.forEach(meal => {
            section.appendChild(createMealCard(meal));
        });
        
        return section;
    }
    
    /**
     * 创建餐食卡片
     * @param {Object} meal 餐食信息
     * @returns {HTMLElement} 餐食卡片元素
     */
    function createMealCard(meal) {
        const card = document.createElement('div');
        card.className = 'meal-card bg-white rounded-xl shadow-md overflow-hidden mb-4 flex';
        
        // 图片区域
        const imageContainer = document.createElement('div');
        imageContainer.className = 'meal-image-container w-1/3 h-24 overflow-hidden';
        
        const image = document.createElement('img');
        image.className = 'w-full h-full object-cover';
        image.src = meal.image;
        image.alt = meal.title;
        imageContainer.appendChild(image);
        
        // 内容区域
        const content = document.createElement('div');
        content.className = 'meal-content p-3 flex-1';
        
        // 时间标签
        const timeLabel = document.createElement('span');
        timeLabel.className = 'time-label inline-block text-xs bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full mb-1';
        timeLabel.textContent = meal.time;
        content.appendChild(timeLabel);
        
        // 标题
        const title = document.createElement('h4');
        title.className = 'text-base font-medium text-gray-800 leading-tight';
        title.textContent = meal.title;
        content.appendChild(title);
        
        // 描述
        const desc = document.createElement('p');
        desc.className = 'text-xs text-gray-600 mt-1';
        desc.textContent = meal.desc;
        content.appendChild(desc);
        
        // 营养素信息
        const nutrition = document.createElement('div');
        nutrition.className = 'nutrition-info flex items-center mt-2 text-xs text-gray-500';
        
        nutrition.innerHTML = `
            <span class="mr-2">${meal.nutrition.calories} cal</span>
            <span class="mr-2">${meal.nutrition.protein}g protein</span>
            <span>${meal.nutrition.carbs}g carbs</span>
        `;
        
        content.appendChild(nutrition);
        
        card.appendChild(imageContainer);
        card.appendChild(content);
        
        return card;
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
        
        // 显示动画
        setTimeout(() => {
            mealPrepPlan.classList.add('show');
        }, 10);
    }
    
    /**
     * 添加事件监听器
     */
    function addEventListeners() {
        // 检查卡片是否应该隐藏（当天已经隐藏）
        const hiddenDate = localStorage.getItem('mealPrepCardHidden');
        if (hiddenDate === new Date().toDateString()) {
            const card = document.getElementById('meal-prep-card');
            if (card) card.style.display = 'none';
        }
        
        // 为备餐任务复选框添加事件
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
                const label = e.target.closest('.task-item').querySelector('label');
                const description = e.target.closest('.task-item').querySelector('p');
                
                if (e.target.checked) {
                    label.classList.add('line-through');
                    description.classList.add('line-through');
                } else {
                    label.classList.remove('line-through');
                    description.classList.remove('line-through');
                }
                
                // 更新进度条
                updateProgressBar();
            }
        });
    }
    
    /**
     * 更新进度条
     */
    function updateProgressBar() {
        // 获取当前进度
        const totalTasks = document.querySelectorAll('.task-item').length;
        const completedTasks = document.querySelectorAll('.task-item input:checked').length;
        
        if (totalTasks === 0) return;
        
        const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
        
        // 更新所有进度条
        const progressBars = document.querySelectorAll('.progress-section .bg-primary');
        const progressTexts = document.querySelectorAll('.progress-section .text-primary');
        
        progressBars.forEach(bar => {
            bar.style.width = `${progressPercentage}%`;
        });
        
        progressTexts.forEach(text => {
            text.textContent = `${progressPercentage}% Complete`;
        });
    }
    
    // 暴露一个全局函数，用于从其他页面导航到个性化居家用餐界面
    window.showPersonalizedMealPage = function() {
        // 隐藏所有屏幕
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
        
        // 显示个性化居家用餐界面
        const personalizedMealScreen = document.querySelector('.screen[data-page="personalized-meal"]');
        if (personalizedMealScreen) {
            personalizedMealScreen.style.display = 'flex';
            
            // 更新导航栏激活状态
            const navItems = document.querySelectorAll('.nav-bottom [data-page]');
            navItems.forEach(navItem => {
                const navIcon = navItem.querySelector('.nav-icon');
                const navText = navItem.querySelector('.nav-text');
                
                if (navItem.getAttribute('data-page') === 'personalized-meal') {
                    navIcon.classList.add('active');
                    navText.classList.add('active');
                } else {
                    navIcon.classList.remove('active');
                    navText.classList.remove('active');
                }
            });
        }
    };
})(); 
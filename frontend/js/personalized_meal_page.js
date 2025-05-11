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
            // 创建个性化居家用餐界面
            createPersonalizedMealScreen();
            
            // 创建Weekly Meal Prep界面
            createWeeklyMealPrepScreen();
            
            console.log('成功创建个性化居家用餐界面和Weekly Meal Prep界面');
        }, 500);
    }
    
    /**
     * 创建个性化居家用餐界面
     */
    function createPersonalizedMealScreen() {
        // 创建屏幕容器
        const screen = document.createElement('div');
        screen.className = 'screen bg-white flex flex-col';
        screen.setAttribute('data-page', 'personalized-meal');
        
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
        screen.appendChild(statusBar);
        
        // 添加标题栏
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between p-4 border-b border-gray-200';
        header.innerHTML = `
            <h1 class="text-xl font-semibold text-gray-800">Personalized Meal</h1>
            <button class="p-2 rounded-full hover:bg-gray-100" onclick="showScreen('home')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
        `;
        screen.appendChild(header);
        
        // 添加可滚动内容区域
        const scrollableContent = document.createElement('div');
        scrollableContent.className = 'scrollable-content flex-1 overflow-y-auto p-4';
        
        // 添加备餐入口卡片
        scrollableContent.appendChild(createMealPrepCard());
        
        // 添加当日饮食计划区域
        scrollableContent.appendChild(createDailyMealPlanSection());
        
        screen.appendChild(scrollableContent);
        
        // 添加底部导航栏
        const navBottom = document.createElement('div');
        navBottom.className = 'nav-bottom glassmorphism';
        navBottom.innerHTML = `
            <div class="bg-white border-t border-gray-200 px-6 py-2">
                <div class="flex justify-between items-center">
                    <div class="flex flex-col items-center" onclick="showScreen('home')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="nav-text">Home</span>
                    </div>
                    <div class="flex flex-col items-center" onclick="showScreen('log')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="nav-text">Logs</span>
                    </div>
                    <div class="flex flex-col items-center relative" onclick="showScreen('dish-recognition')">
                        <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center -mt-5 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span class="nav-text">Scan</span>
                    </div>
                    <div class="flex flex-col items-center" onclick="showScreen('community')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="nav-text">Community</span>
                    </div>
                    <div class="flex flex-col items-center" onclick="showScreen('personalized-meal')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon active" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span class="nav-text active">Profile</span>
                    </div>
                </div>
            </div>
            <div class="ios-home-indicator"></div>
        `;
        screen.appendChild(navBottom);
        
        // 添加到body
        document.body.appendChild(screen);
        
        // 添加导航事件
        addNavItemClickEvents(navBottom);
        
        // 添加任务复选框事件
        addTaskCheckboxEvents();
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
        card.addEventListener('click', () => {
            showScreen('weekly-meal-prep');
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
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex justify-between items-center mb-4';
        
        const titleContent = document.createElement('div');
        titleContent.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800">Sunday Meal Plan</h3>
            <p class="text-xs text-gray-500 mt-1">Today's ready-to-heat meal boxes</p>
        `;
        
        titleContainer.appendChild(titleContent);
        section.appendChild(titleContainer);
        
        // 午餐模块
        const lunchSection = document.createElement('div');
        lunchSection.className = 'mb-5';
        lunchSection.innerHTML = `
            <div class="flex items-center mb-3 justify-between">
                <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-700">Lunch</span>
                    <span class="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Ready to heat</span>
                </div>
                <button class="ml-2 px-3 py-1 text-xs font-medium text-primary bg-primary bg-opacity-10 rounded-full hover:bg-opacity-20 transition">Add to Log</button>
            </div>
            
            <div class="meal-box bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="flex">
                    <div class="w-1/3">
                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                             alt="Quinoa Bowl" 
                             class="w-full h-full object-cover">
                    </div>
                    <div class="w-2/3 p-4">
                        <h4 class="text-base font-medium text-gray-800">Quinoa Power Bowl</h4>
                        <div class="flex items-center mt-1 text-xs">
                            <span class="text-primary font-medium">Box #3</span>
                            <span class="mx-1 text-gray-400">•</span>
                            <span class="text-gray-500">Prepared on May 13</span>
                        </div>
                        
                        <div class="mt-3 space-y-1.5">
                            <div class="flex items-start">
                                <div class="w-14 text-xs font-medium text-gray-600">Main:</div>
                                <div class="text-xs text-gray-700 flex-1">Quinoa with roasted vegetables</div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-14 text-xs font-medium text-gray-600">Protein:</div>
                                <div class="text-xs text-gray-700 flex-1">Grilled chicken breast</div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-14 text-xs font-medium text-gray-600">Side:</div>
                                <div class="text-xs text-gray-700 flex-1">Cucumber & cherry tomato salad</div>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-xs text-gray-500">450 cal</span>
                            </div>
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-xs text-gray-500">Heat for 2 min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        section.appendChild(lunchSection);
        
        // 晚餐模块
        const dinnerSection = document.createElement('div');
        dinnerSection.className = 'mb-5';
        dinnerSection.innerHTML = `
            <div class="flex items-center mb-3 justify-between">
                <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-700">Dinner</span>
                    <span class="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Ready to heat</span>
                </div>
                <button class="ml-2 px-3 py-1 text-xs font-medium text-primary bg-primary bg-opacity-10 rounded-full hover:bg-opacity-20 transition">Add to Log</button>
            </div>
            
            <div class="meal-box bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="flex">
                    <div class="w-1/3">
                        <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                             alt="Salmon Dinner" 
                             class="w-full h-full object-cover">
                    </div>
                    <div class="w-2/3 p-4">
                        <h4 class="text-base font-medium text-gray-800">Baked Salmon Dinner</h4>
                        <div class="flex items-center mt-1 text-xs">
                            <span class="text-primary font-medium">Box #5</span>
                            <span class="mx-1 text-gray-400">•</span>
                            <span class="text-gray-500">Prepared on May 14</span>
                        </div>
                        
                        <div class="mt-3 space-y-1.5">
                            <div class="flex items-start">
                                <div class="w-14 text-xs font-medium text-gray-600">Main:</div>
                                <div class="text-xs text-gray-700 flex-1">Baked salmon with lemon herbs</div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-14 text-xs font-medium text-gray-600">Side 1:</div>
                                <div class="text-xs text-gray-700 flex-1">Roasted asparagus</div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-14 text-xs font-medium text-gray-600">Side 2:</div>
                                <div class="text-xs text-gray-700 flex-1">Garlic mashed sweet potato</div>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-xs text-gray-500">520 cal</span>
                            </div>
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-xs text-gray-500">Heat for 2.5 min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        section.appendChild(dinnerSection);
        
        // 营养信息小部件
        const nutritionWidget = document.createElement('div');
        nutritionWidget.className = 'bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-5';
        nutritionWidget.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h4 class="text-sm font-medium text-gray-800">Today's Nutrition Intake</h4>
                    <p class="text-xs text-gray-500 mt-0.5">46% of daily goal achieved</p>
                </div>
                <button class="text-xs text-primary font-medium px-2.5 py-1 bg-primary bg-opacity-10 rounded-full">View Details</button>
            </div>
            
            <div class="flex items-center"> <!-- 关键：加items-center实现垂直居中 -->
                <!-- Left: Calorie ring chart -->
                <div class="w-1/3 flex justify-center items-center"> <!-- 加items-center -->
                    <div class="relative w-24 h-24">
                        <!-- Calorie ring -->
                        <svg viewBox="0 0 36 36" class="w-24 h-24 transform -rotate-90">
                            <!-- Background ring -->
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="#E5E7EB" stroke-width="4" stroke-dasharray="100, 100"/>
                            <!-- Calorie progress 46% -->
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="#FFBE98" stroke-width="4" stroke-dasharray="46, 100"/>
                        </svg>
                        <!-- Center text -->
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span class="text-xs text-gray-500">Calories</span>
                            <span class="text-lg font-bold text-gray-800">970</span>
                            <span class="text-xs text-gray-400">/ 2100</span>
                        </div>
                    </div>
                </div>
                
                <!-- Right: Nutrition details (no calorie bar) -->
                <div class="w-2/3 pl-2">
                    <div class="space-y-3">
                        <!-- Protein -->
                        <div class="nutrition-item">
                            <div class="flex justify-between items-center mb-1">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span class="text-sm font-medium text-gray-700">Protein</span>
                                </div>
                                <div class="flex items-end">
                                    <span class="text-sm font-semibold text-gray-800">68</span>
                                    <span class="text-xs text-gray-500 ml-1">/ 120 g</span>
                                </div>
                            </div>
                            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full bg-blue-500 rounded-full" style="width: 56%"></div>
                            </div>
                        </div>
                        
                        <!-- Carbs -->
                        <div class="nutrition-item">
                            <div class="flex justify-between items-center mb-1">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    <span class="text-sm font-medium text-gray-700">Carbs</span>
                                </div>
                                <div class="flex items-end">
                                    <span class="text-sm font-semibold text-gray-800">85</span>
                                    <span class="text-xs text-gray-500 ml-1">/ 240 g</span>
                                </div>
                            </div>
                            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full bg-yellow-500 rounded-full" style="width: 35%"></div>
                            </div>
                        </div>
                        
                        <!-- Fat -->
                        <div class="nutrition-item">
                            <div class="flex justify-between items-center mb-1">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-sm font-medium text-gray-700">Fat</span>
                                </div>
                                <div class="flex items-end">
                                    <span class="text-sm font-semibold text-gray-800">32</span>
                                    <span class="text-xs text-gray-500 ml-1">/ 65 g</span>
                                </div>
                            </div>
                            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full bg-green-500 rounded-full" style="width: 49%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Health tip -->
            <div class="mt-3 pt-3 border-t border-gray-100">
                <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-xs text-gray-600">Your protein intake is on track today. Consider increasing your carb intake at dinner for optimal energy.</p>
                </div>
            </div>
        `;
        section.appendChild(nutritionWidget);
        
        return section;
    }
    
    /**
     * 为导航项添加点击事件
     * @param {HTMLElement} navBar - 导航栏元素
     */
    function addNavItemClickEvents(navBar) {
        // 使用showScreen函数来处理页面跳转，不再使用自定义的navigateToPage函数
        const navItems = navBar.querySelectorAll('[onclick^="showScreen"]');
        console.log(`找到 ${navItems.length} 个导航项`);
    }
    
    /**
     * 添加任务复选框事件
     */
    function addTaskCheckboxEvents() {
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
    
    /**
     * 创建Weekly Meal Prep界面
     */
    function createWeeklyMealPrepScreen() {
        // 创建屏幕容器
        const screen = document.createElement('div');
        screen.className = 'screen bg-white flex flex-col';
        screen.setAttribute('data-page', 'weekly-meal-prep');
        
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
        screen.appendChild(statusBar);
        
        // 添加标题栏
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between p-4 border-b border-gray-200';
        header.innerHTML = `
            <h1 class="text-xl font-semibold text-gray-800">Weekly Meal Prep</h1>
            <button class="p-2 rounded-full hover:bg-gray-100" onclick="showScreen('personalized-meal')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
        `;
        screen.appendChild(header);
        
        // 添加可滚动内容区域
        const scrollableContent = document.createElement('div');
        scrollableContent.className = 'scrollable-content flex-1 overflow-y-auto p-4';
        
        // 修改scrollableContent的内容
        scrollableContent.innerHTML = `
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
            
            <div class="recipes-section mb-6">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-base font-medium text-gray-800">Recipes to Cook</h3>
                    <button class="text-xs text-primary font-medium">View All</button>
                </div>
                
                <div class="grid grid-cols-1 gap-3">
                    <div class="recipe-card bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div class="relative">
                            <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                                 alt="Chicken Curry" 
                                 class="w-full h-40 object-cover">
                            <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-800">
                                45 min
                            </div>
                        </div>
                        <div class="p-3">
                            <h4 class="text-base font-medium text-gray-800">Chicken Curry</h4>
                            <p class="text-xs text-gray-500 mt-1">Using prepped chicken and vegetables</p>
                            <div class="mt-2 flex items-center text-xs text-gray-500">
                                <span class="mr-3">Prep: 15 min</span>
                                <span>Cook: 30 min</span>
                            </div>
                            <div class="mt-3 flex justify-between items-center">
                                <div class="flex items-center">
                                    <span class="text-xs text-primary font-medium mr-2">Ready to cook</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <button class="bg-primary text-white text-xs py-1 px-3 rounded-full">Start Cooking</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recipe-card bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div class="relative">
                            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                                 alt="Quinoa Bowl" 
                                 class="w-full h-40 object-cover">
                            <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-800">
                                20 min
                            </div>
                        </div>
                        <div class="p-3">
                            <h4 class="text-base font-medium text-gray-800">Quinoa Power Bowl</h4>
                            <p class="text-xs text-gray-500 mt-1">Using prepped quinoa and vegetables</p>
                            <div class="mt-2 flex items-center text-xs text-gray-500">
                                <span class="mr-3">Prep: 10 min</span>
                                <span>Cook: 10 min</span>
                            </div>
                            <div class="mt-3 flex justify-between items-center">
                                <div class="flex items-center">
                                    <span class="text-xs text-primary font-medium mr-2">Ready to cook</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <button class="bg-primary text-white text-xs py-1 px-3 rounded-full">Start Cooking</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        screen.appendChild(scrollableContent);
        
        // 添加底部导航栏
        const navBottom = document.createElement('div');
        navBottom.className = 'nav-bottom glassmorphism';
        navBottom.innerHTML = `
            <div class="bg-white border-t border-gray-200 px-6 py-2">
                <div class="flex justify-between items-center">
                    <div class="flex flex-col items-center" onclick="showScreen('home')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="nav-text">Home</span>
                    </div>
                    <div class="flex flex-col items-center" onclick="showScreen('log')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="nav-text">Logs</span>
                    </div>
                    <div class="flex flex-col items-center relative" onclick="showScreen('dish-recognition')">
                        <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center -mt-5 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span class="nav-text">Scan</span>
                    </div>
                    <div class="flex flex-col items-center" onclick="showScreen('community')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="nav-text">Community</span>
                    </div>
                    <div class="flex flex-col items-center" onclick="showScreen('personalized-meal')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon active" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span class="nav-text active">Profile</span>
                    </div>
                </div>
            </div>
            <div class="ios-home-indicator"></div>
        `;
        screen.appendChild(navBottom);
        
        // 添加到body
        document.body.appendChild(screen);
        
        // 添加导航事件
        addNavItemClickEvents(navBottom);
        
        // 添加任务复选框事件
        addTaskCheckboxEvents();
    }
    
    // 暴露函数到全局作用域
    window.showPersonalizedMealPage = function() {
        showScreen('personalized-meal');
    };
})(); 
/**
 * @description 动态生成菜单扫描和识别结果页面的HTML内容
 * @author Senior iOS Engineer
 * @version 1.0.0
 */
(function() {
    console.log('加载菜单页面生成脚本');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('开始生成菜单相关页面');
        
        // 生成菜单扫描页面
        generateScanPage();
        
        // 生成菜单识别结果页面
        generateMenuRecognitionPage();
        
        console.log('菜单相关页面生成完成');
    });
    
    /**
     * 生成菜单扫描页面的HTML内容
     */
    function generateScanPage() {
        console.log('正在生成菜单扫描页面');
        
        // 查找菜单扫描页面容器，如果不存在则创建
        let scanPage = document.querySelector('.screen[data-page="scan"]');
        if (!scanPage) {
            scanPage = document.createElement('div');
            scanPage.className = 'screen bg-white';
            scanPage.setAttribute('data-page', 'scan');
            document.body.appendChild(scanPage);
        }
        
        // 设置基本结构
        scanPage.innerHTML = `
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
            
            <!-- 空内容区域 - 新设计将通过JS完全动态创建 -->
            <div class="content-container flex-1"></div>
        `;
        
        console.log('菜单扫描页面生成完成');
    }
    
    /**
     * 生成菜单识别结果页面的HTML内容
     */
    function generateMenuRecognitionPage() {
        console.log('正在生成菜单识别结果页面');
        
        // 查找菜单识别结果页面容器，如果不存在则创建
        let menuRecognitionPage = document.querySelector('.screen[data-page="menu-recognition"]');
        if (!menuRecognitionPage) {
            menuRecognitionPage = document.createElement('div');
            menuRecognitionPage.className = 'screen bg-white';
            menuRecognitionPage.setAttribute('data-page', 'menu-recognition');
            document.body.appendChild(menuRecognitionPage);
        }
        
        // 设置菜单识别结果页面的HTML内容
        menuRecognitionPage.innerHTML = `
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
            
            <!-- 菜单识别内容 -->
            <div class="menu-recognition-container fade-in">
                <!-- 顶部导航栏 -->
                <div class="menu-recognition-header">
                    <div class="back-button" onclick="history.back()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    <div class="menu-recognition-title">Menu Result</div>
                    <div class="nutrition-summary-button" id="nutrition-summary-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="nutrition-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <div class="nutrition-badge">0</div>
                    </div>
                </div>
                
                <!-- 主要内容区域 -->
                <div class="menu-content">
                    <!-- 餐厅信息 -->
                    <div class="restaurant-info">
                        <div class="restaurant-header">
                            <div class="restaurant-image-info">
                                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" alt="Restaurant" class="restaurant-image">
                                <div class="restaurant-details">
                                    <div class="restaurant-name">Green Garden Restaurant</div>
                                    <div class="restaurant-type">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Mediterranean Cuisine
                                    </div>
                                    <div class="restaurant-rating">
                                        <div class="rating-stars">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="star-icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="star-icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="star-icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="star-icon" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="star-icon" viewBox="0 0 20 20" fill="currentColor" style="opacity: 0.4;">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <span class="rating-count">4.2 (256 reviews)</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="action-buttons-container">
                                <button class="health-combo-button" id="smart-order-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Healthy Combination
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 分类过滤器 -->
                    <div class="category-filter">
                        <div class="filter-scroll">
                            <button class="category-button active">All</button>
                            <button class="category-button">Main Dishes</button>
                            <button class="category-button">Sides</button>
                            <button class="category-button">Appetizers</button>
                            <button class="category-button">Desserts</button>
                            <button class="category-button">Drinks</button>
                        </div>
                    </div>
                    
                    <!-- 交互式菜品列表 -->
                    <div class="interactive-dishes-list">
                        <!-- 菜品1 -->
                        <div class="dish-item" data-dish-id="1" data-health="green" data-tags="low-carb,high-protein" data-category="main dishes">
                            <div class="health-indicator green">
                                <div class="indicator-icon green">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="14" height="14">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div class="dish-info-container">
                                <div class="dish-title">Mediterranean Grilled Salmon</div>
                                <div class="dish-description">Fresh salmon with lemon, garlic, olive oil and Mediterranean herbs</div>
                                <div class="suggestion-tags">
                                    <span class="suggestion-tag tag-high-protein">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        High Protein
                                    </span>
                                    <span class="suggestion-tag tag-low-protein">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Low Carb
                                    </span>
                                </div>
                            </div>
                            <div class="dish-checkbox-container">
                                <input type="checkbox" class="dish-checkbox" data-price="24.99" />
                            </div>
                        </div>
                        
                        <!-- 菜品2 -->
                        <div class="dish-item" data-dish-id="2" data-health="green" data-tags="gluten-free,low-cal" data-category="main dishes">
                            <div class="health-indicator green">
                                <div class="indicator-icon green">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="14" height="14">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div class="dish-info-container">
                                <div class="dish-title">Herb Grilled Shrimp</div>
                                <div class="dish-description">Succulent shrimp marinated with fresh herbs, garlic and lemon juice</div>
                                <div class="suggestion-tags">
                                    <span class="suggestion-tag tag-gluten-free">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Gluten Free
                                    </span>
                                    <span class="suggestion-tag tag-low-cal">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Low Calorie
                                    </span>
                                </div>
                            </div>
                            <div class="dish-checkbox-container">
                                <input type="checkbox" class="dish-checkbox" data-price="18.99" />
                            </div>
                        </div>
                        
                        <!-- 菜品3 -->
                        <div class="dish-item" data-dish-id="3" data-health="yellow" data-tags="vegetarian,dairy-free" data-category="main dishes">
                            <div class="health-indicator yellow">
                                <div class="indicator-icon yellow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="14" height="14">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="dish-info-container">
                                <div class="dish-title">Quinoa Buddha Bowl</div>
                                <div class="dish-description">Colorful bowl with quinoa, roasted vegetables, avocado and tahini dressing</div>
                                <div class="suggestion-tags">
                                    <span class="suggestion-tag tag-vegetarian">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Vegetarian
                                    </span>
                                    <span class="suggestion-tag tag-dairy-free">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Dairy Free
                                    </span>
                                </div>
                            </div>
                            <div class="dish-checkbox-container">
                                <input type="checkbox" class="dish-checkbox" data-price="16.50" />
                            </div>
                        </div>
                        
                        <!-- 菜品4 -->
                        <div class="dish-item" data-dish-id="4" data-health="red" data-tags="high-calorie,comfort-food" data-category="sides">
                            <div class="health-indicator red">
                                <div class="indicator-icon red">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="14" height="14">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            <div class="dish-info-container">
                                <div class="dish-title">Truffle Mac & Cheese</div>
                                <div class="dish-description">Creamy macaroni with four cheese blend and black truffle shavings</div>
                                <div class="suggestion-tags">
                                    <span class="suggestion-tag tag-high-calorie">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        High Calorie
                                    </span>
                                    <span class="suggestion-tag tag-comfort">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Comfort Food
                                    </span>
                                </div>
                            </div>
                            <div class="dish-checkbox-container">
                                <input type="checkbox" class="dish-checkbox" data-price="19.99" />
                            </div>
                        </div>
                        
                        <!-- 菜品5 -->
                        <div class="dish-item" data-dish-id="5" data-health="green" data-tags="vegan,organic" data-category="appetizers">
                            <div class="health-indicator green">
                                <div class="indicator-icon green">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="14" height="14">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div class="dish-info-container">
                                <div class="dish-title">Mediterranean Vegetable Stack</div>
                                <div class="dish-description">Layers of grilled eggplant, zucchini, bell peppers with tomato sauce and herbs</div>
                                <div class="suggestion-tags">
                                    <span class="suggestion-tag tag-vegan">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Vegan
                                    </span>
                                    <span class="suggestion-tag tag-organic">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Organic
                                    </span>
                                </div>
                            </div>
                            <div class="dish-checkbox-container">
                                <input type="checkbox" class="dish-checkbox" data-price="15.50" />
                            </div>
                        </div>
                        
                        <!-- 菜品6 -->
                        <div class="dish-item" data-dish-id="6" data-health="yellow" data-tags="dessert,sweet" data-category="desserts">
                            <div class="health-indicator yellow">
                                <div class="indicator-icon yellow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" width="14" height="14">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="dish-info-container">
                                <div class="dish-title">Honey Lavender Panna Cotta</div>
                                <div class="dish-description">Creamy Italian dessert with honey and lavender infusion, topped with berries</div>
                                <div class="suggestion-tags">
                                    <span class="suggestion-tag tag-dessert">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Dessert
                                    </span>
                                    <span class="suggestion-tag tag-occasional">
                                        <svg class="tag-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Occasional Treat
                                    </span>
                                </div>
                            </div>
                            <div class="dish-checkbox-container">
                                <input type="checkbox" class="dish-checkbox" data-price="9.99" />
                            </div>
                        </div>
                        
                        <!-- 可以根据需要添加更多菜品项 -->
                    </div>
                </div>
                
                <!-- 底部操作栏 -->
                <div class="menu-action-bar">
                    <div class="total-info">
                        <div class="selected-dishes">Selected: 2 items</div>
                        <div class="total-price">Total: $45.98</div>
                    </div>
                    <button class="order-button" id="order-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Place Order
                    </button>
                </div>
            </div>
            
            <!-- 营养信息浮层 -->
            <div class="modal-overlay" id="nutrition-overlay"></div>
            <div class="nutrition-summary-modal" id="nutrition-summary-modal">
                <div class="nutrition-summary-header">
                    <div class="nutrition-summary-title">Nutrition Analysis</div>
                    <div class="close-nutrition-button" id="close-nutrition-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div class="nutrition-summary-content">
                    <!-- 选择的菜品列表 -->
                    <div class="selected-dishes-section">
                        <h3 class="section-title">Selected Dishes</h3>
                        <div class="selected-dishes-list" id="selected-dishes-list">
                            <!-- 动态生成选择的菜品列表 -->
                        </div>
                    </div>
                    
                    <!-- 营养摘要 -->
                    <div class="nutrition-summary-section">
                        <h3 class="section-title">Nutrition Summary</h3>
                        <div class="total-calories">
                            <span class="value">0</span>
                            <span class="label">calories</span>
                        </div>
                        
                        <div class="macros-container">
                            <!-- 蛋白质 -->
                            <div class="macro-item">
                                <div class="macro-label">
                                    <span class="name">Protein</span>
                                    <span class="amount">0g</span>
                                </div>
                                <div class="macro-bar-container">
                                    <div class="macro-bar protein" style="width: 0%"></div>
                                </div>
                            </div>
                            
                            <!-- 碳水化合物 -->
                            <div class="macro-item">
                                <div class="macro-label">
                                    <span class="name">Carbs</span>
                                    <span class="amount">0g</span>
                                </div>
                                <div class="macro-bar-container">
                                    <div class="macro-bar carbs" style="width: 0%"></div>
                                </div>
                            </div>
                            
                            <!-- 脂肪 -->
                            <div class="macro-item">
                                <div class="macro-label">
                                    <span class="name">Fat</span>
                                    <span class="amount">0g</span>
                                </div>
                                <div class="macro-bar-container">
                                    <div class="macro-bar fat" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 血糖影响分析 -->
                    <div class="glycemic-analysis-section">
                        <h3 class="section-title">Glycemic Impact</h3>
                        <div class="glycemic-score">
                            <div class="score-chart">
                                <svg viewBox="0 0 100 100" class="circular-chart">
                                    <circle class="chart-background" cx="50" cy="50" r="45"></circle>
                                    <circle class="chart-value" cx="50" cy="50" r="45" stroke-dasharray="0, 283"></circle>
                                    <text x="50" y="50" class="chart-text">0</text>
                                </svg>
                            </div>
                            <div class="score-description">
                                <div class="score-label">Glycemic Load</div>
                                <div class="score-value">Low</div>
                                <div class="score-info">
                                    <button class="info-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 健康小贴士 -->
                    <div class="health-tips-section">
                        <h3 class="section-title">Health Tips</h3>
                        <div class="health-tip">
                            <svg xmlns="http://www.w3.org/2000/svg" class="tip-icon" fill="none" viewBox="0 0 24 24" stroke="#FFBE98">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <p class="tip-text">Select a balanced combination of proteins, healthy fats, and complex carbohydrates for optimal blood sugar control.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加事件监听器
        addMenuRecognitionEventListeners(menuRecognitionPage);
        
        console.log('菜单识别结果页面生成完成');
    }
    
    /**
     * 为菜单识别页面添加事件监听器
     * @param {HTMLElement} page - 菜单识别页面元素
     */
    function addMenuRecognitionEventListeners(page) {
        // 分类按钮点击事件
        const categoryButtons = page.querySelectorAll('.category-button');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有按钮的活动状态
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // 添加当前按钮的活动状态
                this.classList.add('active');
                
                // 获取当前选中的分类
                const selectedCategory = this.textContent.trim().toLowerCase();
                
                // 获取所有菜品
                const allDishes = page.querySelectorAll('.dish-item');
                
                // 根据分类筛选菜品
                if (selectedCategory === 'all') {
                    // 如果选择"全部"，显示所有菜品
                    allDishes.forEach(dish => {
                        dish.style.display = 'flex';
                    });
                } else {
                    // 否则根据分类筛选
                    allDishes.forEach(dish => {
                        // 首先隐藏所有菜品
                        dish.style.display = 'none';
                        
                        // 根据分类显示相关菜品，使用data-category属性匹配
                        const dishCategory = dish.getAttribute('data-category');
                        if (dishCategory && dishCategory.toLowerCase() === selectedCategory) {
                            dish.style.display = 'flex';
                        }
                    });
                }
                
                console.log(`分类已选择: ${this.textContent}`);
            });
        });
        
        // 菜品复选框事件
        const dishCheckboxes = page.querySelectorAll('.dish-checkbox');
        dishCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateOrderSummary();
            });
        });
        
        // 下单按钮点击事件
        const orderButton = page.querySelector('#order-button');
        if (orderButton) {
            orderButton.addEventListener('click', function() {
                console.log('下单按钮已点击');
                showSuccessToast();
            });
        }
        
        // 一键健康组合按钮点击事件
        const smartOrderButton = page.querySelector('#smart-order-button');
        if (smartOrderButton) {
            smartOrderButton.addEventListener('click', function() {
                console.log('一键健康组合按钮已点击');
                // 自动选择健康菜品
                const healthyDishes = page.querySelectorAll('.dish-item[data-health="green"] .dish-checkbox');
                healthyDishes.forEach(checkbox => {
                    checkbox.checked = true;
                    // 手动触发change事件，确保营养分析功能能够检测到变化
                    const event = new Event('change', { bubbles: true });
                    checkbox.dispatchEvent(event);
                });
                updateOrderSummary();
                showToast('Healthy dishes combination selected for you');
                
                // 手动触发营养分析更新
                if (typeof updateSelectedDishes === 'function') {
                    updateSelectedDishes();
                }
            });
        }
    }
    
    /**
     * 更新订单摘要信息
     */
    function updateOrderSummary() {
        const page = document.querySelector('.screen[data-page="menu-recognition"]');
        if (!page) return;
        
        const checkedBoxes = page.querySelectorAll('.dish-checkbox:checked');
        const count = checkedBoxes.length;
        
        // Calculate total price
        let totalPrice = 0;
        checkedBoxes.forEach(box => {
            const price = parseFloat(box.getAttribute('data-price') || 0);
            totalPrice += price;
        });
        
        // Update display
        const selectedDishesElement = page.querySelector('.selected-dishes');
        const totalPriceElement = page.querySelector('.total-price');
        
        if (selectedDishesElement && totalPriceElement) {
            selectedDishesElement.textContent = `Selected: ${count} item${count !== 1 ? 's' : ''}`;
            totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        }
    }
    
    /**
     * Show success notification
     */
    function showSuccessToast() {
        showToast('Order placed successfully!');
    }
    
    /**
     * Show toast message
     * @param {string} message - Message to display
     */
    function showToast(message) {
        // Check if toast element already exists
        let toast = document.querySelector('.toast-notification');
        
        // If not, create a new one
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        
        // Set message
        toast.textContent = message;
        
        // Show notification
        toast.classList.add('show');
        
        // Hide automatically after 2 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
})(); 
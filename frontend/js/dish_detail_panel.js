/**
 * 菜品详情面板功能
 * @description 点击菜品卡片时显示详情面板，包含健康评分、卡路里和营养数据
 * @author Senior iOS Engineer
 * @version 1.0.0
 */
(function() {
    console.log('加载菜品详情面板功能');
    
    // 菜品营养数据 - 模拟数据库
    const dishesData = {
        '1': {
            id: '1',
            name: 'Mediterranean Grilled Salmon',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Fresh salmon with lemon, garlic, olive oil and Mediterranean herbs',
            healthScore: 4.8,
            calories: 380,
            carbs: 5,
            protein: 42,
            fat: 18,
            glycemicLoad: 2,
            price: 24.99,
            allergies: ['fish'],
            tags: ['high-protein', 'low-carb', 'omega-3'],
            ingredients: ['Wild-caught salmon', 'Extra virgin olive oil', 'Lemon', 'Garlic', 'Mediterranean herbs', 'Sea salt']
        },
        '2': {
            id: '2',
            name: 'Herb Grilled Shrimp',
            image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Tender shrimp marinated with fresh herbs and grilled to perfection',
            healthScore: 4.5,
            calories: 310,
            carbs: 8,
            protein: 36,
            fat: 14,
            glycemicLoad: 3,
            price: 18.99,
            allergies: ['shellfish'],
            tags: ['high-protein', 'low-carb'],
            ingredients: ['Wild-caught shrimp', 'Olive oil', 'Fresh herbs', 'Garlic', 'Lemon zest', 'Black pepper']
        },
        '3': {
            id: '3',
            name: 'Roasted Vegetable Quinoa Bowl',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Protein-rich quinoa with colorful roasted seasonal vegetables',
            healthScore: 5.0,
            calories: 420,
            carbs: 62,
            protein: 14,
            fat: 12,
            glycemicLoad: 8,
            price: 16.99,
            allergies: [],
            tags: ['vegetarian', 'vegan', 'high-fiber', 'plant-based'],
            ingredients: ['Quinoa', 'Zucchini', 'Bell peppers', 'Cherry tomatoes', 'Red onion', 'Extra virgin olive oil', 'Balsamic vinegar']
        },
        '4': {
            id: '4',
            name: 'Classic Margherita Pizza',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            description: 'Traditional pizza with tomato sauce, fresh mozzarella and basil',
            healthScore: 3.2,
            calories: 760,
            carbs: 88,
            protein: 28,
            fat: 32,
            glycemicLoad: 36,
            price: 14.99,
            allergies: ['gluten', 'dairy'],
            tags: ['comfort-food', 'weekend-treat'],
            ingredients: ['Wheat flour', 'Tomatoes', 'Fresh mozzarella', 'Basil', 'Olive oil', 'Yeast', 'Salt']
        }
    };
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        initDishDetailPanel();
    });
    
    /**
     * 初始化菜品详情面板功能
     */
    function initDishDetailPanel() {
        console.log('初始化菜品详情面板');
        
        // 创建详情面板容器
        createDishDetailPanel();
        
        // 为菜品项添加点击事件
        addDishClickListeners();
    }
    
    /**
     * 创建菜品详情面板DOM元素
     */
    function createDishDetailPanel() {
        // 检查面板是否已存在
        if (document.getElementById('dish-detail-panel')) return;
        
        // 创建面板元素
        const panel = document.createElement('div');
        panel.id = 'dish-detail-panel';
        panel.className = 'dish-detail-panel';
        
        // 设置面板HTML内容 - 移除Ingredients和Features模块
        panel.innerHTML = `
            <div class="dish-detail-overlay"></div>
            <div class="dish-detail-container">
                <div class="dish-detail-header">
                    <img src="" alt="" class="dish-detail-image">
                    <button class="dish-detail-close-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="dish-detail-content">
                    <div class="dish-detail-title-section">
                        <h2 class="dish-detail-title"></h2>
                        <div class="dish-detail-price"></div>
                    </div>
                    <p class="dish-detail-description"></p>
                    
                    <div class="dish-detail-metrics">
                        <div class="health-score-container">
                            <h3 class="metrics-title">Health Score</h3>
                            <div class="health-score">
                                <div class="star-rating">
                                    <div class="stars-container"></div>
                                </div>
                                <div class="score-value"></div>
                            </div>
                        </div>
                        
                        <div class="calories-container">
                            <h3 class="metrics-title">Calories</h3>
                            <div class="calories-value"></div>
                        </div>
                    </div>
                    
                    <div class="nutrition-breakdown">
                        <h3 class="metrics-title">Nutrition Breakdown</h3>
                        <div class="macro-nutrients">
                            <div class="macro-chart-container">
                                <div class="macro-chart">
                                    <canvas id="macroChart" width="150" height="150"></canvas>
                                </div>
                            </div>
                            <div class="macro-details">
                                <div class="macro-item protein">
                                    <div class="macro-color"></div>
                                    <div class="macro-name">Protein</div>
                                    <div class="macro-value"></div>
                                </div>
                                <div class="macro-item carbs">
                                    <div class="macro-color"></div>
                                    <div class="macro-name">Carbs</div>
                                    <div class="macro-value"></div>
                                </div>
                                <div class="macro-item fat">
                                    <div class="macro-color"></div>
                                    <div class="macro-name">Fat</div>
                                    <div class="macro-value"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dish-detail-actions">
                        <button class="add-to-cart-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // 找到Menu Result屏幕容器
        const menuResultScreen = document.querySelector('.screen[data-page="menu-recognition"]');
        
        // 将面板添加到页面
        if (menuResultScreen) {
            // 如果找到Menu Result屏幕，将面板添加到该屏幕而不是body
            menuResultScreen.appendChild(panel);
            console.log('菜品详情面板已添加到Menu Result屏幕');
            
            // 获取手机壳的可用区域尺寸
            const availableWidth = menuResultScreen.clientWidth;
            const availableHeight = menuResultScreen.clientHeight;
            
            // 设置面板的样式，使其在Phone内居中
            panel.style.position = 'absolute';
            panel.style.top = '0';
            panel.style.left = '0';
            panel.style.width = '100%';
            panel.style.height = '100%';
            panel.style.zIndex = '1000'; // 确保面板在其他元素之上
            panel.style.display = 'flex';
            panel.style.flexDirection = 'column';
            panel.style.alignItems = 'center';
            
            // 获取面板内的容器元素
            const container = panel.querySelector('.dish-detail-container');
            if (container) {
                // 计算合适的尺寸，确保容器不会超出手机壳
                const containerWidth = Math.min(availableWidth - 24, 400); // 最大宽度400px或屏幕宽度减24px
                
                // 设置容器样式
                container.style.width = `${containerWidth}px`;
                container.style.maxWidth = 'calc(100% - 24px)';
                container.style.maxHeight = '85%';
                container.style.margin = '0 auto';
                container.style.borderRadius = '20px 20px 0 0';
                container.style.boxShadow = '0 -4px 20px rgba(0, 0, 0, 0.15)';
            }
            
            // 设置遮罩层样式
            const overlay = panel.querySelector('.dish-detail-overlay');
            if (overlay) {
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }
        } else {
            // 如果找不到Menu Result屏幕，则添加到body（备用方案）
            document.body.appendChild(panel);
            console.log('未找到Menu Result屏幕，菜品详情面板已添加到body');
        }
        
        // 添加关闭事件
        const closeBtn = panel.querySelector('.dish-detail-close-btn');
        const overlay = panel.querySelector('.dish-detail-overlay');
        
        closeBtn.addEventListener('click', hideDishDetailPanel);
        overlay.addEventListener('click', hideDishDetailPanel);
        
        // 添加到购物车按钮事件
        const addToCartBtn = panel.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', function() {
            // 获取当前显示的菜品ID
            const dishId = panel.getAttribute('data-dish-id');
            // 添加到购物车
            addDishToCart(dishId);
            // 隐藏面板
            hideDishDetailPanel();
        });
        
        console.log('菜品详情面板创建完成');
    }
    
    /**
     * 为菜品项添加点击事件
     */
    function addDishClickListeners() {
        // 监听菜品项的点击事件 - 包括两种可能的菜品元素样式
        document.addEventListener('click', function(event) {
            // 检查是否点击了dish-item
            const dishItem = event.target.closest('.dish-item');
            if (dishItem) {
                // 忽略如果点击的是复选框或添加按钮
                if (event.target.closest('.dish-checkbox-container') || event.target.closest('.add-button') || event.target.closest('.dish-add')) {
                    return;
                }
                
                const dishId = dishItem.getAttribute('data-dish-id');
                if (dishId) {
                    showDishDetail(dishId);
                }
                return;
            }
            
            // 检查是否点击了dish-card
            const dishCard = event.target.closest('.dish-card');
            if (dishCard) {
                // 忽略如果点击的是添加按钮或选中交互区域
                if (event.target.closest('.add-button') || event.target.closest('.dish-add') || event.target.closest('.dish-actions')) {
                    return;
                }
                
                // 这里需要从卡片内部获取菜品名称，然后找到对应的ID
                const dishName = dishCard.querySelector('.dish-name')?.textContent;
                if (dishName) {
                    // 查找匹配菜品名称的ID
                    const dishId = findDishIdByName(dishName);
                    if (dishId) {
                        showDishDetail(dishId);
                    }
                }
            }
        });
        
        console.log('菜品点击事件监听器添加完成');
    }
    
    /**
     * 根据菜品名称查找ID
     * @param {string} name - 菜品名称
     * @returns {string|null} - 菜品ID或null
     */
    function findDishIdByName(name) {
        for (const id in dishesData) {
            if (dishesData[id].name === name) {
                return id;
            }
        }
        return null;
    }
    
    /**
     * 显示菜品详情
     * @param {string} dishId - 菜品ID
     */
    function showDishDetail(dishId) {
        console.log(`显示菜品详情: ${dishId}`);
        
        const dish = dishesData[dishId];
        if (!dish) {
            console.error(`菜品ID不存在: ${dishId}`);
            return;
        }
        
        const panel = document.getElementById('dish-detail-panel');
        if (!panel) return;
        
        // 设置当前菜品ID
        panel.setAttribute('data-dish-id', dishId);
        
        // 更新详情面板的内容
        panel.querySelector('.dish-detail-image').src = dish.image;
        panel.querySelector('.dish-detail-image').alt = dish.name;
        panel.querySelector('.dish-detail-title').textContent = dish.name;
        panel.querySelector('.dish-detail-price').textContent = `$${dish.price.toFixed(2)}`;
        panel.querySelector('.dish-detail-description').textContent = dish.description;
        
        // 更新健康评分星星
        updateHealthScoreStars(dish.healthScore);
        // 不再显示具体分数（已在CSS中隐藏）
        
        // 更新卡路里
        panel.querySelector('.calories-value').textContent = `${dish.calories} kcal`;
        
        // 更新营养成分
        panel.querySelector('.macro-item.protein .macro-value').textContent = `${dish.protein}g`;
        panel.querySelector('.macro-item.carbs .macro-value').textContent = `${dish.carbs}g`;
        panel.querySelector('.macro-item.fat .macro-value').textContent = `${dish.fat}g`;
        
        // 更新饼图
        updateNutritionChart(dish);
        
        // 显示面板
        panel.classList.add('show');
        
        // 找到Menu Result屏幕容器并禁用滚动
        const menuResultScreen = document.querySelector('.screen[data-page="menu-recognition"]');
        if (menuResultScreen) {
            // 如果找到Menu Result屏幕，只禁用该屏幕的滚动
            const menuContent = menuResultScreen.querySelector('.menu-content');
            if (menuContent) {
                menuContent.style.overflow = 'hidden';
            }
        } else {
            // 如果找不到Menu Result屏幕，则禁用整个body的滚动（备用方案）
            document.body.style.overflow = 'hidden';
        }
    }
    
    /**
     * 更新健康评分的星星显示
     * @param {number} score - 健康评分 (0-5)
     */
    function updateHealthScoreStars(score) {
        const starsContainer = document.querySelector('.stars-container');
        if (!starsContainer) return;
        
        starsContainer.innerHTML = '';
        
        // 计算完整星星的数量
        const fullStars = Math.floor(score);
        // 计算半星(如果有)
        const hasHalfStar = score - fullStars >= 0.3 && score - fullStars < 0.8;
        // 计算空星数量
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        // 添加完整星星
        for (let i = 0; i < fullStars; i++) {
            const star = document.createElement('span');
            star.className = 'star full';
            star.innerHTML = '★';
            starsContainer.appendChild(star);
        }
        
        // 添加半星（如果有）
        if (hasHalfStar) {
            const star = document.createElement('span');
            star.className = 'star half';
            star.innerHTML = '★';
            starsContainer.appendChild(star);
        }
        
        // 添加空星
        for (let i = 0; i < emptyStars; i++) {
            const star = document.createElement('span');
            star.className = 'star empty';
            star.innerHTML = '☆';
            starsContainer.appendChild(star);
        }
    }
    
    /**
     * 更新营养成分饼图
     * @param {Object} dish - 菜品数据
     */
    function updateNutritionChart(dish) {
        // 计算宏量营养素的总克数和百分比
        const totalGrams = dish.protein + dish.carbs + dish.fat;
        const proteinPercentage = (dish.protein / totalGrams * 100).toFixed(0);
        const carbsPercentage = (dish.carbs / totalGrams * 100).toFixed(0);
        const fatPercentage = (dish.fat / totalGrams * 100).toFixed(0);
        
        // 更新饼图 - 使用CSS变量设置conic-gradient的百分比
        const chartElement = document.querySelector('.macro-chart');
        if (chartElement) {
            // 设置CSS变量
            chartElement.style.setProperty('--protein-percentage', proteinPercentage);
            chartElement.style.setProperty('--carbs-percentage', carbsPercentage);
            chartElement.style.setProperty('--fat-percentage', fatPercentage);
            
            // 简化HTML结构，仅创建pie-chart容器
            chartElement.innerHTML = '<div class="pie-chart"></div>';
            
            // 添加营养素百分比文本显示
            const pieChart = chartElement.querySelector('.pie-chart');
            if (pieChart) {
                const legendHtml = `
                    <div class="pie-legend">
                        <span class="protein-percent">${proteinPercentage}%</span>
                        <span class="carbs-percent">${carbsPercentage}%</span>
                        <span class="fat-percent">${fatPercentage}%</span>
                    </div>
                `;
                pieChart.insertAdjacentHTML('afterend', legendHtml);
            }
            
            console.log(`饼图已更新: 蛋白质 ${proteinPercentage}%, 碳水 ${carbsPercentage}%, 脂肪 ${fatPercentage}%`);
        }
    }
    
    /**
     * 隐藏菜品详情面板
     */
    function hideDishDetailPanel() {
        const panel = document.getElementById('dish-detail-panel');
        if (panel) {
            // 移除显示类
            panel.classList.remove('show');
            
            // 清除面板样式
            panel.style.display = '';
            panel.style.flexDirection = '';
            panel.style.alignItems = '';
            
            // 清除容器样式
            const container = panel.querySelector('.dish-detail-container');
            if (container) {
                container.style.width = '';
                container.style.maxWidth = '';
                container.style.maxHeight = '';
                container.style.margin = '';
                container.style.borderRadius = '';
                container.style.boxShadow = '';
            }
            
            // 找到Menu Result屏幕容器并恢复滚动
            const menuResultScreen = document.querySelector('.screen[data-page="menu-recognition"]');
            if (menuResultScreen) {
                // 如果找到Menu Result屏幕，只恢复该屏幕的滚动
                const menuContent = menuResultScreen.querySelector('.menu-content');
                if (menuContent) {
                    menuContent.style.overflow = 'auto';
                }
            } else {
                // 如果找不到Menu Result屏幕，则恢复整个body的滚动（备用方案）
                document.body.style.overflow = '';
            }
        }
    }
    
    /**
     * 添加菜品到购物车
     * @param {string} dishId - 菜品ID
     */
    function addDishToCart(dishId) {
        const dish = dishesData[dishId];
        if (!dish) return;
        
        console.log(`添加到购物车: ${dish.name}`);
        
        // 更新购物车徽章数量 - 调用已有的更新购物车函数
        if (typeof updateCartBadge === 'function') {
            updateCartBadge(1);
        }
        
        // 显示添加成功提示
        if (typeof showToast === 'function') {
            showToast(`${dish.name} added to your order`);
        }
    }
    
    // 将函数暴露到全局作用域
    window.showDishDetail = showDishDetail;
    window.hideDishDetailPanel = hideDishDetailPanel;
})(); 
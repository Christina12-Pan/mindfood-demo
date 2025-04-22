/**
 * 菜单营养分析功能
 * Mindfood App - Menu Nutrition Analysis
 * 
 * @version 1.0.0
 * @date 2023-08-18
 * @description 分析选择的菜品营养成分，显示综合营养分析结果
 */

(function() {
    'use strict';

    // 立即执行初始化，确保代码在页面完全加载前也能运行
    console.log('正在初始化营养分析模块...');
    
    // 在DOM准备就绪时运行主要初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // 如果DOM已经加载完成，立即初始化
        initialize();
    }
    
    // 初始化变量
    let selectedDishes = [];
    let nutritionBadge = null;
    let nutritionData = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        glycemicLoad: 0
    };
    
    // 全局添加点击事件以捕获右上角的营养分析按钮点击
    document.addEventListener('click', function(event) {
        // 使用更全面的判断逻辑，确保能捕获到按钮点击
        const target = event.target;
        
        if (target.id === 'nutrition-summary-button' || 
            target.classList.contains('nutrition-summary-button') ||
            target.classList.contains('nutrition-icon') ||
            target.closest('#nutrition-summary-button') ||
            target.closest('.nutrition-summary-button')) {
            
            console.log('捕获到营养分析按钮点击事件!');
            event.preventDefault();
            event.stopPropagation();
            
            try {
                handleNutritionButtonClick();
            } catch (error) {
                console.error('处理营养按钮点击时出错:', error);
                alert('显示营养分析时发生错误，请重试');
            }
        }
        
        // 处理关闭按钮点击
        if (target.id === 'close-nutrition-modal' || 
            target.closest('#close-nutrition-modal') ||
            target.classList.contains('close-button') ||
            target.closest('.close-button') ||
            (target.classList.contains('modal-overlay') || target.id === 'nutrition-overlay')) {
            
            console.log('捕获到关闭模态框点击事件!');
            closeNutritionModal();
        }
    });
    
    // 添加ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeNutritionModal();
        }
    });
    
    /**
     * 主初始化函数
     */
    function initialize() {
        console.log('DOM加载完成，完成初始化');
        
        // 确保模态框和其他UI组件存在
        ensureModalExists();
        
        // 设置复选框事件监听
        setupCheckboxListeners();
        
        // 监听DOM变化，处理动态添加的元素
        setupMutationObserver();
        
        // 更新初始选中状态
        updateSelectedDishes();
        
        // 监听页面导航事件
        setupNavigationListeners();
    }
    
    /**
     * 处理营养按钮点击
     */
    function handleNutritionButtonClick() {
        console.log('营养分析按钮点击');
        showNutritionSummary();
    }
    
    /**
     * 确保模态框存在
     */
    function ensureModalExists() {
        console.log('检查并确保模态框存在');
        
        let overlay = document.getElementById('nutrition-overlay');
        let modal = document.getElementById('nutrition-summary-modal');
        
        // 如果模态框不存在，创建模态框
        if (!overlay) {
            console.log('创建遮罩层');
            overlay = document.createElement('div');
            overlay.id = 'nutrition-overlay';
            overlay.className = 'modal-overlay';
            document.body.appendChild(overlay);
        }
        
        if (!modal) {
            console.log('创建模态框');
            modal = document.createElement('div');
            modal.id = 'nutrition-summary-modal';
            modal.className = 'nutrition-summary-modal';
            
            modal.innerHTML = `
                <div class="nutrition-summary-header">
                    <div class="nutrition-summary-title">营养分析</div>
                    <div class="close-nutrition-button" id="close-nutrition-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div class="nutrition-summary-content">
                    <div class="selected-dishes-section">
                        <h3 class="section-title">已选菜品</h3>
                        <div class="selected-dishes-list" id="selected-dishes-list">
                            <!-- 动态生成菜品列表 -->
                        </div>
                    </div>
                    
                    <div class="nutrition-summary-section">
                        <h3 class="section-title">营养总结</h3>
                        <div class="total-calories">
                            <span class="value">0</span>
                            <span class="label">卡路里</span>
                        </div>
                        
                        <div class="macros-container">
                            <div class="macro-item">
                                <div class="macro-label">
                                    <span class="name">蛋白质</span>
                                    <span class="amount">0g</span>
                                </div>
                                <div class="macro-bar-container">
                                    <div class="macro-bar protein" style="width: 0%"></div>
                                </div>
                            </div>
                            
                            <div class="macro-item">
                                <div class="macro-label">
                                    <span class="name">碳水化合物</span>
                                    <span class="amount">0g</span>
                                </div>
                                <div class="macro-bar-container">
                                    <div class="macro-bar carbs" style="width: 0%"></div>
                                </div>
                            </div>
                            
                            <div class="macro-item">
                                <div class="macro-label">
                                    <span class="name">脂肪</span>
                                    <span class="amount">0g</span>
                                </div>
                                <div class="macro-bar-container">
                                    <div class="macro-bar fat" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glycemic-analysis-section">
                        <h3 class="section-title">血糖影响</h3>
                        <div class="glycemic-score">
                            <div class="score-chart">
                                <svg viewBox="0 0 100 100" class="circular-chart">
                                    <circle class="chart-background" cx="50" cy="50" r="45"></circle>
                                    <circle class="chart-value" cx="50" cy="50" r="45" stroke-dasharray="0, 283"></circle>
                                    <text x="50" y="50" class="chart-text">0</text>
                                </svg>
                            </div>
                            <div class="score-description">
                                <div class="score-label">血糖负荷</div>
                                <div class="score-value">低</div>
                                <div class="score-info">
                                    <button class="info-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // 为信息按钮添加事件
            const infoButton = modal.querySelector('.info-button');
            if (infoButton) {
                infoButton.addEventListener('click', function() {
                    showMessage('血糖负荷(GL)表示食物对血糖的总体影响。低GL(≤10)对血糖影响小，高GL(>20)对血糖影响大。');
                });
            }
        }
    }
    
    /**
     * 设置复选框监听器
     */
    function setupCheckboxListeners() {
        console.log('设置菜品复选框监听器');
        
        const checkboxes = document.querySelectorAll('.dish-checkbox');
        checkboxes.forEach(checkbox => {
            // 移除旧监听器
            const newCheckbox = checkbox.cloneNode(true);
            if (checkbox.parentNode) {
                checkbox.parentNode.replaceChild(newCheckbox, checkbox);
            }
            
            // 添加新监听器
            newCheckbox.addEventListener('change', function() {
                console.log('复选框状态变化:', this.checked);
                updateSelectedDishes();
            });
        });
        
        console.log(`已为${checkboxes.length}个复选框添加监听器`);
    }
    
    /**
     * 设置DOM变化监听器，处理动态添加的复选框
     */
    function setupMutationObserver() {
        console.log('设置DOM变化监听器');
        
        const observer = new MutationObserver(function(mutations) {
            let hasNewCheckboxes = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // 元素节点
                            const checkboxes = node.querySelectorAll('.dish-checkbox');
                            if (checkboxes.length > 0) {
                                hasNewCheckboxes = true;
                                checkboxes.forEach(checkbox => {
                                    checkbox.addEventListener('change', function() {
                                        updateSelectedDishes();
                                    });
                                });
                            }
                        }
                    });
                }
            });
            
            if (hasNewCheckboxes) {
                updateSelectedDishes();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    /**
     * 更新选中的菜品
     */
    function updateSelectedDishes() {
        console.log('更新选中的菜品列表');
        
        const checkedBoxes = document.querySelectorAll('.dish-checkbox:checked');
        console.log('选中的复选框数量:', checkedBoxes.length);
        
        // 重置选中的菜品
        selectedDishes = [];
        
        checkedBoxes.forEach(checkbox => {
            const dishItem = checkbox.closest('.dish-item');
            if (dishItem) {
                const dishId = dishItem.getAttribute('data-dish-id');
                const dishTitle = dishItem.querySelector('.dish-title')?.textContent || '未命名菜品';
                const dishHealth = dishItem.getAttribute('data-health') || 'yellow';
                
                // 创建菜品数据
                const dishData = {
                    id: dishId || Math.random().toString(36).substring(2, 10),
                    name: dishTitle,
                    health: dishHealth,
                    calories: Math.floor(Math.random() * 300) + 100,
                    protein: Math.floor(Math.random() * 20) + 5,
                    carbs: Math.floor(Math.random() * 40) + 10,
                    fat: Math.floor(Math.random() * 15) + 2,
                    glycemicLoad: dishHealth === 'green' ? 
                        Math.floor(Math.random() * 5) + 1 : 
                        (dishHealth === 'yellow' ? 
                            Math.floor(Math.random() * 5) + 6 : 
                            Math.floor(Math.random() * 10) + 11)
                };
                
                selectedDishes.push(dishData);
            }
        });
        
        console.log('已选菜品数量:', selectedDishes.length);
        
        // 更新徽章
        updateBadge();
        
        // 计算总营养值
        calculateTotalNutrition();
    }
    
    /**
     * 更新徽章数字
     */
    function updateBadge() {
        console.log('更新徽章');
        
        // 查找徽章元素
        nutritionBadge = document.querySelector('.nutrition-badge');
        
        if (nutritionBadge) {
            // 更新徽章数字
            const count = selectedDishes.length;
            nutritionBadge.textContent = count;
            
            // 根据数量控制显示/隐藏
            nutritionBadge.style.display = count > 0 ? 'flex' : 'none';
            
            console.log('徽章更新为:', count);
        } else {
            console.warn('未找到徽章元素');
        }
    }
    
    /**
     * 计算总营养值
     */
    function calculateTotalNutrition() {
        console.log('计算总营养值');
        
        // 重置营养数据
        nutritionData = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            glycemicLoad: 0
        };
        
        // 累加各菜品的营养数据
        selectedDishes.forEach(dish => {
            nutritionData.calories += dish.calories;
            nutritionData.protein += dish.protein;
            nutritionData.carbs += dish.carbs;
            nutritionData.fat += dish.fat;
            nutritionData.glycemicLoad += dish.glycemicLoad;
        });
        
        // 计算营养素百分比
        const totalMacros = nutritionData.protein + nutritionData.carbs + nutritionData.fat;
        nutritionData.proteinPercent = totalMacros > 0 ? Math.round((nutritionData.protein / totalMacros) * 100) : 0;
        nutritionData.carbsPercent = totalMacros > 0 ? Math.round((nutritionData.carbs / totalMacros) * 100) : 0;
        nutritionData.fatPercent = totalMacros > 0 ? Math.round((nutritionData.fat / totalMacros) * 100) : 0;
        
        // 确定血糖负荷等级
        if (nutritionData.glycemicLoad <= 10) {
            nutritionData.glycemicCategory = '低';
        } else if (nutritionData.glycemicLoad <= 20) {
            nutritionData.glycemicCategory = '中';
        } else {
            nutritionData.glycemicCategory = '高';
        }
        
        console.log('营养计算完成:', nutritionData);
    }
    
    /**
     * 更新模态框内容
     */
    function updateModalContent(selectedDishes) {
        console.log('更新营养分析模态框内容');
        
        try {
            // 计算总营养值
            let totalCalories = 0;
            let totalProtein = 0;
            let totalCarbs = 0;
            let totalFat = 0;
            let totalGlycemicLoad = 0;
            
            // 更新已选菜品列表
            const dishesList = document.getElementById('selected-dishes-list');
            if (dishesList) {
                let html = '';
                selectedDishes.forEach(dish => {
                    // 累加营养值
                    totalCalories += dish.calories || 0;
                    totalProtein += dish.protein || 0;
                    totalCarbs += dish.carbs || 0;
                    totalFat += dish.fat || 0;
                    totalGlycemicLoad += dish.glycemicLoad || 0;
                    
                    // 生成菜品HTML
                    html += `
                        <div class="selected-dish-item">
                            <div class="dish-info">
                                <div class="dish-name">${dish.name}</div>
                                <div class="dish-quantity">1份</div>
                            </div>
                            <div class="dish-calories">${dish.calories || 0} 卡路里</div>
                        </div>
                    `;
                });
                dishesList.innerHTML = html;
            }
            
            // 计算宏营养素百分比
            const totalMacros = totalProtein + totalCarbs + totalFat;
            const proteinPercent = totalMacros > 0 ? Math.round((totalProtein / totalMacros) * 100) : 0;
            const carbsPercent = totalMacros > 0 ? Math.round((totalCarbs / totalMacros) * 100) : 0;
            const fatPercent = totalMacros > 0 ? Math.round((totalFat / totalMacros) * 100) : 0;
            
            // 确定血糖负荷等级
            let glycemicCategory = '低';
            if (totalGlycemicLoad <= 10) {
                glycemicCategory = '低';
            } else if (totalGlycemicLoad <= 20) {
                glycemicCategory = '中';
            } else {
                glycemicCategory = '高';
            }
            
            // 更新总卡路里
            const caloriesElement = document.querySelector('.total-calories .value');
            if (caloriesElement) {
                caloriesElement.textContent = totalCalories;
            }
            
            // 更新宏量营养素
            updateMacronutrient('protein', totalProtein, proteinPercent);
            updateMacronutrient('carbs', totalCarbs, carbsPercent);
            updateMacronutrient('fat', totalFat, fatPercent);
            
            // 更新血糖负荷
            const chartText = document.querySelector('.chart-text');
            const chartValue = document.querySelector('.chart-value');
            const scoreValue = document.querySelector('.score-value');
            
            if (chartText) {
                chartText.textContent = totalGlycemicLoad;
            }
            
            if (chartValue) {
                // 计算圆环进度
                const circumference = 2 * Math.PI * 45;
                const maxValue = 30;
                const value = Math.min(totalGlycemicLoad, maxValue);
                const percent = value / maxValue;
                const offset = circumference - (percent * circumference);
                
                chartValue.setAttribute('stroke-dasharray', `${circumference - offset}, ${offset}`);
                
                // 根据负荷值设置颜色
                if (totalGlycemicLoad <= 10) {
                    chartValue.setAttribute('stroke', '#4ECDC4'); // 绿色
                } else if (totalGlycemicLoad <= 20) {
                    chartValue.setAttribute('stroke', '#FFD166'); // 黄色
                } else {
                    chartValue.setAttribute('stroke', '#FF6B6B'); // 红色
                }
            }
            
            if (scoreValue) {
                scoreValue.textContent = glycemicCategory;
                
                // 根据类别设置颜色
                if (glycemicCategory === '低') {
                    scoreValue.style.color = '#4ECDC4'; // 绿色
                } else if (glycemicCategory === '中') {
                    scoreValue.style.color = '#FFD166'; // 黄色
                } else {
                    scoreValue.style.color = '#FF6B6B'; // 红色
                }
            }
            
            console.log('模态框内容更新完成');
        } catch (error) {
            console.error('更新模态框内容时出错:', error);
        }
    }
    
    /**
     * 更新宏量营养素显示
     */
    function updateMacronutrient(type, amount, percent) {
        const amountElement = document.querySelector(`.macro-item:has(.name:contains(${type === 'protein' ? '蛋白质' : type === 'carbs' ? '碳水化合物' : '脂肪'})) .amount`);
        const barElement = document.querySelector(`.macro-bar.${type}`);
        
        if (!amountElement || !barElement) {
            const alternativeAmount = document.querySelector(`.macro-item .amount`);
            const alternativeBar = document.querySelector(`.macro-item .macro-bar`);
            
            if (alternativeAmount && alternativeBar) {
                alternativeAmount.textContent = `${amount}g`;
                alternativeBar.style.width = `${percent}%`;
            }
            return;
        }
        
        amountElement.textContent = `${amount}g`;
        barElement.style.width = `${percent}%`;
    }
    
    /**
     * 显示营养分析模态框
     * @function
     * @description 检查是否有选中的菜品，然后显示营养分析模态框
     */
    function showNutritionSummary() {
        console.log('显示营养分析模态框');
        
        // 获取选中的菜品
        const selectedDishes = getSelectedDishes();
        
        // 检查是否有选中菜品
        if (selectedDishes.length === 0) {
            showMessage('请先选择至少一个菜品');
            return;
        }
        
        // 更新模态框内容
        updateModalContent(selectedDishes);
        
        // 显示模态框
        const overlay = document.getElementById('nutrition-overlay');
        const modal = document.getElementById('nutrition-summary-modal');
        
        if (!overlay || !modal) {
            console.error('找不到模态框元素');
            return;
        }
        
        // 显示遮罩和模态框
        overlay.classList.add('show');
        modal.classList.add('show');
        
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
        
        console.log('营养分析模态框已显示');
    }
    
    /**
     * 隐藏营养分析模态框
     * @function
     * @description 隐藏营养分析模态框并恢复背景滚动
     */
    function hideNutritionSummary() {
        console.log('隐藏营养分析模态框');
        
        const overlay = document.getElementById('nutrition-overlay');
        const modal = document.getElementById('nutrition-summary-modal');
        
        if (!overlay || !modal) {
            console.warn('找不到模态框元素');
            return;
        }
        
        // 隐藏遮罩和模态框
        overlay.classList.remove('show');
        modal.classList.remove('show');
        
        // 恢复背景滚动
        document.body.style.overflow = '';
        
        console.log('营养分析模态框已隐藏');
    }
    
    /**
     * 获取选中的菜品
     * @function
     * @returns {Array} 选中菜品的数组
     * @description 从UI中获取选中的菜品并返回
     */
    function getSelectedDishes() {
        console.log('获取选中的菜品');
        
        const selectedDishes = [];
        
        // 获取所有选中的复选框
        const checkedBoxes = document.querySelectorAll('.dish-checkbox:checked');
        console.log('选中的复选框数量:', checkedBoxes.length);
        
        checkedBoxes.forEach(checkbox => {
            const dishItem = checkbox.closest('.dish-item');
            if (dishItem) {
                const dishId = dishItem.getAttribute('data-dish-id');
                if (dishId) {
                    const dish = getDishById(dishId);
                    if (dish) {
                        selectedDishes.push(dish);
                    }
                }
            }
        });
        
        console.log('已选菜品数量:', selectedDishes.length);
        return selectedDishes;
    }
    
    /**
     * 通过ID获取菜品详情
     * @function
     * @param {string} id - 菜品ID
     * @returns {Object} 菜品对象
     * @description 根据ID获取菜品的详细信息
     */
    function getDishById(id) {
        console.log('获取菜品详情，ID:', id);
        
        // 模拟菜品数据库
        // 在实际应用中，这部分可能会从API或本地存储中获取
        const dishes = [
            {
                id: 'dish1',
                name: '清蒸鲈鱼',
                calories: 180,
                protein: 25,
                carbs: 2,
                fat: 8,
                glycemicLoad: 1,
                health: 'green'
            },
            {
                id: 'dish2',
                name: '西兰花炒牛肉',
                calories: 320,
                protein: 28,
                carbs: 15,
                fat: 16,
                glycemicLoad: 6,
                health: 'green'
            },
            {
                id: 'dish3',
                name: '红烧排骨',
                calories: 450,
                protein: 32,
                carbs: 20,
                fat: 25,
                glycemicLoad: 12,
                health: 'yellow'
            },
            {
                id: 'dish4',
                name: '番茄蛋花汤',
                calories: 120,
                protein: 8,
                carbs: 7,
                fat: 6,
                glycemicLoad: 3,
                health: 'green'
            },
            {
                id: 'dish5',
                name: '糖醋里脊',
                calories: 380,
                protein: 22,
                carbs: 35,
                fat: 15,
                glycemicLoad: 22,
                health: 'red'
            }
        ];
        
        // 查找匹配的菜品
        const dish = dishes.find(dish => dish.id === id);
        
        // 如果找不到菜品，创建一个默认菜品
        if (!dish) {
            const dishItem = document.querySelector(`[data-dish-id="${id}"]`);
            if (dishItem) {
                const dishTitle = dishItem.querySelector('.dish-title')?.textContent || '未命名菜品';
                const dishHealth = dishItem.getAttribute('data-health') || 'yellow';
                
                // 创建默认菜品数据
                return {
                    id: id,
                    name: dishTitle,
                    health: dishHealth,
                    calories: Math.floor(Math.random() * 300) + 100,
                    protein: Math.floor(Math.random() * 20) + 5,
                    carbs: Math.floor(Math.random() * 40) + 10,
                    fat: Math.floor(Math.random() * 15) + 2,
                    glycemicLoad: dishHealth === 'green' ? 
                        Math.floor(Math.random() * 5) + 1 : 
                        (dishHealth === 'yellow' ? 
                            Math.floor(Math.random() * 5) + 6 : 
                            Math.floor(Math.random() * 10) + 11)
                };
            }
        }
        
        return dish;
    }
    
    /**
     * 显示消息提示
     */
    function showMessage(message, duration = 2000) {
        console.log('显示消息:', message);
        
        let toast = document.querySelector('.toast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
    
    /**
     * 设置页面导航监听器
     */
    function setupNavigationListeners() {
        console.log('设置页面导航监听器');
        
        // 监听返回按钮
        const backButtons = document.querySelectorAll('.back-button, [onclick*="history.back"]');
        backButtons.forEach(button => {
            button.addEventListener('click', function() {
                setTimeout(updateSelectedDishes, 300);
            });
        });
        
        // 监听页面可见性变化
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                updateSelectedDishes();
            }
        });
    }

    function closeNutritionModal() {
        console.log('关闭营养分析模态框');
        hideNutritionSummary();
    }

    /**
     * 监听ESC键关闭模态框
     * @param {Event} e - 键盘事件
     */
    function closeOnEsc(e) {
        if (e.key === 'Escape') {
            hideNutritionSummary();
        }
    }

    // 初始化页面事件监听
    function initEventListeners() {
        const nutritionButton = document.getElementById('nutrition-button');
        if (nutritionButton) {
            nutritionButton.addEventListener('click', handleNutritionButtonClick);
        }
        
        const closeModalBtn = document.querySelector('.nutrition-modal .close-button');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeNutritionModal);
        }
        
        // 添加ESC键监听
        document.addEventListener('keydown', closeOnEsc);
    }

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', initEventListeners);
})(); 
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
    
    let modalOverlay = null;
    let nutritionSummaryModal = null;
    
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
        
        if (modalOverlay && nutritionSummaryModal) {
            return;
        }

        // 创建模态框遮罩层
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        document.querySelector('.menu-recognition-container').appendChild(modalOverlay);

        // 创建营养总结模态框
        nutritionSummaryModal = document.createElement('div');
        nutritionSummaryModal.className = 'nutrition-summary-modal';
        nutritionSummaryModal.innerHTML = `
            <div class="modal-header">
                <h3>营养分析</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-content">
                <div class="total-values">
                    <div class="total-calories">
                        <h4>总热量</h4>
                        <p class="value">0</p>
                        <p class="unit">卡路里</p>
                    </div>
                    <div class="glycemic-info">
                        <div class="glycemic-load">
                            <h4>血糖负荷 <i class="info-icon">i</i></h4>
                            <p class="value">0</p>
                            <p class="unit">GL</p>
                        </div>
                        <div class="glycemic-index">
                            <h4>平均血糖指数</h4>
                            <p class="value">0</p>
                            <p class="unit">GI</p>
                        </div>
                    </div>
                </div>
                <div class="macros">
                    <div class="macro protein">
                        <div class="macro-label">
                            <span class="macro-name">蛋白质</span>
                            <span class="macro-value">0g</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%; background-color: #4CAF50;"></div>
                        </div>
                    </div>
                    <div class="macro carbs">
                        <div class="macro-label">
                            <span class="macro-name">碳水化合物</span>
                            <span class="macro-value">0g</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%; background-color: #2196F3;"></div>
                        </div>
                    </div>
                    <div class="macro fat">
                        <div class="macro-label">
                            <span class="macro-name">脂肪</span>
                            <span class="macro-value">0g</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%; background-color: #FF9800;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.menu-recognition-container').appendChild(nutritionSummaryModal);

        // 关闭按钮点击事件
        const closeButton = nutritionSummaryModal.querySelector('.close-btn');
        closeButton.addEventListener('click', closeNutritionModal);

        // 点击模态框外部关闭
        modalOverlay.addEventListener('click', closeNutritionModal);

        // 点击模态框内部阻止事件冒泡
        nutritionSummaryModal.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // 添加血糖负荷信息图标点击事件
        const infoIcon = nutritionSummaryModal.querySelector('.info-icon');
        infoIcon.addEventListener('click', function() {
            alert('血糖负荷(GL)是一种评估食物对血糖影响的指标，由食物的血糖指数和碳水化合物含量共同决定。GL低于10为低，10-20为中等，大于20为高。');
        });

        // 添加ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeNutritionModal();
            }
        });
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
            let totalGL = 0;
            let weightedGI = 0;
            let totalCarbsForGI = 0;
            
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
                    
                    // 计算血糖负荷
                    const dishGL = ((dish.gi || 0) * (dish.carbs || 0)) / 100;
                    totalGL += dishGL;
                    
                    // 计算加权血糖指数
                    if (dish.carbs > 0 && dish.gi > 0) {
                        weightedGI += (dish.gi * dish.carbs);
                        totalCarbsForGI += dish.carbs;
                    }
                    
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
            
            // 计算平均血糖指数
            const avgGI = totalCarbsForGI > 0 ? Math.round(weightedGI / totalCarbsForGI) : 0;
            
            // 更新总卡路里
            const caloriesElement = document.querySelector('.total-calories .value');
            if (caloriesElement) {
                caloriesElement.textContent = Math.round(totalCalories);
            }
            
            // 更新宏量营养素
            updateMacronutrient('protein', totalProtein, nutritionData.proteinPercent);
            updateMacronutrient('carbs', totalCarbs, nutritionData.carbsPercent);
            updateMacronutrient('fat', totalFat, nutritionData.fatPercent);
            
            // 更新血糖负荷
            const chartText = document.querySelector('.chart-text');
            const chartValue = document.querySelector('.chart-value');
            const scoreValue = document.querySelector('.score-value');
            
            if (chartText) {
                chartText.textContent = Math.round(totalGL);
            }
            
            if (chartValue) {
                // 计算圆环进度
                const circumference = 2 * Math.PI * 45;
                const maxValue = 30;
                const value = Math.min(totalGL, maxValue);
                const percent = value / maxValue;
                const offset = circumference - (percent * circumference);
                
                chartValue.setAttribute('stroke-dasharray', `${circumference - offset}, ${offset}`);
                
                // 根据负荷值设置颜色
                if (totalGL <= 10) {
                    chartValue.setAttribute('stroke', '#4ECDC4'); // 绿色
                } else if (totalGL <= 20) {
                    chartValue.setAttribute('stroke', '#FFD166'); // 黄色
                } else {
                    chartValue.setAttribute('stroke', '#FF6B6B'); // 红色
                }
            }
            
            if (scoreValue) {
                scoreValue.textContent = nutritionData.glycemicCategory;
                
                // 根据类别设置颜色
                if (nutritionData.glycemicCategory === '低') {
                    scoreValue.style.color = '#4ECDC4'; // 绿色
                } else if (nutritionData.glycemicCategory === '中') {
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
        
        const selectedDishes = getSelectedDishes();
        
        if (selectedDishes.length === 0) {
            // 显示提示消息
            showToast("请至少选择一道菜品进行营养分析");
            return;
        }
        
        createModal();
        
        // 更新模态框内容
        updateModalContent(selectedDishes);
        
        // 显示模态框
        modalOverlay.classList.add('show');
        nutritionSummaryModal.classList.add('show');
        
        // 禁止菜单容器滚动
        document.querySelector('.menu-recognition-container').style.overflow = 'hidden';
    }
    
    /**
     * 创建营养分析模态框
     * @function
     * @description 如果模态框不存在，则创建模态框及相关UI元素
     */
    function createModal() {
        console.log('创建营养分析模态框');
        
        // 如果模态框已存在，则不需要再次创建
        if (modalOverlay && nutritionSummaryModal && 
            document.body.contains(modalOverlay) && 
            document.body.contains(nutritionSummaryModal)) {
            console.log('模态框已存在，无需重新创建');
            return;
        }
        
        // 创建模态框遮罩层
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'nutrition-overlay';
        modalOverlay.className = 'modal-overlay';
        document.querySelector('.menu-recognition-container').appendChild(modalOverlay);
        
        // 创建营养分析模态框
        nutritionSummaryModal = document.createElement('div');
        nutritionSummaryModal.id = 'nutrition-summary-modal';
        nutritionSummaryModal.className = 'nutrition-summary-modal';
        nutritionSummaryModal.innerHTML = `
            <div class="modal-header">
                <h3>营养分析</h3>
                <button id="close-nutrition-modal" class="close-button">&times;</button>
            </div>
            <div class="modal-content">
                <div class="nutrition-summary">
                    <div class="total-section">
                        <div class="total-calories">
                            <h4>总热量</h4>
                            <p class="value">0</p>
                            <p class="unit">卡路里</p>
                        </div>
                        <div class="glycemic-section">
                            <div class="glycemic-load">
                                <h4>血糖负荷 <i class="info-icon">i</i></h4>
                                <p class="value">0</p>
                                <p class="unit">GL</p>
                            </div>
                            <div class="glycemic-index">
                                <h4>平均血糖指数</h4>
                                <p class="value">0</p>
                                <p class="unit">GI</p>
                            </div>
                        </div>
                    </div>
                    <div class="macros">
                        <h4>营养素分布</h4>
                        <div class="macro protein">
                            <div class="macro-label">
                                <span class="macro-name">蛋白质</span>
                                <span class="macro-value">0g</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress" style="width: 0%; background-color: #4CAF50;"></div>
                            </div>
                        </div>
                        <div class="macro carbs">
                            <div class="macro-label">
                                <span class="macro-name">碳水化合物</span>
                                <span class="macro-value">0g</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress" style="width: 0%; background-color: #2196F3;"></div>
                            </div>
                        </div>
                        <div class="macro fat">
                            <div class="macro-label">
                                <span class="macro-name">脂肪</span>
                                <span class="macro-value">0g</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress" style="width: 0%; background-color: #FF9800;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.menu-recognition-container').appendChild(nutritionSummaryModal);
        
        // 添加事件监听器
        const closeButton = nutritionSummaryModal.querySelector('#close-nutrition-modal');
        if (closeButton) {
            closeButton.addEventListener('click', closeNutritionModal);
        }
        
        // 点击模态框外部关闭
        modalOverlay.addEventListener('click', closeNutritionModal);
        
        // 点击模态框内部阻止事件冒泡
        nutritionSummaryModal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // 添加信息图标点击事件
        const infoIcon = nutritionSummaryModal.querySelector('.info-icon');
        if (infoIcon) {
            infoIcon.addEventListener('click', function() {
                alert('血糖负荷(GL)是一种评估食物对血糖影响的指标，由食物的血糖指数和碳水化合物含量共同决定。GL低于10为低，10-20为中等，大于20为高。');
            });
        }
    }
    
    /**
     * 隐藏营养分析模态框
     * @function
     * @description 隐藏营养分析模态框并恢复背景滚动
     */
    function hideNutritionSummary() {
        console.log('隐藏营养分析模态框');
        
        if (modalOverlay && nutritionSummaryModal) {
            modalOverlay.classList.remove('show');
            nutritionSummaryModal.classList.remove('show');
            
            // 恢复菜单容器滚动
            document.querySelector('.menu-recognition-container').style.overflow = 'auto';
        }
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
    function showToast(message) {
        console.log("显示提示：" + message);
        
        // 检查是否已存在toast元素
        let toast = document.querySelector('.toast-message');
        
        if (!toast) {
            // 创建toast元素
            toast = document.createElement('div');
            toast.className = 'toast-message';
            document.querySelector('.menu-recognition-container').appendChild(toast);
        }
        
        // 设置消息内容
        toast.textContent = message;
        toast.classList.add('show');
        
        // 3秒后自动隐藏
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
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
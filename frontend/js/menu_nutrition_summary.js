/**
 * 菜单营养分析功能
 * Mindfood App - Menu Nutrition Summary
 * 
 * @version 1.1.0
 * @date 2025-04-19
 * @description 分析选择的菜品营养成分，并在底部弹出面板展示结果
 */

(function() {
    'use strict';

    console.log('营养分析功能脚本已加载');
    
    // 初始化变量
    let nutritionButton = null;
    let nutritionBadge = null;
    let selectedDishes = [];
    let initialized = false;

    // 监听DOM变化，确保在页面加载和动态变化时能够正确初始化
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // 判断是否在菜单结果页面
                if (document.querySelector('.menu-result-page') && !initialized) {
                    console.log('检测到菜单结果页面，初始化营养分析功能');
                    initNutritionFeature();
                }
            }
        }
    });

    // 开始观察DOM变化
    observer.observe(document.body, { childList: true, subtree: true });

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM加载完成，检查是否需要初始化营养分析功能');
        if (document.querySelector('.menu-result-page') && !initialized) {
            initNutritionFeature();
        }
    });

    // 监听页面变化事件
    document.addEventListener('pageChanged', (e) => {
        console.log('页面已变化:', e.detail.page);
        if (e.detail.page === 'menu-result-page' && !initialized) {
            initNutritionFeature();
        } else if (e.detail.page !== 'menu-result-page') {
            // 页面离开时重置状态
            initialized = false;
        }
    });

    /**
     * 初始化营养分析功能
     */
    function initNutritionFeature() {
        console.log('正在初始化营养分析功能...');
        
        // 检查样式表是否已加载
        ensureStylesheetLoaded();
        
        // 创建营养按钮
        const buttonContainer = document.querySelector('.bottom-actions');
        if (buttonContainer) {
            createNutritionButton(buttonContainer);
            
            // 监听菜品选择状态变化
            monitorDishSelection();
            
            // 标记为已初始化
            initialized = true;
            console.log('营养分析功能初始化完成');
        } else {
            console.warn('未找到底部操作栏，无法添加营养按钮');
        }
    }

    /**
     * 确保样式表已加载
     */
    function ensureStylesheetLoaded() {
        if (!document.querySelector('link[href*="menu_nutrition_summary.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '../css/menu_nutrition_summary.css';
            document.head.appendChild(link);
            console.log('营养分析样式表已加载');
        }
    }

    /**
     * 创建营养分析按钮
     * @param {HTMLElement} container - 放置按钮的容器
     */
    function createNutritionButton(container) {
        // 避免重复创建
        if (nutritionButton) return;
        
        // 创建按钮
        nutritionButton = document.createElement('button');
        nutritionButton.className = 'nutrition-summary-button';
        nutritionButton.setAttribute('aria-label', '查看营养分析');
        nutritionButton.innerHTML = `
            <svg class="nutrition-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11.5C20 15.6421 16.6421 19 12.5 19C8.35786 19 5 15.6421 5 11.5C5 7.35786 8.35786 4 12.5 4C16.6421 4 20 7.35786 20 11.5Z" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M5 5L2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M19 5L22 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="nutrition-badge" style="display: none;">0</span>
        `;
        
        // 添加点击事件
        nutritionButton.addEventListener('click', showNutritionSummary);
        
        // 将按钮添加到容器
        container.appendChild(nutritionButton);
        
        // 获取徽章元素
        nutritionBadge = nutritionButton.querySelector('.nutrition-badge');
        
        console.log('营养分析按钮已创建');
    }

    /**
     * 监听菜品选择状态变化
     */
    function monitorDishSelection() {
        // 选择所有的菜品添加按钮
        const dishButtons = document.querySelectorAll('.dish-add');
        
        // 为每个按钮添加点击事件监听
        dishButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 延迟执行以确保状态已更新
                setTimeout(updateNutritionBadge, 100);
            });
        });
        
        console.log(`已为${dishButtons.length}个菜品按钮添加监听`);
        
        // 初始更新徽章
        updateNutritionBadge();
    }

    /**
     * 更新营养分析按钮上的徽章
     */
    function updateNutritionBadge() {
        // 获取所有已选中的菜品
        selectedDishes = Array.from(document.querySelectorAll('.dish-card')).filter(card => {
            const addButton = card.querySelector('.dish-add');
            return addButton && addButton.classList.contains('active');
        });
        
        // 更新徽章
        if (nutritionBadge) {
            const count = selectedDishes.length;
            nutritionBadge.textContent = count;
            nutritionBadge.style.display = count > 0 ? 'flex' : 'none';
            
            console.log(`已选择${count}个菜品`);
        }
    }

    /**
     * 显示营养摘要面板
     */
    function showNutritionSummary() {
        console.log('显示营养摘要面板');
        
        // 更新选择的菜品列表
        updateNutritionBadge();
        
        // 创建覆盖层
        const overlay = document.createElement('div');
        overlay.className = 'nutrition-panel-overlay';
        
        // 创建营养摘要面板
        const panel = document.createElement('div');
        panel.className = 'nutrition-summary-panel';
        
        // 添加内容
        if (selectedDishes.length > 0) {
            panel.innerHTML = generateNutritionSummaryHTML(selectedDishes);
        } else {
            panel.innerHTML = generateEmptyStateHTML();
        }
        
        // 添加到DOM
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        
        // 添加动画效果
        setTimeout(() => {
            overlay.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 10);
        
        // 添加关闭事件
        setupCloseEvents(overlay, panel);
    }

    /**
     * 设置关闭面板的事件
     * @param {HTMLElement} overlay - 覆盖层元素
     * @param {HTMLElement} panel - 面板元素
     */
    function setupCloseEvents(overlay, panel) {
        // 点击关闭按钮
        const closeButton = panel.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => closePanel(overlay, panel));
        }
        
        // 点击覆盖层关闭
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePanel(overlay, panel);
            }
        });
        
        // 滑动关闭（适用于移动设备）
        let startY = 0;
        let currentY = 0;
        
        panel.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        panel.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diffY = currentY - startY;
            
            if (diffY > 0) {
                panel.style.transform = `translateY(${diffY}px)`;
                e.preventDefault();
            }
        });
        
        panel.addEventListener('touchend', () => {
            const diffY = currentY - startY;
            if (diffY > 100) {
                closePanel(overlay, panel);
            } else {
                panel.style.transform = 'translateY(0)';
            }
        });
    }

    /**
     * 关闭面板
     * @param {HTMLElement} overlay - 覆盖层元素
     * @param {HTMLElement} panel - 面板元素
     */
    function closePanel(overlay, panel) {
        panel.style.transform = 'translateY(100%)';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }

    /**
     * 生成营养摘要的HTML
     * @param {Array} dishes - 选择的菜品元素数组
     * @returns {string} HTML字符串
     */
    function generateNutritionSummaryHTML(dishes) {
        const nutritionData = calculateTotalNutrition(dishes);
        
        return `
            <div class="nutrition-header">
                <h2>营养分析</h2>
                <button class="close-button">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="selected-dishes-list">
                <h3>已选菜品 (${dishes.length})</h3>
                ${dishes.map(dish => {
                    const dishName = dish.querySelector('.dish-title')?.textContent || '未知菜品';
                    const calories = Math.floor(Math.random() * 300) + 100; // 模拟数据
                    return `
                        <div class="selected-dish-item">
                            <div class="dish-info">
                                <span class="dish-name">${dishName}</span>
                                <span class="dish-quantity">1份</span>
                            </div>
                            <div class="dish-calories">${calories} 千卡</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="nutrition-summary">
                <div class="total-calories">
                    <span class="label">总热量</span>
                    <span class="value">${nutritionData.calories} 千卡</span>
                </div>
                <div class="nutrition-breakdown">
                    <div class="nutrition-item">
                        <div class="nutrition-label">
                            <span class="label">蛋白质</span>
                            <span class="value">${nutritionData.protein}g</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${nutritionData.proteinPercent}%"></div>
                        </div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">
                            <span class="label">碳水化合物</span>
                            <span class="value">${nutritionData.carbs}g</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${nutritionData.carbsPercent}%"></div>
                        </div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-label">
                            <span class="label">脂肪</span>
                            <span class="value">${nutritionData.fat}g</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${nutritionData.fatPercent}%"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="health-score">
                <span class="label">健康评分</span>
                <span class="score-value" style="color: ${getHealthScoreColor(nutritionData.healthScore)}">
                    ${nutritionData.healthScore}
                </span>
                <span class="score-description">${getHealthScoreDescription(nutritionData.healthScore)}</span>
            </div>
        `;
    }

    /**
     * 生成空状态的HTML
     * @returns {string} HTML字符串
     */
    function generateEmptyStateHTML() {
        return `
            <div class="nutrition-header">
                <h2>营养分析</h2>
                <button class="close-button">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="no-dishes-selected">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M9 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M15 9H15.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>您尚未选择任何菜品</p>
                <p class="hint">请从菜单中选择您想要的菜品</p>
            </div>
        `;
    }

    /**
     * 计算总营养值
     * @param {Array} dishes - 选择的菜品元素数组
     * @returns {Object} 营养数据对象
     */
    function calculateTotalNutrition(dishes) {
        // 在真实应用中，这里应该从菜品数据中获取实际的营养信息
        // 这里使用模拟数据作为示例
        
        const count = dishes.length;
        const calories = Math.floor(Math.random() * 300 * count) + 100 * count;
        const protein = Math.floor(Math.random() * 10 * count) + 5 * count;
        const carbs = Math.floor(Math.random() * 30 * count) + 10 * count;
        const fat = Math.floor(Math.random() * 15 * count) + 5 * count;
        
        // 计算百分比，用于进度条显示
        const total = protein + carbs + fat;
        const proteinPercent = Math.round((protein / total) * 100);
        const carbsPercent = Math.round((carbs / total) * 100);
        const fatPercent = Math.round((fat / total) * 100);
        
        // 计算健康评分（1-100）
        const healthScore = Math.min(100, Math.floor(
            (protein * 2 - fat * 0.5 - Math.max(0, carbs - 50) * 0.3 + 50)
        ));
        
        return {
            calories,
            protein,
            carbs,
            fat,
            proteinPercent,
            carbsPercent,
            fatPercent,
            healthScore
        };
    }

    /**
     * 获取健康评分的颜色
     * @param {number} score - 健康评分
     * @returns {string} 颜色代码
     */
    function getHealthScoreColor(score) {
        if (score >= 80) return '#4caf50'; // 绿色
        if (score >= 60) return '#8bc34a'; // 浅绿色
        if (score >= 40) return '#ffc107'; // 黄色
        if (score >= 20) return '#ff9800'; // 橙色
        return '#f44336'; // 红色
    }

    /**
     * 获取健康评分的描述
     * @param {number} score - 健康评分
     * @returns {string} 描述文本
     */
    function getHealthScoreDescription(score) {
        if (score >= 80) return '非常健康的选择';
        if (score >= 60) return '健康均衡的膳食';
        if (score >= 40) return '营养基本均衡';
        if (score >= 20) return '营养略有不均';
        return '建议调整搭配';
    }

})(); 
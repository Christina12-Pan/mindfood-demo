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

        // 确保引入Tailwind CSS
        if (!document.querySelector('link[href*="tailwind"]')) {
            const tailwindLink = document.createElement('link');
            tailwindLink.rel = 'stylesheet';
            tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
            document.head.appendChild(tailwindLink);
        }

        // 创建模态框遮罩层
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        document.querySelector('.menu-recognition-container').appendChild(modalOverlay);

        // 创建营养总结模态框
        nutritionSummaryModal = document.createElement('div');
        nutritionSummaryModal.className = 'nutrition-summary-modal';
        nutritionSummaryModal.innerHTML = `
            <div class="modal-handle"></div>
            <div class="modal-header">
                <div class="modal-title">
                    <h3>Meal Nutrition</h3>
                </div>
                <button id="close-nutrition-modal" class="close-button ios-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            
            <div class="modal-content">
                <div class="health-score-container flex items-center justify-center p-4 bg-white rounded-xl shadow-md border border-gray-100 mb-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                    <div class="flex flex-col items-center text-center">
                        <div class="stars-container flex justify-center mb-2">
                            <div class="flex gap-0.5 transform hover:scale-105 transition-transform duration-200">
                                <span class="star text-xl text-gray-200" data-value="1">★</span>
                                <span class="star text-xl text-gray-200" data-value="2">★</span>
                                <span class="star text-xl text-gray-200" data-value="3">★</span>
                                <span class="star text-xl text-gray-200" data-value="4">★</span>
                                <span class="star text-xl text-gray-200" data-value="5">★</span>
                            </div>
                        </div>
                        <div class="health-score-details text-center">
                            <div class="flex items-center justify-center mb-1">
                                <h4 class="score-title text-base font-semibold text-gray-800 m-0">Good Match</h4>
                                <div class="ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium bg-opacity-90 score-badge bg-amber-100 text-amber-800 shadow-sm">Good</div>
                            </div>
                            <p class="score-description text-xs text-gray-600 m-0 leading-relaxed text-center">This meal aligns well with your health profile.</p>
                        </div>
                    </div>
                </div>
                
                <div class="meal-summary">
                    
                    <div class="nutrition-overview flex flex-col gap-5 p-4 bg-white rounded-xl shadow-md border border-gray-100 mb-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                        <div class="calorie-summary flex items-center justify-around">
                            <div class="calorie-ring-container relative w-[100px] h-[100px]">
                                <svg viewBox="0 0 120 120" class="calorie-ring">
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#F0F0F0" stroke-width="12"/>
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#FFBE98" stroke-width="12" 
                                        stroke-dasharray="339.292" stroke-dashoffset="254.469" class="calorie-progress"/>
                                </svg>
                                <div class="calorie-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div class="calorie-value text-2xl font-bold text-gray-800">0</div>
                                    <div class="calorie-label text-xs text-gray-500">cal</div>
                                </div>
                            </div>
                            <div class="remaining-calories text-sm text-gray-600">
                                <span class="remaining-value font-semibold text-amber-500">0</span> cal remaining
                            </div>
                        </div>
                        
                        <div class="macro-distribution flex flex-col gap-3">
                            <div class="macro-bar-container w-full">
                                <div class="macro-bar h-3 w-full flex rounded-full overflow-hidden">
                                    <div class="macro-segment protein-segment bg-green-500" style="width: 30%"></div>
                                    <div class="macro-segment carbs-segment bg-blue-500" style="width: 45%"></div>
                                    <div class="macro-segment fat-segment bg-amber-500" style="width: 25%"></div>
                                </div>
                            </div>
                            <div class="macro-legend flex justify-between">
                                <div class="macro-item flex items-center gap-1.5">
                                    <div class="macro-color w-3 h-3 rounded-sm bg-green-500"></div>
                                    <div class="macro-name text-xs text-gray-500">Protein</div>
                                    <div class="macro-amount protein-amount text-xs font-semibold text-gray-700">0g</div>
                                </div>
                                <div class="macro-item flex items-center gap-1.5">
                                    <div class="macro-color w-3 h-3 rounded-sm bg-blue-500"></div>
                                    <div class="macro-name text-xs text-gray-500">Carbs</div>
                                    <div class="macro-amount carbs-amount text-xs font-semibold text-gray-700">0g</div>
                                </div>
                                <div class="macro-item flex items-center gap-1.5">
                                    <div class="macro-color w-3 h-3 rounded-sm bg-amber-500"></div>
                                    <div class="macro-name text-xs text-gray-500">Fat</div>
                                    <div class="macro-amount fat-amount text-xs font-semibold text-gray-700">0g</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="health-insights p-4 bg-white rounded-xl shadow-md border border-gray-100 mb-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                        <h4 class="section-title text-base font-semibold text-gray-800 mb-3">Health Insights</h4>
                        <div class="insights-content flex flex-col gap-4">
                            <div class="insight-metric flex items-center gap-3">
                                <div class="metric-icon w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 12H7L10 19L14 5L17 12H21" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="metric-info flex-1">
                                    <div class="metric-name text-xs text-gray-500 flex items-center gap-1">
                                        <span>Glycemic Load</span>
                                        <i class="info-icon inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-200 text-white text-[9px] cursor-pointer">i</i>
                                    </div>
                                    <div class="metric-value glycemic-load-value text-sm font-semibold text-gray-700">0</div>
                                </div>
                                <div class="metric-rating flex flex-col items-end gap-1">
                                    <div class="rating-indicator low-rating text-xs font-semibold px-1.5 py-0.5 rounded bg-green-100 text-green-700">LOW</div>
                                </div>
                            </div>
                            
                            <div class="insight-metric flex items-center gap-3">
                                <div class="metric-icon w-8 h-8 flex items-center justify-center rounded-lg bg-green-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 10C5 8.89543 5.89543 8 7 8H17C18.1046 8 19 8.89543 19 10V14C19 15.1046 18.1046 16 17 16H7C5.89543 16 5 15.1046 5 14V10Z" stroke="#4CAF50" stroke-width="2"/>
                                        <path d="M12 8V6" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M12 18V16" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div class="metric-info flex-1">
                                    <div class="metric-name text-xs text-gray-500">Fiber</div>
                                    <div class="metric-value fiber-value text-sm font-semibold text-gray-700">0g</div>
                                </div>
                                <div class="metric-rating flex flex-col items-end gap-1">
                                    <div class="rating-progress-bar w-[70px] h-1.5 bg-gray-200 rounded-sm overflow-hidden">
                                        <div class="rating-progress h-full bg-amber-500" style="width: 20%"></div>
                                    </div>
                                    <div class="rating-target text-[10px] text-gray-400">of 25g daily target</div>
                                </div>
                            </div>
                            
                            <div class="insight-metric flex items-center gap-3">
                                <div class="metric-icon w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 13.5V12H20V13.5" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.5 8.5L12 4L17.5 8.5" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 4V20" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="metric-info flex-1">
                                    <div class="metric-name text-xs text-gray-500">Sodium</div>
                                    <div class="metric-value sodium-value text-sm font-semibold text-gray-700">0mg</div>
                                </div>
                                <div class="metric-rating flex flex-col items-end gap-1">
                                    <div class="rating-progress-bar w-[70px] h-1.5 bg-gray-200 rounded-sm overflow-hidden">
                                        <div class="rating-progress h-full bg-amber-500" style="width: 15%"></div>
                                    </div>
                                    <div class="rating-target text-[10px] text-gray-400">of 2300mg daily limit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-buttons flex gap-3 mb-6 mt-5">
                        <button class="action-button primary-button flex-1 py-4 rounded-xl text-base font-semibold border-none cursor-pointer flex justify-center items-center text-center max-w-[90%] mx-auto bg-amber-400 text-white shadow-md hover:bg-amber-500 hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200" id="add-to-diary-button">
                            Add to Log
                        </button>
                    </div>
                </div>
            </div>
            <style>
                .ios-style {
                    background-color: #FFFFFF;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
                    max-width: 100%;
                    width: 100%;
                    overflow-y: visible;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }
                
                .bottom-sheet {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transform: translateY(100%);
                    transition: transform 0.3s ease-in-out;
                    border-radius: 16px 16px 0 0;
                    z-index: 1001;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                
                .bottom-sheet.show {
                    transform: translateY(0);
                }
                
                .modal-handle {
                    width: 36px;
                    height: 5px;
                    background-color: #DDD;
                    border-radius: 3px;
                    margin: 12px auto 8px;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 4px 20px 16px;
                    border-bottom: 1px solid #F0F0F0;
                }
                
                .modal-title {
                    text-align: center;
                    flex: 1;
                }
                
                .modal-title h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #000000;
                }
                
                .ios-close {
                    background: none;
                    border: none;
                    padding: 4px;
                    cursor: pointer;
                    border-radius: 50%;
                }
                
                .modal-content {
                    padding: 16px;
                    overflow-y: visible;
                }
                
                .ios-card {
                    background-color: #F9F9F9;
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 16px;
                    border: 1px solid #EEEEEE;
                }
                
                .meal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }
                
                .meal-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                }
                
                .meal-time {
                    font-size: 14px;
                    padding: 4px 10px;
                    background-color: #FFBE98;
                    color: white;
                    border-radius: 12px;
                    font-weight: 500;
                }
                
                .nutrition-overview {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                
                .calorie-summary {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }
                
                .calorie-ring-container {
                    position: relative;
                    width: 120px;
                    height: 120px;
                }
                
                .calorie-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                }
                
                .calorie-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: #000;
                    line-height: 1;
                }
                
                .calorie-label {
                    font-size: 14px;
                    color: #888;
                }
                
                .remaining-calories {
                    font-size: 16px;
                    color: #555;
                }
                
                .remaining-value {
                    font-weight: 600;
                    color: #FFBE98;
                }
                
                .macro-distribution {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .macro-bar-container {
                    width: 100%;
                }
                
                .macro-bar {
                    height: 12px;
                    width: 100%;
                    display: flex;
                    border-radius: 6px;
                    overflow: hidden;
                }
                
                .macro-segment {
                    height: 100%;
                }
                
                .protein-segment {
                    background-color: #4CAF50;
                }
                
                .carbs-segment {
                    background-color: #2196F3;
                }
                
                .fat-segment {
                    background-color: #FFBE98;
                }
                
                .macro-legend {
                    display: flex;
                    justify-content: space-between;
                }
                
                .macro-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .macro-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                }
                
                .protein-color {
                    background-color: #4CAF50;
                }
                
                .carbs-color {
                    background-color: #2196F3;
                }
                
                .fat-color {
                    background-color: #FFBE98;
                }
                
                .macro-name {
                    font-size: 13px;
                    color: #555;
                }
                
                .macro-amount {
                    font-size: 13px;
                    font-weight: 600;
                    color: #333;
                }
                
                .section-title {
                    margin: 0 0 14px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                }
                
                .insights-content {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .insight-metric {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .metric-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .glycemic-icon {
                    background-color: rgba(255, 190, 152, 0.15);
                }
                
                .fiber-icon {
                    background-color: rgba(76, 175, 80, 0.15);
                }
                
                .sodium-icon {
                    background-color: rgba(255, 152, 0, 0.15);
                }
                
                .metric-info {
                    flex: 1;
                }
                
                .metric-name {
                    font-size: 14px;
                    color: #555;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .metric-value {
                    font-size: 15px;
                    font-weight: 600;
                    color: #333;
                }
                
                .info-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background-color: #DDD;
                    color: white;
                    font-size: 9px;
                    font-style: normal;
                    cursor: pointer;
                }
                
                .metric-rating {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 4px;
                }
                
                .rating-indicator {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 2px 6px;
                    border-radius: 4px;
                }
                
                .low-rating {
                    background-color: #EEFBEE;
                    color: #4CAF50;
                }
                
                .medium-rating {
                    background-color: #FFF8E1;
                    color: #FFC107;
                }
                
                .high-rating {
                    background-color: #FFEBEE;
                    color: #F44336;
                }
                
                .rating-progress-bar {
                    width: 70px;
                    height: 6px;
                    background-color: #EEEEEE;
                    border-radius: 3px;
                    overflow: hidden;
                }
                
                .rating-progress {
                    height: 100%;
                    background-color: #FFBE98;
                }
                
                .rating-target {
                    font-size: 10px;
                    color: #888;
                }
                
                .selected-dishes {
                    padding-bottom: 8px;
                }
                
                .dishes-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    max-height: 180px;
                    overflow-y: auto;
                }
                
                .action-buttons {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                    margin-top: 20px;
                }
                
                .action-button {
                    flex: 1;
                    padding: 16px 0;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    max-width: 90%;
                    margin: 0 auto;
                }
                
                .primary-button {
                    background-color: #FFBE98;
                    color: white;
                    box-shadow: 0 2px 5px rgba(255, 190, 152, 0.3);
                    transition: all 0.2s ease;
                }
                
                .primary-button:hover {
                    background-color: #FFA87D;
                    transform: translateY(-1px);
                }
                
                .primary-button:active {
                    transform: translateY(1px);
                    box-shadow: 0 1px 2px rgba(255, 190, 152, 0.3);
                }
                
                .secondary-button {
                    background-color: #F5F5F5;
                    color: #333;
                    border: 1px solid #DDDDDD;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(4px);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 1000;
                }
                
                .modal-overlay.show {
                    opacity: 1;
                }
            </style>
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
                    gi: dishHealth === 'green' ? 
                        Math.floor(Math.random() * 15) + 40 : // 低GI (40-55)
                        (dishHealth === 'yellow' ? 
                            Math.floor(Math.random() * 15) + 56 : // 中GI (56-70)
                            Math.floor(Math.random() * 15) + 71), // 高GI (71-85)
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
            let totalFiber = 0;
            let totalSodium = 0;
            let weightedGI = 0;
            let totalCarbsForGI = 0;
            
            // 每日推荐摄入值
            const dailyCalories = 2000; // 标准每日推荐摄入量
            const dailyFiber = 25; // 标准每日膳食纤维摄入量(g)
            const dailySodium = 2300; // 标准每日钠摄入限制(mg)
            
            // 累加营养值
            selectedDishes.forEach(dish => {
                // 累加基本营养值
                totalCalories += dish.calories || 0;
                totalProtein += dish.protein || 0;
                totalCarbs += dish.carbs || 0;
                totalFat += dish.fat || 0;
                
                // 累加其他营养成分
                totalFiber += dish.fiber || 0;
                totalSodium += dish.sodium || 0;
                
                // 计算血糖负荷
                const dishGL = ((dish.gi || 0) * (dish.carbs || 0)) / 100;
                totalGL += dishGL;
                
                // 计算加权血糖指数
                if (dish.carbs > 0 && dish.gi > 0) {
                    weightedGI += (dish.gi * dish.carbs);
                    totalCarbsForGI += dish.carbs;
                }
            });
            
            // 计算平均血糖指数
            const avgGI = totalCarbsForGI > 0 ? Math.round(weightedGI / totalCarbsForGI) : 0;
            
            // 计算卡路里占每日摄入量的百分比
            const caloriesPercent = Math.round((totalCalories / dailyCalories) * 100);
            const remainingCalories = dailyCalories - totalCalories;
            
            // 计算宏量营养素百分比
            const totalMacros = totalProtein + totalCarbs + totalFat;
            const proteinPercent = totalMacros > 0 ? Math.round((totalProtein / totalMacros) * 100) : 0;
            const carbsPercent = totalMacros > 0 ? Math.round((totalCarbs / totalMacros) * 100) : 0;
            const fatPercent = totalMacros > 0 ? Math.round((totalFat / totalMacros) * 100) : 0;
            
            // 更新卡路里显示
            const calorieValueElement = document.querySelector('.calorie-value');
            const remainingCaloriesElement = document.querySelector('.remaining-value');
            const calorieProgressElement = document.querySelector('.calorie-progress');
            
            if (calorieValueElement) {
                calorieValueElement.textContent = Math.round(totalCalories);
            }
            
            if (remainingCaloriesElement) {
                remainingCaloriesElement.textContent = Math.max(0, Math.round(remainingCalories));
            }
            
            if (calorieProgressElement) {
                // 更新圆环进度
                const circumference = 2 * Math.PI * 54;
                const percent = Math.min(caloriesPercent, 100) / 100;
                const offset = circumference * (1 - percent);
                
                calorieProgressElement.style.strokeDashoffset = offset;
                
                // 根据占比调整颜色
                let caloriesColor = '#4ECDC4'; // 绿色（低）
                if (caloriesPercent > 50) {
                    caloriesColor = caloriesPercent > 75 ? '#F44336' : '#FFC107'; // 红色（高）或黄色（中）
                }
                
                calorieProgressElement.style.stroke = caloriesColor;
            }
            
            // 更新宏量营养素分布
            updateMacroDistribution(proteinPercent, carbsPercent, fatPercent, totalProtein, totalCarbs, totalFat);
            
            // 更新血糖负荷
            const glycemicLoadElement = document.querySelector('.glycemic-load-value');
            const glycemicRatingElement = document.querySelector('.rating-indicator');
            
            if (glycemicLoadElement) {
                glycemicLoadElement.textContent = Math.round(totalGL);
                
                // 根据负荷值设置评级
                if (glycemicRatingElement) {
                    if (totalGL <= 10) {
                        glycemicRatingElement.textContent = 'LOW';
                        glycemicRatingElement.className = 'rating-indicator low-rating';
                    } else if (totalGL <= 20) {
                        glycemicRatingElement.textContent = 'MEDIUM';
                        glycemicRatingElement.className = 'rating-indicator medium-rating';
                    } else {
                        glycemicRatingElement.textContent = 'HIGH';
                        glycemicRatingElement.className = 'rating-indicator high-rating';
                    }
                }
            }
            
            // 更新膳食纤维
            const fiberValueElement = document.querySelector('.fiber-value');
            const fiberProgressElement = document.querySelector('.insight-metric:nth-child(2) .rating-progress');
            
            if (fiberValueElement) {
                fiberValueElement.textContent = `${totalFiber.toFixed(1)}g`;
                
                if (fiberProgressElement) {
                    const fiberPercent = Math.min(100, (totalFiber / dailyFiber) * 100);
                    fiberProgressElement.style.width = `${fiberPercent}%`;
                }
            }
            
            // 更新钠含量
            const sodiumValueElement = document.querySelector('.sodium-value');
            const sodiumProgressElement = document.querySelector('.insight-metric:nth-child(3) .rating-progress');
            
            if (sodiumValueElement) {
                sodiumValueElement.textContent = `${Math.round(totalSodium)}mg`;
                
                if (sodiumProgressElement) {
                    const sodiumPercent = Math.min(100, (totalSodium / dailySodium) * 100);
                    sodiumProgressElement.style.width = `${sodiumPercent}%`;
                }
            }
            
            // 计算健康评分
            let healthScore = calculateHealthScore(selectedDishes);
            updateHealthScore(healthScore);
            
            console.log('模态框内容更新完成');
        } catch (error) {
            console.error('更新模态框内容时出错:', error);
        }
    }
    
    /**
     * 更新宏量营养素分布
     */
    function updateMacroDistribution(proteinPercent, carbsPercent, fatPercent, proteinGrams, carbsGrams, fatGrams) {
        // 更新宏量营养素条形图
        const proteinSegment = document.querySelector('.protein-segment');
        const carbsSegment = document.querySelector('.carbs-segment');
        const fatSegment = document.querySelector('.fat-segment');
        
        if (proteinSegment && carbsSegment && fatSegment) {
            proteinSegment.style.width = `${proteinPercent}%`;
            carbsSegment.style.width = `${carbsPercent}%`;
            fatSegment.style.width = `${fatPercent}%`;
        }
        
        // 更新宏量营养素数值
        const proteinAmount = document.querySelector('.protein-amount');
        const carbsAmount = document.querySelector('.carbs-amount');
        const fatAmount = document.querySelector('.fat-amount');
        
        if (proteinAmount) {
            proteinAmount.textContent = `${Math.round(proteinGrams)}g`;
        }
        
        if (carbsAmount) {
            carbsAmount.textContent = `${Math.round(carbsGrams)}g`;
        }
        
        if (fatAmount) {
            fatAmount.textContent = `${Math.round(fatGrams)}g`;
        }
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
            showToast("Please select at least one dish for nutrition analysis");
            return;
        }
        
        createModal();
        
        // 更新模态框内容
        updateModalContent(selectedDishes);
        
        // 设置按钮事件
        setupActionButtons();
        
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
        
        // 获取菜单识别容器作为模态框的父容器
        const menuContainer = document.querySelector('.menu-recognition-container');
        if (!menuContainer) {
            console.error('无法找到菜单识别容器');
            return;
        }
        
        // 创建模态框遮罩层
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'nutrition-overlay';
        modalOverlay.className = 'modal-overlay';
        menuContainer.appendChild(modalOverlay);
        
        // 创建营养分析模态框
        nutritionSummaryModal = document.createElement('div');
        nutritionSummaryModal.id = 'nutrition-summary-modal';
        nutritionSummaryModal.className = 'nutrition-summary-modal ios-style bottom-sheet';
        nutritionSummaryModal.innerHTML = `
            <div class="modal-handle"></div>
            <div class="modal-header">
                <div class="modal-title">
                    <h3>Meal Nutrition</h3>
                </div>
                <button id="close-nutrition-modal" class="close-button ios-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            
            <div class="modal-content">
                <div class="health-score-container flex items-center justify-center p-4 bg-white rounded-xl shadow-md border border-gray-100 mb-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                    <div class="flex flex-col items-center text-center">
                        <div class="stars-container flex justify-center mb-2">
                            <div class="flex gap-0.5 transform hover:scale-105 transition-transform duration-200">
                                <span class="star text-xl text-gray-200" data-value="1">★</span>
                                <span class="star text-xl text-gray-200" data-value="2">★</span>
                                <span class="star text-xl text-gray-200" data-value="3">★</span>
                                <span class="star text-xl text-gray-200" data-value="4">★</span>
                                <span class="star text-xl text-gray-200" data-value="5">★</span>
                            </div>
                        </div>
                        <div class="health-score-details text-center">
                            <div class="flex items-center justify-center mb-1">
                                <h4 class="score-title text-base font-semibold text-gray-800 m-0">Good Match</h4>
                                <div class="ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium bg-opacity-90 score-badge bg-amber-100 text-amber-800 shadow-sm">Good</div>
                            </div>
                            <p class="score-description text-xs text-gray-600 m-0 leading-relaxed text-center">This meal aligns well with your health profile.</p>
                        </div>
                    </div>
                </div>
                
                <div class="meal-summary">
                    
                    <div class="nutrition-overview flex flex-col gap-5 p-4 bg-white rounded-xl shadow-md border border-gray-100 mb-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                        <div class="calorie-summary flex items-center justify-around">
                            <div class="calorie-ring-container relative w-[100px] h-[100px]">
                                <svg viewBox="0 0 120 120" class="calorie-ring">
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#F0F0F0" stroke-width="12"/>
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#FFBE98" stroke-width="12" 
                                        stroke-dasharray="339.292" stroke-dashoffset="254.469" class="calorie-progress"/>
                                </svg>
                                <div class="calorie-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div class="calorie-value text-2xl font-bold text-gray-800">0</div>
                                    <div class="calorie-label text-xs text-gray-500">cal</div>
                                </div>
                            </div>
                            <div class="remaining-calories text-sm text-gray-600">
                                <span class="remaining-value font-semibold text-amber-500">0</span> cal remaining
                            </div>
                        </div>
                        
                        <div class="macro-distribution flex flex-col gap-3">
                            <div class="macro-bar-container w-full">
                                <div class="macro-bar h-3 w-full flex rounded-full overflow-hidden">
                                    <div class="macro-segment protein-segment bg-green-500" style="width: 30%"></div>
                                    <div class="macro-segment carbs-segment bg-blue-500" style="width: 45%"></div>
                                    <div class="macro-segment fat-segment bg-amber-500" style="width: 25%"></div>
                                </div>
                            </div>
                            <div class="macro-legend flex justify-between">
                                <div class="macro-item flex items-center gap-1.5">
                                    <div class="macro-color w-3 h-3 rounded-sm bg-green-500"></div>
                                    <div class="macro-name text-xs text-gray-500">Protein</div>
                                    <div class="macro-amount protein-amount text-xs font-semibold text-gray-700">0g</div>
                                </div>
                                <div class="macro-item flex items-center gap-1.5">
                                    <div class="macro-color w-3 h-3 rounded-sm bg-blue-500"></div>
                                    <div class="macro-name text-xs text-gray-500">Carbs</div>
                                    <div class="macro-amount carbs-amount text-xs font-semibold text-gray-700">0g</div>
                                </div>
                                <div class="macro-item flex items-center gap-1.5">
                                    <div class="macro-color w-3 h-3 rounded-sm bg-amber-500"></div>
                                    <div class="macro-name text-xs text-gray-500">Fat</div>
                                    <div class="macro-amount fat-amount text-xs font-semibold text-gray-700">0g</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="health-insights p-4 bg-white rounded-xl shadow-md border border-gray-100 mb-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                        <h4 class="section-title text-base font-semibold text-gray-800 mb-3">Health Insights</h4>
                        <div class="insights-content flex flex-col gap-4">
                            <div class="insight-metric flex items-center gap-3">
                                <div class="metric-icon w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 12H7L10 19L14 5L17 12H21" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="metric-info flex-1">
                                    <div class="metric-name text-xs text-gray-500 flex items-center gap-1">
                                        <span>Glycemic Load</span>
                                        <i class="info-icon inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-200 text-white text-[9px] cursor-pointer">i</i>
                                    </div>
                                    <div class="metric-value glycemic-load-value text-sm font-semibold text-gray-700">0</div>
                                </div>
                                <div class="metric-rating flex flex-col items-end gap-1">
                                    <div class="rating-indicator low-rating text-xs font-semibold px-1.5 py-0.5 rounded bg-green-100 text-green-700">LOW</div>
                                </div>
                            </div>
                            
                            <div class="insight-metric flex items-center gap-3">
                                <div class="metric-icon w-8 h-8 flex items-center justify-center rounded-lg bg-green-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 10C5 8.89543 5.89543 8 7 8H17C18.1046 8 19 8.89543 19 10V14C19 15.1046 18.1046 16 17 16H7C5.89543 16 5 15.1046 5 14V10Z" stroke="#4CAF50" stroke-width="2"/>
                                        <path d="M12 8V6" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M12 18V16" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div class="metric-info flex-1">
                                    <div class="metric-name text-xs text-gray-500">Fiber</div>
                                    <div class="metric-value fiber-value text-sm font-semibold text-gray-700">0g</div>
                                </div>
                                <div class="metric-rating flex flex-col items-end gap-1">
                                    <div class="rating-progress-bar w-[70px] h-1.5 bg-gray-200 rounded-sm overflow-hidden">
                                        <div class="rating-progress h-full bg-amber-500" style="width: 20%"></div>
                                    </div>
                                    <div class="rating-target text-[10px] text-gray-400">of 25g daily target</div>
                                </div>
                            </div>
                            
                            <div class="insight-metric flex items-center gap-3">
                                <div class="metric-icon w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 13.5V12H20V13.5" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.5 8.5L12 4L17.5 8.5" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 4V20" stroke="#FF9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="metric-info flex-1">
                                    <div class="metric-name text-xs text-gray-500">Sodium</div>
                                    <div class="metric-value sodium-value text-sm font-semibold text-gray-700">0mg</div>
                                </div>
                                <div class="metric-rating flex flex-col items-end gap-1">
                                    <div class="rating-progress-bar w-[70px] h-1.5 bg-gray-200 rounded-sm overflow-hidden">
                                        <div class="rating-progress h-full bg-amber-500" style="width: 15%"></div>
                                    </div>
                                    <div class="rating-target text-[10px] text-gray-400">of 2300mg daily limit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-buttons flex gap-3 mb-6 mt-5">
                        <button class="action-button primary-button flex-1 py-4 rounded-xl text-base font-semibold border-none cursor-pointer flex justify-center items-center text-center max-w-[90%] mx-auto bg-amber-400 text-white shadow-md hover:bg-amber-500 hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200" id="add-to-diary-button">
                            Add to Log
                        </button>
                    </div>
                </div>
            </div>
            <style>
                .ios-style {
                    background-color: #FFFFFF;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
                    max-width: 100%;
                    width: 100%;
                    overflow-y: visible;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }
                
                .bottom-sheet {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transform: translateY(100%);
                    transition: transform 0.3s ease-in-out;
                    border-radius: 16px 16px 0 0;
                    z-index: 1001;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                
                .bottom-sheet.show {
                    transform: translateY(0);
                }
                
                .modal-handle {
                    width: 36px;
                    height: 5px;
                    background-color: #DDD;
                    border-radius: 3px;
                    margin: 12px auto 8px;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 4px 20px 16px;
                    border-bottom: 1px solid #F0F0F0;
                }
                
                .modal-title {
                    text-align: center;
                    flex: 1;
                }
                
                .modal-title h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #000000;
                }
                
                .ios-close {
                    background: none;
                    border: none;
                    padding: 4px;
                    cursor: pointer;
                    border-radius: 50%;
                }
                
                .modal-content {
                    padding: 16px;
                    overflow-y: visible;
                }
                
                .ios-card {
                    background-color: #F9F9F9;
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 16px;
                    border: 1px solid #EEEEEE;
                }
                
                .meal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }
                
                .meal-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                }
                
                .meal-time {
                    font-size: 14px;
                    padding: 4px 10px;
                    background-color: #FFBE98;
                    color: white;
                    border-radius: 12px;
                    font-weight: 500;
                }
                
                .nutrition-overview {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                
                .calorie-summary {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }
                
                .calorie-ring-container {
                    position: relative;
                    width: 120px;
                    height: 120px;
                }
                
                .calorie-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                }
                
                .calorie-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: #000;
                    line-height: 1;
                }
                
                .calorie-label {
                    font-size: 14px;
                    color: #888;
                }
                
                .remaining-calories {
                    font-size: 16px;
                    color: #555;
                }
                
                .remaining-value {
                    font-weight: 600;
                    color: #FFBE98;
                }
                
                .macro-distribution {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .macro-bar-container {
                    width: 100%;
                }
                
                .macro-bar {
                    height: 12px;
                    width: 100%;
                    display: flex;
                    border-radius: 6px;
                    overflow: hidden;
                }
                
                .macro-segment {
                    height: 100%;
                }
                
                .protein-segment {
                    background-color: #4CAF50;
                }
                
                .carbs-segment {
                    background-color: #2196F3;
                }
                
                .fat-segment {
                    background-color: #FFBE98;
                }
                
                .macro-legend {
                    display: flex;
                    justify-content: space-between;
                }
                
                .macro-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .macro-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                }
                
                .protein-color {
                    background-color: #4CAF50;
                }
                
                .carbs-color {
                    background-color: #2196F3;
                }
                
                .fat-color {
                    background-color: #FFBE98;
                }
                
                .macro-name {
                    font-size: 13px;
                    color: #555;
                }
                
                .macro-amount {
                    font-size: 13px;
                    font-weight: 600;
                    color: #333;
                }
                
                .section-title {
                    margin: 0 0 14px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                }
                
                .insights-content {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .insight-metric {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .metric-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .glycemic-icon {
                    background-color: rgba(255, 190, 152, 0.15);
                }
                
                .fiber-icon {
                    background-color: rgba(76, 175, 80, 0.15);
                }
                
                .sodium-icon {
                    background-color: rgba(255, 152, 0, 0.15);
                }
                
                .metric-info {
                    flex: 1;
                }
                
                .metric-name {
                    font-size: 14px;
                    color: #555;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .metric-value {
                    font-size: 15px;
                    font-weight: 600;
                    color: #333;
                }
                
                .info-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background-color: #DDD;
                    color: white;
                    font-size: 9px;
                    font-style: normal;
                    cursor: pointer;
                }
                
                .metric-rating {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 4px;
                }
                
                .rating-indicator {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 2px 6px;
                    border-radius: 4px;
                }
                
                .low-rating {
                    background-color: #EEFBEE;
                    color: #4CAF50;
                }
                
                .medium-rating {
                    background-color: #FFF8E1;
                    color: #FFC107;
                }
                
                .high-rating {
                    background-color: #FFEBEE;
                    color: #F44336;
                }
                
                .rating-progress-bar {
                    width: 70px;
                    height: 6px;
                    background-color: #EEEEEE;
                    border-radius: 3px;
                    overflow: hidden;
                }
                
                .rating-progress {
                    height: 100%;
                    background-color: #FFBE98;
                }
                
                .rating-target {
                    font-size: 10px;
                    color: #888;
                }
                
                .selected-dishes {
                    padding-bottom: 8px;
                }
                
                .dishes-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    max-height: 180px;
                    overflow-y: auto;
                }
                
                .action-buttons {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                    margin-top: 20px;
                }
                
                .action-button {
                    flex: 1;
                    padding: 16px 0;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    max-width: 90%;
                    margin: 0 auto;
                }
                
                .primary-button {
                    background-color: #FFBE98;
                    color: white;
                    box-shadow: 0 2px 5px rgba(255, 190, 152, 0.3);
                    transition: all 0.2s ease;
                }
                
                .primary-button:hover {
                    background-color: #FFA87D;
                    transform: translateY(-1px);
                }
                
                .primary-button:active {
                    transform: translateY(1px);
                    box-shadow: 0 1px 2px rgba(255, 190, 152, 0.3);
                }
                
                .secondary-button {
                    background-color: #F5F5F5;
                    color: #333;
                    border: 1px solid #DDDDDD;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(4px);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 1000;
                }
                
                .modal-overlay.show {
                    opacity: 1;
                }
            </style>
        `;
        
        menuContainer.appendChild(nutritionSummaryModal);
        
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
                alert('Glycemic Load (GL) measures how a food affects blood sugar levels, based on both its Glycemic Index and carbohydrate content. Low: <10, Medium: 10-20, High: >20.');
            });
        }
        
        // 添加手势滑动关闭功能
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        
        nutritionSummaryModal.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
            isDragging = true;
        });
        
        nutritionSummaryModal.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            // 只有向下滑动才响应
            if (deltaY > 0) {
                nutritionSummaryModal.style.transform = `translateY(${deltaY}px)`;
                e.preventDefault(); // 防止页面滚动
            }
        });
        
        nutritionSummaryModal.addEventListener('touchend', function() {
            if (!isDragging) return;
            const deltaY = currentY - startY;
            
            // 如果滑动距离超过模态框高度的20%，则关闭模态框
            if (deltaY > nutritionSummaryModal.offsetHeight * 0.2) {
                closeNutritionModal();
            } else {
                // 否则恢复原位
                nutritionSummaryModal.style.transform = '';
            }
            
            isDragging = false;
        });
    }
    
    /**
     * 隐藏营养分析模态框
     * @function
     * @description 隐藏营养分析模态框并恢复背景滚动
     */
    function hideNutritionSummary() {
        console.log('隐藏营养分析模态框');
        
        if (modalOverlay && nutritionSummaryModal) {
            // 添加过渡动画
            nutritionSummaryModal.style.transform = 'translateY(100%)';
            modalOverlay.classList.remove('show');
            
            // 等待动画完成后再隐藏类
            setTimeout(function() {
                nutritionSummaryModal.classList.remove('show');
                nutritionSummaryModal.style.transform = '';
                
                // 恢复菜单容器滚动
                document.querySelector('.menu-recognition-container').style.overflow = 'auto';
            }, 300);
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
                name: 'Steamed Bass',
                calories: 180,
                protein: 25,
                carbs: 2,
                fat: 8,
                fiber: 0.5,
                sodium: 320,
                glycemicLoad: 1,
                gi: 45,
                health: 'green'
            },
            {
                id: 'dish2',
                name: 'Broccoli Beef',
                calories: 320,
                protein: 28,
                carbs: 15,
                fat: 16,
                fiber: 4.2,
                sodium: 620,
                glycemicLoad: 6,
                gi: 50,
                health: 'green'
            },
            {
                id: 'dish3',
                name: 'Braised Pork Ribs',
                calories: 450,
                protein: 32,
                carbs: 20,
                fat: 25,
                fiber: 1.5,
                sodium: 840,
                glycemicLoad: 12,
                gi: 65,
                health: 'yellow'
            },
            {
                id: 'dish4',
                name: 'Tomato Egg Soup',
                calories: 120,
                protein: 8,
                carbs: 7,
                fat: 6,
                fiber: 1.8,
                sodium: 450,
                glycemicLoad: 3,
                gi: 40,
                health: 'green'
            },
            {
                id: 'dish5',
                name: 'Sweet & Sour Pork',
                calories: 380,
                protein: 22,
                carbs: 35,
                fat: 15,
                fiber: 1.2,
                sodium: 760,
                glycemicLoad: 22,
                gi: 75,
                health: 'red'
            }
        ];
        
        // 查找匹配的菜品
        const dish = dishes.find(dish => dish.id === id);
        
        // 如果找不到菜品，创建一个默认菜品
        if (!dish) {
            const dishItem = document.querySelector(`[data-dish-id="${id}"]`);
            if (dishItem) {
                const dishTitle = dishItem.querySelector('.dish-title')?.textContent || 'Unnamed Dish';
                const dishHealth = dishItem.getAttribute('data-health') || 'yellow';
                
                // 基于健康等级生成随机营养数据
                const isGreen = dishHealth === 'green';
                const isRed = dishHealth === 'red';
                
                // 创建默认菜品数据
                return {
                    id: id,
                    name: dishTitle,
                    health: dishHealth,
                    calories: Math.floor(Math.random() * 300) + 100,
                    protein: Math.floor(Math.random() * 20) + 5,
                    carbs: Math.floor(Math.random() * 40) + 10,
                    fat: Math.floor(Math.random() * 15) + 2,
                    fiber: isGreen ? (Math.random() * 3 + 2).toFixed(1) : (Math.random() * 2).toFixed(1),
                    sodium: isGreen ? 
                        Math.floor(Math.random() * 300) + 200 : 
                        (isRed ? Math.floor(Math.random() * 400) + 600 : Math.floor(Math.random() * 300) + 400),
                    gi: dishHealth === 'green' ? 
                        Math.floor(Math.random() * 15) + 40 : // 低GI (40-55)
                        (dishHealth === 'yellow' ? 
                            Math.floor(Math.random() * 15) + 56 : // 中GI (56-70)
                            Math.floor(Math.random() * 15) + 71), // 高GI (71-85)
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
            
            // 添加样式
            toast.style.position = 'fixed';
            toast.style.bottom = '80px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            toast.style.color = 'white';
            toast.style.padding = '12px 20px';
            toast.style.borderRadius = '20px';
            toast.style.fontSize = '14px';
            toast.style.fontWeight = '500';
            toast.style.zIndex = '10000';
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
        }
        
        // 设置消息内容
        toast.textContent = message;
        toast.style.opacity = '1';
        
        // 3秒后自动隐藏
        setTimeout(function() {
            toast.style.opacity = '0';
            
            // 等待消失动画完成后移除元素
            setTimeout(function() {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
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

    // 添加"添加到食物日记"按钮事件
    function setupActionButtons() {
        const addToLogButton = document.getElementById('add-to-diary-button');
        
        if (addToLogButton) {
            addToLogButton.addEventListener('click', function() {
                console.log('添加到日志');
                showToast("Meal added to your log!");
                closeNutritionModal();
            });
        }
    }

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', initEventListeners);

    // 添加健康评分计算和更新函数
    /**
     * 计算健康评分
     * @function
     * @param {Array} dishes - 选中的菜品数组
     * @returns {Object} 包含健康评分值和描述的对象
     */
    function calculateHealthScore(dishes) {
        // 基础分数
        let baseScore = 75;
        
        // 健康评分影响因素
        let proteinQuality = 0;
        let carbQuality = 0;
        let fatQuality = 0;
        let micronutrientScore = 0;
        
        // 根据菜品健康标签调整分数
        let greenCount = 0;
        let yellowCount = 0;
        let redCount = 0;
        
        dishes.forEach(dish => {
            if (dish.health === 'green') {
                greenCount++;
            } else if (dish.health === 'yellow') {
                yellowCount++;
            } else if (dish.health === 'red') {
                redCount++;
            }
            
            // 基于蛋白质含量添加分数
            if (dish.protein > 20) {
                proteinQuality += 2;
            }
            
            // 基于血糖负荷扣分
            if (dish.glycemicLoad > 20) {
                carbQuality -= 3;
            } else if (dish.glycemicLoad < 10) {
                carbQuality += 2;
            }
            
            // 根据膳食纤维添加分数
            if (dish.fiber > 3) {
                micronutrientScore += 2;
            }
        });
        
        // 根据菜品健康标签比例计算最终分数
        let totalDishes = dishes.length;
        let finalScore = baseScore;
        
        finalScore += (greenCount / totalDishes) * 15;
        finalScore += (yellowCount / totalDishes) * 0;
        finalScore -= (redCount / totalDishes) * 15;
        
        // 添加其他因素的分数
        finalScore += proteinQuality;
        finalScore += carbQuality;
        finalScore += fatQuality;
        finalScore += micronutrientScore;
        
        // 确保分数在0-100范围内
        finalScore = Math.max(0, Math.min(100, Math.round(finalScore)));
        
        // 确定评分描述
        let scoreTitle = '';
        let scoreDescription = '';
        
        if (finalScore >= 85) {
            scoreTitle = 'Excellent Match';
            scoreDescription = 'This meal is perfectly balanced for your health profile and nutrition goals.';
        } else if (finalScore >= 70) {
            scoreTitle = 'Good Match';
            scoreDescription = 'This meal aligns well with your health profile, supporting your nutritional goals.';
        } else if (finalScore >= 50) {
            scoreTitle = 'Moderate Match';
            scoreDescription = 'This meal is acceptable for your health profile but could be improved.';
        } else {
            scoreTitle = 'Poor Match';
            scoreDescription = 'This meal may not align with your health goals. Consider adjusting your selection.';
        }
        
        return {
            score: finalScore,
            title: scoreTitle,
            description: scoreDescription
        };
    }

    /**
     * 更新健康评分显示
     * @function
     * @param {Object} healthScore - 健康评分对象
     */
    function updateHealthScore(healthScore) {
        const scoreTitleElement = document.querySelector('.score-title');
        const scoreDescriptionElement = document.querySelector('.score-description');
        const starsContainer = document.querySelector('.stars-container');
        const scoreBadge = document.querySelector('.score-badge');
        
        if (scoreTitleElement) {
            scoreTitleElement.textContent = healthScore.title;
        }
        
        if (scoreDescriptionElement) {
            // 简化评分描述
            const simpleDescriptions = {
                'Excellent Match': 'Perfect for your health profile.',
                'Good Match': 'Aligns well with your health profile.',
                'Moderate Match': 'Acceptable for your health needs.',
                'Poor Match': 'Consider adjusting your selection.'
            };
            
            scoreDescriptionElement.textContent = simpleDescriptions[healthScore.title] || healthScore.description;
        }
        
        // 设置评分等级徽章
        if (scoreBadge) {
            let badgeClasses = '';
            let badgeText = '';
            
            if (healthScore.score >= 85) {
                badgeClasses = 'bg-green-100 text-green-800';
                badgeText = 'Excellent';
            } else if (healthScore.score >= 70) {
                badgeClasses = 'bg-amber-100 text-amber-800';
                badgeText = 'Good';
            } else if (healthScore.score >= 50) {
                badgeClasses = 'bg-yellow-100 text-yellow-800';
                badgeText = 'Moderate';
            } else {
                badgeClasses = 'bg-red-100 text-red-800';
                badgeText = 'Poor';
            }
            
            // 移除所有可能的颜色类
            scoreBadge.className = 'ml-2 px-2 py-1 rounded-full text-xs font-medium bg-opacity-10 score-badge';
            // 添加新的颜色类
            scoreBadge.classList.add(...badgeClasses.split(' '));
            scoreBadge.textContent = badgeText;
        }
        
        if (starsContainer) {
            // 将 0-100 的评分转换为 0-5 星
            const starRating = (healthScore.score / 100) * 5;
            const stars = starsContainer.querySelectorAll('.star');
            
            // 重置所有星星
            stars.forEach(star => {
                star.className = 'star text-2xl text-gray-200';
            });
            
            // 设置星星颜色
            let starColor = 'text-amber-400'; // 默认星星颜色
            
            if (healthScore.score < 50) {
                starColor = 'text-red-500'; // 红色（差）
            } else if (healthScore.score < 70) {
                starColor = 'text-yellow-500'; // 黄色（中）
            } else if (healthScore.score >= 85) {
                starColor = 'text-green-500'; // 绿色（优）
            }
            
            // 填充星星
            stars.forEach((star, index) => {
                const starValue = parseInt(star.getAttribute('data-value'));
                
                if (starValue <= Math.floor(starRating)) {
                    // 完全填充
                    star.classList.remove('text-gray-200');
                    star.classList.add(starColor);
                } else if (starValue === Math.ceil(starRating) && starRating % 1 > 0) {
                    // 处理半星情况 - 这需要特殊处理，因为Tailwind没有直接的半星样式
                    // 这里我们使用伪元素或特殊技巧创建半星效果
                    star.classList.remove('text-gray-200');
                    star.classList.add('relative', 'overflow-hidden');
                    
                    // 创建一个自定义属性，然后用CSS变量处理半星效果
                    star.style.background = `linear-gradient(to right, ${getColorHex(starColor)} 50%, #E5E7EB 50%)`;
                    star.style.webkitBackgroundClip = 'text';
                    star.style.backgroundClip = 'text';
                    star.style.color = 'transparent';
                }
            });
        }
    }

    /**
     * 将Tailwind颜色类转换为十六进制颜色代码
     * @param {string} colorClass - Tailwind颜色类名
     * @returns {string} 十六进制颜色代码
     */
    function getColorHex(colorClass) {
        const colorMap = {
            'text-amber-400': '#FBBF24',
            'text-red-500': '#EF4444',
            'text-yellow-500': '#F59E0B',
            'text-green-500': '#10B981'
        };
        
        return colorMap[colorClass] || '#FBBF24'; // 默认返回amber颜色
    }
})(); 
/**
 * @description 为除scan和Health Questionnaire页面外的其他9个页面添加背景图片
 * @author 高级iOS工程师
 * @version 1.3.0
 */
(function() {
    console.log('全局背景图片设置脚本已加载');
    
    // 避免重复应用
    let hasApplied = false;

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备添加全局背景图片');
        
        // 给页面加载一些时间，确保所有资源加载完成
        setTimeout(addGlobalBackground, 300);
        
        // 设置MutationObserver监听DOM变化
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
            // 清除之前的计时器
            clearTimeout(debounceTimer);
            
            // 设置新的计时器，延迟执行
            debounceTimer = setTimeout(function() {
                console.log('检测到DOM变化，重新应用背景');
                addGlobalBackground();
            }, 300);
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 判断页面是否应该应用背景
     * @param {HTMLElement} screen - 要检查的屏幕元素
     * @returns {boolean} 是否应该应用背景
     */
    function shouldApplyBackground(screen) {
        if (!screen) return false;
        
        // 获取页面ID
        const pageId = screen.getAttribute('data-page');
        
        // 不应用背景的页面列表
        const excludedPages = ['scan', 'questionnaire', 'health-questionnaire'];
        
        // 检查页面ID是否在排除列表中
        if (pageId && excludedPages.includes(pageId)) {
            return false;
        }
        
        // 检查是否为Health Questionnaire页面(即使没有正确的data-page属性)
        if (isHealthQuestionnairePage(screen)) {
            return false;
        }
        
        // 检查是否为Scan页面(即使没有正确的data-page属性)
        if (isScanPage(screen)) {
            return false;
        }
        
        return true;
    }
    
    /**
     * 判断元素是否为Health Questionnaire页面
     * @param {HTMLElement} element - 要检查的元素
     * @returns {boolean} 是否为Health Questionnaire页面
     */
    function isHealthQuestionnairePage(element) {
        // 检查元素内容中是否包含Health Questionnaire字样
        if (element.innerHTML && element.innerHTML.includes('Health Questionnaire')) {
            return true;
        }
        
        // 检查元素是否有特定标识
        if (element.getAttribute('data-page') === 'questionnaire' || 
            element.classList.contains('questionnaire-page')) {
            return true;
        }
        
        // 检查元素中是否有Questionnaire相关的标题
        const titles = element.querySelectorAll('h1, h2');
        for (let i = 0; i < titles.length; i++) {
            const titleText = titles[i].textContent.toLowerCase();
            if (titleText.includes('health questionnaire') || 
                titleText.includes('questionnaire') || 
                titleText.includes('health assessment')) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 判断元素是否为Scan页面
     * @param {HTMLElement} element - 要检查的元素
     * @returns {boolean} 是否为Scan页面
     */
    function isScanPage(element) {
        // 检查元素是否有特定标识
        if (element.getAttribute('data-page') === 'scan') {
            return true;
        }
        
        // 检查是否包含扫描界面特有元素
        if (element.querySelector('.camera-viewfinder') || 
            element.querySelector('.scan-button') ||
            element.querySelector('.capture-controls')) {
            return true;
        }
        
        // 检查是否有Menu Scanner文本
        const headings = element.querySelectorAll('h1, h2, h3');
        for (const heading of headings) {
            if (heading.textContent.includes('Menu Scanner')) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * 为所有页面添加全局背景图片
     */
    function addGlobalBackground() {
        // 检查是否已经添加了背景样式
        if (document.getElementById('app-background-style')) {
            console.log('背景样式已存在，更新样式');
            updateBackgroundStyle();
            return;
        }
        
        console.log('正在添加全局背景图片');
        
        try {
            // 创建样式元素
            const styleElement = document.createElement('style');
            styleElement.id = 'app-background-style';
            
            // 构建CSS样式内容
            const cssContent = `
                /* 全局背景设置 */
                .screen:not([data-page="scan"]):not(.questionnaire-screen) {
                    position: relative !important;
                }
                
                .screen:not([data-page="scan"]):not(.questionnaire-screen)::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url('frontend/resource/appbg.png');
                    background-size: cover;
                    background-position: center;
                    opacity: 0.08; /* 设置透明度为8% */
                    pointer-events: none; /* 确保背景不会干扰用户交互 */
                    z-index: 0; /* 将背景放在最底层 */
                }
                
                /* 专门为home页面设置背景，确保透明度为8% */
                .screen[data-page="home"]::before {
                    opacity: 0.08 !important; /* 确保home页面背景透明度为8% */
                }
                
                /* 确保所有内容在背景之上 */
                .screen:not([data-page="scan"]):not(.questionnaire-screen) > * {
                    position: relative;
                    z-index: 1;
                }
                
                /* 特别处理主页和dish-recognition页面 */
                .screen[data-page="home"] .bg-container,
                .screen[data-page="dish-recognition"] .bg-container {
                    display: none !important; /* 禁用冲突的背景容器 */
                }
                
                /* 移除默认的白色背景 */
                .screen[data-page="home"].bg-white,
                .screen[data-page="dish-recognition"].bg-white {
                    background-color: transparent !important;
                }
                
                /* 确保.home-redesigned-container添加的背景不与全局背景冲突 */
                .home-redesigned-container div[style*="background-image"] {
                    display: none !important;
                }
            `;
            
            styleElement.textContent = cssContent;
            
            // 将样式添加到文档头部
            document.head.appendChild(styleElement);
            
            console.log('全局背景图片添加成功');
            hasApplied = true;
            
            // 应用到所有现有的屏幕
            applyBackgroundToExistingScreens();
            
        } catch (error) {
            console.error('添加全局背景图片时出错:', error);
        }
    }
    
    /**
     * 更新背景样式
     */
    function updateBackgroundStyle() {
        const styleElement = document.getElementById('app-background-style');
        if (!styleElement) return;
        
        // 更新CSS内容
        const cssContent = `
            /* 全局背景设置 */
            .screen:not([data-page="scan"]):not(.questionnaire-screen) {
                position: relative !important;
            }
            
            .screen:not([data-page="scan"]):not(.questionnaire-screen)::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('frontend/resource/appbg.png');
                background-size: cover;
                background-position: center;
                opacity: 0.08; /* 设置透明度为8% */
                pointer-events: none; /* 确保背景不会干扰用户交互 */
                z-index: 0; /* 将背景放在最底层 */
            }
            
            /* 专门为home页面设置背景，确保透明度为8% */
            .screen[data-page="home"]::before {
                opacity: 0.08 !important; /* 确保home页面背景透明度为8% */
            }
            
            /* 确保所有内容在背景之上 */
            .screen:not([data-page="scan"]):not(.questionnaire-screen) > * {
                position: relative;
                z-index: 1;
            }
            
            /* 特别处理主页和dish-recognition页面 */
            .screen[data-page="home"] .bg-container,
            .screen[data-page="dish-recognition"] .bg-container {
                display: none !important; /* 禁用冲突的背景容器 */
            }
            
            /* 移除默认的白色背景 */
            .screen[data-page="home"].bg-white,
            .screen[data-page="dish-recognition"].bg-white {
                background-color: transparent !important;
            }
            
            /* 确保.home-redesigned-container添加的背景不与全局背景冲突 */
            .home-redesigned-container div[style*="background-image"] {
                display: none !important;
            }
        `;
        
        styleElement.textContent = cssContent;
        console.log('背景样式已更新');
    }
    
    /**
     * 应用背景到所有现有的屏幕
     */
    function applyBackgroundToExistingScreens() {
        const screens = document.querySelectorAll('.screen');
        let appliedCount = 0;
        
        screens.forEach(screen => {
            if (shouldApplyBackground(screen)) {
                // 移除可能存在的旧版背景容器
                const oldBgContainers = screen.querySelectorAll('.bg-container, [style*="background-image: url"]');
                oldBgContainers.forEach(container => {
                    if (container.parentNode === screen && 
                        !container.classList.contains('content-container') && 
                        !container.classList.contains('card')) {
                        console.log('移除旧版背景容器');
                        container.style.display = 'none';
                    }
                });
                
                // 确保正确的样式应用
                screen.style.position = 'relative';
                
                // 针对特定页面进行特殊处理
                if (screen.getAttribute('data-page') === 'home' || 
                    screen.getAttribute('data-page') === 'dish-recognition') {
                    // 查找可能存在的背景图容器
                    const possibleBgContainers = Array.from(screen.children).filter(child => {
                        const style = window.getComputedStyle(child);
                        return style.backgroundImage.includes('appbg.png');
                    });
                    
                    possibleBgContainers.forEach(bgContainer => {
                        console.log('发现并隐藏home/dish-recognition页面的重复背景容器');
                        bgContainer.style.display = 'none';
                    });
                }
                
                appliedCount++;
            }
        });
        
        console.log(`应用背景到 ${appliedCount} 个屏幕`);
    }
    
    // 外部调用的重新应用函数
    window.reapplyAppBackground = function() {
        console.log('外部调用重新应用背景');
        addGlobalBackground();
    };
    
    // 在首次页面显示后再次应用背景，处理动态加载的内容
    window.addEventListener('load', function() {
        setTimeout(addGlobalBackground, 500);
    });
    
    // 监听页面切换事件
    document.addEventListener('pageChanged', function(event) {
        console.log('页面切换事件触发，重新应用背景');
        setTimeout(addGlobalBackground, 100);
    });
    
})(); 
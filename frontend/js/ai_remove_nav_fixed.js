/**
 * @description AI助手页面导航栏修复脚本
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('AI助手导航栏修复脚本已加载');
    
    // 添加全局样式
    function addGlobalStyles() {
        console.log('添加全局样式');
        
        const style = document.createElement('style');
        style.textContent = `
            /* 隐藏AI助手页面的底部导航栏 */
            #aiAssistantScreen .nav-bottom {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                opacity: 0 !important;
                pointer-events: none !important;
                position: absolute !important;
                z-index: -999 !important;
            }
            
            /* 调整AI助手输入区域位置 */
            #aiAssistantScreen .ai-input-container {
                position: fixed !important;
                bottom: 0 !important; 
                left: 0 !important;
                right: 0 !important;
                z-index: 1000 !important;
                width: 100% !important;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
                background: white !important;
                padding: 10px !important;
            }
            
            /* 确保聊天内容不被输入框遮挡 */
            #aiAssistantScreen .chat-container {
                padding-bottom: 80px !important;
                overflow-y: auto !important;
                height: calc(100vh - 80px) !important;
            }
            
            /* 调整输入框样式 */
            #aiAssistantScreen .ai-input {
                width: 100% !important;
                border-radius: 20px !important;
                padding: 10px 15px !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log('全局样式已添加');
    }
    
    // 处理AI助手页面
    function handleAIAssistantPage() {
        console.log('处理AI助手页面');
        
        // 获取AI助手屏幕元素
        const aiScreen = document.getElementById('aiAssistantScreen');
        
        if (!aiScreen) {
            console.log('AI助手页面未找到，将等待DOM变化');
            return false;
        }
        
        console.log('找到AI助手页面，开始移除导航栏');
        
        // 尝试移除导航栏
        try {
            const navBar = aiScreen.querySelector('.nav-bottom');
            if (navBar) {
                console.log('找到导航栏，尝试移除');
                navBar.remove();
                console.log('导航栏已移除');
            } else {
                console.log('未找到导航栏元素，可能已被移除或隐藏');
            }
        } catch (error) {
            console.error('移除导航栏时出错:', error);
        }
        
        // 调整输入容器
        try {
            const inputContainer = aiScreen.querySelector('.ai-input-container');
            if (inputContainer) {
                console.log('调整输入容器位置');
                inputContainer.style.position = 'fixed';
                inputContainer.style.bottom = '0';
                inputContainer.style.zIndex = '1000';
                inputContainer.style.width = '100%';
                inputContainer.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';
            }
            
            // 确保聊天容器有足够的底部间距
            const chatContainer = aiScreen.querySelector('.chat-container');
            if (chatContainer) {
                console.log('调整聊天容器底部间距');
                chatContainer.style.paddingBottom = '80px';
            }
        } catch (error) {
            console.error('调整布局时出错:', error);
        }
        
        return true;
    }
    
    // 观察DOM变化
    function observeDOMChanges() {
        console.log('开始观察DOM变化');
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function() {
                // 检查AI助手页面是否存在
                if (document.getElementById('aiAssistantScreen')) {
                    handleAIAssistantPage();
                }
            });
        });
        
        // 配置观察选项
        observer.observe(document.body, { 
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style', 'id']
        });
        
        console.log('DOM变化观察器已启动');
    }
    
    // 初始化函数
    function init() {
        console.log('初始化导航栏修复');
        
        // 添加全局样式
        addGlobalStyles();
        
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                handleAIAssistantPage();
                observeDOMChanges();
            });
        } else {
            // DOM已加载完成
            handleAIAssistantPage();
            observeDOMChanges();
        }
    }
    
    // 执行初始化
    init();
})(); 
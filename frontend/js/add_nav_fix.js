/**
 * 导航栏修复加载器
 * 在页面加载完成后添加导航栏修复脚本
 */
(function() {
    console.log('导航栏修复加载器已初始化');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备添加导航栏修复脚本');
        
        // 创建脚本元素
        const script = document.createElement('script');
        script.src = 'frontend/js/ai_remove_nav_fixed.js';
        
        // 脚本加载成功回调
        script.onload = function() {
            console.log('导航栏修复脚本加载成功');
        };
        
        // 脚本加载失败回调
        script.onerror = function() {
            console.error('导航栏修复脚本加载失败，启用备用方案');
            applyInlineFix();
        };
        
        // 将脚本添加到文档头部
        document.head.appendChild(script);
    });
    
    // 备用内联修复方案
    function applyInlineFix() {
        console.log('应用内联导航栏修复');
        
        // 创建样式元素
        const style = document.createElement('style');
        style.textContent = `
            #aiAssistantScreen .nav-bottom {
                display: none !important;
            }
            #aiAssistantScreen .ai-input-container {
                position: fixed !important;
                bottom: 0 !important;
                z-index: 1000 !important;
                width: 100% !important;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
            }
            #aiAssistantScreen .chat-container {
                padding-bottom: 80px !important;
            }
        `;
        document.head.appendChild(style);
        
        // 监听DOM变化
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (document.querySelector('#aiAssistantScreen')) {
                    removeNavigationBar();
                }
            });
        });
        
        // 配置观察选项
        observer.observe(document.body, { 
            childList: true,
            subtree: true
        });
        
        // 尝试立即移除导航栏
        removeNavigationBar();
    }
    
    // 移除导航栏函数
    function removeNavigationBar() {
        const navBar = document.querySelector('#aiAssistantScreen .nav-bottom');
        if (navBar) {
            try {
                navBar.remove();
                console.log('导航栏已成功移除');
            } catch (e) {
                console.error('无法移除导航栏:', e);
            }
        }
    }
})(); 
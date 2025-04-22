/**
 * @description 修复导航栏的排版不均匀问题
 */
document.addEventListener('DOMContentLoaded', function() {
    // 等待其他脚本加载完成后执行
    setTimeout(function() {
        console.log('开始修复导航栏排版问题...');
        
        // 查找所有导航栏
        const navBars = document.querySelectorAll('.nav-bottom');
        
        navBars.forEach((navBar, index) => {
            console.log(`正在修复第${index + 1}个导航栏...`);
            
            // 修复导航栏的排版
            fixNavBarLayout(navBar);
        });
        
        console.log('导航栏排版修复完成');
    }, 2000); // 在其他脚本执行后延迟执行
});

/**
 * @description 修复导航栏的排版
 * @param {HTMLElement} navBar 导航栏元素
 */
function fixNavBarLayout(navBar) {
    // 获取所有导航项容器
    const navItemContainers = navBar.querySelectorAll('.flex.justify-between.items-center');
    
    navItemContainers.forEach(container => {
        // 设置容器样式，确保均匀分布
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.style.width = '100%';
        
        // 获取所有导航项
        const navItems = container.querySelectorAll('.flex.flex-col.items-center');
        
        // 设置每个导航项的样式
        navItems.forEach((item, i) => {
            // 重置之前可能已有的样式
            item.style.marginLeft = '';
            item.style.marginRight = '';
            
            // 设置宽度保证均匀分布
            item.style.flex = '1 1 0';
            item.style.textAlign = 'center';
            item.style.minWidth = '0';
            
            // 特殊处理Scan按钮，确保其居中且不受宽度约束影响
            if (item.getAttribute('data-page') === 'scan') {
                item.style.position = 'relative';
                
                // 获取Scan按钮中的圆形按钮
                const scanButton = item.querySelector('.w-14.h-14.bg-primary.rounded-full');
                if (scanButton) {
                    scanButton.style.position = 'absolute';
                    scanButton.style.left = '50%';
                    scanButton.style.transform = 'translateX(-50%)';
                }
            }
        });
        
        // 添加样式类来应用Flexbox布局
        if (!container.classList.contains('nav-fixed-layout')) {
            container.classList.add('nav-fixed-layout');
            
            // 创建样式元素，添加到文档头部
            const style = document.createElement('style');
            style.textContent = `
                .nav-fixed-layout {
                    display: flex !important;
                    justify-content: space-between !important;
                    width: 100% !important;
                    padding: 0 !important;
                }
                
                .nav-fixed-layout > div {
                    flex: 1 1 0 !important;
                    text-align: center !important;
                    min-width: 0 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                }
                
                .nav-fixed-layout > div[data-page="scan"] {
                    position: relative !important;
                }
                
                .nav-fixed-layout > div[data-page="scan"] .w-14 {
                    position: absolute !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                }
            `;
            document.head.appendChild(style);
            console.log('已添加导航栏样式修复');
        }
    });
} 
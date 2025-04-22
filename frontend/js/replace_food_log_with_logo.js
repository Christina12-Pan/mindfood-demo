/**
 * @description 替换Food Log文本为品牌logo
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('Food Log替换脚本已加载');

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备替换Food Log为品牌logo');
        
        // 延迟执行确保页面完全加载
        setTimeout(replaceFoodLogWithLogo, 300);
        
        // 设置MutationObserver监听DOM变化
        setupMutationObserver();
    });
    
    /**
     * 设置MutationObserver监听DOM变化
     */
    function setupMutationObserver() {
        console.log('设置DOM变化观察器');
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    replaceFoodLogWithLogo();
                }
            });
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 替换Food Log为品牌logo
     */
    function replaceFoodLogWithLogo() {
        console.log('尝试替换Food Log为品牌logo');
        
        // 查找所有Food Log文本的h1标签
        const foodLogElements = document.querySelectorAll('h1.text-xl.font-bold.text-dark');
        
        foodLogElements.forEach(function(element) {
            if (element.textContent.trim() === 'Food Log') {
                console.log('找到Food Log文本，准备替换为logo');
                
                // 清空当前内容
                element.innerHTML = '';
                
                // 创建logo图片元素
                const logoImg = document.createElement('img');
                logoImg.src = 'frontend/resource/LOGO_H.png';
                logoImg.alt = 'Mindfood Logo';
                logoImg.className = 'h-8';  // 设置合适的高度
                logoImg.style.objectFit = 'contain';
                
                // 将logo添加到h1元素中
                element.appendChild(logoImg);
                
                // 调整h1元素样式，适应logo
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.classList.remove('text-xl', 'font-bold', 'text-dark');
                
                console.log('已将Food Log替换为品牌logo');
            }
        });
        
        // 尝试寻找Log页面的screen元素
        const logScreens = document.querySelectorAll('.screen');
        logScreens.forEach(function(screen) {
            const foodLogHeader = screen.querySelector('h1');
            if (foodLogHeader && foodLogHeader.textContent.trim() === 'Food Log') {
                console.log('在页面中找到Food Log标题，准备替换为logo');
                
                // 清空当前内容
                foodLogHeader.innerHTML = '';
                
                // 创建logo图片元素
                const logoImg = document.createElement('img');
                logoImg.src = 'frontend/resource/LOGO_H.png';
                logoImg.alt = 'Mindfood Logo';
                logoImg.className = 'h-8';  // 设置合适的高度
                logoImg.style.objectFit = 'contain';
                
                // 将logo添加到h1元素中
                foodLogHeader.appendChild(logoImg);
                
                // 调整h1元素样式，适应logo
                foodLogHeader.style.display = 'flex';
                foodLogHeader.style.alignItems = 'center';
                foodLogHeader.classList.remove('text-xl', 'font-bold', 'text-dark');
                
                console.log('已将Food Log标题替换为品牌logo');
            }
        });
    }
})(); 
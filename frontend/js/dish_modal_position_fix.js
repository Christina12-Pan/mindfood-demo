/**
 * 修复订单模态框位置问题
 * 使模态框相对于Menu Result屏幕显示，而不是整个文档
 */
(function() {
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        // 监听模态框打开事件
        document.addEventListener('click', function(event) {
            // 检查是否点击了下单按钮
            if (event.target.matches('#show-order-modal') || 
                event.target.closest('#show-order-modal') || 
                event.target.matches('#cart-button') || 
                event.target.closest('#cart-button')) {
                
                // 延迟执行以确保模态框已经显示
                setTimeout(adjustModalPosition, 10);
            }
        });
    });

    /**
     * 调整模态框位置
     */
    function adjustModalPosition() {
        const modal = document.getElementById('order-modal');
        const menuResultScreen = document.querySelector('.screen[data-page="menu-recognition"]');
        
        if (!modal || !menuResultScreen) return;
        
        // 检查模态框是否已添加到屏幕容器中
        if (modal.parentElement === document.body) {
            // 获取原始模态框内容
            const modalContent = modal.querySelector('.order-modal-content');
            
            // 如果模态框是document.body的直接子元素，则移动到Menu Result屏幕内
            menuResultScreen.appendChild(modal);
            
            // 确保模态框在Menu Result屏幕内居中显示
            modal.style.position = 'absolute';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            
            // 通知控制台已修复模态框位置
            console.log('订单模态框位置已修复，现在相对于Menu Result屏幕显示');
        }
    }
    
    // 添加全局函数以便在其他脚本中调用
    window.adjustModalPosition = adjustModalPosition;
})(); 
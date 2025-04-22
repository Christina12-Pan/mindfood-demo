/**
 * @description 改进购物车模态框，使其在屏幕中央显示
 * @author Senior iOS Engineer
 * @version 1.0.0
 */
(function() {
    console.log('加载购物车模态框改进脚本');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('开始改进购物车模态框');
        
        // 检查订单模态框是否存在，如果不存在则创建
        let orderModal = document.getElementById('order-modal');
        if (!orderModal) {
            createOrderModal();
        } else {
            // 如果已存在，确保样式正确
            updateOrderModalStyle();
        }
        
        // 添加事件监听器
        addEventListeners();
        
        // 监听页面变化，确保在菜单识别结果页面上正确显示模态框
        document.addEventListener('pageChanged', function(e) {
            if (e.detail && e.detail.page === 'menu-recognition') {
                // 检查并确保订单模态框存在
                if (!document.getElementById('order-modal')) {
                    createOrderModal();
                }
            }
        });
        
        console.log('购物车模态框改进完成');
    });
    
    /**
     * 创建订单模态框
     */
    function createOrderModal() {
        console.log('创建订单模态框');
        
        // 创建模态框容器
        const orderModal = document.createElement('div');
        orderModal.id = 'order-modal';
        orderModal.className = 'order-modal';
        
        // 设置模态框内容
        orderModal.innerHTML = `
            <div class="order-modal-content">
                <div class="order-modal-header">
                    <div class="order-modal-title">Confirm Order</div>
                    <div class="close-button" id="close-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div class="order-modal-body">
                    <div class="order-items">
                        <div class="order-item">
                            <div class="order-item-info">
                                <div class="order-item-name">Mediterranean Grilled Salmon</div>
                                <div class="order-item-quantity">× 1</div>
                            </div>
                            <div class="order-item-price">$24.99</div>
                        </div>
                        <div class="order-item">
                            <div class="order-item-info">
                                <div class="order-item-name">Herb Grilled Shrimp</div>
                                <div class="order-item-quantity">× 1</div>
                            </div>
                            <div class="order-item-price">$18.99</div>
                        </div>
                    </div>
                    <div class="order-summary">
                        <div class="summary-row">
                            <div class="summary-label">Subtotal</div>
                            <div class="summary-value">$43.98</div>
                        </div>
                        <div class="summary-row">
                            <div class="summary-label">Service Fee</div>
                            <div class="summary-value">$2.00</div>
                        </div>
                        <div class="summary-row total">
                            <div class="summary-label">Total</div>
                            <div class="summary-value">$45.98</div>
                        </div>
                    </div>
                </div>
                <div class="order-modal-footer">
                    <button class="cancel-button" id="cancel-order">Cancel</button>
                    <button class="confirm-button" id="confirm-order">Confirm Order</button>
                </div>
            </div>
        `;
        
        // 将模态框添加到页面
        document.body.appendChild(orderModal);
        
        // 更新模态框样式
        updateOrderModalStyle();
        
        console.log('订单模态框创建完成');
    }
    
    /**
     * 更新订单模态框样式，确保在屏幕中央显示
     */
    function updateOrderModalStyle() {
        console.log('更新订单模态框样式');
        
        // 添加自定义样式
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* 订单模态框样式 */
            .order-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .order-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .order-modal-content {
                width: 85%;
                max-width: 320px;
                background-color: white;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .order-modal.show .order-modal-content {
                transform: scale(1) translateY(0);
            }
            
            /* 动画改进 */
            @keyframes modalPop {
                0% { transform: scale(0.8) translateY(30px); }
                70% { transform: scale(1.05) translateY(-5px); }
                100% { transform: scale(1) translateY(0); }
            }
            
            .order-modal.show .order-modal-content {
                animation: modalPop 0.4s ease forwards;
            }
        `;
        
        // 检查是否已存在样式元素
        const existingStyle = document.getElementById('order-modal-custom-style');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // 添加样式ID并附加到文档
        styleElement.id = 'order-modal-custom-style';
        document.head.appendChild(styleElement);
        
        console.log('订单模态框样式更新完成');
    }
    
    /**
     * 添加事件监听器
     */
    function addEventListeners() {
        console.log('为订单模态框添加事件监听器');
        
        // 为模态框背景添加点击事件，点击背景关闭模态框
        document.addEventListener('click', function(event) {
            const modal = document.getElementById('order-modal');
            if (modal && event.target === modal) {
                hideOrderModal();
            }
        });
        
        // 为关闭按钮添加点击事件
        document.addEventListener('click', function(event) {
            if (event.target.closest('#close-modal')) {
                hideOrderModal();
            }
        });
        
        // 为取消按钮添加点击事件
        document.addEventListener('click', function(event) {
            if (event.target.closest('#cancel-order')) {
                hideOrderModal();
            }
        });
        
        // 为确认按钮添加点击事件
        document.addEventListener('click', function(event) {
            if (event.target.closest('#confirm-order')) {
                hideOrderModal();
                showSuccessToast();
            }
        });
        
        // 同步现有的购物车和订单按钮点击事件
        document.addEventListener('click', function(event) {
            if (event.target.closest('#cart-button') || event.target.closest('#show-order-modal') || event.target.closest('#order-button')) {
                showOrderModal();
            }
        });
        
        console.log('订单模态框事件监听器添加完成');
    }
    
    /**
     * 显示订单模态框
     */
    function showOrderModal() {
        const modal = document.getElementById('order-modal');
        if (modal) {
            modal.classList.add('show');
            // 防止背景滚动
            document.body.style.overflow = 'hidden';
        }
    }
    
    /**
     * 隐藏订单模态框
     */
    function hideOrderModal() {
        const modal = document.getElementById('order-modal');
        if (modal) {
            modal.classList.remove('show');
            // 恢复背景滚动
            document.body.style.overflow = '';
        }
    }
    
    /**
     * 显示成功提示
     */
    function showSuccessToast() {
        // 检查是否已存在提示元素
        let toast = document.getElementById('success-toast');
        
        if (!toast) {
            // 创建提示元素
            toast = document.createElement('div');
            toast.id = 'success-toast';
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Order successfully submitted!
            `;
            document.body.appendChild(toast);
        }
        
        // 显示提示
        toast.classList.add('show');
        
        // 3秒后自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
})(); 
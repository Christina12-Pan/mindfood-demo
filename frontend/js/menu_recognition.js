/**
 * 菜单识别界面交互脚本
 * @author Claude
 * @version 1.0.0
 * @date 2025-04-18
 */

(function() {
    // 在DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        initMenuRecognitionPage();
    });

    /**
     * 初始化菜单识别页面
     */
    function initMenuRecognitionPage() {
        // 检查页面是否存在
        const menuRecognitionPage = document.querySelector('[data-page="menu-recognition"]');
        if (!menuRecognitionPage) {
            console.error('Menu recognition page not found');
            return;
        }

        console.log('Initializing menu recognition page');

        // 添加事件监听器
        addEventListeners();
    }

    /**
     * 添加事件监听器
     */
    function addEventListeners() {
        // 分类按钮点击事件
        const categoryButtons = document.querySelectorAll('.category-button');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有按钮的active类
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // 为当前点击的按钮添加active类
                this.classList.add('active');
                // 过滤菜品
                filterDishes(this.textContent.trim());
            });
        });

        // 菜品添加按钮点击事件
        const addButtons = document.querySelectorAll('.add-button');
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const dishCard = this.closest('.dish-card');
                const dishName = dishCard.querySelector('.dish-name').textContent;
                const dishPrice = dishCard.querySelector('.dish-price').textContent;
                
                // 更新购物车徽章数量
                updateCartBadge(1);
                
                // 显示添加成功提示
                showToast(`${dishName} added to your order`);
            });
        });

        // 购物车按钮点击事件
        const cartButton = document.getElementById('cart-button');
        if (cartButton) {
            cartButton.addEventListener('click', function() {
                showOrderModal();
            });
        }

        // 下单按钮点击事件
        const orderButton = document.getElementById('show-order-modal');
        if (orderButton) {
            orderButton.addEventListener('click', function() {
                showOrderModal();
            });
        }

        // 关闭模态框按钮点击事件
        const closeButton = document.getElementById('close-modal');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                hideOrderModal();
            });
        }

        // 取消订单按钮点击事件
        const cancelButton = document.getElementById('cancel-order');
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                hideOrderModal();
            });
        }

        // 确认订单按钮点击事件
        const confirmButton = document.getElementById('confirm-order');
        if (confirmButton) {
            confirmButton.addEventListener('click', function() {
                hideOrderModal();
                showSuccessToast();
                
                // 重置购物车徽章数量
                updateCartBadge(0);
            });
        }

        // 模态框背景点击事件 (点击背景关闭模态框)
        const orderModal = document.getElementById('order-modal');
        if (orderModal) {
            orderModal.addEventListener('click', function(event) {
                if (event.target === orderModal) {
                    hideOrderModal();
                }
            });
        }
    }

    /**
     * 过滤菜品
     * @param {string} category - 菜品分类
     */
    function filterDishes(category) {
        console.log(`Filtering dishes by category: ${category}`);
        
        // 这里可以根据实际情况实现菜品过滤逻辑
        // 例如，通过添加/移除CSS类来显示/隐藏不同分类的菜品
        const dishes = document.querySelectorAll('.dish-card');
        
        if (category === 'All') {
            // 显示所有菜品
            dishes.forEach(dish => {
                dish.style.display = 'block';
            });
        } else {
            // 模拟按分类过滤菜品
            // 在实际项目中，应该根据菜品的分类属性进行过滤
            dishes.forEach((dish, index) => {
                // 这里仅作演示，使用索引模拟不同分类
                const shouldShow = (
                    (category === 'Main Dishes' && (index === 1 || index === 2)) ||
                    (category === 'Appetizers' && (index === 0 || index === 3)) ||
                    (category === 'Sides' && index === 3) ||
                    (category === 'Desserts' && false) ||
                    (category === 'Drinks' && false)
                );
                
                dish.style.display = shouldShow ? 'block' : 'none';
            });
        }
    }

    /**
     * 更新购物车徽章数量
     * @param {number} delta - 数量变化，正数表示增加，负数表示减少，0表示重置
     */
    function updateCartBadge(delta) {
        const badge = document.querySelector('.cart-badge');
        if (!badge) return;
        
        if (delta === 0) {
            // 重置为0
            badge.textContent = '0';
            badge.style.display = 'none';
        } else {
            // 增加或减少数量
            let count = parseInt(badge.textContent) || 0;
            count += delta;
            badge.textContent = count.toString();
            badge.style.display = count > 0 ? 'flex' : 'none';
            
            // 更新底部栏中的已选商品数量和总价
            updateOrderSummary(count);
        }
    }

    /**
     * 更新订单摘要
     * @param {number} count - 已选择的商品数量
     */
    function updateOrderSummary(count) {
        const selectedDishes = document.querySelector('.selected-dishes');
        const totalPrice = document.querySelector('.total-price');
        
        if (selectedDishes && totalPrice) {
            selectedDishes.textContent = `${count} ${count === 1 ? 'item' : 'items'} selected`;
            // 这里使用一个简单的计算来模拟总价
            const price = count === 0 ? '0.00' : (count * 18.99).toFixed(2);
            totalPrice.textContent = `Total: $${price}`;
        }
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
        const toast = document.getElementById('success-toast');
        if (toast) {
            toast.classList.add('show');
            
            // 3秒后自动隐藏
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    /**
     * 显示通用提示
     * @param {string} message - 提示消息
     */
    function showToast(message) {
        // 检查是否已存在提示元素
        let toast = document.getElementById('toast-message');
        
        if (!toast) {
            // 创建提示元素
            toast = document.createElement('div');
            toast.id = 'toast-message';
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        
        // 设置提示消息
        toast.textContent = message;
        
        // 显示提示
        toast.classList.add('show');
        
        // 2秒后自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
})(); 
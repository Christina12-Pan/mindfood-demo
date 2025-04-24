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
        
        // 菜品卡片点击事件 - 显示详情面板
        const dishCards = document.querySelectorAll('.dish-card');
        dishCards.forEach(card => {
            card.addEventListener('click', function(event) {
                // 忽略如果点击的是添加按钮
                if (event.target.closest('.add-button')) {
                    return;
                }
                
                // 获取菜品信息
                const dishName = this.querySelector('.dish-name').textContent;
                console.log(`菜品卡片点击: ${dishName}`);
                
                // 调用详情面板函数 (来自dish_detail_panel.js)
                if (typeof window.showDishDetail === 'function') {
                    // 先尝试根据名称找到对应的dishId
                    if (typeof findDishIdByName === 'function') {
                        const dishId = findDishIdByName(dishName);
                        if (dishId) {
                            window.showDishDetail(dishId);
                        }
                    } else {
                        // 如果找不到函数，则直接传递一个模拟的ID
                        // 假设菜品ID以1开始递增
                        const index = Array.from(dishCards).indexOf(this);
                        window.showDishDetail((index + 1).toString());
                    }
                }
            });
        });
        
        // 交互式菜品项点击事件
        const dishItems = document.querySelectorAll('.dish-item');
        dishItems.forEach(item => {
            item.addEventListener('click', function(event) {
                // 忽略如果点击的是复选框
                if (event.target.closest('.dish-checkbox-container')) {
                    return;
                }
                
                // 获取菜品ID
                const dishId = this.getAttribute('data-dish-id');
                if (dishId && typeof window.showDishDetail === 'function') {
                    window.showDishDetail(dishId);
                }
            });
        });
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
            // 添加show类显示模态框
            modal.classList.add('show');
            
            // 获取Menu Recognition页面容器
            const menuScreen = document.querySelector('.screen[data-page="menu-recognition"]');
            if (menuScreen) {
                // 如果找到Menu Recognition页面，只阻止该页面内的滚动
                const menuContent = menuScreen.querySelector('.menu-content');
                if (menuContent) {
                    menuContent.style.overflow = 'hidden';
                }
                
                // 先确保模态框是Menu Recognition页面的子元素
                if (modal.parentElement !== menuScreen) {
                    // 如果不是，移动到Menu Recognition页面
                    menuScreen.appendChild(modal);
                }
                
                // 确保模态框在屏幕内居中显示
                modal.style.position = 'absolute';
                modal.style.zIndex = '2000';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                
                // 计算模态框内容的样式
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    // 重置之前可能存在的样式
                    modalContent.style.position = '';
                    modalContent.style.top = '';
                    modalContent.style.left = '';
                    modalContent.style.transform = '';
                    
                    // 获取手机壳的内部尺寸
                    const phoneInnerWidth = menuScreen.clientWidth; 
                    const phoneInnerHeight = menuScreen.clientHeight;
                    
                    // 设置模态框内容大小和溢出控制
                    modalContent.style.maxWidth = 'calc(100% - 40px)'; // 左右各留20px边距
                    modalContent.style.maxHeight = 'calc(100% - 80px)'; // 上下各留40px边距
                    modalContent.style.width = 'auto'; // 确保模态框不会撑满屏幕
                    modalContent.style.overflow = 'auto'; // 如果内容过多，允许滚动
                    modalContent.style.margin = '0 auto'; // 水平居中
                }
                
                // 调整订单列表部分，避免内容过多时溢出
                const orderList = modal.querySelector('.order-list');
                if (orderList) {
                    orderList.style.maxHeight = '40vh'; // 最多占屏幕高度的40%
                    orderList.style.overflowY = 'auto'; // 允许垂直滚动
                }
            } else {
                // 如果找不到Menu Recognition页面，则阻止整个文档的滚动（备用方案）
                document.body.style.overflow = 'hidden';
            }
        }
    }

    /**
     * 隐藏订单模态框
     */
    function hideOrderModal() {
        const modal = document.getElementById('order-modal');
        if (modal) {
            // 移除show类隐藏模态框
            modal.classList.remove('show');
            
            // 获取Menu Recognition页面容器
            const menuScreen = document.querySelector('.screen[data-page="menu-recognition"]');
            if (menuScreen) {
                // 如果找到Menu Recognition页面，恢复该页面内的滚动
                const menuContent = menuScreen.querySelector('.menu-content');
                if (menuContent) {
                    menuContent.style.overflow = 'auto';
                }
                
                // 清除之前设置的模态框样式
                modal.style.position = '';
                modal.style.top = '';
                modal.style.left = '';
                modal.style.width = '';
                modal.style.height = '';
                modal.style.zIndex = '';
                modal.style.display = '';
                modal.style.alignItems = '';
                modal.style.justifyContent = '';
                
                // 清除模态框内容的样式
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.position = '';
                    modalContent.style.top = '';
                    modalContent.style.left = '';
                    modalContent.style.transform = '';
                    modalContent.style.maxWidth = '';
                    modalContent.style.maxHeight = '';
                    modalContent.style.width = '';
                    modalContent.style.overflow = '';
                    modalContent.style.margin = '';
                }
                
                // 清除订单列表样式
                const orderList = modal.querySelector('.order-list');
                if (orderList) {
                    orderList.style.maxHeight = '';
                    orderList.style.overflowY = '';
                }
            } else {
                // 如果找不到Menu Recognition页面，则恢复整个文档的滚动（备用方案）
                document.body.style.overflow = '';
            }
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
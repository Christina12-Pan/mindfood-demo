/**
 * @fileoverview 外食管理功能界面 - 包含点餐决策、营养分析和多人用餐指导
 * @version 1.2.0
 */

// 对于mindfood_prototype.html中的整合，我们使用window加载事件代替DOMContentLoaded
// 原来的初始化代码仍然保留，以便在独立页面中使用
document.addEventListener('DOMContentLoaded', function() {
  // 初始化应用程序（当作为独立页面运行时）
  if (window.location.pathname.includes('dining_out_management.html')) {
    initApp();
  }
});

// 当从mindfood_prototype.html通过showScreen('dining-out-management')调用时，
// add_dining_out_management.js会调用这个函数
window.initApp = initApp;

/**
 * 初始化应用程序
 */
function initApp() {
  renderMainInterface();
  setupEventListeners();
}

/**
 * 渲染主界面
 */
function renderMainInterface() {
  const appContainer = document.getElementById('app');
  
  if (!appContainer) {
    console.error('无法找到应用容器元素');
    return;
  }

  appContainer.innerHTML = `
    <div class="flex flex-col min-h-screen bg-gray-50">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-xl font-semibold text-gray-800">MindFood</h1>
          <div class="flex items-center gap-4">
            <button id="profile-btn" class="w-8 h-8 rounded-full bg-[#FFBE98] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- 主内容区域 -->
      <main class="flex-1">
        <div class="container mx-auto px-4 py-6">
          <!-- 功能选择卡片 -->
          <div class="grid grid-cols-1 gap-4 mb-6">
            <button id="smart-ordering-btn" class="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div class="w-12 h-12 rounded-full bg-[#FFBE98] flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-lg font-medium text-gray-900">智能菜单扫描</h2>
                <p class="text-gray-600 text-sm">扫描菜单获取个性化推荐</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button id="group-dining-btn" class="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div class="w-12 h-12 rounded-full bg-[#FFBE98] flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-lg font-medium text-gray-900">多人用餐指导</h2>
                <p class="text-gray-600 text-sm">优化社交用餐体验</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- 动态内容区域 -->
          <div id="content-area" class="mb-16">
            <!-- 默认欢迎页面 -->
            <div class="text-center py-8">
              <div class="w-24 h-24 mx-auto bg-[#FFBE98] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800 mb-2">外食管理</h2>
              <p class="text-gray-600 mb-4">选择一个功能开始您的健康饮食之旅</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
  document.getElementById('smart-ordering-btn')?.addEventListener('click', function() {
    renderSmartOrderingInterface();
  });
  
  document.getElementById('group-dining-btn')?.addEventListener('click', function() {
    renderGroupDiningInterface();
  });
}

/**
 * 渲染智能点餐推荐界面
 */
function renderSmartOrderingInterface() {
  const contentArea = document.getElementById('content-area');
  
  if (!contentArea) {
    console.error('无法找到内容区域元素');
    return;
  }
  
  contentArea.innerHTML = `
    <div class="smart-ordering-container">
      <div class="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 class="text-xl font-semibold mb-4">智能菜单扫描</h2>
        
        <!-- 扫描入口 -->
        <div class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 mb-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
          <p class="text-gray-600 mb-3">拍摄或上传菜单</p>
          <button id="scan-menu-btn" class="bg-[#FFBE98] hover:bg-[#FFA77B] text-white font-medium py-2 px-4 rounded-lg transition duration-300">
            扫描菜单
          </button>
        </div>
        
        <!-- 最近扫描历史 -->
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-3">最近扫描</h3>
          <div class="space-y-3">
            <div class="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
              <div>
                <p class="font-medium">青叶家日料</p>
                <p class="text-sm text-gray-500">扫描于 2023-06-15</p>
              </div>
              <button class="text-[#FFBE98]">查看</button>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
              <div>
                <p class="font-medium">星巴克咖啡</p>
                <p class="text-sm text-gray-500">扫描于 2023-06-10</p>
              </div>
              <button class="text-[#FFBE98]">查看</button>
            </div>
          </div>
        </div>
        
        <!-- 推荐餐厅 -->
        <div>
          <h3 class="text-lg font-medium mb-3">推荐健康餐厅</h3>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-50 rounded-lg p-3">
              <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" class="w-full h-24 object-cover rounded-lg mb-2" alt="餐厅图片" />
              <p class="font-medium">沙拉工坊</p>
              <p class="text-xs text-gray-500">低糖 | 低脂 | 有机</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3">
              <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" class="w-full h-24 object-cover rounded-lg mb-2" alt="餐厅图片" />
              <p class="font-medium">绿色厨房</p>
              <p class="text-xs text-gray-500">素食 | 无麸质 | 生态</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 扫描结果示例 -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <h3 class="text-lg font-medium mb-3">扫描结果示例</h3>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">三文鱼牛油果沙拉</h4>
            <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">推荐</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>卡路里: 320 kcal</span>
            <span>蛋白质: 22g</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 mb-3">
            <span>脂肪: 18g</span>
            <span>碳水: 12g</span>
          </div>
          <p class="text-xs text-gray-500 mb-2">健康评分: 9/10</p>
          <p class="text-xs text-gray-500">富含omega-3脂肪酸和健康脂肪</p>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">炸鸡汉堡套餐</h4>
            <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">不推荐</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>卡路里: 880 kcal</span>
            <span>蛋白质: 32g</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 mb-3">
            <span>脂肪: 45g</span>
            <span>碳水: 78g</span>
          </div>
          <p class="text-xs text-gray-500 mb-2">健康评分: 3/10</p>
          <p class="text-xs text-gray-500">高热量、高脂肪，建议选择替代品</p>
          <div class="mt-3 pt-3 border-t border-gray-200">
            <p class="text-sm font-medium text-[#FFBE98] mb-1">更健康的替代选择:</p>
            <p class="text-xs text-gray-700">烤鸡肉三明治 (减少320卡路里)</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // 添加扫描菜单按钮的点击事件
  document.getElementById('scan-menu-btn')?.addEventListener('click', function() {
    // 在真实应用中，这里会调用相机API或文件选择器
    alert('相机功能正在开发中，请稍后再试！');
  });
}

/**
 * 渲染多人用餐指导界面
 */
function renderGroupDiningInterface() {
  const contentArea = document.getElementById('content-area');
  
  if (!contentArea) {
    console.error('无法找到内容区域元素');
    return;
  }
  
  contentArea.innerHTML = `
    <div class="group-dining-container">
      <div class="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 class="text-xl font-semibold mb-4">多人用餐指导</h2>
        
        <!-- 即将到来的聚餐 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">即将到来的聚餐</h3>
          
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-medium">家庭聚餐</h4>
                <p class="text-sm text-gray-500">6月20日，19:00</p>
              </div>
              <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">已计划</span>
            </div>
            <div class="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm text-gray-600">海鲜餐厅 - 城市广场</span>
            </div>
            <div class="flex mb-4">
              <div class="flex -space-x-2 mr-2">
                <img class="w-6 h-6 rounded-full border border-white" src="https://randomuser.me/api/portraits/women/12.jpg" alt="参与者">
                <img class="w-6 h-6 rounded-full border border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="参与者">
                <img class="w-6 h-6 rounded-full border border-white" src="https://randomuser.me/api/portraits/women/22.jpg" alt="参与者">
                <div class="w-6 h-6 rounded-full border border-white bg-gray-200 flex items-center justify-center">
                  <span class="text-xs text-gray-500">+2</span>
                </div>
              </div>
              <span class="text-xs text-gray-500 self-center">6位参与者</span>
            </div>
            <div class="flex space-x-2">
              <button id="view-plan-btn" class="flex-1 bg-[#FFBE98] hover:bg-[#FFA77B] text-white text-sm font-medium py-2 px-3 rounded-lg transition duration-300">
                查看聚餐计划
              </button>
              <button class="bg-white border border-gray-300 text-gray-600 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-300">
                编辑
              </button>
            </div>
          </div>
        </div>
        
        <!-- 创建新聚餐 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">创建新聚餐</h3>
          
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="mb-3">
              <label for="event-name" class="block text-sm font-medium text-gray-700 mb-1">聚餐名称</label>
              <input type="text" id="event-name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE98] focus:border-transparent" placeholder="例如：同事聚餐">
            </div>
            <div class="mb-3">
              <label for="event-date" class="block text-sm font-medium text-gray-700 mb-1">日期和时间</label>
              <input type="datetime-local" id="event-date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE98] focus:border-transparent">
            </div>
            <div class="mb-3">
              <label for="event-location" class="block text-sm font-medium text-gray-700 mb-1">地点</label>
              <input type="text" id="event-location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE98] focus:border-transparent" placeholder="餐厅名称或地址">
            </div>
            <div class="mb-4">
              <label for="event-participants" class="block text-sm font-medium text-gray-700 mb-1">参与者</label>
              <div class="flex items-center">
                <input type="text" id="event-participants" class="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFBE98] focus:border-transparent" placeholder="输入邮箱或用户名">
                <button class="bg-gray-200 text-gray-700 py-2 px-3 rounded-r-lg hover:bg-gray-300 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
            <button id="create-event-btn" class="w-full bg-[#FFBE98] hover:bg-[#FFA77B] text-white font-medium py-2 px-4 rounded-lg transition duration-300">
              创建聚餐计划
            </button>
          </div>
        </div>
      </div>
      
      <!-- 健康社交餐饮建议 -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <h3 class="text-lg font-medium mb-3">健康社交餐饮建议</h3>
        
        <!-- 建议卡片 -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-start">
              <div class="bg-[#FFBE98] rounded-full p-2 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium mb-1">提前查看菜单</h4>
                <p class="text-sm text-gray-600">在聚餐前查看餐厅菜单，提前选择健康的选项，避免冲动决策。</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-start">
              <div class="bg-[#FFBE98] rounded-full p-2 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium mb-1">共享菜品</h4>
                <p class="text-sm text-gray-600">选择共享菜品，可以品尝更多种类的食物，同时控制摄入量。</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-start">
              <div class="bg-[#FFBE98] rounded-full p-2 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium mb-1">特殊饮食需求</h4>
                <p class="text-sm text-gray-600">收集参与者的饮食限制和偏好，选择能满足所有人需求的餐厅。</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-start">
              <div class="bg-[#FFBE98] rounded-full p-2 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium mb-1">定制餐点</h4>
                <p class="text-sm text-gray-600">大多数餐厅可以根据要求定制餐点，不要犹豫向服务员询问健康替代选择。</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 查看更多建议按钮 -->
        <button id="view-more-tips-btn" class="w-full mt-4 bg-white border border-[#FFBE98] text-[#FFBE98] hover:bg-[#FFF5EE] font-medium py-2 px-4 rounded-lg transition duration-300">
          查看更多健康社交餐饮建议
        </button>
      </div>
    </div>
  `;
  
  // 添加查看聚餐计划按钮的点击事件
  document.getElementById('view-plan-btn')?.addEventListener('click', function() {
    alert('聚餐计划详情功能正在开发中，请稍后再试！');
  });
  
  // 添加创建聚餐计划按钮的点击事件
  document.getElementById('create-event-btn')?.addEventListener('click', function() {
    alert('创建聚餐计划功能正在开发中，请稍后再试！');
  });
  
  // 添加查看更多建议按钮的点击事件
  document.getElementById('view-more-tips-btn')?.addEventListener('click', function() {
    alert('更多健康社交餐饮建议功能正在开发中，请稍后再试！');
  });
} 
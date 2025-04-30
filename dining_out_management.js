/**
 * @fileoverview 外食管理功能界面 - 包含点餐决策、营养分析和多人用餐指导
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化应用程序
  initApp();
});

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
                <h2 class="text-lg font-medium text-gray-900">Smart Menu Scanner</h2>
                <p class="text-gray-600 text-sm">Scan menu and get personalized recommendations</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button id="nutrition-dashboard-btn" class="bg-white rounded-xl shadow-md p-4 flex items-center">
              <div class="w-12 h-12 rounded-full bg-[#FFBE98] flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-lg font-medium text-gray-900">Nutrition Dashboard</h2>
                <p class="text-gray-600 text-sm">Track nutrition data in real-time</p>
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
                <h2 class="text-lg font-medium text-gray-900">Group Dining Guide</h2>
                <p class="text-gray-600 text-sm">Optimize social dining experiences</p>
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
              <h2 class="text-2xl font-semibold text-gray-800 mb-2">Dining Out Management</h2>
              <p class="text-gray-600 mb-4">Select a feature to get started with your healthy dining journey.</p>
            </div>
          </div>
        </div>
      </main>

      <!-- 底部导航栏 -->
      <nav class="bg-white shadow-lg fixed bottom-0 w-full z-10">
        <div class="container mx-auto">
          <div class="flex justify-around py-3">
            <button class="flex flex-col items-center justify-center w-16">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="text-xs text-gray-400">Home</span>
            </button>
            <button class="flex flex-col items-center justify-center w-16">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#FFBE98]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              <span class="text-xs text-[#FFBE98]">Dining</span>
            </button>
            <button class="flex flex-col items-center justify-center w-16">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs text-gray-400">Stats</span>
            </button>
            <button class="flex flex-col items-center justify-center w-16">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-xs text-gray-400">Settings</span>
            </button>
          </div>
        </div>
      </nav>
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
  
  document.getElementById('nutrition-dashboard-btn')?.addEventListener('click', function() {
    renderNutritionDashboardInterface();
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
 * 渲染动态营养看板界面
 */
function renderNutritionDashboardInterface() {
  const contentArea = document.getElementById('content-area');
  
  if (!contentArea) {
    console.error('无法找到内容区域元素');
    return;
  }
  
  contentArea.innerHTML = `
    <div class="nutrition-dashboard-container">
      <div class="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 class="text-xl font-semibold mb-4">营养看板</h2>
        
        <!-- 今日摄入概览 -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-medium">今日摄入概览</h3>
            <span class="text-sm text-gray-500">2023年6月18日</span>
          </div>
          
          <!-- 卡路里进度 -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm font-medium">卡路里</span>
              <span class="text-sm text-gray-500">1,250 / 2,000 kcal</span>
            </div>
            <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-[#FFBE98] rounded-full" style="width: 62.5%"></div>
            </div>
          </div>
          
          <!-- 营养素网格 -->
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <p class="text-sm text-gray-500 mb-1">蛋白质</p>
              <p class="font-semibold">75g</p>
              <div class="h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
                <div class="h-full bg-blue-500 rounded-full" style="width: 80%"></div>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <p class="text-sm text-gray-500 mb-1">碳水</p>
              <p class="font-semibold">145g</p>
              <div class="h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
                <div class="h-full bg-yellow-500 rounded-full" style="width: 60%"></div>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <p class="text-sm text-gray-500 mb-1">脂肪</p>
              <p class="font-semibold">48g</p>
              <div class="h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
                <div class="h-full bg-red-500 rounded-full" style="width: 70%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 最近餐食记录 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">今日餐食记录</h3>
          
          <div class="space-y-3">
            <!-- 早餐 -->
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium">早餐</h4>
                <span class="text-xs text-gray-500">08:30 AM</span>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>全麦吐司</span>
                  <span class="text-gray-500">180 kcal</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>鳄梨</span>
                  <span class="text-gray-500">120 kcal</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>煮鸡蛋</span>
                  <span class="text-gray-500">70 kcal</span>
                </div>
              </div>
              <div class="flex justify-between mt-2 pt-2 border-t border-gray-200 text-sm">
                <span class="font-medium">总计</span>
                <span class="font-medium">370 kcal</span>
              </div>
            </div>
            
            <!-- 午餐 -->
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium">午餐</h4>
                <span class="text-xs text-gray-500">12:45 PM</span>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>三文鱼沙拉</span>
                  <span class="text-gray-500">320 kcal</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>全麦面包</span>
                  <span class="text-gray-500">120 kcal</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>混合莓果</span>
                  <span class="text-gray-500">90 kcal</span>
                </div>
              </div>
              <div class="flex justify-between mt-2 pt-2 border-t border-gray-200 text-sm">
                <span class="font-medium">总计</span>
                <span class="font-medium">530 kcal</span>
              </div>
            </div>
            
            <!-- 加餐 -->
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium">加餐</h4>
                <span class="text-xs text-gray-500">03:30 PM</span>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>希腊酸奶</span>
                  <span class="text-gray-500">150 kcal</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>坚果混合</span>
                  <span class="text-gray-500">200 kcal</span>
                </div>
              </div>
              <div class="flex justify-between mt-2 pt-2 border-t border-gray-200 text-sm">
                <span class="font-medium">总计</span>
                <span class="font-medium">350 kcal</span>
              </div>
            </div>
          </div>
          
          <!-- 添加餐食按钮 -->
          <button id="add-meal-btn" class="w-full mt-4 bg-[#FFBE98] hover:bg-[#FFA77B] text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            记录新餐食
          </button>
        </div>
      </div>
      
      <!-- 营养分析与建议 -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <h3 class="text-lg font-medium mb-3">营养分析与建议</h3>
        
        <!-- 营养摄入趋势图 -->
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 class="font-medium mb-3">本周摄入趋势</h4>
          <div class="h-40 bg-white rounded border border-gray-200 p-2 flex items-end justify-between">
            <div class="flex flex-col items-center w-1/7">
              <div class="bg-[#FFBE98] w-6 rounded-t" style="height: 50%"></div>
              <span class="text-xs mt-1">一</span>
            </div>
            <div class="flex flex-col items-center w-1/7">
              <div class="bg-[#FFBE98] w-6 rounded-t" style="height: 70%"></div>
              <span class="text-xs mt-1">二</span>
            </div>
            <div class="flex flex-col items-center w-1/7">
              <div class="bg-[#FFBE98] w-6 rounded-t" style="height: 60%"></div>
              <span class="text-xs mt-1">三</span>
            </div>
            <div class="flex flex-col items-center w-1/7">
              <div class="bg-[#FFBE98] w-6 rounded-t" style="height: 80%"></div>
              <span class="text-xs mt-1">四</span>
            </div>
            <div class="flex flex-col items-center w-1/7">
              <div class="bg-[#FFBE98] w-6 rounded-t" style="height: 65%"></div>
              <span class="text-xs mt-1">五</span>
            </div>
            <div class="flex flex-col items-center w-1/7">
              <div class="bg-[#FFBE98] w-6 rounded-t" style="height: 45%"></div>
              <span class="text-xs mt-1">六</span>
            </div>
            <div class="flex flex-col items-center w-1/7">
              <div class="bg-[#FFBE98] w-6 rounded-t" style="height: 62%"></div>
              <span class="text-xs mt-1">日</span>
            </div>
          </div>
        </div>
        
        <!-- 营养建议 -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="font-medium mb-2">个性化营养建议</h4>
          <ul class="space-y-2">
            <li class="text-sm flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>您今天的蛋白质摄入达标，很好地支持了肌肉健康。</span>
            </li>
            <li class="text-sm flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>您的膳食纤维摄入略低，建议增加全谷物和蔬菜摄入。</span>
            </li>
            <li class="text-sm flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>您的水分摄入低于目标，建议每天至少饮用2升水。</span>
            </li>
          </ul>
          
          <button id="view-full-analysis-btn" class="w-full mt-4 bg-white border border-[#FFBE98] text-[#FFBE98] hover:bg-[#FFF5EE] font-medium py-2 px-4 rounded-lg transition duration-300">
            查看完整分析
          </button>
        </div>
      </div>
    </div>
  `;
  
  // 添加记录新餐食按钮的点击事件
  document.getElementById('add-meal-btn')?.addEventListener('click', function() {
    alert('记录餐食功能正在开发中，请稍后再试！');
  });
  
  // 添加查看完整分析按钮的点击事件
  document.getElementById('view-full-analysis-btn')?.addEventListener('click', function() {
    alert('完整营养分析功能正在开发中，请稍后再试！');
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
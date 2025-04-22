/**
 * @description 创建菜品识别页面，增强用户使用体验
 * @author Senior iOS Engineer
 * @version 2.0.0
 */
(function() {
  console.log('Dish Recognition page creation script loaded');
  
  // 等待DOM完全加载
  document.addEventListener('DOMContentLoaded', function() {
    createDishRecognitionPage();
  });
  
  /**
   * 创建菜品识别页面并添加到DOM中
   */
  function createDishRecognitionPage() {
    console.log('Creating Dish Recognition page');
    
    // 检查页面是否已存在
    const existingPage = document.querySelector('.screen[data-page="dish-recognition"]');
    if (existingPage) {
      console.log('Dish Recognition page already exists');
      return;
    }
    
    // 创建页面容器
    const dishRecognitionScreen = document.createElement('div');
    dishRecognitionScreen.className = 'screen';
    dishRecognitionScreen.setAttribute('data-page', 'dish-recognition');
    dishRecognitionScreen.style.position = 'relative';
    dishRecognitionScreen.style.display = 'flex';
    dishRecognitionScreen.style.flexDirection = 'column';
    // 移除可变高度设置
    // dishRecognitionScreen.style.height = '100vh';
    // dishRecognitionScreen.style.maxHeight = '100vh';
    // 使用固定尺寸，与其他页面一致
    dishRecognitionScreen.style.width = '375px';
    dishRecognitionScreen.style.height = '812px';
    dishRecognitionScreen.style.overflow = 'hidden';
    dishRecognitionScreen.style.backgroundColor = 'transparent'; // 确保背景是透明的
    
    // 清除可能干扰全局背景的属性
    setTimeout(() => {
      if (window.reapplyAppBackground) {
        window.reapplyAppBackground();
      }
    }, 100);
    
    // 设置页面HTML内容
    dishRecognitionScreen.innerHTML = `
      <!-- iOS风格的状态栏 -->
      <div class="ios-status-bar bg-white flex justify-between items-center px-4 pt-2 pb-1">
        <div class="time text-sm font-medium">9:41</div>
        <div class="icons flex items-center space-x-1.5">
          <div class="signal">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H18V12H16V0ZM11 3H13V12H11V3ZM6 6H8V12H6V6ZM1 9H3V12H1V9Z" fill="black"/>
            </svg>
          </div>
          <div class="wifi">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00001 9.52219C8.58001 9.52219 9.05334 9.99552 9.05334 10.5755C9.05334 11.1555 8.58001 11.6289 8.00001 11.6289C7.42001 11.6289 6.94668 11.1555 6.94668 10.5755C6.94668 9.99552 7.42001 9.52219 8.00001 9.52219Z" fill="black"/>
              <path d="M8 6.11108C9.26667 6.11108 10.4333 6.60441 11.3 7.47108L12.5933 6.17775C11.3933 4.97775 9.77333 4.29108 8 4.29108C6.22667 4.29108 4.60667 4.97775 3.40667 6.17775L4.7 7.47108C5.56667 6.60441 6.73333 6.11108 8 6.11108Z" fill="black"/>
              <path d="M14.6533 4.11772C12.9533 2.41772 10.5533 1.45105 8.00001 1.45105C5.44668 1.45105 3.04668 2.41772 1.34668 4.11772L2.64001 5.41105C4.00668 4.04439 5.92668 3.27105 8.00001 3.27105C10.0733 3.27105 11.9933 4.04439 13.36 5.41105L14.6533 4.11772Z" fill="black"/>
            </svg>
          </div>
          <div class="battery">
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.35" x="0.833374" y="0.833374" width="21" height="10.3333" rx="2.16667" stroke="black"/>
              <path opacity="0.4" d="M23.3334 4V8C24.1381 7.66122 24.6613 6.87313 24.6613 6C24.6613 5.12687 24.1381 4.33878 23.3334 4Z" fill="black"/>
              <rect x="2.33337" y="2.33337" width="18" height="7.33333" rx="1.33333" fill="black"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 顶部导航栏 - 更现代的设计 -->
      <div class="header bg-white flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <button class="back-button w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-800">Dish Analysis</h1>
        <div class="w-10 h-10"></div>
      </div>

      <!-- 主内容区域 - 重新设计的滚动容器 -->
      <div class="dish-recognition-content flex-1 bg-gray-50 flex flex-col h-full relative" style="overflow:hidden;">
        <!-- 顶部菜品图像区域 - 更大的图片展示，支持滑动多个菜品 -->
        <div class="dish-image-container h-48 bg-black relative overflow-hidden">
          <div class="dishes-slider flex h-full w-full overflow-x-hidden snap-x snap-mandatory touch-pan-x">
            <!-- 菜品1 -->
            <div class="dish-slide w-full h-full flex-shrink-0 snap-center relative">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" alt="Food dish" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
              
              <!-- 菜品定位标记 - 圆形 -->
              <div class="dish-marker absolute top-1/4 left-1/4 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <span class="text-white font-bold">1</span>
                </div>
                <div class="marker-pulse absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></div>
              </div>
              
              <!-- 重新拍摄按钮 -->
              <button class="retake-photo-button absolute top-4 right-4 flex items-center px-3 py-2 bg-black bg-opacity-60 rounded-full text-white text-xs font-medium">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Retake this dish
              </button>
              
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div class="flex items-center justify-between">
                  <h3 class="dish-name font-bold text-lg mb-1 cursor-pointer active:opacity-70">Grilled Salmon with Vegetables</h3>
                  <div class="px-2 py-1 rounded-full bg-yellow-500 bg-opacity-20 text-yellow-100 text-xs">
                    <span>3 dishes detected</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 菜品2 - 同一张照片中的不同菜品 -->
            <div class="dish-slide w-full h-full flex-shrink-0 snap-center relative">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" alt="Food dish" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
              
              <!-- 菜品定位标记 - 圆形 -->
              <div class="dish-marker absolute top-1/2 right-1/3 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <span class="text-white font-bold">2</span>
                </div>
                <div class="marker-pulse absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></div>
              </div>
              
              <!-- 重新拍摄按钮 -->
              <button class="retake-photo-button absolute top-4 right-4 flex items-center px-3 py-2 bg-black bg-opacity-60 rounded-full text-white text-xs font-medium">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Retake this dish
              </button>
              
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div class="flex items-center justify-between">
                  <h3 class="dish-name font-bold text-lg mb-1 cursor-pointer active:opacity-70">Vegetable Salad</h3>
                  <div class="px-2 py-1 rounded-full bg-yellow-500 bg-opacity-20 text-yellow-100 text-xs">
                    <span>3 dishes detected</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 菜品3 - 同一张照片中的不同菜品 -->
            <div class="dish-slide w-full h-full flex-shrink-0 snap-center relative">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" alt="Food dish" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
              
              <!-- 菜品定位标记 - 圆形 -->
              <div class="dish-marker absolute bottom-1/3 right-1/4 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <span class="text-white font-bold">3</span>
                </div>
                <div class="marker-pulse absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></div>
              </div>
              
              <!-- 重新拍摄按钮 -->
              <button class="retake-photo-button absolute top-4 right-4 flex items-center px-3 py-2 bg-black bg-opacity-60 rounded-full text-white text-xs font-medium">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Retake this dish
              </button>
              
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div class="flex items-center justify-between">
                  <h3 class="dish-name font-bold text-lg mb-1 cursor-pointer active:opacity-70">Fruit Dessert</h3>
                  <div class="px-2 py-1 rounded-full bg-yellow-500 bg-opacity-20 text-yellow-100 text-xs">
                    <span>3 dishes detected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 滑动提示 -->
          <div class="swipe-hint absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-sm opacity-0 pointer-events-none animate-fade-out">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Swipe to view other dishes</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
          
          <!-- 分页指示器 - iOS样式轮播指示器 -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center z-10">
            <div class="dish-indicators flex items-center justify-center space-x-2 bg-black bg-opacity-30 px-3 py-1.5 rounded-full">
              <div class="w-3 h-3 rounded-full bg-white opacity-100 transition-all duration-300 ease-in-out"></div>
              <div class="w-2 h-2 rounded-full bg-white opacity-50 transition-all duration-300 ease-in-out"></div>
              <div class="w-2 h-2 rounded-full bg-white opacity-50 transition-all duration-300 ease-in-out"></div>
            </div>
          </div>
        </div>
        
        <!-- 内容区域标签指示当前查看的菜品 -->
        <div class="dish-indicator flex items-center px-4 py-2 bg-white border-b border-gray-100">
          <div class="dish-indicator-dot w-3 h-3 rounded-full bg-[#FFBE98] mr-2"></div>
          <div class="text-sm text-gray-600">
            <span class="font-medium">Viewing dish <span class="current-dish-index">1</span> of <span class="total-dishes">3</span></span>
            <button class="ml-1 text-[#FFBE98]">View all dishes in photo</button>
          </div>
        </div>
        
        <!-- 内容滚动区域 - 卡片式布局，注意滚动区域不包含底部操作区 -->
        <div class="analysis-content flex-1 overflow-auto px-4 py-3 pb-36">
          <!-- 卡片：健康评分 -->
          <div class="health-score-card bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
            <div class="p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-800">Health Score</h3>
                <div class="flex items-center">
                  <!-- 五星评分系统 -->
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- iOS风格评分条 -->
              <div class="mb-4">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs font-medium text-gray-500">Poor</span>
                  <span class="text-xs font-medium text-gray-500">Excellent</span>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-red-400 to-green-500 rounded-full" style="width: 85%"></div>
                </div>
              </div>
              
              <!-- 健康评估 -->
              <h3 class="font-bold text-gray-800 mb-1.5">Very Good for You</h3>
              <p class="text-sm text-gray-600 mb-3">This dish is high in protein and nutrients, making it suitable for your diabetes management.</p>
              <div class="flex flex-wrap gap-2">
                <div class="px-2.5 py-1.5 rounded-full bg-green-100 text-green-800 text-xs inline-flex items-center">
                  <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                  <span>Low Glycemic</span>
                </div>
                <div class="px-2.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs inline-flex items-center">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                  <span>High Protein</span>
                </div>
                <div class="px-2.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs inline-flex items-center">
                  <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span>
                  <span>Nutrient Rich</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 卡片：营养摘要 -->
          <div class="nutrition-card bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
            <div class="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 class="font-semibold text-gray-800">Nutrition Summary</h3>
              <button class="text-[#FFBE98] text-sm font-medium">See Details</button>
            </div>
            
            <!-- 营养数据可视化 -->
            <div class="px-4 pb-4">
              <div class="flex mb-4">
                <!-- 卡路里圆环 -->
                <div class="calorie-ring w-24 h-24 relative flex items-center justify-center mr-4">
                  <svg class="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" stroke-width="8"></circle>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#FFBE98" stroke-width="8" stroke-dasharray="14 100" stroke-linecap="round" stroke-dashoffset="25" transform="rotate(-90 50 50)"></circle>
                    <text x="50" y="40" text-anchor="middle" font-size="22" font-weight="bold" fill="#111827">195</text>
                    <text x="50" y="58" text-anchor="middle" font-size="10" fill="#6b7280">of 1,399</text>
                    <text x="50" y="72" text-anchor="middle" font-size="8" fill="#9ca3af">KCAL</text>
                  </svg>
                  
                  <!-- 卡路里百分比指示 -->
                  <div class="absolute -bottom-1 left-0 right-0 text-center">
                    <span class="text-xs text-[#FFBE98] font-medium"></span>
                  </div>
                </div>
                
                <!-- 营养条 -->
                <div class="flex-1 flex flex-col justify-around">
                  <!-- 蛋白质 -->
                  <div class="nutrient-bar mb-2">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-xs font-medium">Protein</span>
                      <span class="text-xs">25g</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-blue-500 rounded-full" style="width: 70%"></div>
                    </div>
                  </div>
                  
                  <!-- 碳水 -->
                  <div class="nutrient-bar mb-2">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-xs font-medium">Carbs</span>
                      <span class="text-xs">10g</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-yellow-500 rounded-full" style="width: 15%"></div>
                    </div>
                  </div>
                  
                  <!-- 脂肪 -->
                  <div class="nutrient-bar">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-xs font-medium">Fat</span>
                      <span class="text-xs">9g</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-green-500 rounded-full" style="width: 30%"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 其他关键营养素 -->
              <div class="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                <div class="text-center py-2">
                  <div class="text-sm font-bold text-gray-800">2g</div>
                  <div class="text-xs text-gray-500">Sugar</div>
                </div>
                <div class="text-center py-2 border-x border-gray-100">
                  <div class="text-sm font-bold text-gray-800">8g</div>
                  <div class="text-xs text-gray-500">Fiber</div>
                </div>
                <div class="text-center py-2">
                  <div class="text-sm font-bold text-gray-800">280mg</div>
                  <div class="text-xs text-gray-500">Sodium</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 卡片：饮食建议 -->
          <div class="guidance-card bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
            <div class="p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800 text-lg">Smart Guidance</h3>
                <div class="px-2.5 py-1 rounded-full bg-[#FFBE98]/10 text-[#FFBE98] text-xs font-medium">
                  AI Recommended
                </div>
              </div>
              
              <!-- 建议项目 - 优先蛋白质 -->
              <div class="guidance-item flex items-start mb-5">
                <div class="guidance-icon flex-shrink-0 w-10 h-10 rounded-full bg-[#FFBE98]/10 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800 mb-1">Prioritize Protein</h4>
                  <p class="text-gray-600 text-sm">Eat the salmon first to promote better glucose control. The protein helps slow digestion.</p>
                </div>
              </div>
              
              <!-- 建议项目 - 慢慢咀嚼 -->
              <div class="guidance-item flex items-start mb-5">
                <div class="guidance-icon flex-shrink-0 w-10 h-10 rounded-full bg-[#FFBE98]/10 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800 mb-1">Eat Slowly</h4>
                  <p class="text-gray-600 text-sm">Chewing slowly increases satiety and reduces post-meal glucose spikes.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 卡片：成分细节 -->
          <div class="ingredients-card bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
            <div class="p-4">
              <div class="flex justify-between items-center mb-3">
                <h3 class="font-semibold text-gray-800">Ingredients</h3>
                <button class="edit-ingredients-button p-1 rounded-full hover:bg-gray-100">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
              </div>
              
              <div class="ingredients-grid grid grid-cols-2 gap-2">
                <div class="ingredient-item flex items-center p-2 bg-gray-50 rounded-lg">
                  <div class="w-2 h-2 rounded-full bg-[#FFBE98] mr-2"></div>
                  <span class="text-sm ingredient-name">Salmon (120g)</span>
                </div>
                <div class="ingredient-item flex items-center p-2 bg-gray-50 rounded-lg">
                  <div class="w-2 h-2 rounded-full bg-[#FFBE98] mr-2"></div>
                  <span class="text-sm ingredient-name">Broccoli (50g)</span>
                </div>
                <div class="ingredient-item flex items-center p-2 bg-gray-50 rounded-lg">
                  <div class="w-2 h-2 rounded-full bg-[#FFBE98] mr-2"></div>
                  <span class="text-sm ingredient-name">Sweet Potato (40g)</span>
                </div>
                <div class="ingredient-item flex items-center p-2 bg-gray-50 rounded-lg">
                  <div class="w-2 h-2 rounded-full bg-[#FFBE98] mr-2"></div>
                  <span class="text-sm ingredient-name">Olive Oil (5g)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 底部操作区 - 使用absolute定位固定在Dish Analysis屏幕底部 -->
        <div class="action-section bg-white border-t border-gray-100 px-4 pt-4 pb-8 absolute bottom-0 left-0 right-0 z-50 shadow-lg" style="width:100%;">
          <div class="flex items-center justify-between gap-3">
            <!-- 辅助操作按钮 - 左侧 -->
            <button class="location-button w-1/5 py-3.5 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
            
            <!-- 保存记录按钮 - 中间主要操作 -->
            <button class="save-button flex-1 py-3.5 bg-[#FFBE98] rounded-xl text-white font-medium text-sm flex items-center justify-center shadow-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              Add to Log
            </button>
            
            <!-- 辅助操作按钮 - 右侧 -->
            <button class="favorite-button w-1/5 py-3.5 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <style>
        /* 添加iOS风格的滚动效果 */
        .analysis-content {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          padding-bottom: calc(120px + env(safe-area-inset-bottom, 0px));
        }
        
        /* 自定义滚动条样式 */
        .analysis-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .analysis-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        
        .analysis-content::-webkit-scrollbar-thumb {
          background: rgba(255, 190, 152, 0.5);
          border-radius: 2px;
        }
        
        /* 设置底部操作区域样式 */
        .action-section {
          padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0.5rem));
          box-shadow: 0 -4px 10px -1px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        
        /* 确保dish-recognition-content有正确的定位上下文 */
        .dish-recognition-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        /* 保证屏幕元素占满整个视口高度，但不超出 */
        .screen[data-page="dish-recognition"] {
          display: flex;
          flex-direction: column;
          width: 375px !important; /* 强制固定宽度 */
          height: 812px !important; /* 强制固定高度 */
          overflow: hidden;
          position: relative;
          background-color: transparent !important; /* 确保背景透明，允许全局背景显示 */
          margin: 20px; /* 与其他页面保持一致的外边距 */
          box-sizing: content-box; /* 确保边框和内边距不影响尺寸 */
          border-radius: 40px; /* 保持手机壳圆角 */
        }
        
        /* 滑动动画 */
        .dish-slide {
          transition: transform 0.3s ease;
        }
        
        /* 健康评分圆环动画 */
        @keyframes circle-fill {
          0% { stroke-dasharray: 0 100; }
          100% { stroke-dasharray: 85 100; }
        }
        
        /* 长按效果 */
        .nutrient-bar {
          position: relative;
          transition: background-color 0.2s;
        }
        
        .nutrient-bar:active {
          background-color: #f3f4f6;
        }
        
        /* 按钮点击动画 */
        .save-button:active, .location-button:active, .favorite-button:active {
          transform: scale(0.98);
        }
        
        /* 菜品标记动画 */
        .dish-marker {
          transition: all 0.3s ease;
        }
        
        /* 滑动提示动画 */
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
        
        .animate-fade-out {
          animation: fade-out 0.5s ease forwards;
        }
        
        /* 菜品指示器点击效果 */
        .dish-indicators > div {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .dish-indicators > div:hover {
          transform: scale(1.2);
        }
        
        /* 菜品标记脉冲效果 */
        @keyframes marker-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        .marker-pulse {
          animation: marker-pulse 2s infinite;
        }
        
        /* 重拍按钮样式 */
        .retake-photo-button {
          transition: all 0.2s ease;
          opacity: 0.9;
          backdrop-filter: blur(4px);
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .retake-photo-button:hover {
          opacity: 1;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
        }
        
        .retake-photo-button:active {
          transform: translateY(1px);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        /* 菜品名称样式 */
        .dish-name {
          position: relative;
          transition: all 0.2s ease;
        }
        
        .dish-name::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: white;
          transition: width 0.3s ease;
        }
        
        .dish-name:hover::after {
          width: 100%;
        }
        
        .dish-name.active::after {
          width: 100%;
        }
        
        /* 当前活跃菜品标记效果 */
        .dish-marker.scale-125 {
          transform: scale(1.25) translate(-40%, -40%);
          border-color: #FFBE98;
          z-index: 20;
        }
        
        /* 菜品标记数字颜色变化 */
        .dish-marker.scale-125 span {
          color: white;
        }
        
        /* 菜品指示器 */
        .dish-indicator {
          opacity: 0;
          animation: slide-in 0.3s ease forwards;
        }
        
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(-100%); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>
    `;
    
    // 将页面添加到DOM中
    document.body.appendChild(dishRecognitionScreen);
    
    // 添加页面打开的入口点
    addEntryPoints();
    
    // 添加互动事件
    addInteractiveEvents(dishRecognitionScreen);
    
    console.log('Dish Recognition page created successfully');
  }
  
  /**
   * 向应用中添加打开菜品识别页面的入口点
   */
  function addEntryPoints() {
    // 在首页添加入口
    const homeScreen = document.querySelector('.screen[data-page="home"]');
    if (homeScreen) {
      // 查找合适的位置插入入口按钮
      const quickActionsContainer = homeScreen.querySelector('.quick-actions') || homeScreen.querySelector('.dynamic-scene-card');
      
      if (quickActionsContainer) {
        // 检查是否已存在入口
        if (!homeScreen.querySelector('.dish-recognition-entry')) {
          // 创建入口按钮
          const entryButton = document.createElement('div');
          entryButton.className = 'dish-recognition-entry bg-white shadow-md rounded-xl p-4 flex items-center space-x-3 mt-4';
          entryButton.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-[#FFBE98] bg-opacity-20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 4H9.5L7 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7H17L14.5 4Z" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="13" r="3" stroke="#FFBE98" stroke-width="2"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-medium text-gray-800">Dish Recognition</h3>
              <p class="text-sm text-gray-500">Scan your meal for instant nutrition info</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          
          // 添加点击事件
          entryButton.addEventListener('click', function() {
            showScreen('dish-recognition');
          });
          
          // 添加到容器中
          quickActionsContainer.parentNode.insertBefore(entryButton, quickActionsContainer.nextSibling);
          console.log('Added entry point to Home screen');
        }
      }
    }
    
    // 在扫描按钮中添加入口点
    const scanNavItem = document.querySelector('.nav-item[data-page="scan"]');
    if (scanNavItem) {
      // 修改扫描按钮行为，点击时打开菜品识别页面
      scanNavItem.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        showScreen('dish-recognition');
        
        // 更新导航状态
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
          item.classList.remove('active');
          const navIcon = item.querySelector('.nav-icon');
          const navText = item.querySelector('.nav-text');
          if (navIcon) navIcon.classList.remove('active');
          if (navText) navText.classList.remove('active');
        });
        
        scanNavItem.classList.add('active');
        const navIcon = scanNavItem.querySelector('.nav-icon');
        const navText = scanNavItem.querySelector('.nav-text');
        if (navIcon) navIcon.classList.add('active');
        if (navText) navText.classList.add('active');
      });
      
      console.log('Modified scan button to open Dish Recognition page');
    }
  }
  
  /**
   * 添加页面的交互事件
   * @param {HTMLElement} screen - 菜品识别页面元素
   */
  function addInteractiveEvents(screen) {
    // 返回按钮事件
    const backButton = screen.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        showScreen('home');
      });
    }
    
    // 初始化菜品滑动功能
    initDishesSlider(screen);
    
    // 为每个菜品幻灯片的重拍按钮添加点击事件
    const retakeButtons = screen.querySelectorAll('.retake-photo-button');
    retakeButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        const currentDishIndex = index + 1; // 菜品索引从1开始显示
        const dishName = screen.querySelector(`.dish-slide:nth-child(${index + 1}) h3`).textContent;
        
        // 显示iOS风格的确认对话框
        createIOSModal('Retake Photo', `Are you sure you want to retake "${dishName}"?`, [
          { label: 'Cancel', style: 'cancel' },
          { label: 'Retake', style: 'destructive' }
        ], (buttonIndex) => {
          if (buttonIndex === 1) { // 用户点击了"重拍"
            // 显示相机界面或重拍确认UI
            createIOSActionSheet('Retake Options', [
              {
                label: 'Use Camera',
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>`
              },
              {
                label: 'Choose from Gallery',
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>`
              }
            ], (optionIndex) => {
              // 显示操作进行中提示
              createIOSToast(`Preparing to retake ${dishName}...`, 1500);
              
              // 这里可以添加调用相机或图库的逻辑
              setTimeout(() => {
                // 模拟调用相机后的效果，实际应用中应连接到相机功能
                createIOSToast('This feature will be available in future updates', 2000);
              }, 1500);
            });
          }
        });
      });
    });
    
    // 菜品缩略图点击事件 - 重拍照片
    const previewThumbnails = screen.querySelectorAll('.preview-thumbnail');
    previewThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        // 显示iOS风格的操作表
        createIOSActionSheet('Photo Options', [
          {
            label: 'Retake Photo',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>`
          },
          {
            label: 'Choose from Photos',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>`
          },
          {
            label: 'Edit Current Photo',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>`
          }
        ], (index) => {
          // 根据选择的选项执行相应的操作
          createIOSToast('This feature will be available in future updates', 2000);
        });
      });
    });
    
    // 菜品名称编辑按钮
    const editButton = screen.querySelector('.edit-button');
    if (editButton) {
      editButton.addEventListener('click', function() {
        const dishName = screen.querySelector('.dish-name-container h2');
        const currentName = dishName.textContent;
        
        // 显示iOS风格的输入框
        createIOSPrompt('Edit Dish Name', 'Please enter a new name for this dish', 'Dish name', currentName, (newName) => {
          if (newName && newName.trim() !== '') {
            dishName.textContent = newName;
            createIOSToast('Dish name updated', 1500);
          }
        });
      });
    }
    
    // 成分轮盘图点击和长按事件
    const macroItems = screen.querySelectorAll('.macro-item');
    macroItems.forEach(item => {
      // 点击显示详情
      item.addEventListener('click', function() {
        const macroType = this.querySelector('.text-sm.font-medium').textContent;
        const macroValue = this.querySelector('.ml-auto.font-bold').textContent;
        
        // 显示iOS风格的模态框
        createIOSModal(macroType, `${macroValue}\n35% of daily recommended intake`, [
          { label: 'OK', style: 'default' }
        ]);
      });
      
      // 长按显示来源
      let pressTimer;
      
      item.addEventListener('touchstart', function(e) {
        pressTimer = setTimeout(() => {
          const source = this.getAttribute('data-source');
          if (source) {
            // 显示iOS风格的模态框
            createIOSModal('Source Information', source, [
              { label: 'OK', style: 'default' }
            ]);
          }
        }, 500);
      });
      
      item.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
      });
      
      // 为桌面浏览器提供类似体验
      item.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
          const source = this.getAttribute('data-source');
          if (source) {
            // 显示iOS风格的模态框
            createIOSModal('Source Information', source, [
              { label: 'OK', style: 'default' }
            ]);
          }
        }, 500);
      });
      
      item.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
      });
      
      item.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
      });
    });
    
    // 升糖负荷学习更多
    const learnMoreButton = screen.querySelector('.glycemic-info button');
    if (learnMoreButton) {
      learnMoreButton.addEventListener('click', function() {
        // 显示iOS风格的模态框
        createIOSModal('Glycemic Load', 'Glycemic Load (GL) measures how much a food affects your blood sugar levels. Low GL values (10 or below) are more friendly for people with diabetes, helping maintain stable blood sugar levels.', [
          { label: 'Got it', style: 'default' }
        ]);
      });
    }
    
    // 底部操作按钮 - 保存记录
    const saveButton = screen.querySelector('.save-button');
    if (saveButton) {
      saveButton.addEventListener('click', function() {
        // 添加加载效果
        this.innerHTML = `
          <svg class="animate-spin w-5 h-5 text-white mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-xs text-white font-medium">Saving...</span>
        `;
        
        // 模拟保存过程
        setTimeout(() => {
          this.innerHTML = `
            <svg class="w-5 h-5 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-xs text-white font-medium">Saved</span>
          `;
          
          // 显示iOS风格的模态框
          createIOSToast('Dish saved to log', 1500);
          
          // 1秒后跳转到日志页面
          setTimeout(() => {
            showScreen('log');
          }, 1000);
        }, 1500);
      });
    }
    
    // 底部操作按钮 - 标记位置
    const locationButton = screen.querySelector('.location-button');
    if (locationButton) {
      locationButton.addEventListener('click', function() {
        const originalContent = this.innerHTML;
        
        // 显示iOS风格的操作表
        createIOSActionSheet('Tag Location', [
          {
            label: 'Current Location',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>`
          },
          {
            label: 'Washington Center Food Court',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>`
          },
          {
            label: 'Choose Another Location',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>`
          }
        ], (index) => {
          // 更改按钮状态
          this.innerHTML = `
            <svg class="w-5 h-5 text-[#FFBE98] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-xs text-[#FFBE98] font-medium">Tagged</span>
          `;
          this.classList.remove('bg-gray-100');
          this.classList.add('bg-[#FFBE98]/10');
          
          // 显示iOS风格的模态框
          createIOSToast('Location tagged: Washington Center Food Court', 2000);
        });
      });
    }
    
    // 底部操作按钮 - 收藏菜品
    const favoriteButton = screen.querySelector('.favorite-button');
    if (favoriteButton) {
      favoriteButton.addEventListener('click', function() {
        const favoriteIcon = this.querySelector('svg');
        
        // 切换收藏状态
        if (favoriteIcon.getAttribute('fill') === 'none') {
          // 收藏
          favoriteIcon.setAttribute('fill', 'currentColor');
          favoriteIcon.classList.remove('text-gray-500');
          favoriteIcon.classList.add('text-[#FFBE98]');
          this.querySelector('span').classList.remove('text-gray-500');
          this.querySelector('span').classList.add('text-[#FFBE98]');
          this.classList.remove('bg-gray-100');
          this.classList.add('bg-[#FFBE98]/10');
          
          // 显示iOS风格的模态框
          createIOSToast('Dish added to favorites', 2000);
        } else {
          // 取消收藏
          favoriteIcon.setAttribute('fill', 'none');
          favoriteIcon.classList.add('text-gray-500');
          favoriteIcon.classList.remove('text-[#FFBE98]');
          this.querySelector('span').classList.add('text-gray-500');
          this.querySelector('span').classList.remove('text-[#FFBE98]');
          this.classList.add('bg-gray-100');
          this.classList.remove('bg-[#FFBE98]/10');
          
          // 显示iOS风格的模态框
          createIOSToast('Dish removed from favorites', 2000);
        }
      });
    }
    
    // 反馈机制 - 调整菜品内容
    const adjustButton = screen.querySelector('.feedback-button button');
    if (adjustButton) {
      adjustButton.addEventListener('click', function() {
        // 显示iOS风格的操作表
        createIOSActionSheet('Adjust Dish', [
          {
            label: 'Adjust Portion Size',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
              <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
              <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
            </svg>`
          },
          {
            label: 'Edit Ingredients',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>`
          },
          {
            label: 'Report Incorrect Analysis',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>`
          }
        ], (index) => {
          // 显示iOS风格的模态框
          createIOSToast('This feature will be available in future updates', 2000);
        });
      });
    }
    
    // 详细营养信息按钮
    const detailButton = screen.querySelector('button.w-full.text-\\[\\#FFBE98\\].text-sm');
    if (detailButton) {
      detailButton.addEventListener('click', function() {
        // 显示iOS风格的模态框
        createIOSModal('Complete Nutritional Information', 
          '· Calories: 195 kcal\n· Protein: 25g\n· Fat: 9g (Saturated Fat: 1.5g)\n· Carbohydrates: 10g (Sugar: 2g)\n· Dietary Fiber: 3g\n· Sodium: 450mg\n· Potassium: 550mg\n· Vitamin A: 15% Daily Value\n· Vitamin C: 45% Daily Value\n· Calcium: 8% Daily Value\n· Iron: 10% Daily Value', 
          [{ label: 'Close', style: 'default' }]
        );
      });
    }
    
    // 成分编辑功能
    const editIngredientsButton = screen.querySelector('.edit-ingredients-button');
    if (editIngredientsButton) {
      editIngredientsButton.addEventListener('click', function() {
        // 打开编辑模式
        openIngredientsEditor(screen);
      });
    }
  }
  
  /**
   * 初始化菜品轮播滑动功能
   * @param {HTMLElement} screen - 菜品识别页面元素
   */
  function initDishesSlider(screen) {
    const slider = screen.querySelector('.dishes-slider');
    const slides = screen.querySelectorAll('.dish-slide');
    const indicators = screen.querySelectorAll('.dish-indicators > div');
    const currentIndexEl = screen.querySelector('.current-dish-index');
    const totalDishesEl = screen.querySelector('.total-dishes');
    const swipeHint = screen.querySelector('.swipe-hint');
    
    if (!slider || !slides.length) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // 更新总菜品数量
    if (totalDishesEl) {
      totalDishesEl.textContent = totalSlides;
    }
    
    // 更新滑动状态
    function updateSliderState() {
      // 更新当前菜品索引显示
      if (currentIndexEl) {
        currentIndexEl.textContent = currentIndex + 1;
      }
      
      // 更新指示器状态
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.remove('opacity-50');
          indicator.classList.add('opacity-100');
          indicator.classList.remove('w-2');
          indicator.classList.add('w-3');
          indicator.classList.remove('h-2');
          indicator.classList.add('h-3');
        } else {
          indicator.classList.remove('opacity-100');
          indicator.classList.add('opacity-50');
          indicator.classList.remove('w-3');
          indicator.classList.add('w-2');
          indicator.classList.remove('h-3');
          indicator.classList.add('h-2');
        }
      });
      
      // 更新实际营养成分和饮食建议内容
      updateDishContents(screen, currentIndex);
      
      // 突出显示当前菜品的标记
      const markers = screen.querySelectorAll('.dish-marker');
      markers.forEach((marker, index) => {
        if (index === currentIndex) {
          marker.classList.add('scale-125');
          marker.classList.add('z-20');
        } else {
          marker.classList.remove('scale-125');
          marker.classList.remove('z-20');
        }
      });
    }
    
    // 滑动到指定索引
    function slideTo(index) {
      if (index < 0 || index >= totalSlides) return;
      
      currentIndex = index;
      const slideWidth = slider.clientWidth;
      slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      
      updateSliderState();
    }
    
    // 添加触摸滑动功能
    let startX, isDragging = false;
    
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      
      if (Math.abs(diffX) > 50) { // 最小滑动距离
        if (diffX > 0 && currentIndex > 0) {
          // 向右滑动，显示前一张
          slideTo(currentIndex - 1);
        } else if (diffX < 0 && currentIndex < totalSlides - 1) {
          // 向左滑动，显示下一张
          slideTo(currentIndex + 1);
        }
      }
      
      isDragging = false;
    });
    
    // 监听滚动事件，更新当前索引
    slider.addEventListener('scroll', () => {
      const slideWidth = slider.clientWidth;
      const scrollPosition = slider.scrollLeft;
      
      // 计算当前索引
      const newIndex = Math.round(scrollPosition / slideWidth);
      
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateSliderState();
      }
    });
    
    // 给分页指示器添加点击事件
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        slideTo(index);
      });
    });
    
    // 显示滑动提示（首次显示）
    if (swipeHint && totalSlides > 1) {
      setTimeout(() => {
        swipeHint.classList.add('opacity-100');
        swipeHint.classList.add('animate-fade-in');
        
        // 3秒后淡出
        setTimeout(() => {
          swipeHint.classList.remove('opacity-100');
          swipeHint.classList.add('opacity-0');
        }, 3000);
      }, 1000);
    }
    
    // 初始化滑动状态
    updateSliderState();
  }
  
  /**
   * 根据当前选择的菜品更新分析内容
   * @param {HTMLElement} screen - 菜品识别页面元素
   * @param {number} dishIndex - 当前菜品索引
   */
  function updateDishContents(screen, dishIndex) {
    // 菜品数据映射（模拟实际应用中的不同菜品数据）
    const dishesData = [
      {
        name: "Grilled Salmon with Vegetables",
        calories: 195,
        healthScore: 9.2,
        glycemicLoad: "Low (8)",
        nutritionInfo: {
          protein: 25,
          carbs: 10,
          fat: 9,
          fiber: 3,
          sugar: 2,
          sodium: 380
        },
        percentages: {
          protein: 45,
          carbs: 15,
          fat: 20,
          fiber: 20
        }
      },
      {
        name: "Vegetable Salad",
        calories: 120,
        healthScore: 9.5,
        glycemicLoad: "Very Low (4)",
        nutritionInfo: {
          protein: 5,
          carbs: 15,
          fat: 7,
          fiber: 8,
          sugar: 6,
          sodium: 180
        },
        percentages: {
          protein: 10,
          carbs: 25,
          fat: 15,
          fiber: 50
        }
      },
      {
        name: "Fruit Dessert",
        calories: 150,
        healthScore: 8.0,
        glycemicLoad: "Medium (12)",
        nutritionInfo: {
          protein: 2,
          carbs: 35,
          fat: 1,
          fiber: 6,
          sugar: 28,
          sodium: 15
        },
        percentages: {
          protein: 5,
          carbs: 70,
          fat: 5,
          fiber: 20
        }
      }
    ];
    
    // 获取当前菜品数据
    const dishData = dishesData[dishIndex] || dishesData[0];
    
    // 更新菜品名称
    const dishNameEl = screen.querySelector('.dish-name-container h2');
    if (dishNameEl) {
      dishNameEl.textContent = dishData.name;
    }
    
    // 更新健康评分的星星显示
    const healthScoreStars = screen.querySelectorAll('.health-score-card .flex.items-center > div svg');
    if (healthScoreStars && healthScoreStars.length === 5) {
      // 将10分制的健康评分转换为5分制
      const fiveStarScore = Math.round((dishData.healthScore / 10) * 5);
      
      // 更新星星显示
      healthScoreStars.forEach((star, index) => {
        if (index < fiveStarScore) {
          // 亮星
          star.classList.remove('text-gray-300');
          star.classList.add('text-[#FFBE98]');
        } else {
          // 灰星
          star.classList.remove('text-[#FFBE98]');
          star.classList.add('text-gray-300');
        }
      });
      
      // 更新进度条
      const progressBar = screen.querySelector('.health-score-card .bg-gradient-to-r');
      if (progressBar) {
        // 设置进度条宽度
        progressBar.style.width = `${(dishData.healthScore / 10) * 100}%`;
        
        // 确保进度条使用正确的渐变颜色
        progressBar.classList.remove('from-green-400', 'to-[#FFBE98]');
        progressBar.classList.add('from-red-400', 'to-green-500');
      }
    }
    
    // 更新血糖负荷信息
    const glycemicLoadEl = screen.querySelector('.glycemic-info .text-green-600');
    if (glycemicLoadEl) {
      glycemicLoadEl.textContent = dishData.glycemicLoad;
    }
    
    // 更新卡路里和营养成分内容
    const nutritionVisualsContainer = screen.querySelector('.macros-section');
    if (nutritionVisualsContainer) {
      const donutChartNumber = nutritionVisualsContainer.querySelector('.chart-number');
      if (donutChartNumber) {
        donutChartNumber.textContent = dishData.calories;
      }
      
      // 更新宏量营养素
      const macroItems = nutritionVisualsContainer.querySelectorAll('.macro-item');
      if (macroItems.length >= 3) {
        // 蛋白质
        macroItems[0].querySelector('.font-bold').textContent = `${dishData.nutritionInfo.protein}g`;
        
        // 脂肪
        macroItems[1].querySelector('.font-bold').textContent = `${dishData.nutritionInfo.fat}g`;
        
        // 碳水
        macroItems[2].querySelector('.font-bold').textContent = `${dishData.nutritionInfo.carbs}g`;
      }
    }
    
    // 更新饮食建议内容（这里简化处理，实际应用中可根据不同菜品使用generateDietaryGuidance函数）
    const guidanceContentEl = screen.querySelector('.guidance-content');
    if (guidanceContentEl) {
      if (dishIndex === 0) {
        guidanceContentEl.textContent = 'Eat the salmon first to promote better glucose control. The protein helps slow digestion.';
      } else if (dishIndex === 1) {
        guidanceContentEl.textContent = 'This salad is rich in dietary fiber, helping maintain blood sugar stability and is an ideal choice for weight management.';
      } else if (dishIndex === 2) {
        guidanceContentEl.textContent = 'Fruits contain natural sugars. Consider eating them after protein-rich foods to slow down blood sugar increase.';
      }
    }
  }
  
  /**
   * 显示指定页面
   * @param {string} pageId - 要显示的页面ID
   */
  function showScreen(pageId) {
    // 隐藏所有页面
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.style.display = 'none';
    });
    
    // 显示指定页面
    const targetScreen = document.querySelector(`.screen[data-page="${pageId}"]`);
    if (targetScreen) {
      targetScreen.style.display = 'flex';
      console.log(`Showing screen: ${pageId}`);
      
      // 触发页面切换自定义事件
      const pageChangedEvent = new CustomEvent('pageChanged', {
        detail: { pageId: pageId }
      });
      document.dispatchEvent(pageChangedEvent);
      
      // 如果有背景修复函数，调用它
      if (typeof window.fixBackgroundConflicts === 'function') {
        setTimeout(window.fixBackgroundConflicts, 100);
      }
      
      // 如果有重新应用背景函数，调用它
      if (typeof window.reapplyAppBackground === 'function') {
        setTimeout(window.reapplyAppBackground, 200);
      }
    }
  }

  /**
   * 根据菜品分析生成个性化饮食建议
   * @param {HTMLElement} container - 放置建议的容器元素
   * @param {Object} analysisData - 菜品分析数据
   */
  function generateDietaryGuidance(container, analysisData = {}) {
    // 默认分析数据
    const defaultData = {
      healthScore: 8.5,
      glycemicLoad: 6,
      carbPercentage: 15,
      proteinPercentage: 45,
      fatPercentage: 20,
      fiberPercentage: 20,
      calories: 195,
      userProfile: {
        diabetesRisk: 'low',
        preferredDiet: 'balanced',
        recentIntake: {
          protein: 'low',
          carbs: 'high',
          fat: 'moderate'
        }
      }
    };
    
    // 合并默认数据与传入的数据
    const data = {...defaultData, ...analysisData};
    
    // 根据数据生成建议内容
    let guidance = '';
    
    // 将10分制的健康评分转换为5分制
    const fiveStarScore = (data.healthScore / 10) * 5;
    
    // 基于健康评分的建议
    if (fiveStarScore >= 4.0) {
      guidance += `<div class="guidance-item mb-3">
        <div class="flex items-center text-green-600 mb-1">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-medium text-sm">Nutritionally Balanced Choice</span>
        </div>
        <p class="text-xs text-gray-600">This dish is rich in protein and fiber, making it suitable as part of your regular diet.</p>
      </div>`;
    } else if (fiveStarScore >= 3.0) {
      guidance += `<div class="guidance-item mb-3">
        <div class="flex items-center text-yellow-600 mb-1">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span class="font-medium text-sm">Moderate Consumption</span>
        </div>
        <p class="text-xs text-gray-600">This dish has moderate nutritional value. Consider pairing with more vegetables and fruits to improve overall nutrition.</p>
      </div>`;
    } else {
      guidance += `<div class="guidance-item mb-3">
        <div class="flex items-center text-red-600 mb-1">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-medium text-sm">Consume with Caution</span>
        </div>
        <p class="text-xs text-gray-600">This dish has a low health score. Consider reducing consumption frequency and choosing healthier alternatives.</p>
      </div>`;
    }
    
    // 基于血糖负荷的建议
    // ... (保持不变)
  }

  /**
   * @function createNutritionVisuals
   * @description 创建营养数据可视化元素
   * @param {HTMLElement} container - 要添加可视化元素的容器
   * @param {Object} dishData - 菜品营养数据
   * @param {number} dishData.calories - 卡路里数量
   * @param {Object} dishData.nutritionInfo - 营养素详细信息
   * @param {Object} dishData.percentages - 各营养素占比
   * @param {Object} dishData.goal - 每日营养目标
   */
  function createNutritionVisuals(container, dishData) {
    // 设置默认值
    const data = {
      calories: dishData.calories || 0,
      nutritionInfo: dishData.nutritionInfo || {
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0
      },
      percentages: dishData.percentages || {
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0
      },
      goal: dishData.goal || {
        calories: 2000,
        protein: 50,
        carbs: 275,
        fat: 70
      }
    };
    
    // 计算每日目标百分比
    const caloriePercentage = Math.min(Math.round((data.calories / data.goal.calories) * 100), 100);
    const proteinPercentage = Math.min(Math.round((data.nutritionInfo.protein / data.goal.protein) * 100), 100);
    const carbsPercentage = Math.min(Math.round((data.nutritionInfo.carbs / data.goal.carbs) * 100), 100);
    const fatPercentage = Math.min(Math.round((data.nutritionInfo.fat / data.goal.fat) * 100), 100);
    
    // 创建HTML结构
    const html = `
      <div class="nutrition-visuals p-4">
        <div class="flex flex-wrap">
          <!-- 卡路里可视化部分 -->
          <div class="w-full md:w-2/5 mb-4 md:mb-0 pr-0 md:pr-4">
            <div class="calorie-ring relative">
              <div class="flex flex-col items-center justify-center">
                <svg class="w-32 h-32" viewBox="0 0 36 36">
                  <path class="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    stroke-width="2"
                  />
                  <path class="circle"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#22C55E"
                    stroke-width="2"
                    stroke-dasharray="${caloriePercentage}, 100"
                    stroke-dashoffset="25"
                  />
                  <text x="18" y="17" class="calorie-text" text-anchor="middle" alignment-baseline="middle" fill="#111827" font-size="8" font-weight="bold">${data.calories}</text>
                  <text x="18" y="23" class="calorie-unit" text-anchor="middle" alignment-baseline="middle" fill="#6B7280" font-size="3">CALORIES</text>
                </svg>
                <!-- 完全删除百分比显示 -->
              </div>
            </div>
          </div>
          
          <!-- 营养分布部分 -->
          <div class="w-full md:w-3/5">
            <div class="nutrient-bars">
              <!-- 蛋白质 -->
              <div class="nutrient-bar-container mb-3" data-nutrient="protein">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium text-gray-700">蛋白质</span>
                  <span class="text-sm text-gray-500">${data.nutritionInfo.protein}g</span>
                </div>
                <div class="relative h-3 bg-gray-200 rounded-full">
                  <div class="absolute h-full bg-blue-500 rounded-full" style="width: ${proteinPercentage}%"></div>
                </div>
              </div>
              
              <!-- 碳水化合物 -->
              <div class="nutrient-bar-container mb-3" data-nutrient="carbs">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium text-gray-700">碳水化合物</span>
                  <span class="text-sm text-gray-500">${data.nutritionInfo.carbs}g</span>
                </div>
                <div class="relative h-3 bg-gray-200 rounded-full">
                  <div class="absolute h-full bg-yellow-500 rounded-full" style="width: ${carbsPercentage}%"></div>
                </div>
              </div>
              
              <!-- 脂肪 -->
              <div class="nutrient-bar-container" data-nutrient="fat">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium text-gray-700">脂肪</span>
                  <span class="text-sm text-gray-500">${data.nutritionInfo.fat}g</span>
                </div>
                <div class="relative h-3 bg-gray-200 rounded-full">
                  <div class="absolute h-full bg-red-500 rounded-full" style="width: ${fatPercentage}%"></div>
                </div>
              </div>
            </div>
            
            <!-- 查看更多营养素的按钮 -->
            <div class="mt-4">
              <button class="expand-nutrients text-sm text-indigo-600 hover:text-indigo-800">
                查看更多营养素 →
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 添加HTML到容器
    container.innerHTML = html;
    
    // 添加点击展开更多营养素信息的功能
    const showMoreButton = container.querySelector('.show-more-nutrients');
    if (showMoreButton) {
      showMoreButton.addEventListener('click', function() {
        const detailedNutrients = container.querySelector('.detailed-nutrients');
        // 这里可以添加更多营养素信息
        const moreNutrientsHTML = `
          <div class="grid grid-cols-3 gap-2 mt-3">
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center">
              <div class="text-sm font-medium">3.5g</div>
              <div class="text-xs text-gray-500">Saturated Fat</div>
            </div>
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center">
              <div class="text-sm font-medium">58mg</div>
              <div class="text-xs text-gray-500">Cholesterol</div>
            </div>
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center">
              <div class="text-sm font-medium">12mg</div>
              <div class="text-xs text-gray-500">Vitamin C</div>
            </div>
          </div>
        `;
        
        // 在按钮前插入更多营养素信息
        const buttonContainer = showMoreButton.parentNode;
        buttonContainer.insertAdjacentHTML('beforebegin', moreNutrientsHTML);
        
        // 隐藏按钮
        buttonContainer.style.display = 'none';
      });
    }
    
    // 添加营养素条的悬停和点击事件
    const nutrientBars = container.querySelectorAll('.nutrient-bar');
    nutrientBars.forEach(bar => {
      const nutrientType = bar.getAttribute('data-nutrient');
      
      // 展示详细信息的函数
      function showDetails() {
        let detailText = '';
        let goalText = '';
        
        switch(nutrientType) {
          case 'protein':
            detailText = `Protein helps with muscle growth and repair.`;
            goalText = `Daily Goal: ${data.goal.protein}g`;
            break;
          case 'carbs':
            detailText = `Carbohydrates are the body's main energy source.`;
            goalText = `Daily Goal: ${data.goal.carbs}g`;
            break;
          case 'fat':
            detailText = `Healthy fats are essential for hormones and cell function.`;
            goalText = `Daily Goal: ${data.goal.fat}g`;
            break;
        }
        
        // 创建详情弹窗
        const detailPopup = document.createElement('div');
        detailPopup.className = 'nutrient-detail-popup absolute bg-white shadow-lg rounded-lg p-3 z-10';
        detailPopup.style.width = '200px';
        detailPopup.style.top = `${bar.offsetTop - 10}px`;
        detailPopup.style.left = `${bar.offsetLeft + bar.offsetWidth / 2 - 100}px`;
        detailPopup.innerHTML = `
          <div class="text-sm font-medium mb-1">${nutrientType === 'protein' ? 'Protein' : nutrientType === 'carbs' ? 'Carbohydrates' : 'Fat'}</div>
          <div class="text-xs text-gray-600 mb-2">${detailText}</div>
          <div class="text-xs text-gray-500">${goalText}</div>
        `;
        
        // 添加点击关闭功能
        detailPopup.addEventListener('click', function() {
          detailPopup.remove();
        });
        
        // 添加到页面
        document.body.appendChild(detailPopup);
        
        // 5秒后自动关闭
        setTimeout(() => {
          if (document.body.contains(detailPopup)) {
            detailPopup.remove();
          }
        }, 5000);
      }
      
      // 桌面端使用悬停
      bar.addEventListener('mouseenter', showDetails);
      
      // 移动端使用长按
      let pressTimer;
      bar.addEventListener('touchstart', function() {
        pressTimer = setTimeout(showDetails, 500);
      });
      
      bar.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
      });
    });
  }

  /**
   * 创建iOS风格的模态对话框
   * @param {string} title - 模态框标题
   * @param {string} message - 模态框内容
   * @param {Array} buttons - 按钮配置，格式: [{label: '按钮1', style: 'default/cancel/destructive'}]
   * @param {Function} callback - 点击按钮后的回调函数，参数为按钮索引
   */
  function createIOSModal(title, message, buttons, callback) {
    // 获取当前活跃的Dish Analysis屏幕
    const dishAnalysisScreen = document.querySelector('.screen[data-page="dish-recognition"]');
    if (!dishAnalysisScreen) {
      console.error('Dish Analysis screen not found');
      return;
    }
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    
    // 创建模态框容器
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-xl w-5/6 max-w-sm overflow-hidden shadow-2xl';
    modal.style.maxWidth = '280px';
    modal.style.margin = 'auto';
    modal.style.zIndex = '10000';
    modal.style.position = 'relative';
    
    // 创建模态框内容
    let modalHTML = '';
    
    // 添加标题和内容
    if (title || message) {
      modalHTML += `<div class="p-4">`;
      
      if (title) {
        modalHTML += `<h3 class="font-semibold text-center text-lg mb-2">${title}</h3>`;
      }
      
      if (message) {
        // 处理换行符
        const formattedMessage = message.replace(/\n/g, '<br>');
        modalHTML += `<p class="text-center text-gray-600 text-sm whitespace-pre-line">${formattedMessage}</p>`;
      }
      
      modalHTML += `</div>`;
    }
    
    // 添加按钮
    if (buttons && buttons.length) {
      modalHTML += `<div class="border-t border-gray-200">`;
      
      buttons.forEach((button, index) => {
        let buttonClasses = 'block w-full py-3 text-center font-medium';
        
        if (button.style === 'cancel') {
          buttonClasses += ' text-blue-500';
        } else if (button.style === 'destructive') {
          buttonClasses += ' text-red-500';
        } else {
          buttonClasses += ' text-[#FFBE98]';
        }
        
        if (index > 0) {
          modalHTML += `<div class="border-t border-gray-200"></div>`;
        }
        
        modalHTML += `<button data-index="${index}" class="${buttonClasses}">${button.label}</button>`;
      });
      
      modalHTML += `</div>`;
    }
    
    modal.innerHTML = modalHTML;
    
    // 添加按钮点击事件
    modal.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        dishAnalysisScreen.removeChild(overlay);
        if (callback) callback(index);
      });
    });
    
    // 添加到Dish Analysis屏幕而不是document.body
    overlay.appendChild(modal);
    dishAnalysisScreen.appendChild(overlay);
    
    // 添加动画效果
    overlay.style.opacity = 0;
    modal.style.transform = 'scale(0.9)';
    modal.style.transition = 'transform 0.2s ease-out';
    overlay.style.transition = 'opacity 0.2s ease-out';
    
    setTimeout(() => {
      overlay.style.opacity = 1;
      modal.style.transform = 'scale(1)';
    }, 10);
    
    return overlay;
  }
  
  /**
   * 创建iOS风格的操作表单
   * @param {string} title - 操作表单标题
   * @param {Array} options - 选项配置，格式: [{label: '选项1', icon: 'svg内容'}, {label: '选项2', icon: 'svg内容'}]
   * @param {Function} callback - 点击选项后的回调函数，参数为选项索引
   */
  function createIOSActionSheet(title, options, callback) {
    // 获取当前活跃的Dish Analysis屏幕
    const dishAnalysisScreen = document.querySelector('.screen[data-page="dish-recognition"]');
    if (!dishAnalysisScreen) {
      console.error('Dish Analysis screen not found');
      return;
    }
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black bg-opacity-40 z-50 flex items-end';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.bottom = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    
    // 创建操作表单容器
    const actionSheet = document.createElement('div');
    actionSheet.className = 'bg-gray-100 rounded-t-xl w-full pb-8 transform translate-y-full transition-transform duration-300 ease-out';
    
    // 创建操作表单内容
    let actionSheetHTML = '';
    
    // 添加标题
    if (title) {
      actionSheetHTML += `<div class="px-4 py-3 bg-gray-50 rounded-t-xl">
        <h3 class="font-medium text-center text-gray-500 text-sm">${title}</h3>
      </div>`;
    }
    
    // 添加选项
    if (options && options.length) {
      options.forEach((option, index) => {
        actionSheetHTML += `
          <div data-index="${index}" class="flex items-center px-4 py-3 bg-white border-b border-gray-100 active:bg-gray-50">
            ${option.icon ? `<div class="mr-3">${option.icon}</div>` : ''}
            <span class="text-base">${option.label}</span>
          </div>
        `;
      });
    }
    
    // 添加取消按钮
    actionSheetHTML += `
      <div class="mt-2">
        <div data-index="-1" class="flex items-center justify-center px-4 py-3 bg-white rounded-lg mx-2 active:bg-gray-50">
          <span class="text-base font-medium text-[#FFBE98]">Cancel</span>
        </div>
      </div>
    `;
    
    actionSheet.innerHTML = actionSheetHTML;
    
    // 添加选项点击事件
    actionSheet.querySelectorAll('[data-index]').forEach(option => {
      option.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        closeActionSheet();
        if (callback && index >= 0) callback(index);
      });
    });
    
    // 添加遮罩层点击事件
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeActionSheet();
      }
    });
    
    function closeActionSheet() {
      actionSheet.style.transform = 'translateY(100%)';
      overlay.style.opacity = 0;
      
      // 获取底部操作栏
      const actionBar = dishAnalysisScreen.querySelector('.action-section');
      const originalActionBarPosition = actionBar ? actionBar.style.position : '';
      const originalActionBarBottom = actionBar ? actionBar.style.bottom : '';
      
      setTimeout(() => {
        if (dishAnalysisScreen.contains(overlay)) {
          dishAnalysisScreen.removeChild(overlay);
          
          // 恢复底部操作栏的位置
          if (actionBar) {
            actionBar.style.position = originalActionBarPosition;
            actionBar.style.bottom = originalActionBarBottom;
            actionBar.style.transform = '';
            
            // 强制重排
            void actionBar.offsetHeight;
          }
          
          // 重新布局强制刷新
          const contentContainer = dishAnalysisScreen.querySelector('.dish-recognition-content');
          if (contentContainer) {
            contentContainer.style.position = '';
            contentContainer.style.height = '';
            contentContainer.style.overflow = '';
          }
          
          // 修复滚动问题
          document.body.style.position = '';
          document.body.style.overflow = '';
          document.body.style.height = '';
          
          // 轻微延迟后恢复正常布局，确保过渡效果完成
          setTimeout(() => {
            // 强制重绘
            dishAnalysisScreen.style.display = 'none';
            void dishAnalysisScreen.offsetHeight; 
            dishAnalysisScreen.style.display = 'flex';
          }, 50);
        }
      }, 300);
    }
    
    // 添加到Dish Analysis屏幕而不是document.body
    overlay.appendChild(actionSheet);
    dishAnalysisScreen.appendChild(overlay);
    
    // 添加动画效果
    setTimeout(() => {
      actionSheet.style.transform = 'translateY(0)';
    }, 10);
    
    return overlay;
  }
  
  /**
   * 创建iOS风格的轻提示
   * @param {string} message - 提示内容
   * @param {number} duration - 显示时长，单位ms
   */
  function createIOSToast(message, duration = 2000) {
    // 获取当前活跃的Dish Analysis屏幕
    const dishAnalysisScreen = document.querySelector('.screen[data-page="dish-recognition"]');
    if (!dishAnalysisScreen) {
      console.error('Dish Analysis screen not found');
      return;
    }
    
    // 创建提示容器
    const toast = document.createElement('div');
    toast.className = 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg z-50 opacity-0 transition-opacity duration-300';
    toast.textContent = message;
    
    // 添加到Dish Analysis屏幕而不是document.body
    dishAnalysisScreen.appendChild(toast);
    
    // 添加动画效果
    setTimeout(() => {
      toast.style.opacity = 1;
      
      setTimeout(() => {
        toast.style.opacity = 0;
        
        setTimeout(() => {
          if (dishAnalysisScreen.contains(toast)) {
            dishAnalysisScreen.removeChild(toast);
          }
        }, 300);
      }, duration);
    }, 10);
    
    return toast;
  }
  
  /**
   * 创建iOS风格的输入框
   * @param {string} title - 输入框标题
   * @param {string} message - 输入框提示信息
   * @param {string} placeholder - 输入框占位文本
   * @param {string} defaultValue - 默认值
   * @param {Function} callback - 点击按钮后的回调函数，参数为输入的文本内容
   */
  function createIOSPrompt(title, message, placeholder, defaultValue, callback) {
    // 获取当前活跃的Dish Analysis屏幕
    const dishAnalysisScreen = document.querySelector('.screen[data-page="dish-recognition"]');
    if (!dishAnalysisScreen) {
      console.error('Dish Analysis screen not found');
      return;
    }
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center';
    
    // 创建输入框容器
    const prompt = document.createElement('div');
    prompt.className = 'bg-white rounded-xl w-5/6 max-w-sm overflow-hidden shadow-xl';
    
    // 创建输入框内容
    prompt.innerHTML = `
      <div class="px-4 pt-4 pb-2">
        <h3 class="font-semibold text-center text-lg">${title}</h3>
      </div>
      <div class="px-4 pb-4">
        <p class="text-center text-gray-600 text-sm mb-3">${message}</p>
        <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBE98] focus:border-transparent" placeholder="${placeholder}" value="${defaultValue || ''}">
      </div>
      <div class="border-t border-gray-200 flex">
        <button class="cancel-button flex-1 py-3 text-center font-medium text-gray-500 border-r border-gray-200">Cancel</button>
        <button class="confirm-button flex-1 py-3 text-center font-medium text-[#FFBE98]">OK</button>
      </div>
    `;
    
    // 获取输入框和按钮元素
    const input = prompt.querySelector('input');
    const cancelButton = prompt.querySelector('.cancel-button');
    const confirmButton = prompt.querySelector('.confirm-button');
    
    // 添加按钮点击事件
    cancelButton.addEventListener('click', function() {
      dishAnalysisScreen.removeChild(overlay);
    });
    
    confirmButton.addEventListener('click', function() {
      const value = input.value.trim();
      dishAnalysisScreen.removeChild(overlay);
      if (callback) callback(value);
    });
    
    // 添加键盘事件
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const value = input.value.trim();
        dishAnalysisScreen.removeChild(overlay);
        if (callback) callback(value);
      }
    });
    
    // 添加到Dish Analysis屏幕而不是document.body
    overlay.appendChild(prompt);
    dishAnalysisScreen.appendChild(overlay);
    
    // 聚焦输入框
    setTimeout(() => {
      input.focus();
    }, 50);
    
    return overlay;
  }

  // 为菜品名称添加长按编辑功能
  const dishNames = screen.querySelectorAll('.dish-name');
  dishNames.forEach((nameElement, index) => {
    let pressTimer;
    let isLongPressing = false;
    const longPressTime = 500; // 长按500毫秒触发
    
    // 触摸设备的长按事件
    nameElement.addEventListener('touchstart', function(e) {
      pressTimer = setTimeout(() => {
        isLongPressing = true;
        this.classList.add('active');
        // 提供触觉反馈（如果设备支持）
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(50);
        }
        // 显示编辑对话框
        showDishNameEditor(this, index);
      }, longPressTime);
    });
    
    nameElement.addEventListener('touchend', function() {
      clearTimeout(pressTimer);
      if (isLongPressing) {
        this.classList.remove('active');
        isLongPressing = false;
      }
    });
    
    nameElement.addEventListener('touchmove', function() {
      clearTimeout(pressTimer);
    });
    
    // 桌面设备的长按事件模拟
    nameElement.addEventListener('mousedown', function() {
      pressTimer = setTimeout(() => {
        isLongPressing = true;
        this.classList.add('active');
        // 显示编辑对话框
        showDishNameEditor(this, index);
      }, longPressTime);
    });
    
    nameElement.addEventListener('mouseup', function() {
      clearTimeout(pressTimer);
      if (isLongPressing) {
        this.classList.remove('active');
        isLongPressing = false;
      }
    });
    
    nameElement.addEventListener('mouseleave', function() {
      clearTimeout(pressTimer);
      this.classList.remove('active');
    });
  });

  // 显示菜品名称编辑对话框
  function showDishNameEditor(nameElement, index) {
    const currentName = nameElement.textContent;
    const slideName = `Dish ${index + 1}`;
    
    // 显示iOS风格的编辑对话框
    createIOSPrompt('Edit Dish Name', 'Press and hold to edit the dish name', 'Dish name', currentName, (newName) => {
      if (newName && newName.trim() !== '') {
        // 更新当前显示的名称
        nameElement.textContent = newName;
        
        // 更新对应菜品数据（如果有的话）
        updateDishNameInData(index, newName);
        
        // 显示成功提示
        createIOSToast('Dish name updated', 1500);
      }
    });
  }

  // 更新菜品数据中的名称
  function updateDishNameInData(index, newName) {
    // 根据实际数据模型来操作，这里只是示例
    const dishesData = window.dishesData || [];
    if (dishesData[index]) {
      dishesData[index].name = newName;
    }
  }

  function createCalorieRing(calories, goalCalories) {
    const percentage = Math.min(Math.round((calories / goalCalories) * 100), 100);
    
    // 计算角度和坐标，以便创建圆弧
    const calculateCoordinates = (percent) => {
      // 将百分比转换为弧度
      const radians = (percent / 100) * 2 * Math.PI;
      // 计算终点坐标
      const x = 50 + 45 * Math.sin(radians);
      const y = 50 - 45 * Math.cos(radians);
      // 确定是否是大弧（大于180度）
      const largeArcFlag = percent > 50 ? 1 : 0;
      
      return { x, y, largeArcFlag };
    };
    
    const coords = calculateCoordinates(percentage);
    
    return `
      <div class="calorie-ring flex flex-col items-center justify-center">
        <div class="relative w-32 h-32">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <!-- 背景圆环 -->
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#e5e7eb" 
              stroke-width="8"
            />
            
            <!-- 进度圆环 - 使用SVG路径完全控制圆弧 -->
            ${percentage > 0 ? `
            <path
              d="M 50,5 A 45,45 0 ${coords.largeArcFlag},1 ${coords.x},${coords.y}"
              fill="none"
              stroke="#4f46e5"
              stroke-width="8"
              stroke-linecap="round"
            />` : ''}
          </svg>
          
          <!-- 中心文本 -->
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div class="text-2xl font-bold">${calories}</div>
            <div class="text-xs text-gray-500">of ${goalCalories}</div>
            <div class="text-xs text-gray-500">KCAL</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 打开成分编辑器
   * @param {HTMLElement} screen - 当前屏幕元素 
   */
  function openIngredientsEditor(screen) {
    // 获取Dish Analysis界面的尺寸和位置
    const dishAnalysisScreen = screen.closest('.screen');
    if (!dishAnalysisScreen) return;
    
    // 获取当前成分列表容器
    const ingredientsContainer = screen.querySelector('.ingredients-grid');
    if (!ingredientsContainer) return;
    
    // 获取所有成分项
    const ingredients = [];
    ingredientsContainer.querySelectorAll('.ingredient-item').forEach(item => {
      const nameEl = item.querySelector('.ingredient-name');
      if (nameEl) {
        // 提取名称和重量 (例如: "Salmon (120g)" -> name: "Salmon", weight: "120g")
        const text = nameEl.textContent;
        const match = text.match(/(.*)\s*\((\d+g)\)/);
        if (match) {
          ingredients.push({
            name: match[1].trim(),
            weight: match[2]
          });
        } else {
          ingredients.push({
            name: text,
            weight: ''
          });
        }
      }
    });
    
    // 创建编辑面板容器，放在dish analysis屏幕内部，而不是fixed在整个视口
    const editorPanel = document.createElement('div');
    editorPanel.className = 'absolute inset-0 z-50';
    editorPanel.style.position = 'absolute';
    editorPanel.style.zIndex = '50';
    editorPanel.style.width = '100%';
    editorPanel.style.height = '100%';
    editorPanel.style.pointerEvents = 'auto';
    
    // 获取手机屏幕高度，确保面板不超出手机壳
    const dishScreenHeight = dishAnalysisScreen.clientHeight;
    const maxPanelHeight = Math.min(600, dishScreenHeight * 0.8); // 最大高度为屏幕的80%或600px
    
    editorPanel.innerHTML = `
      <div class="absolute inset-0 bg-black opacity-0 transition-opacity duration-300"></div>
      <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg transform translate-y-full transition-transform duration-300 ease-out" style="max-height: ${maxPanelHeight}px;">
        <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3"></div>
        
        <div class="px-4 pb-4">
          <div class="flex justify-between items-center mb-4">
            <button class="cancel-edit text-gray-500 text-base font-medium">Cancel</button>
            <h3 class="text-base font-semibold text-center">Edit Ingredients</h3>
            <button class="save-edit text-[#FFBE98] text-base font-medium">Done</button>
          </div>
          
          <div class="ingredients-editor-content overflow-y-auto" style="max-height: ${maxPanelHeight - 100}px; padding-bottom: env(safe-area-inset-bottom, 20px);">
            <div class="ingredients-edit-list space-y-3">
              ${ingredients.map((ingredient, index) => `
                <div class="ingredient-edit-item bg-gray-50 rounded-xl p-3" data-index="${index}">
                  <div class="flex justify-between items-center mb-2">
                    <div class="text-sm font-medium text-gray-700">Ingredient ${index + 1}</div>
                    <button class="delete-ingredient-button text-red-500">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="space-y-2">
                    <div class="ingredient-field">
                      <label class="text-xs text-gray-500 mb-1 block">Name</label>
                      <input type="text" class="ingredient-name-input w-full py-2 px-3 text-base border border-gray-300 rounded-lg" value="${ingredient.name}" placeholder="Enter ingredient name">
                    </div>
                    <div class="ingredient-field">
                      <label class="text-xs text-gray-500 mb-1 block">Amount</label>
                      <input type="text" class="ingredient-weight-input w-full py-2 px-3 text-base border border-gray-300 rounded-lg" value="${ingredient.weight}" placeholder="e.g. 100g">
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <button class="add-ingredient-button w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Ingredient
            </button>
          </div>
        </div>
      </div>
    `;
    
    // 确保dish analysis屏幕是相对定位，这样编辑面板能相对于它定位
    if (getComputedStyle(dishAnalysisScreen).position === 'static') {
      dishAnalysisScreen.style.position = 'relative';
    }
    
    // 将编辑面板添加到Dish Analysis屏幕
    dishAnalysisScreen.appendChild(editorPanel);
    
    // 获取元素引用
    const backdrop = editorPanel.querySelector('.absolute.inset-0.bg-black');
    const panel = editorPanel.querySelector('.absolute.bottom-0');
    const cancelButton = editorPanel.querySelector('.cancel-edit');
    const saveButton = editorPanel.querySelector('.save-edit');
    const addButton = editorPanel.querySelector('.add-ingredient-button');
    const editList = editorPanel.querySelector('.ingredients-edit-list');
    
    // 显示面板动画
    requestAnimationFrame(() => {
      backdrop.classList.add('opacity-50');
      panel.classList.remove('translate-y-full');
    });
    
    // 添加新成分的功能
    addButton.addEventListener('click', function() {
      const newIndex = editList.querySelectorAll('.ingredient-edit-item').length;
      
      const newItem = document.createElement('div');
      newItem.className = 'ingredient-edit-item bg-gray-50 rounded-xl p-3';
      newItem.setAttribute('data-index', newIndex);
      
      newItem.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <div class="text-sm font-medium text-gray-700">Ingredient ${newIndex + 1}</div>
          <button class="delete-ingredient-button text-red-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-2">
          <div class="ingredient-field">
            <label class="text-xs text-gray-500 mb-1 block">Name</label>
            <input type="text" class="ingredient-name-input w-full py-2 px-3 text-base border border-gray-300 rounded-lg" placeholder="Enter ingredient name">
          </div>
          <div class="ingredient-field">
            <label class="text-xs text-gray-500 mb-1 block">Amount</label>
            <input type="text" class="ingredient-weight-input w-full py-2 px-3 text-base border border-gray-300 rounded-lg" placeholder="e.g. 100g">
          </div>
        </div>
      `;
      
      editList.appendChild(newItem);
      
      // 给新添加的删除按钮添加事件监听
      const deleteButton = newItem.querySelector('.delete-ingredient-button');
      if (deleteButton) {
        deleteButton.addEventListener('click', function() {
          // 添加删除动画
          newItem.style.transition = 'all 0.3s ease';
          newItem.style.opacity = '0';
          newItem.style.height = '0';
          newItem.style.marginBottom = '0';
          newItem.style.overflow = 'hidden';
          
          setTimeout(() => {
            newItem.remove();
            // 更新所有ingredient标题
            updateIngredientNumbers(editList);
          }, 300);
        });
      }
      
      // 聚焦到新添加的输入框
      const nameInput = newItem.querySelector('.ingredient-name-input');
      if (nameInput) {
        nameInput.focus();
      }
      
      // 滚动到底部显示新添加的成分
      const scrollContainer = editorPanel.querySelector('.ingredients-editor-content');
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    });
    
    // 为所有删除按钮添加事件监听
    const deleteButtons = editorPanel.querySelectorAll('.delete-ingredient-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const item = this.closest('.ingredient-edit-item');
        if (item) {
          // 添加删除动画
          item.style.transition = 'all 0.3s ease';
          item.style.opacity = '0';
          item.style.height = '0';
          item.style.marginBottom = '0';
          item.style.overflow = 'hidden';
          
          setTimeout(() => {
            item.remove();
            // 更新所有ingredient标题
            updateIngredientNumbers(editList);
          }, 300);
        }
      });
    });
    
    // 更新所有ingredient标题编号
    function updateIngredientNumbers(container) {
      const items = container.querySelectorAll('.ingredient-edit-item');
      items.forEach((item, index) => {
        const titleEl = item.querySelector('.flex.justify-between .text-sm');
        if (titleEl) {
          titleEl.textContent = `Ingredient ${index + 1}`;
        }
        item.setAttribute('data-index', index);
      });
    }
    
    // 关闭面板的通用函数
    function closePanel() {
      backdrop.classList.remove('opacity-50');
      panel.classList.add('translate-y-full');
      
      // 创建一个变量，存储原始页面状态
      const originalPosition = document.body.style.position;
      const originalHeight = document.body.style.height;
      const originalOverflow = document.body.style.overflow;
      
      // 获取底部操作栏
      const actionBar = dishAnalysisScreen.querySelector('.action-section');
      if (actionBar) {
        // 保存底部操作栏的原始样式
        const originalActionBarPosition = actionBar.style.position;
        const originalActionBarBottom = actionBar.style.bottom;
        
        // 确保底部操作栏样式恢复
        setTimeout(() => {
          if (actionBar) {
            actionBar.style.position = originalActionBarPosition || '';
            actionBar.style.bottom = originalActionBarBottom || '';
            actionBar.style.transform = '';
            actionBar.style.transition = 'none';
            
            // 强制重绘
            void actionBar.offsetHeight;
            
            // 恢复平滑过渡
            setTimeout(() => {
              actionBar.style.transition = '';
            }, 50);
          }
        }, 100);
      }
      
      // 移除面板前，先确保页面上的定位和样式正确
      setTimeout(() => {
        // 删除编辑面板
        if (dishAnalysisScreen.contains(editorPanel)) {
          dishAnalysisScreen.removeChild(editorPanel);
        }
        
        // 恢复原始页面状态
        document.body.style.position = originalPosition;
        document.body.style.height = originalHeight;
        document.body.style.overflow = originalOverflow;
        
        // 修复内容滚动区域
        const contentContainer = dishAnalysisScreen.querySelector('.dish-recognition-content');
        if (contentContainer) {
          contentContainer.style.position = '';
          contentContainer.style.height = '';
          contentContainer.style.overflow = '';
        }
        
        // 重设底部操作区域的样式
        const actionSection = dishAnalysisScreen.querySelector('.action-section');
        if (actionSection) {
          actionSection.style.position = '';
          actionSection.style.bottom = '';
          actionSection.style.left = '';
          actionSection.style.right = '';
          actionSection.style.transform = '';
        }
        
        // 重新布局强制刷新
        dishAnalysisScreen.style.display = 'none';
        void dishAnalysisScreen.offsetHeight; // 触发重排
        dishAnalysisScreen.style.display = 'flex';
      }, 300);
    }
    
    // 取消按钮
    cancelButton.addEventListener('click', closePanel);
    
    // 点击背景关闭
    backdrop.addEventListener('click', closePanel);
    
    // 保存按钮
    saveButton.addEventListener('click', function() {
      // 收集所有成分数据
      const updatedIngredients = [];
      const ingredientItems = editorPanel.querySelectorAll('.ingredient-edit-item');
      
      ingredientItems.forEach(item => {
        const nameInput = item.querySelector('.ingredient-name-input');
        const weightInput = item.querySelector('.ingredient-weight-input');
        
        if (nameInput && nameInput.value.trim()) {
          updatedIngredients.push({
            name: nameInput.value.trim(),
            weight: weightInput && weightInput.value.trim() ? weightInput.value.trim() : ''
          });
        }
      });
      
      // 更新UI
      updateIngredientsUI(screen, updatedIngredients);
      
      // 关闭面板
      closePanel();
      
      // 显示成功提示
      createIOSToast('Ingredients updated successfully', 1500);
    });
    
    // 阻止面板上的点击事件冒泡到背景
    panel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  /**
   * 更新成分列表UI
   * @param {HTMLElement} screen - 当前屏幕元素
   * @param {Array} ingredients - 更新后的成分列表
   */
  function updateIngredientsUI(screen, ingredients) {
    const ingredientsGrid = screen.querySelector('.ingredients-grid');
    if (!ingredientsGrid) return;
    
    // 清空现有内容
    ingredientsGrid.innerHTML = '';
    
    // 添加更新后的成分
    ingredients.forEach(ingredient => {
      const displayText = ingredient.weight ? `${ingredient.name} (${ingredient.weight})` : ingredient.name;
      
      const item = document.createElement('div');
      item.className = 'ingredient-item flex items-center p-2 bg-gray-50 rounded-lg';
      
      item.innerHTML = `
        <div class="w-2 h-2 rounded-full bg-[#FFBE98] mr-2"></div>
        <span class="text-sm ingredient-name">${displayText}</span>
      `;
      
      ingredientsGrid.appendChild(item);
    });
  }
})(); 
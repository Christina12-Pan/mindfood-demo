/**
 * @description 将个人资料更新脚本添加到HTML文件中
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('正在添加个人资料更新脚本');
    
    // 创建脚本元素
    const script = document.createElement('script');
    script.src = 'update_profile_page.js';
    
    // 添加到文档头部
    document.head.appendChild(script);
    
    console.log('个人资料更新脚本已添加');
}); 
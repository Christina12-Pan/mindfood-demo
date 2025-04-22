/**
 * 修复HTML文件中异常字符和结尾问题的脚本
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('开始检查和修复HTML文件...');
  
  // 移除所有异常格式的脚本标签
  const bodyContent = document.body.innerHTML;
  
  // 查找并移除异常格式的脚本标签
  if (bodyContent.includes('< s c r i p t')) {
    console.log('检测到异常格式的脚本标签，正在修复...');
    
    // 清理异常的脚本标签
    const cleanedContent = bodyContent.replace(/< s c r i p t\s+s r c\s+=\s+"[^"]+"\s*>\s*<\s*\/\s*s\s*c\s*r\s*i\s*p\s*t\s*>/g, '');
    
    document.body.innerHTML = cleanedContent;
    console.log('异常脚本标签已移除');
  }
  
  // 查找重复的脚本引用
  const scripts = document.querySelectorAll('script');
  const scriptSrcs = {};
  
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src) {
      if (!scriptSrcs[src]) {
        scriptSrcs[src] = [];
      }
      scriptSrcs[src].push(script);
    }
  });
  
  // 检查并移除重复的脚本引用
  for (const src in scriptSrcs) {
    if (scriptSrcs[src].length > 1) {
      console.log(`检测到重复脚本: ${src}，共 ${scriptSrcs[src].length} 次`);
      
      // 保留第一个，移除其余的
      for (let i = 1; i < scriptSrcs[src].length; i++) {
        scriptSrcs[src][i].parentNode.removeChild(scriptSrcs[src][i]);
      }
      
      console.log(`已移除 ${scriptSrcs[src].length - 1} 个重复脚本引用`);
    }
  }
  
  console.log('HTML文件修复完成');
}); 